import sqlite from "sqlite3";
import path from "path";
import fs from "fs";
import UsersRepository from "./UsersRepository";
import ResellersRepository from "./ResellersRepository";

const sqliteManager = sqlite.verbose()

class DataAccess {
    public users: UsersRepository;
    public resellers: ResellersRepository;
    private readonly database: sqlite.Database;

    constructor(databasePath: string) {
        const firstDatabaseCreation = !fs.existsSync(databasePath);

        this.database = new sqliteManager.Database(databasePath, (err) => {
            if (err) throw new Error('Database connection error: ' + err.message);
        });

        this.users = new UsersRepository(this.database);
        this.resellers = new ResellersRepository(this.database);

        if (firstDatabaseCreation) {
            this.database.serialize(() => {
                this.ensureCreated();
                this.seedDatabase();
            });
            console.log('Database created.');
        }
        console.log('Connected to the SQLite database.');
    }

    private ensureCreated() {
        this.users.ensureCreated();
        this.resellers.ensureCreated();
    }

    private seedDatabase() { }
}

const dataAccess = new DataAccess(path.join(__dirname, '../database/sqlite.db'));
export default dataAccess;