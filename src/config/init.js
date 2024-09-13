import { createTables, populate } from './db.js';


const dbPath = './zoo.db';

async function init() {
    try {
        await createTables(dbPath);
        await populate(dbPath);
        console.log("Banco de dados inicializado com sucesso!");
    } catch (error) {
        console.error("Erro ao inicializar o banco de dados:", error);
    }
}

init();