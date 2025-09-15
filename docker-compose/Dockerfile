FROM oven/bun
WORKDIR /app
COPY . /app
ENV TEST=$TEST
RUN env
RUN bun install
CMD bun start
