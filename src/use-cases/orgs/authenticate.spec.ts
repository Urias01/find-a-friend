import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate a ORG', async () => {
    await orgsRepository.register({
      name: 'Teste',
      author_name: 'Teste',
      email: 'teste@teste.com',
      password: await hash('123456', 6),
      whatsapp: '123',
      cep: '123',
      state: '123',
      city: '123',
      neighborhood: '123',
      street: '123',
      latitude: 123,
      longitude: 123,
    })

    const { org } = await sut.execute({
      email: 'teste@teste.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await orgsRepository.register({
      name: 'Teste',
      author_name: 'Teste',
      email: 'teste@teste.com',
      password: await hash('123456', 6),
      whatsapp: '123',
      cep: '123',
      state: '123',
      city: '123',
      neighborhood: '123',
      street: '123',
      latitude: 123,
      longitude: 123,
    })

    await expect(() =>
      sut.execute({
        email: 'john@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.register({
      name: 'Teste',
      author_name: 'Teste',
      email: 'teste@teste.com',
      password: await hash('123456', 6),
      whatsapp: '123',
      cep: '123',
      state: '123',
      city: '123',
      neighborhood: '123',
      street: '123',
      latitude: 123,
      longitude: 123,
    })

    await expect(() =>
      sut.execute({
        email: 'teste@teste.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
