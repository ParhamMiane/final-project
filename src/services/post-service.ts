import { DUMMY_BASE_URL } from "../constants";
import type { CreatePostForm, Post, PostResponse } from "../types/posts";


// Post List
export const getPostsApi = async ({page, pageSize}:{page: number, pageSize: number}) :Promise<PostResponse> => {
    const response = await fetch(`${DUMMY_BASE_URL}/posts?limit=${pageSize}&skip=${page * pageSize}`)

    if (!response.ok){
        throw new Error('Getting post faild :(')
    }

    const data: PostResponse = await response.json()
    return data
}
// Details
export const getPostApi = async (postId: number) :Promise<Post> => {
    const response = await fetch(`${DUMMY_BASE_URL}/posts${postId}`)

    if (!response.ok){
        throw new Error('Getting Post Details Faild :(')
    }

    const data: Post = await response.json()
    return data
}


export const creatPostApi = async (post: CreatePostForm) :Promise<Post> => {
    const response = await fetch(`${DUMMY_BASE_URL}/posts/add`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    })

    if (!response.ok){
        const err = await response.json()
        throw new Error(err.message || 'creating Post Faild :(')
    }

    const data: Post = await response.json()
    return data
}