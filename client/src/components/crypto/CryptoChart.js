import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";

import Chart from "chart.js/auto";
import "chartjs-adapter-moment";

function CryptoChart() {
  const chartRef = useRef(null);
  const chartData = useSelector((state) => state.crypto.currentChartData);
  const chartDataFinal = {
    labels: chartData.coinName, // Array of labels for X-axis
    datasets: [
      {
        label: "Line Chart",
        data: chartData.chartData, // Array of data points for Y-axis
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };
  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price",
        },
      },
    },
  };
  // useEffect(() => {
  //   if (chartRef.current && chartData) {
  //     const ctx = chartRef.current.getContext("2d");
  //     const existingChart = chartRef.current.chart;

  //     console.log(chartRef);

  //     if (existingChart instanceof Chart) {
  //       existingChart.destroy();
  //     }
  //     new Chart(ctx, {
  //       type: "line",
  //       data: {
  //         datasets: [
  //           {
  //             label: `${chartData.coinName} chart`,
  //             data: chartData.chartData.map((item) => ({
  //               t: new Date(item[0]),
  //               o: item[1],
  //               h: item[2],
  //               l: item[3],
  //               c: item[4],
  //             })),
  //           },
  //         ],
  //       },
  //       options: {
  //         responsive: true,
  //         scales: {
  //           x: {
  //             type: "time",
  //             time: {
  //               unit: "day",
  //             },
  //             title: {
  //               display: true,
  //               text: "Date",
  //             },
  //           },
  //           y: {
  //             title: {
  //               display: true,
  //               text: "Price",
  //             },
  //           },
  //         },
  //       },
  //     });
  //   }
  // }, [chartData]);

  return (
    <div>
      <Line data={chartDataFinal} options={options} />
    </div>
  );
}

export default CryptoChart;
