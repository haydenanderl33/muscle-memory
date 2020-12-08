UPDATE instructions
SET instructions = $2
WHERE workout_id = $1;



SELECT * FROM instructions
ORDER BY workout_id ASC;

