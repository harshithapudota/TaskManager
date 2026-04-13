import { useState } from 'react'

function TaskInput({ onAdd }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')

  const handleAdd = () => {
    if (!title.trim()) return   // don't add empty tasks
    onAdd(title.trim(), priority)
    setTitle('')                // clear input after adding
  }

  return (
    <div className="add-form">
      <input
        className="task-input"
        placeholder="Add a new task…"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleAdd()}
      />
      <select
        className="priority-select"
        value={priority}
        onChange={e => setPriority(e.target.value)}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button className="btn-add" onClick={handleAdd}>+ Add</button>
    </div>
  )
}

export default TaskInput