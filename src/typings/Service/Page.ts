export interface PageInfo {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  }
  
export interface PagedData<T> {
    content: T[];
    page: PageInfo;
  }
  

export {};
  