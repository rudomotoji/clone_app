import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './screens/LoginScreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  const user = useSelector(selectUser);
  const dispatch=useDispatch();
  useEffect(()=>{
    const unscup = auth.onAuthStateChanged(userAuth=>{
      if(userAuth){
        dispatch(login({
          uid:userAuth.uid,
          email:userAuth.email
        }))
      }else{
        dispatch(logout())
      }
    });
    return unscup;
  },[])
  return (
    <div className="App">
      <Router>
        {!user 
        ? (<Login/>) 
        : (<Switch>
            <Route path="/profile">
              <ProfileScreen />
            </Route>
            <Route path="/">
              <HomeScreen />
            </Route>
        </Switch>)}
    </Router>
    </div>
  );
}

export default App;
