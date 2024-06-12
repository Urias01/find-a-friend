# Find a Friend

Esse é um desafio proposto, o qual será desenvolvido uma API para adoção de animais, 
para reforçar de forma prática o aprendizado sobre alguns conceitos do SOLID, 
Design Patterns, Docker para iniciar banco de dados, JWT, Refresh Token, RBAC e Testes.


## Requisios Funcionais

- [ ] Deve ser possível cadastrar um pet
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [ ] Deve ser possível filtrar pets por suas características
- [ ] Deve ser possível visualizar detalhes de um pet para adoção
- [ ] Deve ser possível se cadastrar como uma ORG
- [ ] Deve ser possível realizar login como uma ORG


## Regras de Negócio

- [ ] Para lisar os pets, obrigatoriamente precisamos informar a cidade
- [ ] Uma ORG precisa ter um endereço e um número de WhatsApp
- [ ] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada