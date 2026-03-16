import "./page.css";

export default function ManageUsers() {
  return (
    <div className="manage-users-container">
      {/* TITLE */}
      <div className="manage-title">
        <h1>Manage Users</h1>
        <p>12 registered users on the platform</p>
      </div>

      {/* STATS */}
      <div className="user-stats">
        <div className="user-stat-card">
          <h2>12</h2>
          <p>Total Users</p>
        </div>

        <div className="user-stat-card">
          <h2>5</h2>
          <p>Guests</p>
        </div>

        <div className="user-stat-card">
          <h2>6</h2>
          <p>Hosts</p>
        </div>

        <div className="user-stat-card">
          <h2>1</h2>
          <p>Admins</p>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="user-filters">
        <input
          className="search-input"
          placeholder="Search by name or email..."
        />

        <div className="filter-group">
          <span className="filter-label">Role:</span>

          <button className="filter-btn active">All</button>
          <button className="filter-btn">Guest</button>
          <button className="filter-btn">Host</button>
          <button className="filter-btn">Admin</button>
        </div>

        <div className="filter-group">
          <span className="filter-label">Status:</span>

          <button className="filter-btn active">All</button>
          <button className="filter-btn">Active</button>
          <button className="filter-btn">Blocked</button>
        </div>
      </div>

      {/* USER TABLE */}
      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>USER</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>JOINED</th>
              <th>ACTIVITY</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {/* USER ITEM */}

            <tr>
              <td className="user-cell">
                <div className="user-info">
                  <div className="avatar">AU</div>

                  <div>
                    <p className="user-name">Admin User</p>
                    <span className="user-id">ID #1</span>
                  </div>
                </div>
              </td>

              <td>admin@homestay.com</td>

              <td>
                <span className="role admin">Admin</span>
              </td>

              <td>2023-01-01</td>

              <td>Full access</td>

              <td>
                <span className="status active">Active</span>
              </td>

              <td>
                <button className="btn-block">Block</button>
              </td>
            </tr>

            <tr>
              <td className="user-cell">
                <div className="user-info">
                  <div className="avatar blue">MW</div>

                  <div>
                    <p className="user-name">Made Wijaya</p>
                    <span className="user-id">ID #2</span>
                  </div>
                </div>
              </td>

              <td>made@example.com</td>

              <td>
                <span className="role host">Host</span>
              </td>

              <td>2023-03-12</td>

              <td>3 props · 47 bookings</td>

              <td>
                <span className="status active">Active</span>
              </td>

              <td>
                <button className="btn-block">Block</button>
              </td>
            </tr>

            <tr>
              <td className="user-cell">
                <div className="user-info">
                  <div className="avatar green">AJ</div>

                  <div>
                    <p className="user-name">Alice Johnson</p>
                    <span className="user-id">ID #6</span>
                  </div>
                </div>
              </td>

              <td>alice@example.com</td>

              <td>
                <span className="role guest">Guest</span>
              </td>

              <td>2024-01-05</td>

              <td>5 bookings</td>

              <td>
                <span className="status active">Active</span>
              </td>

              <td>
                <button className="btn-block">Block</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="table-pagination">
          <p className="pagination-info">Showing 1 to 10 of 12 users</p>

          <div className="pagination-controls">
            <button className="page-btn">Previous</button>

            <button className="page-number active">1</button>
            <button className="page-number">2</button>

            <button className="page-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
