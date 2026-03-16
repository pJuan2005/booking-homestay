"use client";

import "./page.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
);

export default function AdminDashboard() {
  /* ================= REVENUE CHART ================= */

  const revenueData = {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
    datasets: [
      {
        label: "Revenue",
        data: [13000, 16000, 19000, 14000, 23000, 20000, 26000],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.15)",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: {
          color: "#f1f5f9",
        },
      },
      y: {
        grid: {
          color: "#f1f5f9",
        },
        ticks: {
          callback: (value: any) => "$" + value / 1000 + "k",
        },
      },
    },
  };

  /* ================= BOOKING CHART ================= */

  const bookingData = {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
    datasets: [
      {
        data: [28, 35, 42, 31, 50, 45, 55],
        backgroundColor: "#2563eb",
        borderRadius: 6,
      },
    ],
  };

  const bookingOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { color: "#f1f5f9" },
      },
    },
  };

  return (
    <div className="dashboard-container">
      {/* TITLE */}
      <div className="dashboard-title">
        <h1>Admin Dashboard</h1>
        <p>Platform overview and key metrics</p>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stats-card">
          <div>
            <p className="stats-label">Total Users</p>
            <h2>12</h2>
            <span className="stats-desc">5 guests</span>
          </div>
          <div className="stats-icon blue">👥</div>
        </div>

        <div className="stats-card">
          <div>
            <p className="stats-label">Total Hosts</p>
            <h2>6</h2>
            <span className="stats-desc">1 pending approval</span>
          </div>
          <div className="stats-icon purple">🏠</div>
        </div>

        <div className="stats-card">
          <div>
            <p className="stats-label">Properties</p>
            <h2>9</h2>
            <span className="stats-desc">7 approved</span>
          </div>
          <div className="stats-icon green">📋</div>
        </div>

        <div className="stats-card">
          <div>
            <p className="stats-label">Revenue</p>
            <h2>$4,442</h2>
            <span className="stats-desc">From confirmed bookings</span>
          </div>
          <div className="stats-icon yellow">$</div>
        </div>
      </div>

      {/* CHART + SUMMARY */}
      <div className="dashboard-middle">
        {/* REVENUE TREND */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3>Revenue Trend</h3>
              <p>Monthly revenue overview</p>
            </div>

            <span className="trend-badge">+24% this month</span>
          </div>

          <div className="chart-container">
            <Line data={revenueData} options={revenueOptions} />
          </div>
        </div>

        {/* PLATFORM SUMMARY */}
        <div className="summary-card">
          <h3>Platform Summary</h3>

          <div className="summary-item">
            <span>Total Bookings</span>
            <strong>8</strong>
          </div>

          <div className="summary-item">
            <span>Confirmed</span>
            <strong>4</strong>
          </div>

          <div className="summary-item">
            <span>Pending</span>
            <strong>3</strong>
          </div>

          <div className="summary-item">
            <span>Active Users</span>
            <strong>10</strong>
          </div>

          <div className="summary-item">
            <span>Pending Approvals</span>
            <strong>1</strong>
          </div>

          <button className="summary-btn">Review Pending Approvals</button>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="dashboard-bottom">
        {/* BOOKINGS CHART */}
        <div className="booking-chart">
          <h3>Monthly Bookings</h3>

          <div className="chart-container">
            <Bar data={bookingData} options={bookingOptions} />
          </div>
        </div>

        {/* RECENT BOOKINGS */}
        <div className="recent-bookings">
          <div className="recent-header">
            <h3>Recent Bookings</h3>
            <a>View All</a>
          </div>

          <div className="booking-item">
            <div className="booking-user">
              <div className="avatar">AJ</div>
              <div>
                <p>Alice Johnson</p>
                <span>2025-03-15 → 2025-03-20</span>
              </div>
            </div>

            <div className="booking-right">
              <strong>$925</strong>
              <span className="status confirmed">Confirmed</span>
            </div>
          </div>

          <div className="booking-item">
            <div className="booking-user">
              <div className="avatar">BW</div>
              <div>
                <p>Bob Williams</p>
                <span>2025-04-01 → 2025-04-05</span>
              </div>
            </div>

            <div className="booking-right">
              <strong>$880</strong>
              <span className="status pending">Pending</span>
            </div>
          </div>

          <div className="booking-item">
            <div className="booking-user">
              <div className="avatar">CD</div>
              <div>
                <p>Carol Davis</p>
                <span>2025-02-10 → 2025-02-14</span>
              </div>
            </div>

            <div className="booking-right">
              <strong>$520</strong>
              <span className="status cancelled">Cancelled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
