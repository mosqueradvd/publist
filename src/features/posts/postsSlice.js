import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.posts
})
// useSelector inside the component to fetch n' populate
// with posts useSelector(fetcPosts)
export const AddNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await client.post('/fakeApi/posts', { post: initialPost })
    return response.posts
  }
)
const postsSlice = createSlice({
  // postSlice = immer mutability... it's safe to alter the state.
  name: 'posts',
  initialState,
  reducers: {
    // posts/postAdded
    postAdded(state, action) {
      state.posts.push(action.payload)
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
      const currentPost = state.posts.find((post) => post.id === id)

      if (currentPost) {
        currentPost.title = title
        currentPost.content = content
      }
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.posts = state.posts.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [AddNewPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload)
    },
  },
})

export const { postAdded, postUpdated } = postsSlice.actions

export const selectAllPosts = (state) => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
)

export default postsSlice.reducer
