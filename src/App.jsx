import { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React basics', completed: false },
    { id: 2, text: 'Practice Tailwind CSS', completed: true },
  ])
  const [newTask, setNewTask] = useState('')

  // Add a new task to the list
  const addTask = (event) => {
    event.preventDefault()
    const taskText = newTask.trim()
    if (!taskText) return

    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    }
    setTasks((currentTasks) => [...currentTasks, task])
    setNewTask('')
  }

  // Mark a task as completed or incomplete
  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  // Delete a task from the list
  const deleteTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    )
  }

  const remainingTasks = tasks.filter((task) => !task.completed).length

  return (
    <main className="min-h-screen px-4 py-12 sm:py-16">
      <section className="mx-auto w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">
            Stay organized
          </p>
          <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
            My Todo List
          </h1>
          <p className="mt-3 text-slate-500">
            Plan your day and get things done.
          </p>
        </div>

        <form onSubmit={addTask} className="mb-6 flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="Enter a new task..."
            className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Add
          </button>
        </form>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Your Tasks</h2>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
            {remainingTasks} remaining
          </span>
        </div>

        {tasks.length === 0 ? (
          <p className="rounded-xl bg-slate-50 px-4 py-8 text-center text-slate-500">
            No tasks yet. Add your first task!
          </p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  aria-label={`Mark ${task.text} as ${
                    task.completed ? 'incomplete' : 'complete'
                  }`}
                  className="h-5 w-5 cursor-pointer accent-indigo-600"
                />
                <span
                  className={`min-w-0 flex-1 break-words ${
                    task.completed
                      ? 'text-slate-400 line-through'
                      : 'text-slate-700'
                  }`}
                >
                  {task.text}
                </span>
                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
                  aria-label={`Delete ${task.text}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 border-t border-slate-100 pt-5 text-center text-sm text-slate-400">
          {tasks.length - remainingTasks} completed out of {tasks.length} tasks
        </div>
      </section>
      <p className="mt-6 text-center text-sm text-slate-500">
        Roll Number: 23
      </p>
      <p className="mt-2 text-center text-sm text-slate-400">
        Built with React.js, Vite &amp; Tailwind CSS
      </p>
    </main>
  )
}

export default App