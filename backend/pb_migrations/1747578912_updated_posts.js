/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1125843985")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": "",
    "updateRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1125843985")

  // update collection data
  unmarshal({
    "createRule": "user_id = @request.auth.id",
    "deleteRule": "user_id = @request.auth.id",
    "updateRule": "user_id = @request.auth.id"
  }, collection)

  return app.save(collection)
})
