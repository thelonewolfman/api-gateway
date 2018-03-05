FROM node:carbon
MAINTAINER thelonewolf <thelonewolf.init@gmail.com>
EXPOSE 3000
COPY ./package.json /authentication/package.json
WORKDIR /authentication
RUN npm install
COPY . .
RUN mv scripts/entrypoint.sh /usr/local/bin && chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT [""]
CMD ["npm", "run", "start:dev"]
