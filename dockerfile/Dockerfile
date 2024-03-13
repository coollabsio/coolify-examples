FROM nginx:alpine
RUN echo "Hello, World!" > /usr/share/nginx/html/index.html
HEALTHCHECK --interval=5s --timeout=3s --start-period=5s --retries=3 CMD wget -qO- http://localhost:80 || exit 1"
