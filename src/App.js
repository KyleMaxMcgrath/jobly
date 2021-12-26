import './App.css';
import Login from './Login';
import Register from './Register';
import NavBar from './NavBar';
import { BrowserRouter, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import isLoggedIn from './auth';
import {useState, useEffect} from 'react';
import JobList from "./JobList";
import Home from "./Home";
import PostJob from './PostJob';
import Profile from './Profile';
import Logout from './Logout';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const loginEffect = async ()=>{
    const check = await isLoggedIn();
    setLoggedIn(loggedIn=>check);
  };
  useEffect(loginEffect, [loggedIn])

  return (
    <div className="App">
      <BrowserRouter>
          <NavBar loggedIn={loggedIn}/>
          <br/>
          <Route exact path='/login'>
            <Login loggedIn={loggedIn} loginEffect={loginEffect}/>
          </Route>
          <Route exact path='/register'>
            <Register loggedIn={loggedIn}/>
          </Route>
          <Route path='/jobs/:uuidSelected'>
            <JobList loggedIn={loggedIn} />
          </Route>
          <Route exact path='/postjob'>
            <PostJob loggedIn={loggedIn} />
          </Route>
          <Route exact path='/profile'>
            <Profile loggedIn={loggedIn} />
          </Route>
          <Route exact path="/logout">
            <Logout loginEffect={loginEffect}/>
          </Route>
          <Route exact path="/">
            <Home loggedIn={loggedIn}/>
          </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
