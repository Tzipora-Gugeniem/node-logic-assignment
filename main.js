// entry point
import prisma from './prismaClient.js'
import { joinGame } from './game.service.js'

async function main() {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: 'Batya',
        email: 'b@gmail.com'
      }
    })
    console.log('New user created:', newUser)

    const newGame = await prisma.game.create({
      data: {
        name: 'Chess',
        maxParticipants: 2
      }
    })
    console.log('New game created:', newGame)

    try {
      const participant = await joinGame(newUser.id, newGame.id)
      console.log(`Success: User ${newUser.name} joined game ${newGame.name}`)
    } catch (error) {
      console.error('Error joining game:', error?.message ?? error)
    }
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})