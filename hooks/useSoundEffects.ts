'use client';
import { useCallback, useState } from 'react';

let muted = false;
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const C = window.AudioContext || (window as any).webkitAudioContext;
    if (C) audioCtx = new C();
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function tone(
  type: OscillatorType,
  freqs: [number, number][],
  vol: number,
  dur: number,
  start = 0
) {
  if (muted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime + start;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    freqs.forEach(([f, t], i) => {
      if (i === 0) osc.frequency.setValueAtTime(f, now + t);
      else osc.frequency.exponentialRampToValueAtTime(f, now + t);
    });
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + dur);
  } catch {
    // Audio autoplay policy fallback
  }
}

const playClick = () => tone('sine', [[800, 0], [400, 0.04]], 0.08, 0.04);
const playThemeToggle = () => tone('triangle', [[523.25, 0], [783.99, 0.08], [1046.5, 0.16]], 0.09, 0.22);
const playModalOpen = () => tone('sine', [[320, 0], [640, 0.12]], 0.07, 0.14);
const playSuccess = () => {
  [587.33, 739.99, 880.0].forEach((f, i) => tone('sine', [[f, 0]], 0.08, 0.18, i * 0.07));
};

export function useSoundEffects() {
  const [isMuted, setIsMuted] = useState(muted);
  const toggleMute = useCallback(() => {
    muted = !muted;
    setIsMuted(muted);
    if (!muted) playClick();
  }, []);
  return { isMuted, toggleMute, playClick, playThemeToggle, playModalOpen, playSuccess };
}
