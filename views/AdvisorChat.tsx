
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFinancialAdvice } from '../services/geminiService';
import { SendIcon, VeridexLogo } from '../components/icons';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const AdvisorChat: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchInitialGreeting = async () => {
      if (user?.subscription !== 'Pro') return;
      setIsLoading(true);
      const greeting = await getFinancialAdvice(`Hello, please introduce yourself to ${user?.name}.`);
      setMessages([{ text: greeting, sender: 'ai' }]);
      setIsLoading(false);
    };

    fetchInitialGreeting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    const aiResponse = await getFinancialAdvice(input);
    const aiMessage: Message = { text: aiResponse, sender: 'ai' };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (user?.subscription !== 'Pro') {
    return (
      <div className="animate-fade-in text-center p-10 bg-brand-secondary rounded-xl border border-slate-700">
        <h1 className="text-3xl font-bold text-white mb-4">AI Advisor</h1>
        <p className="text-brand-text-secondary mb-6">This is a Pro feature. Please upgrade your plan to get access to personalized AI-driven financial advice.</p>
        <button className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-2 px-4 rounded-lg transition-colors">
          Upgrade to Pro
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-brand-secondary rounded-xl border border-slate-700 animate-fade-in">
      <header className="p-4 border-b border-slate-700">
        <h1 className="text-xl font-bold text-white">Advisor Chat</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center flex-shrink-0">
                <VeridexLogo className="w-5 h-5 text-white" />
              </div>
            )}
            <div className={`max-w-xl p-4 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-brand-accent text-white rounded-br-none'
                  : 'bg-slate-700 text-brand-text rounded-bl-none'
              }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center flex-shrink-0">
                    <VeridexLogo className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div className="max-w-xl p-4 rounded-2xl bg-slate-700 text-brand-text rounded-bl-none">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-brand-text-secondary rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-brand-text-secondary rounded-full animate-pulse [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-brand-text-secondary rounded-full animate-pulse [animation-delay:0.4s]"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-slate-700">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask your financial question..."
            className="w-full bg-slate-800 text-white placeholder-brand-text-secondary rounded-lg py-3 pl-4 pr-12 border border-slate-600 focus:ring-2 focus:ring-brand-accent focus:outline-none"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || input.trim() === ''}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-brand-accent text-white hover:bg-brand-accent-hover disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvisorChat;
