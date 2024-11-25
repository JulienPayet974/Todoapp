// src/lib/db-test.ts

import { PrismaClient } from '@prisma/client'

async function testConnection() {
  const prisma = new PrismaClient()

  try {
    // Tente de se connecter à la base de données
    await prisma.$connect()
    console.log('✅ Connexion à la base de données réussie')

    // Vérifie qu'on peut créer une table
    await prisma.todo.create({
      data: {
        title: 'Test de connexion',
        priority: 'NORMAL'
      }
    })
    console.log('✅ Création de données réussie')

    // Compte le nombre d'entrées
    const count = await prisma.todo.count()
    console.log(`✅ Nombre de todos : ${count}`)

  } catch (error) {
    console.error('❌ Erreur de connexion :', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()