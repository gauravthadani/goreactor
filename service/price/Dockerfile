FROM centos:6

RUN mkdir -p /data/public


COPY price /price
COPY /web/public /data/public
COPY config.json.container /config.json
VOLUME /data

EXPOSE 80

CMD /price
