-- -----------------------------------------------------------------------------
-- accounts
-- -----------------------------------------------------------------------------
INSERT INTO accounts (id, name) VALUES (1, 'Cash');
INSERT INTO accounts (id, name) VALUES (2, 'BofA Checking');
INSERT INTO accounts (id, name) VALUES (3, 'E*Trade Savings');
INSERT INTO accounts (id, name) VALUES (4, 'UnitedHealthcare HSA');
INSERT INTO accounts (id, name) VALUES (5, 'FIA Card Services');
INSERT INTO accounts (id, name) VALUES (6, 'Amazon VISA');
INSERT INTO accounts (id, name) VALUES (7, 'AmEx Platinum');
INSERT INTO accounts (id, name) VALUES (8, 'E*Trade Brokerage');
INSERT INTO accounts (id, name) VALUES (9, 'Fidelity 401K');
INSERT INTO accounts (id, name) VALUES (10, 'Betterment');

SELECT setval('accounts_id_seq', (SELECT MAX(id) FROM accounts));
