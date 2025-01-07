"use client";

class SpeechService {
  private synth: SpeechSynthesis;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synth = window.speechSynthesis;
    this.initVoice();
  }

  private async initVoice() {
    // Wait for voices to be loaded
    if (this.synth.getVoices().length === 0) {
      await new Promise<void>(resolve => {
        this.synth.addEventListener('voiceschanged', () => resolve(), { once: true });
      });
    }

    // Select a natural-sounding voice
    const voices = this.synth.getVoices();
    this.voice = voices.find(voice => 
      voice.name.includes('Microsoft') || 
      voice.name.includes('Google') || 
      voice.name.includes('Natural')
    ) || voices[0];
  }

  speak(text: string, onStart?: () => void, onEnd?: () => void) {
    // Cancel any ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.voice;
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => onStart?.();
    utterance.onend = () => onEnd?.();

    this.synth.speak(utterance);
  }

  stop() {
    this.synth.cancel();
  }
}

export const speechService = new SpeechService();
