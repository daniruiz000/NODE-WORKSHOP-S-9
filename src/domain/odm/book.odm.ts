import { Book, IBook } from "../entities/book-entity";
import { Document } from "mongoose";

const getAllBooks = async (page: number, limit: number): Promise<Document<IBook>[]> => {
  return await Book.find()
    .limit(limit)
    .skip((page - 1) * limit)
    .populate(["author", "publisher"]);
};

const getBookCount = async (): Promise<number> => {
  return await Book.countDocuments();
};

const getBookById = async (id: string): Promise<Document<IBook> | null> => {
  return await Book.findById(id).populate(["author", "publisher"]);
};

const createBook = async (bookData: any): Promise<Document<IBook>> => {
  const book = new Book(bookData);
  const document: Document<IBook> = (await book.save()) as any;

  return document;
};

const deleteBook = async (id: string): Promise<Document<IBook> | null> => {
  return await Book.findByIdAndDelete(id);
};

const updateBook = async (id: string, bookData: any): Promise<Document<IBook> | null> => {
  return await Book.findByIdAndUpdate(id, bookData, { new: true, runValidators: true });
};

export const bookOdm = {
  getAllBooks,
  getBookCount,
  getBookById,
  createBook,
  deleteBook,
  updateBook
};
