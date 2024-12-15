FROM node:18-alpine

RUN apk add --no-cache git
RUN git clone https://github.com/kimykstar/web34-LearnDocker.git LearnDocker

WORKDIR /LearnDocker
COPY .env.production .env.production

RUN npm install -g pnpm
CMD ["sh", "-c", "pnpm install && pnpm start"]