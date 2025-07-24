const accentColors = ['#38bdf8', '#60a5fa', '#a5b4fc', '#fca5a5', '#fcd34d'];

function createLineChart(ctx, thisYearData, lastYearData, labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]) {
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "This Year",
          data: thisYearData,
          borderColor: "#38bdf8",
          backgroundColor: "rgba(56,189,248,0.1)",
          tension: 0.4,
          fill: true,
          pointRadius: 4
        },
        {
          label: "Last Year",
          data: lastYearData,
          borderColor: "#f87171",
          backgroundColor: "rgba(248,113,113,0.1)",
          tension: 0.4,
          fill: true,
          pointRadius: 4
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: "Impact Comparison", font: { size: 16 } },
        legend: { position: 'bottom' }
      }
    }
  });
}

function createDoughnutChart(ctx, data, labels) {
  return new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: accentColors,
        borderRadius: 6
      }]
    },
    options: {
      plugins: {
        title: { display: true, text: "Impact by Commodity", font: { size: 16 } },
        legend: { position: "right" }
      }
    }
  });
}

function createBarChart(ctx, datasets, labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]) {
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        title: { display: true, text: "Impact by Month", font: { size: 16 } },
        legend: { position: "bottom" }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

function createHorizontalBarChart(ctx, data, labels) {
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Sales',
        data: data,
        backgroundColor: '#4bc0c0'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: {
        x: { beginAtZero: true }
      },
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Impact by Region' }
      }
    }
  });
}

function updateMonthlyImpactTable(comparisonData) {
    const labels = comparisonData.labels;
    const thisYear = comparisonData.thisYear;

    const table = document.getElementById("monthly-impact");

    // Clear existing rows except the header
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    for (let i = 0; i < labels.length; i++) {
      const row = table.insertRow();
      const cellMonth = row.insertCell(0);
      const cellImpact = row.insertCell(1);

      // Convert short month to full name (optional)
      const fullMonth = new Date(`${labels[i]} 1, 2024`).toLocaleString("id-ID", { month: "long" });

      cellMonth.textContent = fullMonth;
      cellImpact.textContent = currencyFormatter(thisYear[i]);
    }
  }