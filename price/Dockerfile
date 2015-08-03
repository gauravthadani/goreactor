FROM ubuntu:latest

RUN mkdir -p /data/public

ENV PRICE_CONFIG_FILE_PATH /data/config.json

COPY price /price
COPY public /data/public
COPY data.json /data/data.json
COPY config.json.container /data/config.json
VOLUME /data

EXPOSE 80

CMD /price
