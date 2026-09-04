import { Bot, User, Clock } from 'lucide-react';
import type { AIMessage } from '../../types/ai';

interface ChatMessageProps {
  message: AIMessage;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const getTypeStyles = () => {
    switch(message.type) {
      case 'error': return 'border-red-500/20 bg-red-500/5';
      case 'action': return 'border-green-500/20 bg-green-500/5';
      case 'info': return 'border-blue-500/20 bg-blue-500/5';
      default: return 'border-white/5';
    }
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-accent' : 'bg-white/10'
      }`}>
        {isUser ? (
          <User size={16} className="text-white" />
        ) : (
          <Bot size={16} className="text-accent" />
        )}
      </div>
      <div className={`flex-1 max-w-[80%] ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block px-4 py-3 rounded-2xl ${
          isUser 
            ? 'bg-accent text-white' 
            : `bg-[#0d0d14] border border-white/5 ${getTypeStyles()}`
        }`}>
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        </div>
        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
          <Clock size={12} />
          <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}