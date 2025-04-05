const sqlite3 = require('sqlite3').verbose();
const xlsx = require('xlsx');
const path = require('path');
const os = require('os');

async function exportSqliteToExcel(dbFile, tableName, fileName = 'userinfo_export.xlsx') {
    try {
        const outputPath = path.join(__dirname, "../../", fileName);

        // Connect to SQLite database
        const db = new sqlite3.Database(dbFile);

        // Get all data from the table
        const rows = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        // Close the database connection
        db.close();

        // Prepare worksheet data
        const worksheetData = rows.map(row => ({
            'ID': row.id,
            'Nome': row.name,
            'Email': row.email,
            'Telefone': row.phone,
            'Aceitou Termos': row.acceptedTerms ? 'Sim' : 'Não',
            'Aceitou Ofertas': row.acceptedOffers ? 'Sim' : 'Não'
        }));

        // Create a new workbook
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(worksheetData);

        // Add worksheet to workbook
        xlsx.utils.book_append_sheet(workbook, worksheet, tableName);

        // Write file to disk
        xlsx.writeFile(workbook, outputPath);

        console.log(`Successfully exported ${rows.length} records from ${tableName} to ${outputPath}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Usage example
exportSqliteToExcel(
    path.join(__dirname, '../../server/database/sqlite.db'),
    'users')
    .then();