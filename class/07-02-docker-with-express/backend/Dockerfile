FROM node:14


# 명령어를 실행시킬 폴더 위치
WORKDIR /myfolder/

# 현재 디렉토리에 모든 파일을 복사 후 새로운 폴더안에 붙여넣기
COPY . /myfolder/

RUN yarn install
CMD yarn dev