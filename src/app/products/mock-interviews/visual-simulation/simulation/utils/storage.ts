interface Recording {
  id: string;
  questionId: string;
  blob: Blob;
  duration: string;
  timestamp: number;
}

interface Metrics {
  overallScore?: number;
  feedback?: string;
}

export const saveRecording = async (recording: Recording) => {
  try {
    // Convert blob to base64 for storage
    const reader = new FileReader();
    const base64Promise = new Promise<string>((resolve) => {
      reader.onloadend = () => {
        const base64 = reader.result as string;
        resolve(base64);
      };
    });
    
    reader.readAsDataURL(recording.blob);
    const base64Data = await base64Promise;

    // Save to localStorage (in production, this should be saved to a server)
    const recordings = JSON.parse(localStorage.getItem('recordings') || '[]');
    recordings.push({
      ...recording,
      blob: base64Data,
    });
    
    localStorage.setItem('recordings', JSON.stringify(recordings));
  } catch (error) {
    console.error('Error saving recording:', error);
    throw error;
  }
};

export const saveMetrics = (metrics: Metrics) => {
  try {
    const allMetrics = JSON.parse(localStorage.getItem('metrics') || '[]');
    allMetrics.push({
      ...metrics,
      timestamp: Date.now(),
    });
    
    localStorage.setItem('metrics', JSON.stringify(allMetrics));
  } catch (error) {
    console.error('Error saving metrics:', error);
    throw error;
  }
};
