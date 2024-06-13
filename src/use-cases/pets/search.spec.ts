import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { SearchUseCase } from './search'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: SearchUseCase

describe('Search Pet Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchUseCase(petsRepository)

    orgsRepository.register({
      id: 'org-01',
      name: 'Teste',
      author_name: 'Teste',
      email: 'teste@teste.com',
      password: await hash('123456', 6),
      whatsapp: 'Teste',

      cep: 'Teste',
      city: 'Cidade 01',
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

    petsRepository.items.push({
      id: 'pet-02',
      name: 'Bob',
      about: 'Teste',
      age: 'Filhote',
      size: 'Grande',
      energy_level: 'Baixa',
      independence_level: 'Alta',
      environment: 'Teste',
      org_id: 'org-01',
    })

    petsRepository.items.push({
      id: 'pet-03',
      name: 'Thoi',
      about: 'Teste',
      age: 'Adolescente',
      size: 'Médio',
      energy_level: 'Média',
      independence_level: 'Baixa',
      environment: 'Teste',
      org_id: 'org-01',
    })
  })

  it('should be able to search a pet by city', async () => {
    const pets = await sut.execute({ city: 'Cidade 01' })

    expect(pets).toHaveLength(3)
    expect(pets[0].id).toEqual(expect.any(String))
  })

  it('should be able to search a pet by age', async () => {
    let pets = await sut.execute({ city: 'Cidade 01', age: 'Filhote' })

    expect(pets).toHaveLength(1)
    expect(pets[0].age).toEqual('Filhote')

    pets = await sut.execute({ city: 'Cidade 01', age: 'Adulto' })

    expect(pets).toHaveLength(1)
    expect(pets[0].age).toEqual('Adulto')
  })

  it('should be able to search a pet by size', async () => {
    let pets = await sut.execute({ city: 'Cidade 01', size: 'Grande' })

    expect(pets).toHaveLength(1)
    expect(pets[0].size).toEqual('Grande')

    pets = await sut.execute({ city: 'Cidade 01', size: 'Pequeno' })

    expect(pets).toHaveLength(1)
    expect(pets[0].size).toEqual('Pequeno')
  })

  it('should be able to search a pet by energy level', async () => {
    let pets = await sut.execute({ city: 'Cidade 01', energy_level: 'Alta' })

    expect(pets).toHaveLength(1)
    expect(pets[0].energy_level).toEqual('Alta')

    pets = await sut.execute({ city: 'Cidade 01', energy_level: 'Baixa' })

    expect(pets).toHaveLength(1)
    expect(pets[0].energy_level).toEqual('Baixa')
  })

  it('should be able to search a pet by independence level', async () => {
    let pets = await sut.execute({
      city: 'Cidade 01',
      independence_level: 'Média',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].independence_level).toEqual('Média')

    pets = await sut.execute({ city: 'Cidade 01', independence_level: 'Alta' })

    expect(pets).toHaveLength(1)
    expect(pets[0].independence_level).toEqual('Alta')
  })

  it('should be able to search a pet by all filter', async () => {
    const pets = await sut.execute({
      city: 'Cidade 01',
      age: 'Adolescente',
      size: 'Médio',
      energy_level: 'Média',
      independence_level: 'Baixa',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(
      expect.objectContaining({
        name: 'Thoi',
        age: 'Adolescente',
        size: 'Médio',
        energy_level: 'Média',
        independence_level: 'Baixa',
      }),
    )
  })
})
