INSERT INTO mm_users (email, username, password)
VALUES ($1, $2, $3)
RETURNING *;