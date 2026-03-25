-- Review full-slice migration
-- Links each review to a specific booking so that each confirmed stay can only be reviewed once.

SET @schema_name = DATABASE();

SET @column_exists = (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'reviews'
    AND COLUMN_NAME = 'booking_id'
);
SET @sql = IF(
  @column_exists = 0,
  'ALTER TABLE reviews ADD COLUMN booking_id INT NULL AFTER id',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

UPDATE reviews r
JOIN bookings b
  ON b.property_id = r.property_id
 AND b.guest_id = r.guest_id
SET r.booking_id = b.id
WHERE r.booking_id IS NULL
  AND b.status = 'confirmed'
  AND NOT EXISTS (
    SELECT 1
    FROM bookings b2
    WHERE b2.property_id = r.property_id
      AND b2.guest_id = r.guest_id
      AND b2.status = 'confirmed'
      AND b2.id <> b.id
  );

SET @index_exists = (
  SELECT COUNT(*)
  FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'reviews'
    AND INDEX_NAME = 'idx_reviews_property_guest'
);
SET @sql = IF(
  @index_exists = 0,
  'ALTER TABLE reviews ADD KEY idx_reviews_property_guest (property_id, guest_id)',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @index_exists = (
  SELECT COUNT(*)
  FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'reviews'
    AND INDEX_NAME = 'property_id'
);
SET @sql = IF(
  @index_exists > 0,
  'ALTER TABLE reviews DROP INDEX property_id',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @index_exists = (
  SELECT COUNT(*)
  FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'reviews'
    AND INDEX_NAME = 'idx_reviews_booking_id'
);
SET @sql = IF(
  @index_exists = 0,
  'ALTER TABLE reviews ADD UNIQUE KEY idx_reviews_booking_id (booking_id)',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @foreign_key_exists = (
  SELECT COUNT(*)
  FROM information_schema.TABLE_CONSTRAINTS
  WHERE CONSTRAINT_SCHEMA = @schema_name
    AND TABLE_NAME = 'reviews'
    AND CONSTRAINT_NAME = 'reviews_ibfk_3'
    AND CONSTRAINT_TYPE = 'FOREIGN KEY'
);
SET @sql = IF(
  @foreign_key_exists = 0,
  'ALTER TABLE reviews ADD CONSTRAINT reviews_ibfk_3 FOREIGN KEY (booking_id) REFERENCES bookings (id)',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
