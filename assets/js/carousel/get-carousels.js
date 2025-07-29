// === Main Function ===
async function getAllCarousels() {
  try {
    const data = await fetchDataAllCarousels();
    const result = data.data

    const carouselElement = document.getElementById('carousel');
    const htmlSections = [];


    result.forEach((carousel) => {
        const carouselHTML = createCarousel(carousel)

        htmlSections.push(carouselHTML)
    });

    const finalHTML = htmlSections.join('');
    carouselElement.innerHTML = finalHTML;

    // ✅ Swiper init AFTER DOM injection
    renderCarouselSwiper();
  } catch (error) {
    console.error('Failed to load team members:', error);
  }
}

async function fetchDataAllCarousels() {
    const url = `${API_URL}?api_key=${API_TOKEN}&route=carousels`;
    return await httpGetPromises(url);
}

// === Create Team Card ===
function createCarousel(data) {
  const theme = data.theme.toLowerCase()
  const imageSrc = data.file_id
    ? `https://lh3.googleusercontent.com/d/${data.file_id}=w1500?authuser=0`
    : `assets/img/team/team-${(index % 4) + 1}.jpg`;

  return `
    <div class="swiper-slide slide-${theme}" data-header-theme="${theme}">
        <img src="${imageSrc}" alt="" class="img-fluid" data-aos="fade-in">

        <div class="container">
          <div class="row">
            <div class="col-xl-4">
              <h5 data-aos="fade-up" class="banner-subtitle">${data.subtitle}</h5>
              <h1 data-aos="fade-up" class="banner-title">${data.title}</h1>
              <blockquote data-aos="fade-up" data-aos-delay="100">
                <p>${data.paragraph}</p>
              </blockquote>
              <div class="d-flex" data-aos="fade-up" data-aos-delay="200">
                <a href="${data.cta_url}" target="_blank" class="btn-get-started">${data.cta_button_text}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
  `;
}