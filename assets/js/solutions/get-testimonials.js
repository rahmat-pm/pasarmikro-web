// === Main Function ===
async function getAllTestimonials() {
  try {
    const data = await fetchDataAllTestimonials();
    const result = data.data

    const testimonialElement = document.getElementById('testimonials-wrapper');
    const htmlSections = [];


    result.forEach((carousel) => {
        const testimonialHTML = createTestimonialCard(carousel)

        htmlSections.push(testimonialHTML)
    });

    const finalHTML = htmlSections.join('');
    testimonialElement.innerHTML = finalHTML;

    // // ✅ Swiper init AFTER DOM injection
    renderTestimonialsSwiper();
  } catch (error) {
    console.error('Failed to load team members:', error);
  }
}

async function fetchDataAllTestimonials() {
    const url = `${API_URL}?api_key=${API_TOKEN}&route=testimonials`;
    return await httpGetPromises(url);
}

// === Create Team Card ===
function createTestimonialCard(data) {
  return `
    <div class="swiper-slide">
        <div class="testimonial-item">
        <div class="stars">
            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
        </div>
        <p>
            "${data.description}".
        </p>
        <div class="profile mt-auto">
            <img src="${data.image}" class="testimonial-img" alt="${data.name}">
            <h3>${data.name}</h3>
            <h4>${data.title}</h4>
        </div>
        </div>
    </div>
  `;
}

function renderTestimonialsSwiper() {
  const swiperContainer = document.querySelector('.swiper');
  const configScript = swiperContainer.querySelector('.swiper-config');
  const config = JSON.parse(configScript.textContent);
  
  new Swiper(swiperContainer, config);
}