// Підключення бібліотеки iziToast
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// Підключення бібліотеки SimpleLightbox
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchImages } from './js/pixabay-api.js';
import { createGalleryMarkup } from './js/render-functions.js';

const form = document.querySelector('.search-form');
const input = document.querySelector('#image');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.load-more');

form.addEventListener('submit', handleSubmit);
loadBtn.addEventListener('click', loadMore);

let currentPage = 1;
let inputValue = '';
let totalPages;

async function handleSubmit(event) {
  event.preventDefault();
  currentPage = 1;
  inputValue = input.value;

  gallery.innerHTML = '';

  loadBtn.disabled = false;

  if (input.value.trim() === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'Search field cannot be empty!',
      messageColor: '#fff',
      backgroundColor: '#ffa000',
      position: 'topRight',
    });
    return;
  }

  const { image } = event.currentTarget.elements;

  loader.style.display = 'inline-block';

  await searchImages(image.value, currentPage)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#fff',
          backgroundColor: '#ef4040',
          position: 'topRight',
        });
        return;
      }

      form.reset();
      gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(data.hits));

      const totalPages = Math.ceil(data.totalHits / data.hits.length);

      if (currentPage <= totalPages) {
        loadBtn.classList.replace('load-more-hidden', 'load-more');
      }
      simpleLightbox();
    })
    .catch(error => alert(error))
    .finally(() => {
      loader.style.display = 'none';
    });
  input.value = '';
}

async function loadMore() {
  loadBtn.disabled = true;
  currentPage += 1;

  try {
    const data = await searchImages(inputValue, currentPage);

    gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(data.hits));
    simpleLightbox();

    loader.style.display = 'inline-block';
    loadBtn.disabled = false;

    const item = document.querySelector('.gallery-item');
    const itemHeight = item.getBoundingClientRect().height;

    window.scrollBy({
      left: 0,
      top: itemHeight * 2,
      behavior: 'smooth',
    });

    if (currentPage > totalPages) {
      loadBtn.classList.replace('load-more', 'load-more-hidden');
      iziToast.info({
        title: 'Info',
        message: `We're sorry, but you've reached the end of search results`,
        messageColor: '#fff',
        backgroundColor: '#59a10d',
        position: 'topRight',
      });
      return;
    }
  } catch (error) {
    alert(error.message);
  }
  loader.style.display = 'none';
}

function simpleLightbox() {
  let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  gallery.refresh();
}
