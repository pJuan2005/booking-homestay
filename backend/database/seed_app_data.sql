-- Application seed data for HomeStay
-- Usage:
-- 1. Run backend/database/booking_db.sql to create the full schema.
-- 2. Make sure property images already exist in backend/uploads/properties.
-- 3. Run this file to seed users, amenities, properties, bookings, reviews, and chat data.
--
-- This seed is intended for local demo/test data and replaces the older split seed files.
-- ------------------------------------------------------------
-- Properties, amenities, and base users
-- ------------------------------------------------------------
-- Seed du lieu property su dung anh trong backend/uploads/properties
-- Cover image:
-- /uploads/properties/{propertyId}/cover/<file-name>
-- Detail images:
-- /uploads/properties/{propertyId}/details/<file-name>
--
-- Notes:
-- 1. This section resets property, review, and booking data before re-seeding.
-- 2. Existing users are kept, and sample accounts are inserted if missing.

SET FOREIGN_KEY_CHECKS = 0;

SET @featured_column_exists = (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'properties'
    AND COLUMN_NAME = 'featured'
);

SET @featured_sql = IF(
  @featured_column_exists = 0,
  'ALTER TABLE properties ADD COLUMN featured TINYINT(1) NOT NULL DEFAULT 0',
  'SELECT 1'
);

PREPARE featured_stmt FROM @featured_sql;
EXECUTE featured_stmt;
DEALLOCATE PREPARE featured_stmt;

DELETE FROM reviews;
DELETE FROM bookings;
DELETE FROM property_amenities;
DELETE FROM property_images;
DELETE FROM properties;
DELETE FROM amenities;

ALTER TABLE reviews AUTO_INCREMENT = 1;
ALTER TABLE bookings AUTO_INCREMENT = 1;
ALTER TABLE property_images AUTO_INCREMENT = 1;
ALTER TABLE properties AUTO_INCREMENT = 1;
ALTER TABLE amenities AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;

INSERT IGNORE INTO users (
  id,
  full_name,
  email,
  password,
  role,
  phone,
  location,
  status
) VALUES
(1, 'Admin User', 'admin@mail.com', '123456', 'admin', '0900000001', 'Vietnam', 'active'),
(2, 'Nguyen Van A', 'host1@mail.com', '123456', 'host', '0900000002', 'Ha Noi', 'active'),
(3, 'Tran Thi B', 'host2@mail.com', '123456', 'host', '0900000003', 'Da Nang', 'active'),
(4, 'Pham Van C', 'host3@mail.com', '123456', 'host', '0900000004', 'Ho Chi Minh City', 'active'),
(5, 'Guest One', 'guest1@mail.com', '123456', 'guest', '0900000005', 'United States', 'active'),
(6, 'Guest Two', 'guest2@mail.com', '123456', 'guest', '0900000006', 'United Kingdom', 'active'),
(7, 'Guest Three', 'guest3@mail.com', '123456', 'guest', '0900000007', 'France', 'active'),
(8, 'Guest Four', 'guest4@mail.com', '123456', 'guest', '0900000008', 'Germany', 'active'),
(9, 'Guest Five', 'guest5@mail.com', '123456', 'guest', '0900000009', 'Japan', 'active'),
(10, 'Guest Six', 'guest6@mail.com', '123456', 'guest', '0900000010', 'South Korea', 'active');

INSERT INTO amenities (id, name) VALUES
(1, 'WiFi'),
(2, 'Full Kitchen'),
(3, 'Air Conditioning'),
(4, 'Parking'),
(5, 'Pool'),
(6, 'Beachfront'),
(7, 'Fireplace'),
(8, 'Washer/Dryer'),
(9, 'Gym Access'),
(10, 'Hot Tub'),
(11, 'BBQ Grill'),
(12, 'Smart TV'),
(13, 'Workspace'),
(14, 'Elevator'),
(15, 'Breakfast Included'),
(16, 'Pet Friendly'),
(17, 'Sauna'),
(18, 'Mountain View'),
(19, 'City View'),
(20, 'Sea View');

