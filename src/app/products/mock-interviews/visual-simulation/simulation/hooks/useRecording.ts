import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface RecordingData {
  id: string;
  blob: string;
  timestamp: number;
  duration: string;
  questionId: string;
  questionText: string;
  score?: number;
  feedback?: string;
}

export const useRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<{ id: string; text: string } | null>(null);

  const saveRecording = async (blob: Blob) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      
      reader.onloadend = () => {
        const base64data = reader.result as string;
        
        // Calculate duration
        const endTime = Date.now();
        const duration = endTime - startTimeRef.current;
        const minutes = Math.floor(duration / 60000);
        const seconds = ((duration % 60000) / 1000).toFixed(0);
        const formattedDuration = `${minutes}:${seconds.padStart(2, '0')}`;

        // Create recording data object
        const recordingData: RecordingData = {
          id: uuidv4(),
          blob: base64data,
          timestamp: Date.now(),
          duration: formattedDuration,
          questionId: currentQuestion?.id || 'unknown',
          questionText: currentQuestion?.text || 'Unknown Question',
        };

        // Get existing recordings
        const existingRecordingsStr = localStorage.getItem('recordings');
        const existingRecordings: RecordingData[] = existingRecordingsStr 
          ? JSON.parse(existingRecordingsStr) 
          : [];

        // Add new recording
        const updatedRecordings = [...existingRecordings, recordingData];
        
        // Save to localStorage
        localStorage.setItem('recordings', JSON.stringify(updatedRecordings));

        // Also save to indexedDB for larger storage
        saveToIndexedDB(recordingData);
      };
    } catch (error) {
      console.error('Error saving recording:', error);
      setRecordingError('Failed to save recording');
    }
  };

  const saveToIndexedDB = async (recordingData: RecordingData) => {
    try {
      const db = await openDB();
      const tx = db.transaction('recordings', 'readwrite');
      const store = tx.objectStore('recordings');
      await store.add(recordingData);
    } catch (error) {
      console.error('Error saving to IndexedDB:', error);
    }
  };

  const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('InterviewRecordings', 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('recordings')) {
          db.createObjectStore('recordings', { keyPath: 'id' });
        }
      };
    });
  };

  const startRecording = async (question: { id: string; text: string }) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      startTimeRef.current = Date.now();
      setCurrentQuestion(question);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        saveRecording(blob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingError(null);
    } catch (error) {
      console.error('Error starting recording:', error);
      setRecordingError('Failed to start recording');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.pause();
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.resume();
    }
  };

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);

  return {
    isRecording,
    recordingError,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording
  };
};
