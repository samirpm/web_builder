export function stripScripts($) {
  $("script").remove();
  $("noscript").remove();
}
