import { IBlogPosts } from '../domain/models/BlogPosts';

export const BlogPostsApi = {
  getAllBlogPosts: async () => {
    try {
      const data = await fetch('https://6144e843411c860017d256f0.mockapi.io/api/v1/posts');
      return await data.json() as IBlogPosts[];
    } catch (err) {
      return [];
    }
  }
}
