function generateBarChart(commodities){
  const ctx = document.getElementById('topCommoditiesChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: commodities.map(c => c.name),
        datasets: [{
          label: 'GMV (Rp)',
          data: commodities.map(c => c.gmv),
          backgroundColor: '#006386',
          borderRadius: 8,
          barThickness: 40,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => 'Rp ' + ctx.raw.toLocaleString('id-ID')
            }
          }
        },
        scales: {
          x: {
            ticks: {
              font: { weight: 'bold' },
              color: '#444'
            },
            grid: { display: false }
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => 'Rp ' + value.toLocaleString('id-ID'),
              color: '#666'
            },
            grid: { borderDash: [5, 5], color: '#ddd' }
          }
        }
      }
    });
}

function generateCommodityCards(commodities){
  const container = document.getElementById('commodities-cards');
    commodities.forEach((c, index) => {
      const col = document.createElement('div');
      col.className = 'col-md-4';

      col.innerHTML = `
        <div class="card h-100 border-0 shadow-sm rounded-4 text-center py-4 px-3">
          <div class="d-flex justify-content-center align-items-center" style="height: 100px;">
            <img src="${c.image}" alt="${c.name}" 
                class="mb-3 rounded-4" 
                style="max-height: 100%; max-width: 100%; height: auto; width: auto;">
          </div>
          <h5 class="">${c.name}</h5>
          <p class="text-muted mb-1">Tonnage: <strong>${c.tonnage_formatted}</strong></p>
          <p class="text-muted">Impact: <strong>Rp. ${c.gmv_formatted.formatted}</strong> ${c.gmv_formatted.unit}</p>
        </div>
      `;
      container.appendChild(col);
    });
}