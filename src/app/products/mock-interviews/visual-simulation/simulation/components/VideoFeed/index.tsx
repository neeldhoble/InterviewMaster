import React, { useEffect, useState } from 'react';
import { Video, User, Mic, MicOff, Camera, CameraOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoFeedProps {
  isAI?: boolean;
  stream: MediaStream | null;
  isRecording?: boolean;
  duration?: string;
  timeRemaining?: string;
  isThinking?: boolean;
  currentQuestion?: string;
  videoRef?: React.RefObject<HTMLVideoElement>;
  onToggleAudio?: () => void;
  onToggleVideo?: () => void;
  isAudioEnabled?: boolean;
  isVideoEnabled?: boolean;
}

const VideoFeed: React.FC<VideoFeedProps> = ({
  isAI = false,
  stream,
  isRecording,
  duration,
  timeRemaining,
  isThinking,
  currentQuestion,
  videoRef,
  onToggleAudio,
  onToggleVideo,
  isAudioEnabled = true,
  isVideoEnabled = true,
}) => {
  const [showControls, setShowControls] = useState(false);

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    if (showControls) {
      const timer = setTimeout(() => setShowControls(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showControls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-1">
        <div className="aspect-video rounded-xl overflow-hidden bg-black/50 relative">
          {/* Video Display */}
          {isAI ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#fcba2810] to-transparent">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <User className="w-20 h-20 text-[#fcba28]" />
              </motion.div>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  stream && isVideoEnabled ? 'opacity-100' : 'opacity-0'
                }`}
              />
              {(!stream || !isVideoEnabled) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#fcba2810] to-transparent">
                  <Video className="w-20 h-20 text-gray-600" />
                </div>
              )}
            </>
          )}

          {/* Video Controls */}
          <AnimatePresence>
            {!isAI && showControls && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-black/80 rounded-full backdrop-blur-sm"
              >
                <button
                  onClick={onToggleAudio}
                  className={`p-2 rounded-full transition-colors ${
                    isAudioEnabled ? 'bg-[#fcba28] text-black' : 'bg-red-500/20 text-red-500'
                  }`}
                >
                  {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>
                <button
                  onClick={onToggleVideo}
                  className={`p-2 rounded-full transition-colors ${
                    isVideoEnabled ? 'bg-[#fcba28] text-black' : 'bg-red-500/20 text-red-500'
                  }`}
                >
                  {isVideoEnabled ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status Indicators */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            {timeRemaining && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#fcba28]/90 text-black px-3 py-1 rounded-full text-sm font-medium"
              >
                {timeRemaining}
              </motion.div>
            )}
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 bg-red-500/90 text-white px-3 py-1 rounded-full text-sm"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                {duration}
              </motion.div>
            )}
          </div>

          {/* Name Tag */}
          <div className="absolute bottom-4 left-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isAI
                  ? 'bg-[#fcba28]/90 text-black'
                  : 'bg-white/90 text-black'
              }`}
            >
              {isAI ? `AI Interviewer ${isThinking ? '(Thinking...)' : ''}` : 'You'}
            </motion.div>
          </div>

          {/* Question Display */}
          <AnimatePresence>
            {currentQuestion && isAI && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 right-4 max-w-[80%] bg-black/80 text-white px-4 py-2 rounded-lg backdrop-blur-sm"
              >
                {currentQuestion}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Hover Area for Controls */}
      {!isAI && (
        <div
          className="absolute inset-0 cursor-pointer"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        />
      )}
    </motion.div>
  );
};

export default VideoFeed;
