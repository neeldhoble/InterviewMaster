import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Scissors, Trash2, Share2, Clock, Star, BarChart2, ChevronDown, ChevronUp, Minimize2, Maximize2, Check, X, Play } from 'lucide-react';

interface Recording {
  id: string;
  questionId: string;
  blob: string;
  duration: string;
  timestamp: number;
  score?: number;
  feedback?: string;
  startTime?: number;
  endTime?: number;
}

interface CutState {
  recordingId: string;
  startTime: number;
  endTime: number;
}

const RecordingManager: React.FC = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [minimizedRecordings, setMinimizedRecordings] = useState<Set<string>>(new Set());
  const [isManagerMinimized, setIsManagerMinimized] = useState(false);
  const [cutState, setCutState] = useState<CutState | null>(null);
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Load recordings from localStorage
    const savedRecordings = localStorage.getItem('recordings');
    if (savedRecordings) {
      setRecordings(JSON.parse(savedRecordings));
    }
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePreview();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleDownload = (recording: Recording) => {
    const blob = dataURLtoBlob(recording.blob);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-recording-${recording.timestamp}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDelete = (id: string) => {
    const updatedRecordings = recordings.filter(rec => rec.id !== id);
    setRecordings(updatedRecordings);
    localStorage.setItem('recordings', JSON.stringify(updatedRecordings));
  };

  const startCutting = (recording: Recording) => {
    setCutState({
      recordingId: recording.id,
      startTime: 0,
      endTime: getDurationInSeconds(recording.duration)
    });
  };

  const handleCutConfirm = async (recording: Recording) => {
    if (!cutState) return;

    try {
      // Create a new blob from the cut video
      const originalBlob = dataURLtoBlob(recording.blob);
      const newBlob = await cutVideo(originalBlob, cutState.startTime, cutState.endTime);
      
      // Update the recording with the new blob and duration
      const updatedRecording = {
        ...recording,
        blob: await blobToDataURL(newBlob),
        duration: formatDuration(cutState.endTime - cutState.startTime),
        startTime: cutState.startTime,
        endTime: cutState.endTime
      };

      // Update recordings list
      const newRecordings = recordings.map(rec => 
        rec.id === recording.id ? updatedRecording : rec
      );

      setRecordings(newRecordings);
      localStorage.setItem('recordings', JSON.stringify(newRecordings));
      setCutState(null);
    } catch (error) {
      console.error('Error cutting video:', error);
      // Handle error appropriately
    }
  };

  const toggleRecordingMinimize = (id: string) => {
    setMinimizedRecordings(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handlePlay = (recording: Recording) => {
    setSelectedRecording(recording);
    setIsPlaying(true);
  };

  const closePreview = () => {
    setIsPlaying(false);
    setSelectedRecording(null);
  };

  const dataURLtoBlob = (dataURL: string): Blob => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] ?? '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const blobToDataURL = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const cutVideo = async (blob: Blob, startTime: number, endTime: number): Promise<Blob> => {
    // This is a placeholder for actual video cutting logic
    // You would need to implement actual video cutting using Web APIs or a library
    return blob;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDurationInSeconds = (duration: string): number => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-1 transition-all duration-300 ${
        isManagerMinimized ? 'h-[60px] overflow-hidden' : ''
      }`}
    >
      <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Your Recordings</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsManagerMinimized(!isManagerMinimized)}
            className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            {isManagerMinimized ? (
              <Maximize2 className="w-5 h-5" />
            ) : (
              <Minimize2 className="w-5 h-5" />
            )}
          </motion.button>
        </div>
        
        <AnimatePresence>
          {!isManagerMinimized && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              {recordings.map((recording) => (
                <motion.div
                  key={recording.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">
                          {formatDate(recording.timestamp)}
                        </span>
                      </div>
                      
                      {!minimizedRecordings.has(recording.id) && (
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <BarChart2 className="w-4 h-4 text-[#fcba28]" />
                            <span className="text-white">
                              Score: {recording.score ?? 'N/A'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#fcba28]" />
                            <span className="text-white">
                              Duration: {recording.duration}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleRecordingMinimize(recording.id)}
                        className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                      >
                        {minimizedRecordings.has(recording.id) ? (
                          <ChevronDown className="w-5 h-5" />
                        ) : (
                          <ChevronUp className="w-5 h-5" />
                        )}
                      </motion.button>

                      {cutState?.recordingId === recording.id ? (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCutConfirm(recording)}
                            className="p-2 rounded-lg bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-colors"
                          >
                            <Check className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCutState(null)}
                            className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </motion.button>
                        </>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => startCutting(recording)}
                          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                        >
                          <Scissors className="w-5 h-5" />
                        </motion.button>
                      )}
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePlay(recording)}
                        className="p-2 rounded-lg bg-[#fcba28] text-black hover:bg-[#fcba28]/90 transition-colors"
                      >
                        <Play className="w-5 h-5" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDownload(recording)}
                        className="p-2 rounded-lg bg-[#fcba28] text-black hover:bg-[#fcba28]/90 transition-colors"
                      >
                        <Download className="w-5 h-5" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(recording.id)}
                        className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>

                  {cutState?.recordingId === recording.id && (
                    <div className="mt-4 p-4 bg-white/5 rounded-lg">
                      <div className="flex flex-col gap-4">
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Start Time (seconds)</label>
                          <input
                            type="range"
                            min="0"
                            max={getDurationInSeconds(recording.duration)}
                            value={cutState.startTime}
                            onChange={(e) => setCutState({
                              ...cutState,
                              startTime: Number(e.target.value)
                            })}
                            className="w-full"
                          />
                          <span className="text-sm text-white">{formatDuration(cutState.startTime)}</span>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">End Time (seconds)</label>
                          <input
                            type="range"
                            min={cutState.startTime}
                            max={getDurationInSeconds(recording.duration)}
                            value={cutState.endTime}
                            onChange={(e) => setCutState({
                              ...cutState,
                              endTime: Number(e.target.value)
                            })}
                            className="w-full"
                          />
                          <span className="text-sm text-white">{formatDuration(cutState.endTime)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <AnimatePresence>
                    {!minimizedRecordings.has(recording.id) && recording.feedback && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-3 bg-white/5 rounded-lg"
                      >
                        <p className="text-sm text-gray-300">{recording.feedback}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {recordings.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No recordings yet. Start an interview to create your first recording!
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Player Modal with Close Button */}
        <AnimatePresence>
          {selectedRecording && isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              onClick={closePreview}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-[#1a1a1a] p-4 rounded-2xl max-w-4xl w-full mx-4 relative"
                onClick={e => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={closePreview}
                  className="absolute -top-4 -right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10 shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* ESC key hint */}
                <div className="absolute top-2 left-2 text-sm text-gray-400 bg-black/50 px-2 py-1 rounded">
                  Press ESC to close
                </div>

                <video
                  src={selectedRecording.blob}
                  controls
                  className="w-full rounded-lg"
                  autoPlay
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default RecordingManager;
