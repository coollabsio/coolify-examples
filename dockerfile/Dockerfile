FROM nginx:alpine as base
ENV DATABASE_URL=$DATABASE_URL
RUN echo -e "\e[1;33mENVIRONMENT VARIABLES\e[0m"
RUN env
RUN echo "Hello, World!" > /usr/share/nginx/html/index.html
RUN echo "Hello, World about!" > /usr/share/nginx/html/about.html
#HEALTHCHECK --interval=5s --timeout=3s --start-period=30s --retries=3 CMD wget -qO- http://localhost:80 || exit 1

FROM base AS builder
RUN echo -e "\e[1;33mENVIRONMENT VARIABLES\e[0m"
RUN env


