import React, { useState } from 'react';
import { Mic, MicOff, Camera, CameraOff, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioControlsProps {
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isSpeakerEnabled: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onToggleSpeaker: () => void;
  audioLevel?: number;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  isAudioEnabled,
  isVideoEnabled,
  isSpeakerEnabled,
  onToggleAudio,
  onToggleVideo,
  onToggleSpeaker,
  audioLevel = 0,
}) => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-1"
    >
      <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Microphone Control */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onToggleAudio}
                onMouseEnter={() => setShowTooltip('mic')}
                onMouseLeave={() => setShowTooltip(null)}
                className={`p-4 rounded-xl transition-colors ${
                  isAudioEnabled 
                    ? 'bg-[#fcba28] text-black hover:bg-[#fcba28]/90' 
                    : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                }`}
              >
                {isAudioEnabled ? (
                  <Mic className="w-6 h-6" />
                ) : (
                  <MicOff className="w-6 h-6" />
                )}
              </motion.button>
              <AnimatePresence>
                {showTooltip === 'mic' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap"
                  >
                    {isAudioEnabled ? 'Disable Microphone' : 'Enable Microphone'}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Camera Control */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onToggleVideo}
                onMouseEnter={() => setShowTooltip('camera')}
                onMouseLeave={() => setShowTooltip(null)}
                className={`p-4 rounded-xl transition-colors ${
                  isVideoEnabled 
                    ? 'bg-[#fcba28] text-black hover:bg-[#fcba28]/90' 
                    : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                }`}
              >
                {isVideoEnabled ? (
                  <Camera className="w-6 h-6" />
                ) : (
                  <CameraOff className="w-6 h-6" />
                )}
              </motion.button>
              <AnimatePresence>
                {showTooltip === 'camera' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap"
                  >
                    {isVideoEnabled ? 'Disable Camera' : 'Enable Camera'}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Speaker Control */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onToggleSpeaker}
                onMouseEnter={() => setShowTooltip('speaker')}
                onMouseLeave={() => setShowTooltip(null)}
                className={`p-4 rounded-xl transition-colors ${
                  isSpeakerEnabled 
                    ? 'bg-[#fcba28] text-black hover:bg-[#fcba28]/90' 
                    : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                }`}
              >
                {isSpeakerEnabled ? (
                  <Volume2 className="w-6 h-6" />
                ) : (
                  <VolumeX className="w-6 h-6" />
                )}
              </motion.button>
              <AnimatePresence>
                {showTooltip === 'speaker' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap"
                  >
                    {isSpeakerEnabled ? 'Disable Speaker' : 'Enable Speaker'}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Audio Level Indicator */}
          {isAudioEnabled && (
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${audioLevel}%` }}
                  transition={{ duration: 0.1 }}
                  className="h-full bg-[#fcba28] rounded-full"
                />
              </div>
              <span className="text-xs text-gray-400">
                {audioLevel}%
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AudioControls;
