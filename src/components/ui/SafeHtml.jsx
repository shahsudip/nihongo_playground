import React, { useEffect, useRef } from 'react';
import { safeSetHTML } from '../../utils/safeHtml.js';

/**
 * React wrapper that renders HTML safely using the native Sanitizer API (setHTML)
 * with a code-split DOMPurify fallback on browsers without Sanitizer API support.
 */
export function SafeHtml({ html, as: Tag = 'div', className = '', style }) {
  const ref = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const node = ref.current;
    if (!node) return;

    Promise.resolve().then(async () => {
      if (!cancelled && ref.current) {
        await safeSetHTML(ref.current, html);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [html]);

  return <Tag ref={ref} className={className} style={style} />;
}

export default SafeHtml;
