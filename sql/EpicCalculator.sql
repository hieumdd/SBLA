WITH ec AS (
    SELECT
        ec.*,
        ec.monthBudget * ec.projectMonthROAS AS projectedRevenue,
        cl.start_of_month,
        cl.adj_start_of_month,
        cl.start_of_week,
        cl.week_num_in_month,
        DENSE_RANK() OVER (
            PARTITION BY startOfMonth
            ORDER BY
                _updatedAt DESC
        ) AS row_num
    FROM
        `sugatan-290314.SBLA._ext_EpicCalculator` ec
        INNER JOIN `sugatan-290314.SBLA.CalendarLookup` cl ON ec.startOfMonth = cl.adj_start_of_month
        AND ec.weekNumInMonth = cl.week_num_in_month
    WHERE
        startOfMonth IS NOT NULL
)
SELECT
    DISTINCT ec.*
EXCEPT
    (row_num)
FROM
    ec
WHERE
    row_num = 1
