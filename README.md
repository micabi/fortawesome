# npmでFontAwesome5を読み込んで使う

## 必要なiconだけを読み込む

すべてのiconを読み込むこともできるがファイルサイズが大きくなるので
必要な分だけを取り込む。

## インストール

- core
- レギュラ−のiconセット
- ソリッドのiconセット

をインストールする

`$ sudo npm i -S @fortawesome/fontawesome-svg-core @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons`

## 読み込みたいjsファイルで

coreからはconfig（挙動調整モジュール）、
dom（domレンダリングモジュール）、
library（使いたいiconをセットするモジュール）を取り込む。

あとは[FontAwesomeのサイト][1]で調べて欲しいiconを取り込む。

[1]:https://fontawesome.com/icons?d=gallery&s=regular,solid&m=free

※取り込むときはfa-catなら**faCat**、fa-dogなら**faDog**とキャメルケ−スで書くことに注意。
多分javascriptでハイフンが非推奨だから？

```javascript
import {config, dom, library} from '@fortawesome/fontawesome-svg-core';
import {faAngry} from '@fortawesome/free-regular-svg-icons';
import {faDog, faCat} from '@fortawesome/free-solid-svg-icons';

config.showMissingIcons = true; // iconをimportし忘れたときに？マークが出ないようにするならfalse
library.add(faAngry, faCat, faDog);
dom.watch();
// dom.i2svg(); こっちを使うなら、jsファイルは</body>の直前で読み込むこと！
```

## CSSの読み込みはどうする

htmlファイルで

```html
<link rel="stylesheet" src="">
```

は必要ない。javascriptのみでFontAwesome5が使える。

## 擬似要素で使う場合の注意点

```html
<p class="angry">angryのアイコン</p>
```

- displayをnoneにしないとトーフが表示されてしまう。
- font-familyとfont-weightも必須。

```css
.angry::before{
  content: "\f556";
  display: none; // noneにしておく
  font-family: "Font Awesome 5 Free";
  font-weight: 400;
}

```
