const fs = require('fs');
const path = require('path');

const audioDir = path.resolve(__dirname, '../public/audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

function createWavBuffer(seconds, baseFreq, chordFreq) {
  const sampleRate = 44100;
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const numSamples = sampleRate * seconds;
  const dataSize = numSamples * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size
  buffer.writeUInt16LE(1, 20);  // AudioFormat (PCM = 1)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);

  // data chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Write harmonic architectural chime / monograph sound bed
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    // Envelope: smooth attack, gentle sustain, soft fade out
    const attack = Math.min(t / 1.5, 1);
    const decay = Math.max(0, 1 - (t / seconds));
    const envelope = attack * Math.pow(decay, 0.7);

    // Warm resonant dual frequency
    const sampleVal = (
      Math.sin(2 * Math.PI * baseFreq * t) * 0.5 +
      Math.sin(2 * Math.PI * chordFreq * t) * 0.3 +
      Math.sin(2 * Math.PI * (baseFreq * 2) * t) * 0.15
    ) * envelope;

    const intSample = Math.max(-32768, Math.min(32767, Math.floor(sampleVal * 28000)));
    buffer.writeInt16LE(intSample, 44 + i * 2);
  }

  return buffer;
}

const files = [
  { name: 'thesis-sop.wav', duration: 15, base: 216, chord: 432 },
  { name: 'thesis-delegation.wav', duration: 15, base: 256, chord: 512 },
  { name: 'thesis-erp.wav', duration: 15, base: 288, chord: 576 },
  { name: 'thesis-culture.wav', duration: 15, base: 324, chord: 648 },
];

for (const f of files) {
  const filePath = path.join(audioDir, f.name);
  const buf = createWavBuffer(f.duration, f.base, f.chord);
  fs.writeFileSync(filePath, buf);
  console.log(`Generated real audio asset: ${filePath} (${(buf.length / 1024).toFixed(1)} KB)`);
}

