/**
 * Renders markdown-style formatting (bold and italic) to JSX
 * **text** becomes bold, *text* becomes italic
 */
export function renderFormattedText(text: string) {
  const parts: (string | { type: 'bold' | 'italic', content: string })[] = [];
  let remaining = text;
  
  while (remaining) {
    // Match bold: **text**
    const boldMatch = remaining.match(/^\*\*([^*]+?)\*\*/);
    if (boldMatch) {
      parts.push({ type: 'bold', content: boldMatch[1] });
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }
    
    // Match italic: *text* (but not **)
    const italicMatch = remaining.match(/^\*(?!\*)([^*]+?)\*(?!\*)/);
    if (italicMatch) {
      parts.push({ type: 'italic', content: italicMatch[1] });
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }
    
    // Find the next formatting marker
    const nextBold = remaining.indexOf('**');
    const nextItalic = remaining.indexOf('*');
    
    let nextPos = -1;
    if (nextBold !== -1 && nextItalic !== -1) {
      nextPos = Math.min(nextBold, nextItalic);
    } else if (nextBold !== -1) {
      nextPos = nextBold;
    } else if (nextItalic !== -1) {
      nextPos = nextItalic;
    }
    
    if (nextPos === -1) {
      // No more formatting, add rest of text
      if (remaining) {
        parts.push(remaining);
      }
      remaining = '';
    } else {
      // Add text before next formatting
      if (nextPos > 0) {
        parts.push(remaining.slice(0, nextPos));
      }
      remaining = remaining.slice(nextPos);
    }
  }
  
  return parts;
}
