import fetch from "node-fetch";
import { load } from "cheerio";
import { stripScripts } from "../utils/sanitize.js";
import { replaceContentWithPlaceholders } from "../utils/placeholders.js";

export async function fetchAndCleanHtml(url) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = load(html);

  stripScripts($);
  replaceContentWithPlaceholders($);

  return {
    html: $.html(),
    css: ""
  };
}
