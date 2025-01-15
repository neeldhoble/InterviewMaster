'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Upload, Play, Mic, MicOff, Send, Undo } from 'lucide-react';
import { parseResume, generateInterviewQuestions, generateFeedback, generateFollowUpResponse } from './services/interview';
import type { ResumeData, InterviewQuestion, InterviewSession } from './services/interview';
import { extractTextFromFile, cleanResumeText } from './utils/fileParser';

export default function PersonalInterviewPage() {
  const [step, setStep] = useState<'upload' | 'configure' | 'interview'>('upload');
  const [resumeText, setResumeText] = useState('');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [targetRole, setTargetRole] = useState('');
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setError('');

    try {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size too large. Please upload a file smaller than 10MB.');
      }

      // Check file type
      const validTypes = [
        'text/plain',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!validTypes.includes(file.type)) {
        throw new Error('Invalid file type. Please upload a .txt, .pdf, .doc, or .docx file.');
      }

      console.log('Extracting text from file...');
      const extractedText = await extractTextFromFile(file);
      
      if (!extractedText.trim()) {
        throw new Error('The uploaded file appears to be empty. Please check the file and try again.');
      }

      // Clean and normalize the extracted text
      const cleanedText = cleanResumeText(extractedText);

      console.log('Parsing resume...');
      const data = await parseResume(cleanedText);
      console.log('Resume parsed successfully');
      
      setResumeText(cleanedText);
      setResumeData(data);
      setStep('configure');
    } catch (err) {
      console.error('File upload error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const startInterview = async () => {
    if (!resumeData) {
      setError('Resume data is missing. Please upload your resume again.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      console.log('Starting interview with resume data:', resumeData);
      const questions = await generateInterviewQuestions(resumeData, targetRole);
      console.log('Generated questions:', questions);

      if (!questions || questions.length === 0) {
        throw new Error('No questions were generated. Please try again.');
      }

      const newSession: InterviewSession = {
        id: Math.random().toString(36).substr(2, 9),
        candidateName: resumeData.fullName,
        currentRole: resumeData.currentRole,
        targetRole: targetRole || undefined,
        questions,
        currentQuestionIndex: 0,
        feedback: []
      };

      console.log('Created new session:', newSession);
      setSession(newSession);
      setStep('interview');
      
      // Set initial AI response with introduction and first question
      const introQuestion = questions[0].question;
      const introduction = `Hello ${resumeData.fullName}! I'm your AI interviewer. Let's begin with your introduction. ${introQuestion}`;
      setAiResponse(introduction);
      
      console.log('Interview started successfully');
    } catch (err) {
      console.error('Error starting interview:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to start interview. Please try again.');
      }
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    console.log('Current step:', step);
    console.log('Session state:', session);
    console.log('AI Response:', aiResponse);
  }, [step, session, aiResponse]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        // Here you would typically send this to a speech-to-text service
        // For now, we'll just use the transcript state
        setIsThinking(true);
        await handleResponse(transcript);
        setIsThinking(false);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Failed to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleResponse = async (response: string) => {
    if (!session || !response.trim()) return;

    const currentQuestion = session.questions[session.currentQuestionIndex];
    setIsThinking(true);
    setError('');

    try {
      console.log('Processing response for question:', currentQuestion);
      
      // Get feedback for the response
      const feedback = await generateFeedback(currentQuestion, response);
      console.log('Generated feedback:', feedback);
      
      // Generate AI's follow-up response
      const followUp = await generateFollowUpResponse(currentQuestion, response, response);
      console.log('Generated follow-up:', followUp);
      
      // Update session with feedback
      setSession(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          feedback: [...prev.feedback, {
            questionId: currentQuestion.id,
            ...feedback
          }]
        };
      });

      // Construct AI's response with feedback
      let aiResponseText = '';
      
      // Add feedback if it's not the introduction question
      if (currentQuestion.type !== 'introduction') {
        if (feedback.strengths.length > 0) {
          aiResponseText += 'Strengths:\n• ' + feedback.strengths.join('\n• ') + '\n\n';
        }
        if (feedback.improvements.length > 0) {
          aiResponseText += 'Areas to improve:\n• ' + feedback.improvements.join('\n• ') + '\n\n';
        }
      }

      // Add the follow-up response
      aiResponseText += followUp.response;

      // Set AI's response
      setAiResponse(aiResponseText);

      // Move to next question if provided
      if (followUp.nextQuestion) {
        setTimeout(() => {
          setSession(prev => {
            if (!prev) return prev;
            const nextIndex = prev.currentQuestionIndex + 1;
            if (nextIndex < prev.questions.length) {
              setAiResponse(prev => `${prev}\n\n${followUp.nextQuestion}`);
              return {
                ...prev,
                currentQuestionIndex: nextIndex
              };
            }
            return prev;
          });
        }, 2000);
      }

      // Clear the transcript
      setTranscript('');
    } catch (err) {
      console.error('Error processing response:', err);
      // Don't show error to user, just continue the conversation
      setAiResponse("I understand. Let's continue with our discussion.");
    } finally {
      setIsThinking(false);
    }
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transcript.trim() || isThinking) return;
    
    const response = transcript.trim();
    setTranscript('');
    await handleResponse(response);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/products/mock-interviews/visual-simulation" className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Main
          </Link>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-[#fcba28] mb-4">Personalized AI Interview</h1>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Upload your resume and let our AI create a personalized interview experience based on your background and experience.
                  </p>
                </div>

                <div className="p-8 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".txt,.pdf,.doc,.docx"
                    className="hidden"
                  />
                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isProcessing}
                      className="inline-flex items-center px-6 py-3 bg-[#fcba28] text-black rounded-lg font-medium disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 mr-2 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5 mr-2" />
                          Upload Resume
                        </>
                      )}
                    </motion.button>
                    <p className="mt-2 text-sm text-gray-400">
                      Supported formats: TXT, PDF, DOC, DOCX (max 10MB)
                    </p>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-5 h-5">⚠️</div>
                      <div>
                        <p className="font-medium">Error</p>
                        <p className="text-sm">{error}</p>
                        <p className="text-sm mt-2">
                          Tips:
                          <ul className="list-disc list-inside mt-1">
                            <li>Make sure your file is in .txt format</li>
                            <li>Ensure the file is not empty</li>
                            <li>Check that the file size is under 10MB</li>
                            <li>Verify that your resume contains basic information like name and current role</li>
                          </ul>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === 'configure' && resumeData && (
              <motion.div
                key="configure"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-[#fcba28] mb-4">Configure Your Interview</h1>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Review your information and set your target role for the interview.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm">
                    <h2 className="text-xl font-semibold text-white mb-4">Resume Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Name</label>
                        <div className="text-white">{resumeData.fullName}</div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Current Role</label>
                        <div className="text-white">{resumeData.currentRole}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm">
                    <h2 className="text-xl font-semibold text-white mb-4">Interview Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Target Role (Optional)</label>
                        <input
                          type="text"
                          value={targetRole}
                          onChange={(e) => setTargetRole(e.target.value)}
                          placeholder="e.g., Senior Software Engineer"
                          className="w-full px-4 py-2 bg-black/20 border border-[#fcba28]/20 rounded-lg text-white placeholder-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep('upload')}
                      className="px-6 py-3 bg-gray-700 text-white rounded-lg font-medium"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={startInterview}
                      disabled={isProcessing}
                      className="px-8 py-3 bg-[#fcba28] text-black rounded-lg font-medium disabled:opacity-50"
                    >
                      Start Interview
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'interview' && session && (
              <motion.div
                key="interview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#fcba28]/10 flex items-center justify-center">
                      🤖
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="text-white whitespace-pre-wrap">{aiResponse}</div>
                      {isThinking && (
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-[#fcba28] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-[#fcba28] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-[#fcba28] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <form onSubmit={handleTextSubmit} className="flex gap-4">
                    <input
                      type="text"
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      placeholder="Type your response..."
                      className="flex-1 px-4 py-2 bg-black/20 border border-[#fcba28]/20 rounded-lg text-white placeholder-gray-400"
                      disabled={isThinking}
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`p-2 rounded-lg ${isRecording ? 'bg-red-500' : 'bg-[#fcba28]'}`}
                    >
                      {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!transcript.trim() || isThinking}
                      className="p-2 bg-[#fcba28] rounded-lg disabled:opacity-50"
                    >
                      <Send className="w-6 h-6" />
                    </motion.button>
                  </form>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-5 h-5">⚠️</div>
                      <div>
                        <p className="font-medium">Error</p>
                        <p className="text-sm">{error}</p>
                        <p className="text-sm mt-2">
                          Tips:
                          <ul className="list-disc list-inside mt-1">
                            <li>Make sure your file is in .txt format</li>
                            <li>Ensure the file is not empty</li>
                            <li>Check that the file size is under 10MB</li>
                            <li>Verify that your resume contains basic information like name and current role</li>
                          </ul>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
