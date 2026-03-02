import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItemFromCart, fetchItemsByUserId, resetCart, updateCart } from './cartAPI';

const initialState = {
    items: [],
    status: 'idle',
    cartLoaded: false
};

export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async (item) => {
        const response = await addToCart(item);
        console.log(response);
        return response.data;
    }
)
 
export const fetchItemsByUserIdAsync = createAsyncThunk(
    'cart/fetchItemsByUserId',
    async () => {
        const response = await fetchItemsByUserId();
        return response.data;
    }
);

export const deleteItemFromCartAsync = createAsyncThunk(
    'cart/deleteItemFromCart',
    async (id) => {
        console.log(id);
        const response = await deleteItemFromCart(id);
        console.log(response);
        return response.data;
    }
)

export const updateCartAsync = createAsyncThunk(
    'cart/updateCart',
    async (update) => {
        const response = await updateCart(update);
        return response.data;
    }
);

export const resetCartAsync = createAsyncThunk(
    'cart/resetCart',
    async () => {
        const response = await resetCart();
        return response.data;
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        IncrementQty: (state, action) => {
            const quantity = state.items.find(q => q.id === action.payload);
            quantity.qty += 1;
        },

        DecrementQty: (state, action) => {
            const quantity = state.items.find(q => q.id === action.payload);
            console.log(quantity.qty);
            quantity.qty -= 1;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(addToCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items.push(action.payload);
            })
            .addCase(fetchItemsByUserIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload;
                state.cartLoaded = true;
            })
            .addCase(fetchItemsByUserIdAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.cartLoaded = true;
            })
            .addCase(deleteItemFromCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.items.findIndex(item => item.id === action.payload.id);
                state.items.splice(index, 1);
            })
            .addCase(updateCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.items.findIndex(item => item.id === action.payload.id);
                state.items[index] = action.payload;
            })
            .addCase(resetCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(resetCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = [];
            });
    },
});

export const selectItems = (state) => state.cart.items;
export const selectCartLoaded = (state) => state.cart.cartLoaded;

export const { IncrementQty, DecrementQty } = cartSlice.actions;

export default cartSlice.reducer;