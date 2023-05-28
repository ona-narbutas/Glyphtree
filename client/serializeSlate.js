import escapeHtml from 'escape-html';
import { Text, Element, Node } from 'slate';

const serializeSlate = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.italic) {
      string = `<em>${string}</em>`;
    }
    if (node.underline) {
      string = `<u>${string}</u>`;
    }
    if (node.type === 'code') {
      string = `<pre><code>${string}</code></pre>`;
    }
    return string;
  }

  if (Element.isElement(node)) {
    const children = node.children.map((n) => serializeSlate(n)).join('');
    switch (node.type) {
      case 'quote':
        return `<blockquote><p>${children}</p></blockquote>`;
      case 'code':
        return `<code><p>${children}</p></code>`;
      case 'paragraph':
        return `<p>${children}</p>`;
      default:
        return children;
    }
  }

  return node;
};

export default serializeSlate;
