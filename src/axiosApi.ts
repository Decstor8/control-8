import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'https://maksim-tkachev-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;