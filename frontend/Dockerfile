# Use an official Node.js runtime as a parent image
FROM node:alpine as build

# Set the working directory to /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build


FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]

# RUN yarn global add serve
# Start the application using a production web server
# CMD ["serve", "-s", "build", "-l", "3000"]




# FROM node:alpine as build-deps
# WORKDIR /usr/src/app
# COPY package.json yarn.lock ./
# RUN yarn
# COPY . ./
# RUN yarn install

# FROM nginx:1.12-alpine
# COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
# EXPOSE 3000
# RUN yarn start




# FROM node:alpine as build-deps
# WORKDIR /usr/src/app
# RUN npm install typescript
# COPY package.json yarn.lock ./
# COPY tsconfig.json tsconfig.json
# COPY tsconfig.node.json tsconfig.node.json
# RUN yarn
# COPY . ./
# RUN yarn run build

# FROM nginx:1.12-alpine
# COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
# EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]




# FROM node as builder
# WORKDIR /usr/src/app
# COPY package.json yarn.lock ./
# RUN yarn install
# COPY . .
# RUN yarn build

# FROM node:slim
# ENV NODE_ENV production
# USER node
# WORKDIR /usr/src/app
# COPY package.json yarn.lock ./
# RUN yarn install --production
# COPY --from=builder /usr/src/app/dist ./dist
# EXPOSE 3000
# CMD [ "node", "dist/index.js" ]