
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

// In-memory 'database' for mock users
const users: User[] = [
  {
    id: '1',
    name: 'Marry Doe',
    email: 'Marry@Gmail.Com',
    avatarUrl: 'https://picsum.photos/200/200',
  },
];

let nextUserId = 2;

/**
 * Finds a user by their email address.
 * @param email The email of the user to find.
 * @returns The user object or undefined if not found.
 */
export function findUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

/**
 * Creates a new user and adds them to the mock database.
 * @param userData The basic user data (name, email).
 * @returns The newly created user.
 */
export function createUser(userData: {name: string; email: string}): User {
  const existingUser = findUserByEmail(userData.email);
  if (existingUser) {
    // In a real app, you might throw an error or handle this differently
    return existingUser;
  }

  const newUser: User = {
    id: String(nextUserId++),
    name: userData.name,
    email: userData.email,
    avatarUrl: `https://picsum.photos/seed/${nextUserId}/200/200`,
  };
  users.push(newUser);
  return newUser;
}

/**
 * Retrieves a user by their ID.
 * @param userId The ID of the user to retrieve.
 * @returns The user object or undefined if not found.
 */
export function getMockUser(userId: string): User | undefined {
  return users.find((user) => user.id === userId);
}
