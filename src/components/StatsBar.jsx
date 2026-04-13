function StatsBar({ tasks }) {
  const total = tasks.length
  const done = tasks.filter(t => t.done).length
  const high = tasks.filter(t => t.priority === 'high' && !t.done).length
  const pct = total ? Math.round((done / total) * 100) : 0

  return (
    <div>
      <div className="stats">
        <div className="stat">
          <div className="stat-num accent">{total - done}</div>
          <div className="stat-label">Remaining</div>
        </div>
        <div className="stat">
          <div className="stat-num green">{done}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat">
          <div className="stat-num red">{high}</div>
          <div className="stat-label">High Priority</div>
        </div>
        <div className="stat">
          <div className="stat-num">{pct}%</div>
          <div className="stat-label">Done</div>
        </div>
      </div>
      <div className="progress-wrap">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: pct + '%' }} />
        </div>
      </div>
    </div>
  )
}

export default StatsBar