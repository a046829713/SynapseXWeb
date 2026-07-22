export interface MetaData<T> {
  data: keyof T;
  column: string;
  width: string;
}
