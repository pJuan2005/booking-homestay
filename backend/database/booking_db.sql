-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 24, 2026 at 05:14 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `amenities`
--

CREATE TABLE `amenities` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `app_settings`
--

CREATE TABLE `app_settings` (
  `id` int(11) NOT NULL,
  `setting_key` varchar(100) NOT NULL,
  `setting_value` varchar(255) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `booking_conversations`
--

CREATE TABLE `booking_conversations` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `booking_messages`
--

CREATE TABLE `booking_messages` (
  `id` int(11) NOT NULL,
  `conversation_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `booking_code` varchar(40) DEFAULT NULL,
  `property_id` int(11) NOT NULL,
  `guest_id` int(11) NOT NULL,
  `check_in` date NOT NULL,
  `check_out` date NOT NULL,
  `nights` int(11) DEFAULT NULL,
  `guests` int(11) NOT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
  `payment_method` varchar(50) NOT NULL DEFAULT 'bank_transfer',
  `payment_reference` varchar(80) DEFAULT NULL,
  `payment_status` enum('unpaid','proof_uploaded','verified','rejected') NOT NULL DEFAULT 'unpaid',
  `payment_proof_image` varchar(255) DEFAULT NULL,
  `payment_submitted_at` datetime DEFAULT NULL,
  `confirmed_by` int(11) DEFAULT NULL,
  `confirmed_at` datetime DEFAULT NULL,
  `rejection_reason` text DEFAULT NULL,
  `host_note` text DEFAULT NULL,
  `checkin_instructions` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` int(11) NOT NULL,
  `host_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `property_type` varchar(100) NOT NULL,
  `price_per_night` decimal(10,2) NOT NULL,
  `street_address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `max_guests` int(11) DEFAULT NULL,
  `bedrooms` int(11) DEFAULT NULL,
  `bathrooms` int(11) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `cover_image` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `property_amenities`
--

CREATE TABLE `property_amenities` (
  `property_id` int(11) NOT NULL,
  `amenity_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `property_images`
--

CREATE TABLE `property_images` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `property_id` int(11) NOT NULL,
  `guest_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('guest','admin','host') DEFAULT 'guest',
  `phone` varchar(20) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `languages` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `status` enum('active','blocked') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `amenities`
--
ALTER TABLE `amenities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `app_settings`
--
ALTER TABLE `app_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_app_settings_key` (`setting_key`);

--
-- Indexes for table `booking_conversations`
--
ALTER TABLE `booking_conversations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_booking_conversations_booking_id` (`booking_id`);

--
-- Indexes for table `booking_messages`
--
ALTER TABLE `booking_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_booking_messages_conversation_id` (`conversation_id`),
  ADD KEY `idx_booking_messages_sender_id` (`sender_id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_bookings_booking_code` (`booking_code`),
  ADD KEY `property_id` (`property_id`),
  ADD KEY `guest_id` (`guest_id`),
  ADD KEY `idx_bookings_confirmed_by` (`confirmed_by`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `host_id` (`host_id`);

--
-- Indexes for table `property_amenities`
--
ALTER TABLE `property_amenities`
  ADD PRIMARY KEY (`property_id`,`amenity_id`),
  ADD KEY `amenity_id` (`amenity_id`);

--
-- Indexes for table `property_images`
--
ALTER TABLE `property_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `property_id` (`property_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_reviews_booking_id` (`booking_id`),
  ADD KEY `guest_id` (`guest_id`),
  ADD KEY `idx_reviews_property_guest` (`property_id`,`guest_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `amenities`
--
ALTER TABLE `amenities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `app_settings`
--
ALTER TABLE `app_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `booking_conversations`
--
ALTER TABLE `booking_conversations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `booking_messages`
--
ALTER TABLE `booking_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `property_images`
--
ALTER TABLE `property_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `booking_conversations`
  ADD CONSTRAINT `booking_conversations_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`);

--
-- Constraints for table `booking_messages`
--
ALTER TABLE `booking_messages`
  ADD CONSTRAINT `booking_messages_ibfk_1` FOREIGN KEY (`conversation_id`) REFERENCES `booking_conversations` (`id`),
  ADD CONSTRAINT `booking_messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`guest_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`confirmed_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`host_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `property_amenities`
--
ALTER TABLE `property_amenities`
  ADD CONSTRAINT `property_amenities_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`),
  ADD CONSTRAINT `property_amenities_ibfk_2` FOREIGN KEY (`amenity_id`) REFERENCES `amenities` (`id`);

--
-- Constraints for table `property_images`
--
ALTER TABLE `property_images`
  ADD CONSTRAINT `property_images_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`guest_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
INSERT INTO users (id, full_name, email, password, role, phone, location, languages, bio)
VALUES
(1,'Admin User','admin@mail.com','123456','admin','0900000001','Vietnam','English','System admin'),
(2,'Nguyen Van A','host1@mail.com','123456','host','0900000002','Hanoi','Vietnamese','Host in Hanoi'),
(3,'Tran Thi B','host2@mail.com','123456','host','0900000003','Da Nang','Vietnamese','Host in Da Nang'),
(4,'Pham Van C','host3@mail.com','123456','host','0900000004','HCM','Vietnamese','Host in Saigon'),
(5,'Guest One','guest1@mail.com','123456','guest','0900000005','USA','English','Traveler'),
(6,'Guest Two','guest2@mail.com','123456','guest','0900000006','UK','English','Traveler'),
(7,'Guest Three','guest3@mail.com','123456','guest','0900000007','France','French','Traveler'),
(8,'Guest Four','guest4@mail.com','123456','guest','0900000008','Germany','German','Traveler'),
(9,'Guest Five','guest5@mail.com','123456','guest','0900000009','Japan','Japanese','Traveler'),
(10,'Guest Six','guest6@mail.com','123456','guest','0900000010','Korea','Korean','Traveler');

INSERT INTO amenities (id,name) VALUES
(1,'Wifi'),
(2,'Air Conditioning'),
(3,'Swimming Pool'),
(4,'Kitchen'),
(5,'Free Parking'),
(6,'TV'),
(7,'Washing Machine'),
(8,'Balcony'),
(9,'Workspace'),
(10,'Hot Water');

INSERT INTO app_settings (setting_key, setting_value) VALUES
('usd_to_vnd_rate', '25000'),
('platform_commission_rate', '0.1');

INSERT INTO properties
(id,host_id,title,description,property_type,price_per_night,street_address,city,country,max_guests,bedrooms,bathrooms,status,cover_image)
VALUES
(1,2,'Luxury Beach Villa','Beautiful villa near beach','Villa',200,'123 Beach Road','Da Nang','Vietnam',6,3,2,'approved','/img/property1.jpg'),
(2,2,'Modern Apartment','City center apartment','Apartment',120,'45 Tran Hung Dao','Hanoi','Vietnam',4,2,1,'approved','/img/property2.jpg'),
(3,3,'Cozy Studio','Small studio for travelers','Studio',70,'99 Le Loi','Da Nang','Vietnam',2,1,1,'approved','/img/property3.jpg'),
(4,3,'Mountain View House','House with mountain view','House',150,'88 Hill Road','Sapa','Vietnam',5,2,2,'approved','/img/property4.jpg'),
(5,4,'Luxury Condo','Modern condo with pool','Condo',180,'12 Nguyen Hue','HCM','Vietnam',4,2,2,'approved','/img/property5.jpg'),
(6,4,'Lake House','Peaceful lake house','House',160,'Lake Street','Hanoi','Vietnam',6,3,2,'approved','/img/property6.jpg'),
(7,2,'Garden Villa','Villa with garden','Villa',220,'Green Street','Da Lat','Vietnam',8,4,3,'approved','/img/property7.jpg'),
(8,3,'City Studio','Affordable studio','Studio',60,'City Center','Hanoi','Vietnam',2,1,1,'approved','/img/property8.jpg'),
(9,4,'Beach Apartment','Apartment near sea','Apartment',110,'Ocean Road','Nha Trang','Vietnam',3,1,1,'approved','/img/property9.jpg'),
(10,2,'Penthouse','Luxury penthouse','Apartment',300,'Sky Tower','HCM','Vietnam',6,3,3,'approved','/img/property10.jpg');

INSERT INTO property_images (property_id,image_url) VALUES
(1,'/img/property1.jpg'),
(2,'/img/property2.jpg'),
(3,'/img/property3.jpg'),
(4,'/img/property4.jpg'),
(5,'/img/property5.jpg'),
(6,'/img/property6.jpg'),
(7,'/img/property7.jpg'),
(8,'/img/property8.jpg'),
(9,'/img/property9.jpg'),
(10,'/img/property10.jpg');

INSERT INTO property_amenities (property_id,amenity_id) VALUES
(1,1),(1,3),
(2,1),(2,4),
(3,1),(3,6),
(4,2),(4,5),
(5,1),(5,3),
(6,1),(6,7),
(7,1),(7,8),
(8,1),(8,9),
(9,1),(9,4),
(10,1),(10,3);

INSERT INTO bookings
(booking_code,property_id,guest_id,check_in,check_out,nights,guests,total_price,status,payment_method,payment_reference,payment_status,payment_proof_image,payment_submitted_at,confirmed_by,confirmed_at,rejection_reason,host_note,checkin_instructions)
VALUES
(CONCAT('BK', DATE_FORMAT(NOW(), '%Y%m%d'), '0001'),1,5,'2026-03-10','2026-03-12',2,2,400,'confirmed','bank_transfer','HSBK000001','verified',NULL,'2026-03-09 12:30:00',2,'2026-03-09 14:00:00',NULL,'Welcome drink included.','Self check-in after 2 PM. Door code: 2580#'),
(CONCAT('BK', DATE_FORMAT(NOW(), '%Y%m%d'), '0002'),2,6,'2026-03-15','2026-03-18',3,2,360,'confirmed','bank_transfer','HSBK000002','verified',NULL,'2026-03-13 10:00:00',1,'2026-03-13 12:00:00',NULL,'Please bring an ID card at check-in.','Reception desk is on floor 1.'),
(CONCAT('BK', DATE_FORMAT(NOW(), '%Y%m%d'), '0003'),3,7,'2026-03-20','2026-03-22',2,1,140,'pending','bank_transfer','HSBK000003','unpaid',NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(CONCAT('BK', DATE_FORMAT(NOW(), '%Y%m%d'), '0004'),4,8,'2026-03-05','2026-03-07',2,3,300,'confirmed','bank_transfer','HSBK000004','verified',NULL,'2026-03-03 09:15:00',3,'2026-03-03 18:45:00',NULL,'Breakfast prepared for 3 guests.','Meet the host at the garden gate.'),
(CONCAT('BK', DATE_FORMAT(NOW(), '%Y%m%d'), '0005'),5,9,'2026-03-12','2026-03-14',2,2,360,'pending','bank_transfer','HSBK000005','proof_uploaded',NULL,'2026-03-11 21:30:00',NULL,NULL,NULL,NULL,NULL),
(CONCAT('BK', DATE_FORMAT(NOW(), '%Y%m%d'), '0006'),6,10,'2026-03-18','2026-03-20',2,4,320,'confirmed','bank_transfer','HSBK000006','verified',NULL,'2026-03-16 08:00:00',4,'2026-03-16 11:20:00',NULL,'Parking is included in the rate.','Parking slot B12 is reserved for you.'),
(CONCAT('BK', DATE_FORMAT(NOW(), '%Y%m%d'), '0007'),7,5,'2026-03-25','2026-03-28',3,4,660,'confirmed','bank_transfer','HSBK000007','verified',NULL,'2026-03-22 14:00:00',2,'2026-03-22 18:10:00',NULL,'Pool closes at 9 PM.','Caretaker will hand over the key at arrival.'),
(CONCAT('BK', DATE_FORMAT(NOW(), '%Y%m%d'), '0008'),8,6,'2026-03-01','2026-03-02',1,1,60,'confirmed','bank_transfer','HSBK000008','verified',NULL,'2026-02-27 10:00:00',3,'2026-02-27 11:45:00',NULL,NULL,'Gate password: HUE2026'),
(CONCAT('BK', DATE_FORMAT(NOW(), '%Y%m%d'), '0009'),9,7,'2026-03-10','2026-03-13',3,2,330,'cancelled','bank_transfer','HSBK000009','rejected',NULL,'2026-03-08 15:20:00',1,'2026-03-08 19:00:00','The payment proof did not match the transfer amount.',NULL,NULL),
(CONCAT('BK', DATE_FORMAT(NOW(), '%Y%m%d'), '0010'),10,8,'2026-03-15','2026-03-17',2,3,600,'confirmed','bank_transfer','HSBK000010','verified',NULL,'2026-03-12 13:00:00',1,'2026-03-12 15:30:00',NULL,'Mountain weather can be cold at night.','The cabin key is in the smart lock box beside the front door.');

INSERT INTO reviews (booking_id,property_id,guest_id,rating,comment)
VALUES
(1,1,5,5,'Amazing villa'),
(2,2,6,4,'Very comfortable'),
(4,4,8,5,'Beautiful view'),
(6,6,10,5,'Peaceful location'),
(8,8,6,3,'Budget friendly'),
(10,10,8,5,'Best penthouse');

-- update sql
ALTER TABLE properties 
ADD featured BOOLEAN DEFAULT 0;

UPDATE properties SET featured = 1 WHERE id IN (1,2,3);
