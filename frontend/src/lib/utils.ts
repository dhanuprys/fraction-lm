import { config } from "@/config";
export { cn } from "cn";

/**
 * Converts a relative backend asset path (like /uploads/image.png)
 * into a fully qualified absolute URL using the backend base URL.
 */
export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return "";

  // If it's already an absolute URL or a blob URL (for previews), return as is
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("blob:") ||
    path.startsWith("data:")
  ) {
    return path;
  }

  // Extract the base URL by removing the /api path from the configured API_URL
  const baseUrl = config.API_URL.split("/api")[0] || config.API_URL;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}
