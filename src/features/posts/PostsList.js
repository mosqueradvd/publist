import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TimeAgo } from '../posts/TimeAgo'
import { PostAuthor } from '../posts/PostAuthor'
import { selectAllPosts } from '../posts/postsSlice'

export const PostsList = () => {
  const posts = useSelector(selectAllPosts)

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}...</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ))

  return (
    <section className="post-list">
      <h2>Recent Posts</h2>
      {renderedPosts}
    </section>
  )
}