import { api } from "../api-client";

export interface StudentTopic {
  id: number;
  name: string;
  description: string;
  order: number;
  thumbnail: string | null;
  slug: string;
  isUnlocked: boolean;
  subtopicCount?: number;
}

export interface StudentSubTopic {
  id: number;
  topicId: number;
  name: string;
  description: string;
  order: number;
  thumbnail: string | null;
  slug: string;
  isUnlocked: boolean;
  materialCount?: number;
}

export interface StudentMaterial {
  id: number;
  title: string;
  order: number;
  status: string;
  totalScore: number;
  isUnlocked: boolean;
  isExerciseOnly: boolean;
}

export interface StudentQuestionProgress {
  isPassed: boolean;
  hintsUsed: number;
  masteryScore: number;
  teacherFeedback: string | null;
}

export interface StudentQuestion {
  id: string;
  learningObjective: string;
  questionUi: unknown;
  progress: StudentQuestionProgress;
}

export interface TipTapNode {
  type: string;
  content?: TipTapNode[];
  text?: string;
  attrs?: Record<string, any>;
  marks?: { type: string; attrs?: Record<string, any> }[];
  [key: string]: any;
}

export interface StudentMaterialDetail {
  id: number;
  title: string;
  content: TipTapNode | null;
  status: string;
  questions: StudentQuestion[];
  isExerciseOnly: boolean;
  summaryMaterials?: { title: string; content: TipTapNode | null }[];
}

export interface StudentDashboardLesson {
  id: string;
  slug: string;
  title: string;
  duration: number;
  kind: "Lesson" | "Exercise" | "Quiz";
  isLocked?: boolean;
}

export interface StudentDashboardData {
  currentTopic: {
    name: string;
    description: string;
    slug: string;
  };
  progress: number;
  completed: string[];
  activeId: string;
  lessons: StudentDashboardLesson[];
}

// ── Session Types ───────────────────────────────────────────────────────────────

export interface SessionQuestion {
  id: string;
  learningObjective: string;
  questionUi: any;
  isPassed: boolean;
  masteryScore: number;
}

export interface ExerciseSessionData {
  id: string;
  attemptNo: number;
  status: "IN_PROGRESS" | "COMPLETED" | "ABANDONED";
  totalScore: number;
  startedAt: string;
  questions: SessionQuestion[];
}

export interface SessionStartResponse {
  session: ExerciseSessionData;
  material: {
    id: number;
    title: string;
    content: any;
  };
}

export interface SessionChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface SessionResultItem {
  questionId: string;
  isPassed: boolean;
  masteryScore: number;
}

export interface SessionResultsResponse {
  status: ExerciseSessionData["status"];
  totalScore: number;
  results: SessionResultItem[];
}

export const studentApi = {
  getDashboard: () => api.get<{ dashboard: StudentDashboardData | null }>("/student/dashboard"),

  getTopics: () => api.get<{ topics: StudentTopic[] }>("/student/topics"),

  getSubTopics: (topicSlug: string) =>
    api.get<{ topic: StudentTopic; subTopics: StudentSubTopic[] }>(
      `/student/topics/${topicSlug}/subtopics`,
    ),

  getMaterials: (topicSlug: string, subTopicSlug: string) =>
    api.get<{ topic: StudentTopic; subTopic: StudentSubTopic; materials: StudentMaterial[] }>(
      `/student/topics/${topicSlug}/${subTopicSlug}/materials`,
    ),

  getMaterial: (materialId: number) =>
    api.get<{ material: StudentMaterialDetail }>(`/student/topics/materials/${materialId}`),

  completeMaterial: (materialId: number) =>
    api.post<{ success: boolean; status: string }>(
      `/student/topics/materials/${materialId}/complete`,
    ),

  // ── Session API ─────────────────────────────────────────────────────────────

  startSession: (materialId: number) =>
    api.post<SessionStartResponse>("/student/sessions/start", { materialId }),

  getSessionChat: (sessionId: string, questionId: string) =>
    api.get<{ messages: SessionChatMessage[] }>(
      `/student/sessions/${sessionId}/chat/${questionId}`,
    ),

  getSessionResults: (sessionId: string) =>
    api.get<SessionResultsResponse>(`/student/sessions/${sessionId}/results`),

  retakeSession: (sessionId: string) =>
    api.post<SessionStartResponse>(`/student/sessions/${sessionId}/retake`),
};
