// prisma/seed.js
const { prisma } = require("../src/lib/prisma");
const bcrypt = require("bcryptjs");

async function main() {
  const email = "admin@bmtrading.com";
  const plain = "StrongAdminPass!23"; // change this
  const hashed = await bcrypt.hash(plain, 10);

  await prisma.user.upsert({
    where: { email },
    update: {
      name: "BM Admin",
      role: "ADMIN",
      password: hashed,
      emailVerified: new Date(),
    },
    create: {
      email,
      name: "BM Admin",
      role: "ADMIN",
      password: hashed,
      emailVerified: new Date(),
    },
  });

  console.log("Seeded admin user:", email, "password:", plain);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });