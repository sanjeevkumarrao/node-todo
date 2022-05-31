DROP TABLE IF EXISTS lists;
DROP TABLE IF EXISTS list_items;

CREATE TABLE lists (
    list_id INT GENERATED ALWAYS AS IDENTITY,
    title TEXT,
    created_by TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (list_id)
);

CREATE TABLE list_items (
    item_id INT GENERATED ALWAYS AS IDENTITY,
    item_created_on TIMESTAMP DEFAULT NOW(),
    item_completed_on TIMESTAMP,
    item_name TEXT,
    list_id INT,
    PRIMARY KEY (item_id),
    CONSTRAINT fk_list
      FOREIGN KEY (list_id) 
        REFERENCES lists (list_id)
        ON DELETE CASCADE   
);

INSERT INTO lists(title, created_by)
VALUES('Groceries', 'user123'),
      ('Pending Work', 'user123') 
      ('Planning', 'user123');	   
	   
INSERT INTO list_items(list_id, item_name)
VALUES(1,'Buy Tomatoes'),
      (1,'Get Lentils'),
      (2,'speak to David Wright');