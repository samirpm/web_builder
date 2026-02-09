const unsafeTags = [
  "script",
  "noscript",
  "iframe",
  "object",
  "embed",
  "base",
  "meta[http-equiv=\"refresh\"]"
];

export function sanitizeDom($) {
  $(unsafeTags.join(",")).remove();
  $("link[rel=\"preload\"], link[rel=\"prefetch\"]").remove();

  $("*").each((_, element) => {
    const attributes = Object.keys(element.attribs || {});
    attributes.forEach((attr) => {
      if (attr.toLowerCase().startsWith("on")) {
        $(element).removeAttr(attr);
      }
    });
  });
}
