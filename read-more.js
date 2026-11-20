/* Compatibility for previously cached HTML: show full text, create no controls. */
(function () {
  document.querySelectorAll('.copy-more, .educational-more, .why-more').forEach(function (button) { button.remove(); });
  document.querySelectorAll('.copy-collapsed, .copy-managed, .educational-collapsed').forEach(function (paragraph) {
    paragraph.classList.remove('copy-collapsed', 'copy-managed', 'educational-collapsed');
  });
})();
