import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { GetPetUseCase } from './get-pet'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetUseCase(petsRepository)

    orgsRepository.register({
      id: 'org-01',
      name: 'Teste',
      author_name: 'Teste',
      email: 'teste@teste.com',
      password: await hash('123456', 6),
      whatsapp: 'Teste',

      cep: 'Teste',
      city: 'Teste',
      neighborhood: 'Teste',
      street: 'Teste',
      state: 'Teste',

      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    petsRepository.items.push({
      id: 'pet-01',
      name: 'Max',
      about: 'Teste',
      age: 'Adulto',
      size: 'Pequeno',
      energy_level: 'Alta',
      independence_level: 'Média',
      environment: 'Teste',
      org_id: 'org-01',
    })
  })

  it('should be able to get a pet', async () => {
    const { pet } = await sut.execute({
      id: 'pet-01',
    })

    expect(pet.id).toEqual('pet-01')
  })

  it('should not be able to get a pet', async () => {
    await expect(() =>
      sut.execute({
        id: 'pet-02',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
