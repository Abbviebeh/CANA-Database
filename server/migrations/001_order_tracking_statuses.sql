-- Upgrade existing CANA orders from processing/delivered to the fulfillment stages.
-- Safe to run against the previous CANA schema and the new schema.
ALTER TABLE orders
  MODIFY status ENUM('processing','shipped','delivered','cancelled','pending','preparing','to_ship','to_deliver','received')
  NOT NULL DEFAULT 'pending';

UPDATE orders
SET status = CASE
  WHEN status = 'processing' THEN 'preparing'
  WHEN status = 'delivered' THEN 'received'
  ELSE status
END;

ALTER TABLE orders
  MODIFY status ENUM('pending','preparing','to_ship','shipped','to_deliver','received','cancelled')
  NOT NULL DEFAULT 'pending';
