const showComment = async (event) => {
    let commentForm = document.querySelector(".comment");
    commentForm.classList.remove("hide");
};

const createComment = async (event) => {
    event.preventDefault();

    const pathParams = window.location.pathname + window.location.search;
    const pathArry = pathParams.split('/');
    const workoutId = pathArry[2];

    const comment = {
        comment: document.querySelector('#comment-description').value.trim(),
        workout_id: workoutId,
        user_id: null
    };

    const addComment = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: { 'Content-Type': 'application/json' }
    });

    if (addComment.ok) {
        location.replace(`/workouts/${workoutId}`)
    } else {
        alert('Failed to create a new comment')
    }
};

document.querySelector('#comment-button').addEventListener('click', showComment);
document.querySelector('.comment-form').addEventListener('submit', createComment);