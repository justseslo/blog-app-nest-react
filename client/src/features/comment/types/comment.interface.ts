import type { IAuthor } from "@/features/author/types/author.interface";

export interface IComment {
  content: string;
  author: IAuthor;
  blogId: string;
  createdAt: string;
}
