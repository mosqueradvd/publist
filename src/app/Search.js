import { useState } from 'react'
import { useSelector } from 'react-redux'
import { PostsList } from '../features/posts/PostsList'
import { selectAllPosts } from '../features/posts/postsSlice'
import styled from 'styled-components'
import Section from './Section'

const SearchInput = styled.input`
  background-color: white;
  border-radius: 4px;
  outline: none;
  box-shadow: 0 2px 4px rgb(0 0 0 / 15%);
`
export const Search = () => {
  const [searchField, setSearchField] = useState('')

  const posts = useSelector(selectAllPosts)

  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(searchField.toLowerCase())
  })

  const handleChange = (e) => {
    setSearchField(e.target.value)
  }

  const searhchList = () => <PostsList filteredPosts={filteredPosts} />

  return (
    <Section>
      <div>
        <SearchInput
          type="search"
          placeholder="Search your favorite post"
          onChange={handleChange}
        />
      </div>
      {searhchList()}
    </Section>
  )
}
