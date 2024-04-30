"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from "./BooksPage.module.css"

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  isbn: string;
  published: string;
  publisher: string;
}

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchBooks();
    }
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('https://fakerapi.it/api/v1/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>All Books</h1>
      <ul className={styles.bookList}>
        {books.map((book: Book) => (
          <li key={book.id} className={styles.bookItem}>
            <Link href={`/book/${book.id}`} passHref>
              <div className={styles.bookCard}>
                <div>
                  <strong>Title:</strong> {book.title}
                </div>
                <div>
                  <strong>Author:</strong> {book.author}
                </div>
                <div>
                  <strong>Genre:</strong> {book.genre}
                </div>
                <div>
                  <strong>Description:</strong> {book.description}
                </div>
                <div>
                  <strong>ISBN:</strong> {book.isbn}
                </div>
                <div>
                  <strong>Published Date:</strong>{' '}
                  {new Date(book.published).toLocaleDateString('en-GB')}
                </div>
                <div>
                  <strong>Publisher:</strong> {book.publisher}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksPage;