INSERT INTO properties (
  id,
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
  featured,
  is_deleted
) VALUES
(1, 2, 'Ocean Pearl Villa', 'Luxury beachfront villa with a private pool, spacious deck, and bright tropical living spaces for family vacations.', 'Villa', 320.00, '12 Vo Nguyen Giap', 'Da Nang', 'Vietnam', 8, 4, 4, 'approved', '/uploads/properties/1/cover/abby-rurenko-uOYak90r4L0-unsplash.jpg', 1, 0),
(2, 4, 'Skyline Penthouse Saigon', 'High rise penthouse with city skyline views, modern finishes, and a refined lounge area for premium stays.', 'Penthouse', 410.00, '88 Nguyen Hue Tower', 'Ho Chi Minh City', 'Vietnam', 6, 3, 3, 'approved', '/uploads/properties/2/cover/aes-5m3v4GBB82o-unsplash.jpg', 1, 0),
(3, 2, 'Old Quarter Balcony Apartment', 'Stylish apartment in the heart of the old quarter with a balcony, natural light, and easy access to local food streets.', 'Apartment', 145.00, '25 Hang Bong', 'Ha Noi', 'Vietnam', 4, 2, 1, 'approved', '/uploads/properties/3/cover/alice-kang-Bc_uN5PeErA-unsplash.jpg', 1, 0),
(4, 3, 'Pine Hill House', 'Cozy hillside house with calm interiors, cool weather, and a fireplace corner ideal for quiet retreats.', 'House', 190.00, '7 Tran Hung Dao Hill', 'Da Lat', 'Vietnam', 5, 3, 2, 'approved', '/uploads/properties/4/cover/andrea-davis-1uNh3B3ppl4-unsplash.jpg', 0, 0),
(5, 3, 'Riverside Studio Hue', 'Compact riverside studio designed for short city escapes with warm materials and comfortable work friendly corners.', 'Studio', 85.00, '42 Le Loi Riverside', 'Hue', 'Vietnam', 2, 1, 1, 'approved', '/uploads/properties/5/cover/andrea-davis-w-ARisGf_Kw-unsplash.jpg', 0, 0),
(6, 4, 'Coral Bay Condo', 'Modern seaside condo near the beach with shared amenities, polished interiors, and a clean resort feel.', 'Condo', 175.00, '18 Tran Phu Coast', 'Nha Trang', 'Vietnam', 4, 2, 2, 'approved', '/uploads/properties/6/cover/ashley-byrd-H87P_izw84s-unsplash.jpg', 0, 0),
(7, 2, 'Cloud Garden Bungalow', 'Garden bungalow surrounded by greenery and outdoor seating, currently waiting for final admin review.', 'Bungalow', 130.00, '5 Cam Ha Garden', 'Hoi An', 'Vietnam', 3, 1, 1, 'pending', '/uploads/properties/7/cover/ciudad-maderas-MXbM1NrRqtI-unsplash.jpg', 0, 0),
(8, 3, 'Lavender Courtyard House', 'Traditional courtyard house with soft lavender tones and spacious common areas, still under moderation.', 'House', 165.00, '31 Ba Trieu Courtyard', 'Ha Noi', 'Vietnam', 6, 3, 2, 'pending', '/uploads/properties/8/cover/clay-banks-r8i3RwrVcRk-unsplash.jpg', 0, 0),
(9, 4, 'Minimalist City Loft', 'Minimalist loft with clean lines and open plan living, submitted recently and pending approval.', 'Apartment', 155.00, '102 Nguyen Thi Minh Khai', 'Ho Chi Minh City', 'Vietnam', 4, 2, 2, 'pending', '/uploads/properties/9/cover/deborah-cortelazzi-gREquCUXQLI-unsplash.jpg', 0, 0),
(10, 3, 'Emerald Lake Cabin', 'Wood cabin overlooking a mountain lake with sauna access, rejected due to incomplete operating documents.', 'Cabin', 210.00, '9 Ho Tuyen Lam', 'Sapa', 'Vietnam', 4, 2, 2, 'rejected', '/uploads/properties/10/cover/florian-schmidinger-b_79nOqf95I-unsplash.jpg', 0, 0),
(11, 2, 'Sunlit Family Villa', 'Large family villa with outdoor spa and sea facing terraces, rejected because listing photos and legal files need revision.', 'Villa', 295.00, '61 Sunset Bay', 'Phu Quoc', 'Vietnam', 10, 5, 4, 'rejected', '/uploads/properties/11/cover/freddy-g-L6dJu7Bcpww-unsplash.jpg', 0, 0),
(12, 4, 'Bamboo Retreat House', 'Nature inspired retreat with mountain views, a barbecue area, and private living spaces for groups.', 'House', 205.00, '17 Trang An Road', 'Ninh Binh', 'Vietnam', 7, 3, 3, 'approved', '/uploads/properties/12/cover/jilbert-ebrahimi-QGehbt2b6iQ-unsplash.jpg', 0, 0),
(13, 2, 'Pearl Beachfront Apartment', 'Bright beachfront apartment with contemporary finishes, fast WiFi, and a panoramic sea facing lounge.', 'Apartment', 185.00, '22 Pham Van Dong', 'Da Nang', 'Vietnam', 4, 2, 2, 'approved', '/uploads/properties/13/cover/kelcie-papp-Gk0MAP8A7Cw-unsplash.jpg', 0, 0),
(14, 3, 'Heritage Courtyard Home', 'Heritage style home in the old town with a peaceful courtyard, breakfast service, and artisan decor details.', 'House', 170.00, '14 Nguyen Thai Hoc', 'Hoi An', 'Vietnam', 5, 2, 2, 'approved', '/uploads/properties/14/cover/lusia-komala-widiastuti-HStcPpySmxI-unsplash.jpg', 0, 0);

