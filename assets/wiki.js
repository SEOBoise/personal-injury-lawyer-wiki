'use strict';
(() => {
  const form = document.querySelector('.search');
  if (!form) return;
  const input = form.querySelector('input');
  const panel = form.querySelector('.search-panel');
  const status = panel.querySelector('[role="status"]');
  const list = panel.querySelector('ul');
  const headings = [...document.querySelectorAll('main h2')].map((heading) => {
    const section = heading.closest('section');
    return { id: heading.id, title: heading.textContent, text: (section ? section.textContent : heading.textContent).toLowerCase() };
  });
  const close = () => { panel.hidden = true; };
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = input.value.trim().toLowerCase();
    list.replaceChildren();
    if (!query) { close(); return; }
    const words = query.split(/\s+/);
    const results = headings.filter((entry) => words.every((word) => entry.text.includes(word)));
    status.textContent = results.length ? `${results.length} matching section${results.length === 1 ? '' : 's'}` : 'No matching sections.';
    results.forEach((entry) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${entry.id}`;
      link.textContent = entry.title;
      link.addEventListener('click', close);
      item.append(link);
      list.append(item);
    });
    panel.hidden = false;
  });
  panel.querySelector('button').addEventListener('click', close);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
})();
