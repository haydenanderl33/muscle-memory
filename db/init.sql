CREATE TABLE mm_users(
mm_id SERIAL PRIMARY KEY,
email VARCHAR(60) NOT NULL,
username VARCHAR(30) NOT NULL,
password TEXT NOT NULL
);


INSERT INTO mm_users (email, username, password)
VALUES('userbob@test.com','bob', 123);