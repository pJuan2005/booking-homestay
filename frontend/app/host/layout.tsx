"use client";

import "./layout.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  const getTitle = () => {
    if (pathname.startsWith("/host/dashboard")) return "Dashboard";
    if (pathname.startsWith("/host/my-properties")) return "My Properties";
    if (pathname.startsWith("/host/add-property")) return "Add New Property";
    if (pathname.startsWith("/host/manage-booking")) return "Bookings";
    if (pathname.startsWith("/host/profile")) return "Profile";
    if (pathname.startsWith("/host/edit-property")) return "Edit Property";
    return "Host Panel";
  };

  return (
    <div className="host-layout">
      {/* SIDEBAR */}

      <aside className="sidebar">
        <div>
          {/* LOGO */}

          <Link href="/" className="logo">
            <div className="logo-icon">
              <Image src="/img/icon-home.svg" alt="" width={14} height={14} />
            </div>
            <span>HomeStay</span>
          </Link>

          {/* USER */}

          <div className="host-user">
            <div className="avatar">MW</div>

            <div>
              <p className="host-name">Made Wijaya</p>
              <span className="host-role">Host Account</span>
            </div>
          </div>

          {/* MENU */}

          <p className="menu-title">MAIN MENU</p>

          <nav className="menu">
            <Link
              href="/host/dashboard"
              className={`menu-item ${
                isActive("/host/dashboard") ? "active" : ""
              }`}
            >
              Dashboard
            </Link>

            <Link
              href="/host/my-properties"
              className={`menu-item ${
                isActive("/host/my-properties") ||
                isActive("/host/edit-property")
                  ? "active"
                  : ""
              }`}
            >
              My Properties
            </Link>

            <Link
              href="/host/add-property"
              className={`menu-item ${
                isActive("/host/add-property") ? "active" : ""
              }`}
            >
              + Add New Property
            </Link>

            <Link
              href="/host/manage-booking"
              className={`menu-item ${
                isActive("/host/manage-booking") ? "active" : ""
              }`}
            >
              Bookings
            </Link>

            <Link
              href="/host/profile"
              className={`menu-item ${
                isActive("/host/profile") ? "active" : ""
              }`}
            >
              Profile
            </Link>
          </nav>
        </div>

        {/* BOTTOM */}

        <div className="sidebar-bottom">
          <Link href="/">← Back to Website</Link>

          <button className="logout">Logout</button>
        </div>
      </aside>

      {/* MAIN */}

      <div className="host-main">
        {/* HEADER */}

        <header className="host-header">
          <div>
            <p className="panel-title">Host Panel</p>
            <h2>{getTitle()}</h2>
          </div>

          <div className="header-right">
            <div className="notification">🔔</div>
            <div className="avatar small">MW</div>
          </div>
        </header>

        {/* CONTENT */}

        <main className="host-content">{children}</main>
      </div>
    </div>
  );
}
