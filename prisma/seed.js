import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    prisma.user.upsert({
        where: {
            username: "admin"
        },
        create: {
            username: "admin",
            password: "admin",
            email: "admin@gmail.com",
            role: "admin",
        }
    })
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
});