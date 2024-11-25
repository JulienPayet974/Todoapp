// src/components/TodoItem.tsx
'use client'

import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface TodoItemProps {
  id: string
  title: string
  completed: boolean
  priority: 'LOW' | 'NORMAL' | 'HIGH'
  dueDate?: string | Date | null
  onUpdate: () => void
  onDelete: () => void
}

export default function TodoItem({
  id,
  title,
  completed,
  priority,
  dueDate,
  onUpdate,
  onDelete
}: TodoItemProps) {
  const handleToggle = async () => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      })

      if (response.ok) {
        onUpdate()
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        onDelete()
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    }
  }

  const priorityColors = {
    LOW: 'bg-green-100 text-green-800',
    NORMAL: 'bg-blue-100 text-blue-800',
    HIGH: 'bg-red-100 text-red-800'
  }
  

  const formattedDate = dueDate 
    ? format(new Date(dueDate), 'dd MMM yyyy', { locale: fr }) 
    : null

  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-black">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggle}
          className="h-5 w-5 rounded border-gray-300"
        />
        
        <span className={`flex-1 ${completed ? 'line-through text-gray-500' : ''}`}>
          {title}
        </span>

        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[priority]}`}>
          {priority === 'LOW' ? 'Basse' : priority === 'NORMAL' ? 'Normale' : 'Haute'}
        </span>
        
        {formattedDate && (
          <span className="text-gray-600">
            Échéance : {formattedDate}
          </span>
        )}
      </div>
    </div>
  )
}