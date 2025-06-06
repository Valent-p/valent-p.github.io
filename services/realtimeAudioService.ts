
// src/services/realtimeAudioService.ts

let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null; 

  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.error("Web Audio API is not supported in this browser.", e);
      return null;
    }
  }
  
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume().catch(e => console.warn("AudioContext resume failed:", e));
  }
  return audioContext;
};

const playToneInternal = (
    context: AudioContext,
    frequency: number,
    startTime: number,
    duration: number, 
    volume: number,
    type: OscillatorType,
    attack: number,
    decay: number 
  ) => {
  try {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);

    gainNode.connect(context.destination);
    oscillator.connect(gainNode);

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + attack);
    gainNode.gain.setValueAtTime(volume, startTime + attack + duration); 
    gainNode.gain.linearRampToValueAtTime(0, startTime + attack + duration + decay);

    oscillator.start(startTime);
    oscillator.stop(startTime + attack + duration + decay + 0.05); 

    oscillator.onended = () => {
      if (oscillator.disconnect) oscillator.disconnect();
      if (gainNode.disconnect) gainNode.disconnect();
    };
  } catch (error) {
    console.error("Error playing tone internal:", error);
  }
};

const playGeneralTone = (frequency: number, duration: number, volume: number = 0.5, type: OscillatorType = 'sine', attack: number = 0.01, decay: number = 0.1) => {
  const context = getAudioContext();
  if (!context) return;
  playToneInternal(context, frequency, context.currentTime, duration, volume, type, attack, decay);
};


export const playStartSound = () => {
  const context = getAudioContext();
  if (!context) return;

  const now = context.currentTime;
  const volume = 0.18; 
  const baseFreq = 300;
  const peakFreq = 330;
  const totalDuration = 0.25; 
  const attackTime = 0.05;
  
  const oscillator = context.createOscillator();
  oscillator.type = 'sine';
  const gainNode = context.createGain();

  oscillator.frequency.setValueAtTime(baseFreq, now);
  oscillator.frequency.linearRampToValueAtTime(peakFreq, now + attackTime * 0.7); 
  oscillator.frequency.linearRampToValueAtTime(baseFreq * 0.9, now + totalDuration); 

  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(volume, now + attackTime);
  gainNode.gain.linearRampToValueAtTime(0, now + totalDuration);

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start(now);
  oscillator.stop(now + totalDuration + 0.05);

  oscillator.onended = () => {
    oscillator.disconnect();
    gainNode.disconnect();
  };
};

export const playClickSound = () => { 
  const context = getAudioContext();
  if (!context) return;

  const now = context.currentTime;
  const clickDuration = 0.05; 
  const volume = 0.12; 

  const bufferSize = Math.max(44, Math.floor(context.sampleRate * 0.005)); 
  const noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1; 
  }

  const noiseSource = context.createBufferSource();
  noiseSource.buffer = noiseBuffer;

  const gainNode = context.createGain();
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(volume, now + 0.002); 
  gainNode.gain.linearRampToValueAtTime(0, now + clickDuration);   

  const filter = context.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1500, now); 
  filter.Q.setValueAtTime(1, now); 

  noiseSource.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(context.destination);

  noiseSource.start(now);
  noiseSource.stop(now + clickDuration + 0.01); 

  noiseSource.onended = () => {
    noiseSource.disconnect();
    filter.disconnect();
    gainNode.disconnect();
  };
};

export const playSingleRevealSound = () => { 
  const context = getAudioContext();
  if (!context) return;

  const now = context.currentTime;
  const duration = 0.08;
  const volume = 0.18; 

  const oscillator = context.createOscillator();
  oscillator.type = 'triangle'; 
  oscillator.frequency.setValueAtTime(480, now); 
  oscillator.frequency.linearRampToValueAtTime(350, now + duration * 0.7);

  const gainNode = context.createGain();
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(volume, now + 0.01); 
  gainNode.gain.linearRampToValueAtTime(0, now + duration);   

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start(now);
  oscillator.stop(now + duration + 0.02);

  oscillator.onended = () => {
    oscillator.disconnect();
    gainNode.disconnect();
  };
};


