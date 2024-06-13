import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface CreateUseCaseRequest {
  name: string
  about: string
  age: string
  size: string
  energy_level: string
  independence_level: string
  environment: string
  org_id: string
}

interface CreateUseCaseResponse {
  pet: Pet
}

export class CreateUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    org_id,
  }: CreateUseCaseRequest): Promise<CreateUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.register({
      name,
      about,
      age,
      size,
      energy_level,
      independence_level,
      environment,
      org_id,
    })

    return { pet }
  }
}
