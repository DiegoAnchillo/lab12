let db = require('../models/dbconnection');

let users = {
  listar(req, res) {
    let sql = "SELECT * FROM users";
    db.query(sql, function(err, result) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.json(result);
      }
    });
  },
  store(req, res) {
    user_name = req.body.user_name;
    user_password = req.body.user_password;
    user_real_name = req.body.user_real_name;
    user_last_name = req.body.user_last_name;
    //user_profile_picture_url = req.body.user_profile_picture_url;
    user_birthday = req.body.user_birthday;

    let sql = "INSERT INTO users (user_name, user_password, user_real_name, user_last_name, user_birthday) values (?, ?, ?, ?, ?)";
    db.query(sql, [user_name, user_password, user_real_name, user_last_name, user_birthday], function(err, newData) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.json(newData);
      }
    });
  },
  editUserProfilePicture(req, res) {
    user_id = req.body.user_id;
    //user_profile_picture_url = req.body.user_profile_picture_url;

    let sql = "UPDATE users set user_profile_picture_url=? WHERE user_id=?";
    db.query(sql, [ user_id], function(err, newData) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.json(newData);
      }
    });
  },
  delete(req, res) {
    user_id = req.params.user_id;
    let sql = "DELETE FROM users WHERE user_id=?";
    db.query(sql, [user_id], function(err, newData) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    })
  }
}

module.exports = users;
