// — Firebase init —
const firebaseConfig = {
  apiKey: "AIzaSyAepf_M4EeW7QbXGKVc21Yb4nust240c4c",
  authDomain: "ghost-stories-hub-e372e.firebaseapp.com",
  databaseURL: "https://ghost-stories-hub-e372e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ghost-stories-hub-e372e",
  storageBucket: "ghost-stories-hub-e372e.firebasestorage.app",
  messagingSenderId: "387198854399",
  appId: "1:387198854399:web:cc70ebb7d6a19cc15e18ca"
};
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.database();

// — DOM refs —
const loginScreen  = document.getElementById('login-screen');
const loginBtn     = document.getElementById('login-btn');
const feedScreen   = document.getElementById('feed-screen');
const openFormBtn  = document.getElementById('open-form-btn');
const storyModal   = document.getElementById('story-modal');
const closeFormBtn = document.getElementById('close-form-btn');
const postBtn      = document.getElementById('post-btn');
const postsEl      = document.getElementById('posts');
const titleIn      = document.getElementById('story-title');
const bodyIn       = document.getElementById('story-body');

// — Auth listener —
auth.onAuthStateChanged(user => {
  if (user) {
    // hide login, show feed
    loginScreen.classList.add('hidden');
    feedScreen.classList.remove('hidden');
    loadFeed();
  } else {
    loginScreen.classList.remove('hidden');
    feedScreen.classList.add('hidden');
  }
});

// — Login action —
loginBtn.onclick = () => {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .catch(e => alert('Error: ' + e.message));
};

// — Open/close story modal —
openFormBtn.onclick  = () => storyModal.classList.remove('hidden');
closeFormBtn.onclick = () => storyModal.classList.add('hidden');

// — Post story —
postBtn.onclick = () => {
  const title = titleIn.value.trim();
  const story = bodyIn.value.trim();
  if (!title || !story) return alert('Title & story required');
  const user = auth.currentUser;
  db.ref('posts').push({
    uid: user.uid,
    username: user.displayName,
    title, story,
    timestamp: new Date().toISOString()
  });
  titleIn.value = '';
  bodyIn.value  = '';
  storyModal.classList.add('hidden');
};

// — Load feed —
function loadFeed() {
  db.ref('posts').on('value', snap => {
    const data = snap.val() || {};
    const arr  = Object.values(data).sort((a,b)=> b.timestamp.localeCompare(a.timestamp));
    postsEl.innerHTML = '';
    arr.forEach(p => {
      const card = document.createElement('div');
      card.className = 'post-card';
      card.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.story}</p>
        <p class="meta">${p.username} · ${new Date(p.timestamp).toLocaleString()}</p>`;
      postsEl.appendChild(card);
    });
  });
                     }
