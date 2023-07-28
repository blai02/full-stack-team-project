import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCartQuery, updateCartMutation } from '../services/cart';
import { removeError, addError } from './errorSlice';

export const cartMaxValue = 999;

export const getCartAction = createAsyncThunk(
    'cart/getCart',
    async (data, thunkAPI) => {
        try {
            const cart = await getCartQuery();
            thunkAPI.dispatch(removeError());
            return cart;
        } catch (error) {
            const { message } = error;
            thunkAPI.dispatch(addError(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const updateCartAction = createAsyncThunk(
    'cart/updateCart',
    async (data, thunkAPI) => {
        try {
            let updates = {}, cart = {};
            while (Object.keys(updates = thunkAPI.getState().cart.update).length) {
                thunkAPI.dispatch(clearUpdateCart());
                cart = await updateCartMutation(updates);
                thunkAPI.dispatch(removeError());
            }
            return cart;
        } catch (error) {
            const { message } = error;
            thunkAPI.dispatch(addError(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateCart = (productId, count) => (dispatch, getState) => {
    dispatch(updateCartInternal({ productId, count }));
    console.log(getState());
    if (!getState().cart.isPending) {
        dispatch(updateCartAction());
    }
};

const initialState = {
    cart: {},
    update: {},
    status: '',
    isPending: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCartInternal: (state, action) => {
            state.update[action.payload.productId] = action.payload.count;
            if (state.cart[action.payload.productId])
                state.cart[action.payload.productId].count = action.payload.count;
        },
        clearUpdateCart: (state, action) => {
            state.update = {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateCartAction.fulfilled, (state, action) => {
            state.cart = action.payload.cart;
            state.isPending = false;
        });
        builder.addCase(updateCartAction.rejected, (state, action) => {
            state.isPending = false;
        });
        builder.addCase(updateCartAction.pending, (state, action) => {
            state.isPending = true;
        });
        builder.addCase(getCartAction.fulfilled, (state, action) => {
            state.cart = action.payload.cart;
            state.isPending = false;
        });
        builder.addCase(getCartAction.rejected, (state, action) => {
            state.isPending = false;
        });
        builder.addCase(getCartAction.pending, (state, action) => {
            state.isPending = true;
        });
    }
})

const { updateCartInternal, clearUpdateCart } = cartSlice.actions;

export default cartSlice.reducer;