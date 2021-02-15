WITH groupby AS (
    SELECT
        start_of_week,
        ad_group_name,
        ROUND(SUM(cost), 2) AS cost,
        SUM(purchase) AS purchases,
        ROUND(
            SUM(revenue),
            2
        ) AS revenue,
        ROUND(
            SAFE_DIVIDE(
                SUM(revenue),
                SUM(cost)
            ),
            2
        ) AS roas
    FROM
        `sugatan-290314.SBLA.FB_Ads_GDS`
    GROUP BY
        start_of_week,
        ad_group_name
),
min_date AS (
    SELECT
        *
    FROM
        (
            SELECT
                ad_group_name,
                date,
                ROW_NUMBER() OVER (
                    PARTITION BY ad_group_name
                    ORDER BY
                        date ASC
                ) AS row_num
            FROM
                `sugatan-290314.SBLA.FB_Ads_GDS`
        )
    WHERE
        row_num = 1
)
SELECT
    gb.*,
    RANK() OVER (
        PARTITION BY start_of_week
        ORDER BY
            roas DESC
    ) AS rank_adsets,
    mind.date AS date_introduced
FROM
    groupby gb
    LEFT JOIN min_date mind ON gb.ad_group_name = mind.ad_group_name
ORDER BY
    start_of_week DESC,
    ad_group_name
