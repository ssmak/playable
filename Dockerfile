FROM ubuntu
RUN apt-get update
RUN apt-get install git -y
RUN apt-get install nodejs -y
RUN apt-get install npm -y
WORKDIR /app
RUN git clone https://github.com/ssmak/playable.git playable.git
WORKDIR /app/playable.git
RUN npm install
#RUN node index.js --ip 0.0.0.0 --port 8080
EXPOSE 8080
CMD ["npm", "start"]