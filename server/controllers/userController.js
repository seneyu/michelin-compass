const db = require('../models/projectModel');
const bcrypt = require('bcrypt');

const userController = {};

userController.createUser = async (req, res, next) => {
  // get the username and password from user
  const { username, password } = req.body;

  // if either one missing, return error
  if (!username || !password) {
    return next({
      log: 'Error in userController.createUser middleware.',
      status: 400,
      message: { err: 'Username or password missing.' },
    });
  }

  // hash password using bcrypt and save to database
  try {
    const text1 = `SELECT * FROM users WHERE username = $1`;
    const result1 = await db.query(text1, [username]);
    if (result1.rows.length === 0) {
      const hashPassword = await bcrypt.hash(password, 10);
      const text2 = `INSERT INTO users (username, hashpassword)
      VALUES ($1, $2)
      RETURNING *`;
      const params = [username, hashPassword];
      const result2 = await db.query(text2, params);
      res.locals.newUser = result2.rows[0];
      return next();
    } else {
      return next({
        log: 'Error in userController.verifyUser middleware.',
        status: 500,
        message: { err: 'Username already exists.' },
      });
    }
  } catch (err) {
    console.error(err);
    return next({
      log: 'Error in userController.createUser middleware.',
      status: 500,
      message: { err: 'An error occurred in creating user.' },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  // get the username and password from user
  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      log: 'Error in userController.verifyUser middleware.',
      status: 400,
      message: { err: 'Username or password missing.' },
    });
  }

  // check if username exists in database
  try {
    const text = `SELECT * FROM users WHERE username = $1`;
    const result = await db.query(text, [username]);

    // if no user found, return error
    if (result.rows.length === 0) {
      return next({
        log: 'Error in userController.verifyUser middleware.',
        status: 404,
        message: { err: 'User not found.' },
      });
    }

    const user = result.rows[0];

    // compare the hashpassword from database with the input password
    const passwordMatch = await bcrypt.compare(password, user.hashpassword);

    if (!passwordMatch) {
      return next({
        log: 'Error in userController.verifyUser middleware.',
        status: 401,
        message: { err: 'Incorrect password.' },
      });
    }

    res.locals.user = user;
    return next();
  } catch (err) {
    console.error(err);
    return next({
      log: 'Error in userController.verifyUser middleware.',
      status: 500,
      message: { err: 'An error occurred in logging in user.' },
    });
  }
};

userController.postReview = async (req, res, next) => {
  const { restaurant, rating, comment } = req.body;
  // console.log(req.body);

  // console.log('restaurant: ', restaurant);
  // console.log('rating: ', rating);
  // console.log('comment: ', comment);

  if (!restaurant || !rating) {
    return next({
      log: 'Error in userController.postReview middleware.',
      status: 400,
      message: { err: 'Restaurant name or rating missing.' },
    });
  }

  try {
    const text = `INSERT INTO reviews (restaurant, rating, comment)
    VALUES ($1, $2, $3)
    RETURNING *`;
    const params = [restaurant, rating, comment];
    const newPost = await db.query(text, params);

    res.locals.newPost = newPost.rows[0];
    return next();
  } catch (error) {
    console.error('Database error:', error.message);
    return next({
      log: `Error in userController.postReview middleware: ${error.message}`,
      status: 500,
      message: { err: 'An error occurred in posting a review.' },
    });
  }
};

userController.getReviews = async (req, res, next) => {
  try {
    const text = `SELECT *
    FROM reviews`;
    const getReviews = await db.query(text);
    res.locals.getReviews = getReviews.rows;
    // console.log('getReviews: ', getReviews.rows);
    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.getReviews middleware.',
      status: 500,
      message: { err: 'An error occurred in getting the reviews.' },
    });
  }
};

userController.updatePost = async (req, res, next) => {
  const { id } = req.params;
  const numId = Number(id);
  const { restaurant, rating, comment } = req.body;

  if (!restaurant && rating === undefined) {
    return next({
      log: 'Error in userController.updatePost middleware.',
      status: 400,
      message: { err: 'No update information provided.' },
    });
  }

  try {
    const text = `UPDATE reviews 
    SET restaurant = $1, rating = $2, comment = $3
    WHERE id = $4
    RETURNING *`;
    const params = [restaurant, rating, comment, numId];
    const updatedPost = await db.query(text, params);
    // console.log(updatedPost);
    res.locals.updatedPost = updatedPost.rows[0];
    return next();
  } catch (error) {
    console.error('Error: ', error);
    return next({
      log: 'Error in userController.updatePost middleware.',
      status: 500,
      message: { err: 'An error occurred in updating the post.' },
    });
  }
};

userController.deletePost = async (req, res, next) => {
  const { id } = req.params;
  const numId = Number(id);

  try {
    const text1 = `SELECT id FROM reviews WHERE id = $1`;
    const toDelete = await db.query(text1, [numId]);
    if (toDelete.rows.length === 0) {
      return next({
        log: 'Error in userController.deleteReview middleware.',
        status: 400,
        message: { err: 'ID not found.' },
      });
    }
    const text2 = `DELETE FROM reviews 
    WHERE id = $1 
    RETURNING *`;
    const deletedPost = await db.query(text2, [numId]);
    console.log('Post deleted!');
    res.locals.deletedPost = deletedPost.rows[0];
    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.deletePost middleware.',
      status: 500,
      message: { err: 'An error occurred in deleting the post.' },
    });
  }
};

module.exports = userController;
