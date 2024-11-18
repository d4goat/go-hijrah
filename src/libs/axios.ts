import Axios from 'axios';
import type { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = Axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
