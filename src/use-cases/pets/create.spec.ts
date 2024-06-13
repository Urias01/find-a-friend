import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUseCase } from './create'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreateUseCase

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreateUseCase(petsRepository, orgsRepository)

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
  })

  it('should be able to create a new pet', async () => {
    const { pet } = await sut.execute({
      name: 'Teste',
      about: 'Teste',
      age: 'Teste',
      size: 'Teste',
      energy_level: 'Teste',
      independence_level: 'Teste',
      environment: 'Teste',
      org_id: 'org-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new pet with inexistent org', async () => {
    await expect(() =>
      sut.execute({
        name: 'Teste',
        about: 'Teste',
        age: 'Teste',
        size: 'Teste',
        energy_level: 'Teste',
        independence_level: 'Teste',
        environment: 'Teste',
        org_id: 'org-02',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
