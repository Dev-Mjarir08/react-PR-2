import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {

  const [todo, setTodo] = useState("")
  const [list, setList] = useState([])
  const [editID, setEditId] = useState(null)

  const handelSubmit = (e) => {

    e.preventDefault()

    if (editID) {

      const data = list.map((value) => {

        if (value.id === editID) {
          return { ...value, text: todo }
        }

        return value
      })

      localStorage.setItem('todolist', JSON.stringify(data))
      setList(data)
      setEditId(null)
      setTodo("")

    } else {

      const newList = [...list, { id: Date.now(), text: todo }]

      setList(newList)

      localStorage.setItem('todolist', JSON.stringify(newList))
      setTodo("")
    }
  }

  const handelDelete = (id) => {

    let newList = list.filter((value) => {
      return value.id !== id
    })

    localStorage.setItem('todolist', JSON.stringify(newList))

    setList(newList)
  }

  const handelEdit = (id) => {

    let data = list.find((value) => {
      return value.id === id
    })

    setTodo(data.text)
    setEditId(id)
  }

  useEffect(() => {

    const oldData = JSON.parse(localStorage.getItem('todolist'))

    if (oldData) {
      setList(oldData)
    }

  }, [])

  return (
    <div className='container'>

      <div className='todo-box'>

        <h1 className='title'>Todo App</h1>

        <form onSubmit={handelSubmit} className='todo-form'>

          <div className='input-group'>

            <label htmlFor="text" className='label'>
              Task
            </label>

            <input
              type="text"
              id='text'
              className='input'
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder='Enter your task'
            />

          </div>

          <button type='submit' className='submit-btn'>
            {
              editID ? "Update" : "Submit"
            }
          </button>

        </form>

        <table className='todo-table'>

          <thead>

            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {
              list.map((value, index) => {

                const { id, text } = value

                return (
                  <tr key={id}>

                    <td>{index + 1}</td>

                    <td>{text}</td>

                    <td>

                      <button
                        type='button'
                        className='delete-btn'
                        onClick={() => handelDelete(id)}
                      >
                        Delete
                      </button>

                      <button
                        type='button'
                        className='edit-btn'
                        onClick={() => handelEdit(id)}
                      >
                        Edit
                      </button>

                    </td>

                  </tr>
                )
              })
            }

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default App