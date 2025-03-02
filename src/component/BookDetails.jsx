import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const book = useSelector((state) => 
        state.books.items.find((book) => book.id === Number(id))
    );

    if (!book) return <p>Book not found. Try refreshing the page.</p>;
    return (
        <>
            <div className="book-details">
                <h2>{book.title}</h2>
                <p>Author: {book.authpr}</p>
                <p>Description: {book.description}</p>
                <p>Rating: {book.rating}</p>
                <button onClick={() => navigate(-1)}>Back to Browse</button>
            </div>
        </>
    );
};

export default BookDetails;