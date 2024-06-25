import { Prisma } from '@prisma/client'
import { FindAllPetsFilter, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async register(data: Prisma.PetUncheckedCreateInput) {
    const pets = await prisma.pet.create({ data })

    return pets
  }

  async findAll(filter: FindAllPetsFilter) {
    const pets = await prisma.pet.findMany({
      where: {
        age: filter.age,
        energy_level: filter.energy_level,
        independence_level: filter.independence_level,
        size: filter.size,
        org: {
          city: {
            contains: filter.city,
            mode: 'insensitive',
          },
        },
      },
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }
}
