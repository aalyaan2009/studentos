import { useState, useEffect } from 'react'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [zoomScale, setZoomScale] = useState(1.0)

  const [tasks, setTasks] = useState([])
  const [taskFilter, setTaskFilter] = useState('All')
  const [input, setInput] = useState('')
  const [category, setCategory] = useState('Assignment')
  const [priority, setPriority] = useState('Medium')

  const [milestones, setMilestones] = useState([])
  const [milestoneTitle, setMilestoneTitle] = useState('')
  const [milestoneDetail, setMilestoneDetail] = useState('')
  const [milestoneDays, setMilestoneDays] = useState('')
  const [showMilestoneForm, setShowMilestoneForm] = useState(false)

  const [timerMode, setTimerMode] = useState('work')
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let timer
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
    }
    return () => clearInterval(timer)
  }, [isRunning, timeLeft])

  const handleModeChange = (mode) => {
    setIsRunning(false)
    setTimerMode(mode)
    if (mode === 'work') setTimeLeft(25 * 60)
    if (mode === 'shortBreak') setTimeLeft(5 * 60)
    if (mode === 'longBreak') setTimeLeft(15 * 60)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const addTask = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setTasks([{ id: Date.now(), text: input, completed: false, category, priority }, ...tasks])
    setInput('')
  }

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const addMilestone = (e) => {
    e.preventDefault()
    if (!milestoneTitle.trim() || !milestoneDays) return
    setMilestones([
      ...milestones,
      { id: Date.now(), title: milestoneTitle, detail: milestoneDetail || 'General', daysLeft: parseInt(milestoneDays) }
    ])
    setMilestoneTitle('')
    setMilestoneDetail('')
    setMilestoneDays('')
    setShowMilestoneForm(false)
  }

  const deleteMilestone = (id) => {
    setMilestones(milestones.filter((m) => m.id !== id))
  }

  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === 'Active') return !t.completed
    if (taskFilter === 'Completed') return t.completed
    return true
  })

  const completedCount = tasks.filter((t) => t.completed).length
  const displayZoom = Math.round(zoomScale * 100)

  return (
    <div className={`min-h-screen font-serif transition-colors duration-300 selection:bg-[#c85a32] selection:text-white ${
      darkMode ? 'bg-[#121212] text-[#e0dcd3]' : 'bg-[#f3efe6] text-[#171717]'
    }`}>
      <div className={`px-4 py-2 text-center text-[10px] font-mono uppercase tracking-[0.2em] flex items-center justify-between border-b ${
        darkMode ? 'bg-[#1e1e1e] border-[#333] text-[#e0dcd3]' : 'bg-[#171717] border-[#171717] text-[#f3efe6]'
      }`}>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#c85a32] inline-block animate-pulse"></span>
          <span>STUDENTOS • VOL. 2026 EDITION</span>
        </div>

        <div className="flex items-center gap-4 font-mono text-[10px]">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`border px-2 py-0.5 uppercase tracking-wider font-bold transition ${
              darkMode 
                ? 'border-[#555] bg-[#2a2a2a] text-white hover:bg-[#c85a32]' 
                : 'border-[#f3efe6]/40 hover:bg-[#f3efe6] hover:text-[#171717]'
            }`}
          >
            {darkMode ? '☀️ LIGHT MODE' : '🌙 DARK MODE'}
          </button>

          <div className="flex items-center gap-1.5 border border-current/30 px-2 py-0.5">
            <span className="opacity-60">ZOOM:</span>
            <button 
              onClick={() => setZoomScale(Math.max(0.6, zoomScale - 0.1))}
              className="px-1 hover:bg-[#c85a32] hover:text-white font-bold transition"
            >
              -
            </button>
            <span className="w-9 text-center font-bold">{displayZoom}%</span>
            <button 
              onClick={() => setZoomScale(Math.min(1.5, zoomScale + 0.1))}
              className="px-1 hover:bg-[#c85a32] hover:text-white font-bold transition"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-40 border-b backdrop-blur-sm px-6 py-4 flex items-center justify-between transition-colors ${
        darkMode ? 'bg-[#121212]/90 border-[#333]' : 'bg-[#f3efe6]/90 border-[#171717]'
      }`}>
        <div className="flex items-center gap-3">
          <a href="#" className="text-2xl font-black tracking-tighter uppercase font-serif">
            STUDENT<span className="italic text-[#c85a32]">OS</span>
          </a>
        </div>
        <div className="text-[11px] font-mono tracking-widest uppercase opacity-60 hidden sm:block">
          ACADEMIC WORKSPACE ARCHIVE
        </div>
      </header>

      <main 
        style={{ transform: `scale(${zoomScale})`, transformOrigin: 'top center' }}
        className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-8 transition-transform duration-200"
      >
        <section className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border-b pb-8 ${
          darkMode ? 'border-[#333]' : 'border-[#171717]'
        }`}>
          <div className="lg:col-span-8 space-y-3">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c85a32] flex items-center gap-2">
              <span className="h-px w-6 bg-[#c85a32]"></span> ACADEMIC MANAGEMENT ENGINE
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase font-serif">
              THE ART OF <br />
              <em className="font-normal text-[#c85a32] italic">PRODUCTIVE</em> STUDY.
            </h1>
            <p className="text-sm font-sans opacity-75 max-w-xl leading-relaxed pt-1">
              Curated workflow systems, structured assignment tracking, and vintage focus tools designed for modern scholars.
            </p>
          </div>

          <div className={`lg:col-span-4 border p-6 flex flex-col justify-between transition-colors ${
            darkMode 
              ? 'border-[#333] bg-[#1a1a1a] shadow-[6px_6px_0_#2a2a2a]' 
              : 'border-[#171717] bg-[#e8e2d5] shadow-[6px_6px_0_#171717]'
          }`}>
            <div>
              <div className={`flex items-center justify-between border-b pb-2 mb-4 ${darkMode ? 'border-[#333]' : 'border-[#171717]'}`}>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">System Metrics</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center my-4 font-mono">
                <div className={`border-r pr-2 ${darkMode ? 'border-[#333]' : 'border-[#171717]/20'}`}>
                  <span className="text-2xl font-bold">{tasks.length}</span>
                  <p className="text-[9px] uppercase tracking-wider opacity-60 mt-1">Total</p>
                </div>
                <div className={`border-r pr-2 ${darkMode ? 'border-[#333]' : 'border-[#171717]/20'}`}>
                  <span className="text-2xl font-bold text-[#4ade80]">{completedCount}</span>
                  <p className="text-[9px] uppercase tracking-wider opacity-60 mt-1">Done</p>
                </div>
                <div>
                  <span className="text-2xl font-bold text-[#c85a32]">{tasks.length - completedCount}</span>
                  <p className="text-[9px] uppercase tracking-wider opacity-60 mt-1">Pending</p>
                </div>
              </div>
            </div>
            <p className={`text-[11px] italic border-t pt-3 ${darkMode ? 'border-[#333] opacity-70' : 'border-[#171717]/20 opacity-80'}`}>
              "Efficiency is doing things right; effectiveness is doing the right things."
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className={`lg:col-span-7 border p-6 space-y-6 transition-colors ${
            darkMode 
              ? 'border-[#333] bg-[#1a1a1a] shadow-[8px_8px_0_#2a2a2a]' 
              : 'border-[#171717] bg-[#f8f5ee] shadow-[8px_8px_0_#171717]'
          }`}>
            <div className={`flex flex-wrap items-center justify-between border-b pb-3 gap-2 ${darkMode ? 'border-[#333]' : 'border-[#171717]'}`}>
              <h2 className="font-serif font-black uppercase text-xl tracking-tight">ASSIGNMENT LOG</h2>
              
              <div className="flex gap-1 font-mono text-[10px]">
                {['All', 'Active', 'Completed'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTaskFilter(filter)}
                    className={`px-2 py-0.5 uppercase border transition ${
                      taskFilter === filter 
                        ? 'bg-[#c85a32] text-white border-[#c85a32]' 
                        : darkMode ? 'border-[#444] bg-[#222]' : 'border-[#171717] bg-[#e8e2d5]'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={addTask} className="space-y-3 font-mono">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter task or assignment title..."
                className={`w-full border p-3 text-xs focus:outline-none ${
                  darkMode 
                    ? 'bg-[#242424] border-[#444] text-[#e0dcd3] placeholder:text-[#777]' 
                    : 'bg-[#e8e2d5] border-[#171717] text-[#171717] placeholder:text-[#171717]/50'
                }`}
              />
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex gap-2">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`border px-2.5 py-1.5 text-[11px] uppercase focus:outline-none ${
                      darkMode ? 'bg-[#242424] border-[#444]' : 'bg-[#e8e2d5] border-[#171717]'
                    }`}
                  >
                    <option value="Assignment">Assignment</option>
                    <option value="Research">Research</option>
                    <option value="Exam Prep">Exam Prep</option>
                  </select>

                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className={`border px-2.5 py-1.5 text-[11px] uppercase focus:outline-none ${
                      darkMode ? 'bg-[#242424] border-[#444]' : 'bg-[#e8e2d5] border-[#171717]'
                    }`}
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-[#171717] text-[#f3efe6] dark:bg-[#c85a32] dark:hover:bg-[#b04a25] px-5 py-2 text-xs uppercase font-bold tracking-widest hover:bg-[#c85a32] transition"
                >
                  ADD TO LOG
                </button>
              </div>
            </form>

            <div className="space-y-3 pt-2 font-mono">
              {filteredTasks.length === 0 ? (
                <p className="text-xs opacity-50 italic py-4 text-center">No assignments logged yet.</p>
              ) : (
                filteredTasks.map((t) => (
                  <div
                    key={t.id}
                    className={`border p-4 flex items-center justify-between transition ${
                      t.completed 
                        ? darkMode ? 'bg-[#222]/40 opacity-50 border-[#333]' : 'bg-[#e8e2d5]/50 opacity-60 border-[#171717]'
                        : darkMode ? 'bg-[#222] border-[#444]' : 'bg-[#e8e2d5] border-[#171717]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={t.completed}
                        onChange={() => toggleTask(t.id)}
                        className="w-4 h-4 accent-[#c85a32] cursor-pointer"
                      />
                      <div>
                        <p className={`text-xs font-serif font-bold ${t.completed ? 'line-through opacity-60' : ''}`}>
                          {t.text}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <span className={`text-[9px] border px-1.5 py-0.2 uppercase ${
                            darkMode ? 'border-[#555] bg-[#1a1a1a]' : 'border-[#171717]/40 bg-[#f3efe6]'
                          }`}>
                            {t.category}
                          </span>
                          <span className={`text-[9px] border px-1.5 py-0.2 uppercase font-bold text-white ${
                            t.priority === 'High' ? 'bg-[#c85a32] border-[#c85a32]' : 'bg-[#171717] border-[#171717]'
                          }`}>
                            {t.priority}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteTask(t.id)}
                      className="text-[10px] text-[#c85a32] hover:underline uppercase font-bold"
                    >
                      REMOVE
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className={`border p-6 space-y-4 text-center transition-colors ${
              darkMode 
                ? 'border-[#333] bg-[#1a1a1a] shadow-[8px_8px_0_#2a2a2a]' 
                : 'border-[#171717] bg-[#f8f5ee] shadow-[8px_8px_0_#171717]'
            }`}>
              <div className={`border-b pb-2 flex justify-between items-center ${darkMode ? 'border-[#333]' : 'border-[#171717]'}`}>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">FOCUS CHRONOMETER</span>
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 uppercase ${
                  isRunning ? 'bg-[#4ade80] text-black' : 'bg-[#c85a32] text-white'
                }`}>
                  {isRunning ? 'RUNNING' : 'PAUSED'}
                </span>
              </div>

              <div className="flex justify-center gap-2 font-mono text-[10px] pt-1">
                <button
                  onClick={() => handleModeChange('work')}
                  className={`px-3 py-1 uppercase border font-bold transition ${
                    timerMode === 'work'
                      ? 'bg-[#c85a32] text-white border-[#c85a32]'
                      : darkMode ? 'border-[#444] bg-[#222]' : 'border-[#171717] bg-[#e8e2d5]'
                  }`}
                >
                  Work (25m)
                </button>
                <button
                  onClick={() => handleModeChange('shortBreak')}
                  className={`px-3 py-1 uppercase border font-bold transition ${
                    timerMode === 'shortBreak'
                      ? 'bg-[#c85a32] text-white border-[#c85a32]'
                      : darkMode ? 'border-[#444] bg-[#222]' : 'border-[#171717] bg-[#e8e2d5]'
                  }`}
                >
                  Short (5m)
                </button>
                <button
                  onClick={() => handleModeChange('longBreak')}
                  className={`px-3 py-1 uppercase border font-bold transition ${
                    timerMode === 'longBreak'
                      ? 'bg-[#c85a32] text-white border-[#c85a32]'
                      : darkMode ? 'border-[#444] bg-[#222]' : 'border-[#171717] bg-[#e8e2d5]'
                  }`}
                >
                  Long (15m)
                </button>
              </div>

              <div className="text-6xl font-black font-mono tracking-tighter my-4">
                {formatTime(timeLeft)}
              </div>

              <div className="flex justify-center gap-3 font-mono">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest border transition ${
                    isRunning 
                      ? 'bg-[#c85a32] text-white border-[#c85a32]' 
                      : darkMode ? 'bg-[#333] border-[#555] text-white hover:bg-[#c85a32]' : 'bg-[#171717] text-[#f3efe6] border-[#171717] hover:bg-[#c85a32]'
                  }`}
                >
                  {isRunning ? 'Pause' : 'Start Session'}
                </button>
                <button
                  onClick={() => handleModeChange(timerMode)}
                  className={`border px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition ${
                    darkMode 
                      ? 'bg-[#222] border-[#444] hover:bg-[#333]' 
                      : 'bg-[#e8e2d5] border-[#171717] hover:bg-[#171717] hover:text-[#f3efe6]'
                  }`}
                >
                  Reset
                </button>
              </div>
            </div>

            <div className={`border p-6 space-y-4 transition-colors ${
              darkMode 
                ? 'border-[#333] bg-[#1a1a1a] shadow-[8px_8px_0_#2a2a2a]' 
                : 'border-[#171717] bg-[#e8e2d5] shadow-[8px_8px_0_#171717]'
            }`}>
              <div className={`border-b pb-2 flex items-center justify-between ${darkMode ? 'border-[#333]' : 'border-[#171717]'}`}>
                <h3 className="font-serif font-black uppercase text-sm tracking-tight">UPCOMING MILESTONES</h3>
                <button
                  onClick={() => setShowMilestoneForm(!showMilestoneForm)}
                  className="text-[10px] font-mono font-bold bg-[#c85a32] text-white px-2 py-0.5 uppercase hover:opacity-90 transition"
                >
                  {showMilestoneForm ? 'CLOSE' : '+ NEW'}
                </button>
              </div>

              {showMilestoneForm && (
                <form onSubmit={addMilestone} className="space-y-2 font-mono pt-1">
                  <input
                    type="text"
                    placeholder="Exam or Event Title..."
                    value={milestoneTitle}
                    onChange={(e) => setMilestoneTitle(e.target.value)}
                    className={`w-full border p-2 text-xs focus:outline-none ${
                      darkMode ? 'bg-[#242424] border-[#444]' : 'bg-[#f8f5ee] border-[#171717]'
                    }`}
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Chapters or details..."
                      value={milestoneDetail}
                      onChange={(e) => setMilestoneDetail(e.target.value)}
                      className={`w-full border p-2 text-xs focus:outline-none ${
                        darkMode ? 'bg-[#242424] border-[#444]' : 'bg-[#f8f5ee] border-[#171717]'
                      }`}
                    />
                    <input
                      type="number"
                      placeholder="Days"
                      value={milestoneDays}
                      onChange={(e) => setMilestoneDays(e.target.value)}
                      className={`w-20 border p-2 text-xs focus:outline-none ${
                        darkMode ? 'bg-[#242424] border-[#444]' : 'bg-[#f8f5ee] border-[#171717]'
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#171717] text-white dark:bg-[#c85a32] p-2 text-xs uppercase font-bold tracking-widest"
                  >
                    SAVE MILESTONE
                  </button>
                </form>
              )}

              <div className="space-y-3 font-mono">
                {milestones.length === 0 ? (
                  <p className="text-xs opacity-50 italic py-2 text-center">No upcoming milestones recorded.</p>
                ) : (
                  milestones.map((m) => (
                    <div 
                      key={m.id} 
                      className={`p-3 border flex items-center justify-between ${
                        darkMode ? 'bg-[#222] border-[#333]' : 'bg-[#f8f5ee] border-[#171717]'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold font-serif">{m.title}</p>
                        <p className="text-[9px] opacity-60">{m.detail}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold bg-[#c85a32] text-white border border-[#171717] px-2 py-0.5">
                          {m.daysLeft} DAYS
                        </span>
                        <button
                          onClick={() => deleteMilestone(m.id)}
                          className="text-[10px] text-rose-500 hover:underline font-bold px-1"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}