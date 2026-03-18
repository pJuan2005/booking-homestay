// ============================================================
// TARGET: frontend/lib/mockData.ts
// Shared mock data — import this in any page or component
// ============================================================

export interface Property {
  id: number;
  title: string;
  location: string;
  city: string;
  country: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  type: string;
  description: string;
  amenities: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  status: "Pending" | "Approved" | "Rejected";
  hostId: number;
  hostName: string;
  featured: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "Guest" | "Host" | "Admin";
  status: "Active" | "Blocked";
  joined: string;
  bookings?: number;
  properties?: number;
}

export interface Booking {
  id: number;
  propertyId: number;
  propertyTitle: string;
  propertyLocation: string;
  propertyImage: string;
  guestId: number;
  guestName: string;
  guestEmail: string;
  hostId: number;
  hostName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalPrice: number;
  status: "Pending" | "Confirmed" | "Cancelled";
}

export interface Review {
  id: number;
  bookingId: number;
  propertyId: number;
  guestId: number;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
}

// ── Images (Using high quality unsplash images for premium feel) ──────────────────
const IMG_VILLA_POOL    = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80"; // Villa
const IMG_BEDROOM       = "https://images.unsplash.com/photo-1616594197247-b6956620245c?w=800&q=80"; // Bedroom
const IMG_APARTMENT     = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"; // Apartment
const IMG_CABIN         = "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80"; // Cabin
const IMG_LUXURY        = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"; // Luxury
const IMG_SCANDINAVIAN  = "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80"; // Scandinavian
const IMG_NY            = "https://images.unsplash.com/photo-1496871328941-181939ec79ca?w=800&q=80"; // NY
const IMG_BALI          = "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80"; // Bali
const IMG_PARIS         = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80"; // Paris
const IMG_TOKYO         = "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80"; // Tokyo

