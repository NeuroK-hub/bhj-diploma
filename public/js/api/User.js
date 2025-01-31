class User {
  
  static URL = '/user';

  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  static unsetCurrent() {
    delete localStorage.user;
  }


  static current() {
      return JSON.parse(localStorage.getItem('user'));
  }

  static fetch(callback) {
      createRequest({
       url: this.URL + '/current',
       method: 'GET',
       callback: (err, response) => {
          if (response.success) {
             User.setCurrent(response.user);
          } else {
             User.unsetCurrent();
          }
           callback(err, response);
      }
    });
  }
  static login( data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      data,
      callback: (err, response) => {
        if (response.success) {
          User.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  static register(data, callback) {
      createRequest({
       url: this.URL + '/register',
       method: 'POST',
       data,
       callback: (err, response) => {
          if (response.success) {
             User.setCurrent(response.user);
          };
           callback(err, response);
      }
    });
  }

  static logout(callback) {
      createRequest({
       url: this.URL + '/logout',
       method: 'POST',
       callback: (err, response) => {
          if (response.success) {
             User.unsetCurrent();
          };
           callback(err, response);
      }
    });
  }
}
