# Crud Nest

Projeto criado para teste.

## Rodar o projeto
`npm install`

`nest start --dev`

# REST API

## Criar novo usuário

### Requisição

`POST /user/`

    http://localhost:3000/user/

`Body`

    {
      "name":"nova usuario",
      "password":"novousuario",
      "email":"usuario@gmail.com"
    }

### Resposta


    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInVzZXJOYW1lIjo"
    }

## Criar usuário com cargo

### Requisição

`POST /user/create-with-role/`

    http://localhost:3000/user/create-with-role

`Authorization`
  
    Bearer token

`Body`

    {
      "name":"usuario user",
      "password":"user",
      "email":"admin@gmail.com",
      "role":"ADMIN"
    }

### Resposta

    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInVzZXJOYW1lIjo"
    }

## Get token

### Requisição

`POST /auth/sign-in`

    http://localhost:3000/auth/sign-in

`Body`

    {
      "name":"usuario user",
      "password":"user",
    }

### Resposta

    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInVzZXJOYW1lIjo"
    }

## Alterar usuário

### Requisição

`PUT /user`

    http://localhost:3000/user/

`Authorization`
  
    Bearer token


`Body`

    {
      "id":14,
      "name":"usuario admin",
      "password":"senhadiferente",
      "email":"admin2@gmail.com"
    }

### Response

    user updated

## Deletar usuário

### Requisição

`POST /thing/`

    http://localhost:3000/user/delete/:id

`Authorization`
  
    Bearer token

### Resposta

    user has been removed
