import { RecintosZoo } from "./recintos-zoo.js";
import { openDb, createTables } from "./config/db.js"; 

let db;


beforeAll(async () => {
    db = await openDb(true);
    await createTables(db);
});

afterAll(async () => {
    await db.close();
});

beforeEach(async () => {
    await db.run("DELETE FROM recintos");
    await db.run("DELETE FROM animais");

    await db.run(`INSERT INTO recintos (numero, bioma, tamanho) VALUES (1, 'savana', 10)`);
    await db.run(`INSERT INTO recintos (numero, bioma, tamanho) VALUES (2, 'floresta', 5)`);
    await db.run(`INSERT INTO recintos (numero, bioma, tamanho) VALUES (3, 'savana e rio', 7)`);
    await db.run(`INSERT INTO recintos (numero, bioma, tamanho) VALUES (4, 'rio', 8)`);
    await db.run(`INSERT INTO recintos (numero, bioma, tamanho) VALUES (5, 'savana', 9)`);

    await db.run(`INSERT INTO animais (especie, tamanho, bioma, carnivoro, quantidade) VALUES ('LEAO', 3, 'savana', 1, 1)`);
    await db.run(`INSERT INTO animais (especie, tamanho, bioma, carnivoro, quantidade) VALUES ('GAZELA', 2, 'savana', 0, 1)`);
    await db.run(`INSERT INTO animais (especie, tamanho, bioma, carnivoro, quantidade) VALUES ('MACACO', 1, 'savana', 0, 3)`);
});

afterEach(async () => {
    await db.run("DELETE FROM recintos");
    await db.run("DELETE FROM animais");
});

describe('Testes utilizando o banco de dados', () => {

    test('Deve rejeitar animal inválido usando dados do banco', async () => {
        const recintosZoo = new RecintosZoo(db); 
        const resultado = recintosZoo.analisaRecintos('UNICORNIO', 1);
        expect(resultado.erro).toBe("Animal inválido");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve rejeitar quantidade inválida usando dados do banco', async () => {
        const recintosZoo = new RecintosZoo(db);
        const resultado = recintosZoo.analisaRecintos('MACACO', 0);
        expect(resultado.erro).toBe("Quantidade inválida");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve encontrar recinto para 1 crocodilo usando dados do banco', async () => {
        const recintosZoo = new RecintosZoo(db);
        const resultado = recintosZoo.analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
    });

    test('Deve permitir adicionar mais 2 leões ao recinto com leão usando dados do banco', async () => {
        const recintosZoo = new RecintosZoo(db);
        const resultado = recintosZoo.analisaRecintos('LEAO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 5 (espaço livre: 0 total: 9)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    // add outros testes seguindo os testes originais fornecidos

});