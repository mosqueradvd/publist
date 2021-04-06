import styled from 'styled-components'

export default styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: #855cf8;
  & section {
    width: 100%;
  }
  & section h1,
  section {
    color: white;
  }
  & a,
  nav a:active {
    font-weight: 700;
    padding: 0.25rem 1.5rem;
    border-radius: 4px;
    color: white !important;
    background: #481499;
  }
  & a:first-of-type {
    margin-left: -1.5rem;
  }
  & a:hover {
    color: white;
    background: #926bcf;
  }
`
