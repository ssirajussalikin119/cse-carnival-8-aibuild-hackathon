import { useState, useCallback } from 'react';
import type { AIMessage, AIQueryRequest, AIQueryResponse } from '../types/ai';
import { aiService } from '../services/aiService';
import { useSchedule } from './useSchedule';
import { useRooms } from './useRooms';
import { useEvents } from './useEvents';
import { useAnnouncements } from './useAnnouncements';
import { useAssignments } from './useAssignments';

export function useAI() {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '👋 Welcome to CampusOS AI Assistant! I can help you manage your campus life. Ask me about your schedule, assignments, events, rooms, or announcements.',
      timestamp: new Date().toISOString(),
      type: 'info',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { schedules } = useSchedule();
  const { rooms } = useRooms();
  const { events } = useEvents();
  const { announcements } = useAnnouncements();
  const { assignments } = useAssignments();

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
      type: 'query',
    };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      // Build context
      const context: AIQueryRequest['context'] = {
        schedules,
        rooms,
        events,
        announcements,
        assignments,
      };

      // Process query
      const response = await aiService.processQuery({
        query: content,
        context,
      });

      // Add assistant response
      const assistantMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date().toISOString(),
        type: response.type || 'info',
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process your request';
      setError(errorMessage);
      
      const assistantMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
        timestamp: new Date().toISOString(),
        type: 'error',
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  }, [schedules, rooms, events, announcements, assignments]);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: '👋 Welcome to CampusOS AI Assistant! I can help you manage your campus life. Ask me about your schedule, assignments, events, rooms, or announcements.',
        timestamp: new Date().toISOString(),
        type: 'info',
      },
    ]);
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages,
  };
}