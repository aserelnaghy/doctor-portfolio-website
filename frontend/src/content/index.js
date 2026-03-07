import { siteEN } from "./site/site.en";
import { siteAR } from "./site/site.ar";

import { homeEN } from "./home/home.en";
import { homeAR } from "./home/home.ar";

import { servicesEN } from "./services/services.en";
import { servicesAR } from "./services/services.ar";

import { teamEN } from "./team/team.en";
import { teamAR } from "./team/team.ar";

import { aboutEN } from "./about/about.en";
import { aboutAR } from "./about/about.ar";

import { faqEN } from "./faq/faq.en";
import { faqAR } from "./faq/faq.ar";

import { healthEN } from "./health/health.en";
import { healthAR } from "./health/health.ar";

import { contactEN } from "./contact/contact.en";
import { contactAR } from "./contact/contact.ar";

import { storiesEN } from "./stories/stories.en";
import { storiesAR } from "./stories/stories.ar";

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

export function getAboutContent(lang) {
  return lang?.startsWith("ar") ? aboutAR : aboutEN;
}

export function getFaqContent(lang) {
  return lang?.startsWith("ar") ? faqAR : faqEN;
}

export function getHealthContent(lang) {
  return lang?.startsWith("ar") ? healthAR : healthEN;
}

export function getContactContent(lang) {
  return lang?.startsWith("ar") ? contactAR : contactEN;
}

export function getStoriesContent(lang) {
  return lang?.startsWith("ar") ? storiesAR : storiesEN;
}