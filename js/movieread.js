fetch('../json/movies.json')
  .then((response) => response.json())
  .then((data) => {
    // Mapping of category names to their respective DOM element IDs
    const categories = {
      'top-ten': 'top-ten',
      'romance': 'romance',
      'sliceoflife': 'sol',
      'crime': 'crime'
    };

    // Function to create and append movie elements
    const appendMovies = (movies, categoryId, eps, isTopTen = false) => {
      const container = document.getElementById(categoryId);
      movies.forEach((movie, index) => {
        const movieDiv = document.createElement('div');
        movieDiv.className = 'movie';
        
        const gradient = document.createElement('div');
        gradient.className = isTopTen ? 'top-gradient' : 'gradient';

        const image = document.createElement('img');
        image.src = movie.image;
        image.alt = movie.title;

        movieDiv.appendChild(gradient);
        movieDiv.appendChild(image);

        if (isTopTen) {
          const counter = document.createElement('span');
          counter.className = 'counter';
          counter.textContent = index + 1;
          movieDiv.appendChild(counter);
        } else {
          const title = document.createElement('h1');
          title.textContent = movie.title;
          movieDiv.appendChild(title);
        }

        movieDiv.addEventListener('click', () => {
          showDetails(movie, eps);
        });

        container.appendChild(movieDiv);
      });
    };

    // Loop through each category and process movies
    Object.entries(categories).forEach(([key, value]) => {
      const movies = data.movies[key];
      const eps = data.episodePlaceholder['episodes'];
      const isTopTen = key === 'top-ten';
      appendMovies(movies, value, eps, isTopTen);
    });

    // Handle jumbo movies separately since they have different details
    const jumboMovies = data.movies.jumbo;
    const jumboEps = data.episodePlaceholder['jumbo-episode'];
    const moreInfo = document.getElementById('more-info-btn');
    moreInfo.addEventListener('click', () => {
      console.log(jumboMovies);
      showDetails(jumboMovies, jumboEps);
    });

  })
  .catch((error) => {
    console.log('Error', error);
  });


const showDetails = (movie, eps) => {
  const details = document.getElementById('details');
  details.className = 'details';
  details.style.display = 'flex';

  const popup = document.createElement('div');
  popup.classList.add('pop-up', 'slide-up');

  const close = document.createElement('i');
  close.classList.add('close-btn', 'fa-solid', 'fa-xmark', 'small-trans');

  const imageCtr = document.createElement('div');
  imageCtr.classList.add('image-ctr');

  const image = document.createElement('img');
  image.src = movie.bannerImage;
  image.classList.add('pop-up-image');

  const gradient = document.createElement('div');
  gradient.classList.add('image-gradient');

  const imageDetailCtr = document.createElement('div');
  imageDetailCtr.classList.add('image-detail-ctr');

  const title = document.createElement('h1');
  title.textContent = movie.title;

  const playBtnLogo = document.createElement('i');
  playBtnLogo.classList.add('fa-solid', 'fa-play', 'text-2xl');
  const playBtn = document.createElement('button');
  playBtn.textContent = 'Watch Now';

  playBtn.classList.add('image-detail-playBtn', 'opacity-trans');

  close.addEventListener('click', () => {
    popup.classList.remove('slide-up');
    popup.classList.add('slide-down');
    details.classList.remove('fade-in');
    details.classList.add('fade-out');
    popup.addEventListener(
      'animationend',
      () => {
        popup.style.display = 'none';
        details.style.display = 'none';
        popup.classList.remove('slide-down');
        popup.classList.add('slide-up');
        details.classList.remove('fade-out');
        document.body.style.overflow = 'auto';
      },
      { once: true }
    );
  });

  playBtn.appendChild(playBtnLogo);
  imageDetailCtr.appendChild(title);
  imageDetailCtr.appendChild(playBtn);
  imageCtr.appendChild(imageDetailCtr);
  imageCtr.appendChild(gradient);
  imageCtr.appendChild(image);
  popup.appendChild(imageCtr);
  popup.appendChild(close);
  popup.appendChild(showAttributes(movie));
  popup.appendChild(episodes(movie, eps));
  details.appendChild(popup);

  setTimeout(() => {
    details.classList.add('fade-in');
    document.body.style.overflow = 'hidden';
  }, 200);
};

