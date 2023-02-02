const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const MONGODB_URI = 'mongodb://127.0.0.1/recipe-app';
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Iteration 2 - Create a recipe
    const curryChicken = {
      title: "Curry-chicken",
      level: "Amateur Chef",
      ingredients: ["chicken", "curry", "noodles", "coconut milk"],
      cuisine: "thai",
      dishType: "main_course",
      duration: 15,
      creator: "Nomin",
    };
    Recipe.create(curryChicken)
      .then((curryChickenInDB) => {
      console.log("Nice, enjoy!", curryChickenInDB, curryChicken.title);
    })
      .catch((err) => {
      console.log("There was error creating the recipe", err);
    });
    // Iteration 3-4-5
    Recipe.insertMany(data)
      .then((recipeArrDB) => {
      console.log("the array was created", recipeArrDB),
      recipeArrDB.forEach(element => {console.log(element.title)});
    Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
      .then((updatedPasta) => {
        console.log("Recipe Updated", updatedPasta);
    })
    Recipe.deleteOne({ title: "Carrot Cake" })
      .then((deletedCake) => {
        console.log("Success!", deletedCake)
    })
    })
      .catch((err) => console.log(err));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  mongoose.connection.close();