export const playEmptyRevealSound = () => { 
  const context = getAudioContext();
  if (!context) return;

  const now = context.currentTime;
  const volume = 0.15; 
  const startFreq = 180; 
  const endFreq = 90;    
  const totalDuration = 0.22; 
  const attackTime = 0.01;

  const oscillator = context.createOscillator();
  oscillator.type = 'sine';

  const gainNode = context.createGain();
  
  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(450, now); 
  filter.Q.setValueAtTime(0.7, now);

  oscillator.frequency.setValueAtTime(startFreq, now);
  oscillator.frequency.exponentialRampToValueAtTime(endFreq, now + totalDuration * 0.6);

  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(volume, now + attackTime);
  gainNode.gain.linearRampToValueAtTime(0, now + totalDuration);

  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start(now);
  oscillator.stop(now + totalDuration + 0.05);

  oscillator.onended = () => {
    oscillator.disconnect();
    filter.disconnect();
    gainNode.disconnect();
  };
};

export const playFlagSound = () => {
  const context = getAudioContext();
  if (!context) return;

  const now = context.currentTime;
  const volume = 0.18; 
  const attackTime = 0.005;
  const decayTime = 0.06; 
  const totalDuration = attackTime + decayTime;
  const startFreq = 700; 
  const endFreq = 350;   

  const oscillator = context.createOscillator();
  oscillator.type = 'triangle'; 

  const gainNode = context.createGain();

  oscillator.frequency.setValueAtTime(startFreq, now);
  oscillator.frequency.exponentialRampToValueAtTime(endFreq, now + totalDuration * 0.7);

  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(volume, now + attackTime);
  gainNode.gain.linearRampToValueAtTime(0, now + totalDuration);

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start(now);
  oscillator.stop(now + totalDuration + 0.05);

  oscillator.onended = () => {
    oscillator.disconnect();
    gainNode.disconnect();
  };
};

export const playExplosionSound = () => playGeneralTone(100, 0.2, 0.35, 'sawtooth', 0.01, 0.25); 

export const playWinSound = () => {
  const context = getAudioContext();
  if (!context) return;

  const now = context.currentTime;
  const fundamental = 261.63; 
  const volume = 0.22; 
  const noteSustainDuration = 0.08; 
  const attack = 0.01;
  const decay = 0.07; 
  const offset = 0.12; 

  playToneInternal(context, fundamental, now, noteSustainDuration, volume, 'sine', attack, decay);
  playToneInternal(context, fundamental * 5/4, now + offset, noteSustainDuration, volume, 'sine', attack, decay);
  playToneInternal(context, fundamental * 3/2, now + offset * 2, noteSustainDuration, volume, 'sine', attack, decay);
  playToneInternal(context, fundamental * 2, now + offset * 3, noteSustainDuration * 1.5, volume * 1.2, 'sine', attack, decay * 1.5);
};

export const playPowerUpActivateSound = () => {
  const context = getAudioContext();
  if (!context) return;
  const now = context.currentTime;
  playToneInternal(context, 600, now, 0.05, 0.2, 'triangle', 0.005, 0.08);
  playToneInternal(context, 900, now + 0.07, 0.08, 0.2, 'triangle', 0.005, 0.1);
};

export const playShieldBlockSound = () => {
  const context = getAudioContext();
  if (!context) return;
  const now = context.currentTime;
  playToneInternal(context, 400, now, 0.15, 0.3, 'square', 0.01, 0.2);
  playToneInternal(context, 300, now + 0.05, 0.15, 0.25, 'sawtooth', 0.01, 0.2);
};

export const playPurchaseSound = () => {
    const context = getAudioContext();
    if (!context) return;
    const now = context.currentTime;
    // Short, pleasant "cha-ching" like sound
    playToneInternal(context, 523.25, now, 0.05, 0.2, 'sine', 0.005, 0.08); // C5
    playToneInternal(context, 783.99, now + 0.07, 0.08, 0.2, 'sine', 0.005, 0.1); // G5
};

export const playNotEnoughCoinsSound = () => {
    const context = getAudioContext();
    if (!context) return;
    const now = context.currentTime;
    // Low, slightly dissonant buzz
    playToneInternal(context, 150, now, 0.15, 0.25, 'sawtooth', 0.01, 0.1);
    playToneInternal(context, 140, now + 0.02, 0.15, 0.25, 'sawtooth', 0.01, 0.1); // Slight dissonance
};

export const playErrorSound = () => { // Generic error sound
    const context = getAudioContext();
    if (!context) return;
    const now = context.currentTime;
    playToneInternal(context, 220, now, 0.1, 0.2, 'square', 0.01, 0.15);
    playToneInternal(context, 200, now + 0.12, 0.1, 0.2, 'square', 0.01, 0.15);
};