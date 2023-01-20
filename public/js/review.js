// const searchForm = async (event) => {
//   event.preventDefault();

//   let search = document.getElementById('searchInput').value.trim();

//   console.log('search' + search);
//   if (search) {
//     const response = await fetch(`/search?gametitle=${search}`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     })
//       .then((results) => {
//         console.log(response);
//         return results.json();
//       })
//       .then((resultsData) => {
//         console.log('bark', resultsData);
//         displayGameInfo(resultsData);
//       });
//   }
// };

// const displayGameInfo = async (gameInfo) => {
//   let gameCardEl = document.getElementById('gameCard');
//   let gameTitle = document.getElementById('gameTitle');
//   gameTitle.setAttribute('data-slug', gameInfo.slug);
//   let gameDescription = document.getElementById('description');
//   let gameMetacritic = docuement.getElementById('metacritic');
//   let released = document.getElementById('released');

//   gameTitle.setAttribute('data-gameId', gameInfo.gameId);
//   gameDescription.textContent = gameInfo.description;
//   gameImage.setAttribute('src', gameInfo.game_image);
//   released.textContent = gameInfo.released;
//   gameMetacritic.textContent = gameInfo.metacritic;
// };

const reviewForm = async (event) => {
  event.preventDefault();

  console.log('Inside reviewForm');
  let ratingEl = document.getElementById('user_score');
  let reviewContent = document.getElementById('Review');
  let gameTitle = document.getElementById('game_title');

  if (!ratingEl.value) {
    alert('Please provide a rating out of 10.');
  }

  if (!reviewContent.value) {
    alert('Please provide a review.');
  }

  gameTitle = gameTitle.textContent;
  if (!gameTitle) {
    alert('Please search the game you want to review.');
  }

  if (gameTitle && ratingEl && reviewContent) {
    const response = await fetch(`/api/review`, {
      method: 'POST',
      body: JSON.stringify({ gameTitle, ratingEl, reviewContent }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/review');
    } else {
      alert('Unable to submit review.');
    }
  }
};

// const editButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     if (gameTitle && ratingEl && reviewContent) {
//       const response = await fetch(`/api/reviews/${id}`, {
//         method: 'PUT',
//         body: JSON.stringify({ gameTitle, ratingEl, reviewContent }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (response.ok) {
//         document.location.replace('/review');
//       }
//     } else {
//       alert('Unable to edit review.');
//     }
//   }
// };

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/review/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/review');
    } else {
      alert('Unable to delete this review.');
    }
  }
};

document.querySelector('form-group').addEventListener('submit', reviewForm);
document
  .querySelector('.reviewList')
  .addEventListener('click', delButtonHandler);
// document
//   .querySelector('.reviewList')
//   .addEventListener('click', editButtonHandler);
// document.getElementById('searchForm').addEventListener('submit', searchForm);
