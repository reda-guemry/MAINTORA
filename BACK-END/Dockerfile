

FROM php:8.4-cli

WORKDIR /var/www/html

RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends curl git unzip libpq-dev libzip-dev; \
    docker-php-ext-install pdo_pgsql pgsql zip pcntl; \
    curl -fsSL https://getcomposer.org/installer -o composer-setup.php; \
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer; \
    rm -f composer-setup.php; \
    rm -rf /var/lib/apt/lists/*

COPY . .

RUN set -eux; \
    mkdir -p storage/framework/views storage/framework/cache storage/framework/sessions bootstrap/cache; \
    chown -R www-data:www-data storage bootstrap/cache || true; \
    chmod -R 0777 storage bootstrap/cache || true; \
    composer install --no-dev --no-interaction --no-progress --prefer-dist --optimize-autoloader && \
    php artisan config:cache && \
    php artisan db:seed --force

EXPOSE 8000