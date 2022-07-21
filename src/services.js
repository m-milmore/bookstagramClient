import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const URL_AUTH = `${BASE_URL}/auth`;

const URL_USER_BY_EMAIL = `${URL_AUTH}/`;

const URL_LOGIN = `${URL_AUTH}/login`;
const URL_REGISTER = `${URL_AUTH}/register`;
const URL_LOGOUT = `${URL_AUTH}/logout`;
const URL_UPDATE_DETAILS = `${URL_AUTH}/updatedetails`;
const URL_UPDATE_PASSWORD = `${URL_AUTH}/updatepassword`;
const URL_FORGOT_PASSWORD = `${URL_AUTH}/forgotpassword`;
const URL_RESET_PASSWORD = `${URL_AUTH}/resetpassword/`;
const URL_REFRESH_TOKEN = `${URL_AUTH}/refresh`;

const URL_BOOKS = `${BASE_URL}/books`;
const URL_BOOKS_VERIFY = `${URL_BOOKS}/verify`;

const headers = { "Content-Type": "application/json" };

let headerWithToken;

class User {
  constructor() {
    this.id = "";
    this.name = "";
    this.email = "";
    this.role = "";
    this.createAt = "";
    this.isLoggedIn = false;
  }

  setUserEmail(email) {
    this.email = email.toLowerCase();
  }

  setIsLoggedIn(loggedIn) {
    this.isLoggedIn = loggedIn;
  }

  setUserData(userData) {
    const { _id, name, email, role, createAt } = userData;
    this.id = _id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.createAt = createAt;
  }

  logoutUser() {
    this.id = "";
    this.name = "";
    this.email = "";
    this.role = "";
    this.createAt = "";
    this.isLoggedIn = false;
  }
}

export class AuthService extends User {
  constructor() {
    super();
    // this.authToken = "";
    this.bearerHeader = {};
  }

  // setAuthToken(token) {
  //   this.authToken = token;
  // }

  setBearerHeader(token) {
    this.bearerHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    headerWithToken = this.bearerHeader;
  }

  getBearerHeader() {
    return this.bearerHeader;
  }

  async registerUser(name, email, password) {
    const body = {
      name,
      email: email.toLowerCase(),
      password,
    };
    try {
      const response = await axios.post(URL_REGISTER, body, {
        headers,
        withCredentials: true,
      });
      this.setBearerHeader(response.data.token);
      this.setUserData(response.data.data);
      this.setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async loginUser(email, password) {
    const body = {
      email: email.toLowerCase(),
      password,
    };

    try {
      const response = await axios.post(URL_LOGIN, body, {
        headers,
        withCredentials: true,
      });
      this.setBearerHeader(response.data.token);
      this.setUserData(response.data.data);
      this.setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findUserByEmail() {
    const axiosPrivate = this.AxiosPrivate();
    const headers = this.getBearerHeader();
    try {
      const response = await axiosPrivate.get(URL_USER_BY_EMAIL + this.email, {
        headers,
      });
      this.setUserData(response.data.data);
      axiosPrivate.interceptors.request.eject(axiosPrivate.requestIntercept);
      axiosPrivate.interceptors.response.eject(axiosPrivate.responseIntercept);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async forgotPassword(email, urlLink) {
    const body = {
      email,
      urlLink,
    };

    this.setUserEmail(email);

    try {
      await axios.post(URL_FORGOT_PASSWORD, body, { headers });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async resetPassword(password, token) {
    const body = {
      password,
    };

    try {
      const response = await axios.put(URL_RESET_PASSWORD + token, body, {
        headers,
        withCredentials: true,
      });
      this.setBearerHeader(response.data.token);
      this.setUserData(response.data.data);
      this.setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async userLogout() {
    try {
      await axios.get(URL_LOGOUT, { headers, withCredentials: true });
      this.bearerHeader = {};
      this.logoutUser();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateDetails(name, email) {
    const axiosPrivate = this.AxiosPrivate();
    const body = { name, email };
    const headers = this.getBearerHeader();

    try {
      const response = await axiosPrivate.put(URL_UPDATE_DETAILS, body, {
        headers,
      });
      this.setUserData(response.data.data);
      axiosPrivate.interceptors.request.eject(axiosPrivate.requestIntercept);
      axiosPrivate.interceptors.response.eject(axiosPrivate.responseIntercept);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updatePassword(currentPassword, newPassword) {
    const axiosPrivate = this.AxiosPrivate();
    const body = { currentPassword, newPassword };
    const headers = this.getBearerHeader();

    try {
      const response = await axiosPrivate.post(URL_UPDATE_PASSWORD, body, {
        headers,
        withCredentials: true,
      });
      this.setBearerHeader(response.data.token);
      this.setUserData(response.data.data);
      axiosPrivate.interceptors.request.eject(axiosPrivate.requestIntercept);
      axiosPrivate.interceptors.response.eject(axiosPrivate.responseIntercept);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async refresh() {
    try {
      const response = await axios.get(URL_REFRESH_TOKEN, {
        withCredentials: true,
      });
      this.setBearerHeader(response.data.token);
      this.setUserData(response.data.data);
      this.setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /* eslint-disable no-unused-vars */
  AxiosPrivate() {
    const axiosPrivate = axios.create();

    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers = this.getBearerHeader();
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          await this.refresh();
          prevRequest.headers = this.getBearerHeader();
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return axiosPrivate;
  }
  /* eslint-enable no-unused-vars */
}
export class BookService extends AuthService {
  constructor() {
    super();
    this.books = [];
  }

  getBooks() {
    return this.books;
  }

  setBooks(books) {
    this.books = books;
  }

  async getAllBooks() {
    console.log(URL_BOOKS)
    try {
      const response = await axios.get(URL_BOOKS, {
        headers,
      });
      this.setBooks(response.data.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async uploadBook(title, photo) {
    const axiosPrivate = this.AxiosPrivate();
    const body = { title, photo };
    const headers = headerWithToken;
    try {
      await axiosPrivate.post(URL_BOOKS, body, {
        headers,
      });
      axiosPrivate.interceptors.request.eject(axiosPrivate.requestIntercept);
      axiosPrivate.interceptors.response.eject(axiosPrivate.responseIntercept);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async checkMimeType(files) {
    const formData = new FormData();
    formData.append("image", files[0]);
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    try {
      await axios.post(URL_BOOKS_VERIFY, formData, {
        headers,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateBook(bookId, title) {
    const body = { title };
    const headers = headerWithToken;

    try {
      await axios.put(URL_BOOKS + `/${bookId}`, body, {
        headers,
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteBook(bookId) {
    const headers = headerWithToken;

    try {
      await axios.delete(URL_BOOKS + `/${bookId}`, {
        headers,
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
