import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllUsers } from './usersSlice'
import Section from '../../app/Section'
import StyledLi from '../../app/StyledLi'

export const UserList = () => {
  const users = useSelector(selectAllUsers)
  const renderedUsers = users.map((user) => (
    <StyledLi key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </StyledLi>
  ))

  return (
    <Section>
      <h2>Authors</h2>
      <ul>{renderedUsers}</ul>
    </Section>
  )
}
