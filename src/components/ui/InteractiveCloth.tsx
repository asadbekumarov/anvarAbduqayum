"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface InteractiveClothProps {
  imageSrc?: string;
  fallbackSrc?: string;
  className?: string;
  aspectRatio?: number; // width / height of the cloth mesh (e.g. 0.84 for portrait)
  captionName?: string;
  captionRole?: string;
  hintText?: string;
  ariaLabel?: string;
  fallbackAlt?: string;
}

export default function InteractiveCloth({
  imageSrc = "/images/hero/portrait.webp",
  fallbackSrc = "/images/hero/portrait.webp",
  className = "",
  aspectRatio = 0.84,
  captionName,
  captionRole,
  hintText = "",
  ariaLabel,
  fallbackAlt,
}: InteractiveClothProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [contextVersion, setContextVersion] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Ref to trigger nudge imperatively from outside the effect
  const triggerNudgeRef = useRef<(() => void) | null>(null);

  // Check sessionStorage for dismissed hint
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const dismissed =
          sessionStorage.getItem("cloth_hint_dismissed") === "true";
        if (!dismissed) {
          setShowHint(true);
        }
      } catch {
        setShowHint(true);
      }
    }
  }, []);

  // Listen to prefers-reduced-motion media query changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const onMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mq.addEventListener("change", onMediaChange);
    return () => {
      mq.removeEventListener("change", onMediaChange);
    };
  }, []);

  // Soft nudge after 3 seconds if hint hasn't been dismissed
  useEffect(() => {
    if (!isReady || prefersReducedMotion || !showHint) return;

    const timer = window.setTimeout(() => {
      if (!isInteracting && triggerNudgeRef.current) {
        triggerNudgeRef.current();
      }
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isReady, prefersReducedMotion, showHint, isInteracting]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let cancelled = false;

    // Context lost / restored listeners
    const handleContextLost = (e: Event) => {
      e.preventDefault();
    };
    const handleContextRestored = () => {
      if (!cancelled) {
        setContextVersion((v) => v + 1);
      }
    };
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    // WebGL Context creation with powerPreference: "default"
    let gl: WebGLRenderingContext | null = null;
    try {
      gl = (canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: true,
        powerPreference: "default",
      }) ||
        canvas.getContext(
          "experimental-webgl"
        )) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }

    if (!gl) {
      setHasWebGL(false);
      return;
    }

    // Performance adaptive configuration: mobile/low-power vs desktop
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    const isSmallScreen =
      typeof window !== "undefined" && window.innerWidth < 768;
    const isLowPower =
      typeof navigator !== "undefined" &&
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 4;
    const isMobileUA =
      typeof navigator !== "undefined" &&
      /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    const isLowTier = isSmallScreen || isMobileUA || (isTouch && isLowPower);

    const COLS = isLowTier ? 32 : 46;
    const ROWS = isLowTier ? 30 : 42;
    const maxDpr = isLowTier ? 1.5 : 2.0;
    let currentSubSteps = isLowTier ? 4 : 5;
    const minSubSteps = 3;

    const NUM_POINTS = COLS * ROWS;
    const clothSize = 0.88; // cloth height as share of view height
    const clothAspect = aspectRatio; // width / height of the cloth mesh
    const spread = 0.98;
    const pinRoll = (5.5 * Math.PI) / 180;
    const flutter = 0.32;
    const dampingVal = 0.30;
    const crumple = 0.55;
    const grabRadius = 0.16;
    const carryRadius = 0.24;
    const gravity = 2.6;
    const tilt = (-10 * Math.PI) / 180;
    const turn = (-12 * Math.PI) / 180;
    const perspective = 0.45;
    const maxSpeed = 12.0;

    const CH = clothSize;
    const CW = clothSize * clothAspect;

    // Camera matrix
    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);
    const cosR = Math.cos(turn);
    const sinR = Math.sin(turn);

    const R0 = [cosR, 0, sinR];
    const R1 = [sinT * sinR, cosT, -sinT * cosR];
    const R2 = [-cosT * sinR, sinT, cosT * cosR];

    const rMat = new Float32Array([
      R0[0], R1[0], R2[0],
      R0[1], R1[1], R2[1],
      R0[2], R1[2], R2[2],
    ]);

    const CAM = Math.exp(
      Math.log(18) * (1 - perspective) + Math.log(1.7) * perspective
    );

    const pIdx = (c: number, r: number) => r * COLS + c;

    // Positions, previous positions, normals, UVs
    const pos = new Float32Array(NUM_POINTS * 3);
    const prev = new Float32Array(NUM_POINTS * 3);
    const normals = new Float32Array(NUM_POINTS * 3);
    const uvs = new Float32Array(NUM_POINTS * 2);

    // Ridge and crease formulas
    const ridge = (x: number) => Math.sqrt(Math.sin(x) ** 2 + 0.03) - 0.64;
    const crease = (u: number, v: number) =>
      crumple *
      0.045 *
      CH *
      (ridge(2.7 * u + 2.9 * v + 0.7) +
        0.8 * ridge(-2.6 * u + 3.3 * v + 2.1) +
        0.5 * Math.sin(4.9 * u - 1.4 * v + 2.2) +
        0.55 * ridge(1.1 * u + 6.4 * v + 1.3) +
        0.4 * ridge(8.3 * u + 3.9 * v + 0.2) +
        0.3 * ridge(-5.7 * u + 9.1 * v + 1.6));

    // Pins configuration
    const halfW = 0.5 * CW * spread;
    const topY = 0.5 * CH;
    const leftPin = [
      -halfW * Math.cos(pinRoll),
      topY + halfW * Math.sin(pinRoll),
      0,
    ];
    const rightPin = [
      halfW * Math.cos(pinRoll),
      topY - halfW * Math.sin(pinRoll),
      0,
    ];

    const leftPinIdx = pIdx(0, ROWS - 1);
    const rightPinIdx = pIdx(COLS - 1, ROWS - 1);

    const flatDistLeft = new Float32Array(NUM_POINTS);
    const flatDistRight = new Float32Array(NUM_POINTS);

    // Initialize Rest Shape and Starting Pose
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = pIdx(c, r);
        const u = c / (COLS - 1);
        const v = r / (ROWS - 1); // 0 at bottom, 1 at top

        uvs[i * 2 + 0] = u;
        uvs[i * 2 + 1] = 1.0 - v; // top of texture at top row

        // Flat unpinned position
        let px = (u - 0.5) * CW;
        const py = (v - 0.5) * CH;
        const pz = crease(u, v);

        // Distance to left pin and right pin flat (using Math.sqrt)
        const dLx = px - -halfW;
        const dLy = py - topY;
        const dRx = px - halfW;
        const dRy = py - topY;
        flatDistLeft[i] = Math.sqrt(dLx * dLx + dLy * dLy);
        flatDistRight[i] = Math.sqrt(dRx * dRx + dRy * dRy);

        // Starting pose: x scaled by spread + (1 - spread) * (1 - v)^2
        px *= spread + (1 - spread) * (1 - v) ** 2;

        // Rotate by pinRoll about (0, topY)
        const dx = px;
        const dy = py - topY;
        const rotX = dx * Math.cos(pinRoll) - dy * Math.sin(pinRoll);
        const rotY = topY + dx * Math.sin(pinRoll) + dy * Math.cos(pinRoll);

        pos[i * 3 + 0] = rotX;
        pos[i * 3 + 1] = rotY;
        pos[i * 3 + 2] = pz;

        prev[i * 3 + 0] = rotX;
        prev[i * 3 + 1] = rotY;
        prev[i * 3 + 2] = pz;
      }
    }

    // Set exact pin positions
    pos[leftPinIdx * 3 + 0] = leftPin[0];
    pos[leftPinIdx * 3 + 1] = leftPin[1];
    pos[leftPinIdx * 3 + 2] = leftPin[2];
    prev[leftPinIdx * 3 + 0] = leftPin[0];
    prev[leftPinIdx * 3 + 1] = leftPin[1];
    prev[leftPinIdx * 3 + 2] = leftPin[2];

    pos[rightPinIdx * 3 + 0] = rightPin[0];
    pos[rightPinIdx * 3 + 1] = rightPin[1];
    pos[rightPinIdx * 3 + 2] = rightPin[2];
    prev[rightPinIdx * 3 + 0] = rightPin[0];
    prev[rightPinIdx * 3 + 1] = rightPin[1];
    prev[rightPinIdx * 3 + 2] = rightPin[2];

    // Distance Links
    interface Link {
      i: number;
      j: number;
      restLen: number;
      stiffness: number;
    }
    const links: Link[] = [];

    const addLink = (
      c1: number,
      r1: number,
      c2: number,
      r2: number,
      stiffness: number
    ) => {
      if (
        c1 < 0 ||
        r1 < 0 ||
        c1 >= COLS ||
        r1 >= ROWS ||
        c2 < 0 ||
        r2 < 0 ||
        c2 >= COLS ||
        r2 >= ROWS
      ) {
        return;
      }
      const i = pIdx(c1, r1);
      const j = pIdx(c2, r2);
      const dx = pos[i * 3] - pos[j * 3];
      const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
      const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
      const restLen = Math.sqrt(dx * dx + dy * dy + dz * dz);
      links.push({ i, j, restLen, stiffness });
    };

    const bendStiffness = 0.02 + (0.60 - 0.02) * 0.60;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        addLink(c, r, c + 1, r, 1.0);
        addLink(c, r, c, r + 1, 1.0);
        addLink(c, r, c + 1, r + 1, 0.5);
        addLink(c + 1, r, c, r + 1, 0.5);
        addLink(c, r, c + 2, r, bendStiffness);
        addLink(c, r, c, r + 2, bendStiffness);
        addLink(c, r, c + 5, r, bendStiffness * 0.5);
        addLink(c, r, c, r + 5, bendStiffness * 0.5);
      }
    }

    // Mesh Triangle Indices
    const indices: number[] = [];
    for (let r = 0; r < ROWS - 1; r++) {
      for (let c = 0; c < COLS - 1; c++) {
        const i0 = pIdx(c, r);
        const i1 = pIdx(c + 1, r);
        const i2 = pIdx(c, r + 1);
        const i3 = pIdx(c + 1, r + 1);

        indices.push(i0, i1, i2);
        indices.push(i1, i3, i2);
      }
    }
    const indexArray = new Uint16Array(indices);

    // Warm-up Simulation helper
    const warmUpH = 1 / 240;
    const stepWarmUp = () => {
      for (let i = 0; i < NUM_POINTS; i++) {
        if (i === leftPinIdx || i === rightPinIdx) continue;
        const px = pos[i * 3 + 0];
        const py = pos[i * 3 + 1];
        const pz = pos[i * 3 + 2];

        const ax = 0;
        const ay = -gravity;
        const az = 0;

        const vx = (px - prev[i * 3 + 0]) * 0.96 + ax * warmUpH * warmUpH;
        const vy = (py - prev[i * 3 + 1]) * 0.96 + ay * warmUpH * warmUpH;
        const vz = (pz - prev[i * 3 + 2]) * 0.96 + az * warmUpH * warmUpH;

        prev[i * 3 + 0] = px;
        prev[i * 3 + 1] = py;
        prev[i * 3 + 2] = pz;

        pos[i * 3 + 0] = px + vx;
        pos[i * 3 + 1] = py + vy;
        pos[i * 3 + 2] = pz + vz;
      }

      for (let iter = 0; iter < 2; iter++) {
        for (let l = 0; l < links.length; l++) {
          const link = links[l];
          const i = link.i;
          const j = link.j;
          const dx = pos[j * 3 + 0] - pos[i * 3 + 0];
          const dy = pos[j * 3 + 1] - pos[i * 3 + 1];
          const dz = pos[j * 3 + 2] - pos[i * 3 + 2];
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < 1e-6) continue;
          const diff = ((d - link.restLen) / d) * link.stiffness;
          const wI = i === leftPinIdx || i === rightPinIdx ? 0 : 1;
          const wJ = j === leftPinIdx || j === rightPinIdx ? 0 : 1;
          const sumW = wI + wJ;
          if (sumW === 0) continue;

          if (wI > 0) {
            pos[i * 3 + 0] += dx * diff * (wI / sumW);
            pos[i * 3 + 1] += dy * diff * (wI / sumW);
            pos[i * 3 + 2] += dz * diff * (wI / sumW);
          }
          if (wJ > 0) {
            pos[j * 3 + 0] -= dx * diff * (wJ / sumW);
            pos[j * 3 + 1] -= dy * diff * (wJ / sumW);
            pos[j * 3 + 2] -= dz * diff * (wJ / sumW);
          }
        }

        for (let i = 0; i < NUM_POINTS; i++) {
          if (i === leftPinIdx || i === rightPinIdx) continue;
          const maxL = 1.02 * flatDistLeft[i];
          const dxL = pos[i * 3 + 0] - leftPin[0];
          const dyL = pos[i * 3 + 1] - leftPin[1];
          const dzL = pos[i * 3 + 2] - leftPin[2];
          const distL = Math.sqrt(dxL * dxL + dyL * dyL + dzL * dzL);
          if (distL > maxL && distL > 1e-6) {
            const ratio = maxL / distL;
            pos[i * 3 + 0] = leftPin[0] + dxL * ratio;
            pos[i * 3 + 1] = leftPin[1] + dyL * ratio;
            pos[i * 3 + 2] = leftPin[2] + dzL * ratio;
          }

          const maxR = 1.02 * flatDistRight[i];
          const dxR = pos[i * 3 + 0] - rightPin[0];
          const dyR = pos[i * 3 + 1] - rightPin[1];
          const dzR = pos[i * 3 + 2] - rightPin[2];
          const distR = Math.sqrt(dxR * dxR + dyR * dyR + dzR * dzR);
          if (distR > maxR && distR > 1e-6) {
            const ratio = maxR / distR;
            pos[i * 3 + 0] = rightPin[0] + dxR * ratio;
            pos[i * 3 + 1] = rightPin[1] + dyR * ratio;
            pos[i * 3 + 2] = rightPin[2] + dzR * ratio;
          }
        }
      }
    };

    // Soft nudge implementation
    triggerNudgeRef.current = () => {
      const centerCol = Math.floor(COLS / 2);
      for (let r = 0; r < ROWS * 0.55; r++) {
        for (
          let c = Math.max(0, centerCol - 6);
          c <= Math.min(COLS - 1, centerCol + 6);
          c++
        ) {
          const i = pIdx(c, r);
          if (i === leftPinIdx || i === rightPinIdx) continue;
          const factor =
            Math.sin((r / (ROWS * 0.55)) * Math.PI) *
            Math.sin(((c - (centerCol - 6)) / 12) * Math.PI);
          prev[i * 3 + 0] -= 0.02 * factor;
          prev[i * 3 + 2] += 0.04 * factor;
        }
      }
    };

    // Normal calculation function (using Math.sqrt)
    const computeNormals = () => {
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const i = pIdx(c, r);
          const leftI = pIdx(c > 0 ? c - 1 : c, r);
          const rightI = pIdx(c < COLS - 1 ? c + 1 : c, r);
          const botI = pIdx(c, r > 0 ? r - 1 : r);
          const topI = pIdx(c, r < ROWS - 1 ? r + 1 : r);

          const dxX = pos[rightI * 3 + 0] - pos[leftI * 3 + 0];
          const dxY = pos[rightI * 3 + 1] - pos[leftI * 3 + 1];
          const dxZ = pos[rightI * 3 + 2] - pos[leftI * 3 + 2];

          const dyX = pos[topI * 3 + 0] - pos[botI * 3 + 0];
          const dyY = pos[topI * 3 + 1] - pos[botI * 3 + 1];
          const dyZ = pos[topI * 3 + 2] - pos[botI * 3 + 2];

          let nx = dxY * dyZ - dxZ * dyY;
          let ny = dxZ * dyX - dxX * dyZ;
          let nz = dxX * dyY - dxY * dyX;

          const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
          if (len > 1e-6) {
            nx /= len;
            ny /= len;
            nz /= len;
          } else {
            nx = 0;
            ny = 0;
            nz = 1;
          }

          normals[i * 3 + 0] = nx;
          normals[i * 3 + 1] = ny;
          normals[i * 3 + 2] = nz;
        }
      }
    };

    // Shaders matching specification with tailored Champagne/Obsidian luxury styling
    const vsSource = `
      precision highp float;
      attribute vec3 a_position;
      attribute vec3 a_normal;
      attribute vec2 a_texcoord;

      uniform mat3 u_R;
      uniform float u_cam;
      uniform float u_zoom;
      uniform float u_cx;
      uniform float u_cy;
      uniform float u_aspect;

      varying vec3 v_viewPos;
      varying vec3 v_viewNormal;
      varying vec2 v_uv;

      void main() {
        vec3 q = u_R * a_position;
        float scale = u_cam / max(u_cam - q.z, 0.001);
        vec2 screen = q.xy * scale * u_zoom;

        float clipX = 2.0 * (u_cx + screen.x / u_aspect) - 1.0;
        float clipY = 1.0 - 2.0 * (u_cy - screen.y);
        float clipZ = -q.z * 0.5;

        gl_Position = vec4(clipX, clipY, clipZ, 1.0);
        v_viewPos = q;
        v_viewNormal = normalize(u_R * a_normal);
        v_uv = a_texcoord;
      }
    `;

    const fsSource = `
      #ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      #else
      precision mediump float;
      #endif

      varying vec3 v_viewPos;
      varying vec3 v_viewNormal;
      varying vec2 v_uv;

      uniform sampler2D u_texture;
      uniform float u_cam;
      uniform float u_hasTexture;

      float box(vec3 dir, vec3 center, vec2 halfSize, float soft) {
        vec3 d = dir - center;
        vec2 diff = abs(vec2(dot(d, vec3(1.0, 0.0, 0.0)), dot(d, vec3(0.0, 1.0, 0.0)))) - halfSize;
        float dist = max(diff.x, diff.y);
        return 1.0 - smoothstep(-soft, soft, dist);
      }

      void main() {
        vec3 n = normalize(v_viewNormal);
        bool back = n.z < 0.0;
        if (back) n = -n;

        vec3 V = normalize(vec3(0.0, 0.0, u_cam) - v_viewPos);
        vec3 Rf = reflect(-V, n);
        vec3 KEY = normalize(vec3(-0.42, 0.45, 0.79));

        float nv = clamp(dot(n, V), 0.0, 1.0);
        float nl = max(dot(n, KEY), 0.0);

        vec3 print = u_hasTexture > 0.5 
          ? pow(texture2D(u_texture, v_uv).rgb, vec3(2.2))
          : vec3(0.08, 0.07, 0.06);

        float shade = 0.46 + 0.68 * nl + 0.08 * n.y;
        float key = pow(max(dot(Rf, KEY), 0.0), 26.0);

        float strip = box(Rf, normalize(vec3(0.08, 0.93, 0.36)), vec2(1.1, 0.07), 0.22);
        float side = box(Rf, normalize(vec3(0.86, 0.12, 0.50)), vec2(0.06, 0.85), 0.20);
        float fill = box(Rf, KEY, vec2(0.42, 0.30), 0.35);

        // Liquid Champagne & Warm Gold Silk Sheen
        float phase = 3.0 * (0.85 * dot(n.xy, vec2(0.6, 0.8)) + 0.75 * (1.0 - nv) + 0.3 * dot(Rf.xy, vec2(-0.8, 0.6))) + 0.4 * sin(5.0 * v_uv.x + 7.0 * v_uv.y);
        vec3 goldRainbow = clamp(vec3(0.80, 0.68, 0.48) + vec3(0.20, 0.18, 0.12) * cos(6.28318 * (phase + vec3(0.0, 0.06, 0.16))), 0.0, 1.0);
        vec3 holo = mix(vec3(1.0), pow(goldRainbow, vec3(2.2)), 0.75);

        float lum = dot(print, vec3(0.299, 0.587, 0.114));
        float gloss = mix(1.0, 0.45, smoothstep(0.55, 0.9, lum));

        vec3 spec = holo * gloss * mix(vec3(1.0), print * 2.2 + vec3(0.12, 0.10, 0.06), 0.65) * (0.34 * key + 0.11 * strip + 0.07 * side + 0.02 * fill);

        vec3 color = print * shade + spec + holo * print * 0.45 * pow(1.0 - nv, 3.0);

        // Back face: rich executive obsidian dark weave with subtle gold threads
        vec3 foil = vec3(0.18, 0.15, 0.12) * (0.35 + 0.9 * nl) + spec * 1.1;
        if (back) {
          color = mix(foil, print * shade, 0.38);
        }

        // Soft highlight roll-off above 0.8
        color = min(color, vec3(0.8)) + 0.2 * (1.0 - exp(-max(color - vec3(0.8), 0.0) / 0.2));

        // Output to sRGB display (pow 1/2.2)
        gl_FragColor = vec4(pow(color, vec3(1.0 / 2.2)), 1.0);
      }
    `;

    const createShader = (type: number, src: string) => {
      const s = gl!.createShader(type);
      if (!s) return null;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        console.warn("Shader compile error:", gl!.getShaderInfoLog(s));
        gl!.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) {
      setHasWebGL(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setHasWebGL(false);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("Program link error:", gl.getProgramInfoLog(program));
      setHasWebGL(false);
      return;
    }

    gl.useProgram(program);

    // Buffers: static indices and UVs, dynamic pos & normal allocated once
    const posBuffer = gl.createBuffer();
    const normalBuffer = gl.createBuffer();
    const uvBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.DYNAMIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, pos.byteLength, gl.DYNAMIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, normals.byteLength, gl.DYNAMIC_DRAW);

    const aPos = gl.getAttribLocation(program, "a_position");
    const aNorm = gl.getAttribLocation(program, "a_normal");
    const aUV = gl.getAttribLocation(program, "a_texcoord");

    const uRLoc = gl.getUniformLocation(program, "u_R");
    const uCamLoc = gl.getUniformLocation(program, "u_cam");
    const uZoomLoc = gl.getUniformLocation(program, "u_zoom");
    const uCxLoc = gl.getUniformLocation(program, "u_cx");
    const uCyLoc = gl.getUniformLocation(program, "u_cy");
    const uAspectLoc = gl.getUniformLocation(program, "u_aspect");
    const uTexLoc = gl.getUniformLocation(program, "u_texture");
    const uHasTexLoc = gl.getUniformLocation(program, "u_hasTexture");

    // Placeholder texture with proper NEAREST & CLAMP_TO_EDGE
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([26, 24, 20, 255])
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    let imageLoaded = false;
    let warmUpDone = false;
    let firstFrameRendered = false;

    // Helper: Next or closest power of two capped by max
    const getPotSize = (val: number, maxVal: number) => {
      let p = 512;
      while (p < val && p < maxVal) {
        p *= 2;
      }
      return Math.min(p, maxVal);
    };

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      if (cancelled || !gl || gl.isContextLost()) return;

      const nw = img.naturalWidth || img.width || 1024;
      const nh = img.naturalHeight || img.height || 1024;
      const imgAspect = nw / nh;

      // 1. Rescale into 2D canvas with POT dimensions (e.g. 1024x1024 or 1024x2048)
      const maxGlTexSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 2048;
      const maxAllowed = Math.min(2048, maxGlTexSize);
      const potW = getPotSize(nw, maxAllowed);
      const potH = getPotSize(nh, maxAllowed);

      const potCanvas = document.createElement("canvas");
      potCanvas.width = potW;
      potCanvas.height = potH;
      const ctx = potCanvas.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, potW, potH);
      }

      // Upload POT canvas to WebGL texture
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        potCanvas
      );

      // Always valid for POT textures: Mipmaps + LINEAR_MIPMAP_LINEAR + Anisotropy
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR_MIPMAP_LINEAR
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_S,
        gl.CLAMP_TO_EDGE
      );
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_T,
        gl.CLAMP_TO_EDGE
      );

      const ext =
        gl.getExtension("EXT_texture_filter_anisotropic") ||
        gl.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
        gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
      if (ext) {
        const maxAniso = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        gl.texParameterf(
          gl.TEXTURE_2D,
          ext.TEXTURE_MAX_ANISOTROPY_EXT,
          Math.min(8, maxAniso)
        );
      }

      // 2. Adjust UV coordinates to "object-cover" crop based on natural aspect ratio
      const meshAspect = clothAspect;
      let scaleU = 1.0;
      let scaleV = 1.0;
      if (meshAspect > imgAspect) {
        // Mesh is wider than image: fit width, crop height
        scaleV = imgAspect / meshAspect;
      } else {
        // Mesh is taller than image: fit height, crop width
        scaleU = meshAspect / imgAspect;
      }

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const i = pIdx(c, r);
          const uRaw = c / (COLS - 1);
          const vRaw = r / (ROWS - 1); // 0 at bottom, 1 at top

          const uCover = (uRaw - 0.5) * scaleU + 0.5;
          const vCover = (vRaw - 0.5) * scaleV + 0.5;

          uvs[i * 2 + 0] = uCover;
          uvs[i * 2 + 1] = 1.0 - vCover; // top of texture at top row
        }
      }

      // Update UV buffer on GPU
      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, uvs);

      imageLoaded = true;
      if (warmUpDone && firstFrameRendered) {
        setIsReady(true);
      }
    };

    img.onerror = () => {
      if (cancelled) return;
      setHasWebGL(false);
    };

    // View & Projection state
    let viewAspect = 1;
    let cx = 0.5;
    let cy = 0.48;
    let zoom = 1.0;

    const updateView = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const w = rect.width;
      const h = rect.height;
      if (w <= 0 || h <= 0) return;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      gl!.viewport(0, 0, canvas.width, canvas.height);

      viewAspect = w / h;
      cx = 0.5;
      cy = 0.48;
      zoom = Math.min(
        1.0,
        (0.92 * viewAspect) / (CW * 1.08),
        0.88 / CH
      );
    };

    updateView();

    // Interaction & Fling state
    let grabbedPoint = -1;
    let grabbedDepth = 0;
    const grabOffset = [0, 0, 0];
    const carryWeights = new Float32Array(NUM_POINTS);

    // Pointer history tracking for fling velocity calculation (~80ms)
    interface PointerSample {
      x: number;
      y: number;
      time: number;
    }
    const pointerHistory: PointerSample[] = [];

    // Touch scroll intent tracking
    let touchStartX = 0;
    let touchStartY = 0;
    let touchCandidate = false;
    let touchPointerId = -1;

    let pointerClientX = 0;
    let pointerClientY = 0;

    const unproject = (screenX: number, screenY: number, depthZ: number) => {
      const scale = CAM / Math.max(CAM - depthZ, 0.001);
      const qx = screenX / (scale * zoom);
      const qy = screenY / (scale * zoom);
      const qz = depthZ;

      const px = R0[0] * qx + R1[0] * qy + R2[0] * qz;
      const py = R0[1] * qx + R1[1] * qy + R2[1] * qz;
      const pz = R0[2] * qx + R1[2] * qy + R2[2] * qz;
      return [px, py, pz];
    };

    const getPointerScreen = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x =
        (((clientX - rect.left) / rect.width - cx) * viewAspect) / zoom;
      const y = (cy - (clientY - rect.top) / rect.height) / zoom;
      return { x, y };
    };

    const attemptGrab = (
      clientX: number,
      clientY: number,
      pointerId: number,
      isMouse: boolean
    ) => {
      pointerClientX = clientX;
      pointerClientY = clientY;
      const { x, y } = getPointerScreen(clientX, clientY);

      let bestScore = Infinity;
      let bestIdx = -1;
      let bestDepth = 0;

      for (let i = 0; i < NUM_POINTS; i++) {
        const px = pos[i * 3 + 0];
        const py = pos[i * 3 + 1];
        const pz = pos[i * 3 + 2];

        const qx = R0[0] * px + R0[1] * py + R0[2] * pz;
        const qy = R1[0] * px + R1[1] * py + R1[2] * pz;
        const qz = R2[0] * px + R2[1] * py + R2[2] * pz;

        const scale = CAM / Math.max(CAM - qz, 0.001);
        const sx = qx * scale * zoom;
        const sy = qy * scale * zoom;

        const dpx = x * zoom - sx;
        const dpy = y * zoom - sy;
        const dist = Math.sqrt(dpx * dpx + dpy * dpy) / zoom;
        if (dist < grabRadius / zoom) {
          const score = dist - 0.08 * qz;
          if (score < bestScore) {
            bestScore = score;
            bestIdx = i;
            bestDepth = qz;
          }
        }
      }

      if (bestIdx >= 0) {
        grabbedPoint = bestIdx;
        grabbedDepth = bestDepth;
        try {
          canvas.setPointerCapture(pointerId);
        } catch {}

        setIsInteracting(true);
        if (isMouse) {
          canvas.classList.add("cursor-grabbing");
        }

        // Permanently dismiss hint after first successful grab
        setShowHint(false);
        try {
          sessionStorage.setItem("cloth_hint_dismissed", "true");
        } catch {}

        const target = unproject(x * zoom, y * zoom, grabbedDepth);
        grabOffset[0] = pos[bestIdx * 3 + 0] - target[0];
        grabOffset[1] = pos[bestIdx * 3 + 1] - target[1];
        grabOffset[2] = pos[bestIdx * 3 + 2] - target[2];

        const cX = pos[bestIdx * 3 + 0];
        const cY = pos[bestIdx * 3 + 1];
        for (let i = 0; i < NUM_POINTS; i++) {
          if (i === leftPinIdx || i === rightPinIdx) {
            carryWeights[i] = 0;
            continue;
          }
          if (i === bestIdx) {
            carryWeights[i] = 1.0;
            continue;
          }
          const cdx = pos[i * 3 + 0] - cX;
          const cdy = pos[i * 3 + 1] - cY;
          const d = Math.sqrt(cdx * cdx + cdy * cdy) / (carryRadius * CH);
          carryWeights[i] = d < 1.0 ? (1.0 - d * d) ** 2 : 0;
        }

        // Reset pointer history on grab initiation
        pointerHistory.length = 0;
        pointerHistory.push({
          x: clientX,
          y: clientY,
          time: performance.now(),
        });
      }
    };

    const releaseGrab = (pointerId?: number, applyFling = true) => {
      if (pointerId !== undefined && canvas) {
        try {
          canvas.releasePointerCapture(pointerId);
        } catch {}
      }

      if (grabbedPoint >= 0) {
        // Calculate fling velocity from the last ~80ms of pointer motion
        if (applyFling && pointerHistory.length >= 2) {
          const newest = pointerHistory[pointerHistory.length - 1];
          let oldestIdx = 0;
          for (let i = pointerHistory.length - 2; i >= 0; i--) {
            if (newest.time - pointerHistory[i].time <= 80) {
              oldestIdx = i;
            } else {
              break;
            }
          }
          const oldest = pointerHistory[oldestIdx];
          const dt = (newest.time - oldest.time) / 1000;

          if (dt > 0.015 && dt < 0.12) {
            const vxPx = (newest.x - oldest.x) / dt;
            const vyPx = (newest.y - oldest.y) / dt;

            const rect = canvas.getBoundingClientRect();
            const worldVx =
              (vxPx / (rect.width || 1)) * ((2.0 * viewAspect) / zoom);
            const worldVy = (-vyPx / (rect.height || 1)) * (2.0 / zoom);

            const flingSpeed = Math.sqrt(worldVx * worldVx + worldVy * worldVy);
            const maxFling = 8.0;
            let scale = 1.0;
            if (flingSpeed > maxFling) {
              scale = maxFling / flingSpeed;
            }
            const effVx = worldVx * scale;
            const effVy = worldVy * scale;

            // Apply fling impulse to Verlet prev positions
            const simStepDt = 0.016;
            for (let i = 0; i < NUM_POINTS; i++) {
              const w = carryWeights[i];
              if (w > 0.05) {
                prev[i * 3 + 0] -= effVx * simStepDt * w;
                prev[i * 3 + 1] -= effVy * simStepDt * w;
              }
            }
          }
        }

        grabbedPoint = -1;
        setIsInteracting(false);
        canvas.classList.remove("cursor-grabbing");
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        if (e.button !== 0) return;
        attemptGrab(e.clientX, e.clientY, e.pointerId, true);
      } else {
        // Touch: record start position and defer grab until horizontal intent is confirmed
        touchStartX = e.clientX;
        touchStartY = e.clientY;
        touchCandidate = true;
        touchPointerId = e.pointerId;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      pointerClientX = e.clientX;
      pointerClientY = e.clientY;

      const now = performance.now();
      pointerHistory.push({ x: e.clientX, y: e.clientY, time: now });
      while (pointerHistory.length > 0 && now - pointerHistory[0].time > 100) {
        pointerHistory.shift();
      }

      // Check touch scroll intent: grab only if horizontal intent (|dx| > |dy|, >= 8px)
      if (touchCandidate && e.pointerId === touchPointerId) {
        const dx = e.clientX - touchStartX;
        const dy = e.clientY - touchStartY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist >= 8) {
          if (Math.abs(dx) > Math.abs(dy)) {
            touchCandidate = false;
            attemptGrab(e.clientX, e.clientY, e.pointerId, false);
          } else {
            // Vertical intent: user is scrolling the page, discard candidate
            touchCandidate = false;
          }
        }
      }

      // Cursor hover styling applied strictly for mouse
      if (grabbedPoint === -1 && e.pointerType === "mouse") {
        const { x, y } = getPointerScreen(e.clientX, e.clientY);
        let hoverHit = false;
        for (let i = 0; i < NUM_POINTS; i += 3) {
          const px = pos[i * 3 + 0];
          const py = pos[i * 3 + 1];
          const pz = pos[i * 3 + 2];
          const qx = R0[0] * px + R0[1] * py + R0[2] * pz;
          const qy = R1[0] * px + R1[1] * py + R1[2] * pz;
          const qz = R2[0] * px + R2[1] * py + R2[2] * pz;
          const scale = CAM / Math.max(CAM - qz, 0.001);
          const sx = qx * scale * zoom;
          const sy = qy * scale * zoom;
          const dpx = x * zoom - sx;
          const dpy = y * zoom - sy;
          const dist = Math.sqrt(dpx * dpx + dpy * dpy) / zoom;
          if (dist < (grabRadius * 0.9) / zoom) {
            hoverHit = true;
            break;
          }
        }
        if (hoverHit) {
          canvas.classList.add("cursor-grab");
        } else {
          canvas.classList.remove("cursor-grab");
        }
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      touchCandidate = false;
      releaseGrab(e.pointerId, true);
    };

    const onPointerCancel = (e: PointerEvent) => {
      touchCandidate = false;
      releaseGrab(e.pointerId, false);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerCancel);

    // Main Animation Loop
    let animId = 0;
    let lastTime = performance.now();
    let simTime = 0;
    let isVisible = true;

    let emaFrameTime = 16.6;
    let slowFrameCount = 0;
    let warmUpStepsRemaining = 120;

    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    const onVisChange = () => {
      if (document.hidden) {
        isVisible = false;
      } else {
        isVisible = true;
        lastTime = performance.now();
      }
    };
    document.addEventListener("visibilitychange", onVisChange);

    const ro = new ResizeObserver(() => {
      updateView();
    });
    ro.observe(container);

    let forwardSweep = true;

    const render = (now: number) => {
      animId = requestAnimationFrame(render);
      if (!isVisible || cancelled) return;
      if (gl.isContextLost()) return;

      // Warm-up in smooth non-blocking frames
      if (warmUpStepsRemaining > 0) {
        const stepsThisFrame = Math.min(warmUpStepsRemaining, 40);
        for (let s = 0; s < stepsThisFrame; s++) {
          stepWarmUp();
        }
        warmUpStepsRemaining -= stepsThisFrame;
        if (warmUpStepsRemaining === 0) {
          for (let i = 0; i < NUM_POINTS * 3; i++) {
            prev[i] = pos[i];
          }
          warmUpDone = true;
          if (imageLoaded && firstFrameRendered) {
            setIsReady(true);
          }
        }
        lastTime = now;
        return;
      }

      const elapsed = (now - lastTime) / 1000;
      const frameDuration = now - lastTime;
      lastTime = now;

      // Track frame rate EMA
      emaFrameTime = emaFrameTime * 0.9 + frameDuration * 0.1;
      if (emaFrameTime > 24) {
        slowFrameCount++;
        if (slowFrameCount >= 20) {
          if (currentSubSteps > minSubSteps) {
            currentSubSteps--;
          }
          slowFrameCount = 0;
        }
      } else {
        slowFrameCount = 0;
      }

      const dt = Math.min(elapsed, 1 / 30);
      const h = dt / currentSubSteps;

      for (let s = 0; s < currentSubSteps; s++) {
        simTime += h;

        const damp = Math.exp(-(0.15 + 5.85 * dampingVal) * h);
        const gust =
          0.6 + 0.4 * Math.sin(0.37 * simTime) * Math.sin(0.23 * simTime + 1.0);
        const wind = flutter * 2.4 * gust * (gravity / 2.6);

        // Verlet Step
        for (let i = 0; i < NUM_POINTS; i++) {
          if (i === leftPinIdx || i === rightPinIdx) continue;
          if (grabbedPoint >= 0 && carryWeights[i] >= 0.98) continue;

          const u = uvs[i * 2 + 0];
          const v = 1.0 - uvs[i * 2 + 1];

          const s1 = Math.sin(9.1 * u - 3.7 * v + 3.1 * simTime);
          const s2 = Math.sin(6.3 * u + 7.9 * v - 2.3 * simTime + 1.3);
          const s3 =
            Math.sin(2.9 * u + 1.7 * simTime + 0.8 * Math.sin(0.5 * simTime)) *
            Math.cos(2.3 * v - 0.9 * simTime);

          const ax = wind * 0.25 * Math.sin(3.3 * v + 1.1 * simTime + u);
          const ay = wind * 0.1 * s2 - gravity;
          const az = wind * (0.45 * s1 + 0.35 * s2 + 0.3 * s3);

          const px = pos[i * 3 + 0];
          const py = pos[i * 3 + 1];
          const pz = pos[i * 3 + 2];

          let vx = (px - prev[i * 3 + 0]) * damp + ax * h * h;
          let vy = (py - prev[i * 3 + 1]) * damp + ay * h * h;
          let vz = (pz - prev[i * 3 + 2]) * damp + az * h * h;

          const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);
          const maxH = maxSpeed * h;
          if (speed > maxH && speed > 1e-6) {
            const scale = maxH / speed;
            vx *= scale;
            vy *= scale;
            vz *= scale;
          }

          prev[i * 3 + 0] = px;
          prev[i * 3 + 1] = py;
          prev[i * 3 + 2] = pz;

          pos[i * 3 + 0] = px + vx;
          pos[i * 3 + 1] = py + vy;
          pos[i * 3 + 2] = pz + vz;
        }

        // Grabbing target update
        if (grabbedPoint >= 0) {
          const { x, y } = getPointerScreen(pointerClientX, pointerClientY);
          const target = unproject(x * zoom, y * zoom, grabbedDepth);
          target[0] += grabOffset[0];
          target[1] += grabOffset[1];
          target[2] += grabOffset[2];

          const maxL = 1.02 * flatDistLeft[grabbedPoint];
          const dxL = target[0] - leftPin[0];
          const dyL = target[1] - leftPin[1];
          const dzL = target[2] - leftPin[2];
          const distL = Math.sqrt(dxL * dxL + dyL * dyL + dzL * dzL);
          if (distL > maxL && distL > 1e-6) {
            const r = maxL / distL;
            target[0] = leftPin[0] + dxL * r;
            target[1] = leftPin[1] + dyL * r;
            target[2] = leftPin[2] + dzL * r;
          }

          const maxR = 1.02 * flatDistRight[grabbedPoint];
          const dxR = target[0] - rightPin[0];
          const dyR = target[1] - rightPin[1];
          const dzR = target[2] - rightPin[2];
          const distR = Math.sqrt(dxR * dxR + dyR * dyR + dzR * dzR);
          if (distR > maxR && distR > 1e-6) {
            const r = maxR / distR;
            target[0] = rightPin[0] + dxR * r;
            target[1] = rightPin[1] + dyR * r;
            target[2] = rightPin[2] + dzR * r;
          }

          const deltaX = target[0] - pos[grabbedPoint * 3 + 0];
          const deltaY = target[1] - pos[grabbedPoint * 3 + 1];
          const deltaZ = target[2] - pos[grabbedPoint * 3 + 2];

          for (let i = 0; i < NUM_POINTS; i++) {
            const w = carryWeights[i];
            if (w <= 0) continue;
            if (w >= 0.98) {
              pos[i * 3 + 0] += deltaX;
              pos[i * 3 + 1] += deltaY;
              pos[i * 3 + 2] += deltaZ;
              prev[i * 3 + 0] = pos[i * 3 + 0];
              prev[i * 3 + 1] = pos[i * 3 + 1];
              prev[i * 3 + 2] = pos[i * 3 + 2];
            } else {
              pos[i * 3 + 0] += deltaX * w;
              pos[i * 3 + 1] += deltaY * w;
              pos[i * 3 + 2] += deltaZ * w;
              prev[i * 3 + 0] += deltaX * w;
              prev[i * 3 + 1] += deltaY * w;
              prev[i * 3 + 2] += deltaZ * w;
            }
          }
        }

        // 2 Constraint Iterations per sub-step
        for (let iter = 0; iter < 2; iter++) {
          const numL = links.length;
          const startL = forwardSweep ? 0 : numL - 1;
          const endL = forwardSweep ? numL : -1;
          const stepL = forwardSweep ? 1 : -1;

          for (let l = startL; l !== endL; l += stepL) {
            const link = links[l];
            const i = link.i;
            const j = link.j;

            const dx = pos[j * 3 + 0] - pos[i * 3 + 0];
            const dy = pos[j * 3 + 1] - pos[i * 3 + 1];
            const dz = pos[j * 3 + 2] - pos[i * 3 + 2];
            const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (d < 1e-6) continue;

            const diff = ((d - link.restLen) / d) * link.stiffness;
            const isFixedI =
              i === leftPinIdx ||
              i === rightPinIdx ||
              (grabbedPoint >= 0 && carryWeights[i] >= 0.98);
            const isFixedJ =
              j === leftPinIdx ||
              j === rightPinIdx ||
              (grabbedPoint >= 0 && carryWeights[j] >= 0.98);

            const wI = isFixedI ? 0 : 1;
            const wJ = isFixedJ ? 0 : 1;
            const sumW = wI + wJ;
            if (sumW === 0) continue;

            if (wI > 0) {
              pos[i * 3 + 0] += dx * diff * (wI / sumW);
              pos[i * 3 + 1] += dy * diff * (wI / sumW);
              pos[i * 3 + 2] += dz * diff * (wI / sumW);
            }
            if (wJ > 0) {
              pos[j * 3 + 0] -= dx * diff * (wJ / sumW);
              pos[j * 3 + 1] -= dy * diff * (wJ / sumW);
              pos[j * 3 + 2] -= dz * diff * (wJ / sumW);
            }
          }
          forwardSweep = !forwardSweep;

          for (let i = 0; i < NUM_POINTS; i++) {
            if (i === leftPinIdx || i === rightPinIdx) continue;
            if (grabbedPoint >= 0 && carryWeights[i] >= 0.98) continue;

            const maxL = 1.02 * flatDistLeft[i];
            const dxL = pos[i * 3 + 0] - leftPin[0];
            const dyL = pos[i * 3 + 1] - leftPin[1];
            const dzL = pos[i * 3 + 2] - leftPin[2];
            const distL = Math.sqrt(dxL * dxL + dyL * dyL + dzL * dzL);
            if (distL > maxL && distL > 1e-6) {
              const r = maxL / distL;
              pos[i * 3 + 0] = leftPin[0] + dxL * r;
              pos[i * 3 + 1] = leftPin[1] + dyL * r;
              pos[i * 3 + 2] = leftPin[2] + dzL * r;
            }

            const maxR = 1.02 * flatDistRight[i];
            const dxR = pos[i * 3 + 0] - rightPin[0];
            const dyR = pos[i * 3 + 1] - rightPin[1];
            const dzR = pos[i * 3 + 2] - rightPin[2];
            const distR = Math.sqrt(dxR * dxR + dyR * dyR + dzR * dzR);
            if (distR > maxR && distR > 1e-6) {
              const r = maxR / distR;
              pos[i * 3 + 0] = rightPin[0] + dxR * r;
              pos[i * 3 + 1] = rightPin[1] + dyR * r;
              pos[i * 3 + 2] = rightPin[2] + dzR * r;
            }
          }
        }
      }

      computeNormals();

      // Render WebGL
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.disable(gl.CULL_FACE);

      gl.useProgram(program);

      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, pos);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, normals);
      gl.enableVertexAttribArray(aNorm);
      gl.vertexAttribPointer(aNorm, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
      gl.enableVertexAttribArray(aUV);
      gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 0, 0);

      gl.uniformMatrix3fv(uRLoc, false, rMat);
      gl.uniform1f(uCamLoc, CAM);
      gl.uniform1f(uZoomLoc, zoom);
      gl.uniform1f(uCxLoc, cx);
      gl.uniform1f(uCyLoc, cy);
      gl.uniform1f(uAspectLoc, viewAspect);
      gl.uniform1f(uHasTexLoc, imageLoaded ? 1.0 : 0.0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uTexLoc, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.drawElements(gl.TRIANGLES, indexArray.length, gl.UNSIGNED_SHORT, 0);

      if (!firstFrameRendered) {
        firstFrameRendered = true;
        if (imageLoaded && warmUpDone) {
          setIsReady(true);
        }
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelled = true;
      triggerNudgeRef.current = null;
      cancelAnimationFrame(animId);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisChange);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);

      if (gl) {
        gl.deleteBuffer(posBuffer);
        gl.deleteBuffer(normalBuffer);
        gl.deleteBuffer(uvBuffer);
        gl.deleteBuffer(indexBuffer);
        gl.deleteTexture(texture);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      }
    };
  }, [imageSrc, aspectRatio, contextVersion, prefersReducedMotion]);

  // Handle margin conflict: only apply mx-auto if consumer hasn't specified ml-, mr-, or mx-
  const hasCustomMargin = /\bm[xlr]-/.test(className);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[4/5] max-w-[480px] max-h-[48svh] sm:max-h-[70svh] select-none group ${
        !hasCustomMargin ? "mx-auto" : ""
      } ${className}`}
    >
      {/* Seamless static poster with Image priority (crossfades 500ms once cloth is ready) */}
      <div
        className={`absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] transition-opacity duration-500 pointer-events-none ${
          isReady && !prefersReducedMotion ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={fallbackSrc}
          alt={fallbackAlt || captionName || "Anvar Abduqayum"}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 480px"
          className="object-cover object-top contrast-[1.04]"
        />
      </div>

      {/* 3D WebGL Cloth Canvas (touch-action: pan-y preserves natural vertical scrolling) */}
      {hasWebGL && !prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={
            ariaLabel ||
            captionName ||
            "Anvar Abduqayum 3D interaktiv mato portreti"
          }
          className="absolute inset-0 w-full h-full block z-10 touch-pan-y outline-none transition-opacity duration-500"
          style={{ opacity: isReady ? 1 : 0 }}
        />
      )}

      {/* Floating Interactive Hint Tag */}
      {Boolean(hintText) && showHint && !prefersReducedMotion && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute top-4 right-4 z-20 transition-all duration-300 ${
            isInteracting
              ? "opacity-0 scale-95"
              : isReady
              ? "opacity-85 group-hover:opacity-100"
              : "opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0A0A0A]/85 backdrop-blur-md border border-[#C5A880]/30 text-xs uppercase font-mono tracking-[0.18em] text-[#C5A880] shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
            {hintText}
          </span>
        </div>
      )}

      {/* Editorial Caption on the bottom */}
      {(captionName || captionRole) && (
        <div className="absolute bottom-2 left-0 z-20 border-l border-[#C5A880]/30 pl-4 py-0.5 pointer-events-none">
          {captionName && (
            <p className="font-serif italic text-2xl text-white/90 leading-none">
              {captionName}
            </p>
          )}
          {captionRole && (
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mt-1.5">
              {captionRole}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
