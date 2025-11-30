// ===== Get URL Parameters =====
function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        series: params.get('series') || 'Breaking Bad',
        season: params.get('season') || '1',
        episode: params.get('episode') || '1',
        title: params.get('title') || 'Pilot',
        videoUrl: params.get('url') || ''
    };
}

// ===== Update Page Content =====
function updatePageContent() {
    const params = getURLParams();

    // Update episode info
    document.getElementById('episodeTitle').textContent =
        `${params.series} - Temporada ${params.season}, Episodio ${params.episode}`;
    document.getElementById('episodeSubtitle').textContent = params.title;

    // If video URL is provided, load it
    if (params.videoUrl) {
        loadVideo(params.videoUrl);
    }

    // Update page title
    document.title = `${params.title} - ${params.series} - MediaHub`;
}

// ===== Load Video =====
function loadVideo(url) {
    const placeholder = document.querySelector('.video-placeholder');
    const wrapper = document.querySelector('.player-wrapper');

    if (!url) return;

    // Remove placeholder
    if (placeholder) {
        placeholder.remove();
    }

    // Determine if it's an iframe or video element
    if (url.includes('iframe') || url.includes('embed')) {
        // It's an iframe URL
        const iframe = document.createElement('iframe');
        iframe.id = 'videoPlayer';
        iframe.src = url;
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        wrapper.appendChild(iframe);
    } else {
        // It's a direct video URL
        const video = document.createElement('video');
        video.id = 'videoPlayer';
        video.controls = true;
        video.autoplay = false;

        const source = document.createElement('source');
        source.src = url;
        source.type = 'video/mp4';

        video.appendChild(source);
        wrapper.appendChild(video);
    }
}

// ===== Episode Navigation =====
function setupNavigation() {
    const params = getURLParams();
    const prevBtn = document.getElementById('prevEpisode');
    const nextBtn = document.getElementById('nextEpisode');

    // Disable previous button if it's episode 1
    if (parseInt(params.episode) === 1) {
        prevBtn.disabled = true;
    }

    // Previous episode
    prevBtn.addEventListener('click', () => {
        const prevEpisode = parseInt(params.episode) - 1;
        if (prevEpisode >= 1) {
            navigateToEpisode(params.series, params.season, prevEpisode);
        }
    });

    // Next episode
    nextBtn.addEventListener('click', () => {
        const nextEpisode = parseInt(params.episode) + 1;
        navigateToEpisode(params.series, params.season, nextEpisode);
    });
}

// ===== Navigate to Episode =====
function navigateToEpisode(series, season, episode) {
    const url = new URL(window.location.href);
    url.searchParams.set('series', series);
    url.searchParams.set('season', season);
    url.searchParams.set('episode', episode);

    // You can add logic here to get the correct title for the episode
    // For now, we'll just use a generic title
    url.searchParams.set('title', `Episodio ${episode}`);

    window.location.href = url.toString();
}

// ===== Keyboard Shortcuts =====
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        const video = document.getElementById('videoPlayer');

        if (!video) return;

        switch (e.key) {
            case ' ':
                // Space bar - play/pause
                e.preventDefault();
                if (video.tagName === 'VIDEO') {
                    if (video.paused) {
                        video.play();
                    } else {
                        video.pause();
                    }
                }
                break;

            case 'ArrowLeft':
                // Left arrow - rewind 10 seconds
                if (video.tagName === 'VIDEO') {
                    video.currentTime = Math.max(0, video.currentTime - 10);
                }
                break;

            case 'ArrowRight':
                // Right arrow - forward 10 seconds
                if (video.tagName === 'VIDEO') {
                    video.currentTime = Math.min(video.duration, video.currentTime + 10);
                }
                break;

            case 'f':
                // F - fullscreen
                if (video.tagName === 'VIDEO') {
                    if (video.requestFullscreen) {
                        video.requestFullscreen();
                    } else if (video.webkitRequestFullscreen) {
                        video.webkitRequestFullscreen();
                    }
                }
                break;

            case 'm':
                // M - mute/unmute
                if (video.tagName === 'VIDEO') {
                    video.muted = !video.muted;
                }
                break;
        }
    });
}

// ===== Auto-play Next Episode =====
function setupAutoplay() {
    const video = document.getElementById('videoPlayer');

    if (video && video.tagName === 'VIDEO') {
        video.addEventListener('ended', () => {
            const params = getURLParams();
            const nextEpisode = parseInt(params.episode) + 1;

            // Show notification
            showNotification('Reproduciendo siguiente episodio en 5 segundos...');

            // Auto-play next episode after 5 seconds
            setTimeout(() => {
                navigateToEpisode(params.series, params.season, nextEpisode);
            }, 5000);
        });
    }
}

// ===== Notification System =====
function showNotification(message) {
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        padding: '1rem 1.5rem',
        background: 'linear-gradient(135deg, hsl(280, 85%, 60%), hsl(200, 90%, 55%))',
        color: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 8px 32px hsla(0, 0%, 0%, 0.3)',
        zIndex: '1000',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.875rem',
        fontWeight: '500',
        animation: 'slideIn 0.3s ease-out',
        maxWidth: '300px'
    });

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    updatePageContent();
    setupNavigation();
    setupKeyboardShortcuts();

    // Setup autoplay after a short delay to ensure video is loaded
    setTimeout(setupAutoplay, 1000);

    console.log('Player initialized successfully! 🎬');
});
