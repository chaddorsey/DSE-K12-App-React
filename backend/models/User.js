// backend/models/User.js
const bcrypt = require('bcrypt');

// In-memory user storage for demonstration.
// In production, replace this with a persistent database.
const users = [
  {
    id: 1,
    username: 'alice',
    email: 'alice@example.com',
    // Password "password1" hashed with bcrypt (10 rounds)
    password: '$2b$10$VhVhQVXhWnS75SjT7eOIYeJ6uRO.fMsm4ZKf/XzTrflnZj1IFaJ5a',
    onboardingAnswers: {
      cat_dog: "Cat person",
      StarWars_StarTrek: "Star Wars",
      eye_color: "Blue",
      novels_read: "3-5",
      math_conference: "NCTM",
      professional_cat: "Researcher",
      intro_extrovert: "Introvert",
      teaching_subj: "Mathematics",
      paper_writing: "Pencil and paper",
      pizza_topping: "Cheese",
      earthquake_mag: "4-5",
      magazine_read: "People",
      birthday_month: "May/June",
      email_client: "Elm/Pine",
      movies_theater: "3-4",
      gender: "Female",
      region_youth: "Northeast",
      region_current: "Northeast",
      am_beverage: "Good coffee",
      siblings: "1 sibling",
      living_scenario: "Apartment with self / family",
      community: "Central city",
      fiction_type: "Mystery",
      TVs: 1,
      pets: 0,
      commute_miles: 10,
      commute_hrs: 1,
      bedtime: 22,
      grandchildren: 0,
      operas_seen: 0,
      car_mpg: 30,
      email: 10,
      ice_cream: "Vanilla",
      hobby: "Reading",
      mother_name: "Sarah",
      vacation_type: "Beach",
      nobody_knows: "I sleep with a teddy bear"
    }
  },
  {
    id: 2,
    username: 'bob',
    email: 'bob@example.com',
    // Password "password2"
    password: '$2b$10$m1J/uRMcFeSdPz9K0L6hFeN9Xb3Cz6tnTvmZlVXG1qX3T7xQ/HTZO',
    onboardingAnswers: {
      cat_dog: "Dog person",
      StarWars_StarTrek: "Star Trek",
      eye_color: "Brown",
      novels_read: "0-2",
      math_conference: "ICOTS",
      professional_cat: "Software developer",
      intro_extrovert: "Extrovert",
      teaching_subj: "Statistics",
      paper_writing: "Electric typewriter",
      pizza_topping: "Pepperoni",
      earthquake_mag: "5-6",
      magazine_read: "The Economist",
      birthday_month: "November/December",
      email_client: "Outlook",
      movies_theater: "5-10",
      gender: "Male",
      region_youth: "Midwest",
      region_current: "South",
      am_beverage: "Any old coffee",
      siblings: "2 siblings",
      living_scenario: "House with self / family",
      community: "Inner suburbs",
      fiction_type: "Science Fiction",
      TVs: 2,
      pets: 1,
      commute_miles: 20,
      commute_hrs: 1.5,
      bedtime: 23,
      grandchildren: 0,
      operas_seen: 1,
      car_mpg: 25,
      email: 15,
      ice_cream: "Chocolate",
      hobby: "Hiking",
      mother_name: "Linda",
      vacation_type: "Mountain",
      nobody_knows: "I collect rare coins"
    }
  },
  {
    id: 3,
    username: 'charlie',
    email: 'charlie@example.com',
    // Password "password3"
    password: '$2b$10$Rk0qjfY3HqOvfa1d8gWzWe0R5XmqyYRm7nDSlX/xsM/OMRZpX71wG',
    onboardingAnswers: {
      cat_dog: "Cat person",
      StarWars_StarTrek: "Star Wars",
      eye_color: "Green",
      novels_read: "6-10",
      math_conference: "SRTL",
      professional_cat: "Educator",
      intro_extrovert: "Ambivert (combines traits of both)",
      teaching_subj: "Pre-service teaching",
      paper_writing: "Dot matrix printer",
      pizza_topping: "Veggie",
      earthquake_mag: "2-4",
      magazine_read: "Game Informer",
      birthday_month: "March/April",
      email_client: "Eudora",
      movies_theater: "0-2",
      gender: "Male",
      region_youth: "South",
      region_current: "Midwest",
      am_beverage: "Tea",
      siblings: "3 siblings",
      living_scenario: "Shared living – apartment",
      community: "Outer suburbs",
      fiction_type: "Fantasy",
      TVs: 1,
      pets: 2,
      commute_miles: 15,
      commute_hrs: 1,
      bedtime: 21,
      grandchildren: 0,
      operas_seen: 0,
      car_mpg: 35,
      email: 5,
      ice_cream: "Strawberry",
      hobby: "Gaming",
      mother_name: "Barbara",
      vacation_type: "City break",
      nobody_knows: "I sing in the shower"
    }
  },
  {
    id: 4,
    username: 'dana',
    email: 'dana@example.com',
    // Password "password4"
    password: '$2b$10$q3Hf8cMypIQml5AkOBF8LO7HkNnQxzyWOq9GjLgMW9njVnXGx8q7u',
    onboardingAnswers: {
      cat_dog: "Dog person",
      StarWars_StarTrek: "Star Trek",
      eye_color: "Hazel",
      novels_read: "More than 10",
      math_conference: "ASA",
      professional_cat: "Entrepreneur/Consultant",
      intro_extrovert: "Extrovert",
      teaching_subj: "Science",
      paper_writing: "Laser printer",
      pizza_topping: "Cheese",
      earthquake_mag: "6-7",
      magazine_read: "Nationall Geographic",
      birthday_month: "July/August",
      email_client: "Hotmail",
      movies_theater: "10-20",
      gender: "Female",
      region_youth: "West",
      region_current: "West",
      am_beverage: "Good coffee",
      siblings: "1 sibling",
      living_scenario: "House with self / family",
      community: "Between suburbs and rural",
      fiction_type: "Historical drama",
      TVs: 3,
      pets: 1,
      commute_miles: 25,
      commute_hrs: 2,
      bedtime: 22,
      grandchildren: 1,
      operas_seen: 2,
      car_mpg: 20,
      email: 20,
      ice_cream: "Mint chocolate chip",
      hobby: "Cooking",
      mother_name: "Patricia",
      vacation_type: "Cruise",
      nobody_knows: "I write poetry secretly"
    }
  },
  {
    id: 5,
    username: 'eve',
    email: 'eve@example.com',
    // Password "password5"
    password: '$2b$10$w7a4YfUSexJQ1b8CYpCVMe86Kq3uKb8IH9c0HJW3GtI5AZwI3yQvS',
    onboardingAnswers: {
      cat_dog: "Cat person",
      StarWars_StarTrek: "Star Wars",
      eye_color: "Gray",
      novels_read: "3-5",
      math_conference: "NCTM",
      professional_cat: "Student",
      intro_extrovert: "Introvert",
      teaching_subj: "Other/None",
      paper_writing: "Pencil and paper",
      pizza_topping: "Veggie",
      earthquake_mag: "0-2",
      magazine_read: "Better Homes and Gardens",
      birthday_month: "September/October",
      email_client: "Yahoo",
      movies_theater: "20+",
      gender: "Female",
      region_youth: "Outside the US",
      region_current: "Outside the US",
      am_beverage: "Tea",
      siblings: "4 or more siblings",
      living_scenario: "Shared living – house",
      community: "Rural",
      fiction_type: "Romance",
      TVs: 2,
      pets: 3,
      commute_miles: 5,
      commute_hrs: 0.5,
      bedtime: 20,
      grandchildren: 0,
      operas_seen: 0,
      car_mpg: 40,
      email: 8,
      ice_cream: "Cookies and cream",
      hobby: "Drawing",
      mother_name: "Margaret",
      vacation_type: "Road trip",
      nobody_knows: "I doodle cartoons"
    }
  }
];

function createUser({ username, password, email }) {
  if (users.find(u => u.username === username)) {
    throw new Error('Username already exists.');
  }
  return bcrypt.hash(password, 10).then(hashedPassword => {
    const newUser = { id: users.length + 1, username, email, password: hashedPassword, onboardingAnswers: {} };
    users.push(newUser);
    return newUser;
  });
}

async function authenticateUser({ username, password }) {
  const user = users.find(u => u.username === username);
  if (!user) {
    throw new Error('User not found.');
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid password.');
  }
  return user;
}

function getUserById(id) {
  return users.find(u => u.id.toString() === id.toString());
}

function updateUser(id, data) {
  const user = getUserById(id);
  if (!user) {
    throw new Error('User not found.');
  }
  Object.assign(user, data);
  return user;
}

module.exports = {
  createUser,
  authenticateUser,
  getUserById,
  updateUser,
  users
};
