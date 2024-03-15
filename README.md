# hackathon-team-juventus

This is the hackathon entry from team-juventus. 
- Juned Memon
- S. Gabriel Nesaraj

## Description

This hackathon project has three major subprojects
- [Tars cli](#tars-cli)
- [React Application to generate the code](#react-application-to-generate-the-code)
- [Streamlit app](#streamlit-app)

# TARS CLI

- `tars` a a simple command line interface (CLI) application,  named "Tars", built using Go. 

The provided Makefile contains targets for cleaning up build artifacts, building the CLI binary, and scaffolding for automated testing. The source code is available at [./cli](cli)

## Getting Started

### Dependencies

* Make sure you have `go` installed on your system (The version used for developing this project should be specified here).
* This project uses a standard Go project structure and a Makefile to manage build tasks.


### Building the program

* To build the CLI:
  ```sh
  make build-cli
  ```
### Running the program
```
❯ bin/tars "Write a terraform code to create s3 bucket"
 Here's an example of Terraform code in HCL (Hashicorp Configuration Language) to create an Amazon S3 bucket. Make sure you have the `aws` provider installed and configured with your AWS access key ID, secret access key, default region, and default output format.

```hcl
provider "aws" {
  version = "4.56.0"
  region  = "us-west-2"
}

resource "aws_s3_bucket" "example" {
  bucket_name = "example-bucket-name"
  acl        = "private"

  tags = {
    Name        = "Example bucket"
    Environment = "Dev"
  }

  versioning {
    enabled = true
  }
}

output "s3_bucket_url" {
  value       = aws_s3_bucket.example.url
  description = "The URL of the S3 bucket"
}
```

Replace `example-bucket-name` with your desired bucket name, and update the region and tags as needed. This code creates a private S3 bucket with versioning enabled and outputs its URL.
 rancher-desktop hackathon-team-juventus main took 9s ❯
 ```

Any advise for common problems or issues.
```sh
command to run if program contains helper info
```

# React Application to generate the code

This is the React based [frontend](frontend) to generate the code with a [Golang Backend](backend-api)

The backend is a rest api to collama model running locally. 

To start the application in docker  [docker-compose.yaml](docker-compose.yaml) is provided.

# Streamlit app

This is the Streamlit based [streamlit](streamlit) frontend to generate the code with a [Langchain](https://github.com/langchain-ai/langchain)

To start the streamlit app 
```
cd streamlit
streamlit run app.py
```