// ── Properties ────────────────────────────────────────────────────────────────
export const properties: Property[] = [
  {
    id: 1,
    title: "Tropical Villa with Private Pool",
    location: "Seminyak, Bali, Indonesia",
    city: "Bali",
    country: "Indonesia",
    price: 185,
    rating: 4.9,
    reviews: 142,
    image: IMG_VILLA_POOL,
    images: [IMG_VILLA_POOL, IMG_BEDROOM, IMG_SCANDINAVIAN],
    type: "Villa",
    description:
      "Escape to this stunning tropical villa nestled in the heart of Seminyak. Featuring lush gardens, a private pool, open-air living spaces, and exquisite Balinese décor, this retreat offers total privacy and serenity. The villa is located just 10 minutes from world-class beaches, restaurants, and nightlife.",
    amenities: ["WiFi", "Private Pool", "Full Kitchen", "Air Conditioning", "Parking", "Beach Access", "BBQ Grill"],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    status: "Approved",
    hostId: 2,
    hostName: "Made Wijaya",
    featured: true,
  },
  {
    id: 2,
    title: "Cozy Mountain Cabin Retreat",
    location: "Aspen, Colorado, USA",
    city: "Aspen",
    country: "USA",
    price: 130,
    rating: 4.8,
    reviews: 89,
    image: IMG_CABIN,
    images: [IMG_CABIN, IMG_BEDROOM, IMG_SCANDINAVIAN],
    type: "Cabin",
    description:
      "A warm and inviting mountain cabin set among towering pines with breathtaking views. Wake up to the sound of nature, enjoy evenings by the fire, and explore the Rockies just steps away.",
    amenities: ["WiFi", "Fireplace", "Full Kitchen", "Heating", "Parking", "Mountain View", "Hot Tub"],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    status: "Approved",
    hostId: 3,
    hostName: "Sarah Connor",
    featured: true,
  },
  {
    id: 3,
    title: "Modern City Apartment – Skyline View",
    location: "Manhattan, New York, USA",
    city: "New York",
    country: "USA",
    price: 220,
    rating: 4.7,
    reviews: 204,
    image: IMG_APARTMENT,
    images: [IMG_APARTMENT, IMG_NY, IMG_BEDROOM],
    type: "Apartment",
    description:
      "Experience New York like a local in this sleek, modern apartment on the 32nd floor with stunning panoramic skyline views. Fully equipped with premium appliances and just minutes from Times Square.",
    amenities: ["WiFi", "City View", "Gym Access", "Air Conditioning", "Washer/Dryer", "Smart TV", "Workspace"],
    maxGuests: 3,
    bedrooms: 2,
    bathrooms: 2,
    status: "Approved",
    hostId: 2,
    hostName: "James Rodriguez",
    featured: true,
  },
  {
    id: 4,
    title: "Luxury Beachfront Villa",
    location: "Phuket, Thailand",
    city: "Phuket",
    country: "Thailand",
    price: 320,
    rating: 5.0,
    reviews: 58,
    image: IMG_LUXURY,
    images: [IMG_LUXURY, IMG_VILLA_POOL, IMG_BEDROOM],
    type: "Villa",
    description:
      "Absolute luxury on the shores of Phuket. This beachfront villa offers direct beach access, a spectacular infinity pool, and personal concierge service.",
    amenities: ["WiFi", "Infinity Pool", "Beachfront", "Full Kitchen", "Air Conditioning", "Spa"],
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    status: "Approved",
    hostId: 4,
    hostName: "Priya Patel",
    featured: true,
  },
  {
    id: 5,
    title: "Scandinavian Forest Retreat",
    location: "Bergen, Norway",
    city: "Bergen",
    country: "Norway",
    price: 160,
    rating: 4.8,
    reviews: 76,
    image: IMG_SCANDINAVIAN,
    images: [IMG_SCANDINAVIAN, IMG_CABIN, IMG_BEDROOM],
    type: "Cottage",
    description:
      "A beautifully designed Scandinavian retreat surrounded by old-growth forest. The minimalist interior features natural materials, a wood-burning sauna, and floor-to-ceiling windows.",
    amenities: ["WiFi", "Sauna", "Fireplace", "Full Kitchen", "Parking", "Forest View"],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    status: "Approved",
    hostId: 5,
    hostName: "Erik Hansen",
    featured: false,
  },
  {
    id: 6,
    title: "Historic Paris Apartment",
    location: "Le Marais, Paris, France",
    city: "Paris",
    country: "France",
    price: 195,
    rating: 4.6,
    reviews: 163,
    image: IMG_PARIS,
    images: [IMG_PARIS, IMG_BEDROOM, IMG_SCANDINAVIAN],
    type: "Apartment",
    description:
      "Live like a Parisian in this charming Haussmann-era apartment in the heart of Le Marais. Original parquet floors, exposed stone walls, and tall windows.",
    amenities: ["WiFi", "City View", "Kitchen", "Heating", "Elevator", "Smart TV"],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    status: "Approved",
    hostId: 6,
    hostName: "Amélie Dupont",
    featured: false,
  },
  {
    id: 7,
    title: "Minimalist Tokyo Studio",
    location: "Shibuya, Tokyo, Japan",
    city: "Tokyo",
    country: "Japan",
    price: 95,
    rating: 4.7,
    reviews: 228,
    image: IMG_TOKYO,
    images: [IMG_TOKYO, IMG_BEDROOM, IMG_APARTMENT],
    type: "Studio",
    description:
      "Immerse yourself in Japanese design at this zen-inspired studio apartment. Just steps from Shibuya Crossing, with excellent transport links across Tokyo.",
    amenities: ["WiFi", "Air Conditioning", "Kitchenette", "Smart TV", "Self Check-in"],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    status: "Pending",
    hostId: 7,
    hostName: "Yuki Tanaka",
    featured: false,
  },
  {
    id: 8,
    title: "Charming Bali Bamboo House",
    location: "Ubud, Bali, Indonesia",
    city: "Ubud",
    country: "Indonesia",
    price: 88,
    rating: 4.9,
    reviews: 312,
    image: IMG_BALI,
    images: [IMG_BALI, IMG_VILLA_POOL, IMG_BEDROOM],
    type: "House",
    description:
      "A unique eco-bamboo house surrounded by emerald rice terraces and jungle. Hand-crafted from locally sourced bamboo with stunning artisan detail.",
    amenities: ["WiFi", "Rice Terrace View", "Infinity Pool", "Breakfast Included", "Yoga Deck"],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    status: "Approved",
    hostId: 2,
    hostName: "Made Wijaya",
    featured: false,
  },
  {
    id: 9,
    title: "New York Luxury Penthouse",
    location: "Upper East Side, New York, USA",
    city: "New York",
    country: "USA",
    price: 450,
    rating: 4.9,
    reviews: 34,
    image: IMG_NY,
    images: [IMG_NY, IMG_APARTMENT, IMG_BEDROOM],
    type: "Penthouse",
    description:
      "Live at the pinnacle of New York luxury in this stunning penthouse suite with 360-degree city views.",
    amenities: ["WiFi", "Rooftop Terrace", "City View", "Concierge", "Spa Access", "Home Theater"],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
    status: "Rejected",
    hostId: 8,
    hostName: "Michael Chen",
    featured: false,
  },
];

