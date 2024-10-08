import { BookRepository } from '../repositories/book-repository';

export class DeleteBookUseCase {
  constructor(
    private bookRepository: BookRepository
  ) {}

  async execute(id: string): Promise<void> {
    
    if (!id) {
      throw new Error('ID inválido');
    }
    await this.bookRepository.delete(id);

  }
}