CREATE
OR REPLACE TABLE SBLA.CalendarLookup AS
SELECT
    date_array_unnest AS date,
    DATE_TRUNC(date_array_unnest, WEEK(MONDAY)) AS start_of_week,
    DATE_TRUNC(date_array_unnest, MONTH) AS start_of_month,
    DATE_TRUNC(DATE_TRUNC(date_array_unnest, WEEK(MONDAY)), MONTH) AS adj_start_of_month,
    DENSE_RANK() OVER (
        PARTITION BY DATE_TRUNC(DATE_TRUNC(date_array_unnest, WEEK(MONDAY)), MONTH)
        ORDER BY
            DATE_TRUNC(date_array_unnest, WEEK(MONDAY)) ASC
    ) AS week_num_in_month
FROM
    (
        SELECT
            GENERATE_DATE_ARRAY("2020-01-01", "2029-12-31", INTERVAL 1 DAY) AS date_array
    ),
    UNNEST(date_array) AS date_array_unnest
