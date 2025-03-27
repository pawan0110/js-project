const form = document.querySelector('form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const height = parseInt(document.querySelector('#height').value);
  const weight = parseInt(document.querySelector('#weight').value);
  const results = document.querySelector('#results');
  const result = document.querySelector('#result'); // Reference for BMI category

  // Validate height and weight
  if (isNaN(height) || height <= 0) {
    results.innerHTML = `Please enter a valid height.`;
    return;
  }
  if (isNaN(weight) || weight <= 0) {
    results.innerHTML = `Please enter a valid weight.`;
    return;
  }

  // Calculate BMI
  const bmi = (weight / ((height * height) / 10000)).toFixed(2);
  results.innerHTML = `<span>Your BMI is: ${bmi}</span>`;


  // Categorize BMI
  if (bmi < 18.6) {
    result.innerHTML = `You are underweight.`;
  } else if (bmi >= 18.6 && bmi <= 24.9) {
    result.innerHTML = `Your weight is normal.`;
  } else {
    result.innerHTML = `You are overweight.`;
  }
});
