FROM alpine:edge
MAINTAINER 	Phani Pasupula <pasupulaphani@gmail.com>

RUN echo "http://dl-4.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
RUN apk update && \
  apk add --update redis && rm -rf /var/cache/apk/* && \
  adduser -h /home/tester -s /bin/sh -u 40561 -D tester tester

USER tester
