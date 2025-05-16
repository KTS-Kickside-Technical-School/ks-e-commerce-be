import connect from "../config/config";
import unseedUsers from './users'

connect().then(async () =>{
    try {
        await unseedUsers()
    } catch (error) {
        console.error("Error occured during unseeding:", error);
    } finally{
        process.exit(1)
    }
});