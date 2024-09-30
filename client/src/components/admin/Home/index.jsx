import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HomeAdmin = () => {
  const data = {
    labels: ["Ngày 1", "Ngày 2", "Ngày 3", "Ngày 4", "Ngày 5"], // Ngày
    datasets: [
      {
        label: "Thu nhập",
        data: [100, 200, 150, 300, 250], // Giá trị thu nhập tương ứng
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Biểu đồ thu nhập theo ngày",
      },
    },
  };

  return (
    <div className="p-12 mt-20">
      <Line data={data} options={options} />
    </div>
  );
};

export default HomeAdmin;
