import { DatabaseSync } from "node:sqlite"
const db = new DatabaseSync(":memory:")

//Excute sql statements from strings
db.exec(`
    create table users(
        id integer primary key autoincrement,
        username varchar(255) unique,
        password varchar(255) 
    )
`)

db.exec(`
    create table todos(
        id integer primary key autoincrement,
        user_id integer, 
        task varchar(255),
        completed boolean default 0,
        foreign key(user_id) references users(id)
    )
`)

export default db
