import { faker } from '@faker-js/faker'
import type { User, ExtendedUser } from '../../app/types/user'

// Генерация телефона в разных форматах
const generatePhone = (): string => {
  const formats = [
    () => faker.phone.number({ style: 'international' }),
    () => faker.phone.number({ style: 'national' }),
    () => faker.phone.number({ style: 'human' })
  ]

  return faker.helpers.arrayElement(formats)()
}

// Генерация аватара
const generateAvatar = (gender?: 'male' | 'female'): string => {
  const seed = faker.string.alphanumeric(10)
  const selectedGender =
    gender || faker.helpers.arrayElement(['male', 'female'])

  const avatarApis = [
    `https://randomuser.me/api/portraits/${selectedGender}/${faker.number.int({ min: 1, max: 99 })}.jpg`,
    `https://ui-avatars.com/api/?name=${encodeURIComponent(faker.person.fullName())}&background=random&length=2&size=256`,
    `https://avatars.dicebear.com/api/avataaars/${seed}.svg`,
    faker.image.avatarGitHub(),
    faker.image.avatar()
  ]

  return faker.helpers.arrayElement(avatarApis)
}

// Генерация отдела
const generateDepartment = (): string => {
  return faker.helpers.arrayElement([
    'Engineering',
    'Product',
    'Design',
    'Marketing',
    'Sales',
    'HR',
    'Finance',
    'Infrastructure',
    'Research',
    'Customer Support'
  ])
}

// Генерация локации
const generateLocation = (): string => {
  return faker.helpers.arrayElement([
    'San Francisco, CA',
    'New York, NY',
    'Austin, TX',
    'Seattle, WA',
    'Los Angeles, CA',
    'Boston, MA',
    'Chicago, IL',
    'Denver, CO',
    'Portland, OR',
    'Miami, FL'
  ])
}

export const generateMockUsers = (count: number = 20): User[] => {
  return Array.from({ length: count }, () => {
    const gender = faker.helpers.arrayElement(['male', 'female'])

    return {
      id: faker.string.uuid(),
      name: faker.person.fullName({ sex: gender }),
      email: faker.internet.email().toLowerCase(),
      role: faker.helpers.arrayElement(['admin', 'editor', 'viewer']),
      status: faker.helpers.arrayElement(['active', 'blocked']),
      registeredAt: faker.date.past({ years: 2 }).toISOString(),
      avatar: generateAvatar(gender),
      lastLogin: faker.date.recent({ days: 30 }).toISOString(),
      phone: generatePhone()
    }
  })
}

// Расширенные данные для карточек пользователей
export const generateExtendedUserData = (user: User): ExtendedUser => {
  return {
    ...user,
    phone: user.phone || generatePhone(),
    department: generateDepartment(),
    location: generateLocation(),
    projects: faker.number.int({ min: 5, max: 45 }).toString(),
    commits: faker.number.int({ min: 100, max: 5000 }).toString()
  }
}

// Генерация расширенных пользователей
export const generateMockExtendedUsers = (
  count: number = 20
): ExtendedUser[] => {
  return generateMockUsers(count).map((user) => generateExtendedUserData(user))
}

export const mockUsers = generateMockUsers(20)
export const mockExtendedUsers = generateMockExtendedUsers(20)

// Шаблоны для разных типов пользователей
export const userTemplates = {
  admin: {
    role: 'admin' as const,
    status: 'active' as const,
    department: 'Engineering',
    projects: '24',
    commits: '1,432'
  },
  editor: {
    role: 'editor' as const,
    status: 'active' as const,
    department: 'Product',
    projects: '18',
    commits: '967'
  },
  viewer: {
    role: 'viewer' as const,
    status: 'active' as const,
    department: 'Marketing',
    projects: '7',
    commits: '234'
  },
  blocked: {
    role: 'viewer' as const,
    status: 'blocked' as const,
    department: 'Sales',
    projects: '3',
    commits: '89'
  }
}

// Валидация email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Валидация телефона
export const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[^\d+]/g, '')
  return /^\+?\d{10,15}$/.test(cleaned)
}

// Форматирование телефона
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`
  }
  return phone
}
