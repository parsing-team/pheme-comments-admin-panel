import { PrismaClient } from './node_modules/.prisma/twitter-client/index.js';
import { analyzeTwitterUser } from './src/services/twitter/bot-detection.js';

const prisma = new PrismaClient();

async function main() {
    console.log("Searching for user @conexio2007...");
    const user = await prisma.profiles.findFirst({
        where: { username: 'conexio2007' }
    });

    if (!user) {
        console.error("User not found!");
        return;
    }

    console.log("Found user:", user.id, user.username);
    console.log("ID Type:", typeof user.id);

    console.log("Running analysis...");
    const result = await analyzeTwitterUser(user.id);
    console.log("Analysis Result:", JSON.stringify(result, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
