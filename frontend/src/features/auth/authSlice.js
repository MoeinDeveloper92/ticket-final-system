import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

//register
export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        console.log(userData)
    } catch (error) {

    }
})


//login
export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        console.log(userData)
    } catch (error) {

    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        }
    },
    extraReducers: (builder) => { }
})


export const { reset } = authSlice.actions
export default authSlice.reducer