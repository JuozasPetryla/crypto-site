import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import classes from "./CryptoChart.module.scss";

import Chart from "chart.js/auto";
import "chartjs-adapter-moment";

function CryptoChart(props) {
  const chartData = useSelector((state) => state.crypto.currentChartData);
  const chartDataFinal = {
    datasets: [
      {
        label: `${chartData.coin}/USD chart`,
        data: chartData.chartData,
        borderColor: "#ffa500",
        backgroundColor: "#cdcdcd",
        borderWidth: 2,
        fill: false,
        pointRadius: 1,
        maintainAspectRatio: true,
      },
    ],
  };
  const options = {
    responsive: true,
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#cdcdcd",
        },
        type: "time",
        time: {
          unit: `${props.timeUnit}`,
        },
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        ticks: {
          color: "#cdcdcd",
        },
        title: {
          display: true,
          text: "Price (USD)",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className={classes["chart-container"]}>
      <Line data={chartDataFinal} options={options} className={classes.chart} />
    </div>
  );
}

export default CryptoChart;
