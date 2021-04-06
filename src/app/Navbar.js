import { Link } from 'react-router-dom'
import Section from './Section'
import StyledNav from '../app/StyledNav'
import NavContentStyle from '../app/NavContentStyle'

export const Navbar = () => {
  return (
    <StyledNav>
      <Section>
        <h1>Selected Publications Hub</h1>
        <NavContentStyle>
          <Link to="/">Posts</Link>
          <Link to="/post/create">Create a post</Link>
        </NavContentStyle>
      </Section>
    </StyledNav>
  )
}
