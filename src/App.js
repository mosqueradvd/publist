import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { AddPostForm } from './features/posts/AddPostForm'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'
import { UserList } from './features/users/UserList'
import { UserPage } from './features/users/UserPage'
import { Search } from './app/Search'
import AppLayout from './app/AppLayout'
import Sidebar from './app/Sidebar'
import CentralPanel from './app/CentralPanel'

function App() {
  return (
    <Router>
      <Navbar />
      <AppLayout>
        <Sidebar>
          <UserList />
        </Sidebar>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <CentralPanel>
                  <Search />
                </CentralPanel>
              </>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/editPost/:postId" component={EditPostForm} />
          <Route exact path="/post/create" component={AddPostForm} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/users/:userId" component={UserPage} />
          <Redirect to="/" />
        </Switch>
      </AppLayout>
    </Router>
  )
}

export default App
