import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchProduct,
  fetchInsertProduct,
  UpdateProduct,
  EditProduct,
  DeleteProduct,
  fetchInsertCategories,
  fetchCategory,
  UpdateCategory,
  EditCategory,
  DeleteCategory,
  fetchProductById,
} from './ProductAPI';

const initialState = {
  products: [],
  selectedProduct: [],
  categories: [],
  selectedCategory: [],
  status: 'idle'
};

export const fetchProductByIdAsync = createAsyncThunk(
  'Product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
)

export const productAsync = createAsyncThunk(
  'Product/fetchProduct',
  async () => {
    const response = await fetchProduct();
    return response.data;
  }
);

export const insertProductAsync = createAsyncThunk(
  'Product/fetchInsertProduct',
  async (formData) => {
    const response = await fetchInsertProduct(formData);
    // return response.data;
  }
)

export const updateProductAsync = createAsyncThunk(
  'Product/UpdateProduct',
  async (id) => {
    const response = await UpdateProduct(id);
    return response.data;
  }
)

export const editProductAsync = createAsyncThunk(
  'Product/EditProduct',
  async (update) => {
    const response = await EditProduct(update);
    return response.data;
  }
)

export const deleteProductAsync = createAsyncThunk(
  'Product/DeleteProduct',
  async (id) => {
    const response = await DeleteProduct(id);
    return null;
  }
)

export const insertCategoryAsync = createAsyncThunk(
  'Product/fetchInsertCategories',
  async (data) => {
    const response = await fetchInsertCategories(data);
    // return response.data;
  }
)

export const categoryAsync = createAsyncThunk(
  'Product/fetchCategory',
  async () => {
    const response = await fetchCategory();
    return response.data;
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  'Product/DeleteCategory',
  async (id) => {
    const response = await DeleteCategory(id);
    return null;
  }
)

export const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    clearInsesrtProduct: (state) => {
      state.insertproduct = null
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(productAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(productAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })

      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })

      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })

      .addCase(categoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(categoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
  },
});

export const selectAllProducts = (state) => state.Product.products;
export const selectProductById = (state) => state.Product.selectedProduct;
export const selectCatagories = (state) => state.Product.categories;

export default productSlice.reducer;