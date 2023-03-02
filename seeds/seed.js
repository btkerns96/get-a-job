const sequelize = require('../config/connections');
const { User, JobPosts } = require('../models');

const userData = require('./userData.json');
const jobData = require('./JobData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const jobPosts of jobData) {
    await JobPosts.create({
      ...jobPosts,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
