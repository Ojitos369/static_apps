FROM python:3.12
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y default-libmysqlclient-dev build-essential gcc

ENV APPHOME=/usr/src/app/
WORKDIR $APPHOME
ENV PYTHONUNBUFFERED 1
COPY . $APPHOME

RUN pip install wheel
RUN pip install -r requirements.txt

# docker rm -f sa-py && docker image rm sa-web && docker compose up -d
