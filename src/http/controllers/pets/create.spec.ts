import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { hash } from 'bcryptjs'

describe('Create a Pet (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateUser(app)

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

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Teste',
        about: 'Teste',
        age: 'Teste',
        size: 'Teste',
        energy_level: 'Teste',
        independence_level: 'Teste',
        environment: 'Teste',
        org_id: org.id,
        was_adopted: false,
      })

    expect(response.statusCode).toEqual(201)
  })
})
