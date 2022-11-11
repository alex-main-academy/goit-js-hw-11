import { fetchPhoto } from './fetch-search';
import Notiflix from 'notiflix';
import { createGalleryCardMarkup } from './card-markup';
import 'simplelightbox/dist/simple-lightbox.min.css';
import simpleLightbox from 'simplelightbox';

const searchFormElement = document.querySelector('.search-form');
const searchInputElement = document.querySelector('[name="searchQuery"]');
const galleryMainElement = document.querySelector('.gallery');
const loadMoreButtonElement = document.querySelector('.load-more');
let cardMarkup = '';
let paginationPage = 1;

const handleSearchPhoto = async event => {
  event.preventDefault();
  paginationPage = 1;
  try {
    const dataResponse = await fetchPhoto(
      searchInputElement.value,
      paginationPage
    );
    const { data } = dataResponse;

    // Перевірка на пустий массив з результата
    if (data.hits.length === 0) {
      loadMoreButtonElement.classList.add('is-hidden');
      galleryMainElement.innerHTML = '';
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      loadMoreButtonElement.classList.add('is-hidden');
      cardMarkup = '';
      galleryMainElement.innerHTML = cardMarkup;

      data.hits.map(elem => {
        cardMarkup += createGalleryCardMarkup(elem);
      });

      galleryMainElement.innerHTML = cardMarkup;

      // Створення галереї
      const gallery = new simpleLightbox('.photo-card a');

      loadMoreButtonElement.classList.remove('is-hidden');
    }
  } catch (err) {
    console.log(err);
  }
};

const handleLoadMorePhotos = async () => {
  try {
    paginationPage += 1;

    const dataResponse = await fetchPhoto(
      searchInputElement.value,
      paginationPage
    );
    const { data } = dataResponse;

    data.hits.map(elem => {
      cardMarkup += createGalleryCardMarkup(elem);
    });

    galleryMainElement.innerHTML = cardMarkup;

    // Створення галереї
    const gallery = new simpleLightbox('.photo-card a');

    // Плавний скрол
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    // Перевірка на закінчення фото
    if (paginationPage * 40 >= data.totalHits) {
      loadMoreButtonElement.classList.add('is-hidden');
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (err) {
    console.log(err);
  }
};

searchFormElement.addEventListener('submit', handleSearchPhoto);
loadMoreButtonElement.addEventListener('click', handleLoadMorePhotos);
