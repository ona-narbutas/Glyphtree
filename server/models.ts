/* SCHEMA:

USERS:
CREATE TABLE users (
  user_id  SERIAL PRIMARY KEY,
  username
  email  VARCHAR(320),
  password  VARCHAR(60),
  bio VARCHAR(60)
)

POSTS:
CREATE TABLE posts(
  post_id serial PRIMARY KEY,
  is_root boolean NOT NULL,
  content varchar(5000) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  root_id int,
  parent_id int,
  author_id int NOT NULL
)

TREE_TITLES:
CREATE TABLE tree_titles(
  title_id serial PRIMARY KEY,
  root_id int NOT NULL,
  title varchar(255) NOT NULL
)

USER FOLLOWS:
CREATE TABLE user_follows(
  follow_id serial PRIMARY KEY,
  subscriber_id int NOT NULL,
  subject_id int NOT NULL
)

USER LIKES:
CREATE TABLE user_likes(
  like_id serial PRIMARY KEY,
  post_id int NOT NULL,
  user_id int NOT NULL
)

USER DOGEARS:
CREATE TABLE user_dogears(
  dogear_id serial PRIMARY KEY,
  post_id int NOT NULL,
  user_id int NOT NULL
)

TAGS
CREATE TABLE tags(
  tag_id serial PRIMARY KEY,
  tag_text varchar(255) UNIQUE NOT NULL
)

CREATE TABLE post_tags(
  post_tag_id serial PRIMARY KEY,
  tag_id int NOT NULL,
  post_id int NOT NULL
) 

*/

import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const PG_URI = process.env.PG_URI;
const pool = new Pool({
  connectionString: PG_URI,
});

const db = {
  query: async (queryText: string, values: string[]) => {
    console.log('executed query', queryText);
    return await pool.query(queryText, values);
  },
};

export default db;
