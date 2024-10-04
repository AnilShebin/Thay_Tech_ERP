import { faker } from '@faker-js/faker';

export type Person = {
  avatar: string; // Changed from string | StaticImport to just string
  firstName: string; // Field: First Name
  lastName: string; // Field: Last Name
  email: string; // Field: Email Address
  phone: string; // Field: Phone Number
  gender: string; // Field: Gender
  alternateNumber: string; // Field: Alternate Number
  role: string; // Field: Role
  designation: string; // Field: Designation
  staffId: string; // Field: Staff ID
  status: string; // Field: Status (e.g., Active, Inactive)
  image: string; // Field: Image URL
};

export const makeData = (numberOfRows: number): Person[] =>
  [...Array(numberOfRows).fill(null)].map(() => ({
    avatar: faker.image.avatar(), // Ensure to generate a random avatar image URL
    firstName: faker.person.firstName(), // Generate a random first name
    lastName: faker.person.lastName(), // Generate a random last name
    email: faker.internet.email(), // Generate a random email
    phone: faker.phone.number(), // Generate a random phone number
    gender: faker.person.gender(), // Generate a random gender
    alternateNumber: faker.phone.number(), // Generate a random alternate phone number
    role: faker.name.jobTitle(), // Generate a random role
    designation: faker.name.jobType(), // Generate a random designation
    staffId: faker.number.int({ min: 100000, max: 999999 }).toString(), // Generate a random 6-digit Staff ID
    status: faker.datatype.boolean() ? 'On Time' : 'Late', // Randomly assign status
    image: faker.image.avatar(), // Generate a random image URL
  }));
