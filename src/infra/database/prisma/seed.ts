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
        id: 1,
        name: 'Carroça',
        ingredients: 'Madeira qualquer x3, Manufatura',
        ingredientCount: 4,

        reward: 10,
        category: 'MÁQUINAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 2,
        name: 'Carroça Reforçada',
        ingredients: 'Madeira qualquer x3, Ferro x1',
        ingredientCount: 5,

        reward: 15,
        category: 'MÁQUINAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 3,
        name: 'Escultura de Pedra',
        ingredients: 'Pedra x2, Artesanato ou Manufatura',
        ingredientCount: 3,

        reward: 10,
        category: 'MÁQUINAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 4,
        name: 'Escultura Ornamentada Dourada',
        ingredients: 'Pedra x2, Ouro x1',
        ingredientCount: 4,

        reward: 10,
        category: 'MÁQUINAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 5,
        name: 'Escultura Ornamentada Esverdeada',
        ingredients: 'Pedra x2, Esmeralda x1',
        ingredientCount: 4,

        reward: 10,
        category: 'MÁQUINAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 6,
        name: 'Casaco Simples',
        ingredients: 'Lã x2',
        ingredientCount: 3,

        reward: 10,
        category: 'ROUPAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 7,
        name: 'Casaco Tingido Amarelo',
        ingredients: 'Lã x2, Flor Amarela x1',
        ingredientCount: 4,

        reward: 15,
        category: 'ROUPAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 8,
        name: 'Casaco Tingido Azul',
        ingredients: 'Lã x2, Flor Azul x1',
        ingredientCount: 4,

        reward: 15,
        category: 'ROUPAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 9,
        name: 'Casaco Tingido Verde',
        ingredients: 'Lã x2, Flor Verde x1',
        ingredientCount: 4,

        reward: 15,
        category: 'ROUPAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 10,
        name: 'Casaco Tingido Vermelho',
        ingredients: 'Lã x2, Flor Vermelho x1',
        ingredientCount: 4,

        reward: 15,
        category: 'ROUPAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 11,
        name: 'Chapéu Ornamentado Branco',
        ingredients: 'Lã x2, Lã ou Pena, Flor Branca, Artesanato x2',
        ingredientCount: 6,

        reward: 25,
        category: 'ROUPAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 12,
        name: 'Bandeira Simples',
        ingredients: 'Lã x2, Madeira qualquer, Artesanato ou Manufatura',
        ingredientCount: 4,

        reward: 15,
        category: 'ROUPAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 13,
        name: 'Bandeira Alva',
        ingredients:
          'Lã x2, Madeira branca, Flor branca, Artesanato ou Manufatura',
        ingredientCount: 5,

        reward: 25,
        category: 'ROUPAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 14,
        name: 'Cerveja',
        ingredients: 'Trigo x2, Água x1, Brewing x1',
        ingredientCount: 4,

        reward: 15,
        category: 'BEBIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 15,
        name: 'Sidra de Maçã',
        ingredients: 'Maçã x2, Água, Brewing',
        ingredientCount: 4,

        reward: 20,
        category: 'BEBIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 16,
        name: 'Sidra de Cereja',
        ingredients: 'Cereja x2, Água, Brewing',
        ingredientCount: 4,

        reward: 20,
        category: 'BEBIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 17,
        name: 'Poção de Respiração Aquática',
        ingredients: 'Água, Peixe qualquer, Flor azul, Brewing',
        ingredientCount: 4,

        reward: 15,
        category: 'BEBIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 18,
        name: 'Poção Carmesim de Fogo',
        ingredients: 'Água, Rubi, Flor vermelha, Brewing',
        ingredientCount: 4,

        reward: 20,
        category: 'BEBIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 19,
        name: 'Poção de Revitalização da Floresta',
        ingredients: 'Água, Esmeralda, Flor verde, Brewing',
        ingredientCount: 4,

        reward: 20,
        category: 'BEBIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 20,
        name: 'Bebida Doce Especial',
        ingredients: 'Água ou Leite, Fruta qualquer x3, Brewing',
        ingredientCount: 5,

        reward: 20,
        category: 'BEBIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 21,
        name: 'Sashimi',
        ingredients: 'Peixe qualquer x3, Cozinhamento',
        ingredientCount: 4,

        reward: 20,
        category: 'COMIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 22,
        name: 'Prato Especial do Mar Vermelho',
        ingredients:
          'Peixe ou Tubarão vermelho x2, Cenoura ou Abóbora x2, Cozinhamento',
        ingredientCount: 5,

        reward: 30,
        category: 'COMIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 23,
        name: 'Prato Especial do Mar Feroz',
        ingredients: 'Tubarão qualquer x2, Cozinhamento',
        ingredientCount: 3,

        reward: 20,
        category: 'COMIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 24,
        name: 'Salada Real',
        ingredients: 'Cenoura ou Abóbora x3, Cozinhamento',
        ingredientCount: 4,

        reward: 15,
        category: 'COMIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 25,
        name: 'Torta de Abóbora',
        ingredients: 'Trigo, Água ou Leite, Ovos, Abóbora, Cozinhamento',
        ingredientCount: 5,

        reward: 25,
        category: 'COMIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 26,
        name: 'Torta de Cenoura',
        ingredients: 'Trigo, Água ou Leite, Ovos, Cenoura, Cozinhamento',
        ingredientCount: 5,

        reward: 25,
        category: 'COMIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 27,
        name: 'Torta Doce',
        ingredients:
          'Trigo, Água ou Leite, Ovos, Banana ou Cereja ou Maçã, Cozinhamento',
        ingredientCount: 5,

        reward: 25,
        category: 'COMIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 28,
        name: 'Banquete de Guerra',
        ingredients: 'Carne ou Peixe x3, Cenoura ou Abóbora, Cozinhamento',
        ingredientCount: 5,

        reward: 30,
        category: 'COMIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 29,
        name: 'Churrasco',
        ingredients: 'Carne x3, Cozinhamento',
        ingredientCount: 4,

        reward: 30,
        category: 'COMIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 30,
        name: 'Ovos Mexidos',
        ingredients: 'Ovo x2, Cozinhamento',
        ingredientCount: 3,

        reward: 15,
        category: 'COMIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 31,
        name: 'Sopa de Legumes',
        ingredients: 'Água, Cenoura ou Abóbora x2, Cozinhamento',
        ingredientCount: 4,

        reward: 18,
        category: 'COMIDAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 32,
        name: 'Machado Simples',
        ingredients: 'Madeira qualquer, Ferro ou Pedra, Manufatura',
        ingredientCount: 3,

        reward: 15,
        category: 'ARMAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 33,
        name: 'Machado Reforçado Escuro',
        ingredients: 'Madeira escura, Ferro x2, Manufatura',
        ingredientCount: 4,

        reward: 20,
        category: 'ARMAS',
        deliveryTime: 7,
        createdAt: new Date(),
      },
      {
        id: 34,
        name: 'Machado Reforçado Claro',
        ingredients: 'Madeira clara, Ferro x2, Manufatura',
        ingredientCount: 4,

        reward: 20,
        category: 'ARMAS',
        deliveryTime: 7,
      },
    ],
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
