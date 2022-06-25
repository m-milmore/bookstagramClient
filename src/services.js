import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";
const URL_AUTH = `${BASE_URL}/auth`;

const URL_USER_BY_EMAIL = `${URL_AUTH}/`;

const URL_LOGIN = `${URL_AUTH}/login`;
const URL_REGISTER = `${URL_AUTH}/register`;
const URL_LOGOUT = `${URL_AUTH}/logout`;
const URL_UPDATE_DETAILS = `${URL_AUTH}/updatedetails`;
const URL_UPDATE_PASSWORD = `${URL_AUTH}/updatepassword`;
const URL_FORGOT_PASSWORD = `${URL_AUTH}/forgotpassword`;
const URL_RESET_PASSWORD = `${URL_AUTH}/resetpassword/`;

const URL_BOOKS = `${BASE_URL}/books`;

const headers = { "Content-Type": "application/json" };

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
      const response = await axios.post(URL_REGISTER, body, { headers });
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
      const response = await axios.post(URL_LOGIN, body, { headers });
      this.setBearerHeader(response.data.token);
      this.setUserData(response.data.data);
      this.setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findUserByEmail() {
    const headers = this.getBearerHeader();
    try {
      const response = await axios.get(URL_USER_BY_EMAIL + this.email, {
        headers,
      });
      this.setUserData(response.data.data);
    } catch (error) {
      console.error(error);
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
      await axios.get(URL_LOGOUT, { headers });
      this.bearerHeader = {};
      this.logoutUser();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateDetails(name, email) {
    const body = { name, email };
    const headers = this.getBearerHeader();
    try {
      const response = await axios.put(URL_UPDATE_DETAILS, body, { headers });
      this.setUserData(response.data.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updatePassword(currentPassword, newPassword) {
    const body = { currentPassword, newPassword };
    const headers = this.getBearerHeader();
    const response = await axios.post(URL_UPDATE_PASSWORD, body, { headers });
    this.setBearerHeader(response.data.token);
    this.setUserData(response.data.data);
    try {
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export class BookService {
  constructor() {
    this.books = [];
  }

  getBooks() {
    return this.books;
  }

  setBooks(books) {
    this.books = books;
  }

  async getAllBooks() {
    try {
      const response = await axios.get(URL_BOOKS, { headers });
      if (!!response) {
        this.setBooks(response.data.data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
