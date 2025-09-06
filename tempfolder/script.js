const form = document.getElementById('blog-form');
const postsContainer = document.getElementById('posts-container');
const API_URL = '/blog'; // Change to live URL after deployment if needed

async function fetchPosts() {
  try {
    const res = await fetch(API_URL);
    const posts = await res.json();
    postsContainer.innerHTML = '';
    if(posts.length === 0) {
      postsContainer.innerHTML = '<p>No posts yet.</p>';
    } else {
      posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'post-item';
        div.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p><small>${new Date(post.createdAt).toLocaleString()}</small><button onclick="deletePost('${post._id}')">Delete</button>`;
        postsContainer.appendChild(div);
      });
    }
  } catch(e) {
    postsContainer.innerHTML = '<p>Unable to load posts at this time.</p>';
  }
}

async function addPost(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  await fetch(API_URL, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ title, content })
  });
  form.reset();
  fetchPosts();
}

async function deletePost(id) {
  await fetch(`${API_URL}/${id}`, { method:'DELETE' });
  fetchPosts();
}

form.addEventListener('submit', addPost);
fetchPosts();


