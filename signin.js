document.addEventListener('DOMContentLoaded', () => {
    const signInForm = document.getElementById('sign-in-form');
    
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);
        
        if (user) {
            localStorage.setItem('loggedInUser', email);
            alert('Sign In Successful');
            // Redirect to the page the user was previously on
            window.location.href = document.referrer.includes('signin.html') ? 'index.html' : document.referrer;
        } else {
            alert('Incorrect email or password');
        }
    });
});


