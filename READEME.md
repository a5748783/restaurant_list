# 我的餐廳清單

## 介紹

紀錄屬於自己的餐廳清單，可以瀏覽餐廳、查看詳細資訊、甚至連結到地圖。
也可以新增、刪除或是編輯餐廳資訊。

### 功能

- 查看所有餐廳
- 瀏覽餐廳的詳細資訊
- 連結餐廳的地址到 Google 地圖
- 搜尋特定餐廳
- 新增餐廳
- 刪除餐廳

## 開始使用

1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 在本地開啟之後，透過終端機進入資料夾，輸入：

   ```bash
   npm install
   ```
4. MongoDB路由設定

   ```bash
   export MONGODB_URI="<根據自己的MONGODB_URI及帳號密碼做設定>"
   ```
5. 種子資料初始化
   ```bash
   npm run seed
   ```

6. 安裝完畢後，繼續輸入：

   ```bash
   npm run start
   ```

7. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址

   ```bash
   Listening on http://localhost:3000
   ```

8. 若欲暫停使用

   ```bash
   ctrl + c
   ```

## 開發工具
```bash
Node.js 14.16.0

Express 4.16.4

Express-Handlebars 3.0.0

Bootstrap 4.3.1

Font-awesome 5.8.1

MongoDB

mongoose 6.3.3

method-override@3.0.0
```