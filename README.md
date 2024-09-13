# RECINTOS DO ZOO

## Desafio
Você foi contratado para ajudar na organização de um zoológico. Sua missão é construir a lógica para indicar os recintos onde novos animais se sintam confortáveis.

### Recintos Existentes

| Número | Bioma        | Tamanho | Animais Existentes |
|--------|--------------|---------|--------------------|
| 1      | Savana       | 10      | 3 macacos          |
| 2      | Floresta     | 5       | Vazio              |
| 3      | Savana e Rio | 7       | 1 gazela           |
| 4      | Rio          | 8       | Vazio              |
| 5      | Savana       | 9       | 1 leão             |

### Animais

| Espécie    | Tamanho | Bioma               |
|------------|---------|---------------------|
| Leão       | 3       | Savana              |
| Leopardo   | 2       | Savana              |
| Crocodilo  | 3       | Rio                 |
| Macaco     | 1       | Savana ou Floresta  |
| Gazela     | 2       | Savana              |
| Hipopótamo | 4       | Savana ou Rio       |

### Regras para Encontrar um Recinto

1. Bioma adequado e espaço suficiente.
2. Carnívoros só com a própria espécie.
3. Animais presentes devem continuar confortáveis.
4. Hipopótamos toleram outras espécies apenas em Savana e Rio.
5. Macacos precisam de companhia.
6. Mais de uma espécie no recinto ocupa 1 espaço extra.
7. Não é possível separar lotes de animais.

### Entradas e Saídas

1. Receber tipo e quantidade de animal.
2. Retornar lista de recintos viáveis ou mensagem de erro.
3. Formato da lista: "Recinto nro (espaço livre: valorlivre total: valortotal)".
4. Erros possíveis: "Animal inválido", "Quantidade inválida", "Não há recinto viável".

### Exemplos

Entrada válida:
```js
"MACACO", 2
```
Saída:
```js
{
  recintosViaveis: [
    "Recinto 1 (espaço livre: 5 total: 10)", 
    "Recinto 2 (espaço livre: 3 total: 5)", 
    "Recinto 3 (espaço livre: 2 total: 7)"
  ]
}
```

Entrada inválida:
```js
"UNICORNIO", 1
```
Saída:
```js
{
  erro: "Animal inválido"
}
```

## Classe [`RecintosZoo`]

### Construtor

Inicializa:
- **[`recintos`]**: Lista de recintos com número, bioma, tamanho e animais.
- **[`animaisPermitidos`]**: Características e regras para cada espécie.

### Métodos

- **`[validaEntrada(especie/quantidade)]`**: Valida espécie e quantidade.
- **`[filtraRecintosPorBioma/especie]`**: Filtra recintos por bioma.
- **`calculaEspacoDisponivel(recinto, especie, quantidade)`**: Calcula espaço disponível.
- **`verificaRegrasEspecificas(recinto, especie, quantidade)`**: Verifica regras de convivência.
- **`analisaRecintos(especie, quantidade)`**: Analisa recintos viáveis.

### Uso

1. **Instanciar a Classe**
   ```javascript
   import { RecintosZoo } from './RecintosZoo';
   const zoo = new RecintosZoo();
   ```

2. **Analisar Recintos**
   ```javascript
   const resultado = zoo.analisaRecintos('LEAO', 2);
   console.log(resultado);
   ```

### Melhorias Possíveis

1. **Separar Responsabilidades**: Organizar métodos por responsabilidade.
2. **Adicionar Comentários e Documentação**: Explicar lógica e objetivos.
3. **+Testes Unitários**: Para garantir mais cobertura.
4. **Refatoração e Otimização**: Melhorar clareza e eficiência.
5. **Tratamento de Erros**: Mensagens de erro mais informativas.

### CLI Adicional
Adicionado uma interface de linha de comando (CLI) para facilitar a usabilidade e os testes.

#### Como Usar

Execute o comando abaixo para iniciar a aplicação:

```bash
npm run start
```