INSERT INTO property_images (property_id, image_url) VALUES
(1, '/uploads/properties/1/details/adam-winger-b87_egH5mos-unsplash.jpg'),
(1, '/uploads/properties/1/details/adrian-schwarz--QQwV-lU2_4-unsplash.jpg'),
(1, '/uploads/properties/1/details/aes-44DtOHQ6Jpg-unsplash.jpg'),
(2, '/uploads/properties/2/details/aes-a7Cf-p-ShfA-unsplash.jpg'),
(2, '/uploads/properties/2/details/aes-reuIAvaxUMk-unsplash.jpg'),
(2, '/uploads/properties/2/details/aes-VGr1zBtxVoc-unsplash.jpg'),
(3, '/uploads/properties/3/details/alka-jha-lOxVZQc0W0U-unsplash.jpg'),
(3, '/uploads/properties/3/details/allphoto-bangkok-nI4aC1kaTRc-unsplash.jpg'),
(3, '/uploads/properties/3/details/andrea-davis-0SSPeyokubs-unsplash.jpg'),
(4, '/uploads/properties/4/details/andrea-davis-7450hH--84M-unsplash.jpg'),
(4, '/uploads/properties/4/details/andrea-davis-cYCcdsTeZaA-unsplash.jpg'),
(4, '/uploads/properties/4/details/andrea-davis-IWfe63thJxk-unsplash.jpg'),
(5, '/uploads/properties/5/details/annie-spratt-rti3HfYJzOM-unsplash.jpg'),
(5, '/uploads/properties/5/details/aquilion-property-dEuvqNbwRuw-unsplash.jpg'),
(5, '/uploads/properties/5/details/asher-pardey-KQqzXXS4mug-unsplash.jpg'),
(6, '/uploads/properties/6/details/avi-werde-hHz4yrvxwlA-unsplash.jpg'),
(6, '/uploads/properties/6/details/birmingham-museums-trust-4lDX-xTLl3Q-unsplash.jpg'),
(6, '/uploads/properties/6/details/brian-babb-XbwHrt87mQ0-unsplash.jpg'),
(7, '/uploads/properties/7/details/clay-banks-BJc1mj3xgeE-unsplash.jpg'),
(7, '/uploads/properties/7/details/clay-banks-JRkXiBmTRDI-unsplash.jpg'),
(7, '/uploads/properties/7/details/clay-banks-kiv1ggvkgQk-unsplash.jpg'),
(8, '/uploads/properties/8/details/clay-banks-ybLSV7sF7j8-unsplash.jpg'),
(8, '/uploads/properties/8/details/darkroomlabs-EBTQy2XcFH4-unsplash.jpg'),
(8, '/uploads/properties/8/details/david-bayliss-IjQq-GWeLAk-unsplash.jpg'),
(9, '/uploads/properties/9/details/digital-marketing-agency-ntwrk-g39p1kDjvSY-unsplash.jpg'),
(9, '/uploads/properties/9/details/don-kaveen-4LLHJHyXQVk-unsplash.jpg'),
(9, '/uploads/properties/9/details/filios-sazeides-uckPy5B7K4o-unsplash.jpg'),
(10, '/uploads/properties/10/details/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg'),
(10, '/uploads/properties/10/details/frames-for-your-heart-mR1CIDduGLc-unsplash.jpg'),
(10, '/uploads/properties/10/details/frankie-x6vyL4YKP9c-unsplash.jpg'),
(11, '/uploads/properties/11/details/hans-p6pfOaavscc-unsplash.jpg'),
(11, '/uploads/properties/11/details/hans-sHGWuQtDv_U-unsplash.jpg'),
(11, '/uploads/properties/11/details/hans-_oI7jOqLzmg-unsplash.jpg'),
(12, '/uploads/properties/12/details/johnny-africa-RGvbdyhsh_U-unsplash.jpg'),
(12, '/uploads/properties/12/details/jonathan-mueller-AvvpWdDZwSI-unsplash.jpg'),
(12, '/uploads/properties/12/details/karsten-winegeart-sStahKEhT9w-unsplash.jpg'),
(13, '/uploads/properties/13/details/lissete-laverde-7OFTxbGWqwk-unsplash.jpg'),
(13, '/uploads/properties/13/details/loren-cutler-m1cZoYVEp1I-unsplash.jpg'),
(13, '/uploads/properties/13/details/lotus-design-n-print-jt2I98bh53A-unsplash.jpg'),
(14, '/uploads/properties/14/details/madhur-shrimal-jo8pclRHmCI-unsplash.jpg'),
(14, '/uploads/properties/14/details/manvendra-pandey-yBtBvqkr-Yg-unsplash.jpg'),
(14, '/uploads/properties/14/details/meritt-thomas-_YxDGcDm4Hs-unsplash.jpg');

