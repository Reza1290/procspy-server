#!/bin/bash

# Certificate and key file paths
CERT_PATH="cert.pem"
KEY_PATH="key.pem"

# Generate a self-signed root certificate and private key
openssl req -x509 -nodes -new -sha256 -days 1024 \
  -newkey rsa:2048 -keyout "$KEY_PATH" -out "$CERT_PATH" \
  -subj "/C=US/CN=Example-Root-CA"

echo "Certificate and key files generated:"
echo "  Certificate: $CERT_PATH (Root CA)"
echo "  Private key: $KEY_PATH"
echo "  Remember to configure your application to use these files."
