// === Main Function ===
async function getMainImpactNumbers() {
  try {
    const data = await fetchDataMainImpact();

    updateHTMLforMainImpact(data)
  } catch (error) {
    console.error('Failed to load team members:', error);
  }
}

async function fetchDataMainImpact() {
    const url = `${API_URL}?api_key=${API_TOKEN}&route=main-impact`;
    return await httpGetPromises(url);
}


async function updateHTMLforMainImpact(data) {
    try {

        const result = data.data

        setValueToElement('totalFarmers', result.total_farmers);
        removeClassElement('totalFarmers', 'skeleton-placeholder')

        setValueToElement('totalImpactTalangin', result.total_talangin_impact.formatted);
        setValueToElement('totalImpactTalanginUnit', result.total_talangin_impact.unit);
        removeClassElement('totalImpactTalangin', 'skeleton-placeholder')

        setValueToElement('totalImpact', result.total_impact.formatted);
        setValueToElement('totalImpactUnit', result.total_impact.unit);
        removeClassElement('totalImpact', 'skeleton-placeholder')

        setValueToElement('totalCommodities', result.total_commodities);
        setValueToElement('totalArea', result.total_area);

    } catch (error) {
        console.error(error);
    }
}