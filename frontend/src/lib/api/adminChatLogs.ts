import { api } from "../api-client";

export interface ChatSession {
  id: string;
  studentId: number;
  materialId: number;
  attemptNo: number;
  status: string;
  totalScore: number;
  startedAt: string;
  completedAt: string | null;
  student: {
    id: number;
    name: string;
    username: string;
  };
  material: {
    id: number;
    title: string;
  };
  usedModel?: string | null;
}

export interface ChatLog {
  id: number;
  message: string;
  sender: "STUDENT" | "AI" | string;
  isHint: boolean;
  toolCalled: boolean;
  usedModel?: string | null;
  createdAt: string;
}

export interface SessionLogsResponse {
  session: {
    id: string;
    student: { name: string };
    material: { title: string };
  };
  logs: ChatLog[];
}

export const adminChatLogsApi = {
  getSessions: (params?: {
    studentId?: string;
    materialId?: string;
    limit?: number;
    offset?: number;
  }) => {
    return api.get<{
      sessions: ChatSession[];
      pagination: {
        totalPages: number;
        currentPage: number;
        total: number;
        limit: number;
        offset: number;
      };
    }>("/admin/chat-logs/sessions", { params });
  },

  getSessionLogs: (sessionId: string) => {
    return api.get<SessionLogsResponse>(`/admin/chat-logs/sessions/${sessionId}`);
  },
};
