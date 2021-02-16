CREATE
OR REPLACE TABLE sbla.calendarlookup AS
SELECT
	*,
	DATE (
		EXTRACT(
			YEAR
			FROM
				DATE
		),
		EXTRACT(
			MONTH
			FROM
				DATE
		),
		(week_num_in_month -1) * 7 + 1
	) AS start_of_week
FROM
	(
		SELECT
			date_array_unnest AS DATE,
			DATE_TRUNC(date_array_unnest, MONTH) AS start_of_month,
CASE
				WHEN EXTRACT(
					DAY
					FROM
						date_array_unnest
				) <= 7 THEN 1
				WHEN (
					EXTRACT(
						DAY
						FROM
							date_array_unnest
					) > 7
					AND EXTRACT(
						DAY
						FROM
							date_array_unnest
					) <= 14
				) THEN 2
				WHEN (
					EXTRACT(
						DAY
						FROM
							date_array_unnest
					) > 14
					AND EXTRACT(
						DAY
						FROM
							date_array_unnest
					) <= 21
				) THEN 3
				WHEN (
					EXTRACT(
						DAY
						FROM
							date_array_unnest
					) > 21
					AND EXTRACT(
						DAY
						FROM
							date_array_unnest
					) <= 28
				) THEN 4
				ELSE 5
			END AS week_num_in_month
		FROM
			(
				SELECT
					GENERATE_DATE_ARRAY("2021-01-01", "2029-12-31", INTERVAL 1 DAY) AS date_array
			),
			UNNEST(date_array) AS date_array_unnest
	)
