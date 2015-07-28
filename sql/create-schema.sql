-- Drop foreign keys
-- Example:
-- ALTER TABLE transactions
--   DROP CONSTRAINT transactions_account_id_foreign;

-- Drop tables
DROP TABLE IF EXISTS accounts;

-- Create tables
CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL
);
ALTER TABLE accounts
  ADD CONSTRAINT accounts_name_unique UNIQUE (name);

-- Add foreign keys
-- Example:
-- ALTER TABLE transactions
--   ADD COLUMN account_id INTEGER NOT NULL,
--   ADD COLUMN category_id INTEGER NOT NULL;
