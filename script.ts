import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});
async function main() {
  // ... you will write your Prisma Client queries here

  const user = await prisma.user.update({
    where: {
      email: "alice@prisma.io",
    },
    data: {
      posts: {
        create: {
          title: "Hello World",
          content: "This is a test post",
          comments: {
            create: {
              content: "This is a test comment",
              authorId: 2,
            },
          },
        },
      },
    },
    include: {
      posts: {
        include: {
          comments: {
            include: {
              author: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  console.log(JSON.stringify(user, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
