FROM sideex/webservice-base:3.4.0

USER sideex

COPY sideex.js /opt/sideex-webservice/
COPY version /opt/sideex-webservice/
RUN node /opt/sideex-webservice/sideex.js
COPY sideex-webservice.sh /opt/sideex-webservice/
COPY serviceconfig.json /opt/sideex-webservice/
COPY serviceconfig.json /opt/sideex-webservice/
COPY sideex-service.conf /etc/supervisor/conf.d/

EXPOSE 50000
