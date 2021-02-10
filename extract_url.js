if (path == null) return null;
try {
    return decodeURIComponent(path);
} catch (e) {
    return path;
}
