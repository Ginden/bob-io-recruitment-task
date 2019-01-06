## Bob.io recruitment task

### Running project

`docker-compose up` will work (or `npm run build`).

If you can't use Docker, you will need to:
* Use Node 10
* Install MongoDB database and make it use default port
* Change connection string in `lib/config.js`
* Run `npm start`

### Connecting with truck-emulator

This app exposes port `40718`, default for `truck-emulator`. 

So running fresh `truck-emulator` on localhost will make it connect automatically.

### Endpoints:

* http://localhost:40718/all Lists all trucks in database
* http://localhost:40718/update Sends `DRIVER_STATUS_REQUEST` to all connected trucks
* http://localhost:40718/closest When POSTed returns closest truck

Example request made with curl:

```
curl -X POST http://localhost:40718/closest -d '{"lat": 50, "lng": 20}' -H "Content-Type: application/json"
```

