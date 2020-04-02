# npmでFontAwesome5を読み込んで使う

## 必要なiconだけを読み込む方法

すべてのiconを読み込むこともできるがファイルサイズが大きくなるので
必要な分だけを取り込む。

## インストール

```shell
\$ sudo npm i -S @fortawesome/fontawesome-svg-core @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons
```

## 読み込みたいjsファイルで

```js
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
<link src="">
```

は必要ない。
jsのみでFontAwesome5が使える。
