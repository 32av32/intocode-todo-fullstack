import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ITodo } from "../types/todoTypes";
import {deleteTodo, fetchTodos, patchTodo, postTodo} from "../createActions/todoActions";


export interface IInitialState {
    todos: ITodo[],
    loading: boolean,
    errors: string | null
}

const initialState: IInitialState = {
    todos: [],
    loading: false,
    errors: null
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchTodos.fulfilled.type]: (state, action: PayloadAction<ITodo[]>) => {
            state.todos = action.payload
            state.loading = false
            state.errors = null
        },
        [fetchTodos.pending.type]: state => {
            state.loading = true
            state.errors = null
        },
        [fetchTodos.rejected.type]: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.errors = action.payload
        },
        [postTodo.fulfilled.type]: (state, action: PayloadAction<ITodo>) => {
            state.loading = false
            state.errors = null
            state.todos.push(action.payload)
        },
        [postTodo.pending.type]: state => {
            state.loading = true
            state.errors = null
        },
        [postTodo.rejected.type]: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.errors = action.payload
        },
        [deleteTodo.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.errors = null
            state.todos = state.todos.filter(item => item._id !== action.payload)
        },
        [deleteTodo.pending.type]: (state, action: { type: string, payload: undefined, meta: { arg: string } }) => {
            state.errors = null
            const deletedTodo = state.todos.find(item => item._id === action.meta.arg) as ITodo
            deletedTodo.loading = true
        },
        [deleteTodo.rejected.type]: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.errors = action.payload
        },
        [patchTodo.fulfilled.type]: (state, action: PayloadAction<ITodo>) => {
            state.errors = null
            state.todos = state.todos.map(todo => {
                if (todo._id === action.payload._id) {
                    return action.payload
                }
                return todo
            })
        },
        [patchTodo.pending.type]: (state) => {
            state.errors = null
        },
        [patchTodo.rejected.type]: (state, action: PayloadAction<string>) => {
            state.errors = action.payload
        },
    }
})

export default todoSlice.reducer