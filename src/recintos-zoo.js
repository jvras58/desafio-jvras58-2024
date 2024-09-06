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
            // Verifica se o bioma do recinto é exatamente igual ou inclui o bioma permitido (como "savana e rio")
            return biomasPermitidos.some(bioma => recinto.bioma.includes(bioma));
        });
    }
    

    calculaEspacoDisponivel(recinto, especie, quantidade) {
        let espacoOcupado = recinto.animais.reduce((total, animal) => {
            return total + (this.animaisPermitidos[animal.especie].tamanho * animal.quantidade);
        }, 0);
    
        // Se há mais de uma espécie no recinto, precisa de 1 unidade de espaço extra
        if (recinto.animais.length > 0 && recinto.animais[0].especie !== especie) {
            espacoOcupado += 1;  // Espaço extra por ter mais de uma espécie.
        }
        const espacoNecessario = this.animaisPermitidos[especie].tamanho * quantidade;
        const espacoDisponivel = recinto.tamanho - espacoOcupado;
    
        // Verifica se há espaço suficiente para os novos animais
        return espacoDisponivel >= espacoNecessario ? espacoDisponivel - espacoNecessario : null;
    }
    
    
    

    verificaRegrasEspecificas(recinto, especie, quantidade) {
        const animalExistente = recinto.animais[0]?.especie;
    
        // Impedir que herbívoros sejam adicionados a recintos com carnívoros
        if (recinto.animais.some(animal => this.animaisPermitidos[animal.especie].carnivoro) 
            && !this.animaisPermitidos[especie].carnivoro) {
            return false;  // Herbívoros não podem ser colocados com carnívoros
        }
    
        // Verificar se carnívoros podem ser adicionados apenas com a própria espécie
        if (this.animaisPermitidos[especie].carnivoro && recinto.animais.length > 0 && animalExistente !== especie) {
            return false; // Carnívoros só podem estar com a mesma espécie
        }
    
        // Hipopótamos só podem habitar recintos com savana e rio
        if (especie === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
            return false;  // Hipopótamos só se adaptam a "savana e rio"
        }
    
        // Macacos precisam de companhia (mesma ou outra espécie)
        if (especie === 'MACACO' && quantidade === 1 && recinto.animais.length === 0) {
            return false;  // Macacos precisam de outros animais
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
                if (espacoDisponivel !== null && this.verificaRegrasEspecificas(recinto, especie, quantidade)) {
                    return `Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel} total: ${recinto.tamanho})`;
                }
                return null;
            })
            .filter(recinto => recinto !== null);
        
        // Ordenar os recintos pelo número antes de retornar
        recintosViaveis.sort((a, b) => {
            const numeroA = parseInt(a.match(/Recinto (\d+)/)[1]);
            const numeroB = parseInt(b.match(/Recinto (\d+)/)[1]);
            return numeroA - numeroB;
        });
    
        if (recintosViaveis.length > 0) {
            return { recintosViaveis };
        } else {
            return { erro: "Não há recinto viável" };
        }
    }
    
    

}

export { RecintosZoo as RecintosZoo };
