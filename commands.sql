CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

Insert into blogs (id, author, url, title, likes) values (1, 'Test', 'http://test1.com', 'Test1', 0);

Insert into blogs (id, author, url, title, likes) values (2, 'Test', 'http://test2.com', 'Test2', 1);