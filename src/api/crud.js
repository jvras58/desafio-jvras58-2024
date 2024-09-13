import { openDb } from '../config/db.js';
import { RecintosZoo } from "../recintos-zoo.js";

const recintosZoo = new RecintosZoo();


async function executeQuery(query, params = []) {
    try {
        const db = await openDb();
        await db.run(query, params);
    } catch (error) {
        console.error("Erro ao executar query:", error);
        throw error;
    }
}

// Funções CRUD para Recintos

// Criar recinto
async function createRecinto(numero, bioma, tamanho) {
    if (!numero || !bioma || !tamanho) {
        return { success: false, message: "Todos os campos são obrigatórios!" };
    }
    try {
        await executeQuery(
            `INSERT INTO recintos (numero, bioma, tamanho) VALUES (?, ?, ?)`,
            [numero, bioma, tamanho]
        );
        return { success: true, message: "Recinto criado com sucesso!" };
    } catch (error) {
        return { success: false, message: "Erro ao criar recinto: " + error.message };
    }
}

// Ler todos os recintos
async function getRecintos() {
    try {
        const db = await openDb();
        const recintos = await db.all(`SELECT * FROM recintos`);
        return { success: true, data: recintos };
    } catch (error) {
        console.error("Erro ao obter recintos:", error);
        return { success: false, message: "Erro ao obter recintos: " + error.message };
    }
}

// TODO:Corrigir para não ser obrigatorio passar todos os parametros
// Atualizar recinto
async function updateRecinto(id, numero, bioma, tamanho) {
    if (!id || !numero || !bioma || !tamanho) {
        return { success: false, message: "Todos os campos são obrigatórios!" };
    }
    try {
        await executeQuery(
            `UPDATE recintos SET numero = ?, bioma = ?, tamanho = ? WHERE id = ?`,
            [numero, bioma, tamanho, id]
        );
        return { success: true, message: "Recinto atualizado com sucesso!" };
    } catch (error) {
        return { success: false, message: "Erro ao atualizar recinto: " + error.message };
    }
}

// Deletar recinto
async function deleteRecinto(id) {
    if (!id) {
        return { success: false, message: "ID do recinto é obrigatório!" };
    }
    try {
        await executeQuery(`DELETE FROM recintos WHERE id = ?`, [id]);
        return { success: true, message: "Recinto deletado com sucesso!" };
    } catch (error) {
        return { success: false, message: "Erro ao deletar recinto: " + error.message };
    }
}

// Funções CRUD para Animais

// Criar animal
async function createAnimal(especie, tamanho, bioma, carnivoro, quantidade) {
    if (!especie || !tamanho || !bioma || carnivoro === undefined || !quantidade) {
        return { success: false, message: "Todos os campos são obrigatórios!" };
    }

    // Validação de regras de entrada de animais
    const analiseRecintos = recintosZoo.analisaRecintos(especie, quantidade);
    if (analiseRecintos.erro) {
        return { success: false, message: analiseRecintos.erro };
    }

    try {
        await executeQuery(
            `INSERT INTO animais (especie, tamanho, bioma, carnivoro, quantidade) VALUES (?, ?, ?, ?, ?)`,
            [especie, tamanho, bioma, carnivoro, quantidade]
        );
        return { success: true, message: "Animal criado com sucesso!", recintosViaveis: analiseRecintos.recintosViaveis };
    } catch (error) {
        return { success: false, message: "Erro ao criar animal: " + error.message };
    }
}


// Ler todos os animais
async function getAnimais() {
    try {
        const db = await openDb();
        const animais = await db.all(`SELECT * FROM animais`);
        return { success: true, data: animais };
    } catch (error) {
        console.error("Erro ao obter animais:", error);
        return { success: false, message: "Erro ao obter animais: " + error.message };
    }
}

// TODO:Corrigir para não ser obrigatorio passar todos os parametros
// Atualizar animal
async function updateAnimal(id, especie, tamanho, bioma, carnivoro, quantidade) {
    if (!id || !especie || !tamanho || !bioma || carnivoro === undefined || !quantidade) {
        return { success: false, message: "Todos os campos são obrigatórios!" };
    }

    // Validação de regras de entrada de animais
    const analiseRecintos = recintosZoo.analisaRecintos(especie, quantidade);
    if (analiseRecintos.erro) {
        return { success: false, message: analiseRecintos.erro };
    }

    try {
        await executeQuery(
            `UPDATE animais SET especie = ?, tamanho = ?, bioma = ?, carnivoro = ?, quantidade = ? WHERE id = ?`,
            [especie, tamanho, bioma, carnivoro, quantidade, id]
        );
        return { success: true, message: "Animal atualizado com sucesso!", recintosViaveis: analiseRecintos.recintosViaveis };
    } catch (error) {
        return { success: false, message: "Erro ao atualizar animal: " + error.message };
    }
}


// Deletar animal
async function deleteAnimal(id) {
    if (!id) {
        return { success: false, message: "ID do animal é obrigatório!" };
    }
    try {
        await executeQuery(`DELETE FROM animais WHERE id = ?`, [id]);
        return { success: true, message: "Animal deletado com sucesso!" };
    } catch (error) {
        return { success: false, message: "Erro ao deletar animal: " + error.message };
    }
}

export {
    createRecinto, getRecintos, updateRecinto, deleteRecinto,
    createAnimal, getAnimais, updateAnimal, deleteAnimal
};
