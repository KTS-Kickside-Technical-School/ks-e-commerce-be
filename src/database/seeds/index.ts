import connect from "../config/config";
import { seedUsers } from "./users";

connect().then(async () => {
    try {
        await seedUsers();
    } finally {
        process.exit(0);
    }
});