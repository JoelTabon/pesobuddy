document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// Compound Interest Calculator
document
  .getElementById('calculatorForm')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    const principal =
      parseFloat(document.getElementById('principal').value) || 0;
    const monthlyContribution =
      parseFloat(document.getElementById('monthlyContribution').value) || 0;
    const annualRate =
      parseFloat(document.getElementById('interestRate').value) / 100;
    const years = parseInt(document.getElementById('years').value);

    if (principal <= 0 || annualRate < 0 || years <= 0) {
      alert('Please enter valid positive numbers for all required fields.');
      return;
    }

    // Monthly interest rate
    const monthlyRate = annualRate / 12;
    const totalMonths = years * 12;

    // Future value of initial principal
    const futureValuePrincipal = principal * Math.pow(1 + annualRate, years);

    // Future value of monthly contributions (annuity)
    let futureValueContributions = 0;
    if (monthlyContribution > 0 && monthlyRate > 0) {
      futureValueContributions =
        monthlyContribution *
        ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    } else if (monthlyContribution > 0) {
      futureValueContributions = monthlyContribution * totalMonths;
    }

    const totalFutureValue = futureValuePrincipal + futureValueContributions;
    const totalContributions = principal + monthlyContribution * totalMonths;
    const totalInterest = totalFutureValue - totalContributions;

    // Deduct 20% withholding tax on interest earned
    const taxRate = 0.2;
    const interestAfterTax = totalInterest * (1 - taxRate);

    // Display results
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
            <h3>Your Financial Projection</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
                <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 10px;">
                    <strong>Total Future Value</strong><br>
                    <span style="font-size: 2rem;">₱${totalFutureValue.toLocaleString(
                      'en-PH',
                      { maximumFractionDigits: 0 }
                    )}</span>
                </div>
                <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 10px;">
                    <strong>Total Contributions</strong><br>
                    <span style="font-size: 2rem;">₱${totalContributions.toLocaleString(
                      'en-PH',
                      { maximumFractionDigits: 0 }
                    )}</span>
                </div>
                <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 10px;">
                    <strong>Total Interest Earned (after 20% withholding tax)</strong><br>
                    <span style="font-size: 2rem; color: #2c3e50;">₱${interestAfterTax.toLocaleString(
                      'en-PH',
                      { maximumFractionDigits: 0 }
                    )}</span>
                    <p style="font-size: 0.75rem; opacity: 0.7; margin-top: 0.25rem;">* Amount shown is after withholding tax deduction</p>
                </div>
            </div>
            <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.8;">
    In ${years} ${
      years === 1 ? 'year' : 'years'
    }, your ₱${principal.toLocaleString('en-PH', {
      maximumFractionDigits: 0,
    })} initial investment 
    ${
      monthlyContribution > 0
        ? `plus ₱${monthlyContribution.toLocaleString('en-PH', {
            maximumFractionDigits: 0,
          })} monthly contributions`
        : ''
    }
    will grow to ₱${totalFutureValue.toLocaleString('en-PH', {
      maximumFractionDigits: 0,
    })} at ${(annualRate * 100).toFixed(1)}% annual interest.
</p>
        `;
    resultDiv.classList.add('show');

    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth' });
  });

// Add loading animation to calculate button
document.querySelector('.calculate-btn').addEventListener('click', function () {
  const btn = this;
  const originalText = btn.textContent;
  btn.textContent = 'Calculating...';
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.opacity = '1';
  }, 1000);
});

// Add entrance animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe tip cards for animation
document.querySelectorAll('.tip-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `opacity 0.6s ease ${
    index * 0.1
  }s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});
