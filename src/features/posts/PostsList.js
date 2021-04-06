import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TimeAgo } from '../posts/TimeAgo'
import { PostAuthor } from '../posts/PostAuthor'
import { useSelector, useDispatch } from 'react-redux'
import { selectPostById, fetchPosts } from '../posts/postsSlice'

import PostContainer from '../../app/PostContainer'
import Section from '../../app/Section'
import styled from 'styled-components'

const PostArticle = styled.article`
  padding: 1.45rem 2rem;
  border-radius: 7px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
`

let PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId))

  return (
    <PostArticle key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timeStamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}...</p>

      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </PostArticle>
  )
}

export const PostsList = ({ filteredPosts }) => {
  const dispatch = useDispatch()
  const [post, setPost] = useState(false)

  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content
  if (postStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (postStatus === 'succeeded') {
    const orderedPosts = post
      ? [...filteredPosts].sort((a, b) => b.date.localeCompare(a.date))
      : filteredPosts.reverse()

    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} postId={post.id} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  const handlePostsView = () => {
    setPost(!post)
  }

  return (
    <PostContainer>
      <Section>
        <h2>Posts</h2>
        <button onClick={handlePostsView}>Sort posts</button>
        {content}
      </Section>
    </PostContainer>
  )
}
