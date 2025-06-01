document.addEventListener('DOMContentLoaded', function () {
  const amountInput = document.getElementById('fundsAfterExpenses');
  const percentInputs = [
    document.getElementById('emergencyPercent'),
    document.getElementById('investmentsPercent'),
    document.getElementById('savingsPercent'),
  ];
  const resultInputs = [
    document.getElementById('emergencyResult'),
    document.getElementById('investmentsResult'),
    document.getElementById('savingsResult'),
  ];

  function calculate() {
    const amount = parseFloat(amountInput.value) || 0;
    percentInputs.forEach((input, idx) => {
      const percent = parseFloat(input.value) || 0;
      const value = amount * (percent / 100);
      resultInputs[idx].value =
        amount && percent
          ? value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : 0;
    });
  }

  amountInput.addEventListener('input', calculate);
  percentInputs.forEach((input) => input.addEventListener('input', calculate));
});
