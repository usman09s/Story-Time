import z from "zod";

export interface AuthModule {
  title: string;
  subText: string;
  children: React.ReactNode;
  additionalText?: string;
}

interface SiginFields {
  email: string;
  password: string;
}

export type SigninFields = z.infer<typeof SignInSchema>;

interface ForgetFields {
  email: string;
}

export type ForgetFields = z.infer<typeof ForgetSchema>;

interface ResetPassword {
  password: string;
  confirmPassword: string;
}

export type ResetPassword = z.infer<typeof ResetPasswordSchema>;

export interface CategoryType {
  _id: string;
  image: string;
  name: string;
  parent: string | null;
  updatedAt?: string;
  createdAt: string;
}

export interface DashboardUser {
  _id: string;
  city: string;
  completePhone: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  noOfFollowers: number;
  noOfFollowings: number;
  role: string;
  username: string;
  zipCode: string;
  textStoriesCount: number;
  videoStoriesCount: number;
}

export interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  perPage: number;
  prevPage: number | null;
  totalItems: number;
  totalPages: number;
}
