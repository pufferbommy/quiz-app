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
