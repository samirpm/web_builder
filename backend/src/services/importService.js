import fetch from "node-fetch";
import { load } from "cheerio";
import { stripScripts } from "../utils/sanitize.js";
import { replaceContentWithPlaceholders } from "../utils/placeholders.js";

async function fetchHtmlWithPuppeteer(url) {
  const { default: puppeteer } = await import("puppeteer-core");
  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;

  if (!executablePath) {
    throw new Error("PUPPETEER_EXECUTABLE_PATH is required for puppeteer-core");
  }

  const browser = await puppeteer.launch({ executablePath });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  const html = await page.content();
  await browser.close();
  return html;
}

export async function fetchAndCleanHtml(url) {
  let html = "";

  try {
    const response = await fetch(url);
    html = await response.text();
  } catch (error) {
    // fallback for JS-heavy sites
    html = await fetchHtmlWithPuppeteer(url);
  }

  const $ = load(html);

  stripScripts($);
  replaceContentWithPlaceholders($);

  return {
    html: $.html(),
    css: ""
  };
}
