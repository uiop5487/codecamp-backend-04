FROM node:14

# 명령어를 실행시킬 폴더 위치
WORKDIR /myfolder/
# 먼저 package.json을 복사해서 가지고 온다.
COPY ./package.json /myfolder/
# yarn.lock도 복사해서 가지고 온다.
COPY ./yarn.lock /myfolder/
# 그 후 인스톨
RUN yarn install

COPY . /myfolder/

CMD yarn dev