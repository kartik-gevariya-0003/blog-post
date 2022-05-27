import { IAuthors } from './Authors';
import { IComments } from './Comments';

export interface IBlogPosts {
  authors: IAuthors[];
  comments: IComments[];
  createdAt: string;
  description: string;
  id: string;
  title: string;
  updatedAt: string;
}