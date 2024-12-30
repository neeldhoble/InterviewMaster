import React from 'react';
import { Play, Square, Pause, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ControlsProps {
  isStarted: boolean;
  isPaused: boolean;
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  isStarted,
  isPaused,
  isRecording,
  onStart,
  onStop,
  onPause,
  onResume,
  onReset,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-1"
    >
      <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AnimatePresence mode="wait">
              {!isStarted ? (
                <motion.button
                  key="start"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onStart}
                  className="flex items-center gap-2 px-6 py-3 bg-[#fcba28] text-black rounded-xl font-medium hover:bg-[#fcba28]/90 transition-colors"
                >
                  <Play className="w-5 h-5" />
                  Start Interview
                </motion.button>
              ) : (
                <>
                  <motion.button
                    key="stop"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStop}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500/20 text-red-500 rounded-xl font-medium hover:bg-red-500/30 transition-colors"
                  >
                    <Square className="w-5 h-5" />
                    End Interview
                  </motion.button>
                  
                  <motion.button
                    key="pause"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={isPaused ? onResume : onPause}
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
                    disabled={!isRecording}
                  >
                    {isPaused ? (
                      <>
                        <Play className="w-5 h-5" />
                        Resume
                      </>
                    ) : (
                      <>
                        <Pause className="w-5 h-5" />
                        Pause
                      </>
                    )}
                  </motion.button>
                </>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Controls;
