FROM node:13.10-alpine as frontend

WORKDIR /usr/src

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY frontend/package*.json ./

# RUN npm install
# If you are building your code for production
RUN npm ci

# Bundle app source
COPY frontend/ .

RUN npm run build


FROM node:13.10-alpine

# Create app directory
WORKDIR /usr/src

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY backend/package*.json ./

# RUN npm install
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY backend .

COPY --from=frontend /usr/src/dist/ /usr/src/public/

EXPOSE 3000
CMD [ "node", "./bin/www" ]