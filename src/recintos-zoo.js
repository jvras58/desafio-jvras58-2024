import { openDb } from './config/db.js';

class RecintosZoo {

    constructor() {
        // Carrega a configuração de animais permitidos
        this.animaisPermitidos = {
            'LEAO': { tamanho: 3, bioma: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, bioma: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, bioma: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, bioma: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
        };
    }

    async getRecintos() {
        const db = await openDb();
        // Recupera todos os recintos do banco de dados
        return await db.all(`SELECT * FROM recintos`);
    }

    async getAnimaisPorRecinto(recintoId) {
        const db = await openDb();
        // Busca os animais associados a um recinto específico
        return await db.all(`SELECT * FROM animais WHERE recinto_id = ?`, [recintoId]);
    }

    async validaEntrada(especie, quantidade) {
        if (!this.animaisPermitidos[especie]) {
            return { erro: "Animal inválido" };
        }
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }
        return null;
    }

    async filtraRecintosPorBioma(especie) {
        const db = await openDb();
        const biomasPermitidos = this.animaisPermitidos[especie].bioma;

        // Filtra os recintos pelo bioma permitido
        return await db.all(`SELECT * FROM recintos WHERE bioma IN (${biomasPermitidos.map(() => '?').join(',')})`, biomasPermitidos);
    }

    async calculaEspacoDisponivel(recinto, especie, quantidade) {
        const animaisNoRecinto = await this.getAnimaisPorRecinto(recinto.id);
        let espacoOcupado = animaisNoRecinto.reduce((total, animal) => {
            return total + (this.animaisPermitidos[animal.especie].tamanho * animal.quantidade);
        }, 0);

        if (animaisNoRecinto.length > 0 && animaisNoRecinto[0].especie !== especie) {
            espacoOcupado += 1; // Espaço extra para diferentes espécies
        }

        const espacoNecessario = this.animaisPermitidos[especie].tamanho * quantidade;
        const espacoDisponivel = recinto.tamanho - espacoOcupado;

        return espacoDisponivel >= espacoNecessario ? espacoDisponivel - espacoNecessario : null;
    }

    async verificaRegrasEspecificas(recinto, especie, quantidade) {
        const animaisNoRecinto = await this.getAnimaisPorRecinto(recinto.id);
        const ehCarnivoro = this.animaisPermitidos[especie].carnivoro;
        const existeCarnivoroNoRecinto = animaisNoRecinto.some(animal => this.animaisPermitidos[animal.especie].carnivoro);

        if ((existeCarnivoroNoRecinto && !ehCarnivoro) || (!existeCarnivoroNoRecinto && ehCarnivoro && animaisNoRecinto.length > 0)) {
            return false;
        }

        if (especie === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio' && animaisNoRecinto.length > 0) {
            return false;
        }

        if (especie === 'MACACO') {
            const totalMacacos = animaisNoRecinto.reduce((total, animal) => {
                return animal.especie === 'MACACO' ? total + animal.quantidade : total;
            }, 0);
            if (totalMacacos + quantidade < 2) {
                return false;
            }
        }

        return true;
    }

    async analisaRecintos(especie, quantidade) {
        const erroEntrada = await this.validaEntrada(especie, quantidade);
        if (erroEntrada) return erroEntrada;

        const recintosFiltrados = await this.filtraRecintosPorBioma(especie);
        const recintosViaveis = await Promise.all(recintosFiltrados.map(async recinto => {
            const espacoDisponivel = await this.calculaEspacoDisponivel(recinto, especie, quantidade);
            const regrasEspecificas = await this.verificaRegrasEspecificas(recinto, especie, quantidade);
            if (espacoDisponivel !== null && regrasEspecificas) {
                return `Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel} total: ${recinto.tamanho})`;
            }
            return null;
        }));

        const recintosValidos = recintosViaveis.filter(recinto => recinto !== null);

        if (recintosValidos.length > 0) {
            return { recintosViaveis: recintosValidos };
        } else {
            return { erro: "Não há recinto viável" };
        }
    }
}

export { RecintosZoo as RecintosZoo };
