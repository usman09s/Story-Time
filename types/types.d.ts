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
  updatedAt: Date;
  createdAt: Date;
  totalLikes: number;
}

export interface CategoryData {
  success: boolean;
  response: {
    categories: CategoryType[];
    pagination: PaginationTypes;
  };
}

export interface DashboardUser {
  _id: string;
  card: string | null;
  city: string;
  completePhone: string;
  countryCode: string;
  createdAt: string;
  decryptedPassword: string;
  email: string;
  fcmToken: string;
  firstName: string;
  isActive: boolean;
  isDeleted: boolean;
  isPublic: boolean;
  lastName: string;
  noOfFollowers: number;
  noOfFollowings: number;
  profileImage: string;
  phoneCode: string;
  phoneNo: string;
  role: string;
  settings: {
    systemNotification: boolean;
    inAppNotifications: boolean;
    appVibrations: boolean;
  };
  state: string;
  textStoriesCount: number;
  updatedAt?: string;
  username: string;
  videoStoriesCount: number;
  zipCode: string;
}
// Interface for Creator
interface Creator {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isActive: boolean;
  profileImage: string;
}

// Interface for Story
export enum StoryType {
  TEXT = "text",
  VIDEO = "video",
}

export interface Story {
  _id: string;
  type: StoryType;
  creator: Creator;
  createdAt: string;
  updatedAt: string;
  category: string;
  categoryImage:string
  likesCount: number;
}
export interface MostLikedPosts {
  success: boolean;
  response: {
    stories: Story[];
    pagination: PaginationTypes;
  };
} 

export interface DashboardTypes {
  success: boolean;
  response: {
    users: DashboardUser[];
    pagination: PaginationTypes;
  };
}
interface MostLikedCategories {
  success: boolean;
  response:{
      data: CategoryType[];      
      pagination: Pagination; 
  }
}

export interface ChatListType {
  _id: string;
  createdAt: string;
  updatedAt: string;
  lastMessage: {
    text: string;
  };
  status: string;
  user: {
    firstName: string;
    lastName: string;
    _id: string;
    username: string;
  };
}

export interface ChatMessage {
  createdAt: string;
  updatedAt: string;
  chat: string;
  _id: string;
  text: string;
  user: {
    firstName: string;
    lastName: string;
    _id: string;
    username: string;
  };
  media: string[];
}

export interface PaginationTypes {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: null | number;
  perPage: number;
  prevPage: null | number;
  totalItems: number;
  totalPages: number;
}

export interface GuidelinesData {
  success: boolean;
  response: {
    guidelines: {
      _id: string;
      type: string;
      content: string;
      title: string;
      createdAt: Date;
      updatedAt?: Date;
      id: string;
    }[];
    pagination: PaginationTypes;
  };
}

export interface NotificationType {
  success: boolean;
  response: {
    data: {
      _id: string;
      title: string;
      message: string;
      createdAt: Date;
      id: string;
    }[];
    pagination: PaginationTypes;
  };
}

interface SupportChatOverview {
  _id: string;
  id: string;
  unreadMessages: number;
  chat: {
    _id: string;
    user: string;
    status: string;
    lastMessage: string;
    createdAt: Date;
    updatedAt?: Date;
  };
  status: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    username: string;
  };
}

export interface ChatsListType {
  data: {
    data: SupportChatOverview[];
    pagination: PaginationTypes;
  };
}

export interface SupportMessage {
  _id: string;
  chat: string;
  createdAt: Date;
  id: string;
  media: string[];
  isAdmin: boolean;
  text: string;
  updatedAt?: Date;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    username: string;
  };
}

export interface ChatTypes {
  data: {
    data: SupportMessage[];
    pagination: PaginationTypes;
  };
}

interface NotificationSender {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

interface Notification {
  _id: string;
  isReceiverAdmin: boolean;
  sender: NotificationSender;
  type: string;
  title: string;
  body: string;
  chatId: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationResponse {
  statusCode: number;
  message: string;
  response: {
    data: Notification[];
  };
}