// ── Users ─────────────────────────────────────────────────────────────────────
export const users: User[] = [
  { id: 1,  name: "Admin User",        email: "admin@homestay.com",   role: "Admin", status: "Active",   joined: "2023-01-01" },
  { id: 2,  name: "Made Wijaya",       email: "made@example.com",     role: "Host",  status: "Active",   joined: "2023-03-12", properties: 3,  bookings: 47 },
  { id: 3,  name: "Sarah Connor",      email: "sarah@example.com",    role: "Host",  status: "Active",   joined: "2023-06-22", properties: 1,  bookings: 28 },
  { id: 4,  name: "James Rodriguez",   email: "james@example.com",    role: "Host",  status: "Active",   joined: "2023-04-08", properties: 2,  bookings: 61 },
  { id: 5,  name: "Priya Patel",       email: "priya@example.com",    role: "Host",  status: "Blocked",  joined: "2023-08-14", properties: 1,  bookings: 12 },
  { id: 6,  name: "Alice Johnson",     email: "alice@example.com",    role: "Guest", status: "Active",   joined: "2024-01-05", bookings: 5 },
  { id: 7,  name: "Bob Williams",      email: "bob@example.com",      role: "Guest", status: "Active",   joined: "2024-02-18", bookings: 3 },
  { id: 8,  name: "Carol Davis",       email: "carol@example.com",    role: "Guest", status: "Active",   joined: "2024-03-02", bookings: 7 },
  { id: 9,  name: "David Lee",         email: "david@example.com",    role: "Guest", status: "Blocked",  joined: "2024-01-20", bookings: 1 },
  { id: 10, name: "Emma Wilson",       email: "emma@example.com",     role: "Guest", status: "Active",   joined: "2024-04-11", bookings: 2 },
  { id: 11, name: "Erik Hansen",       email: "erik@example.com",     role: "Host",  status: "Active",   joined: "2023-09-30", properties: 1, bookings: 19 },
  { id: 12, name: "Yuki Tanaka",       email: "yuki@example.com",     role: "Host",  status: "Active",   joined: "2024-01-14", properties: 1, bookings: 8 },
];

// ── Bookings ──────────────────────────────────────────────────────────────────
export const bookings: Booking[] = [
  { id: 1, propertyId: 1, propertyTitle: "Tropical Villa with Private Pool",       propertyLocation: "Bali, Indonesia",         propertyImage: IMG_VILLA_POOL,   guestId: 6,  guestName: "Alice Johnson", guestEmail: "alice@example.com", hostId: 2, hostName: "Made Wijaya",      checkIn: "2025-03-15", checkOut: "2025-03-20", nights: 5, guests: 2, totalPrice: 925,  status: "Confirmed" },
  { id: 2, propertyId: 3, propertyTitle: "Modern City Apartment – Skyline View",   propertyLocation: "New York, USA",            propertyImage: IMG_APARTMENT,    guestId: 7,  guestName: "Bob Williams",  guestEmail: "bob@example.com",   hostId: 2, hostName: "James Rodriguez",  checkIn: "2025-04-01", checkOut: "2025-04-05", nights: 4, guests: 2, totalPrice: 880,  status: "Pending" },
  { id: 3, propertyId: 2, propertyTitle: "Cozy Mountain Cabin Retreat",             propertyLocation: "Aspen, Colorado, USA",    propertyImage: IMG_CABIN,        guestId: 8,  guestName: "Carol Davis",   guestEmail: "carol@example.com", hostId: 3, hostName: "Sarah Connor",     checkIn: "2025-02-10", checkOut: "2025-02-14", nights: 4, guests: 3, totalPrice: 520,  status: "Cancelled" },
  { id: 4, propertyId: 4, propertyTitle: "Luxury Beachfront Villa",                 propertyLocation: "Phuket, Thailand",        propertyImage: IMG_LUXURY,       guestId: 6,  guestName: "Alice Johnson", guestEmail: "alice@example.com", hostId: 4, hostName: "Priya Patel",      checkIn: "2025-05-10", checkOut: "2025-05-17", nights: 7, guests: 4, totalPrice: 2240, status: "Confirmed" },
  { id: 5, propertyId: 5, propertyTitle: "Scandinavian Forest Retreat",             propertyLocation: "Bergen, Norway",          propertyImage: IMG_SCANDINAVIAN, guestId: 10, guestName: "Emma Wilson",   guestEmail: "emma@example.com",  hostId: 5, hostName: "Erik Hansen",      checkIn: "2025-06-20", checkOut: "2025-06-25", nights: 5, guests: 2, totalPrice: 800,  status: "Pending" },
  { id: 6, propertyId: 8, propertyTitle: "Charming Bali Bamboo House",              propertyLocation: "Ubud, Bali, Indonesia",   propertyImage: IMG_BALI,         guestId: 7,  guestName: "Bob Williams",  guestEmail: "bob@example.com",   hostId: 2, hostName: "Made Wijaya",      checkIn: "2025-04-18", checkOut: "2025-04-22", nights: 4, guests: 2, totalPrice: 352,  status: "Confirmed" },
  { id: 7, propertyId: 6, propertyTitle: "Historic Paris Apartment",                propertyLocation: "Paris, France",           propertyImage: IMG_PARIS,        guestId: 8,  guestName: "Carol Davis",   guestEmail: "carol@example.com", hostId: 6, hostName: "Amélie Dupont",    checkIn: "2025-07-01", checkOut: "2025-07-08", nights: 7, guests: 2, totalPrice: 1365, status: "Pending" },
  { id: 8, propertyId: 1, propertyTitle: "Tropical Villa with Private Pool",       propertyLocation: "Bali, Indonesia",         propertyImage: IMG_VILLA_POOL,   guestId: 10, guestName: "Emma Wilson",   guestEmail: "emma@example.com",  hostId: 2, hostName: "Made Wijaya",      checkIn: "2025-08-05", checkOut: "2025-08-10", nights: 5, guests: 4, totalPrice: 925,  status: "Confirmed" },
];

