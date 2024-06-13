import { Pet, Prisma } from '@prisma/client'

export interface FindAllPetsFilter {
  city: string
  age?: string
  energy_level?: string
  independence_level?: string
  size?: string
}

export interface PetsRepository {
  register(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findAll(filter: FindAllPetsFilter): Promise<Pet[]>
}
