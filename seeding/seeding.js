// TODO: Ejecutar el siguiente comando para importar los datos a Firestore:
// node seed/seeding.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

// 🔥 Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAShNdXcWb3JyFex-loHaiX2TJeq2dgoFo",
  authDomain: "ionic-app-84817.firebaseapp.com",
  projectId: "ionic-app-84817",
  storageBucket: "ionic-app-84817.firebasestorage.app",
  messagingSenderId: "34331266671",
  appId: "1:34331266671:web:0338c8190382884e9fc79a"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 📌 Datos a importar para los movimientos
const moves = [
  {
    "1": {
      "id": 1,
      "name": "Impactrueno",
      "power": "40",
      "powerPoint": 30,
      "precision": 100,
      "type": "Eléctrico"
    },
    "2": {
      "id": 2,
      "name": "Ascuas",
      "power": "40",
      "powerPoint": 25,
      "precision": 100,
      "type": "Fuego"
    },
    "3": {
      "id": 3,
      "name": "Placaje",
      "power": "40",
      "powerPoint": 35,
      "precision": 100,
      "type": "Normal"
    },
    "4": {
      "id": 4,
      "name": "Látigo Cepa",
      "power": "45",
      "powerPoint": 25,
      "precision": 100,
      "type": "Planta"
    },
    "5": {
      "id": 5,
      "name": "Burbuja",
      "power": "40",
      "powerPoint": 30,
      "precision": 100,
      "type": "Agua"
    }
  }
];

// 📌 Datos a importar para los Pokémon
const pokemons = [
  {
    "1": {
      "id": 1,
      "name": "Pikachu",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      "moves": [
        1,
        3
      ]
    },
    "2": {
      "id": 2,
      "name": "Charmander",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      "moves": [
        2,
        3
      ]
    },
    "3": {
      "id": 3,
      "name": "Bulbasaur",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      "moves": [
        4,
        3
      ]
    },
    "4": {
      "id": 4,
      "name": "Squirtle",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
      "moves": [
        5,
        3
      ]
    },
    "5": {
      "id": 5,
      "name": "Eevee",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",
      "moves": [
        3
      ]
    }
  }
]

// Función para insertar los movimientos en Firestore
async function importMoves() {
  for (const move of moves) {
    const newDocRef = doc(collection(db, "moves")); // Crea un ID automático
    await setDoc(newDocRef, move);
    console.log(`Movimiento importado: ${move.name}`);
  }
}

// Función para insertar los Pokémon en Firestore
async function importPokemons() {
  for (const pokemon of pokemons) {
    const newDocRef = doc(collection(db, "pokemons")); // Crea un ID automático
    await setDoc(newDocRef, pokemon);
    console.log(`Pokémon importado: ${pokemon.name}`);
  }
}

// Ejecutar la importación de movimientos y pokemons
importMoves()
  .then(() => console.log("✅ Movimientos importados con éxito"))
  .catch((error) => console.error("❌ Error al importar movimientos:", error));

importPokemons()
  .then(() => console.log("✅ Pokémon importados con éxito"))
  .catch((error) => console.error("❌ Error al importar Pokémon:", error));
