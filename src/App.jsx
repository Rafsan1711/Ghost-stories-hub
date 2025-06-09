import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import Feed from './Feed';
import Profile from './Profile';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [viewProfile, setViewProfile] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        set(ref(db, 'users/' + u.uid), {
          username: u.displayName,
          createdAt: u.metadata.creationTime
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  const signIn = () => {
    signInWithPopup(auth, new GoogleAuthProvider());
  };

  const goToProfile = (uid) => setViewProfile(uid);
  const goHome = () => setViewProfile(null);

  return (
    <div className="app">
      {!user ? (
        <div className="login-screen">
          <h1>Ghost Stories Hub</h1>
          <button onClick={signIn}>Sign in with Google</button>
        </div>
      ) : viewProfile ? (
        <Profile uid={viewProfile} goHome={goHome} />
      ) : (
        <Feed user={user} goToProfile={goToProfile} />
      )}
    </div>
  );
}

export default App;