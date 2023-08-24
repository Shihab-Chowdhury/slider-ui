const ctx = document.getElementById("barGraph").getContext("2d");
const barGraph = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Input Values",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const addSliderButton = document.getElementById("addSliderButton");
const inputBox = document.getElementById("inputBox");
const slidersContainer = document.getElementById("sliders");
const inputValues = [];

addSliderButton.addEventListener("click", () => {
  const inputName = document.getElementById("inputName").value;
  if (inputName.trim() !== "") {
    const sliderElement = document.createElement("div");
    sliderElement.innerHTML = `
      <div>
        <label for="inputValue${inputValues.length}">${inputName}:</label>
        <input type="range" id="inputValue${inputValues.length}" min="0" max="100" step="1" value="0">
      </div>
    `;
    slidersContainer.appendChild(sliderElement);

    const inputSlider = sliderElement.querySelector(
      `#inputValue${inputValues.length}`
    );
    inputSlider.addEventListener("input", updateGraph);
    inputValues.push(parseFloat(inputSlider.value));

    updateGraph();
  }
});

function updateGraph() {
  const inputLabels = Array.from(
    document.querySelectorAll("#sliders label")
  ).map((label) => label.textContent.slice(0, -1));
  barGraph.data.labels = inputLabels;
  for (let i = 0; i < inputValues.length; i++) {
    inputValues[i] = parseFloat(
      document.getElementById(`inputValue${i}`).value
    );
  }
  barGraph.data.datasets[0].data = inputValues;
  barGraph.data.datasets[0].backgroundColor = inputLabels.map(
    (label) =>
      `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 0.2)`
  );
  barGraph.data.datasets[0].borderColor = inputLabels.map(
    (label) =>
      `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 1)`
  );
  barGraph.update();
}

const pieCtx = document.getElementById("pieChart").getContext("2d");
const pieChart = new Chart(pieCtx, {
  type: "pie",
  data: {
    labels: ["Total Asset", "Total Investment"],
    datasets: [
      {
        label: "Asset vs Investment",
        data: [0, 0],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(192, 75, 75, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(192, 75, 75, 1)"],
        borderWidth: 1,
      },
    ],
  },
});

const investmentBox = document.getElementById("investmentBox");
const calculateButton = document.getElementById("calculateButton");

calculateButton.addEventListener("click", () => {
  const totalAsset =
    parseFloat(document.getElementById("totalAsset").value) || 0;
  const totalInvestment =
    parseFloat(document.getElementById("totalInvestment").value) || 0;
  pieChart.data.datasets[0].data = [totalAsset, totalInvestment];
  pieChart.update();
});
