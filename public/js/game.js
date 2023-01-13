const searchForm = async (event) => {
  event.preventDefault();

  let search = document.getElementById('searchInput').value.trim();

  console.log('search' + search);
  if (search) {
    const response = await fetch(`/search?gametitle=${search}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((results) => {
        console.log(response);
        return results.json();
      })
      .then((resultsData) => {
        console.log('bark', resultsData);
        displayGameInfo(resultsData);
      });
  }
};

const displayGameInfo = async (gameInfo) => {
  let gameCardEl = document.getElementById('gameCard');
  let gameTitle = document.getElementById('gameTitle');
  gameTitle.setAttribute('data-slug', gameInfo.slug);
  let gameDescription = document.getElementById('gameDescription');
  let gameMetacritic = docuement.getElementById('metacritic');
  let releaseDate = document.getElementById('releaseDate');

  gameTitle.setAttribute('data-gameId', gameData.gameId);
  gameDescription.textContent = gameData.game_description;
  gameImage.setAttribute('src', gameData.background_image);
  gameReleased.textContent = gameData.release_date;
  gameMetacritic.textContent = gameData.metacritic;
};

const reviewForm = async (event) => {
  event.preventDefault();

  console.log('Inside reviewForm');
  let ratingEl = document.getElementById('inputRating');
  let reviewContent = document.getElementById('userReview');
  let gameTitle = document.getElementById('gameTitle');

  // console.log(ratingEl.value);
  if (!ratingEl.value) {
    alert('Please fill in the rating.');
  }
  // text content || verify its filled in
  if (!reviewContent.value) {
    alert('Please fill in the review.');
  }
  // game slug ||
  gameTitle = gameTitle.textContent;
  if (!gameTitle) {
    alert('Please search the game you want to review.');
  }
};

document.getElementById('reviewForm').addEventListener('submit', reviewForm);
document.getElementById('searchForm').addEventListener('submit', searchForm);
