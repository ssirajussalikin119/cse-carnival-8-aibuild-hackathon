export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  type?: 'query' | 'action' | 'info' | 'error';
}

export interface AIQueryRequest {
  query: string;
  context: {
    schedules: any[];
    rooms: any[];
    events: any[];
    announcements: any[];
    assignments: any[];
  };
}

export interface AIQueryResponse {
  success: boolean;
  message: string;
  type: 'query' | 'action' | 'info' | 'error';
  data?: any;
}