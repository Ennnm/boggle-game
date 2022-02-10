# Boggle Game API 

<div id="top"></div>

## About The Project

Boggle is a word game that is played on a 4x4 board with 16 letter tiles.
The goal is to find as many words as possible given a time constraint.

For this exercise, we are making one modification.
Now it is possible for one or more of the letter tiles to be blank (denoted by `*`).
When a tile is blank, it can be treated as any other letter.

Note that in one game it does not have to be the same character for each word.
For example, if the tiles C, T, and * are adjacent. The words cot, cat,
and cut can all be used.  

An example board:

```
A, C, E, D, L, U, G, *, E, *, H, T, G, A, F, K
```

This is equivalent to the board:

```
A C E D
L U G *
E * H T
G A F K
```

Some sample words from this board are ace, dug, eight, hole, huge, hug, tide.

<p align="right">(<a href="#top">back to top</a>)</p>	

### Built With

**Backend**

* [Express](https://expressjs.com/)
* [Sequelize/PostgreSQL](https://sequelize.org/v7/)

**Light Testing**

- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/api/bdd/)

**Hosted**

- [AWS S3](https://aws.amazon.com/s3/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* npm

  ```sh
  npm install npm@latest -g
  ```

- postgresql

  ```sh
  sudo apt update
  sudo apt upgrade
  sudo apt install postgresql
  sudo apt install postgresql-client
  ```

  

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/ennnm/boggle-game.git
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

3. Start Postgres server, login as user postgres, create new user based on your current user.

   ```sh
   sudo service postgresql start
   sudo su - postgres
   createuser -s <MY_UNIX_USERNAME>
   exit
   ```

4. Rename the username in config/config.js after <MY_UNIX_USERNAME>

5. Create database based on config

   ```sh
   npx sequelize db:create
   ```

6. Run migration to create table

   ```sh
   npx sequelize db:migrate
   ```

7. Run Node

   ```sh
   node index.mjs
   ```

   

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Deployed on http://enfrenemy.xyz/

#### Create the game

```http
POST /games
```

**request body**

```JSON
{    "duration": 1000000000,
      "random": false,
      "board": "A, N, W, O, T, M, *, S, A, L, I, H, *, S, B, Z"
}
```

- duration (required): Time in seconds
- random (required): True for random board to be generated, else takes from board parameter if provide. If board not provided, provides a default board.
- board (optional): A string of 16 characters separated by comma-and-spaces.

**response**

- Success (status 201 Created)

```json
{
  "id": 6,
  "token": "08c5769a-8d84-4323-ac89-ca8b02eb782c",
  "duration": 1000000000,
  "board": "A, N, W, O, T, M, *, S, A, L, I, H, *, S, B, Z"
}
```

- Error (400) with message if duration or random is not in request body.

#### Play the game

```http
PUT /games/:id
```

**request body**

```json
{
  "id": 6,
  "token": "08c5769a-8d84-4323-ac89-ca8b02eb782c",
  "word":"manta"
}
```

- id (required)
- token (required): For authentication of game
- word (required): Word used for the game

**response**

- Success (status 200 OK)

```json
{
  "id": 6,
  "token": "08c5769a-8d84-4323-ac89-ca8b02eb782c",
  "duration": 1000000000,
  "board": "A, N, W, O, T, M, *, S, A, L, I, H, *, S, B, Z",
  "time_left": 999911829,
  "points": 5
}
```

- Error (400) with message if:
  - game token doesn't match game id
  - word length <3
  - word is not in dictionary
  - word is not in board

#### Show the game

```http	
GET /games/:id
```

**response**

- Success (status 200 OK)

```JSON
{
  "id": 6,
  "token": "08c5769a-8d84-4323-ac89-ca8b02eb782c",
  "duration": 1000000000,
  "board": "A, N, W, O, T, M, *, S, A, L, I, H, *, S, B, Z",
  "time_left": 999911833,
  "points": 5
}
```

- Error (404) with message if game is not found



<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->

## Challenges

- Making a dictionary out of the dictionary text file.
- Translating board string into 2d array, functions to get valid adjacent cells.
- DFS with recursive backtracking for finding presence of word on the boggle board.
- Testing API from ruby testing kit.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->

## Roadmap

- [ ] Storing of past words entered for the game to ensure that the same word is not played again at the same location to score points.
- [ ] Throw error when negative duration is used to create game.
- [ ] Throw error when word entered is more than 16 characters long.
- [ ] Allow user to submit a list of words at a time (implement trie).
- [ ] More tests.

See the [open issues](https://github.com/ennnm/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>
