// signup.js
document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.getElementById('sign-up-form');
    
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Check if user already exists
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === email);
        
        if (existingUser) {
            alert('User already exists');
            return;
        }

        // Add new user
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Sign Up Successful');
        window.location.href = 'signin.html'; // Redirect to sign-in page
    });
});

