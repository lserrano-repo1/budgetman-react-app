# BUILD sequence
# $> docker build -t budgetman-backend:1.0.0 .
# $> docker build -t luserrano/budgetman-backend:1.1.0 .
# Running 
# $>  docker run -p 8500:8500 budgetman-backend:1.0.0

FROM oraclelinux:8.7

LABEL developer="Luis E. Serrano"

ENV ORACLE_USER=appuser \
    ORACLE_PASS=mypass \
    ORACLE_CONNSTRING=172.17.0.2:1522/xepdb1 \
    SERVER_PORT=8500

# installing oracle instant client
RUN dnf install oracle-instantclient-release-el8 -y
RUN dnf install oracle-instantclient-basic -y
RUN dnf list installed | grep instantclient


#install node.js
RUN dnf module enable nodejs:16 -y
RUN dnf module install nodejs -y

#copying application files
COPY . /opt/budgetmanapp

#change directory before install all node components
WORKDIR /opt/budgetmanapp

RUN npm install
RUN npm install oracledb

#npm start as main container process
CMD ["npm","start"]