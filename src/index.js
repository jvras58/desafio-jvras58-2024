import { createTables } from './config/db.js';
import { createRecinto, getRecintos, updateRecinto, deleteRecinto } from './api/crud.js';
import { createAnimal, getAnimais, updateAnimal, deleteAnimal } from './api/crud.js';
import { db } from './config/populate.js';

// // Cria as tabelas
// createTables();

// Popular
db();


// // Criar um recinto
// createRecinto(6, 'floresta', 15);

// // Criar um animal
// createAnimal('LEAO', 3, 'savana', true);

// // Ler todos os recintos
// getRecintos().then(recintos => console.log(recintos));

// // Ler todos os animais
// getAnimais().then(animais => console.log(animais));

// // Atualizar um recinto
// updateRecinto(1, 7, 'savana', 20);

// // Deletar um recinto
// // deleteRecinto(1);

// // Atualizar um animal
// updateAnimal(1, 'LEOPARDO', 2, 'savana', true);

// Deletar um animal
// deleteAnimal(1);
