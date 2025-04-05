import UserInfo from "../../../shared/models/UserInfo";
import IRepository from "../interfaces/IRepository";
import sqlite from "sqlite3";

export default class UsersRepository implements IRepository<UserInfo> {
    constructor(
        public db: sqlite.Database,
    ) {
    }

    update(value: UserInfo): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: number | string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    get(id: number | string): Promise<UserInfo> {
        throw new Error("Method not implemented.");
    }

    getAll(): Promise<UserInfo[]> {
        return new Promise<UserInfo[]>((resolve, reject) => {
            this.db.all("SELECT * FROM users", (err: any, rows: any[]) => {
                if (err) return reject(err);
                resolve(rows.map(row => new UserInfo(
                    row.id,
                    row.name,
                    row.email,
                    row.phone,
                    row.acceptedTerms,
                    row.acceptedOffers,
                )));
            });
        });
    }

    save(userInfo: UserInfo): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const stmt = this.db.prepare(`
                INSERT INTO users (name, email, phone, acceptedTerms, acceptedOffers)
                VALUES (?, ?, ?, ?, ?)
            `);
            stmt.run(
                userInfo.name,
                userInfo.email,
                userInfo.phone,
                userInfo.acceptedTerms,
                userInfo.acceptedOffers,
                (err?: any) => { err ? reject(err) : resolve() }
            );
            stmt.finalize();
        });
    }

    ensureCreated() {
        const query = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                acceptedTerms INTEGER NOT NULL,
                acceptedOffers INTEGER NOT NULL                
            );
        `;
        this.db.run(query);
    }
}