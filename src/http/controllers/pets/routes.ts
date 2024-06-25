import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { getPet } from './get-pet'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:id', getPet)
  app.get('/pets', search)

  // Authenticated
  app.post('/pets', { onRequest: [verifyJwt] }, create)
}
