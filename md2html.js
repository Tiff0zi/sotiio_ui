// md2html.js
// Минималистичный markdown → HTML, используется в container.html

(function (global) {
  'use strict';

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderMarkdown(md) {
    if (md == null) return '';
    let html = escapeHtml(String(md));

    // ссылки [текст](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // заголовки
    html = html.replace(/^### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^## (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^# (.+)$/gm, '<h2>$1</h2>');

    // жирный / курсив
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // списки
    html = html.replace(/^\s*[-*] (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');

    // переносы строк и абзацы
    html = html.replace(/\n{2,}/g, '</p><p>');
    html = html.replace(/\n/g, '<br />');

    return '<div class="markdown-body"><p>' + html + '</p></div>';
  }

  global.md2html = {
    renderMarkdown
  };
})(window);
