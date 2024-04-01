const connection = require("../config/connection");
var mongoose = require("mongoose");
const { User, Thought, Reaction } = require("../models");

const {
  genRandomIndex,
  getRandomArrItem,
  getRandomName,
  getRandomEmail,
  getRandomThoughts,
  getRandomReactions,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }
  let reactionCheck = await connection.db
    .listCollections({ name: "reactions" })
    .toArray();
  if (reactionCheck.length) {
    await connection.dropCollection("reactions");
  }
  const users = [];
  const userNames = [];
  const friends = [];

  const thoughtsList = getRandomThoughts(10);
  const reactionList = getRandomReactions(5);
  const allThoughts = [];
  const allReactions = [];

  for (let i = 0; i < 6; i++) {
    const username = getRandomName();
    userNames.push(username);
  }

  reactionList.forEach((reaction) => {
    const username = getRandomArrItem(userNames);
    var newId = new mongoose.mongo.ObjectId();
    allReactions.push({
      reactionId: newId,
      reactionBody: reaction,
      username: username,
    });
  });

  thoughtsList.forEach((thought) => {
    const username = getRandomArrItem(userNames);
    var newId = new mongoose.mongo.ObjectId();
    allThoughts.push({
      id: newId,
      thoughtText: thought,
      username: username,
      reactions: [allReactions[genRandomIndex(allReactions)]],
    });
  });

  userNames.forEach((username) => {
    const email = `${username.replace(/\s/g, "")}${getRandomEmail()}`;
    const filteredThoughts = allThoughts.filter(function (item) {
      return item.username === username;
    });
    const thoughts = filteredThoughts.map((item) => item.id);
    users.push({
      username,
      email,
      thoughts,
      friends,
    });
  });
  
// create tables
  const thoughtData = await Thought.insertMany(allThoughts);
  const usersData = await User.insertMany(users);

  console.info("Seeding complete!");
  process.exit(0);
});
