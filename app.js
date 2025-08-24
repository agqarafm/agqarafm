const app = document.getElementById("app");

let posts = JSON.parse(localStorage.getItem("posts")) || [];

function render() {
  app.innerHTML = `
    <header>
      <h1>Mini Sosial Şəbəkə</h1>
    </header>
    <div class="container">
      <h3>Yeni paylaşım et</h3>
      <textarea id="postText" placeholder="Nə fikirləşirsən?"></textarea>
      <input type="file" id="postImage">
      <button onclick="addPost()">Paylaş</button>
    </div>
    <div class="container">
      <h3>Paylaşımlar</h3>
      <div id="posts"></div>
    </div>
  `;

  const postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = posts.map((p, i) => `
    <div class="post">
      <p>${p.text}</p>
      ${p.img ? `<img src="${p.img}">` : ""}
      <button onclick="deletePost(${i})">Sil</button>
    </div>
  `).join("");
}

function addPost() {
  const text = document.getElementById("postText").value;
  const file = document.getElementById("postImage").files[0];

  if (!text && !file) return;

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      posts.unshift({ text, img: e.target.result });
      saveAndRender();
    };
    reader.readAsDataURL(file);
  } else {
    posts.unshift({ text, img: null });
    saveAndRender();
  }

  document.getElementById("postText").value = "";
  document.getElementById("postImage").value = "";
}

function deletePost(i) {
  posts.splice(i, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("posts", JSON.stringify(posts));
  render();
}

render();