export interface Destination {
  id: number;
  name: string;
  country: string;
  properties: number;
  image: string;
}

const IMG_BALI =
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80";
const IMG_PARIS =
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80";
const IMG_TOKYO =
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80";
const IMG_NEW_YORK =
  "https://images.unsplash.com/photo-1496871328941-181939ec79ca?w=800&q=80";

export const destinations: Destination[] = [
  { id: 1, name: "Bali", country: "Indonesia", properties: 128, image: IMG_BALI },
  { id: 2, name: "Paris", country: "France", properties: 94, image: IMG_PARIS },
  { id: 3, name: "Tokyo", country: "Japan", properties: 76, image: IMG_TOKYO },
  { id: 4, name: "New York", country: "USA", properties: 215, image: IMG_NEW_YORK },
];
