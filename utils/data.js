const firstnames = [
  "Charlotte",
  "Luigi",
  "Gregoire",
  "Frank",
  "Magnus",
  "Giacomo",
];

const lastnames = [
  "Malkavian",
  "Nosferatu",
  "Tremere",
  "Brujah",
  "Lasombra",
  "Dementation",
];

const emails = [
  "FirstNestling@gmail.com",
  "SecondNestling@gmail.com",
  "ThirdNestling@gmail.com",
  "FourthNestling@gmail.com",
  "FifthNestling@gmail.com",
  "SixthNestling@gmail.com",
];

const thoughts = [
  "Just a simple thought",
  "My thought that never occurred to me",
  "This was invented by me but not for me",
  "A particularly deep thought about the upcoming lunch",
  "And yet there is an error somewhere in this code",
  "I see the light, I guess I will go to it",
  "I invite you to join our group of sunrise watchers.",
  "An aspen stake is definitely healthier than an oak stake, isn’t it?",
  "The last party was incredible, the guests were happy",
  "Yesterday was Friday, tomorrow will be Saturday, excuse me, but what about today?",
];

const reactions = [
  "Newer mind",
  "Bless you",
  "This is disgusting",
  "My heart was broken",
  "This is so cute",
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

const getRandomName = () =>
  `${getRandomArrItem(firstnames)} ${getRandomArrItem(lastnames)}`;

const getRandomEmail = () => getRandomArrItem(emails);

const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push(getRandomArrItem(thoughts));
  }

  return results;
};

const getRandomReactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push(getRandomArrItem(reactions));
  }
  return results;
};

module.exports = { genRandomIndex, getRandomArrItem, getRandomName, getRandomEmail,  getRandomThoughts, getRandomReactions};