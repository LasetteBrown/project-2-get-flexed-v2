const createWorkout = async (event) => {
    event.preventDefault();

    const workout = {
        title: document.querySelector('#workout-title-value').value.trim(),
        description: document.querySelector('#workout-description').value.trim(),
        category_id: document.querySelector('#workout-cat').value,
        user_id: null
    };

    const addWorkout = await fetch('/api/workout', {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: { 'Content-Type': 'application/json' }
    });

    if (addWorkout.ok) {
        location.replace('/workouts')
    } else {
        alert('Failed to create workout')
    }
}

document.querySelector('.create-form').addEventListener('submit', createWorkout)