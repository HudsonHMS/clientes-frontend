export interface ResponseObject<T> {
  status: string;
  responseData?: T;
  message?: string;
}
