-- Booking payment proof flow migration
-- Run this file before testing the new booking flow.

SET @schema_name = DATABASE();

SET @column_exists = (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = 'bookings'
    AND COLUMN_NAME = 'booking_code'
);
SET @sql = IF(
  @column_exists = 0,
  'ALTER TABLE bookings ADD COLUMN booking_code VARCHAR(40) NULL AFTER id',
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
  @column_exists = 0,
  'ALTER TABLE bookings ADD COLUMN payment_method VARCHAR(50) NOT NULL DEFAULT ''bank_transfer'' AFTER status',
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
  @column_exists = 0,
  'ALTER TABLE bookings ADD COLUMN payment_reference VARCHAR(80) NULL AFTER payment_method',
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
  @column_exists = 0,
  'ALTER TABLE bookings ADD COLUMN payment_status ENUM(''unpaid'', ''proof_uploaded'', ''verified'', ''rejected'') NOT NULL DEFAULT ''unpaid'' AFTER payment_reference',
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
  @column_exists = 0,
  'ALTER TABLE bookings ADD COLUMN payment_proof_image VARCHAR(255) NULL AFTER payment_status',
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
  @column_exists = 0,
  'ALTER TABLE bookings ADD COLUMN payment_submitted_at DATETIME NULL AFTER payment_proof_image',
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
  @column_exists = 0,
  'ALTER TABLE bookings ADD COLUMN confirmed_by INT NULL AFTER payment_submitted_at',
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
  @column_exists = 0,
  'ALTER TABLE bookings ADD COLUMN confirmed_at DATETIME NULL AFTER confirmed_by',
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
  @column_exists = 0,
  'ALTER TABLE bookings ADD COLUMN rejection_reason TEXT NULL AFTER confirmed_at',
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
  @column_exists = 0,
  'ALTER TABLE bookings ADD COLUMN host_note TEXT NULL AFTER rejection_reason',
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
  @column_exists = 0,
  'ALTER TABLE bookings ADD COLUMN checkin_instructions TEXT NULL AFTER host_note',
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
  @index_exists = 0,
  'ALTER TABLE bookings ADD UNIQUE KEY idx_bookings_booking_code (booking_code)',
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
  @index_exists = 0,
  'ALTER TABLE bookings ADD KEY idx_bookings_confirmed_by (confirmed_by)',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

UPDATE bookings
SET booking_code = CONCAT('BK', DATE_FORMAT(created_at, '%Y%m%d'), LPAD(id, 4, '0'))
WHERE booking_code IS NULL OR booking_code = '';

UPDATE bookings
SET payment_method = 'bank_transfer'
WHERE payment_method IS NULL OR payment_method = '';

UPDATE bookings
SET payment_reference = CONCAT('HSBK', LPAD(id, 6, '0'))
WHERE payment_reference IS NULL OR payment_reference = '';

UPDATE bookings
SET payment_status = CASE
  WHEN status = 'confirmed' THEN 'verified'
  WHEN status = 'cancelled' THEN 'rejected'
  ELSE 'unpaid'
END
WHERE payment_status IS NULL
   OR payment_status = '';
