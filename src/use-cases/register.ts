import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { prisma } from '../lib/prisma'
import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositories/prisma/users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

// SOLID

// D => Dependency Inversion Principle

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    await this.usersRepository.create({ name, email, password_hash })
  }
}
