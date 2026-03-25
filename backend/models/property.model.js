const db = require("../common/db");

const Property = {};

function mapPropertySummaryRow(row) {
  return {
    id: Number(row.id),
    hostId: Number(row.hostId),
    title: row.title,
    description: row.description,
    type: row.type,
    price: Number(row.price),
    location: row.location,
    city: row.city,
    country: row.country,
    maxGuests: Number(row.maxGuests || 0),
    bedrooms: Number(row.bedrooms || 0),
    bathrooms: Number(row.bathrooms || 0),
    status: row.status,
    image: row.image,
    featured: Boolean(row.featured),
    hostName: row.hostName,
    reviews: Number(row.reviews || 0),
    rating: Number(row.rating || 0),
  };
}

async function getAmenities(propertyId) {
  const [rows] = await db.promise().query(
    `SELECT a.name
     FROM amenities a
     JOIN property_amenities pa ON a.id = pa.amenity_id
     WHERE pa.property_id = ?
     ORDER BY a.name ASC`,
    [propertyId],
  );

  return rows.map((row) => row.name);
}

async function getImageList(propertyId) {
  const [rows] = await db.promise().query(
    `SELECT id, image_url
     FROM property_images
     WHERE property_id = ?
     ORDER BY id ASC`,
    [propertyId],
  );

  return rows.map((row) => ({
    id: Number(row.id),
    url: row.image_url,
  }));
}

async function getReviewList(propertyId) {
  const [rows] = await db.promise().query(
    `SELECT
      r.id,
      r.rating,
      r.comment,
      r.created_at AS date,
      u.full_name AS authorName
     FROM reviews r
     JOIN users u ON r.guest_id = u.id
     WHERE r.property_id = ?
     ORDER BY r.created_at DESC`,
    [propertyId],
  );

  return rows.map((row) => ({
    id: Number(row.id),
    rating: Number(row.rating),
    comment: row.comment,
    authorName: row.authorName,
    date: row.date,
  }));
}

async function buildPropertyDetail(row) {
  const [amenities, imageRows, reviews] = await Promise.all([
    getAmenities(row.id),
    getImageList(row.id),
    getReviewList(row.id),
  ]);

  const images = imageRows.map((imageRow) => imageRow.url);

  return {
    id: Number(row.id),
    hostId: Number(row.host_id),
    title: row.title,
    description: row.description,
    type: row.property_type,
    price: Number(row.price_per_night),
    address: row.street_address,
    location: `${row.street_address}, ${row.city}, ${row.country}`,
    city: row.city,
    country: row.country,
    maxGuests: Number(row.max_guests || 0),
    bedrooms: Number(row.bedrooms || 0),
    bathrooms: Number(row.bathrooms || 0),
    status: row.status,
    image: row.cover_image,
    images,
    amenities,
    reviews,
    reviewCount: Number(row.reviewCount || 0),
    rating: Number(row.rating || 0),
    featured: Boolean(row.featured),
    hostName: row.hostName,
  };
}

async function getPropertyDetail(whereClause, params) {
  const [rows] = await db.promise().query(
    `SELECT
      p.*,
      u.full_name AS hostName,
      COUNT(r.id) AS reviewCount,
      COALESCE(AVG(r.rating), 0) AS rating
     FROM properties p
     JOIN users u ON p.host_id = u.id
     LEFT JOIN reviews r ON r.property_id = p.id
     WHERE ${whereClause}
     GROUP BY p.id`,
    params,
  );

  if (rows.length === 0) {
    return null;
  }

  return buildPropertyDetail(rows[0]);
}

async function getPropertyList(whereClause, params = []) {
  const [rows] = await db.promise().query(
    `SELECT
      p.id,
      p.host_id AS hostId,
      p.title,
      p.description,
      p.property_type AS type,
      p.price_per_night AS price,
      CONCAT(p.street_address, ', ', p.city, ', ', p.country) AS location,
      p.city,
      p.country,
      p.max_guests AS maxGuests,
      p.bedrooms,
      p.bathrooms,
      p.status,
      p.cover_image AS image,
      p.featured,
      u.full_name AS hostName,
      COUNT(r.id) AS reviews,
      COALESCE(AVG(r.rating), 0) AS rating
     FROM properties p
     JOIN users u ON p.host_id = u.id
     LEFT JOIN reviews r ON r.property_id = p.id
     WHERE ${whereClause}
     GROUP BY p.id
     ORDER BY p.created_at DESC`,
    params,
  );

  return rows.map(mapPropertySummaryRow);
}

