export type SiteMode = "academic" | "professional";

export function resolveSiteMode(pathname: string): SiteMode {
  return pathname.startsWith("/professional") ? "professional" : "academic";
}

export function isProfessionalPath(pathname: string) {
  return resolveSiteMode(pathname) === "professional";
}
