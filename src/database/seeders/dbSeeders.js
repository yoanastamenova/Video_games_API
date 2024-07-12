import userSeeder from './userSeeder.js';
import gameSeeder from './gameSeeder.js';
import commentSeeder from './commentSeeder.js';


(async () => { 
    console.log("Starting seeders...")
    await userSeeder();
    await gameSeeder();
    await commentSeeder();
})();