FROM ubuntu:18.04

MAINTAINER julienduranleau

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y apt-utils && apt-get upgrade -y

RUN apt install -y --no-install-recommends \
    curl \
    git \
    vim \
    apache2 \
    php7.2 \
    libapache2-mod-php \
    #php7.2-mcrypt \
    php7.2-mbstring \
    php7.2-mysql \
    php7.2-xml \
    php7.2-curl \
    php7.2-cli \
    php7.2-json \
    php7.2-fpm \
    php7.2-gd \
    #php7.2-ldap \
    #php7.2-soap \
    php7.2-sqlite3 \
    php7.2-zip \
    php7.2-intl

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN a2enmod rewrite
COPY .docker/vhost.conf /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html
RUN rm index.html

EXPOSE 80 443

CMD ["apache2ctl", "-D", "FOREGROUND"]

