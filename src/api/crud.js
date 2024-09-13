import { openDb } from '../config/db.js';

// Funções CRUD para Recintos

// Criar recinto
async function createRecinto(numero, bioma, tamanho) {
    const db = await openDb();
    await db.run(`INSERT INTO recintos (numero, bioma, tamanho) VALUES (?, ?, ?)`, [numero, bioma, tamanho]);
    console.log("Recinto criado com sucesso!");
}

// Ler todos os recintos
async function getRecintos() {
    const db = await openDb();
    const recintos = await db.all(`SELECT * FROM recintos`);
    return recintos;
}

// Atualizar recinto
async function updateRecinto(id, numero, bioma, tamanho) {
    const db = await openDb();
    await db.run(`UPDATE recintos SET numero = ?, bioma = ?, tamanho = ? WHERE id = ?`, [numero, bioma, tamanho, id]);
    console.log("Recinto atualizado com sucesso!");
}

// Deletar recinto
async function deleteRecinto(id) {
    const db = await openDb();
    await db.run(`DELETE FROM recintos WHERE id = ?`, [id]);
    console.log("Recinto deletado com sucesso!");
}

// Funções CRUD para Animais

// Criar animal
async function createAnimal(especie, tamanho, bioma, carnivoro) {
    const db = await openDb();
    await db.run(`INSERT INTO animais (especie, tamanho, bioma, carnivoro) VALUES (?, ?, ?, ?)`, [especie, tamanho, bioma, carnivoro]);
    console.log("Animal criado com sucesso!");
}

// Ler todos os animais
async function getAnimais() {
    const db = await openDb();
    const animais = await db.all(`SELECT * FROM animais`);
    return animais;
}

// Atualizar animal
async function updateAnimal(id, especie, tamanho, bioma, carnivoro) {
    const db = await openDb();
    await db.run(`UPDATE animais SET especie = ?, tamanho = ?, bioma = ?, carnivoro = ? WHERE id = ?`, [especie, tamanho, bioma, carnivoro, id]);
    console.log("Animal atualizado com sucesso!");
}

// Deletar animal
async function deleteAnimal(id) {
    const db = await openDb();
    await db.run(`DELETE FROM animais WHERE id = ?`, [id]);
    console.log("Animal deletado com sucesso!");
}

export {
    createRecinto, getRecintos, updateRecinto, deleteRecinto,
    createAnimal, getAnimais, updateAnimal, deleteAnimal
};
