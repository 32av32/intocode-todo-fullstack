import {createAsyncThunk} from "@reduxjs/toolkit";


export const fetchTodos = createAsyncThunk('todo/fetchTodos', async (_, thunkAPI) => {
    try {
        const response = await fetch('http://localhost:4000/todos')
        return await response.json()
    } catch (e) {
        return thunkAPI.rejectWithValue('Не удалось загрузить данные')
    }
})

export const postTodo = createAsyncThunk('todo/postTodo', async (text: string, thunkAPI) => {
    try {
        const response = await fetch('http://localhost:4000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({text})
        })
        return await response.json()

    } catch (e) {
        return thunkAPI.rejectWithValue('Не удалось создать запись')
    }
})

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (id: string, thunkAPI) => {
    try {
        await fetch(`http://localhost:4000/todos/${id}`, {
            method: 'DELETE'
        })
        return id
    } catch (e) {
        return thunkAPI.rejectWithValue('Не удалось создать запись')
    }
})

export const patchTodo = createAsyncThunk('todo/patchTodo', async (data: { id: string, is_favorite: boolean }, thunkAPI) => {
    try {
        const response = await fetch(`http://localhost:4000/todos/${data.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ is_favorite: !data.is_favorite })
        })
        return await response.json()
    } catch (e) {
        return thunkAPI.rejectWithValue('Не удалось изменить запись')
    }
})