INSERT INTO property_amenities (property_id, amenity_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 11), (1, 12), (1, 20),
(2, 1), (2, 2), (2, 3), (2, 8), (2, 9), (2, 12), (2, 14), (2, 19),
(3, 1), (3, 2), (3, 3), (3, 12), (3, 13), (3, 14), (3, 19),
(4, 1), (4, 2), (4, 3), (4, 4), (4, 7), (4, 12), (4, 18),
(5, 1), (5, 3), (5, 8), (5, 12), (5, 13), (5, 19),
(6, 1), (6, 2), (6, 3), (6, 4), (6, 5), (6, 6), (6, 12), (6, 20),
(7, 1), (7, 2), (7, 3), (7, 4), (7, 11), (7, 15), (7, 16),
(8, 1), (8, 2), (8, 3), (8, 4), (8, 7), (8, 12), (8, 13), (8, 19),
(9, 1), (9, 2), (9, 3), (9, 8), (9, 9), (9, 12), (9, 14), (9, 19),
(10, 1), (10, 2), (10, 3), (10, 4), (10, 7), (10, 17), (10, 18),
(11, 1), (11, 2), (11, 3), (11, 4), (11, 5), (11, 10), (11, 11), (11, 20),
(12, 1), (12, 2), (12, 3), (12, 4), (12, 7), (12, 11), (12, 18),
(13, 1), (13, 2), (13, 3), (13, 4), (13, 6), (13, 12), (13, 20),
(14, 1), (14, 2), (14, 3), (14, 4), (14, 7), (14, 12), (14, 13), (14, 15);

INSERT INTO reviews (property_id, guest_id, rating, comment) VALUES
(1, 5, 5, 'Excellent beachfront villa with impressive service and clean interiors.'),
(1, 6, 5, 'Perfect choice for a family holiday near the sea.'),
(2, 7, 5, 'Amazing skyline view and the penthouse layout felt premium.'),
(2, 8, 4, 'Very stylish place and check in was smooth.'),
(3, 9, 4, 'Great location for walking around the old quarter.'),
(3, 10, 5, 'Bright apartment with everything needed for a weekend trip.'),
(4, 5, 5, 'Cool weather, peaceful surroundings, and a lovely fireplace corner.'),
(5, 6, 4, 'Small but very comfortable and well designed studio.'),
(6, 7, 4, 'Nice condo close to the beach and restaurants.'),
(12, 8, 5, 'Beautiful retreat for groups and the mountain scenery was stunning.'),
(13, 9, 5, 'The sea view from the apartment was worth every minute.'),
(14, 10, 4, 'Charming old town house with a relaxing courtyard.');




-- ------------------------------------------------------------
-- Booking, payment, and review samples
-- ------------------------------------------------------------
-- Booking sample seed
-- This section assumes the full schema from booking_db.sql is already in place.
--
-- This script is rerunnable:
-- - It removes old demo bookings/reviews with booking_code LIKE 'DEMO%'
-- - Then inserts a fresh booking sample set
--
-- Review-eligible bookings after running:
-- - DEMOREV001
-- - DEMOREV002
-- - DEMOREV003
--
-- Already-reviewed booking after running:
-- - DEMOALREADY001

SET @admin_id = COALESCE(
  (SELECT id FROM users WHERE role = 'admin' ORDER BY id LIMIT 1),
  1
);

