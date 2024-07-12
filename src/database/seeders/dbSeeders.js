import userSeeder from '../../database/seeders/userSeeder.js';
import gameSeeder from '../../database/seeders/gameSeeder.js';


(async () => { 
    console.log("Starting seeders...")
    await userSeeder();
    await gameSeeder();
})();