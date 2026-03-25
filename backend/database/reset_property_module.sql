START TRANSACTION;

SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM reviews;
DELETE FROM bookings;
DELETE FROM property_amenities;
DELETE FROM property_images;
DELETE FROM properties;

ALTER TABLE reviews AUTO_INCREMENT = 1;
ALTER TABLE bookings AUTO_INCREMENT = 1;
ALTER TABLE property_images AUTO_INCREMENT = 1;
ALTER TABLE properties AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;

COMMIT;

-- After running this script, also remove uploaded files from:
-- backend/uploads/properties
--
-- This reset keeps:
-- - users
-- - amenities
--
-- This reset clears:
-- - properties
-- - property_images
-- - property_amenities
-- - bookings
-- - reviews
