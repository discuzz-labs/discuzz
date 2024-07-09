FROM node:18-alpine AS base
FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json ./

RUN npm update && npm install

# If you want yarn update and  install uncomment the bellow script

# RUN yarn install &&  yarn upgrade

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

#if npm package, then follow this:
    RUN npm run build

#if yarn package, then follow this:

    # RUN yarn build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

#creates a system group named nodejs 
RUN addgroup --system --gid 1001 nodejs

#creates a system group named nextjs 
RUN adduser --system --uid 1001 nextjs


#copy the file from to public folder 
COPY --from=builder /app/public ./public


RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs
# if in your application 3000 will not run, then change the expose port
# ex: EXPOSE <port>
EXPOSE 3000

# set Environment port
ENV PORT 3000

CMD ["node", "server.js"]