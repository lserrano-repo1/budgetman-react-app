#Building process
# docker build -t budgetman-webapp:1.0.0 .
# $> docker build -t luserrano/budgetman-frontend:1.1.0 .
# Runing
# docker run -d -p 8888:80 budgetman-webapp:1.0.0


## FIRST PHASE
FROM node:18.13.0-alpine3.17 as compilation

LABEL developer="Luis E. Serrano"

ENV REACT_APP_BACK_END_BASE_URL=http://localhost:8500/

COPY . /opt/budgetmanapp

WORKDIR /opt/budgetmanapp

RUN npm install

#building app
RUN npm run build

## SECOND PHASE
FROM nginx:1.22.1

COPY --from=compilation /opt/budgetmanapp/build /usr/share/nginx/html



