export interface StatusMessageResponse {
  status: 'success' | 'error';
  message: string;
}

export interface Question {
  imgPath: string;
  no: number;
}
