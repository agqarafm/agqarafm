let videos = JSON.parse(localStorage.getItem('videos')) || [
    { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', views: 0, likes: 0 },
];

const mainVideo = document.getElementById('mainVideo');
const viewCount = document.getElementById('viewCount');
const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');
const videosContainer = document.querySelector('.videos');

let mainVideoData = videos[videos.length - 1];
mainVideo.src = mainVideoData.src;
updateVideoInfo();

likeBtn.addEventListener('click', () => {
    mainVideoData.likes++;
    saveVideos();
    updateVideoInfo();
});

function updateVideoInfo() {
    viewCount.textContent = `${mainVideoData.views} baxış`;
    likeCount.textContent = mainVideoData.likes;
}

function loadVideos() {
    videosContainer.innerHTML = '';
    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `<iframe width="350" height="200" src="${video.src}" frameborder="0" allowfullscreen></iframe>
        <div class="video-info">👍 ${video.likes} | ${video.views} baxış</div>`;
        videosContainer.appendChild(card);
    });
}

function saveVideos() {
    localStorage.setItem('videos', JSON.stringify(videos));
}

loadVideos();
