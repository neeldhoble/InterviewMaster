'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AIAvatar from './components/AIAvatar';
import VideoFeed from './components/VideoFeed';
import QuestionPanel from './components/QuestionPanel';
import VideoPreview from './components/VideoPreview';
import { interviewQuestions } from './data/questions';
import { MessageSquare, BarChart, Download, Share2, ThumbsUp, Volume2, Mic, Camera, Settings, ChevronLeft } from 'lucide-react';
import { recordingService } from './services/recordingService';

export default function SimulationPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [recordings, setRecordings] = useState<Array<{
    id: string;
    timestamp: Date;
    duration: number;
    url: string;
    thumbnailUrl: string;
    questionIndex: number;
    blob?: Blob;
  }>>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleRecording = async () => {
    try {
      if (!isRecording) {
        await recordingService.startRecording();
        setIsRecording(true);
        setIsAISpeaking(true);
        setTimeout(() => setIsAISpeaking(false), 3000);
      } else {
        const blob = await recordingService.stopRecording();
        const thumbnailUrl = await recordingService.generateThumbnail(blob);
        const url = URL.createObjectURL(blob);
        
        setRecordings(prev => [...prev, {
          id: Date.now().toString(),
          timestamp: new Date(),
          duration: timeElapsed,
          url,
          thumbnailUrl,
          questionIndex: currentQuestion,
          blob
        }]);
        
        setIsRecording(false);
        setTimeElapsed(0);
      }
    } catch (error) {
      console.error('Recording error:', error);
      // Handle error appropriately
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = (currentQuestion + 1) % interviewQuestions.length;
    setCurrentQuestion(nextIndex);
    setIsAISpeaking(true);
    setTimeout(() => setIsAISpeaking(false), 3000);
  };

  const handleSelectQuestion = (index: number) => {
    setCurrentQuestion(index);
    setIsAISpeaking(true);
    setTimeout(() => setIsAISpeaking(false), 3000);
  };

  const handleDownloadRecording = (id: string) => {
    const recording = recordings.find(r => r.id === id);
    if (recording?.blob) {
      const filename = `interview-${recording.timestamp.toISOString()}.webm`;
      recordingService.downloadRecording(recording.blob, filename);
    }
  };

  const handlePlayRecording = (id: string) => {
    const recording = recordings.find(r => r.id === id);
    if (recording) {
      // Create a modal or player to show the recording
      const video = document.createElement('video');
      video.src = recording.url;
      video.controls = true;
      
      // Create a modal container
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50';
      
      const modalContent = document.createElement('div');
      modalContent.className = 'relative bg-white/5 backdrop-blur-lg p-4 rounded-xl max-w-4xl w-full mx-4';
      
      const closeButton = document.createElement('button');
      closeButton.className = 'absolute top-4 right-4 text-white hover:text-[#fcba28]';
      closeButton.innerHTML = '×';
      closeButton.onclick = () => document.body.removeChild(modal);
      
      video.className = 'w-full aspect-video rounded-lg';
      
      modalContent.appendChild(video);
      modalContent.appendChild(closeButton);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
      
      video.play();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center text-white gap-2 hover:text-[#fcba28] transition-colors">
              <ChevronLeft className="w-5 h-5" />
              Exit Interview
            </button>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Settings className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Question Panel and AI */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <QuestionPanel
              questions={interviewQuestions}
              currentQuestionIndex={currentQuestion}
              onSelectQuestion={handleSelectQuestion}
            />
            
            <div className="flex flex-col items-center space-y-4">
              <AIAvatar 
                isSpoken={isAISpeaking} 
                currentQuestion={interviewQuestions[currentQuestion]?.question}
              />
              <button
                onClick={handleNextQuestion}
                className="px-4 py-2 rounded-lg bg-[#fcba28] text-black font-medium hover:bg-[#fcd978] transition-colors"
              >
                Next Question
              </button>
            </div>
          </div>

          {/* Right Column - Video Feed */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="relative">
              <VideoFeed isRecording={isRecording} />
              
              {/* Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Volume2 className="w-5 h-5 text-white" />
                    </button>
                    <button
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Camera className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {isRecording && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-white">{formatTime(timeElapsed)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Interview Controls */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={handleToggleRecording}
                className={`p-4 rounded-xl ${
                  isRecording ? 'bg-red-500/20 text-red-500' : 'bg-[#fcba28] text-black'
                } font-medium flex items-center justify-center gap-2`}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
              
              <button
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white font-medium flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
              
              <button
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white font-medium flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
              
              <button className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white font-medium flex items-center justify-center gap-2">
                <ThumbsUp className="w-5 h-5" />
                Rate
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-[#fcba28]" />
                  <h4 className="text-white font-medium">Response Time</h4>
                </div>
                <p className="text-2xl font-bold text-[#fcba28]">
                  {formatTime(timeElapsed)}
                </p>
              </div>
              
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart className="w-5 h-5 text-[#fcba28]" />
                  <h4 className="text-white font-medium">Confidence</h4>
                </div>
                <p className="text-2xl font-bold text-[#fcba28]">
                  {isRecording ? "85%" : "--"}
                </p>
              </div>
              
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Mic className="w-5 h-5 text-[#fcba28]" />
                  <h4 className="text-white font-medium">Audio Quality</h4>
                </div>
                <p className="text-2xl font-bold text-[#fcba28]">
                  {isRecording ? "Good" : "--"}
                </p>
              </div>
              
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Camera className="w-5 h-5 text-[#fcba28]" />
                  <h4 className="text-white font-medium">Video Quality</h4>
                </div>
                <p className="text-2xl font-bold text-[#fcba28]">
                  {isRecording ? "HD" : "--"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Preview Section */}
        <div className="mt-8">
          <VideoPreview
            recordings={recordings}
            onPlay={handlePlayRecording}
            onDelete={(id) => {
              const recording = recordings.find(r => r.id === id);
              if (recording) {
                URL.revokeObjectURL(recording.url);
              }
              setRecordings(prev => prev.filter(r => r.id !== id));
            }}
            onDownload={handleDownloadRecording}
            onShare={(id) => {
              const recording = recordings.find(r => r.id === id);
              if (recording && navigator.share) {
                navigator.share({
                  title: 'Interview Recording',
                  text: `Interview recording from ${recording.timestamp.toLocaleString()}`,
                  url: recording.url
                }).catch(console.error);
              }
            }}
          />
        </div>
      </main>
    </div>
  );
}