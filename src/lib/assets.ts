const absoluteUrlPattern = /^[a-z][a-z\d+.-]*:\/\//i;

export const resolvePublicAssetPath = (path: string): string => {
  if (!path.startsWith("/") || path.startsWith("//") || absoluteUrlPattern.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
  const assetPath = path.replace(/^\/+/, "");

  return `${base}/${assetPath}`;
};
