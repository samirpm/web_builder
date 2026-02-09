import fetch from "node-fetch";
import { load } from "cheerio";
import { sanitizeDom } from "../utils/sanitize.js";
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
    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }
    html = await response.text();
  } catch (error) {
    html = await fetchHtmlWithPuppeteer(url);
  }

  const $ = load(html);
  const css = $("style")
    .map((_, styleTag) => $(styleTag).html() || "")
    .get()
    .join("\n");

  $("style").remove();
  sanitizeDom($);
  replaceContentWithPlaceholders($);

  return {
    html: $("body").html() || $.root().html() || "",
    css
  };
}
