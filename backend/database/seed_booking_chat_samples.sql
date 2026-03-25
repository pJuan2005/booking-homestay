-- Demo seed for booking chat conversations.
-- Recommended prerequisites:
-- 1. Run update_booking_chat_flow.sql
-- 2. Run seed_booking_samples.sql

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
