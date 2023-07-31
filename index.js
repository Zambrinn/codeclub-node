const express = require("express")
const port = 3000
const app = express()
app.use(express.json())
const uuid = require("uuid")
/* 
    - Query Params => meusite.com/users?nome=thiago&age=16 // FILTROS
    - Route Params => /users/2 //Buscar, deletar ou atualizar algo especifico 
    - Request body => { "name":"Thiago","age":}

    - GET => Buscar informações no back end
    - POST => Criar informação no back end
    - PUT / PATCH => Alterar/atualizar informações no back end
    - Delete => Deletar informações no back end
    - Middleware => Interceptador => Tem o poder de parar ou alterar dados da requisição 
*/
const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    if ( index < 0 ) {
     return response.status(404).json({error: "User not found."})
    }
    request.userIndex = index
    request.userId = id

    next()
} 

app.get("/users", (request, response) => {
    return response.json(users)
    
})

app.post("/users", (request, response) => {
    const {name, age} = request.body
    const user = {id:uuid.v4(), name, age}
    users.push(user)
    return response.status(201).json(users)
})

app.put("/users/:id", checkUserId, (request, response) => {
   
   const {name, age} = request.body
   const index = request.userIndex
   const id = request.userId
   const updatedUser = { id, name, age }
   
   users [index] = updatedUser

   console.log(index)

   users[0]

   return response.json(updatedUser)
})

app.delete("/users/:id", checkUserId, (request, response) => {
    const index = request.index

    users.splice(index,1)

    return response.status(204).json()

})












app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})