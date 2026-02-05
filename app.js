let chart;

// Random integer helper
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("experiment").addEventListener("change", () => {
  const exp = document.getElementById("experiment").value;
  document.getElementById("custom-options").style.display = exp === "custom" ? "block" : "none";
});

document.getElementById("runBtn").addEventListener("click", () => {
  const exp = document.getElementById("experiment").value;
  const trials = parseInt(document.getElementById("trials").value);
  let results = [];

  if (exp === "coin") {
    results = Array.from({ length: trials }, () => rand(0, 1));
  }

  if (exp === "dice") {
    results = Array.from({ length: trials }, () => rand(1, 6));
  }

  if (exp === "roulette") {
    results = Array.from({ length: trials }, () => rand(0, 36));
  }

  if (exp === "custom") {
    const min = parseInt(document.getElementById("min").value);
    const max = parseInt(document.getElementById("max").value);
    results = Array.from({ length: trials }, () => rand(min, max));
  }

  // Frequency distribution
  const counts = {};
  results.forEach(v => counts[v] = (counts[v] || 0) + 1);

  const labels = Object.keys(counts);
  const data = Object.values(counts);

  // Destroy previous chart
  if (chart) chart.destroy();

  const ctx = document.getElementById("chart");

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Frequency",
        data,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: "#fff" } }
      },
      scales: {
        x: { ticks: { color: "#fff" } },
        y: { ticks: { color: "#fff" } }
      }
    }
  });
});
