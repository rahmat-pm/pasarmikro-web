// === Main Function ===
async function getAllLifeAtData() {
  try {
    const data = await fetchDataAllLifeAt();

    const result = data.data

    const eventElement = document.getElementById('events');
    const htmlSections = [];


    result.forEach((event, index) => {
        const eventHTML = createEventCard(event, index)
        htmlSections.push(eventHTML)

    });

    const finalHTML = htmlSections.join('');
    const finalElement = `
            <div class="row gy-4 text-center">
            ${finalHTML}
            </div>
        `;
    eventElement.innerHTML = finalElement;
  } catch (error) {
    console.error('Failed to load team members:', error);
  }
}

async function fetchDataAllLifeAt() {
    const url = `${API_URL}?api_key=${API_TOKEN}&route=events`;
    return await httpGetPromises(url);
}



// === Create Team Card ===
function createEventCard(event, index) {
  const delay = 100 * (index + 1);
  const imageSrc = event.cover_file_id
    ? `https://lh3.googleusercontent.com/d/${event.cover_file_id}=w800?authuser=0`
    : `assets/img/team/team-${(index % 4) + 1}.jpg`;

  return `
    <div class="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="${delay}">
        <a href="life-at-pasarmikro.html?eventId=${event.id}" style="text-decoration: none; color: inherit; width: 100%;">
            <div class="team-member" style="height: 100%;">
            <div class="member-img" style="height: 350px; overflow: hidden;">
                <img src="${imageSrc}" alt="${event.name}" style="
                    width: 100%;
                    object-fit: cover;
                    object-position: center;
                    display: block;
                ">
            </div>
            <div class="member-info">
                <h4>${event.name}</h4>
            </div>
            </div>
        </a>
    </div>
  `;
}