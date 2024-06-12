import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to register a new org', async () => {
    const { org } = await sut.execute({
      name: 'Teste',
      author_name: 'Teste',
      email: 'teste@teste',
      password: '123',
      whatsapp: '123',
      cep: '123',
      state: '123',
      city: '123',
      neighborhood: '123',
      street: '123',
      latitude: 123,
      longitude: 123,
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should be able to hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Teste',
      author_name: 'Teste',
      email: 'teste@teste',
      password: '123',
      whatsapp: '123',
      cep: '123',
      state: '123',
      city: '123',
      neighborhood: '123',
      street: '123',
      latitude: 123,
      longitude: 123,
    })

    const isPasswordCorrectlyHashed = await compare('123', org.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
