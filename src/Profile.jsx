import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { ref, onValue } from 'firebase/database';

const profileColors = ['#4b2c2c', '#2e2b4f', '#3f3f3f'];

export default function Profile({ uid, goHome }) {
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onValue(ref(db, 'users/' + uid), (snap) => {
      setUserData(snap.val() || {});
    });

    onValue(ref(db, 'posts/'), (snap) => {
      const all = snap.val() || {};
      const userPosts = Object.values(all).filter(p => p.uid === uid);
      setPosts(userPosts.reverse());
    });
  }, [uid]);

  const created = new Date(userData.createdAt || '');
  const date = `${created.getDate()}-${created.getMonth() + 1}-${created.getFullYear()}`;

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-bg"></div>
        <img src="profile.png" className="profile-pic" alt="profile" />
        <h2>{userData.username}</h2>
        <p>Account created on: {date}</p>
        <button onClick={goHome}>🏠 Back to Feed</button>
      </div>

      <div className="user-posts">
        {posts.map((post, i) => (
          <div key={i} className="story-card" style={{ background: profileColors[i % profileColors.length] }}>
            <h3>{post.title}</h3>
            <p>{post.story}</p>
            <span>{new Date(post.timestamp).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}