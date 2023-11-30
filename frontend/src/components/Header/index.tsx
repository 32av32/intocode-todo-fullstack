import React from 'react';
import styles from './Header.module.css';


export default function Header() {
    return (
        <div className={styles.container}>
            <h1>ToDo List</h1>
        </div>
    )
}