//event listner for form submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // Hide results at the start
    document.getElementById('results').style.display = 'none';
    // Show loader at the start of showing results
    document.getElementById('loading').style.display = 'block';  
    setTimeout(calculateResults, 2000);
    e.preventDefault();
  }); 
  // Calculate Results
  function calculateResults(){
    // selecting the input values amount,intrest,years from 
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    // selecting the html tags to display the results
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    // get the amount,rate of intrest,years of repayment
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;
    // Calculate monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);
    // checking whether the value is finite or not
    if(isFinite(monthly)) {
      // calculated monthly payment
      monthlyPayment.value = monthly.toFixed(2);
      // calcuted total payment
      totalPayment.value = (monthly * calculatedPayments).toFixed(2);
      // calcuted total intrest   
      totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
      // Show results
      document.getElementById('results').style.display = 'block'; 
      // Hide loader after dispalying loader
      document.getElementById('loading').style.display = 'none';
    } else {
      showError('Please check your numbers');
    }
  }
  // Show Error
  function showError(error){
    // Hide results if any error found
    document.getElementById('results').style.display = 'none';
    // Hide loader when showing the results
    document.getElementById('loading').style.display = 'none';
    // Create a div to display the error
    const errorDiv = document.createElement('div'); 
    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    // Add class
    errorDiv.className = 'alert alert-danger';
    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    // Insert error above heading
    card.insertBefore(errorDiv, heading);
    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
  }
  // Clear error
  function clearError(){
    document.querySelector('.alert').remove();
  }