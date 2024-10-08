import { CreateBookUseCase } from '../../src/application/use-cases/create-book-use-case';
import { BookRepository } from '../../src/application/repositories/book-repository';
import { Book } from '../../src/domain/book';

// Mocks
const bookRepositoryMock = {
  save: jest.fn()
};

// Teste unitário para criaçao de um livro 
describe('CreateBookUseCase', () => {
  let createBookUseCase: CreateBookUseCase;

  beforeEach(() => {
    createBookUseCase = new CreateBookUseCase(
      bookRepositoryMock as unknown as BookRepository,
    );
  });

  it('should create a book and save it', async() => {
    const bookParams = {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      isbn: '978-0201616224',
      publisher: 'Addison-Wesley',
      category: 'Programming',
      status: 'read'
    } as any;

    const result = await createBookUseCase.execute(bookParams);

    expect(bookRepositoryMock.save).toHaveBeenCalledWith({
      
      createdAt: expect.any(String),
      ...bookParams
    });
    expect(result).toMatchObject({
      createdAt: expect.any(String),
      ...bookParams
    });
  });

// Lança um erro ao tentar criar um livro semb op titulo
  it('Verificar se tem titulo', async () => {
    const bookParams: Partial<Book> = {
      author: 'MAria Vitoria',
    };

    await expect(createBookUseCase.execute(bookParams)).rejects.toThrow('Título é obrigatório');
    expect(bookRepositoryMock.save).not.toHaveBeenCalled();
  });

// TVerifica se o livro tem uma data de criação 
  it('Deve atribuir uma data de criação ao criar um livro', async () => {
    const bookParams: Partial<Book> = {
      title: 'Um dia de cada vez',
      author: 'O amanha',
    };

    const createdBook = await createBookUseCase.execute(bookParams);

    expect(createdBook.createdAt).toBe(new Date().toLocaleDateString('PT-br'));
  });

  // data de criaçao
  it('O livro tem que possuir uma data de criação', async () => {
    const bookParams: Partial<Book> = {
      title: 'test',
      author: 'MaiaSSS',
    };

    const createdBook = await createBookUseCase.execute(bookParams);

    expect(createdBook.createdAt).toBe(new Date().toLocaleDateString('PT-br'));
  });

});