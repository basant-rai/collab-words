// 🔹 Firebase config (replace with yours)
const firebaseConfig = {
  apiKey: "AIzaSyD3WGw9s6EfFa1hIrs9tNRTrzY7fBTsfsI",
  authDomain: "halla-garr.firebaseapp.com",
  projectId: "halla-garr",
  storageBucket: "halla-garr.firebasestorage.app",
  messagingSenderId: "755983983798",
  appId: "1:755983983798:web:df5ea6589d85259939f217",
  measurementId: "G-ZB6BLJJM93"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 🔹 Generate or get stored user ID
function getUserId() {
  let id = localStorage.getItem('userId');
  if (!id) {
    id = 'user-' + Math.random().toString(36).substring(2, 10);
    localStorage.setItem('userId', id);
  }
  return id;
}
let userId = getUserId();

const storyDiv = document.getElementById('story');
const wordInput = document.getElementById('wordInput');
const errorDiv = document.getElementById('error');

// Render the story
function renderStory(words) {
  storyDiv.textContent = words.join(' ');
}

// Listen to story updates
db.collection('halla')
  .orderBy('timestamp')
  .onSnapshot(snapshot => {
    const words = [];
    snapshot.forEach(doc => words.push(doc.data().word));
    renderStory(words);
  });

// Check if user can add word
async function canUserAddWord(userId) {

  const snapshot = await db.collection('halla')
    .orderBy('timestamp', 'desc')
    .get();

  const allWords = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return allWords[allWords.length - 1].userId !== userId;
}

// async function canUserAddWord(userId) {
//   const lastWordSnapshot = await db.collection('halla')
//     .orderBy('timestamp', 'desc')
//     .limit(1)
//     .get();

//   if (lastWordSnapshot.empty) {
//     // no words at all, so allow
//     return true;
//   }

//   const lastWordData = lastWordSnapshot.docs[0].data() || {};

//   console.log("👀 Last word data:", lastWordData);

//   // block if last user = current user
//   return lastWordData.userId !== userId;
// }

// Handle Enter key
wordInput.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const word = wordInput.value.trim();

    // Validation: one word only
    if (!word) {
      errorDiv.textContent = 'Please enter a word.';
      return;
    }
    if (word.split(/\s+/).length > 1) {
      errorDiv.textContent = 'Only one word allowed.';
      return;
    }
    if (!/^[a-zA-Z]+$/.test(word)) {
      errorDiv.textContent = 'Please use only letters (a-z).';
      return;
    }

    // Check if allowed (not consecutive)
    const allowed = await canUserAddWord(userId);

    if (!allowed) {
      errorDiv.textContent = "You can't add two words in a row.";
      return;
    }

    // Save word
    try {
      await db.collection('halla').add({
        word: word,
        userId: userId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      wordInput.value = '';
      errorDiv.textContent = '';
      userId = ""
    } catch (error) {
      errorDiv.textContent = 'Error: ' + error.message;
    }
  }
});