SET @guest1 = (SELECT id FROM users WHERE role = 'guest' ORDER BY id LIMIT 0, 1);
SET @guest2 = COALESCE((SELECT id FROM users WHERE role = 'guest' ORDER BY id LIMIT 1, 1), @guest1);
SET @guest3 = COALESCE((SELECT id FROM users WHERE role = 'guest' ORDER BY id LIMIT 2, 1), @guest1);
SET @guest4 = COALESCE((SELECT id FROM users WHERE role = 'guest' ORDER BY id LIMIT 3, 1), @guest1);
SET @guest5 = COALESCE((SELECT id FROM users WHERE role = 'guest' ORDER BY id LIMIT 4, 1), @guest1);
SET @guest6 = COALESCE((SELECT id FROM users WHERE role = 'guest' ORDER BY id LIMIT 5, 1), @guest1);

SET @property1 = (SELECT id FROM properties WHERE status = 'approved' AND is_deleted = 0 ORDER BY id LIMIT 0, 1);
SET @property2 = COALESCE((SELECT id FROM properties WHERE status = 'approved' AND is_deleted = 0 ORDER BY id LIMIT 1, 1), @property1);
SET @property3 = COALESCE((SELECT id FROM properties WHERE status = 'approved' AND is_deleted = 0 ORDER BY id LIMIT 2, 1), @property1);
SET @property4 = COALESCE((SELECT id FROM properties WHERE status = 'approved' AND is_deleted = 0 ORDER BY id LIMIT 3, 1), @property1);
SET @property5 = COALESCE((SELECT id FROM properties WHERE status = 'approved' AND is_deleted = 0 ORDER BY id LIMIT 4, 1), @property1);
SET @property6 = COALESCE((SELECT id FROM properties WHERE status = 'approved' AND is_deleted = 0 ORDER BY id LIMIT 5, 1), @property1);
SET @property7 = COALESCE((SELECT id FROM properties WHERE status = 'approved' AND is_deleted = 0 ORDER BY id LIMIT 6, 1), @property1);
SET @property8 = COALESCE((SELECT id FROM properties WHERE status = 'approved' AND is_deleted = 0 ORDER BY id LIMIT 7, 1), @property1);
SET @property9 = COALESCE((SELECT id FROM properties WHERE status = 'approved' AND is_deleted = 0 ORDER BY id LIMIT 8, 1), @property1);
SET @property10 = COALESCE((SELECT id FROM properties WHERE status = 'approved' AND is_deleted = 0 ORDER BY id LIMIT 9, 1), @property1);

SET @proof1 = '/uploads/bookings/1/payment-proof/payment-proof-1774411817206-951907990.jpg';
SET @proof2 = '/uploads/bookings/2/payment-proof/payment-proof-1774412024915-124544476.jpg';
SET @proof3 = '/uploads/bookings/3/payment-proof/payment-proof-1774412149312-741331019.jpg';

DELETE r
FROM reviews r
JOIN bookings b ON b.id = r.booking_id
WHERE b.booking_code LIKE 'DEMO%';

DELETE FROM bookings
WHERE booking_code LIKE 'DEMO%';

INSERT INTO bookings (
  booking_code,
  property_id,
  guest_id,
  check_in,
  check_out,
  nights,
  guests,
  total_price,
  status,
  payment_method,
  payment_reference,
  payment_status,
  payment_proof_image,
  payment_submitted_at,
  confirmed_by,
  confirmed_at,
  rejection_reason,
  host_note,
  checkin_instructions,
  created_at
)
SELECT
  'DEMOREV001',
  p.id,
  @guest1,
  DATE_SUB(CURDATE(), INTERVAL 14 DAY),
  DATE_SUB(CURDATE(), INTERVAL 12 DAY),
  2,
  2,
  ROUND(p.price_per_night * 2, 2),
  'confirmed',
  'bank_transfer',
  'PAYDEMOREV001',
  'verified',
  @proof1,
  DATE_SUB(NOW(), INTERVAL 15 DAY),
  @admin_id,
  DATE_SUB(NOW(), INTERVAL 14 DAY),
  NULL,
  'Early check-in was approved for this guest.',
  'Collect the key from the front desk after 2:00 PM.',
  DATE_SUB(NOW(), INTERVAL 16 DAY)
FROM properties p
WHERE p.id = @property1;

