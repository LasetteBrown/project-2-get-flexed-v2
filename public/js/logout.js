const userLogout = async () => {
    const logout = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    if (logout.ok) {
        document.location.replace('/')
    } else {
        alert('Failed to logout')
    }
}

document.querySelector('#logout').addEventListener('click', userLogout);