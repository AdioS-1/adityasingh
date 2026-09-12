// Subtle sensory sound effects using Web Audio API (zero external assets)
let audioCtx: AudioContext | null = null;
let isSoundEnabled = false;

export const toggleSound = (): boolean => {
  isSoundEnabled = !isSoundEnabled;
  if (isSoundEnabled && !audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (isSoundEnabled && audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  if (isSoundEnabled) {
    playTick(580, 0.03, 'sine');
  }
  return isSoundEnabled;
};

export const getSoundState = (): boolean => isSoundEnabled;

export const playTick = (freq = 440, duration = 0.02, type: OscillatorType = 'sine', gainVal = 0.015) => {
  if (!isSoundEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtx.currentTime + duration);
    
    gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // Gracefully handle browser autoplay policy
  }
};

export const playOpenCaseStudy = () => {
  if (!isSoundEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(480, audioCtx.currentTime + 0.12);
    
    gain.gain.setValueAtTime(0.025, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.14);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.14);
  } catch {
    // Ignore audio error
  }
};
