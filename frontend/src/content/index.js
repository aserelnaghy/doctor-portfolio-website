import { siteEN } from "./site/site.en";
import { siteAR } from "./site/site.ar";
import { homeEN } from "./home/home.en";
import { homeAR } from "./home/home.ar";
import { servicesEN } from "./services/services.en";
import { servicesAR } from "./services/services.ar";
import { teamAR } from "./team/team.ar";
import { teamEN } from "./team/team.en";

export function getSiteContent(lang) {
  return lang?.startsWith("ar") ? siteAR : siteEN;
}

export function getHomeContent(lang) {
  return lang?.startsWith("ar") ? homeAR : homeEN;
}

export function getServicesContent(lang) {
  return lang?.startsWith("ar") ? servicesAR : servicesEN;
}

export function getTeamContent(lang) {
  return lang?.startsWith("ar") ? teamAR : teamEN;
}