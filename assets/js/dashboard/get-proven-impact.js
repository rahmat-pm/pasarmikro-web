// === Main Function ===
async function getProvenImpactNumbers() {
  try {
    const data = await fetchDataProvenImpact();

    updateHTMLforProvenImpact(data)
  } catch (error) {
    console.error('Failed to load team members:', error);
  }
}

async function fetchDataProvenImpact() {
    const url = `${API_URL}?api_key=${API_TOKEN}&route=proven-impact`;
    return await httpGetPromises(url);
}


async function updateHTMLforProvenImpact(data) {
    try {

        const result = data.data
        const comparisonData = data.data.comparison.data
        const commodityData = data.data.commodity.data
        const regionData = data.data.region.data

        createLineChart(document.getElementById("lineChart"), comparisonData.lastYear, comparisonData.thisYear, comparisonData.labels);
        createDoughnutChart(document.getElementById("doughnutChart"), commodityData.commodityData, commodityData.labels);
        createHorizontalBarChart(document.getElementById("impactRegion"), regionData.regionData, regionData.labels);
        updateMonthlyImpactTable(comparisonData);

        createBarChart(document.getElementById("barChart"), [
        {
          label: "Corn",
          data: [20, 25, 30, 22, 24, 28],
          backgroundColor: accentColors[0],
          borderRadius: 5
        },
        {
          label: "Rice",
          data: [18, 22, 28, 20, 21, 25],
          backgroundColor: accentColors[1],
          borderRadius: 5
        },
        {
          label: "Coffee",
          data: [12, 18, 22, 17, 19, 21],
          backgroundColor: accentColors[2],
          borderRadius: 5
        }
      ]);

      document.getElementById("loader").style.display = "none";

    } catch (error) {
        console.error(error);
    }
}