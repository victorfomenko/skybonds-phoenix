FROM reg.skybonds.net/nginx

COPY nginx/ /etc/nginx/conf.d/
COPY artifacts/ /var/www/
