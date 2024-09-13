import { openDb, createTables, populate } from './db.js';



async function init() {
    try {
        const db = await openDb();
        await createTables(db);
        await populate(db);
        console.log("Banco de dados inicializado com sucesso!");
    } catch (error) {
        console.error("Erro ao inicializar o banco de dados:", error);
    }
}

init();