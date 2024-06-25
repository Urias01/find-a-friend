import { makeSearchUseCase } from '@/use-cases/pets/factories/make-search-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchQuerySchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    independence_level: z.string().optional(),
  })

  const { city, age, size, energy_level, independence_level } =
    searchQuerySchema.parse(request.query)

  const searchUseCase = makeSearchUseCase()

  const pets = await searchUseCase.execute({
    city,
    age,
    size,
    energy_level,
    independence_level,
  })

  reply.status(200).send({ pets })
}
