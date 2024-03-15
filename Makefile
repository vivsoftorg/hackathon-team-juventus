.PHONY: default clean build test

default: build-cli

all: clean build test

clean:
	@echo "Cleaning up..."
	@rm -rf bin

build-cli:
	mkdir -p bin && cd cli && go build -o ../bin/tars main.go && cd ../

#  test:
#      go test *_test.go