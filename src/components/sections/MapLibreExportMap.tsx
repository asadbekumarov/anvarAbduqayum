"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export interface MapLibreExportMapProps {
  activeRegionId: string;
  onSelectRegion: (regionId: string) => void;
}

export interface RegionDefinition {
  id: string;
  label: string;
  isoCodes: string[];
  centroid: [number, number]; // [lng, lat]
  bounds: [number, number, number, number]; // [minLng, minLat, maxLng, maxLat]
}

export const REGION_CONFIG: Record<string, RegionDefinition> = {
  kz: {
    id: "kz",
    label: "Qozog‘iston (KZ)",
    isoCodes: ["KZ"],
    centroid: [68.0, 48.0],
    bounds: [46.6, 40.6, 87.3, 55.4],
  },
  ru: {
    id: "ru",
    label: "Rossiya & MDH (RU)",
    isoCodes: ["RU"],
    centroid: [45.0, 56.0],
    bounds: [27.0, 46.0, 65.0, 63.0],
  },
  kg: {
    id: "kg",
    label: "Qirg‘iziston (KG)",
    isoCodes: ["KG"],
    centroid: [74.5, 41.5],
    bounds: [69.2, 39.3, 80.2, 43.3],
  },
  tj: {
    id: "tj",
    label: "Tojikiston (TJ)",
    isoCodes: ["TJ"],
    centroid: [69.5, 38.5],
    bounds: [67.3, 36.6, 75.0, 41.1],
  },
  tm: {
    id: "tm",
    label: "Turkmaniston (TM)",
    isoCodes: ["TM"],
    centroid: [59.0, 39.0],
    bounds: [52.4, 35.2, 66.7, 42.8],
  },
  cn: {
    id: "cn",
    label: "Xitoy (CN)",
    isoCodes: ["CN"],
    centroid: [87.5, 43.8],
    bounds: [73.6, 30.0, 105.0, 50.0],
  },
  az: {
    id: "az",
    label: "Ozarbayjon (AZ)",
    isoCodes: ["AZ"],
    centroid: [49.8, 40.4],
    bounds: [44.7, 38.4, 50.8, 41.9],
  },
  eu: {
    id: "eu",
    label: "Yevropa Ittifoqi (EU)",
    isoCodes: [
      "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
      "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
      "SI", "ES", "SE",
    ],
    centroid: [15.0, 50.0],
    bounds: [-10.0, 35.0, 32.0, 60.0],
  },
  mena: {
    id: "mena",
    label: "Yaqin Sharq & Turkiya (MENA)",
    isoCodes: [
      "MA", "DZ", "TN", "LY", "EG", "TR", "SY", "LB", "JO", "IL", "PS", "IQ",
      "IR", "SA", "AE", "QA", "KW", "BH", "OM", "YE",
    ],
    centroid: [45.0, 26.0],
    bounds: [-15.0, 12.0, 62.0, 42.0],
  },
};

// ISO -> Region ID reverse mapping
const ISO_TO_REGION: Record<string, string> = {};
Object.entries(REGION_CONFIG).forEach(([regionId, cfg]) => {
  cfg.isoCodes.forEach((iso) => {
    ISO_TO_REGION[iso] = regionId;
  });
});

const TASHKENT_COORDS: [number, number] = [69.2401, 41.2995];

// Generate quadratic bezier arc
function createCurvedRoute(
  start: [number, number],
  end: [number, number],
  numPoints = 50
): GeoJSON.Feature<GeoJSON.LineString> {
  const [x1, y1] = start;
  const [x2, y2] = end;
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Subtle architectural perpendicular curve
  const offset = Math.min(dist * 0.12, 5);
  const ctrlX = midX - (dy / (dist || 1)) * offset;
  const ctrlY = midY + (dx / (dist || 1)) * offset;

  const coords: [number, number][] = [];
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const invT = 1 - t;
    const x = invT * invT * x1 + 2 * invT * t * ctrlX + t * t * x2;
    const y = invT * invT * y1 + 2 * invT * t * ctrlY + t * t * y2;
    coords.push([x, y]);
  }

  return {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: coords,
    },
    properties: {},
  };
}

