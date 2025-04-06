"use client"

import { useState } from "react"
import { Check, Pencil, Plus, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")

  // Add a new todo
  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem: Todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
      }
      setTodos([...todos, newTodoItem])
      setNewTodo("")
    }
  }

  // Delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // Toggle todo completion status
  const toggleComplete = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  // Start editing a todo
  const startEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  // Save edited todo
  const saveEdit = () => {
    if (editText.trim() !== "") {
      setTodos(todos.map((todo) => (todo.id === editingId ? { ...todo, text: editText } : todo)))
      setEditingId(null)
    }
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-800 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Todo List App</h1>
          <p className="text-slate-300">Keep track of your tasks</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 max-w-3xl">
        {/* Add Todo Form */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTodo()
                  }
                }}
                className="flex-1"
              />
              <Button onClick={addTodo}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Todo List */}
        <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
        {todos.length === 0 ? (
          <p className="text-slate-500 text-center py-8">No tasks yet. Add some tasks to get started!</p>
        ) : (
          <div className="space-y-3">
            {todos.map((todo) => (
              <Card key={todo.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center p-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-full mr-3 ${
                        todo.completed
                          ? "bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700"
                          : "bg-slate-100 hover:bg-slate-200"
                      }`}
                      onClick={() => toggleComplete(todo.id)}
                    >
                      <Check className={`h-4 w-4 ${!todo.completed && "opacity-0"}`} />
                    </Button>

                    {editingId === todo.id ? (
                      <div className="flex-1 flex gap-2">
                        <Input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              saveEdit()
                            }
                          }}
                          autoFocus
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={saveEdit}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={cancelEdit}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span className={`flex-1 ${todo.completed ? "line-through text-slate-500" : ""}`}>
                          {todo.text}
                        </span>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => startEdit(todo)}
                            className="text-slate-500 hover:text-slate-700"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTodo(todo.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-slate-300">&copy; {new Date().getFullYear()} Todo List App</p>
        </div>
      </footer>
    </div>
  )
}

