import React from 'react'
import Todo from './Todo'

export default function Todos({ todos , onCheckClick }) {
    return (
        <>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onCheckClick={onCheckClick} />
      ))}
    </>
  );
}