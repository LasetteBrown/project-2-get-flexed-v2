const loginForm = async (event) => {
    event.preventDefault();

    const user = {
        email: document.querySelector('#email-login').value.trim(),
        password: document.querySelector('#password-login').value.trim()
    }

    if (user.email && user.password) {
        const login = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        });

        if (login.ok) {
            document.location.replace('/');
        } else {
            alert('Email or password incorrect, please try again!')
        }
    }
};

document.querySelector('#login-form').addEventListener('submit', loginForm)