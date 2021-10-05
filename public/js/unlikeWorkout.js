const unlikeWorkout = async () => {
    const pathParams = window.location.pathname + window.location.search;
    const pathArry = pathParams.split('/');
    const workoutId = pathArry[2];
    
    const deleteLike = await fetch(`/api/like/${workoutId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (deleteLike.ok) {
        location.replace(`/workouts/${workoutId}`)
    } else {
        alert('Failed to unlike workout')
    }
}

document.querySelector('#liked-button').addEventListener('click', unlikeWorkout);