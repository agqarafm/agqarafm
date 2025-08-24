let videos = JSON.parse(localStorage.getItem('videos')) || [
    { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', views: 0, likes: 0 },
];

const videoSrcInput = document.getElementById('videoSrc');
const addVideoBtn = document.getElementById('addVideoBtn');
const adminVideoList = document.getElementById('adminVideoList');

function loadAdminVideos() {
    adminVideoList.innerHTML = '';
    videos.forEach((video, index) => {
        const div = document.createElement('div');
        div.className = 'video-card';
        div.innerHTML = `<p>${video.src} | 👍 ${video.likes} | ${video.views} baxış</p>
        <button onclick="deleteVideo(${index})">Sil</button>`;
        adminVideoList.appendChild(div);
    });
}

function saveVideos() {
    localStorage.setItem('videos', JSON.stringify(videos));
    loadAdminVideos();
}

function deleteVideo(index) {
    videos.splice(index, 1);
    saveVideos();
}

addVideoBtn.addEventListener('click', () => {
    const src = videoSrcInput.value.trim();
    if(src.includes("youtube.com") || src.includes("youtu.be")) {
        const embedUrl = src.replace("watch?v=", "embed/");
        videos.push({ src: embedUrl, views: 0, likes: 0 });
        videoSrcInput.value = '';
        saveVideos();
    } else {
        alert("YouTube linki daxil edin!");
    }
});

loadAdminVideos();
