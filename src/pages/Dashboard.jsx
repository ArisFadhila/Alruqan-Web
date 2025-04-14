import React from "react";
import { FaMosque } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <FaMosque size={64} color="#2e8b57" className="dashboard-icon" />
        <h2 className="dashboard-title">Selamat Datang</h2>
        <p className="dashboard-text">di Aplikasi Qur'an Web</p>
        <p className="dashboard-subtext">Temukan dan pelajari ayat suci Al-Qur'an dengan mudah.</p>
      </div>
    </div>
  );
};

export default Dashboard;
