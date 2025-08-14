import { IUser } from "../common/types/user.interface";

export interface IBlog {
  _id?: string;
  title: string;
  imageUrl: string;
  description: string;
  content: string;
  authorId?: IUser;
}
