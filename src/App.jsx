import { useState, useEffect } from 'react'
import TaskInput from './components/TaskInput'
import TaskFilters from './components/TaskFilters'
import TaskList from './components/TaskList'
import StatsBar from './components/StatsBar'
import './App.css'

function App() {
  // useState - stores tasks array in memory, loads from localStorage on first render
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('taskflow_tasks')
    return stored ? JSON.parse(stored) : []
  })

  const [filter, setFilter] = useState('all')   // 'all' | 'active' | 'completed'
  const [search, setSearch] = useState('')       // search string

  // useEffect - whenever tasks change, save to localStorage automatically
  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks))
  }, [tasks])

  // ADD a new task
  const addTask = (title, priority) => {
    const newTask = {
      id: Date.now(),          // unique id using timestamp
      title,
      priority,                // 'high' | 'medium' | 'low'
      done: false,
      created: new Date().toISOString()
    }
    setTasks(prev => [newTask, ...prev])  // add to top of list
  }

  // TOGGLE done/active
  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  // DELETE a task
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  // EDIT a task title
  const editTask = (id, newTitle) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, title: newTitle } : t))
  }

  // CLEAR all completed tasks
  const clearCompleted = () => {
    setTasks(prev => prev.filter(t => !t.done))
  }

  // FILTER logic - runs every render
  const filteredTasks = tasks.filter(task => {
    const matchesFilter =
      filter === 'all' ? true :
      filter === 'active' ? !task.done :
      task.done

    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase())

    return matchesFilter && matchesSearch
  })

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">Task<span>Flow</span></h1>
        <span className="total-badge">{tasks.length} tasks</span>
      </header>

      <StatsBar tasks={tasks} />

      <TaskInput onAdd={addTask} />

      <TaskFilters
        filter={filter}
        search={search}
        onFilterChange={setFilter}
        onSearchChange={setSearch}
        onClearCompleted={clearCompleted}
      />

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  )
}

export default App