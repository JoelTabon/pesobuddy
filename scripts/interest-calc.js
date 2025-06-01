// Maya formula: Daily Interest = (Principal x Rate) / 36500
// Tax = 20% of Daily Interest
// Net Daily = Daily Interest - Tax
// Monthly Net = Net Daily x 30

document
  .getElementById('interestCalcForm')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);

    if (isNaN(principal) || isNaN(rate) || principal < 0 || rate < 0) {
      alert('Please enter valid numbers.');
      return;
    }

    // Maya formula
    const dailyGross = (principal * rate) / 36500;
    const tax = dailyGross * 0.2;
    const dailyNet = dailyGross - tax;
    const monthlyNet = dailyNet * 30;

    document.getElementById('dailyGross').textContent =
      '₱' + dailyGross.toFixed(2);
    document.getElementById('tax').textContent = '₱' + tax.toFixed(2);
    document.getElementById('dailyNet').textContent = '₱' + dailyNet.toFixed(2);
    document.getElementById('monthlyNet').textContent =
      '₱' + monthlyNet.toFixed(2);

    document.getElementById('calcResult').style.display = 'block';
  });
