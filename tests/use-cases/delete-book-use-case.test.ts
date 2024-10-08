import { randomUUID } from "crypto";
import { DeleteBookUseCase } from "../../src/application/use-cases/delete-book-use-case";
import { BookRepository } from "../../src/application/repositories/book-repository";

const bookRepositoryMock = {
    delete: jest.fn()
};

//teste unitario 
describe ('Deletar Use Case', () => {

    let deleteBooksUseCase: DeleteBookUseCase;

    beforeEach(() =>{
        deleteBooksUseCase = new DeleteBookUseCase(
            bookRepositoryMock as unknown as BookRepository
        );
    });

    //teste para verificar se o ID existe 
    it ('Mensagem de erro caso o id não exista', async() =>{
        const bookId = 'Não existe';
        
        bookRepositoryMock.delete.mockRejectedValueOnce(new Error('Livro não encontrado'));
  
      await expect(deleteBooksUseCase.execute(bookId)).rejects.toThrow('Livro não encontrado');
        //verificando argumentos específicos
      expect(bookRepositoryMock.delete).toHaveBeenCalledWith(bookId);
    });

    //ID vazio ou inválido
    it('Verificar se o ID é vazio ou null', async () => {
        const invalidID = '';
    
        await expect(deleteBooksUseCase.execute(invalidID)).rejects.toThrow('ID inválido');

        // Verifica que o repositório não foi chamado
        expect(bookRepositoryMock.delete).not.toHaveBeenCalled();
    });
    
    //Deletar livro atraves do ID 
    it ('Deve deletar um livro pelo id', async () =>{
        const bookID = '1';
        deleteBooksUseCase.execute(bookID);
        
        await deleteBooksUseCase.execute(bookID);

        expect(bookRepositoryMock.delete).toHaveBeenLastCalledWith(bookID);
    });

    //verificar se realemente foi excluido
    

});
