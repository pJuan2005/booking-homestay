-- Booking chat migration
-- Creates one conversation per booking and stores thread messages from guest, host, and admin.

CREATE TABLE IF NOT EXISTS booking_conversations (
  id INT NOT NULL AUTO_INCREMENT,
  booking_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY idx_booking_conversations_booking_id (booking_id),
  CONSTRAINT booking_conversations_ibfk_1
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS booking_messages (
  id INT NOT NULL AUTO_INCREMENT,
  conversation_id INT NOT NULL,
  sender_id INT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_booking_messages_conversation_id (conversation_id),
  KEY idx_booking_messages_sender_id (sender_id),
  CONSTRAINT booking_messages_ibfk_1
    FOREIGN KEY (conversation_id) REFERENCES booking_conversations(id),
  CONSTRAINT booking_messages_ibfk_2
    FOREIGN KEY (sender_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
