FROM ubuntu
# RUN will be processed in image build time ONLY
RUN apt-get update
RUN apt-get install git -y
RUN apt-get install nodejs -y
RUN apt-get install npm -y
WORKDIR /app
RUN git clone https://github.com/ssmak/playable.git playable.git
WORKDIR /app/playable.git
RUN npm install
EXPOSE 8080
# CMD will be processed in container start ONLY
CMD ["npm", "start"]