![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

# Individual Project - Henry Pokemon

<img height="150" src="./pokemon.png" />

<img src="https://i.imgur.com/xuNwBBZ.png" width="333" height="205"  />
<img src="https://i.imgur.com/vI9w4E3.png" width="333" height="205"  />
<img src="https://i.imgur.com/a2YxyUO.png" width="333" height="205"  />

## Project Objectives

- Build an App using React, Redux, Node and Sequelize.
- To affirm and connect the concepts learned in the course.
- Learn best practices.
- Learn and practice GIT workflow.
- Use and practice testing.

## Statement

The general idea is to create an application in which you can see the different Pokemon using the external api [pokeapi](https://pokeapi.co/) and from it be able to, among other things:

- Search pokemons
- Filter / Sort them
- Create new

#### Necessary technologies

- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

## Frontend

A React/Redux application must be developed containing the following screens/paths.

__Home page__: they must build a landing page with

- Some background image representative of the project.
- Button to enter the home page (`Main path`)

Main route: must contain

- Search input to find pokemon by name (The search will be exact, i.e. it will only find the pokemon if the full name is entered).
- Area where you will see the list of pokemon. At startup it should load the first results obtained from the path `GET /pokemons` and it should show its name:
  - Image
  - Name
  - Types (Electric, Fire, Water, etc)
- Buttons/Options to filter by pokemon type and by existing pokemon or pokemon created by us.
- Buttons/Options to sort both ascending and descending pokemon by alphabetical order and by attack.
- Pagination to search and display the following pokemon, 12 pokemon per page.

IMPORTANT: Inside the Main Path you must show the pokemon brought from the API as well as the ones from the database. On the other hand, if you check the endpoint that brings all the pokemon you will see that it does not show the information of the pokemon but a URL to make a subrequest and obtain the data from there. You will have to for each pokemon you are going to show make another request to that URL to get its image and types. Because this can make the search very slow limit the total result to 40 total pokemon.

Pokemon detail path__: must contain

- The fields shown in the main path for each pokemon (image, name and types).
- [ ] Pokemon number (id)
- [ ] Stats (life, attack, defense, speed)
- Height and weight

Creation path__: must contain

- A form __JavaScript driven__ with the fields mentioned in the Pokemon's detail
- [ ] Possibility to select/add more than one type of Pokemon
- Button/option to create a new Pokemon

> It is required that the creation form is validated with JavaScript and not only with HTML validations. You can add the validations you consider. For example: The name of the Pokemon cannot contain numeric characters, the height cannot be higher than a certain value, etc.

## Database

The database model must have the following entities (Those properties marked with an asterisk must be mandatory):

- [ ] Pokemon with the following properties:
  - ID (Pokemon number) * : Cannot be an ID of a pokemon already existing in the pokeapi API.
  - Name * : Name * : Life
  - Life
  - Attack
  - Defense
  - Speed (Speed)
  - Height
  - Weight
- Type with the following properties:
  - ID
  - Name

The relationship between both entities must be many-to-many since a pokemon can belong to more than one type and, in turn, a type can include many pokemons.

## Backend

A server must be developed in Node/Express with the following paths:

- [ ] __GET /pokemons__:
  - Get a listing of pokemons from pokeapi.
  - It should return only the data needed for the main path.
- [ ] __GET /pokemons/{idPokemon}__:
  - Get the detail of a particular pokemon.
  - It must return only the data requested in the pokemon detail path.
  - Note that it has to work for both an existing pokemon id in pokeapi or one created by you.
- [ ] __GET /pokemons?name="..."__:
  - Get the pokemon that exactly matches the name passed as query parameter (Can be from pokeapi or created by us).
  - If no pokemon exists show a suitable message
- [ ] __POST /pokemons__:
  - Receives the data collected from the form controlled pokemon creation path by body
  - Creates a pokemon in the database related to its types.
- [ ] __GET /types__:
  - Get all possible pokemon types.
  - In a first instance you should bring them from pokeapi and save them in your own database and then use them from there.

## Testing

- [ ] At least have a frontend component with its respective tests
- [ ] At least have a backend path with its respective tests
- [ ] At least have a database model with its respective tests
