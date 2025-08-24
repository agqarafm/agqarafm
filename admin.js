let videos = JSON.parse(localStorage.getItem('videos')) || [
    { src: 'videos/sample.mp4', views: 0, likes: 0 },
    { src: 'videos/sample2.mp4', views: 0, likes: 0 }
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
    if(src) {
        videos.push({ src: src, views: 0, likes: 0 });
        videoSrcInput.value = '';
        saveVideos();
    }
});

loadAdminVideos();
