import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBooks } from "../redux/booksSlice";

const categories = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Biography', 'Mystery', 'Roamnce'];

function Home () {
    const dispatch = useDispatch();
    const { items: popularBooks, status, error } = useSelector((state) => state.books);

    useEffect(() => {
        if(status === 'idle') {
            dispatch(fetchBooks());
        }
    }, [dispatch, status]);

    if (status === 'loading') {
        return <p>Loading popular bookd...</p>;
    }

    if (status === 'failed') {
        return <p>Error fetching popular books: {error}</p>;
    }

    return (
        <>
            <div className="home">
                <h1>Welcome to the Online Library</h1>
                <p>Explore a wide variety of books across different genres!</p>  
                <div className="categories">
                    <h2>Book Categories</h2>
                    <ul>
                        {categories.map((category) => (
                            <li key={category}>
                                <Link to={`/books/${category.toLowerCase()}`}>{category}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="popular-books">
                    <h2>Popular Books</h2>
                    <ul>
                        {popularBooks.map((book) => (
                            <li key={book.id}>
                                <h3>{book.title}</h3>
                                <p>{book.author}</p>
                                <Link to={`/books/details/${book.id}`}>View Details</Link>
                            </li>
                        ))}
                    </ul>
                </div>              
            </div>
        </>
    );
};

export default Home;