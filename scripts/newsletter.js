document
  .getElementById('newsletterForm')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    const messageDiv = document.getElementById('newsletterMessage');
    if (!emailInput.value.trim()) return;

    // Submit the form to Google Forms in the hidden iframe
    this.submit();

    messageDiv.style.display = 'block';
    messageDiv.style.color = '#27ae60';
    messageDiv.textContent = 'Thank you for subscribing!';
    emailInput.value = '';
    this.querySelector('button[type="submit"]').disabled = true;
    emailInput.disabled = true;
  });
