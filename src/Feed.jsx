import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { ref, push, onValue } from 'firebase/database';
import StoryForm from './StoryForm';

const colors = ['#2a2a2a', '#333344', '#3b2f2f', '#1f2f3f', '#2f1f2f'];

export default function Feed({ user, goToProfile }) {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    onValue(ref(db, 'posts/'), (snapshot) => {
      const data = snapshot.val() || {};
      const arr = Object.entries(data).map(([id, value]) => ({ id, ...value }));
      setPosts(arr.sort(() => 0.5 - Math.random()));
    });
  }, []);

  const addPost = (title, story) => {
    const newRef = push(ref(db, 'posts/'));
    newRef.set({
      uid: user.uid,
      username: user.displayName,
      title,
      story,
      timestamp: new Date().toISOString()
    });
    setShowForm(false);
  };

  return (
    <div className="feed-container">
      <h1 className="hub-title">👻 Ghost Stories Hub 👻</h1>
      <button className="story-button" onClick={() => setShowForm(!showForm)}>Write a Story</button>
      {showForm && <StoryForm addPost={addPost} />}
      <div className="story-feed">
        {posts.map((post, i) => (
          <div key={post.id} className="story-card" style={{ background: colors[i % colors.length] }}>
            <h3>{post.title}</h3>
            <p>{post.story}</p>
            <p className="story-meta">
              <span onClick={() => goToProfile(post.uid)} className="clickable">
                👤 {post.username}
              </span> · {new Date(post.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}