import { blogPosts } from '@/data/dummy_posts'

export function handleGetAllPosts() {
  return new Response(JSON.stringify(blogPosts), {
    headers: { 'Content-Type': 'application/json' }
  })
}

export function handleGetPostByID(id: string) {
  const post = blogPosts.find(post => post.id === id);

  if (!post) {
    return new Response('Post not found !', { status: 404 })
  }

  return new Response(JSON.stringify(post), {
    headers: { 'Content-Type': 'application/json' }
  })
}

export function handleCreatePost(title: string, content: string) {
  const newPost: Post = {
    id: `${blogPosts.length}`,
    title,
    content,
  }

  blogPosts.push(newPost);

  return new Response(JSON.stringify(newPost), {
    headers: { 'Content-Type': 'application/json' },
    status: 201
  })
}

export function handleUpdatePost(id: string, title: string, content: string) {
  const postIndex = blogPosts.findIndex(post => post.id === id);

  if (postIndex === -1) {
    return new Response('Post not found !', {
      status: 404
    })
  }

  blogPosts[postIndex] = {
    ...blogPosts[postIndex],
    title,
    content
  }

  return new Response("Post Updated", { status: 200 })
}

export function handleDeletePost(id: string) {
  const postIndex = blogPosts.findIndex(post => post.id === id);

  if (postIndex === -1) {
    return new Response('Post not found !', {
      status: 404
    })
  }

  blogPosts.splice(postIndex, 1);

  return new Response("Post Deleted", { status: 200 })
}