const COUNTRY_LABELS = [
  { name: "KAZAKHSTAN", lngLat: [66.0, 47.5] as [number, number] },
  { name: "UZBEKISTAN", lngLat: [63.2, 40.5] as [number, number] },
  { name: "TURKMENISTAN", lngLat: [59.0, 39.0] as [number, number] },
  { name: "KYRGYZSTAN", lngLat: [74.5, 41.2] as [number, number] },
  { name: "TAJIKISTAN", lngLat: [70.5, 38.6] as [number, number] },
  { name: "AZERBAIJAN", lngLat: [48.0, 40.2] as [number, number] },
  { name: "RUSSIA", lngLat: [45.0, 56.5] as [number, number] },
  { name: "CHINA", lngLat: [88.0, 43.5] as [number, number] },
  { name: "IRAN", lngLat: [53.5, 33.0] as [number, number] },
  { name: "AFGHANISTAN", lngLat: [66.0, 33.5] as [number, number] },
  { name: "PAKISTAN", lngLat: [69.5, 29.5] as [number, number] },
  { name: "INDIA", lngLat: [78.0, 24.0] as [number, number] },
  { name: "EUROPE", lngLat: [15.0, 49.0] as [number, number] },
];

function isWebGLSupported(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export const MapLibreExportMap: React.FC<MapLibreExportMapProps> = ({
  activeRegionId,
  onSelectRegion,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  const initialRegionIdRef = useRef<string>(activeRegionId);
  const hoveredRegionRef = useRef<string | null>(null);
  const activeRegionRef = useRef<string>(activeRegionId);
  activeRegionRef.current = activeRegionId;

  // Set hover state for all ISO codes of a region
  const setRegionHoverState = useCallback(
    (map: maplibregl.Map, regionId: string | null, isHover: boolean) => {
      if (!regionId || !REGION_CONFIG[regionId]) return;
      REGION_CONFIG[regionId].isoCodes.forEach((iso) => {
        try {
          map.setFeatureState(
            { source: "countries", id: iso },
            { hover: isHover }
          );
        } catch {}
      });
    },
    []
  );

  // Set selected state for all ISO codes of a region
  const setRegionSelectedState = useCallback(
    (map: maplibregl.Map, regionId: string | null, isSelected: boolean) => {
      if (!regionId || !REGION_CONFIG[regionId]) return;
      REGION_CONFIG[regionId].isoCodes.forEach((iso) => {
        try {
          map.setFeatureState(
            { source: "countries", id: iso },
            { selected: isSelected }
          );
        } catch {}
      });
    },
    []
  );

  // Initialize MapLibre
  useEffect(() => {
    if (!containerRef.current) return;

    if (!isWebGLSupported()) {
      setHasError(true);
      return;
    }

    // Explicitly configure local WebWorker URL for Next.js bundler compatibility
    try {
      maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");
    } catch {}

    let mapInstance: maplibregl.Map | null = null;
    let animFrameId: number;

    try {
      mapInstance = new maplibregl.Map({
        container: containerRef.current,
        style: {
          version: 8,
          sources: {
            countries: {
              type: "geojson",
              data: "/geo/countries-50m.json",
              promoteId: "ISO_A2",
            },
            "route-line": {
              type: "geojson",
              data: createCurvedRoute(
                TASHKENT_COORDS,
                REGION_CONFIG[initialRegionIdRef.current]?.centroid || [68.0, 48.0]
              ),
            },
          },
          layers: [
            {
              id: "background",
              type: "background",
              paint: {
                "background-color": "#08090B",
              },
            },
            {
              id: "countries-fill",
              type: "fill",
              source: "countries",
              paint: {
                "fill-color": [
                  "case",
                  ["boolean", ["feature-state", "selected"], false],
                  "rgba(221, 181, 46, 0.28)", // #DDB52E at 28% opacity
                  ["boolean", ["feature-state", "hover"], false],
                  "#181B20", // slightly lighter on hover
                  "#0E1013", // default dark fill
                ],
                "fill-color-transition": { duration: 250 },
              },
            },
            {
              id: "countries-border",
              type: "line",
              source: "countries",
              paint: {
                "line-color": [
                  "case",
                  ["boolean", ["feature-state", "selected"], false],
                  "#DDB52E",
                  ["boolean", ["feature-state", "hover"], false],
                  "#DDB52E",
                  ["==", ["get", "ISO_A2"], "UZ"],
                  "#5A5E69", // UZ origin border
                  "#34363B", // default thin border
                ],
                "line-width": [
                  "case",
                  ["boolean", ["feature-state", "selected"], false],
                  1.6,
                  ["boolean", ["feature-state", "hover"], false],
                  1.2,
                  ["==", ["get", "ISO_A2"], "UZ"],
                  1.0,
                  0.6,
                ],
                "line-color-transition": { duration: 250 },
              },
            },
            {
              id: "route-line-layer",
              type: "line",
              source: "route-line",
              paint: {
                "line-color": "#DDB52E",
                "line-width": 1.6,
                "line-opacity": 0.85,
                "line-dasharray": [3, 2],
              },
            },
          ],
        },
        center: [55.0, 43.0],
        zoom: 2.6,
        minZoom: 1.8,
        maxZoom: 6.0,
        maxBounds: [-30.0, 8.0, 135.0, 72.0],
        cooperativeGestures: true,
        dragRotate: false,
        touchPitch: false,
        attributionControl: false,
      });

      mapRef.current = mapInstance;

      mapInstance.on("load", () => {
        setIsLoaded(true);

        // Apply initial selected state
        setRegionSelectedState(mapInstance!, activeRegionRef.current, true);

        // Add HTML markers for country labels
        COUNTRY_LABELS.forEach((l) => {
          const labelEl = document.createElement("div");
          labelEl.className =
            "font-mono text-[9px] uppercase tracking-[0.14em] text-[#717684] pointer-events-none select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]";
          labelEl.textContent = l.name;
          new maplibregl.Marker({ element: labelEl, anchor: "center" })
            .setLngLat(l.lngLat)
            .addTo(mapInstance!);
        });

        // Add Toshkent [HQ] Marker
        const hqEl = document.createElement("div");
        hqEl.className =
          "flex items-center gap-2 pointer-events-none select-none -translate-y-1/2";
        hqEl.innerHTML = `
          <div class="relative flex items-center justify-center w-3 h-3">
            <span class="w-3.5 h-3.5 rounded-full bg-[#D4AF37] opacity-60 animate-ping absolute"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#D4AF37] border-2 border-[#08090B] relative z-10"></span>
          </div>
          <span class="font-mono text-[10.5px] font-bold tracking-[0.08em] text-[#F5F4F0] bg-[#090A0D]/90 px-1.5 py-0.5 rounded-[2px] border border-white/10 whitespace-nowrap shadow-sm">
            TASHKENT [HQ]
          </span>
        `;
        new maplibregl.Marker({ element: hqEl, anchor: "left" })
          .setLngLat(TASHKENT_COORDS)
          .addTo(mapInstance!);

        // Subtle animation for route line (breathe opacity)
        const prefersReducedMotion =
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!prefersReducedMotion) {
          let opacity = 0.85;
          let growing = false;
          const animate = () => {
            if (growing) {
              opacity += 0.004;
              if (opacity >= 0.95) growing = false;
            } else {
              opacity -= 0.004;
              if (opacity <= 0.65) growing = true;
            }
            if (mapInstance && mapInstance.getLayer("route-line-layer")) {
              mapInstance.setPaintProperty("route-line-layer", "line-opacity", opacity);
            }
            animFrameId = requestAnimationFrame(animate);
          };
          animFrameId = requestAnimationFrame(animate);
        }
      });

      // Mouse Move: Hover & Tooltip
      mapInstance.on("mousemove", "countries-fill", (e: maplibregl.MapLayerMouseEvent) => {
        if (!e.features || !e.features.length) return;
        const iso = e.features[0].properties?.ISO_A2;

        if (iso === "UZ") {
          // UZ is origin - not interactive
          mapInstance!.getCanvas().style.cursor = "default";
          if (hoveredRegionRef.current) {
            setRegionHoverState(mapInstance!, hoveredRegionRef.current, false);
            hoveredRegionRef.current = null;
          }
          setTooltip(null);
          return;
        }

        const regionId = ISO_TO_REGION[iso];
        if (regionId) {
          mapInstance!.getCanvas().style.cursor = "pointer";
          if (hoveredRegionRef.current !== regionId) {
            if (hoveredRegionRef.current) {
              setRegionHoverState(mapInstance!, hoveredRegionRef.current, false);
            }
            hoveredRegionRef.current = regionId;
            setRegionHoverState(mapInstance!, regionId, true);
          }
          setTooltip({
            x: e.point.x,
            y: e.point.y - 12,
            text: REGION_CONFIG[regionId].label,
          });
        } else {
          mapInstance!.getCanvas().style.cursor = "default";
          if (hoveredRegionRef.current) {
            setRegionHoverState(mapInstance!, hoveredRegionRef.current, false);
            hoveredRegionRef.current = null;
          }
          setTooltip(null);
        }
      });

      // Mouse Leave: Clear Hover
      mapInstance.on("mouseleave", "countries-fill", () => {
        mapInstance!.getCanvas().style.cursor = "default";
        if (hoveredRegionRef.current) {
          setRegionHoverState(mapInstance!, hoveredRegionRef.current, false);
          hoveredRegionRef.current = null;
        }
        setTooltip(null);
      });

      // Click: Select Region
      mapInstance.on("click", "countries-fill", (e: maplibregl.MapLayerMouseEvent) => {
        if (!e.features || !e.features.length) return;
        const iso = e.features[0].properties?.ISO_A2;
        if (!iso || iso === "UZ") return;

        const regionId = ISO_TO_REGION[iso];
        if (regionId) {
          onSelectRegion(regionId);
        }
      });
    } catch (err) {
      console.error("MapLibre init error:", err);
      setHasError(true);
    }

    // ResizeObserver for fluid responsiveness
    const resizeObserver = new ResizeObserver(() => {
      mapInstance?.resize();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      resizeObserver.disconnect();
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [onSelectRegion, setRegionHoverState, setRegionSelectedState]);

  // Synchronize activeRegionId updates
  const prevActiveRegionRef = useRef<string>(activeRegionId);
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isLoaded) return;

    const prevRegion = prevActiveRegionRef.current;
    if (prevRegion !== activeRegionId) {
      // Unselect previous
      if (prevRegion) {
        setRegionSelectedState(map, prevRegion, false);
      }
      // Select new
      setRegionSelectedState(map, activeRegionId, true);
      prevActiveRegionRef.current = activeRegionId;

      // Update route line
      const regionCfg = REGION_CONFIG[activeRegionId];
      if (regionCfg) {
        const routeSource = map.getSource("route-line") as maplibregl.GeoJSONSource | undefined;
        if (routeSource) {
          routeSource.setData(createCurvedRoute(TASHKENT_COORDS, regionCfg.centroid));
        }

        // Fit bounds smoothly
        map.fitBounds(regionCfg.bounds, {
          padding: { top: 40, bottom: 40, left: 40, right: 40 },
          maxZoom: 4.8,
          duration: 600,
        });
      }
    }
  }, [activeRegionId, isLoaded, setRegionSelectedState]);

  if (hasError) {
    return (
      <div className="w-full h-full min-h-[360px] flex flex-col items-center justify-center bg-[#08090B] text-[#8E95A5] font-mono text-[11px] gap-2 p-6 text-center">
        <span className="text-[#D4AF37] font-bold">XARITA MODULINI YUKLASHDA XATOLIK</span>
        <span>WebGL qo‘llab-quvvatlanmadi yoki xarita ma’lumotlari mavjud emas.</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[360px] select-none"
      aria-label="Markaziy Osiyo va Yevroosiyo B2B eksport koridorlari interaktiv xaritasi"
    >
      {/* Zoom Controls */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-1">
        <button
          type="button"
          aria-label="Xaritani kattalashtirish"
          onClick={() => mapRef.current?.zoomIn()}
          className="w-7 h-7 bg-[#111215]/90 border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] text-[#A1A7B3] rounded-[2px] flex items-center justify-center font-mono text-[14px] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
        >
          +
        </button>
        <button
          type="button"
          aria-label="Xaritani kichiklashtirish"
          onClick={() => mapRef.current?.zoomOut()}
          className="w-7 h-7 bg-[#111215]/90 border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] text-[#A1A7B3] rounded-[2px] flex items-center justify-center font-mono text-[14px] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
        >
          −
        </button>
      </div>

      {/* Floating Tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none z-30 font-mono text-[10.5px] font-semibold text-[#F5F4F0] bg-[#111215]/95 border border-[#DDB52E]/70 px-2.5 py-1 rounded-[2px] shadow-[0_4px_12px_rgba(0,0,0,0.7)] -translate-x-1/2 -translate-y-full mb-2 whitespace-nowrap"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}

      {/* Map Legend (Bottom-Left) */}
      <div className="absolute bottom-3 left-3 pointer-events-none z-20 flex items-center gap-2 font-mono text-[10px] text-[#C2C7D1] bg-[#090A0D]/90 backdrop-blur-sm px-3 py-1.5 border border-white/[0.1] rounded-[3px]">
        <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" aria-hidden="true" />
        <span>Toshkent Boshqaruv Markazi (HQ)</span>
      </div>
    </div>
  );
};
