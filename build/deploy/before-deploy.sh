#! /bin/sh

if [ ! $RELEASE_NAME ]; then
  exit 0
fi

# get release file
mv lib wot-design
zip -r wot-design-$RELEASE_NAME-jd.zip wot-design/*
mv wot-design lib
mv lib-wx wot-design
zip -r wot-design-$RELEASE_NAME-wechat.zip wot-design/*
mv wot-design lib-wx
