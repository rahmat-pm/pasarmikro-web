// === Main Function ===
async function getRoleData() {
  try {
    const roleId = getRoleId()
    const data = await fetchDataRole(roleId);

    const result = data.data

    setValueToElement("overview", result.overview)
    setValueToElement("responsibilities", result.responsibilities)
    setValueToElement("qualifications", result.qualifications)
    setValueToElement("other-requirements", result.other_requirements)
    setValueToElement("what-we-offer", result.what_we_offer)
  } catch (error) {
    console.error('Failed to load team members:', error);
  }
}

async function fetchDataRole(roleId) {
    const url = `${API_URL}?api_key=${API_TOKEN}&route=role&roleId=${roleId}`;
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

function getRoleId(){
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get('roleId');
  return eventId
}


