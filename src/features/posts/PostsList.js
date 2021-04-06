import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TimeAgo } from '../posts/TimeAgo'
import { PostAuthor } from '../posts/PostAuthor'
import { useSelector, useDispatch } from 'react-redux'
import { selectPostById, fetchPosts } from '../posts/postsSlice'
import styled from 'styled-components'

const Button = styled.a`
  background-color: black;
  color: wheat;
  padding: 1rem 2rem;
  margin-left: 1em;
  border-radius: 4px;
`

let PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId))

  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timeStamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}...</p>

      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
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
    // const orderedPosts = !filteredPosts ? posts : filteredPosts.reverse()
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
    <section className="posts-list">
      <h2>Posts</h2>
      <button onClick={handlePostsView}>See oldest posts first</button>
      <Button>Posts</Button>
      <Button as={Link} href="/docs">
        Documentation
      </Button>
      {content}
    </section>
  )
}
