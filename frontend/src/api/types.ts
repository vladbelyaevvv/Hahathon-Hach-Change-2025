export interface User {
  userId: number;
  email: string;
  fullName: string;
  role: string;
  token: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export interface Material {
  id: number;
  title: string;
  description: string;
  type: string;
  fileUrl: string;
  createdAt: string;
}

export interface Assignment {
  id: number;
  courseId: number;
  title: string;
  description: string;
  dueDate: string | null;
  createdAt: string;
}

export interface Submission {
  id: number;
  assignmentId: number;
  version: number;
  fileName: string;
  filePath: string;
  status: string;
  teacherComment: string | null;
  grade: number | null;
  submittedAt: string;
  reviewedAt: string | null;
}

export interface ProgressResponse {
  progress: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}


