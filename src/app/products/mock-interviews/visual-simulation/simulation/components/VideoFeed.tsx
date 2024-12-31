'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoFeedProps {
  isRecording: boolean;
}

export const VideoFeed: React.FC<VideoFeedProps> = ({ isRecording }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 30 }
          },
          audio: true 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    startVideo();

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full aspect-video object-cover rounded-xl"
      />
      {isRecording && (
        <motion.div
          className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm text-white font-medium">Recording</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VideoFeed;
