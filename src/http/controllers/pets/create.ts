import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreateUseCase } from '@/use-cases/pets/factories/make-create-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    independence_level: z.string(),
    environment: z.string(),
    org_id: z.string(),
    was_adopted: z.boolean(),
  })

  const {
    name,
    about,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    org_id,
    was_adopted,
  } = createBodySchema.parse(request.body)

  try {
    const createUseCase = makeCreateUseCase()
    await createUseCase.execute({
      name,
      about,
      age,
      size,
      energy_level,
      independence_level,
      environment,
      org_id,
      was_adopted,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      reply.status(404).send({ error: err.message })
    }
    throw err
  }

  reply.status(201).send()
}
