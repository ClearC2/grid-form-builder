let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')

let app = express()
app.use(cors())
app.use(bodyParser.json())

require('./typeahead')(app)

let PORT = 8778
app.listen(PORT, function () {
  console.log('Dev Express server running at localhost:' + PORT)
})
