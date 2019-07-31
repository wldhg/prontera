<p align='center'>
  <img alt='Prontera' src='./prontera.png'>
</p>

<p align='center'>넘치지 않으면서 적당하게 알맞은 티스토리 스킨 (NOT-RELEASED)</p>

<p align='center'>
  <a href="https://github.com/widh/prontera/blob/master/package.json#L3">
    <img alt='버전' src='https://img.shields.io/github/package-json/v/widh/prontera.svg?style=flat-square'>
  </a>
  <a href="https://travis-ci.com/widh/prontera">
    <img alt='Travis CI 빌드 테스트 상태' src='https://img.shields.io/travis/com/widh/prontera.svg?style=flat-square'>
  </a>
  <a href="https://widh.me/">
    <img alt='레포지토리 유지 여부' src='https://img.shields.io/maintenance/yes/2019.svg?style=flat-square'>
  </a>
  <a href="https://www.mozilla.org/en-US/MPL/2.0/">
    <img alt='라이센스' src='https://img.shields.io/github/license/widh/prontera.svg?style=flat-square'>
  </a>
</p>

<br>

## 미리 보기

<p align='center'><img alt="스킨 미리보기" src="https://raw.githubusercontent.com/widh/prontera/master/src/preview.png" width="100%"></p>

<br>
<hr>
<br>

## 기능 안내

지원 예정 기능은 [TODO.md](TODO.md)에서 확인할 수 있습니다.

|      티스토리 기능 지원      |             외형             |            개인화           |          특별한 기능         |
|:----------------------------|:----------------------------|:----------------------------|:----------------------------|
| TISTORY 신 에디터 지원       | 반응형 디자인                | 강조 색상 지정               | 밝기 모드 쿠키 도메인 공유    |
|                             | 빈틈 없는 시각 효과          | 헤더 로고 지정               | 블로그 전역 공지              |
|                             | 밝기 모드 전환               | 아이콘만 있는 헤더 로고       | 사이드바 트위터 타임라인      |
|                             |                             | 페이지에서 사이드바 숨기기    |                             |

#### 영원히 지원할 예정이 없는 기능

+ TISTORY 구 에디터 지원
+ 위치 로그, 미디어 로그
+ 댓글 및 방명록에 홈페이지 주소 입력하기
+ Internet Explorer에서의 정상적 렌더링

<br>

## 스킨 빌드 방법

#### 준비물

+ [node](https://nodejs.org/ko/) `버전 12 미지원 (node-sass)`
+ [yarn](https://yarnpkg.com/lang/en/) `npm install yarn -g`

#### 빌드 명령

```sh
$ git clone https://github.com/widh/prontera.git --recurse-submodules; cd prontera
$ yarn; yarn build
$ cd out; ls
```

<br>

## 권장 사항

+ 메인 메뉴의 수: 4개
+ 블로그 이름: 영문 9글자 이내 혹은 한글 5글자 이내

<br>

## 라이센스

이 프로젝트는 *Mozilla Public License 2.0*을 따릅니다.

스킨 디자인의 토대는 [MIT License](https://github.com/AngryPowman/hexo-theme-prontera/blob/master/LICENSE)를 기반으로 하는 [AngryPowman](https://github.com/AngryPowman)의 [Prontera](https://github.com/AngryPowman/hexo-theme-prontera)입니다.

스피너(불러오기 애니메이션)의 디자인은 [MIT License](https://github.com/MatejKustec/SpinThatShit/blob/master/LICENSE)를 기반으로 하는 [Matej Kustec](https://github.com/MatejKustec)의 [SpinThatShit](https://github.com/MatejKustec/SpinThatShit) 프로젝트를 이용하였습니다.

#### 이미지 라이센스

+ `padlock-locked.pug`: &copy; Widh.
+ `padlock-unlocked.pug`: &copy; Widh.

이 밖에 Prontera 스킨이 포함하는 모든 이미지는 비상업적 이용이 허가된 `svg` 아이콘으로, 라이센스와 관련한 자세한 내용은 [이 링크](https://www.svgrepo.com/info/licensing)에서 설명합니다.

#### 글꼴 라이센스

Prontera는 [Google](https://fonts.google.com)에서 호스팅하는 웹 글꼴을 이용합니다.

+ Noto Sans KR (Sans-serif): [Open Font License](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL_web)
+ Roboto Mono (Monospace): [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)

#### 색상 라이센스

Prontera의 색상 일부는 아래의 디자인을 사용 또는 참고하였습니다.

+ Microsoft UI Fabric (기본 흑/백 색상): [MIT License](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/LICENSE)
+ VSC Material Theme (코드 하이라이트): [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
