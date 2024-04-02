//import {createServer} from 'node:http'

//const server = createServer((request, response)=>{
 //  response.write('oi')

 //   return response.end()
//})

//server.listen(3333) // definir porta

import {fastify} from 'fastify' // importar
//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()  // criar servidor
//const database = new DatabaseMemory()
const database = new DatabasePostgres()

//POST http://localhost:3333/videos  --> criar novo vídeo
//PUT http://localhost:3333/videos/ID

server.post('/videos', async(request, reply) => {   // ROTA
    const {title, description, duration} = request.body

    console.log(request.body)
    
    await database.create({
        title,
        description,
        duration,
    })

    //console.log(database.list())

    return reply.status(201).send()
})

server.get('/videos', async(request, reply) => {   // ROTA

    const search = request.query.search

    console.log(search)

    const videos = await database.list(search)

    console.log(videos)

    return videos
})

server.put('/videos/:id', async(request, reply) => {   // ROTA
    const videoId = request.params.id

    const {title, description, duration} = request.body

    await database.update(videoId,{
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {   // ROTA
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: process.env.port ?? 3333,
}) // definir a porta