// === Main Function ===
async function getRoleData() {
  try {
    const roleId = getRoleId()
    let result = null

    const cachedRoles = getFromCache('career_roles')
    if (cachedRoles) {
      result = cachedRoles.find(r => r.id === roleId)
    }

    if (!result) {
      const data = await fetchDataRole(roleId);
      if (!data.success) {
        window.location.href = "../404"
        return
      }
      result = data.data
    }

    display('application-section', 'block');
    setValueToElement("title-1", result.title)
    setValueToElement("title-2", result.title)
    setValueToElement("role-meta", `${result.division} · ${result.location} · ${result.type}`)
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


