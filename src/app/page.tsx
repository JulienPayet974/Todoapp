// src/app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import TodoForm from '@/components/TodoForm'
import TodoItem from '@/components/TodoItem'
import LogoutButton from '@/components/LogoutButton'

interface Todo {
 id: string
 title: string
 completed: boolean
 priority: 'LOW' | 'NORMAL' | 'HIGH'
 dueDate: string | null
}

export default function Home() {
 const [todos, setTodos] = useState<Todo[]>([])
 const [isLoading, setIsLoading] = useState(true)
 const [error, setError] = useState('')

 const fetchTodos = async () => {
   try {
     setIsLoading(true)
     const response = await fetch('/api/todos')
     if (!response.ok) {
       throw new Error('Erreur lors du chargement des tâches')
     }
     const data = await response.json()
     setTodos(data)
   } catch (error) {
     setError('Impossible de charger les tâches')
     console.error('Error:', error)
   } finally {
     setIsLoading(false)
   }
 }

 useEffect(() => {
   fetchTodos()
 }, [])

 const todosByPriority = {
   HIGH: todos
     .filter(todo => todo.priority === 'HIGH')
     .sort((a, b) => {
       if (!a.dueDate) return 1
       if (!b.dueDate) return -1
       return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
     }),
   NORMAL: todos
     .filter(todo => todo.priority === 'NORMAL')
     .sort((a, b) => {
       if (!a.dueDate) return 1
       if (!b.dueDate) return -1
       return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
     }),
   LOW: todos
     .filter(todo => todo.priority === 'LOW')
     .sort((a, b) => {
       if (!a.dueDate) return 1
       if (!b.dueDate) return -1
       return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
     })
 }

 return (
   <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
     <div className="container mx-auto">
       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
         <h1 className="text-3xl font-bold text-white">Ma Liste de Tâches</h1>
         <LogoutButton />
         <TodoForm onTodoCreated={fetchTodos} />
       </div>

       {error && (
         <div className="bg-red-900/50 border border-red-700 text-red-200 p-3 rounded mb-4">
           {error}
         </div>
       )}

       {isLoading ? (
         <div className="text-center p-4 text-gray-300">Chargement...</div>
       ) : (
         <div className="flex flex-col lg:flex-row gap-6">
           {/* Colonne Haute priorité */}
           <div className="w-full lg:flex-1 bg-red-900/20 rounded-lg p-4 border border-red-800/30">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-semibold text-red-200">
                 Haute priorité
               </h2>
               <span className="px-2 py-1 bg-red-900/50 text-red-200 rounded-full text-sm border border-red-700/50">
                 {todosByPriority.HIGH.length}
               </span>
             </div>
             <div className="space-y-3">
               {todosByPriority.HIGH.map((todo) => (
                 <TodoItem
                   key={todo.id}
                   {...todo}
                   onUpdate={fetchTodos}
                   onDelete={fetchTodos}
                 />
               ))}
               {todosByPriority.HIGH.length === 0 && (
                 <p className="text-center text-gray-400 py-4">
                   Aucune tâche
                 </p>
               )}
             </div>
           </div>

           {/* Colonne Priorité normale */}
           <div className="w-full lg:flex-1 bg-blue-900/20 rounded-lg p-4 border border-blue-800/30">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-semibold text-blue-200">
                 Priorité normale
               </h2>
               <span className="px-2 py-1 bg-blue-900/50 text-blue-200 rounded-full text-sm border border-blue-700/50">
                 {todosByPriority.NORMAL.length}
               </span>
             </div>
             <div className="space-y-3">
               {todosByPriority.NORMAL.map((todo) => (
                 <TodoItem
                   key={todo.id}
                   {...todo}
                   onUpdate={fetchTodos}
                   onDelete={fetchTodos}
                 />
               ))}
               {todosByPriority.NORMAL.length === 0 && (
                 <p className="text-center text-gray-400 py-4">
                   Aucune tâche
                 </p>
               )}
             </div>
           </div>

           {/* Colonne Basse priorité */}
           <div className="w-full lg:flex-1 bg-green-900/20 rounded-lg p-4 border border-green-800/30">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-semibold text-green-200">
                 Basse priorité
               </h2>
               <span className="px-2 py-1 bg-green-900/50 text-green-200 rounded-full text-sm border border-green-700/50">
                 {todosByPriority.LOW.length}
               </span>
             </div>
             <div className="space-y-3">
               {todosByPriority.LOW.map((todo) => (
                 <TodoItem
                   key={todo.id}
                   {...todo}
                   onUpdate={fetchTodos}
                   onDelete={fetchTodos}
                 />
               ))}
               {todosByPriority.LOW.length === 0 && (
                 <p className="text-center text-gray-400 py-4">
                   Aucune tâche
                 </p>
               )}
             </div>
           </div>
         </div>
       )}

       <div className="mt-6 text-sm text-gray-400">
         {todos.length} tâche(s) • {todos.filter(t => t.completed).length} complétée(s)
       </div>
     </div>
   </main>
 )
}