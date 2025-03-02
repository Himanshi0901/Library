import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../redux/booksSlice";

function BrowseBooks () {
    const { category } = useParams();
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.items);
    const status = useSelector((state) => state.books.status);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (status ==='idle'){
            dispatch(fetchBooks());
        }
    }, [dispatch, status]);
    useEffect(() => {
        let filtered =
            category === 'all'
                ? books
                : books.filter((book) => 
                    book.category.toLowerCase() === category.toLowerCase()
                );
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter((book) =>
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setFilteredBooks(filtered);
    }, [category, books, searchQuery]);

    if (status === 'loading') return <p>Loading books...</p>;
    if (status === 'failed') return <p>Failed to load book. try again later.</p>;
    return (
        <>
            <div className="browse-books">
                <h2>Books in Category: {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                <input 
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                {filteredBooks.length > 0 ? (
                    <ul>
                        {filteredBooks.map((book) => (
                            <li key={book.id}>
                                <h3>{book.title}</h3>
                                <p>Author: {book.author}</p>
                                <Link to={`/books/details/${book.id}`}>View Details</Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No books available in this category.</p>
                )}
            </div>
        </>
    );
};

export default BrowseBooks;