import type { AIQueryRequest, AIQueryResponse } from '../types/ai';

// This is a temporary mock implementation.
// Will be replaced with real API calls to the backend AI agent.
export const aiService = {
  processQuery: async (request: AIQueryRequest): Promise<AIQueryResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const query = request.query.toLowerCase();
    const context = request.context;

    // Simple keyword-based responses for demo
    if (query.includes('next class') || query.includes('next lecture')) {
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      const todayClasses = context.schedules.filter(
        (s: any) => s.day === today
      );
      if (todayClasses.length === 0) {
        return {
          success: true,
          message: `You have no classes today (${today}). Enjoy your day off! 🎉`,
          type: 'info',
        };
      }
      const nextClass = todayClasses[0];
      return {
        success: true,
        message: `Your next class is ${nextClass.course}: ${nextClass.title} at ${nextClass.start_time} in ${nextClass.room}.`,
        type: 'query',
        data: nextClass,
      };
    }

    if (query.includes('assignment') && query.includes('due')) {
      const pending = context.assignments.filter(
        (a: any) => a.status === 'pending'
      );
      if (pending.length === 0) {
        return {
          success: true,
          message: 'You have no pending assignments. Great job! 🎉',
          type: 'info',
        };
      }
      const soonest = pending.sort(
        (a: any, b: any) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      )[0];
      return {
        success: true,
        message: `Your next assignment is "${soonest.title}" for ${soonest.course}. Deadline: ${soonest.deadline}`,
        type: 'query',
        data: soonest,
      };
    }

    if (query.includes('announcement') && query.includes('high priority')) {
      const highPriority = context.announcements.filter(
        (a: any) => a.priority === 'high'
      );
      if (highPriority.length === 0) {
        return {
          success: true,
          message: 'No high priority announcements at the moment.',
          type: 'info',
        };
      }
      return {
        success: true,
        message: `Found ${highPriority.length} high priority announcement(s). Latest: ${highPriority[0].title}`,
        type: 'query',
        data: highPriority,
      };
    }

    // Default response
    return {
      success: true,
      message: "I'm here to help! You can ask me about your schedule, assignments, events, rooms, or announcements. Try asking something like 'When is my next class?' or 'What assignments are due?'",
      type: 'info',
    };
  },
};