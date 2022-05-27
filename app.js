// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })


// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
// 瀏覽餐廳
app.get('/', (req, res) => {
  Restaurant.find() // 取出 Restaurant model 裡的所有資料
  .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
  .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
  .catch(error => console.error(error))// 錯誤處理
})

// 新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// 新增餐廳
app.post("/restaurants", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', {
    restaurant: restaurant
  })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  })
  res.render('index', {
    restaurants: restaurants,
    keyword: keyword
  })
})
// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})