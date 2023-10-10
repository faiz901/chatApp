class User {
  constructor(username, email, lastLogin,userId) {
    this.name = username;
    this.email = email;
    this.lastLogin = lastLogin;
    this.userId = userId;
  }

  getName() {
    return this.name;
  }

  getLastLogin() {
    return this.lastLogin;
  }

  getEmail() {
    return this.email;
  }

  getUserId() {
    return this.userId;
  }

  static getInstance(username, email, lastLogin,userId) {
    if (!User.instance) {
      User.instance = new User(username, email, lastLogin, userId);
    }
    return User.instance;
  }
}