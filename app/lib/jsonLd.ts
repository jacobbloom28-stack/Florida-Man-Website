// JSON.stringify doesn't sanitize strings for use inside a <script> tag; a
// story title/description containing "</script>" could break out of it. Per
// Next's JSON-LD guide, escape "<" to its unicode equivalent before injecting.
export function jsonLdScript(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
