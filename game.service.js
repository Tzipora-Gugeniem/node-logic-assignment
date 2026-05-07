// game.service.js - ESM module
import prisma from './prismaClient.js'

/**
 * Join a user to a game.
 * @param {number} userId
 * @param {number} gameId
 */
export async function joinGame(userId, gameId) {
  const userExists = await prisma.user.findUnique({ where: { id: userId } })
  if (!userExists) throw new Error('User does not exist.')

  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { _count: { select: { participants: true } } }
  })
  if (!game) throw new Error('Game not found.')

  if (game.status !== 'Waiting') {
    throw new Error(`Cannot join: Game is already ${game.status.toLowerCase()}.`)
  }

  if (game.maxParticipants && game._count.participants >= game.maxParticipants) {
    throw new Error('Cannot join: Game is full.')
  }

  const existingParticipant = await prisma.gameParticipant.findUnique({
    where: { userId_gameId: { userId, gameId } }
  })
  if (existingParticipant) throw new Error('User is already a participant in this game.')

  return prisma.gameParticipant.create({
    data: { userId, gameId, role: 'Player', score: 0 }
  })
}