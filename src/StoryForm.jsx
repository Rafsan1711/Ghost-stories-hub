import React, { useState } from 'react';

export default function StoryForm({ addPost }) {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');

  return (
    <div className="story-form">
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Write your horror story..." value={story} onChange={(e) => setStory(e.target.value)} />
      <button onClick={() => addPost(title, story)}>Post</button>
    </div>
  );
}