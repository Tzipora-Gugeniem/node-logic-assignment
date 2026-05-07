FROM node:22-alpine

# 1. התקנת ספריות נדרשות
RUN apk add --no-cache libc6-compat ca-certificates

WORKDIR /app

# 2.
# אנחנו מגדירים ל-npm להתעלם מאימות ה-SSL כדי שיוכל להוריד חבילות דרך הסינון
RUN npm config set strict-ssl false

# השורה  עבור פריסמה:
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
# 3. הגדרות ל-npm

COPY package*.json ./
RUN npm install

COPY . .

# 4. הרצת הפקודה עם דילוג על אימות תעודה
RUN npx prisma generate
RUN npm config set strict-ssl false
CMD ["node", "main.js"]