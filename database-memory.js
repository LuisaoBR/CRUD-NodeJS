import {randomUUID} from 'node:crypto'

export class DatabaseMemory{
    #videos = new Map()

    list(search){
        return Array.from(this.#videos.entries()).map((videoArray) => {

            const id = videoArray[0]
            const data = videoArray[1]

            return{
                id,
                ...data,
            }
        })

        // o Array.from converte uma estrutura de dados
        // que não é um Array para um Array
        .filter((video) => {
            if (search) {
                // Use toLowerCase() para tornar a comparação de texto case-insensitive
                return video.title.toLowerCase().includes(search.toLowerCase());
            }
            // Se não houver consulta de pesquisa, retorne true para incluir todos os vídeos
            return true;
        });
    }
    
    create(video){
        const videoId = randomUUID()

        this.#videos.set(videoId, video)

        // UUID = Universal Unique ID
    }

    update(id, video){
        this.#videos.set(id, video)
    }

    delete(id){
        this.#videos.set(id)
    }
}