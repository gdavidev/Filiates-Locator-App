import IRepository from "../interfaces/IRepository";
import Reseller from "../../../shared/models/Reseller";
import Address from "../../../shared/structures/Address";
import sqlite from "sqlite3"

export default class ResellersRepository implements IRepository<Reseller> {
    constructor(
        public db: sqlite.Database,
    ) {
    }

    getAll(): Promise<Reseller[]> {
        throw new Error("Method not implemented.");
    }
    get(id: number | string): Promise<Reseller> {
        throw new Error("Method not implemented.");
    }
    update(value: Reseller): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: number | string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    save(reseller: Reseller): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getCitiesByState(state: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare(`
                SELECT DISTINCT city FROM resellers
                WHERE state COLLATE NOCASE = ?
            `);
            stmt.all(
                state,
                (err: any, rows: string[]) => {
                    if (err) return reject(err);
                    resolve(rows);
                });
            stmt.finalize();
        });
    }

    search(state: string, city: string): Promise<Reseller[]> {
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare(`
                SELECT * FROM resellers
                WHERE city = ? AND state = ?
            `);
            stmt.all(
                city,
                state,
                (err: any, rows: any[]) => {
                    if (err) return reject(err);
                    resolve(rows.map(row => new Reseller(
                        row.id,
                        row.groupName,
                        row.channel,
                        row.document,
                        row.email,
                        row.phone,
                        new Address(
                            row.state,
                            row.address,
                            row.city,
                            row.neighborhood,
                            row.zip,
                            row.region,
                    ))));
                });
            stmt.finalize();
        });
    }

    ensureCreated() {
        const query = `
            CREATE TABLE IF NOT EXISTS resellers (
                id INTEGER PRIMARY KEY,
                groupName TEXT,
                channel TEXT,
                document TEXT,
                email TEXT,
                phone TEXT,
                address: Address,
                state TEXT,
                address TEXT,
                city TEXT,
                neighborhood TEXT,
                zip TEXT,
                region TEXT
            );
        `;
        this.db.run(query);
    }
}