import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { postAdded } from '../posts/postsSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  const onSavePost = () => {
    if (title && content) {
      dispatch(postAdded({ title, content, userId }))
    }

    setTitle('')
    setContent('')
  }

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const userOpts = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))
  return (
    <section>
      <h2>Create a new Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="write something fun..."
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Post Content</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {userOpts}
        </select>
        <button type="button" onClick={onSavePost} disabled={!canSave}>
          Save post
        </button>
      </form>
    </section>
  )
}
