Skybonds Phoenix Project
=======================

### Использование

#### Для разработки

1. Получить доступ к приватным npm-пакетам домена @skybonds в npmjs (https://www.npmjs.com/org/skybonds) у администратора.
2. Локально авторизоваться в npm (https://docs.npmjs.com/cli/adduser):
```
npm adduser
```
3. Клонировать репозиторий:
```
git@github.com:Sovcombank/skybonds-phoenix.git
```
4. В директории с проектом запустить:
```
npm run start
```
5. Открыть в браузере http://localhost:3000

#### Для билда
```
npm run build
```
### Linting

В этой сборке есть React-friendly ESLint.

```
npm run lint
```


### Зависимости

* React
* Webpack
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [babel-loader](https://github.com/babel/babel-loader)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)
