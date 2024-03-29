FROM node

WORKDIR /rody_realty_project_app

ENV PORT 3000

COPY package.json /rody_realty_project_app/package.json

COPY package-lock.json /rody_realty_project_app/package-lock.json

RUN npm install 

COPY . /rody_realty_project_app/

EXPOSE 3000

CMD [ "npm", "start" ]
