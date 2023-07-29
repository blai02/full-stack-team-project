import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/products';
import { removeError, addError } from './errorSlice';

const initialState = {
  products: [],
  status: 'idle'
};

export const getProductsAction = createAsyncThunk(
  'products/getProducts',
  async (data, thunkAPI) => {
    try {
      const products = await getProducts();
      thunkAPI.dispatch(removeError());
      return products;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createProductAction = createAsyncThunk(
  'products/createProduct',
  async (data, thunkAPI) => {
    try {
      const message = await createProduct(data);
      thunkAPI.dispatch(removeError());
      return message;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProductAction = createAsyncThunk(
  'products/updateProduct',
  async ({product, productId}, thunkAPI) => {
    try {
      const message = await updateProduct(product, productId);
      thunkAPI.dispatch(removeError());
      return message;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
)

export const deleteProductAction = createAsyncThunk(
  'products/deleteProduct',
  async (data, thunkAPI) => {
    try {
      const message = await deleteProduct(data);
      thunkAPI.dispatch(removeError());
      return message;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // loadMessages: (state, action) => {
    //   state.status = 'pending';
    //   state.messages = action.payload;
    // }
  },
  extraReducers: builder => {
    builder.addCase(getProductsAction.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.products = action.payload;
    });
    builder.addCase(getProductsAction.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(getProductsAction.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.messages.push(action.payload);
    });
    builder.addCase(updateProductAction.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(updateProductAction.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(updateProductAction.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.products = state.products.map((product) =>
        (product._id === action.payload._id ? action.payload : product));
    });
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(createProductAction.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(deleteProductAction.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.products = state.products.filter(
        product => product._id !== action.payload._id
      );
    });
    builder.addCase(deleteProductAction.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(deleteProductAction.pending, (state, action) => {
      state.status = 'pending';
    });
  }
});

export default productSlice.reducer;
