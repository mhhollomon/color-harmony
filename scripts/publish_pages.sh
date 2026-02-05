#!/usr/bin/bash

# Directory that has the clone sitting on the branch gh-pages
OUTPUT_REPO_DIR=${HOME}/src/gh-pages/color-harmony

if [[ ${OUTPUT_REPO_DIR} == *__NEW_REPO_NAME__ ]]; then
    echo "Need to set OUTPUT_REPO_DIR to the directory that has the clone sitting on the branch gh-pages"
    exit 44
fi

# Build directory to be used - it will be wiped out if it exists
BUILD_DIR=build-web-deploy

#
BASE_HREF='/color-harmony/'

# It is assumed that this is called sitting in the root
# of the source repo.


echo "####################################################################"
echo "Building web app"
echo "####################################################################"

rm -rf ${BUILD_DIR};
npm run build -- --outDir ${BUILD_DIR} --base ${BASE_HREF}

if [ ! -e  ${BUILD_DIR}/index.html ]; then
    echo "Can't find the web files. Something went wrong"
    exit 44
fi


echo "####################################################################"
echo "Copy web files"
echo "####################################################################"

( cd ${OUTPUT_REPO_DIR};
    rm -rf assets *
)

( cd ${BUILD_DIR};
    cp -r *  ${OUTPUT_REPO_DIR}
)

( cd ${OUTPUT_REPO_DIR} ;
    git add -A
    git status
)

echo "####################################################################"
echo "Check git status above and commit/push if everything looks okay"
echo " cd ${OUTPUT_REPO_DIR}"
echo "####################################################################"

