const accentColors = ['#38bdf8', '#60a5fa', '#a5b4fc', '#fca5a5', '#fcd34d'];

// Line Chart
new Chart(document.getElementById("lineChart"), {
type: "line",
data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
    {
        label: "This Year",
        data: [120, 150, 180, 160, 200, 210],
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56,189,248,0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 4
    },
    {
        label: "Last Year",
        data: [100, 130, 160, 140, 170, 180],
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
    title: { display: true, text: "Sales Comparison", font: { size: 16 } },
    legend: { position: 'bottom' }
    }
}
});

// Doughnut Chart
new Chart(document.getElementById("doughnutChart"), {
type: "doughnut",
data: {
    labels: ["Corn", "Rice", "Coffee", "Palm Oil", "Cocoa"],
    datasets: [{
    data: [30, 25, 20, 15, 10],
    backgroundColor: accentColors,
    borderRadius: 6
    }]
},
options: {
    plugins: {
    title: { display: true, text: "Sales by Commodity", font: { size: 16 } },
    legend: { position: "right" }
    }
}
});

// Bar Chart
new Chart(document.getElementById("barChart"), {
type: "bar",
data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
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
    ]
},
options: {
    maintainAspectRatio: false,
    plugins: {
    title: { display: true, text: "Sales by Month", font: { size: 16 } },
    legend: { position: "bottom" }
    },
    responsive: true,
    scales: {
    y: { beginAtZero: true }
    }
}
});


new Chart(document.getElementById("salesRegion"), {
  type: 'bar',
  data: {
    labels: ['West Java', 'Central Java', 'East Java', 'Sumatra', 'Sulawesi'],
    datasets: [{
      label: 'Sales (in tons)',
      data: [130, 110, 95, 80, 60],
      backgroundColor: '#4bc0c0'
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Sales by Region'
      }
    },
    scales: {
      x: {
        beginAtZero: true
      }
    }
  }
});
