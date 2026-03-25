-- Booking sample seed
-- Prerequisites:
-- 1. Run update_booking_payment_flow.sql
-- 2. Run update_review_booking_link.sql
-- 3. Make sure there are approved properties and guest users in the database
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
  ROUND(p.price_per_night * 2 * 1.12, 2),
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
  ROUND(p.price_per_night * 3 * 1.12, 2),
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
  ROUND(p.price_per_night * 2 * 1.12, 2),
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
  ROUND(p.price_per_night * 3 * 1.12, 2),
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
  ROUND(p.price_per_night * 3 * 1.12, 2),
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
  ROUND(p.price_per_night * 2 * 1.12, 2),
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
  ROUND(p.price_per_night * 2 * 1.12, 2),
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
  ROUND(p.price_per_night * 3 * 1.12, 2),
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
  ROUND(p.price_per_night * 2 * 1.12, 2),
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
  ROUND(p.price_per_night * 3 * 1.12, 2),
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
