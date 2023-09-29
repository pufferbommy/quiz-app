export interface StatusMessageResponse {
  status: 'success' | 'error';
  message: string;
}

export interface StatusMessageDataResponse<T> extends StatusMessageResponse {
  data: T;
}

export interface Question {
  id: number;
  imagePath: string;
}

export interface AdminQuestion extends Question {
  answer: string | VerseAnswer;
  meaning: string;
  category: string;
  subCategory: string;
}

export interface VerseAnswer {
  first: string;
  second: string;
  third: string;
  fourth: string;
}

export interface UserData {
  userId: string;
  roleId: number;
}

export interface QuestionsData {
  questions: Question[];
}

export interface AdminQuestionData {
  question: AdminQuestion;
}

export interface AdminQuestionsData {
  questions: AdminQuestion[];
}

export interface UploadFileSuccessData {
  filePath: string;
}
