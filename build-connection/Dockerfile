FROM nginx:alpine
ARG URL
RUN ping -w 2 $URL > /usr/share/nginx/html/index.html
# RUN curl -L $URL > /usr/share/nginx/html/index.html