INSERT INTO bookings (
  booking_code, property_id, guest_id, check_in, check_out, nights, guests, total_price,
  status, payment_method, payment_reference, payment_status, payment_proof_image,
  payment_submitted_at, confirmed_by, confirmed_at, rejection_reason, host_note,
  checkin_instructions, created_at
)
SELECT
  'DEMOREV002',
  p.id,
  @guest2,
  DATE_SUB(CURDATE(), INTERVAL 10 DAY),
  DATE_SUB(CURDATE(), INTERVAL 7 DAY),
  3,
  3,
  ROUND(p.price_per_night * 3, 2),
  'confirmed',
  'bank_transfer',
  'PAYDEMOREV002',
  'verified',
  @proof2,
  DATE_SUB(NOW(), INTERVAL 11 DAY),
  @admin_id,
  DATE_SUB(NOW(), INTERVAL 10 DAY),
  NULL,
  'A late checkout request was accepted.',
  'The smart lock code will be active after 3:00 PM.',
  DATE_SUB(NOW(), INTERVAL 12 DAY)
FROM properties p
WHERE p.id = @property2;

INSERT INTO bookings (
  booking_code, property_id, guest_id, check_in, check_out, nights, guests, total_price,
  status, payment_method, payment_reference, payment_status, payment_proof_image,
  payment_submitted_at, confirmed_by, confirmed_at, rejection_reason, host_note,
  checkin_instructions, created_at
)
SELECT
  'DEMOREV003',
  p.id,
  @guest3,
  DATE_SUB(CURDATE(), INTERVAL 6 DAY),
  DATE_SUB(CURDATE(), INTERVAL 4 DAY),
  2,
  1,
  ROUND(p.price_per_night * 2, 2),
  'confirmed',
  'bank_transfer',
  'PAYDEMOREV003',
  'verified',
  @proof3,
  DATE_SUB(NOW(), INTERVAL 7 DAY),
  @admin_id,
  DATE_SUB(NOW(), INTERVAL 6 DAY),
  NULL,
  'The guest asked for a quiet room.',
  'Please call the host 20 minutes before arrival.',
  DATE_SUB(NOW(), INTERVAL 8 DAY)
FROM properties p
WHERE p.id = @property3;

INSERT INTO bookings (
  booking_code, property_id, guest_id, check_in, check_out, nights, guests, total_price,
  status, payment_method, payment_reference, payment_status, payment_proof_image,
  payment_submitted_at, confirmed_by, confirmed_at, rejection_reason, host_note,
  checkin_instructions, created_at
)
SELECT
  'DEMOALREADY001',
  p.id,
  @guest4,
  DATE_SUB(CURDATE(), INTERVAL 20 DAY),
  DATE_SUB(CURDATE(), INTERVAL 17 DAY),
  3,
  2,
  ROUND(p.price_per_night * 3, 2),
  'confirmed',
  'bank_transfer',
  'PAYDEMOALREADY001',
  'verified',
  @proof1,
  DATE_SUB(NOW(), INTERVAL 21 DAY),
  @admin_id,
  DATE_SUB(NOW(), INTERVAL 20 DAY),
  NULL,
  'Airport pickup was arranged.',
  'The apartment key is in the lockbox near the main gate.',
  DATE_SUB(NOW(), INTERVAL 22 DAY)
FROM properties p
WHERE p.id = @property4;

INSERT INTO bookings (
  booking_code, property_id, guest_id, check_in, check_out, nights, guests, total_price,
  status, payment_method, payment_reference, payment_status, payment_proof_image,
  payment_submitted_at, confirmed_by, confirmed_at, rejection_reason, host_note,
  checkin_instructions, created_at
)
SELECT
  'DEMOPROOF001',
  p.id,
  @guest5,
  DATE_ADD(CURDATE(), INTERVAL 4 DAY),
  DATE_ADD(CURDATE(), INTERVAL 7 DAY),
  3,
  2,
  ROUND(p.price_per_night * 3, 2),
  'pending',
  'bank_transfer',
  'PAYDEMOPROOF001',
  'proof_uploaded',
  @proof2,
  DATE_SUB(NOW(), INTERVAL 6 HOUR),
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  DATE_SUB(NOW(), INTERVAL 1 DAY)
FROM properties p
WHERE p.id = @property5;

INSERT INTO bookings (
  booking_code, property_id, guest_id, check_in, check_out, nights, guests, total_price,
  status, payment_method, payment_reference, payment_status, payment_proof_image,
  payment_submitted_at, confirmed_by, confirmed_at, rejection_reason, host_note,
  checkin_instructions, created_at
)
SELECT
  'DEMOPROOF002',
  p.id,
  @guest6,
  DATE_ADD(CURDATE(), INTERVAL 6 DAY),
  DATE_ADD(CURDATE(), INTERVAL 8 DAY),
  2,
  4,
  ROUND(p.price_per_night * 2, 2),
  'pending',
  'bank_transfer',
  'PAYDEMOPROOF002',
  'proof_uploaded',
  @proof3,
  DATE_SUB(NOW(), INTERVAL 3 HOUR),
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  DATE_SUB(NOW(), INTERVAL 12 HOUR)
FROM properties p
WHERE p.id = @property6;

