import React from 'react';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  text: string;
  sender: 'ai' | 'user';
}

interface ChatProps {
  messages: Message[];
  userResponse: string;
  isStarted: boolean;
  isThinking?: boolean;
  onUserResponseChange: (value: string) => void;
  onSendMessage: () => void;
  chatRef: React.RefObject<HTMLDivElement>;
}

const Chat: React.FC<ChatProps> = ({
  messages,
  userResponse,
  isStarted,
  isThinking,
  onUserResponseChange,
  onSendMessage,
  chatRef,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-1"
    >
      <div className="bg-black/20 rounded-xl h-[400px] p-6 backdrop-blur-sm flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
          <div className="p-2 rounded-full bg-[#fcba28]/20">
            <MessageSquare className="w-5 h-5 text-[#fcba28]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Interview Chat</h3>
            <p className="text-sm text-gray-400">
              {isStarted ? 'Interview in progress...' : 'Waiting to start...'}
            </p>
          </div>
        </div>
        
        {/* Messages */}
        <div 
          ref={chatRef}
          className="flex-1 overflow-y-auto mb-4 space-y-4 custom-scrollbar pr-2"
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-2xl p-3 max-w-[80%] ${
                    message.sender === 'ai' 
                      ? 'bg-white/10 text-white rounded-tl-sm' 
                      : 'bg-[#fcba28] text-black rounded-tr-sm'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Thinking Indicator */}
          <AnimatePresence>
            {isThinking && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-start"
              >
                <div className="bg-white/10 rounded-2xl rounded-tl-sm p-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-[#fcba28] animate-spin" />
                  <span className="text-sm text-white">AI is thinking...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={userResponse}
            onChange={(e) => onUserResponseChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && onSendMessage()}
            placeholder={isStarted ? "Type your response..." : "Interview not started..."}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50 transition-all"
            disabled={!isStarted}
          />
          <button 
            onClick={onSendMessage}
            disabled={!isStarted || !userResponse.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg bg-[#fcba28] text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#fcba28]/80 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Chat;
