# 1. בחירת תמונה של Node.js
FROM node:18

# 2. יצירת תיקיית עבודה בתוך המכולה
WORKDIR /usr/src/app

# 3. העתקת קבצי הגדרות החבילות והתקנתן
COPY package*.json ./
RUN npm install

# 4. העתקת כל קבצי הפרויקט (כולל תיקיית prisma)
COPY . .

# 5. יצירת ה-Prisma Client 
RUN npx prisma generate

# 6. הפקודה שתריץ את האפליקציה (נגדיר אותה ב-compose כדי שתחכה ל-DB)
CMD [ "node", "main.js" ]