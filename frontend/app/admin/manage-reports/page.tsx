"use client";

import "./page.css";
import { useEffect } from "react";
import Chart from "chart.js/auto";

export default function Reports() {
  const hosts = [
    {
      name: "Made Wijaya",
      stats: "3 properties · 47 bookings",
      revenue: "$18,420",
    },
    {
      name: "James Rodriguez",
      stats: "2 properties · 61 bookings",
      revenue: "$26,800",
    },
    {
      name: "Amélie Dupont",
      stats: "1 property · 34 bookings",
      revenue: "$14,280",
    },
    {
      name: "Erik Hansen",
      stats: "1 property · 19 bookings",
      revenue: "$9,680",
    },
    {
      name: "Sarah Connor",
      stats: "1 property · 28 bookings",
      revenue: "$8,960",
    },
  ];

  const revenueTable = [
    {
      month: "Aug 2025",
      revenue: "$12,400",
      bookings: 28,
      avg: "$443",
      growth: "-",
    },
    {
      month: "Sep 2025",
      revenue: "$15,800",
      bookings: 34,
      avg: "$465",
      growth: "+27%",
    },
    {
      month: "Oct 2025",
      revenue: "$18,200",
      bookings: 41,
      avg: "$444",
      growth: "+15%",
    },
    {
      month: "Nov 2025",
      revenue: "$14,600",
      bookings: 31,
      avg: "$471",
      growth: "-20%",
    },
    {
      month: "Dec 2025",
      revenue: "$22,400",
      bookings: 52,
      avg: "$431",
      growth: "+53%",
    },
    {
      month: "Jan 2025",
      revenue: "$19,800",
      bookings: 46,
      avg: "$430",
      growth: "-12%",
    },
    {
      month: "Feb 2025",
      revenue: "$24,600",
      bookings: 58,
      avg: "$424",
      growth: "+24%",
    },
  ];

  useEffect(() => {
    const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];

    const destroyChart = (id: string) => {
      const chart = Chart.getChart(id);
      if (chart) chart.destroy();
    };

    destroyChart("revenueChart");
    destroyChart("bookingStatusChart");
    destroyChart("propertyTypeChart");
    destroyChart("monthlyBookingChart");

    /* REVENUE vs BOOKINGS */

    new Chart(document.getElementById("revenueChart") as HTMLCanvasElement, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "Revenue",
            data: [12400, 15800, 18200, 14600, 22400, 19800, 24600],
            borderColor: "#2563eb",
            backgroundColor: "rgba(37,99,235,0.1)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "Bookings",
            data: [28, 34, 41, 31, 52, 46, 58],
            borderColor: "#16a34a",
            backgroundColor: "rgba(22,163,74,0.1)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
        },
      },
    });

    /* BOOKING STATUS */

    new Chart(
      document.getElementById("bookingStatusChart") as HTMLCanvasElement,
      {
        type: "doughnut",
        data: {
          labels: ["Confirmed", "Pending", "Cancelled"],
          datasets: [
            {
              data: [4, 3, 1],
              backgroundColor: ["#16a34a", "#f59e0b", "#dc2626"],
            },
          ],
        },
        options: {
          plugins: {
            legend: { position: "bottom" },
          },
        },
      },
    );

    /* PROPERTY TYPES */

    new Chart(
      document.getElementById("propertyTypeChart") as HTMLCanvasElement,
      {
        type: "pie",
        data: {
          labels: ["Villa", "Apartment", "Cabin", "Cottage", "Others"],
          datasets: [
            {
              data: [3, 2, 1, 1, 2],
              backgroundColor: [
                "#2563eb",
                "#16a34a",
                "#f59e0b",
                "#8b5cf6",
                "#ef4444",
              ],
            },
          ],
        },
        options: {
          plugins: {
            legend: { position: "bottom" },
          },
        },
      },
    );

    /* MONTHLY BOOKINGS */

    new Chart(
      document.getElementById("monthlyBookingChart") as HTMLCanvasElement,
      {
        type: "bar",
        data: {
          labels: months,
          datasets: [
            {
              label: "Bookings",
              data: [28, 34, 41, 31, 52, 46, 58],
              backgroundColor: "#2563eb",
            },
          ],
        },
        options: {
          plugins: {
            legend: { display: false },
          },
        },
      },
    );
  }, []);

  return (
    <div className="reports-container">
      {/* HEADER */}

      <div className="reports-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>Platform performance insights</p>
        </div>

        <button className="export-btn">Export Report</button>
      </div>

      {/* STATS */}

      <div className="reports-stats">
        <div className="stat-card">
          <p>Total Revenue</p>
          <h2>$4,442</h2>
          <span className="green">+24% vs last month</span>
        </div>

        <div className="stat-card">
          <p>Total Bookings</p>
          <h2>8</h2>
          <span className="green">+12 this month</span>
        </div>

        <div className="stat-card">
          <p>Avg. Booking Value</p>
          <h2>$111</h2>
          <span className="green">+18 vs last month</span>
        </div>

        <div className="stat-card">
          <p>Active Hosts</p>
          <h2>6</h2>
          <span className="green">+2 new this month</span>
        </div>
      </div>

      {/* CHART AREA */}

      <div className="reports-grid">
        <div className="card large">
          <h3>Revenue vs. Bookings</h3>
          <p>Last 7 months comparison</p>
          <canvas id="revenueChart"></canvas>
        </div>

        <div className="right-charts">
          <div className="card">
            <h3>Booking Status</h3>
            <canvas id="bookingStatusChart"></canvas>
          </div>

          <div className="card">
            <h3>Property Types</h3>
            <canvas id="propertyTypeChart"></canvas>
          </div>
        </div>
      </div>

      {/* LOWER GRID */}

      <div className="reports-grid">
        <div className="card">
          <h3>Monthly Bookings Trend</h3>
          <canvas id="monthlyBookingChart"></canvas>
        </div>

        <div className="card">
          <h3>Top Performing Hosts</h3>

          <div className="host-list">
            {hosts.map((host, index) => (
              <div key={index} className="host-item">
                <div className="host-rank">{index + 1}</div>

                <div>
                  <p className="host-name">{host.name}</p>
                  <span>{host.stats}</span>
                </div>

                <strong className="host-revenue">{host.revenue}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABLE */}

      <div className="card">
        <h3>Monthly Revenue Breakdown</h3>

        <table>
          <thead>
            <tr>
              <th>MONTH</th>
              <th>REVENUE</th>
              <th>BOOKINGS</th>
              <th>AVG. PER BOOKING</th>
              <th>GROWTH</th>
            </tr>
          </thead>

          <tbody>
            {revenueTable.map((row, i) => (
              <tr key={i}>
                <td>{row.month}</td>
                <td>{row.revenue}</td>
                <td>{row.bookings}</td>
                <td>{row.avg}</td>

                <td
                  className={
                    row.growth.includes("+")
                      ? "growth up"
                      : row.growth.includes("-")
                        ? "growth down"
                        : "growth"
                  }
                >
                  {row.growth}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
