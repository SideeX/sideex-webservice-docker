FROM sideex/webservice-base:3.4.0

USER sideex

ARG timezone=Asia/Taipei

ENV TZ ${timezone}

COPY sideex.js /opt/sideex-webservice/
COPY version.json /opt/sideex-webservice/
RUN node /opt/sideex-webservice/sideex.js
COPY sideex-webservice.sh /opt/sideex-webservice/
COPY serviceconfig.json /opt/sideex-webservice/
COPY serviceconfig.json /opt/sideex-webservice/
COPY sideex-service.conf /etc/supervisor/conf.d/

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
        && echo $TZ > /etc/timezone && \
        date

EXPOSE 50000
