// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const db = mongoose.connection

const Restaurant = require('./models/Restaurant')
const bodyParser = require('body-parser')
const urlencoded = require('body-parser/lib/types/urlencoded')

// setting template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})
// routes setting
app.get('/', (req, res) => {
  Restaurant.find({})
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .then(console.log('index rendered!'))
    .catch(error => console.log(error))
})

// add create restaurant
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  const body = req.body
  return Restaurant.create(body)
    .then(console.log('new restaurant added,req.body', body))
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 瀏覽餐廳
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .then(console.log('show restaurant detail!'))
    .catch(err => console.log(err))
})


// 編輯餐廳
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})


app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const body = req.body
  // console.log('body', body)
  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = body.name
      restaurant.name_en = body.name_en
      restaurant.category = body.category
      restaurant.image = body.image
      restaurant.location = body.location
      restaurant.phone = body.phone
      restaurant.google_map = body.google_map
      restaurant.rating = body.rating
      restaurant.description = body.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// 刪除餐廳
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 搜尋餐廳
app.get("/search", (req, res) => {
  if (!req.query.keywords) {
    res.redirect("/")
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  Restaurant.find({})
    .lean()
    .then(restaurants => {
      const filterRestaurants = restaurants.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render("index", { restaurants: filterRestaurants, keywords })
    })
    .catch(err => console.log(err))
})
// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})