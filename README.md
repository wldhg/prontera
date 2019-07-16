<p align='center'>

# Prontera

*넘치지 않으면서 적당하게 알맞은 티스토리 스킨 (NOT-RELEASED)*

![Version](https://img.shields.io/github/package-json/v/widh/prontera.svg?style=flat-square)
![Travis CI Build Status](https://img.shields.io/travis/com/widh/prontera.svg?style=flat-square)
![Maintenance](https://img.shields.io/maintenance/yes/2019.svg?style=flat-square)
![License](https://img.shields.io/github/license/widh/prontera.svg?style=flat-square)

![미리보기](raw/preview560.jpg)

</p>

## 기능 안내

#### 지금 `master` 브랜치가 포함하는 기능

+ 반응형 디자인
+ 빈틈 없는 시각 효과
+ 흰 바탕, 검은 바탕 모드 전환
+ 밝기 모드 쿠키 도메인 공유
+ 블로그 전역 공지
+ 하이라이트 색상 지정

#### 영원히 추가할 예정이 없는 기능

+ TISTORY 구 에디터 지원
+ 위치 로그, 미디어 로그
+ 댓글에 홈페이지 정보 입력하기
+ Internet Explorer에서의 접속 (미지원 안내 있음)

#### 지원 예정 기능

앞으로 추가 혹은 수정할 기능

+ `(확정)` 태그 목록 지원
+ `(확정)` 방명록 페이지 지원
+ `(확정)` 사이드바 지원
+ `(확정)` 모바일 사이드바 지원
+ `(확정)` 푸터 지원
+ `(확정)` 웹 접근성 개선
+ `(확정)` 읽기 모드에서의 맥락 안정화
+ `(확정)` 목차 생성 기능
+ `(고려)` 갤러리 스타일의 게시글 리스트
+ `(고려)` 사이드바의 최근 댓글 패널
+ `(고려)` 영어 지원
+ `(고려)` Google Analytics 지원
+ `(연구)` 티스토리 제공 Summary 대신 원본 게시글 사용


## 스킨 빌드 방법

#### 준비물

+ [node](https://nodejs.org/ko/) `버전 10` `버전 12 미지원 (node-gyp)`
+ [yarn](https://yarnpkg.com/lang/en/)

#### 빌드 명령어

```sh
$ git clone https://github.com/widh/prontera.git; cd prontera
$ yarn; yarn build
```

이후 `out` 디렉토리에서 모든 스킨 파일을 확인할 수 있습니다.

## 라이센스

디자인의 토대는 [AngryPowman](https://github.com/AngryPowman)의 [Prontera](https://github.com/AngryPowman/hexo-theme-prontera)입니다.

이 프로젝트는 *Mozilla Public License 2.0*을 따릅니다.

#### 이미지 라이센스

- `padlock-locked.pug`: &copy; Widh.
- `padlock-unlocked.pug`: &copy; Widh.

이 밖에 프로젝트에서 사용한 `svg` 이미지는 비상업적 이용이 허가된 아이콘으로, 자세한 내용은 [이 링크](https://www.svgrepo.com/info/licensing)에서 설명합니다.

#### 글꼴 라이센스

- Noto Sans KR: [Open Font License](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL_web)
- Roboto Mono: [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)

#### 코드 하이라이트 디자인 라이센스

- VSC Material Theme: [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
