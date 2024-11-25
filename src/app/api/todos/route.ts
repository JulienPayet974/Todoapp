// src/app/api/todos/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


// Récupérer toutes les tâches
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(todos)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des tâches' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, priority, dueDate } = await request.json()

    if (!title) {
      return NextResponse.json(
        { error: 'Le titre est requis' },
        { status: 400 }
      )
    }

    if (priority && !['LOW', 'NORMAL', 'HIGH'].includes(priority)) {
      return NextResponse.json(
        { error: 'Priorité invalide' },
        { status: 400 }
      )
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        priority: priority as 'LOW' | 'NORMAL' | 'HIGH',
        dueDate: dueDate ? new Date(dueDate) : null,
        
      }
    })

    return NextResponse.json(todo, { status: 201 })
  } catch (error) {
    console.error("Erreur complète:", error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la tâche' },
      { status: 500 }
    )
  }
}