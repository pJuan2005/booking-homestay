# Homestay Booking & Management Platform

A full-stack web application for booking and managing homestays.

Built with modern web technologies including Next.js, React.js, Node.js, Express.js and MySQL.

---

## Project Overview

This system allows:

- Guests to search and book homestays online
- Hosts to manage properties and reservations
- Administrators to manage users, properties and platform settings

The platform aims to simplify homestay operations while providing a convenient booking experience for travelers.

---

## Features

### Guest Features

- User Registration
- Login / Logout
- Search Homestays
- Filter by:
  - Location
  - Price
  - Guest Capacity
  - Stay Duration
- View Homestay Details
- Online Booking
- Booking History
- Payment Submission
- Review & Rating
- Real-time Chat Support
- Profile Management

---

### Host Features

- Host Dashboard
- Manage Homestays
- Create Homestay Listings
- Upload Property Images
- Manage Bookings
- Confirm / Reject Reservations
- Manage Quick Booking Links
- View Revenue Statistics
- Customer Communication

---

### Admin Features

- Admin Dashboard
- User Management
- Homestay Moderation
- Booking Monitoring
- System Configuration
- Platform Analytics
- Reports & Statistics

---

## Tech Stack

### Frontend

- Next.js
- React.js
- TypeScript
- TailwindCSS

### Backend

- Node.js
- Express.js

### Database

- MySQL

### Authentication

- JWT Authentication
- Role-Based Access Control

### Other Tools

- Git
- GitHub
- REST API

---

## System Roles

| Role | Description |
|--------|-------------|
| Guest | Search and book homestays |
| Host | Manage homestays and bookings |
| Admin | Manage entire platform |

---

## Main Modules

### Authentication Module

- Register
- Login
- Session Management
- Authorization

### Property Module

- Property Management
- Amenities
- Property Images
- Availability Tracking

### Booking Module

- Booking Creation
- Booking Confirmation
- Booking Cancellation
- Payment Verification

### Review Module

- Ratings
- Reviews
- Average Score Calculation

### Chat Module

- Guest ↔ Host Communication

### Administration Module

- User Management
- Property Approval
- Platform Settings
- Dashboard Analytics

---

## Database Design

Main Entities:

- Users
- Properties
- Bookings
- Reviews
- Amenities
- PropertyImages
- BookingConversations
- BookingMessages
- AppSettings

---

## Screenshots

### Home Page

![Home](./screenshots/home.png)

### Property Details

![Details](./screenshots/details.png)

### Booking System

![Booking](./screenshots/booking.png)

### Host Dashboard

![Host Dashboard](./screenshots/host-dashboard.png)

### Admin Dashboard

![Admin Dashboard](./screenshots/admin-dashboard.png)

---

## Installation

### Clone Repository

```bash
git clone https://github.com/pJuan2005/booking-homestay.git
```

### Install Frontend

```bash
cd client
npm install
npm run dev
```

### Install Backend

```bash
cd server
npm install
npm run dev
```

### Database

Configure:

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

---

## Architecture

```text
Frontend (Next.js)
        |
        v
 REST API (Express.js)
        |
        v
     MySQL
```

---

## Future Improvements

- Online Payment Gateway
- Google Maps Integration
- Email Notifications
- Mobile Application
- Recommendation System
- AI-powered Search

---

## Author

Pham Xuan Chuan

Software Engineering Student

ReactJS | NextJS | NodeJS | ExpressJS | TypeScript
