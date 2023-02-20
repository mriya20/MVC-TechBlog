const signupFormHandler = async (event) => {

    event.preventDefault();

    const username = document.getElementById('username-signup').value//.trim();
    const email = document.getElementById('email-signup').value//.trim();
    const password = document.getElementById('password-signup').value//.trim();
    console.log(email, password);

    if (username && email && password) {

        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        const results = response.json()
        console.log(results);

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);