const createUser = async (event) => {
    event.preventDefault();

    const user = {
        name: document.querySelector('#name-signup').value.trim(),
        email: document.querySelector('#email-signup').value.trim(),
        password: document.querySelector('#password-signup').value.trim()
    };

    const fetchUser = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' }
    });

    if (fetchUser.ok) {
        location.replace('/')
    } else {
        alert('Failed to create user')
    }
};

document.querySelector('#signup-form').addEventListener('submit', createUser);