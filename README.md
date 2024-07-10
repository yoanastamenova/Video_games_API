# STEPS TO FOLLOW WHEN WORKING WITH MONGO ENVIRONMENT

## CREATE SERVER

1. ``` git init ``` (creates our git repo)

2.  ``` npm init ``` (creates node_modules)

3. CREATE .gitignore     inside include  /node_modules

4. ``` npm i express ```

5. create folder SRC - inside this folder CREATE server.js
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

6. ``` npm i nodemon ``` 

7. add scripts into package.json

``` "start": "node ./src/server.js" ```
``` "dev": "nodemon ./src/server.js" ```

8. now can use npm run dev to run server

9. add in package json -
``` "type":"module", under "main" ```

10. ``` npm i dotenv ```

11. ``` import 'dotenv/config' ``` en server.js

12. create .env 

13. inside .env - create PORT const and include it in place of 4000

14. create .env.example > add PORT Inside

15. implement the healthy route 

## ESTABLISH CONNECTION WITH A DATABASE
(in our case MongoDB)

16. Run docker MongoDB container (if not installed: 
```docker run -d -p 27017:27017 --name mongo -v mongo_data:/data/db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo:latest ```
)

17. ```npm i mongoose ```

18. In folder SRC create new folder Database and inside file db.js

19. Create in .env and .env.example a variable called 'MONGO_URI'

20. In this file type:

``` 
import mongoose from 'mongoose';
import 'dotenv/config';


export const dbConnection = () => {
    console.log('Start connection');
    return mongoose.connect( MONGO_URI, {})
}

```

21. Import the function dbConnection to server.js as follows:

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

22. Establish connection between the server and the DB with npm run dev 

23. New connection -> URI and paste our URI

## CREATE ENTITITES:

24. In folder Database create new folder -> Entities

25. Inside Entities create another folder named after each of the entities in our DB

ex. games

26. Inside each entitiy folder create entitiyName.model.js

ex.game.model.js

27. In the file include all the columns needed->

```
import { Schema, model } from "mongoose";

const GameSchema = new Schema(
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
        timestamps: true,
        versionKey: false
    }
)

const Game = model('Game', GameSchema)

export default Game;
```

28. go back to server.js and start creating CRUD routes
ex. app.post('/games', createGame)

## CREATING CRUD FUNCTIONS INSIDE CONTROLLERS

29. Inside our controller create the function we want
an example:

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