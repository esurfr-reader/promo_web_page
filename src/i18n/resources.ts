import enCommon from "./locales/en/common.json";
import enHero from "./locales/en/hero.json";
import enProblem from "./locales/en/problem.json";
import enFlow from "./locales/en/flow.json";
import enCanvas from "./locales/en/canvas.json";
import enFeatures from "./locales/en/features.json";
import enReview from "./locales/en/review.json";
import enMethod from "./locales/en/method.json";
import enCta from "./locales/en/cta.json";

import esCommon from "./locales/es/common.json";
import esHero from "./locales/es/hero.json";
import esProblem from "./locales/es/problem.json";
import esFlow from "./locales/es/flow.json";
import esCanvas from "./locales/es/canvas.json";
import esFeatures from "./locales/es/features.json";
import esReview from "./locales/es/review.json";
import esMethod from "./locales/es/method.json";
import esCta from "./locales/es/cta.json";

import ptCommon from "./locales/pt/common.json";
import ptHero from "./locales/pt/hero.json";
import ptProblem from "./locales/pt/problem.json";
import ptFlow from "./locales/pt/flow.json";
import ptCanvas from "./locales/pt/canvas.json";
import ptFeatures from "./locales/pt/features.json";
import ptReview from "./locales/pt/review.json";
import ptMethod from "./locales/pt/method.json";
import ptCta from "./locales/pt/cta.json";

import jaCommon from "./locales/ja/common.json";
import jaHero from "./locales/ja/hero.json";
import jaProblem from "./locales/ja/problem.json";
import jaFlow from "./locales/ja/flow.json";
import jaCanvas from "./locales/ja/canvas.json";
import jaFeatures from "./locales/ja/features.json";
import jaReview from "./locales/ja/review.json";
import jaMethod from "./locales/ja/method.json";
import jaCta from "./locales/ja/cta.json";

import frCommon from "./locales/fr/common.json";
import frHero from "./locales/fr/hero.json";
import frProblem from "./locales/fr/problem.json";
import frFlow from "./locales/fr/flow.json";
import frCanvas from "./locales/fr/canvas.json";
import frFeatures from "./locales/fr/features.json";
import frReview from "./locales/fr/review.json";
import frMethod from "./locales/fr/method.json";
import frCta from "./locales/fr/cta.json";

export const resources = {
  en: {
    common: enCommon,
    hero: enHero,
    problem: enProblem,
    flow: enFlow,
    canvas: enCanvas,
    features: enFeatures,
    review: enReview,
    method: enMethod,
    cta: enCta,
  },
  es: {
    common: esCommon,
    hero: esHero,
    problem: esProblem,
    flow: esFlow,
    canvas: esCanvas,
    features: esFeatures,
    review: esReview,
    method: esMethod,
    cta: esCta,
  },
  pt: {
    common: ptCommon,
    hero: ptHero,
    problem: ptProblem,
    flow: ptFlow,
    canvas: ptCanvas,
    features: ptFeatures,
    review: ptReview,
    method: ptMethod,
    cta: ptCta,
  },
  ja: {
    common: jaCommon,
    hero: jaHero,
    problem: jaProblem,
    flow: jaFlow,
    canvas: jaCanvas,
    features: jaFeatures,
    review: jaReview,
    method: jaMethod,
    cta: jaCta,
  },
  fr: {
    common: frCommon,
    hero: frHero,
    problem: frProblem,
    flow: frFlow,
    canvas: frCanvas,
    features: frFeatures,
    review: frReview,
    method: frMethod,
    cta: frCta,
  },
} as const;
