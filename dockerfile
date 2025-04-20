FROM node:20-alpine AS development

# Instalar herramientas para diagnóstico de red
RUN apk add --no-cache curl iputils bind-tools

# Configurar preferencia de IPv4 sobre IPv6
RUN echo 'precedence ::ffff:0:0/96 100' >> /etc/gai.conf

# Configuración del entorno para preferir IPv4
ENV NODE_OPTIONS=--dns-result-order=ipv4first

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:20-alpine AS production

# Instalar herramientas para diagnóstico de red
RUN apk add --no-cache curl iputils bind-tools

# Configurar preferencia de IPv4 sobre IPv6
RUN echo 'precedence ::ffff:0:0/96 100' >> /etc/gai.conf

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV NODE_OPTIONS=--dns-result-order=ipv4first

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production --legacy-peer-deps

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]