CREATE TABLE mm_users(
mm_id SERIAL PRIMARY KEY,
email VARCHAR(60) NOT NULL,
username VARCHAR(30) NOT NULL,
password TEXT NOT NULL
);


INSERT INTO mm_users (email, username, password)
VALUES('userbob@test.com','bob', 123);


CREATE TABLE workout_session(
ws_id SERIAL PRIMARY KEY,
mm_id INT REFERENCES mm_users(mm_id),
workout_name TEXT,
set INT,
rep INT
)

INSERT INTO workout_session(workout_name, mm_id, set, rep)
VALUES('Bench', 3, 4, 225)

SELECT * FROM mm_users mm, workout_session ws 
WHERE mm.mm_id = ws.mm_id

CREATE TABLE instructions(
workout_id SERIAL PRIMARY KEY,
workout_name TEXT,
instructions TEXT
)

INSERT INTO instructions(workout_name, instructions)
VALUES('Bench','This is how you do bench bro')


-- SELECT * FROM mm_users
-- SELECT * FROM workout_session
-- SELECT * FROM instructions

-- SELECT *
-- FROM workout_session ws
-- JOIN instructions i ON i.workout_name = ws.workout_name
-- WHERE workout_name = 'Bench';