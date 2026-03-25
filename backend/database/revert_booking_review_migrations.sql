-- Rollback helper for accidental execution on the wrong database
-- Only run this on the database that was modified by mistake.
-- Do NOT run this on booking_db unless you intentionally want to remove
-- the booking payment-proof and review-booking changes.

SET @schema_name = DATABASE();

-- ---------------------------------------
-- Roll back review-booking migration
-- ---------------------------------------

SET @fk_exists = (
  SELECT COUNT(*)
  FROM information_schema.KEY_COLUMN_USAGE
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'reviews'
    AND CONSTRAINT_NAME = 'reviews_ibfk_3'
    AND COLUMN_NAME = 'booking_id'
);
SET @sql = IF(
  @fk_exists > 0,
  'ALTER TABLE reviews DROP FOREIGN KEY reviews_ibfk_3',
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
  @index_exists > 0,
  'ALTER TABLE reviews DROP INDEX idx_reviews_booking_id',
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
    AND INDEX_NAME = 'idx_reviews_property_guest'
);
SET @sql = IF(
  @index_exists > 0,
  'ALTER TABLE reviews DROP INDEX idx_reviews_property_guest',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists = (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'reviews'
    AND COLUMN_NAME = 'booking_id'
);
SET @sql = IF(
  @column_exists > 0,
  'ALTER TABLE reviews DROP COLUMN booking_id',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ---------------------------------------
-- Roll back booking payment-proof migration
-- ---------------------------------------

SET @fk_exists = (
  SELECT COUNT(*)
  FROM information_schema.KEY_COLUMN_USAGE
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'bookings'
    AND COLUMN_NAME = 'confirmed_by'
    AND REFERENCED_TABLE_NAME IS NOT NULL
);
SET @fk_name = (
  SELECT CONSTRAINT_NAME
  FROM information_schema.KEY_COLUMN_USAGE
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'bookings'
    AND COLUMN_NAME = 'confirmed_by'
    AND REFERENCED_TABLE_NAME IS NOT NULL
  LIMIT 1
);
SET @sql = IF(
  @fk_exists > 0,
  CONCAT('ALTER TABLE bookings DROP FOREIGN KEY ', @fk_name),
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @index_exists = (
  SELECT COUNT(*)
  FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'bookings'
    AND INDEX_NAME = 'idx_bookings_confirmed_by'
);
SET @sql = IF(
  @index_exists > 0,
  'ALTER TABLE bookings DROP INDEX idx_bookings_confirmed_by',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @index_exists = (
  SELECT COUNT(*)
  FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'bookings'
    AND INDEX_NAME = 'idx_bookings_booking_code'
);
SET @sql = IF(
  @index_exists > 0,
  'ALTER TABLE bookings DROP INDEX idx_bookings_booking_code',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists = (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'bookings'
    AND COLUMN_NAME = 'checkin_instructions'
);
SET @sql = IF(
  @column_exists > 0,
  'ALTER TABLE bookings DROP COLUMN checkin_instructions',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists = (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'bookings'
    AND COLUMN_NAME = 'host_note'
);
SET @sql = IF(
  @column_exists > 0,
  'ALTER TABLE bookings DROP COLUMN host_note',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists = (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'bookings'
    AND COLUMN_NAME = 'rejection_reason'
);
SET @sql = IF(
  @column_exists > 0,
  'ALTER TABLE bookings DROP COLUMN rejection_reason',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists = (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'bookings'
    AND COLUMN_NAME = 'confirmed_at'
);
SET @sql = IF(
  @column_exists > 0,
  'ALTER TABLE bookings DROP COLUMN confirmed_at',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists = (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'bookings'
    AND COLUMN_NAME = 'confirmed_by'
);
SET @sql = IF(
  @column_exists > 0,
  'ALTER TABLE bookings DROP COLUMN confirmed_by',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists = (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'bookings'
    AND COLUMN_NAME = 'payment_submitted_at'
);
SET @sql = IF(
  @column_exists > 0,
  'ALTER TABLE bookings DROP COLUMN payment_submitted_at',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists = (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'bookings'
    AND COLUMN_NAME = 'payment_proof_image'
);
SET @sql = IF(
  @column_exists > 0,
  'ALTER TABLE bookings DROP COLUMN payment_proof_image',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists = (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'bookings'
    AND COLUMN_NAME = 'payment_status'
);
SET @sql = IF(
  @column_exists > 0,
  'ALTER TABLE bookings DROP COLUMN payment_status',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists = (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'bookings'
    AND COLUMN_NAME = 'payment_reference'
);
SET @sql = IF(
  @column_exists > 0,
  'ALTER TABLE bookings DROP COLUMN payment_reference',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists = (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'bookings'
    AND COLUMN_NAME = 'payment_method'
);
SET @sql = IF(
  @column_exists > 0,
  'ALTER TABLE bookings DROP COLUMN payment_method',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists = (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'bookings'
    AND COLUMN_NAME = 'booking_code'
);
SET @sql = IF(
  @column_exists > 0,
  'ALTER TABLE bookings DROP COLUMN booking_code',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
