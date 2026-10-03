import { api, apiClient } from "../api-client";
import type { Topic, SubTopic, Material, User, Question } from "@/types/api";

export const adminApi = {
  // Topics
  getTopics: (limit = 100, offset = 0) =>
    api.get<{ topics: Topic[]; pagination: { total: number } }>(
      `/admin/topics?limit=${limit}&offset=${offset}`,
    ),

  getTopic: (id: number) => api.get<Topic>(`/admin/topics/${id}`),

  createTopic: (data: Partial<Topic>) => api.post<Topic>("/admin/topics", data),

  updateTopic: (id: number, data: Partial<Topic>) => api.patch<Topic>(`/admin/topics/${id}`, data),

  deleteTopic: (id: number) => api.delete(`/admin/topics/${id}`),

  // SubTopics
  getSubTopics: (topicId?: number, limit = 100, offset = 0) => {
    let path = `/admin/subtopics?limit=${limit}&offset=${offset}`;
    if (topicId) path += `&topicId=${topicId}`;
    return api.get<{ subTopics: SubTopic[]; pagination: { total: number } }>(path);
  },

  getSubTopic: (id: number) => api.get<SubTopic>(`/admin/subtopics/${id}`),

  createSubTopic: (data: Partial<SubTopic>) => api.post<SubTopic>("/admin/subtopics", data),

  updateSubTopic: (id: number, data: Partial<SubTopic>) =>
    api.patch<SubTopic>(`/admin/subtopics/${id}`, data),

  deleteSubTopic: (id: number) => api.delete(`/admin/subtopics/${id}`),

  // Materials
  getMaterials: (subTopicId?: number) => {
    let path = `/admin/materials`;
    if (subTopicId) path += `?subTopicId=${subTopicId}`;
    return api.get<Material[]>(path);
  },

  getMaterial: (id: number) => api.get<Material>(`/admin/materials/${id}`),

  createMaterial: (data: Partial<Material>) => api.post<Material>("/admin/materials", data),

  updateMaterial: (id: number, data: Partial<Material>) =>
    api.patch<Material>(`/admin/materials/${id}`, data),

  deleteMaterial: (id: number) => api.delete(`/admin/materials/${id}`),

  // Questions
  getQuestions: (materialId?: number) => {
    let path = `/admin/questions`;
    if (materialId) path += `?materialId=${materialId}`;
    return api.get<Question[]>(path);
  },

  getQuestion: (id: string) => api.get<Question>(`/admin/questions/${id}`),

  createQuestion: (data: Partial<Question>) => api.post<Question>("/admin/questions", data),

  updateQuestion: (id: string, data: Partial<Question>) =>
    api.patch<Question>(`/admin/questions/${id}`, data),

  deleteQuestion: (id: string) => api.delete(`/admin/questions/${id}`),

  // Uploads
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post<{ url: string }>("/admin/uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Users
  getUsers: (limit = 100, offset = 0) =>
    api.get<{ users: User[]; pagination: { total: number } }>(
      `/admin/users?limit=${limit}&offset=${offset}`,
    ),

  getUser: (id: number) => api.get<User>(`/admin/users/${id}`),

  createUser: (data: Partial<User> & { password?: string }) => api.post<User>("/admin/users", data),

  updateUser: (id: number, data: Partial<User> & { password?: string }) =>
    api.patch<User>(`/admin/users/${id}`, data),

  deleteUser: (id: number) => api.delete(`/admin/users/${id}`),

  // Dashboard
  getDashboardStats: () =>
    api.get<{
      totalUsers: number;
      activeTopics: number;
      totalSubTopics: number;
      totalMaterials: number;
      totalQuestions: number;
      systemHealth: number;
    }>("/admin/dashboard"),

  // Content Tree (for cascade pickers)
  getContentTree: () => api.get<{ tree: ContentTreeTopic[] }>("/admin/content-tree"),

  // Student Level
  getStudentLevel: (studentId: number) =>
    api.get<{ currentLevel: StudentLevelInfo | null; adminOverride: StudentLevelOverride | null }>(
      `/admin/students/${studentId}/level`,
    ),

  getStudentProgress: (studentId: number) =>
    api.get<{
      materialProgresses: import("@/types/api").MaterialProgress[];
      questionProgresses: import("@/types/api").QuestionProgress[];
    }>(`/admin/students/${studentId}/progress`),

  setStudentLevel: (studentId: number, materialId: number | null) =>
    api.put(`/admin/students/${studentId}/level`, { materialId }),

  setBulkStudentLevel: (userIds: number[], materialId: number | null) =>
    api.put(`/admin/students/bulk-level`, { userIds, materialId }),

  // Students list
  getStudents: (limit = 100, offset = 0) =>
    api.get<{ students: User[]; pagination: { total: number } }>(
      `/admin/students?limit=${limit}&offset=${offset}`,
    ),

  // Settings
  getSettings: () => api.get<Record<string, string>>("/admin/settings"),

  updateSetting: (data: { key: string; value: string }) =>
    api.put<{ setting: any }>("/admin/settings", data),

  // Backup & Restore
  getBackupPreview: () =>
    api.get<{
      topics: number;
      subTopics: number;
      materials: number;
      questions: number;
      assets: number;
      estimatedSizeBytes: number;
    }>("/admin/backup/preview"),

  downloadBackup: async (): Promise<Blob> => {
    const response = await apiClient.get("/admin/backup/download", {
      responseType: "arraybuffer",
    });
    return new Blob([response.data], { type: "application/zip" });
  },

  restoreBackup: (file: File, includeSettings = false) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post<{
      topicsCreated: number;
      subTopicsCreated: number;
      materialsCreated: number;
      questionsCreated: number;
      assetsRestored: number;
      settingsRestored: boolean;
    }>(`/admin/backup/restore?includeSettings=${includeSettings}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 300000, // 5 min timeout for large restores
    });
  },
};

// ── Types for content tree & student level ────────────────────────────────────

export interface ContentTreeMaterial {
  id: number;
  title: string;
  order: number;
}

export interface ContentTreeSubTopic {
  id: number;
  name: string;
  order: number;
  materials: ContentTreeMaterial[];
}

export interface ContentTreeTopic {
  id: number;
  name: string;
  order: number;
  subTopics: ContentTreeSubTopic[];
}

export interface StudentLevelInfo {
  topicId: number;
  topicName: string;
  subTopicId: number;
  subTopicName: string;
  materialId: number;
  materialTitle: string;
}

export interface StudentLevelOverride {
  materialId: number;
  materialTitle: string;
  subTopicId: number;
  subTopicName: string;
  topicId: number;
  topicName: string;
  setAt: string;
  setBy: number;
}
