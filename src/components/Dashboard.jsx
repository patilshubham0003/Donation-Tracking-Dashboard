import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import data from "./dummydata.json"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
 
//   console.log([...data])
  const donations =[...data];


  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const numDonors = new Set(donations.map(d => d.donor)).size;

  const chartData = {
    labels: donations.map(d => d.donor),
    datasets: [
      {
        label: "Donation Amount ($)",
        data: donations.map(d => d.amount),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Donations by Donor" }
    }
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", padding: "30px" }}>
      <h1> Donation Tracking Dashboard</h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "50px", marginBottom: "30px" }}>
        <div>
          <h3>Total Donations Received</h3>
          <h2 style={{ color: "green" }}>${totalDonations.toLocaleString()}</h2>
        </div>
        <div>
          <h3>Number of Donors</h3>
          <h2 style={{ color: "blue" }}>{numDonors}</h2>
        </div>
      </div>

      <div style={{ width: "60%", margin: "0 auto" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
