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

let page = 1;
form.addEventListener('submit', handleSubmit);
loadBtn.addEventListener('click', loadMore);

function handleSubmit(event) {
  event.preventDefault();
  const { image } = event.currentTarget.elements;
  loader.style.display = 'inline-block';
  sessionStorage.setItem('image', input.value);
  page = 1;

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

  searchImages(input.value)
    .then(data => {
      if (data.total === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#fff',
          backgroundColor: '#ef4040',
          position: 'topRight',
        });
      }
      gallery.innerHTML = createGalleryMarkup(data.hits);
      if (page <= data.totalHits) {
        loadBtn.classList.replace('load-more-hidden', 'load-more');
      }
      simpleLightbox();
    })
    .catch(error => alert(error))
    .finally(() => {
      loader.style.display = 'none';
    });
  input.value = '';
  form.reset();
}

async function loadMore() {
  loadBtn.disabled = true;

  try {
    const image = sessionStorage.getItem('image');
    const data = await searchImages(image, page);
    gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(data.hits));
    page += 1;

    loadBtn.disabled = false;

    const item = document.querySelector('.gallery-item');
    const itemHeight = item.getBoundingClientRect().height;

    window.scrollBy({
      left: 0,
      top: itemHeight * 2,
      behavior: 'smooth',
    });

    if (page > data.totalHits) {
      loadBtn.classList.replace('load-more', 'load-more-hidden');
    }
  } catch (error) {
    alert(error.message);
  }
  simpleLightbox();
}

function simpleLightbox() {
  let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  gallery.refresh();
}