INSERT INTO bookings (
  booking_code, property_id, guest_id, check_in, check_out, nights, guests, total_price,
  status, payment_method, payment_reference, payment_status, payment_proof_image,
  payment_submitted_at, confirmed_by, confirmed_at, rejection_reason, host_note,
  checkin_instructions, created_at
)
SELECT
  'DEMOUNPAID001',
  p.id,
  @guest1,
  DATE_ADD(CURDATE(), INTERVAL 8 DAY),
  DATE_ADD(CURDATE(), INTERVAL 10 DAY),
  2,
  2,
  ROUND(p.price_per_night * 2, 2),
  'pending',
  'bank_transfer',
  'PAYDEMOUNPAID001',
  'unpaid',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NOW()
FROM properties p
WHERE p.id = @property7;

INSERT INTO bookings (
  booking_code, property_id, guest_id, check_in, check_out, nights, guests, total_price,
  status, payment_method, payment_reference, payment_status, payment_proof_image,
  payment_submitted_at, confirmed_by, confirmed_at, rejection_reason, host_note,
  checkin_instructions, created_at
)
SELECT
  'DEMOUPCOMING001',
  p.id,
  @guest2,
  DATE_ADD(CURDATE(), INTERVAL 2 DAY),
  DATE_ADD(CURDATE(), INTERVAL 5 DAY),
  3,
  2,
  ROUND(p.price_per_night * 3, 2),
  'confirmed',
  'bank_transfer',
  'PAYDEMOUPCOMING001',
  'verified',
  @proof1,
  DATE_SUB(NOW(), INTERVAL 2 DAY),
  @admin_id,
  DATE_SUB(NOW(), INTERVAL 1 DAY),
  NULL,
  'The host prepared a welcome note.',
  'Check in after 2:30 PM and message the host on arrival.',
  DATE_SUB(NOW(), INTERVAL 4 DAY)
FROM properties p
WHERE p.id = @property8;

INSERT INTO bookings (
  booking_code, property_id, guest_id, check_in, check_out, nights, guests, total_price,
  status, payment_method, payment_reference, payment_status, payment_proof_image,
  payment_submitted_at, confirmed_by, confirmed_at, rejection_reason, host_note,
  checkin_instructions, created_at
)
SELECT
  'DEMOCANCEL001',
  p.id,
  @guest3,
  DATE_SUB(CURDATE(), INTERVAL 3 DAY),
  DATE_SUB(CURDATE(), INTERVAL 1 DAY),
  2,
  2,
  ROUND(p.price_per_night * 2, 2),
  'cancelled',
  'bank_transfer',
  'PAYDEMOCANCEL001',
  'rejected',
  @proof2,
  DATE_SUB(NOW(), INTERVAL 4 DAY),
  @admin_id,
  DATE_SUB(NOW(), INTERVAL 3 DAY),
  'The uploaded payment proof did not match the transfer amount.',
  'Please contact support to resubmit a valid transfer proof.',
  NULL,
  DATE_SUB(NOW(), INTERVAL 5 DAY)
FROM properties p
WHERE p.id = @property9;

INSERT INTO bookings (
  booking_code, property_id, guest_id, check_in, check_out, nights, guests, total_price,
  status, payment_method, payment_reference, payment_status, payment_proof_image,
  payment_submitted_at, confirmed_by, confirmed_at, rejection_reason, host_note,
  checkin_instructions, created_at
)
SELECT
  'DEMOCANCEL002',
  p.id,
  @guest4,
  DATE_ADD(CURDATE(), INTERVAL 12 DAY),
  DATE_ADD(CURDATE(), INTERVAL 15 DAY),
  3,
  5,
  ROUND(p.price_per_night * 3, 2),
  'cancelled',
  'bank_transfer',
  'PAYDEMOCANCEL002',
  'rejected',
  @proof3,
  DATE_SUB(NOW(), INTERVAL 2 DAY),
  @admin_id,
  DATE_SUB(NOW(), INTERVAL 1 DAY),
  'The transfer note was missing the required booking reference.',
  'The reservation has been released. Please create a new booking if needed.',
  NULL,
  DATE_SUB(NOW(), INTERVAL 3 DAY)
