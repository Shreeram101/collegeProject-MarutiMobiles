import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToWishlist, deleteFromWishlist, fetchWishlistByUserId } from "./WishlistAPI"; // fetchWishlistByUserId import kiya

const initialState = {
    items: [],
    status: 'idle',
};

export const addToWishlistAsync = createAsyncThunk(
    'wishlist/addToWishlist',
    async (item) => {
        const response = await addToWishlist(item);
        return response.data;
    }
);

export const fetchWishlistByUserIdAsync = createAsyncThunk(
    'wishlist/fetchWishlistByUserId',
    async (userId) => {
        const response = await fetchWishlistByUserId(userId);
        return response.data;
    }
);

export const deleteFromWishlistAsync = createAsyncThunk(
    'wishlist/deleteFromWishlist',
    async (itemId) => {
        const response = await deleteFromWishlist(itemId);
        return response.data;
    }
);

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToWishlistAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addToWishlistAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items.push(action.payload);
            })
            // FETCH WISHLIST KE CASES ADD KAREIN
            .addCase(fetchWishlistByUserIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWishlistByUserIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload; // Backend se aayi wishlist list me set ho jayegi
            })
            .addCase(deleteFromWishlistAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteFromWishlistAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if(index !== -1) {
                    state.items.splice(index, 1);
                }
            });
    },
});

export const selectWishlistItems = (state) => state.wishlist.items;

export default wishlistSlice.reducer;