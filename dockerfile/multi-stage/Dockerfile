FROM golang:alpine AS build
WORKDIR /app
RUN echo '<h1>hello</h1>' > index.html
RUN mkdir -p /app/dist && cp index.html /app/dist/

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
