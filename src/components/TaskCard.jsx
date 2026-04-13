import { useState } from 'react'

function TaskCard({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editVal, setEditVal] = useState(task.title)

  const saveEdit = () => {
    if (editVal.trim()) onEdit(task.id, editVal.trim())
    setIsEditing(false)
  }

  const formatDate = (iso) => {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className={`task-card pri-${task.priority} ${task.done ? 'done' : ''}`}>
      {/* Checkbox */}
      <div
        className={`task-check ${task.done ? 'checked' : ''}`}
        onClick={() => onToggle(task.id)}
      />

      {/* Title or Edit Input */}
      <div className="task-body">
        {isEditing ? (
          <input
            className="edit-input"
            value={editVal}
            autoFocus
            onChange={e => setEditVal(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={e => {
              if (e.key === 'Enter') saveEdit()
              if (e.key === 'Escape') setIsEditing(false)
            }}
          />
        ) : (
          <p className="task-title">{task.title}</p>
        )}
        <div className="task-meta">
          <span className={`badge badge-${task.priority}`}>{task.priority}</span>
          <span className="task-date">{formatDate(task.created)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="task-actions">
        <button className="btn-icon" onClick={() => setIsEditing(true)} title="Edit">✎</button>
        <button className="btn-icon del" onClick={() => onDelete(task.id)} title="Delete">✕</button>
      </div>
    </div>
  )
}

export default TaskCard