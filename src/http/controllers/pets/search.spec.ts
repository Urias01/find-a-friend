import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Search Pet (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    const org = await prisma.org.create({
      data: {
        name: 'ORG Animals',
        author_name: 'Animal Brown 2',
        email: 'animal.brown2@example.com',
        password: await hash('123456', 6),
        whatsapp: '11 953237408',

        cep: '06530-075',
        state: 'São Paulo',
        city: 'Santana de Parnaíba',
        neighborhood: 'Fazendinha',
        street: 'Rua São paulo',

        latitude: -23.41101,
        longitude: -46.87399,
      },
    })

    await prisma.pet.createMany({
      data: [
        {
          name: 'Teste',
          about: 'Teste',
          age: 'Teste',
          size: 'Teste',
          energy_level: 'Teste',
          independence_level: 'Teste',
          environment: 'Teste',
          org_id: org.id,
          was_adopted: false,
        },
        {
          name: 'Teste 2',
          about: 'Teste 2',
          age: 'Teste 2',
          size: 'Teste 2',
          energy_level: 'Teste 2',
          independence_level: 'Teste 2',
          environment: 'Teste 2',
          org_id: org.id,
          was_adopted: false,
        },
      ],
    })

    const response = await request(app.server).get('/pets').query({
      city: 'Santana de Parnaíba',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Teste',
        org_id: org.id,
        was_adopted: false,
      }),
      expect.objectContaining({
        name: 'Teste 2',
        org_id: org.id,
        was_adopted: false,
      }),
    ])
  })
})
