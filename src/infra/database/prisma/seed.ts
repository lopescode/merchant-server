import { PrismaClient } from '@prisma/client';
import { GAME_MASTER_PASSWORD } from '../../constants/game-master-password';
import { GAME_SESSION_ID } from '../../constants/game-session';

async function main() {
  const prisma = new PrismaClient();

  const gameMaster = await prisma.gameMaster.create({
    data: {
      password: GAME_MASTER_PASSWORD,
    },
  });

  await prisma.game.create({
    data: {
      id: GAME_SESSION_ID,
      day: 1,
      gameMasterId: gameMaster.id,
    },
  });

  await prisma.blueprint.createMany({
    data: [
      {
        name: 'Carroça',
        ingredients: 'Madeira, Madeira, Madeira, Manufatura, Cavalo',
        ingredientCount: 5,
        reward: 15,
        category: 'MÁQUINAS',
        deliveryTime: 6,
        createdAt: new Date(),
      },

      {
        name: 'Escultura de Pedra',
        ingredients: 'Pedra, Pedra, Manufatura, Artesanato',
        ingredientCount: 4,

        reward: 4,
        category: 'MÁQUINAS',
        deliveryTime: 5,
        createdAt: new Date(),
      },
      {
        name: 'Escultura Ornamentada Dourada',
        ingredients: 'Pedra, Pedra, Ouro, Manufatura, Artesanato',
        ingredientCount: 5,

        reward: 6,
        category: 'MÁQUINAS',
        deliveryTime: 6,
        createdAt: new Date(),
      },
      {
        name: 'Escultura Ornamentada de Quartzo',
        ingredients: 'Pedra, Pedra, Quartzo, Manufatura, Artesanato',
        ingredientCount: 5,

        reward: 6,
        category: 'MÁQUINAS',
        deliveryTime: 6,
        createdAt: new Date(),
      },
      {
        name: 'Casaco Simples',
        ingredients: 'Lã, Lã, Flor, Flor, Artesanato',
        ingredientCount: 5,

        reward: 15,
        category: 'ROUPAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },

      {
        name: 'Chapéu do Mago',
        ingredients: 'Lã, Lã, Pena, Flor, Flor, Artesanato',
        ingredientCount: 6,

        reward: 20,
        category: 'ROUPAS',
        deliveryTime: 9,
        createdAt: new Date(),
      },
      {
        name: 'Aljava de Flechas',
        ingredients: 'Madeira, Madeira, Pena, Artesanato',
        ingredientCount: 4,

        reward: 10,
        category: 'ROUPAS',
        deliveryTime: 5,
        createdAt: new Date(),
      },

      {
        name: 'Cerveja',
        ingredients: 'Trigo, Trigo, Água, Fermentação',
        ingredientCount: 4,

        reward: 10,
        category: 'BEBIDAS',
        deliveryTime: 5,
        createdAt: new Date(),
      },
      {
        name: 'Sidra de Maçã',
        ingredients: 'Maçã, Maçã, Água, Fermentação',
        ingredientCount: 4,

        reward: 10,
        category: 'BEBIDAS',
        deliveryTime: 5,
        createdAt: new Date(),
      },
      {
        name: 'Sidra de Cereja',
        ingredients: 'Cereja, Cereja, Água, Fermentação',
        ingredientCount: 4,

        reward: 10,
        category: 'BEBIDAS',
        deliveryTime: 5,
        createdAt: new Date(),
      },
      {
        name: 'Poção Caótica',
        ingredients: 'Água, Flor, Flor, Caos, Fermentação',
        ingredientCount: 5,

        reward: 10,
        category: 'BEBIDAS',
        deliveryTime: 4,
        createdAt: new Date(),
      },
      {
        name: 'Poção Áquatica',
        ingredients: 'Água, Flor, Flor, Peixe, Peixe, Fermentação',
        ingredientCount: 6,

        reward: 10,
        category: 'BEBIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        name: 'Poção da Floresta',
        ingredients: 'Água, Flor, Flor, Madeira, Madeira, Fermentação',
        ingredientCount: 6,

        reward: 8,
        category: 'BEBIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        name: 'Poção Misteriosa',
        ingredients: 'Água, Flor, Flor, Ovo, Ovo, Fermentação',
        ingredientCount: 6,

        reward: 15,
        category: 'BEBIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        name: 'Poção Titanica',
        ingredients: 'Água, Flor, Flor, Rubi, Fermentação',
        ingredientCount: 6,

        reward: 6,
        category: 'BEBIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        name: 'Bebida Doce Especial',
        ingredients: 'Leite, Leite, Fruta, Fruta, Brewing',
        ingredientCount: 5,

        reward: 17,
        category: 'BEBIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        name: 'Sashimi',
        ingredients: 'Peixe, Peixe, Peixe, Cozinhamento',
        ingredientCount: 4,

        reward: 6,
        category: 'COMIDAS',
        deliveryTime: 4,
        createdAt: new Date(),
      },
      {
        name: 'Sashimi de Tubarão',
        ingredients: 'Tubarão, Tubarão, Cozinhamento',
        ingredientCount: 3,

        reward: 6,
        category: 'COMIDAS',
        deliveryTime: 4,
        createdAt: new Date(),
      },
      {
        name: 'Prato Real',
        ingredients: 'Carne, Ovo, Cenoura, Cozinhamento',
        ingredientCount: 4,

        reward: 20,
        category: 'COMIDAS',
        deliveryTime: 4,
        createdAt: new Date(),
      },
      {
        name: 'Torta de Abóbora',
        ingredients: 'Trigo, Água, Leite, Ovo, Abóbora, Cozinhamento',
        ingredientCount: 6,

        reward: 20,
        category: 'COMIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        name: 'Torta de Cenoura',
        ingredients: 'Trigo, Água, Leite, Ovo, Cenoura, Cozinhamento',
        ingredientCount: 6,

        reward: 20,
        category: 'COMIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        name: 'Torta Doce',
        ingredients: 'Trigo, Água, Leite, Ovo, Fruta, Cozinhamento',

        ingredientCount: 6,

        reward: 20,
        category: 'COMIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },

      {
        name: 'Ovo Mexidos',
        ingredients: 'Ovo, Ovo, Cozinhamento',
        ingredientCount: 3,

        reward: 10,
        category: 'COMIDAS',
        deliveryTime: 4,
        createdAt: new Date(),
      },
      {
        name: 'Sopa de Legumes',
        ingredients: 'Água, Cenoura, Abóbora, Cozinhamento',
        ingredientCount: 4,

        reward: 10,
        category: 'COMIDAS',
        deliveryTime: 6,
        createdAt: new Date(),
      },
      {
        name: 'Espada de Ferro',
        ingredients: 'Madeira, Ferro, Ferro, Manufatura',
        ingredientCount: 4,

        reward: 5,
        category: 'ARMAS',
        deliveryTime: 4,
        createdAt: new Date(),
      },
      {
        name: 'Espada Dourada',
        ingredients: 'Madeira, Ferro, Ferro, Ouro, Manufatura',
        ingredientCount: 5,

        reward: 8,
        category: 'ARMAS',
        deliveryTime: 5,
        createdAt: new Date(),
      },
      {
        name: 'Espada Esmeralda',
        ingredients: 'Madeira, Ferro, Ferro, Esmeralda, Manufatura',
        ingredientCount: 5,

        reward: 8,
        category: 'ARMAS',
        deliveryTime: 5,
        createdAt: new Date(),
      },

      {
        name: 'Cetro Mágico de Quartzo',
        ingredients:
          'Madeira, Madeira, Quartzo, Quartzo, Cereja, Maçã, Artesanato',
        ingredientCount: 7,

        reward: 17,
        category: 'ARMAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },

      {
        name: 'Cetro Mágico de Esmeralda',
        ingredients: 'Madeira, Madeira, Esmeralda, Esmeralda, Pena, Artesanato',
        ingredientCount: 7,

        reward: 15,
        category: 'ARMAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },

      {
        name: 'Arbalesta',
        ingredients: 'Madeira, Madeira, Lã, Lã, Manufatura, Artesanato',
        ingredientCount: 7,

        reward: 15,
        category: 'ARMAS',
        deliveryTime: 6,
        createdAt: new Date(),
      },

      {
        name: 'Torta Real',
        ingredients: 'Leite, Trigo, Ovo, Banana, Maçã, Cozinhamento',
        ingredientCount: 6,

        reward: 22,
        category: 'ARMAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },

      {
        name: 'Vela do Navio',
        ingredients:
          'Madeira, Madeira, Madeira, Lã, Lã, Lã, Ferro, Manufatura, Manufatura',
        ingredientCount: 9,

        reward: 22,
        category: 'ARMAS',
        deliveryTime: 9,
        createdAt: new Date(),
      },

      {
        name: 'Escudo Mágico de Escamas',
        ingredients:
          'Madeira, Madeira, Tubarão, Tubarão, Ferro, Esmeralda, Manufatura',
        ingredientCount: 7,

        reward: 15,
        category: 'ARMAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },

      {
        name: 'Capa Mágica Noturna',
        ingredients: 'Lã, Lã, Flor, Flor, Ouro, Artesanato, Artesanato',
        ingredientCount: 7,

        reward: 17,
        category: 'ARMAS',
        deliveryTime: 6,
        createdAt: new Date(),
      },

      {
        name: 'Elmo Real',
        ingredients: 'Ferro, Ferro, Pena, Pena, Ouro, Manufatura, Manufatura',
        ingredientCount: 7,

        reward: 16,
        category: 'ARMAS',
        deliveryTime: 6,
        createdAt: new Date(),
      },

      {
        name: 'Cavalo de Guerra',
        ingredients: 'Ferro, Ferro, Ferro, Cavalo, Manufatura, Manufatura',
        ingredientCount: 6,

        reward: 20,
        category: 'ARMAS',
        deliveryTime: 6,
        createdAt: new Date(),
      },

      {
        name: 'Cavalo de Guerra Real',
        ingredients:
          'Ferro, Ferro, Ferro, Cavalo, Rubi, Pena, Manufatura, Manufatura',
        ingredientCount: 8,

        reward: 27,
        category: 'ARMAS',
        deliveryTime: 6,
        createdAt: new Date(),
      },

      {
        name: 'Catapulta',
        ingredients:
          'Madeira, Madeira, Madeira, Ferro, Lã, Pedra, Pedra, Manufatura, Manufatura',
        ingredientCount: 9,

        reward: 17,
        category: 'ARMAS',
        deliveryTime: 8,
        createdAt: new Date(),
      },
    ],
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
