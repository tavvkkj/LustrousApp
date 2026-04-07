import path from "path";
import fs from "fs";
import { SupportedLocale, LocaleStrings } from "@/types";
import { env } from "@/config/env";

type LocaleCache = Map<SupportedLocale, LocaleStrings>;

const LOCALES_DIR = path.resolve(__dirname, "../locales");

const cache: LocaleCache = new Map();

function loadLocaleSync(locale: SupportedLocale): void {
  if (cache.has(locale)) return;

  const localePath = path.join(LOCALES_DIR, locale);

  if (!fs.existsSync(localePath)) {
    throw new Error(`Locale directory not found: ${localePath}`);
  }

  const merged: LocaleStrings = {};

  const files = fs
    .readdirSync(localePath)
    .filter((f) => f.endsWith(".json"));

  for (const file of files) {
    const namespace = path.basename(file, ".json");
    const content = fs.readFileSync(path.join(localePath, file), "utf-8");
    merged[namespace] = JSON.parse(content) as LocaleStrings;
  }

  cache.set(locale, merged);
}

function resolvePath(obj: LocaleStrings, keyPath: string): string | undefined {
  const parts = keyPath.split(".");
  let current: LocaleStrings | string = obj;

  for (const part of parts) {
    if (typeof current !== "object" || !(part in current)) {
      return undefined;
    }
    current = current[part] as LocaleStrings | string;
  }

  return typeof current === "string" ? current : undefined;
}

export function t(
  locale: SupportedLocale,
  key: string,
  replacements?: Record<string, string>,
  isPublicPanel: boolean = false
): string {
  const targetLocale = isPublicPanel ? "en-US" : locale;
  const strings = cache.get(targetLocale);
  let value = strings ? resolvePath(strings, key) : undefined;

  if (!value && targetLocale !== env.defaultLocale) {
    const defaultStrings = cache.get(env.defaultLocale);
    if (defaultStrings) {
      value = resolvePath(defaultStrings, key);
    }
  }

  if (!value) {
    return key;
  }

  if (!replacements) return value;

  return Object.entries(replacements).reduce(
    (acc, [placeholder, replacement]) =>
      acc.replaceAll(`{${placeholder}}`, replacement),
    value
  );
}

export function preloadLocales(locales: SupportedLocale[]): void {
  for (const locale of locales) {
    loadLocaleSync(locale);
  }
}