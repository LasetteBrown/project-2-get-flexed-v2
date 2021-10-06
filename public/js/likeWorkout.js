const likeWorkout = async () => {
    const pathParams = window.location.pathname + window.location.search;
    const pathArry = pathParams.split('/');
    const workoutId = pathArry[2];
    
    const like = {
        workout_id: workoutId,
        user_id: null
    };
    
    const createLike = await fetch('/api/like', {
        method: 'POST',
        body: JSON.stringify(like),
        headers: { 'Content-Type': 'application/json' }
    });

    if (createLike.ok) {
        location.replace(`/workouts/${workoutId}`)
    } else {
        alert('Failed to like workout')
    }
}

document.querySelector('#unliked-button').addEventListener('click', likeWorkout);