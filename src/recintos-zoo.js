class RecintosZoo {

    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animaisPermitidos = {
            'LEAO': { tamanho: 3, bioma: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, bioma: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, bioma: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, bioma: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
        };
    }

    validaEntrada(especie, quantidade) {
        if (!this.animaisPermitidos[especie]) {
            return { erro: "Animal inválido" };
        }
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }
        return null;
    }

    filtraRecintosPorBioma(especie) {
        const biomasPermitidos = this.animaisPermitidos[especie].bioma;
        return this.recintos.filter(recinto => {
            return biomasPermitidos.some(bioma => recinto.bioma.includes(bioma));
        });
    }

    calculaEspacoDisponivel(recinto, especie, quantidade) {
        let espacoOcupado = recinto.animais.reduce((total, animal) => {
            return total + (this.animaisPermitidos[animal.especie].tamanho * animal.quantidade);
        }, 0);

        if (recinto.animais.length > 0 && recinto.animais[0].especie !== especie) {
            espacoOcupado += 1;
        }
        const espacoNecessario = this.animaisPermitidos[especie].tamanho * quantidade;
        const espacoDisponivel = recinto.tamanho - espacoOcupado;

        return espacoDisponivel >= espacoNecessario ? espacoDisponivel - espacoNecessario : null;
    }

    verificaRegrasEspecificas(recinto, especie, quantidade) {
        const ehCarnivoro = this.animaisPermitidos[especie].carnivoro;
        const existeCarnivoroNoRecinto = recinto.animais.some(animal => this.animaisPermitidos[animal.especie].carnivoro);

        if ((existeCarnivoroNoRecinto && !ehCarnivoro) || (!existeCarnivoroNoRecinto && ehCarnivoro && recinto.animais.length > 0)) {
            return false;
        }

        if (especie === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio' && recinto.animais.length > 0) {
            return false;
        }

        if (especie === 'MACACO') {
            const totalMacacos = recinto.animais.reduce((total, animal) => {
                return animal.especie === 'MACACO' ? total + animal.quantidade : total;
            }, 0);
            if (totalMacacos + quantidade < 2) {
                return false;
            }
        }

        return true;
    }

    analisaRecintos(especie, quantidade) {
        const erroEntrada = this.validaEntrada(especie, quantidade);
        if (erroEntrada) return erroEntrada;

        const recintosFiltrados = this.filtraRecintosPorBioma(especie);
        const recintosViaveis = recintosFiltrados
            .map(recinto => {
                const espacoDisponivel = this.calculaEspacoDisponivel(recinto, especie, quantidade);
                const regrasEspecificas = this.verificaRegrasEspecificas(recinto, especie, quantidade);
                if (espacoDisponivel !== null && regrasEspecificas) {
                    return `Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel} total: ${recinto.tamanho})`;
                }
                return null;
            })
            .filter(recinto => recinto !== null);

        if (recintosViaveis.length > 0) {
            return { recintosViaveis };
        } else {
            return { erro: "Não há recinto viável" };
        }
    }
}

export { RecintosZoo as RecintosZoo };
