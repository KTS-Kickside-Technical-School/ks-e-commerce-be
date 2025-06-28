import connect from "../config/config";
import seedUsers from "./users";

connect().then(async ()=>{
    await seedUsers();
    process.exit(1)
})