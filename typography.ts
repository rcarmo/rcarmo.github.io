/** Display the source's ASCII prose dashes without rewriting technical tokens. */
export function proseDashes(text: string): string {
  // Protect code spans, URLs and bare command-line options before matching
  // exactly two hyphens. Single hyphens and runs of three or more stay intact.
  return text.replace(
    /(`+)[\s\S]*?\1|(?:[a-z][a-z0-9+.-]*:\/\/|mailto:|www\.)[^\s<>"']+|(?<![\w-])--[a-z0-9][^\s<>"'()\[\]{}]*|(?<!-)--(?!-)/gi,
    match => match === "--" ? "—" : match,
  );
}

/**
 * Apply typography only to rendered HTML text, never to attributes or opaque
 * markup. This is an output pass over our generated HTML, not a sanitiser.
 */
export function proseDashesHtml(html: string): string {
  return html.replace(
    /<!--[\s\S]*?-->|<(code|pre|script|style|svg|math|textarea|kbd|samp)\b(?:"[^"]*"|'[^']*'|[^'">])*\/?>(?:[\s\S]*?<\/\1\s*>)|<(?:"[^"]*"|'[^']*'|[^'">])*>|[^<]+|</gi,
    token => token.startsWith("<") ? token : proseDashes(token),
  );
}