Property.getAll = async () =>
  getPropertyList("p.status = 'approved' AND p.is_deleted = 0");

Property.getById = async (id) =>
  getPropertyDetail("p.id = ? AND p.status = 'approved' AND p.is_deleted = 0", [id]);

Property.getAllAdmin = async () => getPropertyList("p.is_deleted = 0");

Property.getAdminById = async (id) =>
  getPropertyDetail("p.id = ? AND p.is_deleted = 0", [id]);

Property.getByHost = async (hostId) =>
  getPropertyList("p.host_id = ? AND p.is_deleted = 0", [hostId]);

Property.getHostById = async (id, hostId) =>
  getPropertyDetail("p.id = ? AND p.host_id = ? AND p.is_deleted = 0", [id, hostId]);

Property.create = async (payload) => {
  const [result] = await db.promise().query(
    `INSERT INTO properties (
      host_id,
      title,
      description,
      property_type,
      price_per_night,
      street_address,
      city,
      country,
      max_guests,
      bedrooms,
      bathrooms,
      status,
      cover_image,
      featured
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.hostId,
      payload.title,
      payload.description,
      payload.type,
      payload.price,
      payload.address,
      payload.city,
      payload.country,
      payload.maxGuests,
      payload.bedrooms,
      payload.bathrooms,
      payload.status || "pending",
      payload.coverImage || null,
      payload.featured ? 1 : 0,
    ],
  );

  return Number(result.insertId);
};

Property.update = async (id, payload, hostId = null) => {
  const params = [
    payload.title,
    payload.description,
    payload.type,
    payload.price,
    payload.address,
    payload.city,
    payload.country,
    payload.maxGuests,
    payload.bedrooms,
    payload.bathrooms,
    payload.featured ? 1 : 0,
    id,
  ];

  let sql = `UPDATE properties
             SET
               title = ?,
               description = ?,
               property_type = ?,
               price_per_night = ?,
               street_address = ?,
               city = ?,
               country = ?,
               max_guests = ?,
               bedrooms = ?,
               bathrooms = ?,
               featured = ?
             WHERE id = ? AND is_deleted = 0`;

  if (hostId !== null) {
    sql += " AND host_id = ?";
    params.push(hostId);
  }

  const [result] = await db.promise().query(sql, params);
  return result.affectedRows > 0;
};

Property.updateCoverImage = async (id, imageUrl) => {
  const [result] = await db.promise().query(
    "UPDATE properties SET cover_image = ? WHERE id = ?",
    [imageUrl, id],
  );

  return result.affectedRows > 0;
};

Property.replaceAmenities = async (propertyId, amenityNames) => {
  await db.promise().query(
    "DELETE FROM property_amenities WHERE property_id = ?",
    [propertyId],
  );

  if (!Array.isArray(amenityNames) || amenityNames.length === 0) {
    return;
  }

  const [amenityRows] = await db.promise().query(
    "SELECT id FROM amenities WHERE name IN (?)",
    [amenityNames],
  );

  if (amenityRows.length === 0) {
    return;
  }

  const values = amenityRows.map((row) => [propertyId, row.id]);
  await db.promise().query(
    "INSERT INTO property_amenities (property_id, amenity_id) VALUES ?",
    [values],
  );
};

Property.addImages = async (propertyId, imageUrls) => {
  if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
    return;
  }

  const values = imageUrls.map((imageUrl) => [propertyId, imageUrl]);
  await db.promise().query(
    "INSERT INTO property_images (property_id, image_url) VALUES ?",
    [values],
  );
};

Property.deleteImagesByUrls = async (propertyId, imageUrls) => {
  if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
    return;
  }

  await db.promise().query(
    "DELETE FROM property_images WHERE property_id = ? AND image_url IN (?)",
    [propertyId, imageUrls],
  );
};

Property.getImageUrls = async (propertyId) => {
  const images = await getImageList(propertyId);
  return images.map((image) => image.url);
};

Property.softDelete = async (id, hostId = null) => {
  let sql = "UPDATE properties SET is_deleted = 1 WHERE id = ? AND is_deleted = 0";
  const params = [id];

  if (hostId !== null) {
    sql += " AND host_id = ?";
    params.push(hostId);
  }

  const [result] = await db.promise().query(sql, params);
  return result.affectedRows > 0;
};

Property.updateStatus = async (id, status) => {
  const [result] = await db.promise().query(
    "UPDATE properties SET status = ? WHERE id = ? AND is_deleted = 0",
    [status, id],
  );

  return result.affectedRows > 0;
};

module.exports = Property;
