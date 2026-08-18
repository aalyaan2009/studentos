import { useState } from 'react'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  const addTask = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setTasks([...tasks, { id: Date.now(), text: input }])
    setInput('')
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-6 selection:bg-cyan-500 selection:text-slate-950">
      {/* Hero Section */}
      <header className="max-w-3xl text-center my-12">
        <span className="px-3.5 py-1 text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full inline-block mb-4">
          StudentOS Dashboard
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Your Personal Academic Workspace
        </h1>
        <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
          Manage assignments, organize tasks, and optimize your study workflow in one clean view.
        </p>
      </header>

      {/* Main Task Card */}
      <main className="w-full max-w-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
        <form onSubmit={addTask} className="flex gap-3 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter assignment name..."
            className="flex-1 bg-slate-950 border border-slate-800 text-slate-100 px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 transition placeholder:text-slate-600"
          />
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-5 py-3 rounded-xl transition active:scale-95 cursor-pointer"
          >
            Add Task
          </button>
        </form>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between text-slate-200 transition hover:border-slate-700"
            >
              <span>{task.text}</span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-slate-500 hover:text-red-400 text-sm font-medium px-2 py-1 transition"
              >
                Delete
              </button>
            </li>
          ))}
          {tasks.length === 0 && (
            <p className="text-center text-slate-500 py-6 text-sm">
              No assignments added yet. Type a task above to get started.
            </p>
          )}
        </ul>
      </main>
    </div>
  )
}