import type { IAuthor } from "@/features/author/types/author.interface";

export interface IBlog {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  content: string;
  authorId: IAuthor;
  createdAt: string;
}

export interface ICreateBlog {
  title: string;
  imageUrl: string;
  description: string;
  content: string;
}
