import { serve } from 'bun'
import {
  handleCreatePost,
  handleDeletePost,
  handleGetAllPosts,
  handleGetPostByID,
  handleUpdatePost
} from '@/controllers'

const PORT = 3000;

serve({
  port: PORT,

  async fetch(request) {
    const { method } = request;
    const { pathname } = new URL(request.url)
    const pathRegexForID = /^\/api\/posts\/(\d+)$/;

    // GET - route to get a post by id
    if (method === 'GET') {
      const match = pathname.match(pathRegexForID)
      const id = match && match[1];

      if (id) {
        return handleGetPostByID(id);
      }
    }

    // GET - route to get all posts
    if (method === 'GET' && pathname === '/api/posts') {
      return handleGetAllPosts()
    }

    // POST - route to create a post
    if (method === 'POST' && pathname === '/api/posts') {
      const newPost = await request.json();
      return handleCreatePost(newPost.title, newPost.content);
    }

    // PATCH - route to edit a post by id
    if (method === 'PATCH') {
      const match = pathname.match(pathRegexForID)
      const id = match && match[1];

      if (id) {
        const editedPost = await request.json()
        return handleUpdatePost(id, editedPost.title, editedPost.content)
      }
    }

    // DELETE - route to delete a post by id
    if (method === 'DELETE' && pathname === '/api/posts') {
      const { id } = await request.json();

      return handleDeletePost(id);
    }

    return new Response("Not Found !", { status: 404 })
  },

  error(error) {
    return new Response(`Something Went Wrong - ${error.message}`, { status: 500 })
  },

});

console.log(`BUN Server started on http://localhost:${PORT}`);