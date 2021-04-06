import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PostAuthor } from '../posts/PostAuthor'
import { selectPostById } from '../posts/postsSlice'

import CentralPanel from '../../app/CentralPanel'
import PostContainer from '../../app/PostContainer'

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  const post = useSelector((state) => selectPostById(state, postId))

  if (!post) {
    return (
      <section>
        <h2>Post not found.</h2>
      </section>
    )
  }

  return (
    <CentralPanel>
      <PostContainer>
        <article className="post">
          <h2>{post.title}</h2>
          <PostAuthor userId={post.user} />
          <p className="post-content">{post.content}</p>
          <Link to={`/editPost/${post.id}`} className="button">
            Edit post
          </Link>
        </article>
      </PostContainer>
    </CentralPanel>
  )
}
