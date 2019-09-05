FROM jojomi/hugo:0.57.2
RUN apk add nginx npm
RUN mkdir -p /var/www/blog
COPY nginx.conf /etc/nginx/nginx.conf
COPY . /var/www/blog
WORKDIR /var/www/blog
RUN npm install
RUN hugo
EXPOSE 80
ENTRYPOINT ["/usr/sbin/nginx","-c","/etc/nginx/nginx.conf"]
