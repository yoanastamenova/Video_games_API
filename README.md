# STEPS TO FOLLOW WHEN WORKING WITH MONGO ENVIRONMENT

## CREATE SERVER

1. ``` git init ``` (creates our git repo)

2.  ``` npm init ``` (creates node_modules)

3. CREATE .gitignore     inside include  /node_modules

4. ``` npm i express ```   (install express JS package)

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

6. ``` npm i nodemon ```  (installs nodemon package and we dont need deps!)

7. add scripts into package.json  (to run the server in development)

``` "start": "node ./src/server.js" ```
``` "dev": "nodemon ./src/server.js" ```
``` "type":"module", under "main" ```

8. ``` npm i dotenv ``` (installing dot env package to use it for env files)

9. ``` import 'dotenv/config' ``` en server.js     

10. create .env file

11. inside .env - create PORT const and include it in place of 4000

12. create .env.example > add PORT Inside

13. implement the healthy route as in server.js

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
