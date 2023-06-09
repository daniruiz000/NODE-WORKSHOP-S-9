import { type NextFunction, type Request, type Response } from "express";
import { bookOdm } from "../odm/book.odm";

const getAllBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = req.query.page as any;
    const limit = req.query.limit as any;

    const books = await bookOdm.getAllBooks(page, limit);

    const totalElements = await bookOdm.getBookCount();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: books,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const book = await bookOdm.getBookById(id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    next(error);
  }
};

const createBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const createdBook = await bookOdm.createBook(req.body);
    res.status(201).json(createdBook);
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const bookDeleted = await bookOdm.deleteBook(id);
    if (bookDeleted) {
      res.json(bookDeleted);
    } else {
      res.status(404).json({ error: "Book was not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const bookUpdated = await bookOdm.updateBook(id, req.body);
    if (bookUpdated) {
      res.json(bookUpdated);
    } else {
      res.status(404).json({ error: "Book was not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const bookService = {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBook,
};
