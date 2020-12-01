INSERT INTO workout_session(mm_id, workout_name,set,rep)
VALUES($1,$2,$3,$4)
RETURNING *;

-- SELECT * FROM workout_session
-- WHERE mm_id = $1