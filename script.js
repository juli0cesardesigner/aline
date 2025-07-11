const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  loop: false,
  pagination: {
    el: '.swiper-pagination',
  },
});

// Função para pausar todos os vídeos
function pauseAllVideos() {
  document.querySelectorAll('video').forEach(video => {
    video.pause();
    video.currentTime = 0; // opcional: reseta ao início
  });
}

// Reproduz o vídeo da slide atual (se houver)
function playCurrentVideo() {
  const currentSlide = document.querySelector('.swiper-slide-active');
  const video = currentSlide.querySelector('video');
  if (video) {
    video.play().catch(() => {
      // silencioso caso o autoplay falhe (por segurança do navegador)
    });
  }
}

// Ao mudar o slide
swiper.on('slideChangeTransitionEnd', () => {
  pauseAllVideos();
  playCurrentVideo();
});

// Roda o vídeo da primeira slide se for um vídeo
window.addEventListener('load', () => {
  playCurrentVideo();
});
