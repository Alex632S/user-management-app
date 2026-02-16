import { faker } from '@faker-js/faker'
import type { User } from '../../types/user'

export const generateMockUsers = (count: number = 20): User[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['admin', 'editor', 'viewer']),
    status: faker.helpers.arrayElement(['active', 'blocked']),
    registeredAt: faker.date.past().toISOString(),
    avatar: faker.image.avatar(),
    lastLogin: faker.date.recent().toISOString()
  }))
}

export const mockUsers = generateMockUsers(20)