document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    // Close all
    document
      .querySelectorAll('.faq-question')
      .forEach((b) => b.setAttribute('aria-expanded', 'false'));
    // Open this one if it was closed
    if (!expanded) {
      this.setAttribute('aria-expanded', 'true');
    }
  });
});
