import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetPetUseCase } from '../../../use-cases/pets/factories/make-get-pet-use-case'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = getPetParams.parse(request.params)

  console.log(id)

  try {
    const getPetUseCase = makeGetPetUseCase()
    const { pet } = await getPetUseCase.execute({ id })

    reply.status(200).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
