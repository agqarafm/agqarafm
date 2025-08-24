const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

const videos = document.querySelectorAll('.video-item video');
videos.forEach(video => {
    const viewSpan = video.parentElement.querySelector('.views');
    video.addEventListener('play', () => {
        viewSpan.textContent = parseInt(viewSpan.textContent) + 1;
    });
});
