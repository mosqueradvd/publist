import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectUserById } from '../users/usersSlice'
import { selectPostsByUser } from '../posts/postsSlice'

import CentralPanel from '../../app/CentralPanel'
import PostContainer from '../../app/PostContainer'
import StyledLi from '../../app/StyledLi'

export const UserPage = ({ match }) => {
  const { userId } = match.params

  const user = useSelector((state) => selectUserById(state, userId))
  const postsForUser = useSelector((state) => selectPostsByUser(state, userId))

  const postTitles = postsForUser.map((post) => (
    <StyledLi key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </StyledLi>
  ))

  return (
    <CentralPanel>
      <PostContainer>
        <h2>{user.name} latest posts</h2>
        <ul>{postTitles}</ul>
      </PostContainer>
    </CentralPanel>
  )
}
