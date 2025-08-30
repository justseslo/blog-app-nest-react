import type { IAuthor } from "@/features/author/types/author.interface";

export interface IComment {
  _id: string;
  content: string;
  authorId: IAuthor;
  blogId: string;
  createdAt: string;
}
