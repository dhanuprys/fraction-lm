export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown;
}

export interface PaginatedData<T> {
  items: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface User {
  id: number;
  username: string;
  name: string;
  grade?: number;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Topic {
  id: number;
  slug: string;
  name: string;
  description?: string;
  thumbnail?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubTopic {
  id: number;
  topicId: number;
  slug: string;
  name: string;
  description?: string;
  thumbnail?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Material {
  id: number;
  subTopicId: number;
  title: string;
  order: number;
  content: unknown; // JSON
  materialLlmContext?: string;
  difficulty: number;
  isExerciseOnly: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionUI {
  id: string; // UUID
  materialId: number;
  type: string;
  content: unknown; // JSON structure for the question UI
  points: number;
  orderIndex: number;
}

export interface Question {
  id: string; // UUID
  materialId: number;
  learningObjective?: string;
  questionUi?: unknown;
  questionLlmContext?: string;
  evaluationParameters?: {
    keywords?: string[];
    misconceptions?: string[];
    strictness_level?: string;
  } | null;
  answers?: unknown;
  createdAt: string;
  updatedAt: string;
}

export interface MaterialProgress {
  id: number;
  studentId: number;
  materialId: number;
  status: string; // "IN_PROGRESS" | "COMPLETED"
  totalScore: number;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  material?: Material; // joined
}

export interface QuestionProgress {
  id: number;
  studentId: number;
  questionId: string;
  isPassed: boolean;
  hintsUsed: number;
  attemptCount: number;
  masteryScore: number;
  teacherFeedback?: string;
  needsTeacherIntervention: boolean;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  question?: Question; // joined
}
