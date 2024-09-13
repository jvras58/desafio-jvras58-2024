import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDb(inMemory = false) {
    return open({
        filename: inMemory ? ':memory:' : './zoo.db',
        driver: sqlite3.Database
    });
}

async function createTables(db = null) {
    if (!db) {
        db = await openDb(true);
    }
    await db.exec(`
        CREATE TABLE IF NOT EXISTS recintos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            numero INTEGER,
            bioma TEXT,
            tamanho INTEGER
        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS animais (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            especie TEXT,
            tamanho INTEGER,
            bioma TEXT,
            carnivoro BOOLEAN,
            recinto_id INTEGER,
            quantidade INTEGER,
            FOREIGN KEY (recinto_id) REFERENCES recintos(id)
        );
    `);

    console.log("Tabelas criadas!");
}

async function populate(db = null) {
    if (!db) {
        db = await openDb(true);
    }
    await db.run(`
        INSERT INTO recintos (numero, bioma, tamanho) VALUES 
        (1, 'savana', 10), 
        (2, 'floresta', 5), 
        (3, 'savana e rio', 7), 
        (4, 'rio', 8), 
        (5, 'savana', 9);
    `);
    
    console.log("Recintos inseridos com sucesso!");
    
    await db.run(`
        INSERT INTO animais (especie, tamanho, bioma, carnivoro) VALUES 
        ('LEAO', 3, 'savana', 1),
        ('LEOPARDO', 2, 'savana', 1),
        ('CROCODILO', 3, 'rio', 1),
        ('MACACO', 1, 'savana', 0),
        ('MACACO', 1, 'floresta', 0),
        ('GAZELA', 2, 'savana', 0),
        ('HIPOPOTAMO', 4, 'savana', 0),
        ('HIPOPOTAMO', 4, 'rio', 0);
    `);
    
    console.log("Animais inseridos com sucesso!");
    
    await db.run(`
        INSERT INTO animais (especie, tamanho, bioma, carnivoro, recinto_id, quantidade) VALUES
        ('MACACO', 1, 'savana', 0, 1, 3), -- 3 macacos no recinto 1
        ('GAZELA', 2, 'savana', 0, 3, 1), -- 1 gazela no recinto 3
        ('LEAO', 3, 'savana', 1, 5, 1);   -- 1 leão no recinto 5
    `);
    
    console.log("Animais associados aos recintos com sucesso!");
}

export { openDb, createTables, populate };