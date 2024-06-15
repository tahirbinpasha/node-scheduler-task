const {body} = require('express-validator');
const{param} = require('express-validator');
const{query} = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'add-admin': {
      return [
        body('name').exists().withMessage("name is required").not().isEmpty().withMessage("name is required"),
        body('email').exists().withMessage("email is required").not().isEmpty().withMessage("email is required"),
        body('password').exists().withMessage("password is required").not().isEmpty().withMessage("password is required"),
      ]
    }

    case 'signIn': {
      return [
        body('email').exists().withMessage("email is required").not().isEmpty().withMessage("email is required"),
        body('password').exists().withMessage("password is required").not().isEmpty().withMessage("password is required"),
      ]
    }
  }
}