import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository, FindAllPetsFilter } from '../pets-repository'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async register(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }

  async findAll(filter: FindAllPetsFilter) {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === filter.city,
    )

    const pets = this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
      .filter((item) => (filter.age ? item.age === filter.age : true))
      .filter((item) => (filter.size ? item.size === filter.size : true))
      .filter((item) =>
        filter.energy_level ? item.energy_level === filter.energy_level : true,
      )
      .filter((item) =>
        filter.independence_level
          ? item.independence_level === filter.independence_level
          : true,
      )

    return pets
  }
}
