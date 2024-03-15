FROM golang:1.21.3-alpine as build

COPY go.mod go.sum api.go /src/
WORKDIR /src
RUN go mod download
RUN go build -o /usr/local/bin/genai
RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

USER nonroot
ENTRYPOINT ["/usr/local/bin/genai"]
