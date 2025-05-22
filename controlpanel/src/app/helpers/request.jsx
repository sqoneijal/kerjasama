import axios from "axios";
import toast from "react-hot-toast";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const post = async (url, form = [], config = {}) => {
   try {
      const mutex = {
         locked: false,
         lock() {
            if (this.locked) {
               return new Promise((resolve) => {
                  setTimeout(() => {
                     resolve(this.lock());
                  }, 10);
               });
            } else {
               this.locked = true;
               return Promise.resolve();
            }
         },
         unlock() {
            this.locked = false;
         },
      };

      await mutex.lock();
      const formData = new FormData();
      Object.keys(form).forEach((data) => formData.append(data, form[data]));

      const send = axios.post(`${apiUrl}${url}`, formData, { ...config, signal: abortSignal(200_000) });
      send.then((res) => {
         const { data } = res;
         if (typeof data.code !== "undefined" && data.code !== 200) {
            toast.error(data.message);
         }
      });
      send.catch((e) => {
         if (e.code === "ERR_CANCELED") {
            toast.error("Sistem sedang sibuk, silahkan coba beberapa saat lagi!");
         } else {
            toast.error(`${e.message} [ ${e.config.url} ]`);
         }
      });

      mutex.unlock();
      return await send;
   } catch (error) {
      toast.error(error.message);
   }
};

export const get = async (url) => {
   try {
      const mutex = {
         locked: false,
         lock() {
            if (this.locked) {
               return new Promise((resolve) => {
                  setTimeout(() => {
                     resolve(this.lock());
                  }, 10);
               });
            } else {
               this.locked = true;
               return Promise.resolve();
            }
         },
         unlock() {
            this.locked = false;
         },
      };

      await mutex.lock();

      const send = axios.get(`${apiUrl}${url}`, {
         signal: abortSignal(200_000),
      });
      send.then((res) => {
         const { data } = res;
         if (typeof data.code !== "undefined" && data.code !== 200) {
            toast.error(data.message);
         }
      });
      send.catch((e) => {
         if (e.code === "ERR_CANCELED") {
            toast.error("Sistem sedang sibuk, silahkan coba beberapa saat lagi!");
         } else {
            toast.error(e.message);
         }
      });

      mutex.unlock();
      return await send;
   } catch (error) {
      toast.error(error.message);
   }
};

const abortSignal = (timeoutMs) => {
   const abortController = new AbortController();
   setTimeout(() => abortController.abort(), timeoutMs || 0);
   return abortController.signal;
};
