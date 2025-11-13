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

import data from "./dummydata.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const donations = [...data];

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
    maintainAspectRatio: false, // important for responsiveness
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Donations by Donor" }
    },
    scales: {
      x: { 
        ticks: { autoSkip: false, maxRotation: 45, minRotation: 0 } 
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{paddingTop:"1.5rem"}}>Donation Tracking Dashboard</h1>

      <div 
        style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          justifyContent: "center", 
          gap: "50px", 
          marginBottom: "30px" 
        }}
      >
        <div style={{ minWidth: "200px", flex: "1 1 250px" }}>
          <h3>Total Donations Received</h3>
          <h2 style={{ color: "green" }}>${totalDonations.toLocaleString()}</h2>
        </div>
        <div style={{ minWidth: "200px", flex: "1 1 250px" }}>
          <h3>Number of Donors</h3>
          <h2 style={{ color: "blue" }}>{numDonors}</h2>
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: "800px", height: "400px", margin: "0 auto" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
