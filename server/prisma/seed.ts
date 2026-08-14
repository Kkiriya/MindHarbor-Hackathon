import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma.js";
import * as prismaEnums from "../generated/prisma/enums.js";

async function main() {
  console.log("Starting seed...\n");

  // === PASSWORD === //
  // for the sake of simplicity all user password will be the same

  const adminPswd = await bcrypt.hash("Admin123", 10);
  const usrPswd = await bcrypt.hash("User123", 10);

  // === USER === //
  console.log("Creating users...\n");

  // upsert here is to avoid duplicate entries if seed is run multiple times
  const admin = await prisma.user.upsert({
    where: {
      email: "admin@mindharbor.com",
    },
    update: {},
    create: {
      email: "admin@mindharbor.com",
      password: adminPswd,
      role: prismaEnums.UserRole.ADMINISTRATOR,
      username: "admin",
      firstName: "Alex",
      lastName: "Admin",
      bio: "MindHarbor's one and only system administrator.",
      visibilityLevel: prismaEnums.UserVisibilityLevel.PUBLIC,
      privateMessageLevel: prismaEnums.UserPrivateMessageLevel.TOUT_LE_MONDE,
    },
  });

  const usersData = [
    {
      email: "sophie.martin@mindharbor.local",
      username: "sophie_m",
      firstName: "Sophie",
      lastName: "Martin",
      bio: "Interested in mindfulness and personal development.",
      visibilityLevel: prismaEnums.UserVisibilityLevel.PRIVE,
      privateMessageLevel: prismaEnums.UserPrivateMessageLevel.PERSONNE,
    },
    {
      email: "thomas.gagnon@mindharbor.local",
      username: "thomas_g",
      firstName: "Thomas",
      lastName: "Gagnon",
      bio: "Trying to improve my sleep routine.",
      visibilityLevel: prismaEnums.UserVisibilityLevel.PUBLIC,
      privateMessageLevel: prismaEnums.UserPrivateMessageLevel.TOUT_LE_MONDE,
    },
    {
      email: "emma.roy@mindharbor.local",
      username: "emma_roy",
      firstName: "Emma",
      lastName: "Roy",
      bio: "Learning to better manage everyday stress.",
      visibilityLevel: prismaEnums.UserVisibilityLevel.GROUPES_SEULEMENT,
      privateMessageLevel:
        prismaEnums.UserPrivateMessageLevel.MEMBRES_DE_MES_GROUPES,
    },
    {
      email: "lucas.tremblay@mindharbor.local",
      username: "lucas_t",
      firstName: "Lucas",
      lastName: "Tremblay",
      bio: "Here to share experiences and support others.",
      visibilityLevel: prismaEnums.UserVisibilityLevel.PRIVE,
      privateMessageLevel: prismaEnums.UserPrivateMessageLevel.PERSONNE,
    },
    {
      email: "chloe.bouchard@mindharbor.local",
      username: "chloe_b",
      firstName: "Chloé",
      lastName: "Bouchard",
      bio: "Interested in healthy relationships and communication.",
      visibilityLevel: prismaEnums.UserVisibilityLevel.PUBLIC,
      privateMessageLevel: prismaEnums.UserPrivateMessageLevel.TOUT_LE_MONDE,
    },
    {
      email: "gabriel.leblanc@mindharbor.local",
      username: "gabriel_l",
      firstName: "Gabriel",
      lastName: "Leblanc",
      bio: "Working on maintaining a better work-life balance.",
      visibilityLevel: prismaEnums.UserVisibilityLevel.GROUPES_SEULEMENT,
      privateMessageLevel:
        prismaEnums.UserPrivateMessageLevel.MEMBRES_DE_MES_GROUPES,
    },
    {
      email: "lea.fortin@mindharbor.local",
      username: "lea_f",
      firstName: "Léa",
      lastName: "Fortin",
      bio: "Enjoys journaling and reading.",
      visibilityLevel: prismaEnums.UserVisibilityLevel.PUBLIC,
      privateMessageLevel: prismaEnums.UserPrivateMessageLevel.TOUT_LE_MONDE,
    },
    {
      email: "nathan.beaulieu@mindharbor.local",
      username: "nathan_b",
      firstName: "Nathan",
      lastName: "Beaulieu",
      bio: "Trying different techniques to reduce stress.",
      visibilityLevel: prismaEnums.UserVisibilityLevel.PRIVE,
      privateMessageLevel: prismaEnums.UserPrivateMessageLevel.PERSONNE,
    },
    {
      email: "camille.girard@mindharbor.local",
      username: "camille_g",
      firstName: "Camille",
      lastName: "Girard",
      bio: "Interested in sleep, mindfulness and wellbeing.",
      visibilityLevel: prismaEnums.UserVisibilityLevel.PUBLIC,
      privateMessageLevel: prismaEnums.UserPrivateMessageLevel.TOUT_LE_MONDE,
    },
  ];

  const users = [];

  for (const usrData of usersData) {
    await prisma.user.upsert({
      where: {
        email: usrData.email,
      },
      update: {},
      create: {
        email: usrData.email,
        password: usrPswd,
        role: prismaEnums.UserRole.USER,
        username: usrData.username,
        firstName: usrData.firstName,
        lastName: usrData.lastName,
        bio: usrData.bio,
        visibilityLevel: usrData.visibilityLevel,
        privateMessageLevel: usrData.privateMessageLevel,
      },
    });
  }

  console.log("Users created successfully.");
}

main()
  .catch((error) => {
    console.error("seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
