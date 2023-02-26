require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./DB')
const userRouter = require('./routes/user')
const exerciseRouter = require('./routes/exercise')
connectDB();
app.use(cors());
app.use(express.json());


// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use('/api', urlencodedParser, userRouter)
app.use('/api/users', urlencodedParser, exerciseRouter)




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
