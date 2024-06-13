import { PetsRepository } from '@/repositories/pets-repository'

interface SearchUseCaseRequest {
  city: string
  age?: string
  size?: string
  energy_level?: string
  independence_level?: string
}

export class SearchUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energy_level,
    independence_level,
  }: SearchUseCaseRequest) {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      size,
      energy_level,
      independence_level,
    })

    return pets
  }
}
