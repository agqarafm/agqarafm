let videos = JSON.parse(localStorage.getItem('videos')) || [
    { src: 'videos/sample.mp4', views: 0, likes: 0 },
    { src: 'videos/sample2.mp4', views: 0, likes: 0 }
];

const mainVideo = document.getElementById('mainVideo');
const viewCount = document.getElementById('viewCount');
const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');
const videosContainer = document.querySelector('.videos');

let mainVideoData = videos[videos.length - 1];
mainVideo.src = mainVideoData.src;
updateVideoInfo();

mainVideo.addEventListener('play', () => {
    mainVideoData.views++;
    saveVideos();
    updateVideoInfo();
});

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
        card.innerHTML = `<video controls>
            <source src="${video.src}" type="video/mp4">
        </video>
        <div class="video-info">
            👍 ${video.likes}  | ${video.views} baxış
        </div>`;
        videosContainer.appendChild(card);
    });
}

function saveVideos() {
    localStorage.setItem('videos', JSON.stringify(videos));
}

loadVideos();
