export interface StatusMessageResponse {
  status: 'success' | 'error';
  message: string;
}

export interface StatusMessageDataResponse<T> extends StatusMessageResponse {
  data: T;
}

export interface Question {
  imgPath: string;
  no: number;
}
