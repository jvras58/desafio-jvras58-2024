import { openDb } from './db.js';

const db = await openDb();

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


export { db };