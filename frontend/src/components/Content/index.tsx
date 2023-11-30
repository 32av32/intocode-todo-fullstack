import React, {useEffect} from 'react';
import styles from './Content.module.css';
import Todo from "./Todo";
import {fetchTodos, postTodo} from "../../createActions/todoActions";
import {useAppDispatch, useAppSelector} from "../../hooks";


export default function Content() {
    const todos = useAppSelector(state => state.todo)
    const [value, setValue] = React.useState('')
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        dispatch(postTodo(value))
        e.preventDefault()
        setValue('')
    }

    return (
        <div className={styles.container}>
            <form name="add_task_form" className={styles.form_todo} onSubmit={(e) => handleSubmit(e)}>
                <input value={value} onChange={e => setValue(e.target.value)} placeholder={'Введите таску...'} name="add_task_input" type="text" className={styles.add_task_input} />
                    <button name="add_task_button" type="submit" className={styles.add_task_button}>
                        <img alt="add" className="add_task_button_ico" src="/assets/add.svg" />
                    </button>
            </form>
            <div className={styles.tasks_list__container}>
                { todos.errors && <h1>{todos.errors}</h1> }
                { todos.loading ?
                    <h1>loading</h1> :
                    todos.todos.map(todo => <Todo key={todo._id} {...todo} />)}
            </div>
        </div>
    )
}