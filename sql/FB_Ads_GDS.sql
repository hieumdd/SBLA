WITH report AS (
    SELECT
        date,
        campaign_name,
        ad_group_name,
        ad_name,
        cost,
        SBLA.DECODE_URI_COMPONENT(
            REGEXP_EXTRACT(creative_thumbnail_url, "[?&]url=([^&]+)")
        ) AS extracted_url,
        offsite_conversions_fb_pixel_purchase AS purchase,
        offsite_conversion_value_fb_pixel_purchase AS revenue,
        reach
    FROM
        `sugatan-290314.SBLA.FBADS_AD_*`
)
SELECT
    rt.*,
    cl.adj_start_of_month,
    cl.start_of_week
FROM
    report rt
    INNER JOIN `sugatan-290314.SBLA.CalendarLookup` cl ON rt.date = cl.date
