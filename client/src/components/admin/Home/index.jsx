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
import { getToken } from "../../../utils/token";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const token = getToken();
  const navigate = useNavigate()

  useEffect(() => {
    if(token.role !== 'admin') {
      navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
  const data = {
    labels: ["Ngày 1", "Ngày 2", "Ngày 3", "Ngày 4", "Ngày 5"], 
    datasets: [
      {
        label: "Thu nhập",
        data: [100, 200, 150, 300, 250],
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
