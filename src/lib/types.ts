export const postStatuses = ["draft", "published", "pending_review"] as const;

export interface ReturnedType {
  posts: PostTypes[];
}

export interface PostTypes {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export interface ListResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}
