-- SELECT * FROM workout_session
-- WHERE mm_id = $1

SELECT * FROM workout_session
WHERE mm_id = $1
ORDER BY ws_id DESC;