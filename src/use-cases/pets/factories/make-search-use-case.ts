import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchUseCase } from '../search'

export function makeSearchUseCase() {
  const petRepository = new PrismaPetsRepository()
  const searchUseCase = new SearchUseCase(petRepository)

  return searchUseCase
}
