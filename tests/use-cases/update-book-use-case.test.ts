import { Book } from "../../src/domain/book";
import { BookRepository } from "../../src/application/repositories/book-repository";
import { UpdateBookUseCase } from "../../src/application/use-cases/update-book-use-case";
import { beforeEach } from "node:test";

describe('Utaulizaçoes do livro', () =>{
    let updateBookUseCase: UpdateBookUseCase;
    let bookRepositoryMock: BookRepository;

    beforeEach(() =>{
        bookRepositoryMock ={
            update: jest.fn(),
            save: jest.fn(),
        } as any;

        updateBookUseCase = new UpdateBookUseCase(bookRepositoryMock as any);
    });

    // verificar autalizaçoes do livro 
    it ('Atualizar livro', async() =>{

        const bookID = '1';

        const bookExist = {
            title: 'Um novo test',
            author: 'Lulu Santos',
            createdAt: '07/10/2024'
        };

        const bookParams = {
            title: 'Um novo test',
            author: 'Lulu Santos'
        };

        const updatedBook = {
            id: bookID,
            ...bookExist,
            ...bookParams,
            createdAt: '07/01/2024'
        };
        
        bookRepositoryMock.update.(updatedBook);
 
        const result = await updateBookUseCase.execute(bookID, bookParams);

        expect(bookRepositoryMock.update).toHaveBeenCalledWith(bookID, bookParams);
        expect(result).toEqual(updatedBook);

    });

    //
    it('Mostarm erro se as autuazaçoes forem vazia', async () => {
        const bookParams: Partial<Book> = {
            title: 'Um novo test',

        };

        const result = await updateBookUseCase.execute('111', bookParams);

        expect(result).toBeNull();
        expect(bookRepositoryMock.update).toHaveBeenCalledWith('111', bookParams);
    })
      
})