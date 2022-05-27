import { useQuery } from 'react-query';
import { BlogPostsApi } from '../api/BlogPostsApi';

export const useBlogPost = () => {
  return useQuery({
    queryKey: ['/get-blog-posts'],
    queryFn: () => BlogPostsApi.getAllBlogPosts(),
  });
}