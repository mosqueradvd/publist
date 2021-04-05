import { useState } from 'react'
import { useSelector } from 'react-redux'
import { PostsList } from '../features/posts/PostsList'
import { selectAllPosts } from '../features/posts/postsSlice'

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
    <section className="garamond">
      <div className="navy georgia ma0 grow">
        <h2 className="f2">Search your Fav Post</h2>
      </div>
      <div className="pa2">
        <input
          className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
          type="search"
          placeholder="Search a post"
          onChange={handleChange}
        />
      </div>
      {searhchList()}
    </section>
  )
}
