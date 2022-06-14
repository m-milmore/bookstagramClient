import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";
const URL_AUTH = `${BASE_URL}/auth`;
const URL_LOGIN = `${URL_AUTH}/login`;
const URL_REGISTER = `${URL_AUTH}/register`;

const URL_USER_BY_EMAIL = `${URL_AUTH}/`;

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
      // this.setAuthToken(response.data.token);
      this.setBearerHeader(response.data.token);
      this.setUserEmail(email);
      this.setIsLoggedIn(true);
      await this.findUserByEmail();
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
      // this.setAuthToken(response.data.token);
      this.setBearerHeader(response.data.token);
      this.setUserEmail(email);
      this.setIsLoggedIn(true);
      await this.findUserByEmail();
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
}