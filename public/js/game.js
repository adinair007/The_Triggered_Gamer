const searchForm = async (event) => {
  event.preventDefault();

  const reviewForm = async (event) => {
    event.preventDefault();

    console.log('Inside reviewForm');
    let ratingEl = document.getElementById('inputRating');
    let reviewContent = document.getElementById('userReview');
    let gameTitle = document.getElementById('game-title');

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

    const postReview = {};
  };
};

document.getElementById('reviewForm').addEventListener('submit', reviewForm);
document.querySelector('.searchForm').addEventListener('submit', searchForm);