const showAttributes = (movie) =>{
  const container = document.createElement('div');
  container.classList.add('movie-attributes-container');

  const leftCtr = document.createElement('div');
  leftCtr.classList.add('left-ctr');

  const smallDetail = document.createElement('div');
  smallDetail.classList.add('flex', 'gap-4', 'gray');
  const year = document.createElement('h1');
  year.textContent = movie.year;
  const epsCount = document.createElement('h1');
  epsCount.textContent = movie.episodes + ' Episodes';
  const score = document.createElement('h1');
  score.textContent = movie.score + '% Rating';
  score.classList.add('green');
  const description = document.createElement('h1');
  description.textContent = movie.description;
  description.classList.add('line-clamp-3', 'desc-width');

  smallDetail.appendChild(score);
  smallDetail.appendChild(year);
  smallDetail.appendChild(epsCount);
  leftCtr.appendChild(smallDetail);
  leftCtr.appendChild(description);

  const rightCtr = document.createElement('div');
  rightCtr.classList.add('right-ctr');

  const casts = movie.cast;
  const castCtr = document.createElement('div');
  castCtr.classList.add('attributes-mapped-ctr');
  const castHeader = document.createElement('h1');
  castHeader.textContent = 'Casts: ';
  castHeader.classList.add('gray');
  castCtr.appendChild(castHeader);

  casts.forEach((cast, index) => {
    const castElement = document.createElement('h1');
    castElement.textContent = cast;

    if (index !== casts.length - 1) castElement.textContent += ',';

    castCtr.appendChild(castElement);
  });

  const genres = movie.genre;
  const genreCtr = document.createElement('div');
  genreCtr.classList.add('attributes-mapped-ctr');
  const genreHeader = document.createElement('h1');
  genreHeader.textContent = 'Genres: ';
  genreHeader.classList.add('gray');
  genreCtr.appendChild(genreHeader);

  genres.forEach((genre, index) => {
    const genreElement = document.createElement('h1');
    genreElement.textContent = genre;

    if (index !== genres.length - 1) genreElement.textContent += ',';

    genreCtr.appendChild(genreElement);
  });
  rightCtr.appendChild(castCtr);
  rightCtr.appendChild(genreCtr);

  container.appendChild(leftCtr);
  container.appendChild(rightCtr);

  return container;

}

const episodes = (movie, eps) => {
  const container = document.createElement('div');
  container.classList.add('eps-container');

  const headerCtr = document.createElement('div');
  headerCtr.classList.add('header-ctr');

  const epsHeader = document.createElement('h1');
  epsHeader.textContent = 'Episodes';
  epsHeader.classList.add('eps-header');

  const title = document.createElement('h1');
  title.textContent = movie.title;
  title.classList.add('title-header');

  headerCtr.appendChild(epsHeader);
  headerCtr.appendChild(title);
  container.appendChild(headerCtr);
  eps.forEach((ep, index) => {
    const epCtr = document.createElement('div');
    epCtr.classList.add('ep-ctr', 'opacity-trans');

    const imgCtr = document.createElement('div');
    imgCtr.classList.add('ep-img-ctr');

    const indexText = document.createElement('h1');
    indexText.textContent = index + 1;
    indexText.classList.add('ep-index')

    const image = document.createElement('img');
    image.src = ep.episodeImage;
    imgCtr.appendChild(image);

    const infoCtr = document.createElement('div');
    infoCtr.classList.add('ep-info-ctr');

    const epDurCountCtr = document.createElement('div');
    epDurCountCtr.classList.add('ep-dur-count-ctr');

    const epCount = document.createElement('h1');
    epCount.textContent = ep.episodeTitle;
    epCount.classList.add('ep-title');

    const epDuration = document.createElement('h1');
    epDuration.textContent = ep.duration;
    epDuration.classList.add('ep-duration');

    epDurCountCtr.appendChild(epCount);
    epDurCountCtr.appendChild(epDuration);

    const epDescription = document.createElement('h1');
    epDescription.textContent = ep.episodeDescription;
    epDescription.classList.add('ep-desc');

    infoCtr.appendChild(epDurCountCtr);
    infoCtr.appendChild(epDescription);

    epCtr.appendChild(indexText);
    epCtr.appendChild(imgCtr);
    epCtr.appendChild(infoCtr);

    container.appendChild(epCtr);
  });
  return container;
}
