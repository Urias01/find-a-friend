import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      name: 'ORG Animals',
      author_name: 'Animal Brown',
      email: 'animal.brown@example.com',
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

  await request(app.server)
    .post('/orgs')
    .send({
      name: 'ORG Animals',
      author_name: 'Animal Brown',
      email: 'animal.brown@example.com',
      password: await hash('123456', 6),
      whatsapp: '11 953237408',

      cep: '06530-075',
      state: 'São Paulo',
      city: 'Santana de Parnaíba',
      neighborhood: 'Fazendinha',
      street: 'Rua São paulo',

      latitude: -23.41101,
      longitude: -46.87399,
    })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'animal.brown@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
