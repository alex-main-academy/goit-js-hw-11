import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31230805-8b64b0dc0b8f6a09d94599afb';

export const fetchPhoto = async (query, page) => {
  const option = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: page,
  });

  const response = await axios.get(`${BASE_URL}?${option}`);
  return response;
};
