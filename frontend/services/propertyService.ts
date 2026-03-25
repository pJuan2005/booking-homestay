import { apiRequest, buildAssetUrl } from "@/lib/apiClient";

export interface PropertySummary {
  id: number;
  hostId: number;
  title: string;
  description: string;
  type: string;
  price: number;
  location: string;
  city: string;
  country: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  status: string;
  image: string;
  featured: boolean;
  hostName: string;
  reviews: number;
  rating: number;
}

export interface PropertyReview {
  id: number;
  rating: number;
  comment: string;
  authorName: string;
  date: string;
}

export interface PropertyDetail extends PropertySummary {
  address: string;
  images: string[];
  amenities: string[];
  reviewCount: number;
}

function normalizePropertySummary(property: any): PropertySummary {
  return {
    id: Number(property.id),
    hostId: Number(property.hostId || property.host_id),
    title: property.title,
    description: property.description || "",
    type: property.type || property.property_type,
    price: Number(property.price || property.price_per_night || 0),
    location: property.location,
    city: property.city,
    country: property.country,
    maxGuests: Number(property.maxGuests || property.max_guests || 0),
    bedrooms: Number(property.bedrooms || 0),
    bathrooms: Number(property.bathrooms || 0),
    status: property.status,
    image: buildAssetUrl(property.image || property.cover_image),
    featured: Boolean(property.featured),
    hostName: property.hostName,
    reviews: Number(property.reviews || 0),
    rating: Number(property.rating || 0),
  };
}

function normalizePropertyDetail(property: any): PropertyDetail {
  const summary = normalizePropertySummary(property);

  return {
    ...summary,
    address: property.address || property.street_address || "",
    images: (property.images || [])
      .map((image: string) => buildAssetUrl(image))
      .filter(Boolean),
    amenities: property.amenities || [],
    reviewCount: Number(property.reviewCount || 0),
    reviews:
      Array.isArray(property.reviews) && property.reviews.length > 0
        ? Number(property.reviews.length)
        : summary.reviews,
  };
}

export async function getProperties() {
  const data = await apiRequest<any[]>("/api/properties");
  return data.map(normalizePropertySummary);
}

export async function getPropertyById(id: string | number) {
  const data = await apiRequest<any>(`/api/properties/${id}`);
  const detail = normalizePropertyDetail(data);

  return {
    ...detail,
    reviews: (data.reviews || []).map(
      (review: any): PropertyReview => ({
        id: Number(review.id),
        rating: Number(review.rating),
        comment: review.comment,
        authorName: review.authorName,
        date: review.date,
      }),
    ),
  };
}

export async function getAdminProperties() {
  const data = await apiRequest<any[]>("/api/admin/properties");
  return data.map(normalizePropertySummary);
}

export async function getAdminPropertyById(id: string | number) {
  const data = await apiRequest<any>(`/api/admin/properties/${id}`);
  return {
    ...normalizePropertyDetail(data),
    reviews: (data.reviews || []).map(
      (review: any): PropertyReview => ({
        id: Number(review.id),
        rating: Number(review.rating),
        comment: review.comment,
        authorName: review.authorName,
        date: review.date,
      }),
    ),
  };
}

export async function updatePropertyStatus(id: number, status: string) {
  return apiRequest<{ message: string; data: { id: number; status: string } }>(
    `/api/admin/properties/${id}/status`,
    {
      method: "PUT",
      body: JSON.stringify({ status }),
    },
  );
}

export async function updateAdminProperty(id: number, formData: FormData) {
  return apiRequest<{ message: string; data: PropertyDetail }>(
    `/api/admin/properties/${id}`,
    {
      method: "PUT",
      body: formData,
    },
  );
}

export async function deleteProperty(id: number) {
  return apiRequest<{ message: string }>(`/api/admin/properties/${id}`, {
    method: "DELETE",
  });
}

export async function getHostProperties(hostId?: number) {
  const query = typeof hostId === "number" ? `?hostId=${hostId}` : "";
  const data = await apiRequest<any[]>(`/api/host/properties${query}`);
  return data.map(normalizePropertySummary);
}

export async function getHostPropertyById(id: string | number, hostId?: number) {
  const query = typeof hostId === "number" ? `?hostId=${hostId}` : "";
  const data = await apiRequest<any>(`/api/host/properties/${id}${query}`);

  return {
    ...normalizePropertyDetail(data),
    reviews: (data.reviews || []).map(
      (review: any): PropertyReview => ({
        id: Number(review.id),
        rating: Number(review.rating),
        comment: review.comment,
        authorName: review.authorName,
        date: review.date,
      }),
    ),
  };
}

export async function createHostProperty(formData: FormData) {
  return apiRequest<{ message: string; data: PropertyDetail }>(
    "/api/host/properties",
    {
      method: "POST",
      body: formData,
    },
  );
}

export async function updateHostProperty(
  id: number,
  formData: FormData,
) {
  return apiRequest<{ message: string; data: PropertyDetail }>(
    `/api/host/properties/${id}`,
    {
      method: "PUT",
      body: formData,
    },
  );
}

export async function deleteHostProperty(id: number, hostId?: number) {
  const query = typeof hostId === "number" ? `?hostId=${hostId}` : "";
  return apiRequest<{ message: string }>(
    `/api/host/properties/${id}${query}`,
    {
      method: "DELETE",
    },
  );
}
