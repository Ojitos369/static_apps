FROM python:3.12
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=America/Mexico_City
ENV LANG=es_MX.UTF-8
ENV LANGUAGE=es_MX:es
ENV LC_ALL=es_MX.UTF-8
ENV APPHOME=/usr/src/app/app
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE='app.settings'

# PAQUETES
RUN apt-get update && apt-get upgrade -y 
RUN apt-get install -y \
    wget cron locales tzdata git neovim curl zsh supervisor htop \
    default-libmysqlclient-dev build-essential gcc libgl1 libzbar0

# ZSH 
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
RUN chsh -s $(which zsh)

# LOCALES
RUN echo "es_MX.UTF-8 UTF-8" >> /etc/locale.gen && \
    locale-gen es_MX.UTF-8 && \
    ln -snf /usr/share/zoneinfo/America/Mexico_City /etc/localtime && \
    echo "America/Mexico_City" > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata && \
    apt-get clean

# CRONS
RUN mkdir /usr/src/logs
RUN echo "" > /etc/cron.d/my_cron \
    && chmod 0644 /etc/cron.d/my_cron
# RUN echo "* * * * * /usr/src/app/crons/test.sh >> /usr/src/logs/test.log 2>&1" >> /etc/cron.d/my_cron
# RUN echo "0 1 * * * /usr/src/app/crons/ac2.sh >> /usr/src/logs/ac2.log 2>&1" >> /etc/cron.d/my_cron

# SUPERVISOR
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
CMD ["/usr/bin/supervisord"]

ENV APPHOME=/usr/src/app/
WORKDIR $APPHOME
ENV PYTHONUNBUFFERED 1
COPY . $APPHOME

RUN pip install wheel
RUN pip install -r requirements.txt

# docker rm -f sa-py && docker image rm sa-web && drcu -d
# drc build --no-cache
# drcu -d

