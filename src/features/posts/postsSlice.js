import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
  },
]

const postsSlice = createSlice({
  // postSlice = immer mutability... it's safe to alter the state.
  name: 'posts',
  initialState,
  reducers: {
    // posts/postAdded
    postAdded(state, action) {
      state.push(action.payload)
    },
    prepare(title, content, userId) {
      return {
        payload: {
          id: nanoid(),
          date: new Date().toISOString(),
          title,
          content,
          user: userId,
        },
      }
    },

    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const currentPost = state.find((post) => post.id === id)

      if (currentPost) {
        currentPost.title = title
        currentPost.content = content
      }
    },
  },
})

export const { postAdded, postUpdated } = postsSlice.actions

export const selectAllPosts = (state) => state.posts

export const selectPostById = (state, postId) =>
  state.posts.find((post) => post.id === postId)

export default postsSlice.reducer
