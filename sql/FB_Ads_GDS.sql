WITH report AS (
    SELECT
        date,
        DATE_TRUNC(date, WEEK(MONDAY)) AS start_of_week,
        DATE_TRUNC(date, MONTH) AS start_of_month,
        COUNT(DISTINCT date) OVER (PARTITION BY DATE_TRUNC(date, WEEK(MONDAY))) AS days_in_week,
        campaign_name,
        ad_group_name,
        ad_name,
        cost,
        SBLA.DECODE_URI_COMPONENT(
        REGEXP_EXTRACT(creative_thumbnail_url, r"[?&]url=([^&]+)")
        ) AS extracted_url,
        offsite_conversions_fb_pixel_purchase,
        offsite_conversion_value_fb_pixel_purchase,
        reach,
        SAFE_DIVIDE(offsite_conversion_value_fb_pixel_purchase, cost) AS roas
    FROM
        `sugatan-290314.SBLA.FBADS_AD_*`
)
SELECT
    *  
FROM
    report
