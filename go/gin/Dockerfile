FROM golang:1.22 as build
WORKDIR /app
COPY . .
RUN go build -o /server .

FROM scratch
COPY --from=build /server /server
EXPOSE 3000
CMD ["/server"]
