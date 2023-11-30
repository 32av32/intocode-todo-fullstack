import React from 'react';
import styles from '../Content.module.css';
import {ITodo} from "../../../types/todoTypes";
import {useAppDispatch} from "../../../hooks";
import {deleteTodo, patchTodo} from "../../../createActions/todoActions";


export default function Todo({ _id, text, is_favorite, loading }: ITodo) {
    const dispatch = useAppDispatch()

    const handleRemove = (id: string): void => {
        dispatch(deleteTodo(id))
    }
    const handleFavorite = (id: string): void => {
        dispatch(patchTodo({ id, is_favorite }))
    }

    return (
        <div className={`${styles.todo_item} + ${is_favorite && styles.favorite}`}>
            <div className={styles.star} onClick={() => handleFavorite(_id as string)}>★</div>
            <div className={styles.task_item_text}>{text}</div>
            <button disabled={loading} className={styles.task_item_delete} onClick={() => handleRemove(_id as string)}>
                <img alt='delete_button' src='/assets/icons8-delete-48.svg' />
            </button>
        </div>
    )
}