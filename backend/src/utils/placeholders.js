const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.";

export function replaceContentWithPlaceholders($) {
  $("img").each((_, img) => {
    $(img).attr("src", "https://picsum.photos/600/400");
    $(img).attr("alt", "Placeholder image");
  });

  $("p, h1, h2, h3, h4, h5, h6, li, span").each((_, node) => {
    const text = $(node).text().trim();
    if (text.length > 0) {
      $(node).text(lorem);
    }
  });
}
