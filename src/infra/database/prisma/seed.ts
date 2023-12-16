import { PrismaClient } from '@prisma/client';
import { BLUEPRINTS_AVAILABLE } from '../../constants/blueprints-available';
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

  BLUEPRINTS_AVAILABLE.forEach(async (blueprint) => {
    await prisma.blueprint.create({
      data: blueprint,
    });
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
