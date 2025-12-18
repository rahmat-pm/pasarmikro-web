// === Main Function ===
async function getAllOpenRolesData() {
  try {
    const data = await fetchDataOpenRoles();

    const result = data.data

    const rolesElement = document.getElementById('open-roles');
    const htmlSections = [];

    result.forEach((role, index) => {
        const roleHTML = createRoleCard(role, index)
        htmlSections.push(roleHTML)

    });

    const finalHTML = htmlSections.join('');

    if(result.length == 0){
      rolesElement.innerHTML = "<center><p>We’re not hiring at the moment. Stay tuned for upcoming opportunities!</p></center>";
    } else {
      rolesElement.innerHTML = finalHTML;
    }

    
  } catch (error) {
    console.error('Failed to load open roles:', error);
  }
}

async function fetchDataOpenRoles() {
    const url = `${API_URL}?api_key=${API_TOKEN}&route=roles`;
    return await httpGetPromises(url);
}



// === Create Team Card ===
function createRoleCard(role, index) {
  console.log(role)

  return `
    <div class="col-lg-4">
          <div class="card h-100 shadow rounded border-0 p-4 d-flex flex-column">
            <div>
              <h5><b>${role.title}</b></h5>
              <p class="text-muted small">${role.division} · ${role.location} · ${role.type}</p>
              <p>${role.headline}</p>
            </div>
            <div class="mt-auto">
              <a href="career-details.html?roleId=${role.id}" class="btn btn-warning btn-sm w-100">Apply Now</a>
            </div>
          </div>
        </div>
    </div>
  `;
}