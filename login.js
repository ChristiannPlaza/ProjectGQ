document.getElementById('admin-login-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const messageDiv = document.getElementById('login-message');
  messageDiv.textContent = '';

  // Example: Replace this with your real API endpoint
  // For demo, we'll use a hardcoded check
  if (username === 'admin' && password === 'admin123') {
    window.location.href = 'dashboard.html'; // Redirect to dashboard
  } else {
    messageDiv.textContent = 'Invalid username or password.';
  }
}); 