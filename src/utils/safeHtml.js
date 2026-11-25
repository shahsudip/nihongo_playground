let domPurifyPromise;

function loadDOMPurify() {
  // Code-split with Vite so DOMPurify is only downloaded in browsers lacking native Element.prototype.setHTML
  domPurifyPromise ??= import('dompurify').then((mod) => mod.default ?? mod);
  return domPurifyPromise;
}

export const SAFE_HTML_ELEMENTS = [
  'div', 'span', 'p', 'br', 'hr', 'blockquote', 'pre', 'code',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'b', 'strong', 'i', 'em', 'u', 's', 'mark', 'small', 'sub', 'sup',
  'ruby', 'rt', 'rp', 'rb', 'rtc',
  'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
  'img', 'figure', 'figcaption',
];

export const SAFE_HTML_ATTRIBUTES = [
  'class', 'style', 'src', 'alt', 'title', 'width', 'height',
  'colspan', 'rowspan', 'loading', 'decoding', 'lang', 'dir',
];

/**
 * Safely insert untrusted or external HTML into a DOM element.
 * Uses the native Sanitizer API (Element.prototype.setHTML) when available,
 * and falls back to code-split DOMPurify configured to match native Sanitizer behavior.
 */
export async function safeSetHTML(el, html) {
  if (!el) return;
  const content = String(html ?? '');

  if ('setHTML' in Element.prototype) {
    el.setHTML(content, {
      sanitizer: {
        elements: SAFE_HTML_ELEMENTS,
        attributes: SAFE_HTML_ATTRIBUTES,
      },
    });
    return;
  }

  const DOMPurify = await loadDOMPurify();
  el.innerHTML = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [...SAFE_HTML_ELEMENTS, '#text'],
    ALLOWED_ATTR: SAFE_HTML_ATTRIBUTES,
    // Match native Sanitizer API defaults: strip aria-*/data-* and disallowed element content
    ALLOW_ARIA_ATTR: false,
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: false,
  });
}
