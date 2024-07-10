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

------------- CONNECT DB -------------

16. 