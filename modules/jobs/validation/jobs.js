const {body} = require('express-validator');
const{param} = require('express-validator');
const{query} = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'create-job': {
      return [
        body('user_ids').exists().withMessage("user_ids are required").not().isEmpty().withMessage("user_ids are required"),
        body('type').exists().withMessage("type is required").not().isEmpty().withMessage("type is required"),
      ]
    }
  }
}