const utils = require('./utils')

const returnTypeaheadValues = (name, search) => {
  // build up some logic to return realistic typeahead results here
  return {
    options: [
      {value: `api test - ${search}`, label: `api test - ${search}`},
      {value: 'test', label: 'Test'},
      {value: 'test2', label: 'Test2'}
    ]
  }
}

module.exports = function (app) {
  app.get(`/api/typeahead/name/:name/search/:search`, function (req, res) {
    const name = req.params.name
    const search = req.params.search
    if (!utils.ensureParameter(name, res)) return
    if (!utils.ensureParameter(search, res)) return
    return utils.sendJSON(res, returnTypeaheadValues(name, search))
  })
}
