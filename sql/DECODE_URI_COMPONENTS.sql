CREATE TEMPORARY FUNCTION DECODE_URI_COMPONENT(path STRING) RETURNS STRING LANGUAGE js AS """
if (path == null) return null;
try {
  return decodeURIComponent(path);
} catch (e) {
  return path;
}
