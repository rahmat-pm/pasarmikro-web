function renderSwiper() {
      const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        autoplay: {
          delay: 100,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        on: {
            slideChangeTransitionEnd: function () {
                const activeSlide = this.slides[this.activeIndex];
                const theme = activeSlide.getAttribute('data-header-theme') || 'dark';

                const header = document.querySelector('#header');
                const logoImg = document.querySelector('#logo-img');

                header.classList.remove('light-theme', 'dark-theme');
                header.classList.add(theme + '-theme');

                if (theme === 'light') {
                logoImg.src = 'assets/img/logo-horizontal-black.png';
                } else {
                logoImg.src = 'assets/img/logo-horizontal-white.png';
                }

                // 🔁 Change autoplay delay after first run
                if (this.autoplay && this.autoplay.running && this.params.autoplay.delay === 100) {
                this.params.autoplay.delay = 8000;
                this.autoplay.stop();
                this.autoplay.start();
                }
            }
        }
      });
    }