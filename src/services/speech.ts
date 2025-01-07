"use client";

interface SpeechConfig {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice;
}

class SpeechService {
  private synth: SpeechSynthesis;
  private recognition: any;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private preferredVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synth = window.speechSynthesis;
    this.initVoice();
    this.initRecognition();
  }

  private async initVoice() {
    if (this.synth.getVoices().length === 0) {
      await new Promise<void>(resolve => {
        this.synth.addEventListener('voiceschanged', () => resolve(), { once: true });
      });
    }

    const voices = this.synth.getVoices();
    this.preferredVoice = voices.find(voice => 
      voice.name.includes('Microsoft') || 
      voice.name.includes('Google') || 
      voice.name.includes('Natural')
    ) || voices[0];
  }

  private initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
    }
  }

  speak(
    text: string, 
    onStart?: () => void, 
    onEnd?: () => void,
    config: SpeechConfig = {}
  ) {
    // Cancel any ongoing speech
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply configuration
    utterance.voice = config.voice || this.preferredVoice;
    utterance.rate = config.rate || 0.9; // Slightly slower for clarity
    utterance.pitch = config.pitch || 1;
    utterance.volume = config.volume || 1;

    utterance.onstart = () => {
      this.currentUtterance = utterance;
      onStart?.();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      onEnd?.();
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      this.currentUtterance = null;
      onEnd?.();
    };

    this.synth.speak(utterance);
  }

  startRecognition(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError?: (error: any) => void
  ) {
    if (!this.recognition) {
      onError?.(new Error('Speech recognition not supported'));
      return;
    }

    this.recognition.onresult = (event: any) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      onResult(transcript, result.isFinal);
    };

    this.recognition.onerror = (error: any) => {
      onError?.(error);
    };

    this.recognition.start();
  }

  stopRecognition() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  stop() {
    if (this.currentUtterance) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  pause() {
    this.synth.pause();
  }

  resume() {
    this.synth.resume();
  }

  getVoices(): SpeechSynthesisVoice[] {
    return this.synth.getVoices();
  }

  setPreferredVoice(voice: SpeechSynthesisVoice) {
    this.preferredVoice = voice;
  }
}

export const speechService = new SpeechService();
