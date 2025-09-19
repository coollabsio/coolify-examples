FROM oven/bun
ENV NPM_TOKEN
WORKDIR /app
COPY . /app
RUN env
RUN echo "Build-time NPM_TOKEN is: $NPM_TOKEN"
RUN bun install
CMD bun start
