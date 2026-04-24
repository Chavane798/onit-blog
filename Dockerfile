FROM node:24.13.0-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:24.13.0-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24.13.0-alpine AS runner
WORKDIR /usr/src/app

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

# Copy dependencies and build artifacts with correct ownership
COPY --from=deps --chown=nodejs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=nodejs:nodejs /usr/src/app/dist ./dist
COPY --chown=nodejs:nodejs package.json ./

# Switch to non-root user
USER nodejs

EXPOSE 3000

CMD ["npm", "run", "start:prod"]