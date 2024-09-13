import readline from 'readline';
import chalk from 'chalk';
import Table from 'cli-table';
import { RecintosZoo } from './recintos-zoo.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const zoo = new RecintosZoo();

function exibirMenu() {
    console.log(chalk.green.bold("\n🐾 Bem-vindo ao sistema de gerenciamento de recintos do zoológico! 🐾"));
    console.log(chalk.cyan("1. Adicionar animais a um recinto"));
    console.log(chalk.cyan("2. Exibir lista de animais disponíveis"));
    console.log(chalk.red("3. Sair"));
    rl.question(chalk.yellow("Escolha uma opção: "), (opcao) => {
        switch (opcao) {
            case '1':
                adicionarAnimais();
                break;
            case '2':
                exibirAnimaisDisponiveis();
                break;
            case '3':
                rl.close();
                break;
            default:
                console.log(chalk.red("Opção inválida. Tente novamente."));
                pausar(() => exibirMenu());
                break;
        }
    });
}

function exibirAnimaisDisponiveis() {
    console.log(chalk.green("\nLista de animais disponíveis:"));
    
    const tabela = new Table({
        head: [chalk.blue('Animal'), chalk.blue('Tamanho'), chalk.blue('Bioma Permitido'), chalk.blue('Carnívoro')],
        colWidths: [15, 10, 30, 15]
    });

    Object.entries(zoo.animaisPermitidos).forEach(([animal, detalhes]) => {
        const tamanho = detalhes.tamanho; 
        const bioma = detalhes.bioma.join(', '); 
        const carnivoro = detalhes.carnivoro ? 'Sim' : 'Não';
        
        tabela.push([animal, tamanho, bioma, carnivoro]);
    });

    console.log(tabela.toString());
    pausar(() => exibirMenu());
}

function adicionarAnimais() {
    rl.question(chalk.yellow("Digite a espécie do animal: "), (especie) => {
        rl.question(chalk.yellow("Digite a quantidade de animais: "), (quantidade) => {
            quantidade = parseInt(quantidade);
            const resultado = zoo.analisaRecintos(especie.toUpperCase(), quantidade);
            if (resultado.erro) {
                console.log(chalk.red(`Erro: ${resultado.erro}`));
            } else {
                console.log(chalk.green("\nRecintos viáveis:"));
                
                const tabela = new Table({
                    head: [chalk.blue('Recinto')],
                    colWidths: [50]
                });

                resultado.recintosViaveis.forEach(recinto => tabela.push([recinto]));
                console.log(tabela.toString());
            }
            pausar(() => exibirMenu());
        });
    });
}

function pausar(callback) {
    rl.question(chalk.grey("\nPressione Enter para continuar..."), () => callback());
}

// Inicia o CLI exibindo o menu
exibirMenu();
