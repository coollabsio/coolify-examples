FROM oven/bun
WORKDIR /app
COPY . /app
RUN env
RUN echo "Build-time NPM_TOKEN is: $NPM_TOKEN"
RUN echo "Build-time SERVICE_PASSWORD_64_API is: $SERVICE_PASSWORD_64_API"
RUN bun install
CMD bun start
