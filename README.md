# STEPS TO FOLLOW WHEN WORKING WITH MONGO ENVIRONMENT

<div align="center">
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
</div>

## CREATE SERVER

1. ``` git init ``` (creates our git repo)

2.  ``` npm init ``` (creates node_modules)

3. CREATE .gitignore     inside include  /node_modules

4. ``` npm i express ```   (install express JS package)

5. ``` npm i nodemon ```  (installs nodemon package and we dont need deps!)

6. add scripts into package.json  (to run the server in development)

``` "start": "node ./src/server.js" ```
``` "dev": "nodemon ./src/server.js" ```
``` "type":"module", under "main" ```

7. ``` npm i dotenv ``` (installing dot env package to use it for env files)  

8. create .env file

9. inside .env - create PORT const and include it in place of 4000

10. create .env.example > add PORT Inside

11. create folder SRC - inside this folder CREATE server.js
inside include :

```
    import express from 'express';
    import 'dotenv/config'

    const app = express()
    app.use(express.json())              

    const PORT = process.env.PORT || 5001

    app.listen(PORT, () => {
    console.log(`Server running! ${PORT}`)
    })
```

12. ``` import 'dotenv/config' ``` in our server.js   

13. implement the healthy route in server.js to test if it is working and if yes - we are good to go

```
app.get('/healthy', (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy!"
    });
});
```

14. server is ready to use with ``` npm run dev ```


## CREATE CONNECTION WITH A DATABASE
(in our case MongoDB)

15. Run docker MongoDB container (if not installed use this command: 
```docker run -d -p 27017:27017 --name mongo -v mongo_data:/data/db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo:latest ```
)

16. ```npm i mongoose ``` (installs mongo package)

17. In folder SRC create new folder named Database and inside file db.js

18. Create in .env and .env.example a variable called 'MONGO_URI' which will hold the route we used in creating our container
ex. MONGO_URI=mongodb://root:root@2017:27017/test?authSource=admin

19. In this db.js file type:

``` 
import mongoose from 'mongoose';
import 'dotenv/config'

export const dbConnection = () => {
    console.log('Start connection');
    return mongoose.connect( process.env.MONGO_URI, {})
}
```

20. Import the function dbConnection to server.js as follows:

```
dbConnection()
    .then(() => {
        console.log('Database connection established!');
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error establishing connection with the database:', error);
    });
```

21. Establish connection between the server and the DB with npm run dev 

22. GO to Compass -> New connection -> URI and paste our URI

## CREATE ENTITITES:

23. In folder Database create new folder -> Entities
ex. entities

24. Inside Entities create another folder named after each of the entities in our DB

ex. games

25. Inside each entitiy folder create entitiyName.model.js

ex.   game.model.js

26. In the file include all the columns needed->

```
import { Schema, model } from "mongoose";

const NameSchema = new Schema(
    {
        title: { 
            type: String, 
            require: true
        },
        description: {
            type:  String
        },
    },
    { 
        timestamps: true,    //makes created_at and update_at automatically
        versionKey: false
    }
)

const Game = model('Game', GameSchema)     //we save the model here

export default Game;                     //exporting it for external use
```

28. go back to server.js and start creating CRUD routes
ex. app.post('/games', createGame)

## CREATING CRUD FUNCTIONS INSIDE CONTROLLERS

29. import the model we created for this entitiy
ex. import Game from "./game.model.js"

30. Inside our controller create the function we want

an example for Create function in Game:

```
export const createGame = (req, res) => {
    try {
        //1. Recuperar la info
        const { title, description } = req.body;

        //2. Verficiar la info obtenita

        if(!title || !description) {
            throw new Error("Title and description cannot be empty")
        }
        
    } catch (error) {

        if(error.message == 'Title and description cannot be empty') {
           return res.status(400).json(
            {
                success: false,
                message: "Title and description cannot be empty",
                error: error.message
            }
           )
        }

        res.status(500).json(
            {
                success: false,
                message: "Error creating game!",
                error: error.message
            }
        )
        
    }
}
```

31. Go back to server.js and add it to the route

### CREATE ROUTES

32. In the entitiy folder - create new file named entitiy.routes.js

33. Inside this file we import the Router from Express and the controller of the entitiy we need:

an example:
```
import { Router } from "express";
import { createGame } from "./games.controller.js";

const router = Router()

router.post('/games', createGame)        // to create a new game
```

34. Inside our server file we need to tell where the routes come from:

example:

```
import { router as gamesRoutes } from './entities/games/games.routes.js';

and then 

app.use('/', gamesRoutes)      

//if you put something after the / it will go before all the routes in games.routes.js
```

35.  After this point we need to add each new route we create in our Route file for the Entitiy

```
router.post('/games', createGame)        // to create a new game
router.get('/games', getAllGames)        //to see all games
router.delete('/games/:id', deleteGame)        // to delete a game by its id

```


---- OR JUST MAKE A FILE ROUTER -----
 
36. New file in folder SRC - named router.js

37. In this file put:

```
import { Router } from "express";
import { router as gamesRoutes} from "./entities/games/games.routes.js";

const router = Router()

router.use('/games', gamesRoutes)

export { router }
```

38. Remember to import and add it in the server.js file

```
import { router as gamesRoutes } from './router.js';
app.use('/api', gamesRoutes)  
```

39. Continue adding routes in router.js after creating them

## CREATING MIDDLEWARES

40. In the folder Database add new folder name middlewares

41. Inside new file with name.js

42. Import the function inside and export it