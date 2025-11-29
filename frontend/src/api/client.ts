import axios from 'axios';
import type { 
  User, 
  Course, 
  Material, 
  Assignment, 
  Submission, 
  ProgressResponse,
  LoginRequest 
} from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth
export const login = async (credentials: LoginRequest): Promise<User> => {
  const response = await apiClient.post<User>('/auth/login', credentials);
  return response.data;
};

// Courses
export const fetchCourses = async (): Promise<Course[]> => {
  const response = await apiClient.get<Course[]>('/courses');
  return response.data;
};

export const fetchCourse = async (courseId: number): Promise<Course> => {
  const response = await apiClient.get<Course>(`/courses/${courseId}`);
  return response.data;
};

export const fetchMaterials = async (courseId: number): Promise<Material[]> => {
  const response = await apiClient.get<Material[]>(`/courses/${courseId}/materials`);
  return response.data;
};

export const fetchAssignments = async (courseId: number): Promise<Assignment[]> => {
  const response = await apiClient.get<Assignment[]>(`/courses/${courseId}/assignments`);
  return response.data;
};

export const fetchProgress = async (courseId: number, studentId: number = 1): Promise<ProgressResponse> => {
  const response = await apiClient.get<ProgressResponse>(`/courses/${courseId}/progress`, {
    params: { studentId }
  });
  return response.data;
};

// Assignments
export const fetchAssignment = async (assignmentId: number): Promise<Assignment> => {
  const response = await apiClient.get<Assignment>(`/assignments/${assignmentId}`);
  return response.data;
};

export const fetchSubmissions = async (assignmentId: number, studentId: number = 1): Promise<Submission[]> => {
  const response = await apiClient.get<Submission[]>(`/assignments/${assignmentId}/submissions`, {
    params: { studentId }
  });
  return response.data;
};

export const submitAssignment = async (
  assignmentId: number, 
  file: File, 
  studentId: number = 1
): Promise<Submission> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post<Submission>(
    `/assignments/${assignmentId}/submit`,
    formData,
    {
      params: { studentId },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};


