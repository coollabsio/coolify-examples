FROM golang:1.22 as build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64
RUN go build -ldflags="-s -w" -o /server .

FROM scratch
COPY --from=build /server /server
EXPOSE 3000
CMD ["/server"]
