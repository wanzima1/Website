document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const loading = document.getElementById('loading');
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorMessage.classList.add('hidden');
      loading.classList.remove('hidden');
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          window.location.href = '/admin-dashboard.html';
        } else {
          const data = await response.json();
          throw new Error(data.message || 'Login failed');
        }
      } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
      } finally {
        loading.classList.add('hidden');
      }
    });
  });