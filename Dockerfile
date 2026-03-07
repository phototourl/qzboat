# ========== 阶段 1：安装依赖（跳过 postinstall，避免 fumadocs-mdx 在无配置时报错） ==========
FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

# ========== 阶段 2：构建 ==========
# 在 Dokploy 的 Build-time Arguments 里填写以下变量即可生效（如 NEXT_PUBLIC_BASE_URL、NEXT_PUBLIC_GOOGLE_ANALYTICS_ID）
# 其他 NEXT_PUBLIC_* 可在项目 .env 或构建时环境变量中配置
FROM node:20-alpine AS builder
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
ENV NEXT_TELEMETRY_DISABLED=1
ENV DOCKER_BUILD=true
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=$NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run postinstall
RUN pnpm build

# ========== 阶段 3：运行 ==========
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
