# Stage 1: Build
FROM node:20-slim AS builder

WORKDIR /app

# Install build tools only
COPY package*.json ./
RUN npm install --only=production && npm install --only=dev

# Salin seluruh source code
COPY . .

# Build TypeScript
RUN npm run build

# Stage 2: Production runtime
FROM node:20-slim

WORKDIR /app

# Hanya salin dependensi production
COPY --from=builder /app/node_modules ./node_modules

# Hanya salin hasil build
COPY --from=builder /app/dist ./dist

# Jika kamu perlu public folder (hasil copy dari cpx), pastikan sudah ada di dist/public
COPY --from=builder /app/dist/public ./dist/public

# Jalankan server
CMD ["node", "dist/main/server.js"]

# Gunakan port yang sesuai
EXPOSE 3000
