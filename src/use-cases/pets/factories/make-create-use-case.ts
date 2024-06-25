import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreateUseCase } from '../create'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeCreateUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const createUseCase = new CreateUseCase(petsRepository, orgsRepository)

  return createUseCase
}
