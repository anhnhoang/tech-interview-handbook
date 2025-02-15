import { COMPANIES } from './companySeed';
const { PrismaClient } = require('@prisma/client');

const cities = require('./data/cities.json');
const countries = require('./data/countries.json');
const states = require('./data/states.json');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding started...');

  console.info('Seeding companies');
  await prisma.company.createMany({
    data: COMPANIES.map((company) => ({
      name: company.name,
      slug: company.slug,
      description: company.description,
      logoUrl: company.logoUrl,
    })),
    skipDuplicates: true,
  });

  console.info('Seeding countries');
  await prisma.country.createMany({
    data: countries.data.map((country) => ({
      id: country.country_id,
      code: country.sortname,
      name: country.country_name,
    })),
    skipDuplicates: true,
  });

  console.info('Seeding states');
  await prisma.state.createMany({
    data: states.data.map((state) => ({
      id: state.state_id,
      countryId: state.country_id,
      name: state.state_name,
    })),
    skipDuplicates: true,
  });

  console.info('Seeding cities');
  await prisma.city.createMany({
    data: cities.data.map((city) => ({
      id: city.city_id,
      stateId: city.state_id,
      name: city.city_name,
    })),
    skipDuplicates: true,
  });

  console.log('Seeding completed.');
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
