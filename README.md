# rpgmakermv_typescript_dts

RPGツクールMVに標準搭載されているJavaScriptを、TypeScriptで扱うための型定義ファイルです。

## 対象バージョン
1.5.2

## 利用方法

```
npm install rpgmakermv_typescript_dts
```

tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5"
  }
}
```

or ...
```json
{
  "compilerOptions": {
    "target": "es5",
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    "noImplicitUseStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "removeComments": false,
    "preserveConstEnums": true,
    "sourceMap": false,
    "strictNullChecks": true
  },
  "exclude": [
    "node_modules"
  ]
}
```

then foo.ts
```typescript
/// <reference types="rpgmakermv_typescript_dts" />

const params = PluginManager.parameters("fooplugin");

...
```

## License
[MIT License](LICENSE)
