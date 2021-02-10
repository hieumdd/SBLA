WITH groupby AS (
    SELECT
        start_of_week,
        ad_name,
        creative_image_url,
        SUM(cost) AS cost,
        SUM(offsite_conversion_value_fb_pixel_purchase) AS revenue,
        SAFE_DIVIDE(
            SUM(offsite_conversion_value_fb_pixel_purchase),
            SUM(cost)
        ) AS roas
    FROM
        `sugatan-290314.SBLA.FB_Ads_GDS`
    GROUP BY
        start_of_week,
        ad_name,
        creative_image_url
)
SELECT
    *,
    RANK() OVER (
        PARTITION BY start_of_week
        ORDER BY
            roas DESC
    ) AS rank_ads
FROM
    groupby
