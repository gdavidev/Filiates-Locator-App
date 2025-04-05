const sqlite3 = require('sqlite3').verbose();
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

async function importToSqlite(excelFile, dbFile, tableName, sheetName = 'Planilha1') {
    try {
        // Read Excel file
        const workbook = xlsx.readFile(path.join(__dirname, excelFile));
        const worksheet = workbook.Sheets[sheetName];
        let data = xlsx.utils.sheet_to_json(worksheet, { raw: true });

        // Rename columns and add ID
        data = data.map((row, index) => ({
            id: index + 1,
            group: row['GRUPO CLIENTE'],
            channel: row['CANAL'],
            document: row['CNPJ'],
            region: row['REGIÃO DO BRASIL'],
            state: row['ESTADO'],
            city: row['CIDADE'],
            neighborhood: row['BAIRRO'],
            address: row['ENDEREÇO'],
            zip: row['CEP'],
            email: row['EMAIL'],
            phone: row['TELEFONE']
        }));

        // Connect to SQLite database
        fs.mkdir(path.join(__dirname, dbFile), () => {
            console.log('Creating database...');
        });
        const db = new sqlite3.Database(path.join(__dirname, dbFile));

        // Promisify db methods for async/await
        const dbRun = promisify(db.run.bind(db));
        const dbExec = promisify(db.exec.bind(db));

        // Create table
        await dbExec(`
            CREATE TABLE IF NOT EXISTS ${tableName} (
                id INTEGER PRIMARY KEY,
                group TEXT,
                channel TEXT,
                document TEXT,
                region TEXT,
                state TEXT,
                city TEXT,
                neighborhood TEXT,
                address TEXT,
                zip TEXT,
                email TEXT,
                phone TEXT
            )
        `);

        // Insert data
        const insertStmt = await db.prepare(`
            INSERT INTO ${tableName} (
                id, group, channel, document, region, state, city, 
                neighborhood, address, zip, email, phone
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        for (const row of data) {
            await promisify(insertStmt.run.bind(insertStmt))([
                row.id,
                row.group,
                row.channel,
                row.document,
                row.region,
                row.state,
                row.city,
                row.neighborhood,
                row.address,
                row.zip,
                row.email,
                row.phone
            ]);
        }

        await promisify(insertStmt.finalize.bind(insertStmt))();
        db.close();

        console.log(`Successfully converted ${excelFile} to ${dbFile} (table: ${tableName})`);
        console.log(`Processed ${data.length} records`);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Usage example
importToSqlite(
    '../base-clientes-feicon.xlsx',
    '../server/database/sqlite.db',
    'resellers',
    'Planilha1')
    .then(() => console.log("Excel exported to sqlite at /server/database/sqlite.db"));