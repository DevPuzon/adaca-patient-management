import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding 200 patients...');

  const patients = Array.from({ length: 200 }).map(() => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: 'national' }),
    birthDate: faker.date.birthdate({ min: 1950, max: 2005, mode: 'year' }),
    gender: faker.helpers.arrayElement(['male', 'female']),
  }));

  await prisma.patient.createMany({ data: patients });

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
