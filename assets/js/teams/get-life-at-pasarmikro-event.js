// === Main Function ===
async function getAllEventData() {
  try {
    const eventId = getEventId()
    const data = await fetchDataEvent(eventId);

    const result = data.data

    const htmlSections = [];

    result.images.forEach((image, index) => {
        const imageHTML = createImageCard(image, index)
        htmlSections.push(imageHTML)
    });

    const cardHTML = htmlSections.join('');
    const cardFinalHTML = `
            <div class="row gy-4 text-center">
            ${cardHTML}
            </div>
        `;
    const swiperFinalHTML = `
            <div class="swiper-slide" style="height: 600px; overflow: hidden;">
              <img src="https://lh3.googleusercontent.com/d/${result.cover_file_id}=w800?authuser=0" alt=""
                  style="border-radius: 20px; width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;">
            </div>
        `;

    setValueToElement("event-name", result.name)
    setValueToElement("event-description", result.description)
    setValueToElement("event-image", cardFinalHTML)
    setValueToElement("swiper-image-event", swiperFinalHTML)
  } catch (error) {
    console.error('Failed to load team members:', error);
  }
}

async function fetchDataEvent(eventId) {
    const eventIdInt = parseInt(eventId)
    const url = `${API_URL}?api_key=${API_TOKEN}&route=event&eventId=${eventIdInt}`;
    return await httpGetPromises(url);
}

// === Create Image Card ===
function createImageCard(image, index) {
  const delay = 100 * (index + 1);
  const imageSrc = image
    ? `https://lh3.googleusercontent.com/d/${image}=w800?authuser=0`
    : `assets/img/team/team-${(index % 4) + 1}.jpg`;

  return `
    <div class="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="${delay}">
      <div class="team-member">
        <div class="member-img" style="height: 350px; overflow: hidden;">
          <img src="${imageSrc}" style="
                width: 100%;
                object-fit: cover;
                object-position: center;
                display: block;
            ">
        </div>
      </div>
    </div>
  `;
}

function createSliderCard(image){
  return `
  <div class="swiper-slide">
    <img src="https://lh3.googleusercontent.com/d/${image}=w800?authuser=0" alt="">
  </div>`
}

function getEventId(){
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get('eventId');
  return eventId
}


