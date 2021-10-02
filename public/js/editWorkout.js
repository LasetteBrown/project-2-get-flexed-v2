const editWorkout = async (event) => {
    event.preventDefault();

    const pathParams = window.location.pathname + window.location.search;
    const pathArry = pathParams.split('/');
    const workoutId = pathArry[2];
    
    const workout = {
        title: document.querySelector('#workout-title').value.trim(),
        description: document.querySelector('#workout-description').value.trim(),
        category_id: document.querySelector('#workout-cat').value,
        user_id: null
    };

    const updateFetch = await fetch(`/api/workout/${workoutId}`, {
        method: 'PUT',
        body: JSON.stringify(workout),
        headers: { 'Content-Type': 'application/json' }
    });

    if (updateFetch.ok) {
        location.replace(`/workouts/${workoutId}`)
    } else {
        alert('Failed to update workout')
    }
}

document.querySelector('.edit-form').addEventListener('submit', editWorkout)