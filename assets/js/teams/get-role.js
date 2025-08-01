// === Main Function ===
async function getRoleData() {
  try {
    const roleId = getRoleId()
    const data = await fetchDataRole(roleId);

    const result = data.data

    display('application-section', 'block');
    setValueToElement("title-1", result.title)
    setValueToElement("title-2", result.title)
    setValueToElement("overview", result.overview)
    setValueToElement("responsibilities", result.responsibilities)
    setValueToElement("qualifications", result.qualifications)
    setValueToElement("other-requirements", result.other_requirements)
    setValueToElement("what-we-offer", result.what_we_offer)
  } catch (error) {
    console.error('Failed to load role:', error);
  }
}

async function fetchDataRole(roleId) {
    const url = `${API_URL}?api_key=${API_TOKEN}&route=role&roleId=${roleId}`;
    return await httpGetPromises(url);
}

function getRoleId(){
  const params = new URLSearchParams(window.location.search);
  const roleId = params.get('roleId');
  return roleId
}


