# Webhooks API
This is a REST API designed to demonstrate crud operations of webhook urls using a microservice architecture

## Routes
The API serves at the following routes:

### Admin-routes
```
/api/admin/register
desc: Register a webhook
body: JSON string of the form {"url": <URL>}
response: id of the object if registered
method: POST
```


```
/api/admin/update
desc: Update a webhook
body: JSON string of the form {"id": <ID>}
response: appropriate status code with message
method: PUT
```


```
/api/admin/list
desc: List all webhooks
response: array of webhooks
method: GET
```


```
/api/admin/delete
desc: Delete a webhook
body: JSON string of the form {"id": <ID>}
response: appropriate status code with message
method: DELETE
```
### Requirements

`mongodb` for the testing platform, and the `mongod` service running on port `27017`

### Testing
1) Clone the repository
2) run `npm install`
3) start `mongod` service
4) run `npm run start`
