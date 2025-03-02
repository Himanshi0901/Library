import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    const response = await axios.get('/data.json');
    return response.data.map((item, index) => ({
        id: item.id,
        title: item.title,
        author: item.author,
        description: item.body,
        category: ['Fiction', 'Non_fiction', 'Sci-Fi', 'Biography', 'Mystery', 'Romance'][index % 6],
        rating: item.rating,
    }));
});

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addBook: (state, action) => {
            state.items.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { addBook } = booksSlice.actions;
export default booksSlice.reducer;