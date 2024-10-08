import { Book } from '../../domain/book';
import { BookRepository } from '../repositories/book-repository';

export class CreateBookUseCase {
  //seu codigo aqui
  constructor(
    private bookRepository: BookRepository,
  ){}

  async execute(bookParams: Partial<Book>): Promise<Book>{
    
    // Valida se o título 
    if (!bookParams.title) {
      throw new Error('Título é obrigatório');
    }

    // Valida se o autor
    if (!bookParams.author) {
      throw new Error('Autor é obrigatório');
    }

    //criaçao do livro
    const book = {
      createdAt: this.getDate(),
      ...bookParams
    } as Book;

    await this.bookRepository.save(book);
    return book;
  } 

  private getDate() {
    return new Date().toLocaleDateString('PT-br');
  }
  
}
