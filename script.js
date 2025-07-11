const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  loop: false, // desativa o loop
  pagination: {
    el: '.swiper-pagination',
  },
});

// Pausar todos os vídeos
function pauseAllVideos() {
  document.querySelectorAll('video').forEach(video => {
    video.pause();
    video.currentTime = 0;
  });
}

// Reproduz vídeo do slide atual
function playCurrentVideo() {
  const activeSlide = document.querySelector('.swiper-slide-active');
  const video = activeSlide.querySelector('video');
  if (video) {
    video.play().catch(() => {});
  }
}

// Eventos do swiper
const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  loop: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  spaceBetween: 0,
  touchRatio: 1,
  simulateTouch: true,
  allowTouchMove: true,
});
