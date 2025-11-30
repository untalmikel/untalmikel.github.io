// ===== Media Card Toggle =====
function initializeMediaCards() {
    const mediaCards = document.querySelectorAll('.media-card');

    mediaCards.forEach(card => {
        const header = card.querySelector('.media-card-header');

        header.addEventListener('click', () => {
            // Toggle expanded state
            card.classList.toggle('expanded');

            // Add smooth animation
            const content = card.querySelector('.media-content');
            if (card.classList.contains('expanded')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
}

// ===== Season Toggle =====
function initializeSeasons() {
    const seasonHeaders = document.querySelectorAll('.season-header');

    seasonHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card toggle

            const seasonItem = header.closest('.season-item');
            const episodeList = seasonItem.querySelector('.episode-list');

            // Toggle expanded state
            seasonItem.classList.toggle('expanded');

            // Add smooth animation
            if (seasonItem.classList.contains('expanded')) {
                episodeList.style.maxHeight = episodeList.scrollHeight + 'px';
            } else {
                episodeList.style.maxHeight = '0';
            }
        });
    });
}

// ===== Filter Functionality =====
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.nav-btn');
    const mediaCards = document.querySelectorAll('.media-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter cards with animation
            mediaCards.forEach((card, index) => {
                const cardType = card.dataset.type;

                if (filter === 'all' || cardType === filter) {
                    // Show card with staggered animation
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        card.style.animation = 'none';
                        setTimeout(() => {
                            card.style.animation = 'fadeIn 0.35s ease-out';
                        }, 10);
                    }, index * 50);
                } else {
                    // Hide card
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ===== Episode Link Interaction =====
function initializeEpisodeLinks() {
    const episodeLinks = document.querySelectorAll('.episode-link');
    const movieLinks = document.querySelectorAll('.movie-link');

    // Handle episode links
    episodeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Add visual feedback
            link.style.transform = 'scale(0.98)';
            setTimeout(() => {
                link.style.transform = '';
            }, 150);

            // Get episode information from the DOM
            const episodeNumber = link.querySelector('.episode-number')?.textContent || '1';
            const episodeTitle = link.querySelector('.episode-title')?.textContent || 'Episode';

            // Get season information
            const seasonItem = link.closest('.season-item');
            const seasonTitle = seasonItem?.querySelector('.season-title')?.textContent || 'Temporada 1';
            const seasonNumber = seasonTitle.match(/\d+/)?.[0] || '1';

            // Get series information
            const mediaCard = link.closest('.media-card');
            const seriesTitle = mediaCard?.querySelector('.media-title')?.textContent || 'Serie';

            // Get the video URL from href (you'll need to update your HTML to include actual URLs)
            const videoUrl = link.getAttribute('href').replace('#', '');

            // Navigate to player page with parameters
            const playerUrl = new URL('player.html', window.location.href);
            playerUrl.searchParams.set('series', seriesTitle);
            playerUrl.searchParams.set('season', seasonNumber);
            playerUrl.searchParams.set('episode', episodeNumber);
            playerUrl.searchParams.set('title', episodeTitle);

            // If you have a video URL, add it
            if (videoUrl && videoUrl !== '') {
                playerUrl.searchParams.set('url', videoUrl);
            }

            // Show notification
            showNotification(`Cargando: ${episodeTitle}`);

            // Navigate after a short delay
            setTimeout(() => {
                window.location.href = playerUrl.toString();
            }, 300);
        });
    });

    // Handle movie links
    movieLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Add visual feedback
            link.style.transform = 'scale(0.98)';
            setTimeout(() => {
                link.style.transform = '';
            }, 150);

            // Get movie information
            const mediaCard = link.closest('.media-card');
            const movieTitle = mediaCard?.querySelector('.media-title')?.textContent || 'Película';
            const quality = link.querySelector('.quality-badge')?.textContent || 'HD';

            // Get the video URL from href
            const videoUrl = link.getAttribute('href').replace('#', '');

            // Navigate to player page with parameters
            const playerUrl = new URL('player.html', window.location.href);
            playerUrl.searchParams.set('series', movieTitle);
            playerUrl.searchParams.set('season', '1');
            playerUrl.searchParams.set('episode', '1');
            playerUrl.searchParams.set('title', `${movieTitle} (${quality})`);

            // If you have a video URL, add it
            if (videoUrl && videoUrl !== '') {
                playerUrl.searchParams.set('url', videoUrl);
            }

            // Show notification
            showNotification(`Cargando: ${movieTitle}`);

            // Navigate after a short delay
            setTimeout(() => {
                window.location.href = playerUrl.toString();
            }, 300);
        });
    });
}

// ===== Notification System =====
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Add styles
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

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== Smooth Scroll Enhancement =====
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    initializeMediaCards();
    initializeSeasons();
    initializeFilters();
    initializeEpisodeLinks();
    initializeSmoothScroll();

    console.log('MediaHub initialized successfully! 🎬');
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to collapse all expanded cards
    if (e.key === 'Escape') {
        const expandedCards = document.querySelectorAll('.media-card.expanded');
        expandedCards.forEach(card => {
            card.classList.remove('expanded');
            const content = card.querySelector('.media-content');
            content.style.maxHeight = '0';
        });

        const expandedSeasons = document.querySelectorAll('.season-item.expanded');
        expandedSeasons.forEach(season => {
            season.classList.remove('expanded');
            const episodeList = season.querySelector('.episode-list');
            episodeList.style.maxHeight = '0';
        });
    }
});
