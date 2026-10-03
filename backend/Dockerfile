FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy application code
COPY . .

# Generate ORM contract
RUN bun run contract:emit

# Environment variables
ENV PORT=20291
ENV NODE_ENV=production

# Expose port
EXPOSE 20291

# Start the application
CMD ["bun", "src/index.ts"]
