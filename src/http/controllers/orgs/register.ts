import { OrgAlreadyExistsError } from '@/use-cases/orgs/errors/org-alredy-exists-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase } from '@/use-cases/orgs/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string(),
    password: z.string(),
    whatsapp: z.string(),

    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),

    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  })

  const {
    name,
    author_name,
    email,
    password,
    whatsapp,

    cep,
    state,
    city,
    neighborhood,
    street,

    latitude,
    longitude,
  } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({
      name,
      author_name,
      email,
      password,
      whatsapp,

      cep,
      state,
      city,
      neighborhood,
      street,

      latitude,
      longitude,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      reply.status(400).send({ error: err.message })
    }

    throw err
  }

  reply.status(201).send()
}