// ── Reviews ───────────────────────────────────────────────────────────────────
export const reviews: Review[] = [
  { id: 1, bookingId: 1, propertyId: 1, guestId: 6, authorName: "Alice J.", rating: 5, comment: "Absolutely magical stay! The villa exceeded all expectations — the pool, the garden, the staff.", date: "2025-03-22" },
  { id: 2, bookingId: 0, propertyId: 1, guestId: 0, authorName: "Tom K.",   rating: 5, comment: "Perfect in every way. Made is an incredible host.", date: "2025-01-22" },
  { id: 3, bookingId: 0, propertyId: 1, guestId: 0, authorName: "Laura B.", rating: 4, comment: "Stunning property with a truly beautiful pool. Highly recommend!", date: "2024-12-18" },
  { id: 4, bookingId: 0, propertyId: 2, guestId: 0, authorName: "Mike R.",  rating: 5, comment: "The cabin is perfect. Cozy, warm, and surrounded by beautiful nature.", date: "2025-01-05" },
  { id: 5, bookingId: 0, propertyId: 3, guestId: 0, authorName: "Sophia L.",rating: 4, comment: "Great location and beautiful views! Will book again.", date: "2025-02-28" },
  { id: 6, bookingId: 0, propertyId: 4, guestId: 0, authorName: "David M.", rating: 5, comment: "The most luxurious place I've ever stayed. Worth every penny.", date: "2025-01-14" },
  { id: 8, bookingId: 6, propertyId: 8, guestId: 7, authorName: "Bob W.",   rating: 5, comment: "The bamboo house is something truly special. Rice terrace views at breakfast.", date: "2025-04-24" },
];

// ── Monthly Revenue (charts) ──────────────────────────────────────────────────
export const monthlyRevenue = [
  { month: "Aug", revenue: 12400, bookings: 28 },
  { month: "Sep", revenue: 15800, bookings: 34 },
  { month: "Oct", revenue: 18200, bookings: 41 },
  { month: "Nov", revenue: 14600, bookings: 31 },
  { month: "Dec", revenue: 22400, bookings: 52 },
  { month: "Jan", revenue: 19800, bookings: 46 },
  { month: "Feb", revenue: 24600, bookings: 58 },
];

// ── Top Hosts ─────────────────────────────────────────────────────────────────
export const topHosts = [
  { name: "Made Wijaya",      properties: 3, bookings: 47, revenue: 18420 },
  { name: "James Rodriguez",  properties: 2, bookings: 61, revenue: 26800 },
  { name: "Amélie Dupont",    properties: 1, bookings: 34, revenue: 14280 },
  { name: "Erik Hansen",      properties: 1, bookings: 19, revenue: 9680  },
  { name: "Sarah Connor",     properties: 1, bookings: 28, revenue: 8960  },
];

// ── Destinations ──────────────────────────────────────────────────────────────
export const destinations = [
  { id: 1, name: "Bali",     country: "Indonesia", properties: 128, image: IMG_BALI },
  { id: 2, name: "Paris",    country: "France",    properties: 94,  image: IMG_PARIS },
  { id: 3, name: "Tokyo",    country: "Japan",     properties: 76,  image: IMG_TOKYO },
  { id: 4, name: "New York", country: "USA",       properties: 215, image: IMG_NY },
];
