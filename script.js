const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// Impede o menu ao pressionar a imagem
document.querySelectorAll('.swiper-slide img').forEach(img => {
  img.addEventListener('contextmenu', e => e.preventDefault());
});

// Pausar quando tocar e segurar
const swiperEl = document.querySelector('.swiper');

swiperEl.addEventListener('touchstart', () => {
  swiper.autoplay.stop();
});

swiperEl.addEventListener('touchend', () => {
  swiper.autoplay.start();
});

swiperEl.addEventListener('touchcancel', () => {
  swiper.autoplay.start();
});
