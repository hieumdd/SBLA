SELECT
    DATE(DATETIME_TRUNC(created_at, DAY)) AS date,
    SUM(CAST(total_price AS NUMERIC)) - SUM(CAST(total_discounts AS NUMERIC)) AS revenue,
    COUNT(DISTINCT id) AS transactions
FROM
    `moxilash.Fb_AD_Data.shopify2`
GROUP BY
    DATE(DATETIME_TRUNC(created_at, DAY))
