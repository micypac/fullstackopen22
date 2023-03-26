CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes INTEGER DEFAULT 0);

insert into blogs (title, url, author) values ('Learning Relational DB using Postgres', 'https://www.example.com/postgresql', 'John Smith');

insert into blogs (title, url, author) values ('Atomic Habits', 'https://www.atomic-habits.com', 'James Clear');

SELECT * from blogs;