// entry point
import { PrismaClient } from '@prisma/client'
import { joinGame } from './game.service';
//התחברות למסד הנתונים עי יצירת מופע של PrismaClient
const prisma = new PrismaClient()

async function main() {
const newUser = await prisma.user.create({
    data: {
      name: "Batya",
      email: "b@gmail.com",
    },
  });
  console.log("New user created:", newUser);

const    newGame = await prisma.game.create({
        data: {
          name: "Chess",
          maxParticipants: 2, // הגבלת מספר משתתפים למשחק
        // סטטוס ותאריך יוגדרו לפי הגדרות ברירת מחדל
        },
        
      });
      console.log("New game created:", newGame);
        // ניסיון להצטרף למשחק
        try {
            const participant = await joinGame(newUser.id, newGame.id);
            console.log("Success: User " + newUser.name + " joined game " + newGame.name);
        } catch (error) {
            console.error("Error joining game:", error.message);
        }
}