FROM node:8
COPY . .
EXPOSE 4040
RUN npm install
CMD bash -c "node server.js"
