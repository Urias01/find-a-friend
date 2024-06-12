import { Org } from '@prisma/client'
import { OrgsRepository } from '../../repositories/orgs-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  author_name: string
  email: string
  password: string
  whatsapp: string

  cep: string
  state: string
  city: string
  neighborhood: string
  street: string

  latitude: number
  longitude: number
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
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
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new Error('ORG with same email already exists')
    }

    const org = await this.orgsRepository.register({
      name,
      author_name,
      email,
      password: password_hash,
      whatsapp,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    })

    return {
      org,
    }
  }
}
