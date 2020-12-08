INSERT INTO workout_session(mm_id, workout_name,set,rep,weight)
VALUES($1,$2,$3,$4,$5)
RETURNING *;

-- SELECT * FROM workout_session
-- WHERE mm_id = $1