FROM node:8
COPY . .
EXPOSE 4040
RUN npm install
<<<<<<< HEAD
CMD bash -c "node server.js"
=======
CMD bash -c "node server.js"
>>>>>>> 325eea09d0ac9d8418bb7d1309c70c8fad41780f
