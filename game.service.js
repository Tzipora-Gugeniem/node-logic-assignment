
// הגדרות השימוש של Prisma Client מתוך הספרייה שהותקנה בפרויקט
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Docmentation
/**
 * פונקציה לצירוף משתמש למשחק
 * @param {number} userId - ה-ID של המשתמש
 * @param {number} gameId - ה-ID של המשחק
 */

async function joinGame(userId, gameId) {
  // 1. בדיקת קיום המשתמש 
  const userExists = await prisma.user.findUnique({
    where: { id: userId }
  });
  if (!userExists) {
    throw new Error("User does not exist.");
  }

  // 2. שליפת המשחק ובדיקת הסטטוס והגבלת משתתפים
const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: {
      _count: {
        select: { participants: true }
      }
    }
  });

  if (!game) {
    throw new Error("Game not found.");
  }

  // ניתן להצטרף רק למשחק שממתין
  if (game.status !== 'Waiting') {
    throw new Error(`Cannot join: Game is already ${game.status.toLowerCase()}.`);
  }
 //   בדיקה האם המשחק מלא (אם maxParticipants מוגדר) - אם כן, לא ניתן להצטרף
  if(game.maxParticipants && game._count.participants >= game.maxParticipants) {
    throw new Error("Cannot join: Game is full.");
  }
  // 3. בדיקה האם המשתמש כבר רשום (מניעת כפילויות)
//   findUnique עם מפתח משולב (userId, gameId) כדי לבדוק אם המשתמש כבר רשום למשחק
  const existingParticipant = await prisma.gameParticipant.findUnique({
    where: {
      userId_gameId: {
        userId: userId,
        gameId: gameId,
      },
    },
  });

  if (existingParticipant) {
    throw new Error("User is already a participant in this game.");
  }}

  // 5. ביצוע הרישום בפועל
  return await prisma.gameParticipant.create({
    data: {
      userId: userId,
      gameId: gameId,
      role: 'Player', // ברירת מחדל למצטרף חדש
      score: 0
    }
  });


module.exports = { joinGame };