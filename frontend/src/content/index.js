import { siteEN } from "./site/site.en";
import { siteAR } from "./site/site.ar";
import { homeEN } from "./home/home.en";
import { homeAR } from "./home/home.ar";

export function getSiteContent(lang) {
  return lang?.startsWith("ar") ? siteAR : siteEN;
}

export function getHomeContent(lang) {
  return lang?.startsWith("ar") ? homeAR : homeEN;
}
