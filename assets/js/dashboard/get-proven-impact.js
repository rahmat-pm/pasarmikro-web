// === Main Function ===
async function getProvenImpactNumbers() {
  try {
    const data = await fetchDataProvenImpact();
    const result = data.data

    console.log(result)

    generateBarChart(result)
    generateCommodityCards(result)

  } catch (error) {
    console.error('Failed to load impact numbers:', error);
  }
}

async function fetchDataProvenImpact() {
    const url = `${API_URL}?api_key=${API_TOKEN}&route=proven-impact`;
    return await httpGetPromises(url);
}
