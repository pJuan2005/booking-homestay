"use client";

import "./layout.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}

      <aside className="admin-sidebar">
        <div>
          <div className="logo">
            <div className="logo-icon">
              <Image src="/img/icon-home.svg" alt="" width={14} height={14} />
            </div>
            <p className="logo-name">HomeStay</p>
          </div>

          <div className="admin-user">
            <div className="avatar">A</div>

            <div>
              <p className="admin-name">Admin User</p>
              <p className="admin-role">Super Administrator</p>
            </div>
          </div>

          <p className="menu-title">MAIN NAVIGATION</p>

          <ul className="menu-list">
            <Link href="/admin/dashboard">
              <li
                className={`menu-item ${isActive("/admin/dashboard") ? "active" : ""}`}
              >
                Dashboard
              </li>
            </Link>

            <Link href="/admin/user">
              <li
                className={`menu-item ${isActive("/admin/user") ? "active" : ""}`}
              >
                Manage Users
              </li>
            </Link>

            <Link href="/admin/properties-manage">
              <li
                className={`menu-item ${isActive("/admin/properties-manage") ? "active" : ""}`}
              >
                Manage Properties
              </li>
            </Link>

            <Link href="/admin/property-approvals">
              <li
                className={`menu-item ${isActive("/admin/property-approvals") ? "active" : ""}`}
              >
                Property Approvals
              </li>
            </Link>

            <Link href="/admin/manage-booking">
              <li
                className={`menu-item ${isActive("/admin/manage-booking") ? "active" : ""}`}
              >
                Manage Bookings
              </li>
            </Link>

            <Link href="/admin/manage-reports">
              <li
                className={`menu-item ${isActive("/admin/manage-reports") ? "active" : ""}`}
              >
                Reports
              </li>
            </Link>
          </ul>
        </div>

        <div className="sidebar-bottom">
          <p>Go to Website</p>
          <p className="logout">Logout</p>
        </div>
      </aside>

      {/* MAIN AREA */}

      <div className="admin-main">
        {/* HEADER */}

        <header className="admin-header">
          <div>
            <p className="admin-panel">Admin Panel</p>

            {/* tự động hiển thị tên page */}

            <h2>
              {pathname.includes("dashboard") && "Dashboard"}
              {pathname.includes("user") && "Manage Users"}
              {pathname.includes("properties-manage") && "Manage Properties"}
              {pathname.includes("property-approvals") && "Property Approvals"}
              {pathname.includes("manage-booking") && "Manage Bookings"}
              {pathname.includes("manage-reports") && "Reports"}
            </h2>
          </div>

          <div className="header-right">
            <div className="notification">🔔</div>
            <div className="admin-badge">Admin</div>
          </div>
        </header>

        {/* PAGE CONTENT */}

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
