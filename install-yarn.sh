#!/bin/bash
# Read the desired yarn version string from package.json - it should be in the top level key yarnVersion
EXPECTED_YARN_VERSION=$(node -e 'const fs = require("fs"); console.log(JSON.parse(fs.readFileSync("package.json")).yarnVersion || "");')

if [ -z "$EXPECTED_YARN_VERSION" ]; then
  echo "Please define the top level key yarnVersion in the project package.json and run this command again."
  exit 12
fi

echo "The package.json specifies a yarn version of $EXPECTED_YARN_VERSION"

function install_yarn {
  mkdir -p .yarn
  DOWNLOAD_URL="https://github.com/yarnpkg/yarn/releases/download/v$EXPECTED_YARN_VERSION/yarn-$EXPECTED_YARN_VERSION.js"
  echo "Downloading from $DOWNLOAD_URL"
  curl -fL $DOWNLOAD_URL > .yarn/yarn.js
  if [ -f .yarn/yarn.js ]; then
    chmod +x .yarn/yarn.js
    NEW_YARN_VERSION=$(.yarn/yarn.js --version)
    echo -e "SUCCESS! Installed yarn version $NEW_YARN_VERSION."
  else
    echo "There was a problem downloading Yarn!!!"
    exit 11
  fi
}

if [ -f .yarn/yarn.js ]; then
  YARN_VERSION=$(.yarn/yarn.js --version)
  if [ "$YARN_VERSION" != "$EXPECTED_YARN_VERSION" ]; then
    echo "The yarn version is $YARN_VERSION, expected $EXPECTED_YARN_VERSION. Re-downloading"
    rm -rf .yarn
    install_yarn
  else
    echo "The expected version $EXPECTED_YARN_VERSION is already installed.  No need to update."
  fi
else
  echo "The file .yarn/yarn.js does not exist, installing yarn".
  install_yarn
fi
