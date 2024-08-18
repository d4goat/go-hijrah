import Axios from 'axios';  // Mengimpor axios dengan alias 'AX'
import type { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = Axios.create({  // Menggunakan 'AX' untuk membuat instance
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
