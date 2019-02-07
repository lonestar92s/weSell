https://documenter.getpostman.com/view/6539028/Rztpp79Z


<!-- GET all items -->
GET /items HTTP/1.1
Host: localhost:9000

curl -X GET http://localhost:9000/items

<!-- Get item by category -->

GET /items/category/:item_category HTTP/1.1
curl -X GET http://localhost:9000/items/category/:item_category

