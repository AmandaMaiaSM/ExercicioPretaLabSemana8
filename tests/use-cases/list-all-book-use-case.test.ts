import { randomUUID } from "crypto"
import { BookRepository } from "../../src/application/repositories/book-repository"
import { ListAllBooksUseCase } from "../../src/application/use-cases/list-all-books-use-case"
import { Book } from "../../src/domain/book"

describe('ListBookUseCase', () => {
    let listAllBookUseCase: ListAllBooksUseCase
    let mockBookRepository: BookRepository = {
        findAll: jest.fn()
    } as any
    
    beforeEach(() => {
        listAllBookUseCase = new ListAllBooksUseCase(mockBookRepository)
    })

    it('should list all books', async () => {
        const expectedBooks = [
            {
                id: randomUUID(),
                title: 'Devops',
            },
            { 
                id: randomUUID(),
                title: 'Mulheres que correm com lobos',
            }
        ] as any
        jest.spyOn(mockBookRepository, 'findAll').mockImplementation(() => Promise.resolve(expectedBooks))

        const books = await listAllBookUseCase.execute()
        expect(mockBookRepository.findAll).toHaveBeenCalled()
        expect(books).toMatchObject(expectedBooks)
    });

    //mostrar erro se na hora de lista teve falha
    it ('Falha ao listar livros', async () =>{
        const mensagemErro = 'Erro na lsitagem de LIVROS'

        jest.spyOn(mockBookRepository, 'findAll').mockImplementation(
            ()=> Promise.reject(new Error(mensagemErro))
        )

        await expect(listAllBookUseCase.execute()).rejects.toThrow(mensagemErro);
        expect(mockBookRepository.findAll).toHaveBeenCalled();
 
    });

    //Retonar uma lista vazia se nao encontrar livros 

})