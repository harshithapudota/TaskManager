function TaskFilters({ filter, search, onFilterChange, onSearchChange, onClearCompleted }) {
  return (
    <div className="filters">
      {['all', 'active', 'completed'].map(f => (
        <button
          key={f}
          className={`filter-btn ${filter === f ? 'active' : ''}`}
          onClick={() => onFilterChange(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
      <button className="filter-btn clear-btn" onClick={onClearCompleted}>
        Clear Done
      </button>
      <input
        className="search-input"
        placeholder="🔍 Search…"
        value={search}
        onChange={e => onSearchChange(e.target.value)}
      />
    </div>
  )
}

export default TaskFilters