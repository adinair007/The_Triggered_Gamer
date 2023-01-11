const newFormHandler = async (event) => {
  event.preventDefault();

  const gameName = document.querySelector('#game-title').value.trim();
  const review = document.querySelector('#game-review').value.trim();

  if (gameName && review) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ gameName, review }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create review');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Unable to delete this review.');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
