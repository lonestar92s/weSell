CREATE TABLE NewItems(
item_id INT primary key not null SERIAL,
item_name VARCHAR(255) not null,
item_category VARCHAR(255) not null,
item_brand VARCHAR(255) not null,
item_price INT not null
)