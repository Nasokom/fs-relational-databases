CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0

);

insert into blogs (author,url,title) values('Mike','http://kymou.lu','first blog post');
insert into blogs (author,url,title) values('Mike','http://kymou.lu','2nd blog post')