import React, { useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line,
    getDatasetAtEvent, } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.random(0) * 10),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => Math.random(0) * 10),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const LineChart = () => {
  const [dataset, setDataset] = useState([
    {
      label: "Dataset 1",
      data: labels.map(() => Math.random(0) * 10),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ]);

  const handleAddClick = () => {
    setDataset((prev) => [
      ...prev,
      {
        label: `Dataset ${dataset.length + 1}`,
        data: labels.map(() => Math.random(0) * 10),
        borderColor: `rgb(${Math.random(0) * 255}, ${Math.random(0) * 255}, ${
          Math.random(0) * 255
        })`,
        backgroundColor: `rgba(${Math.random(0) * 255}, ${
          Math.random(0) * 255
        }, ${Math.random(0) * 255}, 0.5)`,
      },
    ]);
  };

  const handleRemoveClick = () => {
    const newArr = dataset.slice(0, dataset.length - 1);
    setDataset(newArr);
  };

  const printDatasetAtEvent = (dataset) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;

    console.log(data.datasets[datasetIndex].data);
  };

  const chartRef = useRef(null);

  const onClick = (event) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    printDatasetAtEvent(getDatasetAtEvent(chart, event));
  };

  const data = {
    labels,
    datasets: dataset,
  };

  return (
    <>
      <button onClick={handleAddClick}>Add data</button>
      <button onClick={handleRemoveClick}>Remove data</button>
      <Line
        ref={chartRef}
        options={options}
        data={data}
        onClick={onClick}
      />
    </>
  );
};
