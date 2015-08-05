FROM centos:6

RUN mkdir /data

COPY queryengine /queryengine
COPY data.json /data/data.json
COPY config.json.container /config.json

VOLUME /data

EXPOSE 80

CMD /queryengine
