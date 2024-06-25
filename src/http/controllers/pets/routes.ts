import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { getPet } from './get-pet'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:id', getPet)

  // Authenticated
  app.post('/pets', { onRequest: [verifyJwt] }, create)
}