FROM properties p
WHERE p.id = @property10;

INSERT INTO reviews (
  booking_id,
  property_id,
  guest_id,
  rating,
  comment,
  created_at
)
SELECT
  b.id,
  b.property_id,
  b.guest_id,
  5,
  'The stay was excellent. The host was responsive and check-in was very smooth.',
  DATE_SUB(NOW(), INTERVAL 16 DAY)
FROM bookings b
WHERE b.booking_code = 'DEMOALREADY001';


-- ------------------------------------------------------------
-- Booking chat samples
-- ------------------------------------------------------------
-- Booking chat sample seed
-- This section adds conversation threads for the seeded demo bookings.

DELETE m
FROM booking_messages m
JOIN booking_conversations c ON c.id = m.conversation_id
JOIN bookings b ON b.id = c.booking_id
WHERE b.booking_code IN ('DEMOREV001', 'DEMOREV002', 'DEMOALREADY001');

DELETE c
FROM booking_conversations c
JOIN bookings b ON b.id = c.booking_id
WHERE b.booking_code IN ('DEMOREV001', 'DEMOREV002', 'DEMOALREADY001');

INSERT INTO booking_conversations (booking_id)
SELECT id
FROM bookings
WHERE booking_code IN ('DEMOREV001', 'DEMOREV002', 'DEMOALREADY001');

INSERT INTO booking_messages (conversation_id, sender_id, message, created_at)
SELECT
  c.id,
  b.guest_id,
  'Hi, we expect to arrive around 3 PM. Please let us know if early check-in is possible.',
  DATE_SUB(NOW(), INTERVAL 2 DAY)
FROM booking_conversations c
JOIN bookings b ON b.id = c.booking_id
WHERE b.booking_code = 'DEMOREV001';

INSERT INTO booking_messages (conversation_id, sender_id, message, created_at)
SELECT
  c.id,
  p.host_id,
  'Thanks for the update. Standard check-in is from 2 PM, so 3 PM is completely fine.',
  DATE_SUB(NOW(), INTERVAL 2 DAY) + INTERVAL 35 MINUTE
FROM booking_conversations c
JOIN bookings b ON b.id = c.booking_id
JOIN properties p ON p.id = b.property_id
WHERE b.booking_code = 'DEMOREV001';

INSERT INTO booking_messages (conversation_id, sender_id, message, created_at)
SELECT
  c.id,
  1,
  'Admin note: your booking has been fully verified. If you need support during check-in, feel free to keep using this thread.',
  DATE_SUB(NOW(), INTERVAL 1 DAY)
FROM booking_conversations c
JOIN bookings b ON b.id = c.booking_id
WHERE b.booking_code = 'DEMOREV001';

INSERT INTO booking_messages (conversation_id, sender_id, message, created_at)
SELECT
  c.id,
  b.guest_id,
  'Could you share the exact parking location before arrival?',
  DATE_SUB(NOW(), INTERVAL 1 DAY)
FROM booking_conversations c
JOIN bookings b ON b.id = c.booking_id
WHERE b.booking_code = 'DEMOREV002';

INSERT INTO booking_messages (conversation_id, sender_id, message, created_at)
SELECT
  c.id,
  p.host_id,
  'Parking slot B12 is reserved for your stay. You can head straight to the basement when you arrive.',
  DATE_SUB(NOW(), INTERVAL 1 DAY) + INTERVAL 20 MINUTE
FROM booking_conversations c
JOIN bookings b ON b.id = c.booking_id
JOIN properties p ON p.id = b.property_id
WHERE b.booking_code = 'DEMOREV002';

INSERT INTO booking_messages (conversation_id, sender_id, message, created_at)
SELECT
  c.id,
  b.guest_id,
  'Thank you for the hospitality. We have just checked out and everything went smoothly.',
  DATE_SUB(NOW(), INTERVAL 5 HOUR)
FROM booking_conversations c
JOIN bookings b ON b.id = c.booking_id
WHERE b.booking_code = 'DEMOALREADY001';

INSERT INTO booking_messages (conversation_id, sender_id, message, created_at)
SELECT
  c.id,
  p.host_id,
  'Happy to hear that. Thank you for staying with us and for leaving a review.',
  DATE_SUB(NOW(), INTERVAL 4 HOUR)
FROM booking_conversations c
JOIN bookings b ON b.id = c.booking_id
JOIN properties p ON p.id = b.property_id
WHERE b.booking_code = 'DEMOALREADY001';


