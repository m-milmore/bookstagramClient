import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";
const URL_AUTH = `${BASE_URL}/auth`;
const URL_LOGIN = `${URL_AUTH}/login`;
const URL_REGISTER = `${URL_AUTH}/register`;

const URL_USER_BY_EMAIL = `${URL_AUTH}/`;

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
    this.avatarName = "";
    this.avatarColor = "";
    this.isLoggedIn = false;
  }

  setUserEmail(email) {
    this.email = email.toLowerCase();
  }

  setIsLoggedIn(loggedIn) {
    this.isLoggedIn = loggedIn;
  }

  setUserData(userData) {
    const { _id, name, email, role, createAt, avatarName, avatarColor } =
      userData;
    this.id = _id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.createAt = createAt;
    this.avatarName = avatarName;
    this.avatarColor = avatarColor;
  }

  logoutUser() {
    this.id = "";
    this.name = "";
    this.email = "";
    this.role = "";
    this.createAt = "";
    this.avatarName = "";
    this.avatarColor = "";
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

  async registerUser(name, email, password, avatarName, avatarColor) {
    const body = {
      name,
      email: email.toLowerCase(),
      password,
      avatarName,
      avatarColor,
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

  async forgotPassword(email) {
    const body = {
      email,
    };

    try {
      await axios.post(URL_FORGOT_PASSWORD, body, { headers });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async resetPassword(token, password) {
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
