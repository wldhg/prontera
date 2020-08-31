<p align='center'>
  <img alt='Prontera' src='./prontera.png'>
</p>

<p align='center'>넘치지 않으면서 적당하게 알맞은 티스토리 스킨 (Archived)</p>

<p align='center'>
  <a href="https://github.com/wldh-g/prontera/blob/master/package.json#L3">
    <img alt='버전' src='https://img.shields.io/github/package-json/v/wldh-g/prontera.svg?style=flat-square'>
  </a>
  <a href="https://travis-ci.com/wldh-g/prontera">
    <img alt='Travis CI 빌드 테스트 상태' src='https://img.shields.io/travis/com/wldh-g/prontera.svg?style=flat-square'>
  </a>
  <a>
    <img alt='레포지토리 관리 여부' src='https://img.shields.io/maintenance/no/2020.svg?style=flat-square'>
  </a>
  <a href="https://www.mozilla.org/en-US/MPL/2.0/">
    <img alt='라이센스' src='https://img.shields.io/github/license/wldh-g/prontera.svg?style=flat-square'>
  </a>
</p>

<p align="center"><small>저는 이 스킨을 더이상 개발하지 않습니다. 이 스킨의 모든 디자인 및 기능은 정적 블로그 생성기 <a href="https://hexo.io">Hexo</a>의 테마, <a href="https://github.com/wldh-g/ankha">Ankha</a>에서 이어집니다.</small></p>

<br>

## 미리 보기

<p align='center'><img alt="스킨 미리보기" src="https://raw.githubusercontent.com/wldh-g/prontera/master/src/preview.png" width="100%"></p>

<hr>
<br>

## 기능 안내

|      티스토리 기능 지원      |             외형             |            개인화           |          특별한 기능         |
|:----------------------------|:----------------------------|:----------------------------|:----------------------------|
| TISTORY 신 에디터 지원       | 반응형 디자인                | 강조 색상 지정               | 밝기 모드 쿠키 도메인 공유    |
| 사이드바 2단 메뉴 지원<sup>1</sup> | 빈틈 없는 시각 효과     | 헤더 로고 지정               | 블로그 전역 공지             |
|                             | 밝기 모드 전환               | 아이콘만 있는 헤더 로고       | 사이드바 트위터 타임라인      |
|                             |                             | 페이지에서 사이드바 숨기기    | 자동 글 목차(toc) 생성       |

<sup>1</sup> 2단 = TISTORY 카테고리 최대 깊이

#### 지원하지 않는 기능

+ TISTORY 구 에디터, 트랙백, 위치 로그, 미디어 로그 `Deprecated by TISTORY`
+ TISTORY 공지 기능
+ 댓글 및 방명록에 홈페이지 주소 입력하기
+ Internet Explorer에서의 정상적 렌더링 `'제대로 표시되지 않는다'는 안내 제공`

<br>

## 스킨 빌드 방법

#### 준비물

+ [node](https://nodejs.org/ko/) `오류 발생 시 Node.js 10을 사용해보세요`
+ [yarn](https://yarnpkg.com/lang/en/) `npm install yarn -g`

#### 빌드 명령

```sh
$ git clone https://github.com/wldh-g/prontera.git --recurse-submodules; cd prontera
$ yarn; yarn build
$ cd out; ls
```

<br>

## 기타

#### 용어 설명

+ 밝기 모드: 밝음/어두움 테마 모드.
+ 전역 공지: Prontera 스킨의 기능으로, 모든 페이지에서 표시되는 글.
+ 공지글: 티스토리의 공지 기능을 통해 작성된 글.

#### 설정 가이드 라인

깔끔한 화면 표시를 위해 아래의 가이드 라인을 권장합니다.

+ 메인 메뉴의 수: 최대 4개
+ 블로그 이름: 영문 9글자 이내 혹은 한글 5글자 이내
+ 사이드바 순서: 제일 위에 '내 정보', 그 다음으로 '검색', 이후는 자유롭게 설정

<br>

## 라이센스 및 저작권

이 프로젝트는 *Mozilla Public License 2.0*을 따릅니다.

스킨 디자인에 처음 영감을 준 프로젝트는 [MIT License](https://github.com/AngryPowman/hexo-theme-prontera/blob/master/LICENSE)를 기반으로 하는 [AngryPowman](https://github.com/AngryPowman)의 [Prontera](https://github.com/AngryPowman/hexo-theme-prontera)입니다.

스피너(불러오기 애니메이션)의 디자인은 [MIT License](https://github.com/MatejKustec/SpinThatShit/blob/master/LICENSE)를 기반으로 하는 [Matej Kustec](https://github.com/MatejKustec)의 [SpinThatShit](https://github.com/MatejKustec/SpinThatShit) 프로젝트를 이용하였습니다.

코드 하이라이트 기능은 [BSD 3-Clause License](https://github.com/highlightjs/highlight.js/blob/master/LICENSE)를 기반으로 하는 [highlight.js](https://highlightjs.org/)를 이용하여 구현하였습니다.

수식 변환 기능은 [Apache 2.0 License](https://github.com/mathjax/MathJax-src/blob/master/LICENSE)를 기반으로 하는 [MathJax](https://www.mathjax.org/)를 이용하여 구현하였습니다.

개발 보조 도구와 그 라이센스는 [yarn.lock](/yarn.lock) 파일을 참조하세요.

#### 이미지 라이센스 및 저작권

+ `src/views/icons/padlock-locked.pug`: &copy; Jio.
+ `src/views/icons/padlock-unlocked.pug`: &copy; Jio.
+ `src/views/icons/menu.pug`: [Online Web Fonts](http://www.onlinewebfonts.com), licensed by CC BY 3.0.

이 밖에 Prontera 스킨이 포함하는 모든 이미지는 비상업적 이용이 허가된 `svg` 아이콘으로, 라이센스와 관련한 자세한 내용은 [SVG Repo](https://www.svgrepo.com/info/licensing)에서 설명합니다.

#### 글꼴 라이센스

Prontera는 [Google](https://fonts.google.com)에서 호스팅하는 웹 글꼴을 이용합니다.

+ Noto Sans KR (Sans-serif): [Open Font License](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL_web)
+ Roboto Mono (Monospace): [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)

#### 색상 라이센스

Prontera의 색상 일부는 아래의 디자인을 사용 또는 참고하였습니다.

+ Microsoft UI Fabric (기본 흑/백 색상): [MIT License](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/LICENSE)
+ VSC Material Theme (코드 하이라이트): [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
