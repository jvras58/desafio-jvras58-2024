import { createRecinto, getRecintos, updateRecinto, deleteRecinto } from './api/crud.js';
import { createAnimal, getAnimais, updateAnimal, deleteAnimal } from './api/crud.js';


// Get

// all recintos
getRecintos().then(recintos => console.log(recintos));

// all animais
getAnimais().then(animais => console.log(animais));


// Create

// um recinto
// createRecinto(6, 'floresta', 15);

// um animal
// createAnimal('pokemon', 3, 'savana', false);
// createAnimal('LEOPARDO', 2, 'savana', true);

// Update

// Um recinto
// updateRecinto(6, 6, 'floresta', 16);

// Um animal
// updateAnimal(1, 'LEOPARDO', 2, 'savana', true);

// Delete 

// um recinto
// deleteRecinto(1);

// um animal
// deleteAnimal(1);
