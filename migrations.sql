-- create a user first using /signup api

INSERT INTO public.users (email, password_hash, created_at, updated_at) VALUES('abc@gmail.com', '$2b$10$qk9YbVxTb6AzYudI72U44eExTjFWHndpbiPTwaoMRcW.e9KVMtXf.', '2025-06-18 18:26:40.835', '2025-06-18 18:26:40.835');
-- if you don't want to


INSERT INTO public."Holding"  (symbol, qty, "avgPrice", "userId", "createdAt", "updatedAt") VALUES
('AAPL', 50, 175.25, 1, NOW(), NOW()),
('GOOGL', 10, 2850.00, 1, NOW(), NOW()),
('TSLA', 5, 700.50, 1, NOW(), NOW()),
('MSFT', 20, 310.10, 1, NOW(), NOW()),
('AMZN', 2, 3400.00, 1, NOW(), NOW());

INSERT INTO public."OrderBook"  (symbol, side, price, qty, pnl, "userId", "createdAt", "updatedAt") VALUES
('AAPL', 'buy', 175.00, 10, 50.00, 1, NOW(), NOW()),
('GOOGL', 'sell', 2855.00, 5, -25.00, 1, NOW(), NOW()),
('TSLA', 'buy', 705.00, 2, 10.00, 1, NOW(), NOW()),
('MSFT', 'sell', 312.00, 8, 15.00, 1, NOW(), NOW());

INSERT INTO public."Position"  (symbol, qty, pnl, "userId", "createdAt", "updatedAt") VALUES
('AAPL', 10, 100.00, 1, NOW(), NOW()),
('GOOGL', 3, -50.00, 1, NOW(), NOW()),
('TSLA', 1, 20.00, 1, NOW(), NOW()),
('MSFT', 5, 30.00, 1, NOW(), NOW());