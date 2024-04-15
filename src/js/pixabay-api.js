// Підключення бібліотеки Axios
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43235331-b9827a4a5560b952e70d62539';

export async function searchImages(image, page) {
  const { data } = await axios(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: image,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page,
    },
  });
  console.log(data);
  return data;
}
