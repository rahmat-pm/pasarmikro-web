// === Main Function ===
async function getAllTeamMembers() {
  try {
    const data = await fetchDataAllTeams();
    const sortedData = sortTeamData(data.data);

    const teamElement = document.getElementById('team-members');
    const htmlSections = [];

    const groupedByDivision = groupByDivision(sortedData);


    Object.keys(groupedByDivision).forEach((division) => {
    const header = generateDivisionHeader(division);
    const membersHTML = groupedByDivision[division]
        .map((member, index) => createTeamMemberCard(member, index))
        .join('');

    htmlSections.push(`
        <div class="row gy-4 text-center">
        ${header}
        ${membersHTML}
        </div>
    `);
    });

    const finalHTML = htmlSections.join('');
    teamElement.innerHTML = finalHTML;
  } catch (error) {
    console.error('Failed to load team members:', error);
  }
}

async function fetchDataAllTeams() {
    const url = `${API_URL}?api_key=${API_TOKEN}&route=teams`;
    return await httpGetPromises(url);
}

// === Sort Team Members ===
function sortTeamData(data) {
  return data.sort((a, b) => {
    if (a.division !== b.division) return a.division.localeCompare(b.division);
    return a.fullName.localeCompare(b.fullName);
  });
}

// === Group by Division ===
function groupByDivision(data) {
  return data.reduce((grouped, member) => {
    const key = member.division || 'Other';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(member);
    return grouped;
  }, {});
}

// === Generate Division Header ===
function generateDivisionHeader(division) {
  return `<h1 style=margin-top:90px; margin-botton: 30px;><b>${division}</b></h1>`;
}

// === Create Team Card ===
function createTeamMemberCard(member, index) {
  const delay = 100 * (index + 1);
  const imageSrc = member.imageId
    ? `https://lh3.googleusercontent.com/d/${member.imageId}=w800?authuser=0`
    : `assets/img/team/team-${(index % 4) + 1}.jpg`;

  return `
    <div class="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="${delay}">
      <div class="team-member">
        <div class="member-img">
          <img src="${imageSrc}" class="img-fluid" alt="${member.fullName}">
          <div class="social">
            <a href="${member.linkedIn}" target="_blank"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>
        <div class="member-info">
          <h4>${member.fullName}</h4>
          <span>${member.title}</span>
        </div>
      </div>
    </div>
  `;
}