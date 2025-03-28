const { User } = require('../models');

module.exports = async () => {
  const data = await User.findAll({
    attributes:
        [
          'id',
          'displayName',
          'email',
          'image',
        ],
  });
  return data;  
};
