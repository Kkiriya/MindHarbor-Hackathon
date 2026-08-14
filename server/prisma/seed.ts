// Data has been generated to save on time

import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma.js";
import * as prismaEnums from "../generated/prisma/enums.js";

import type {
  User,
  Resource,
  Activity,
  Group,
  Post,
} from "../generated/prisma/client.js";

// This function retrieves an item from an array safely to avoid the TypeScript 'potentially undefined' error
function getItem<T>(array: T[], index: number): T {
  const item = array[index];

  if (item === undefined) {
    throw new Error(`Expected an item at index ${index}, but none was found.`);
  }

  return item;
}

// Creates a deterministic UUID for seed data to avoid duplicate entries when running the seed multiple times.
function seedUuid(prefix: string, index: number): string {
  return `${prefix}-0000-4000-8000-${String(index).padStart(12, "0")}`;
}

async function main() {
  console.log("🌱 Starting database seed...\n");

  // ============================================================
  // PASSWORDS
  // ============================================================

  // For the sake of simplicity, all demo users share these passwords.
  const adminPswd = await bcrypt.hash("Admin123", 10);
  const usrPswd = await bcrypt.hash("User123", 10);

  // ============================================================
  // USERS
  // ============================================================

  console.log("🌱 Creating users...\n");

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@mindharbor.com",
    },
    update: {
      password: adminPswd,
      role: prismaEnums.UserRole.ADMINISTRATOR,
    },
    create: {
      email: "admin@mindharbor.com",
      password: adminPswd,
      role: prismaEnums.UserRole.ADMINISTRATOR,
      username: "admin",
      firstName: "Alex",
      lastName: "Admin",
      bio: "MindHarbor's system administrator.",
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

  const users: User[] = [];

  for (const userData of usersData) {
    const user = await prisma.user.upsert({
      where: {
        email: userData.email,
      },
      update: {},
      create: {
        email: userData.email,
        password: usrPswd,
        role: prismaEnums.UserRole.USER,
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        bio: userData.bio,
        visibilityLevel: userData.visibilityLevel,
        privateMessageLevel: userData.privateMessageLevel,
      },
    });

    users.push(user);
  }

  const allUsers: User[] = [admin, ...users];

  console.log(`🌱 ${allUsers.length} users created/updated successfully`);

  // ============================================================
  // ACTIVITIES
  // ============================================================

  console.log("🌱 Creating activities...");

  const activityData = [
    {
      name: "Meditation",
      desc: "A mindfulness exercise focused on relaxation and awareness.",
    },
    {
      name: "Walking",
      desc: "A relaxing walk to get some fresh air and light physical activity.",
    },
    {
      name: "Breathing Exercise",
      desc: "A guided breathing exercise designed to promote relaxation.",
    },
    {
      name: "Reading",
      desc: "Reading a book or article as a relaxing activity.",
    },
    {
      name: "Journaling",
      desc: "Writing down thoughts, feelings and experiences.",
    },
    {
      name: "Stretching",
      desc: "Gentle stretching to relax the body and release tension.",
    },
  ];

  const activities: Activity[] = [];

  for (const data of activityData) {
    const activity = await prisma.activity.upsert({
      where: {
        name: data.name,
      },
      update: {
        desc: data.desc,
      },
      create: data,
    });

    activities.push(activity);
  }

  console.log(
    `🌱 ${activities.length} activities created/updated successfully`,
  );

  // ============================================================
  // RESOURCES
  // ============================================================

  console.log("🌱 Creating resources...");

  const resourceData = [
    // ANXIETY
    {
      name: "Understanding Anxiety",
      category: prismaEnums.ResourceCategory.ANXIETY,
      type: prismaEnums.ResourceType.ARTICLE,
      duration: 10,
      level: 1,
    },
    {
      name: "Simple Breathing Exercise",
      category: prismaEnums.ResourceCategory.ANXIETY,
      type: prismaEnums.ResourceType.EXERCICE,
      duration: 5,
      level: 1,
    },
    {
      name: "Managing Everyday Worry",
      category: prismaEnums.ResourceCategory.ANXIETY,
      type: prismaEnums.ResourceType.FICHE_PRATIQUE,
      duration: 15,
      level: 2,
    },
    {
      name: "Anxiety Support Resources",
      category: prismaEnums.ResourceCategory.ANXIETY,
      type: prismaEnums.ResourceType.LIEN_EXTERNE,
      duration: 10,
      level: 1,
    },

    // SLEEP
    {
      name: "Understanding Sleep Hygiene",
      category: prismaEnums.ResourceCategory.SLEEP,
      type: prismaEnums.ResourceType.ARTICLE,
      duration: 12,
      level: 1,
    },
    {
      name: "Evening Relaxation Exercise",
      category: prismaEnums.ResourceCategory.SLEEP,
      type: prismaEnums.ResourceType.EXERCICE,
      duration: 10,
      level: 1,
    },
    {
      name: "Building a Better Sleep Routine",
      category: prismaEnums.ResourceCategory.SLEEP,
      type: prismaEnums.ResourceType.FICHE_PRATIQUE,
      duration: 20,
      level: 2,
    },
    {
      name: "Sleep Education Resources",
      category: prismaEnums.ResourceCategory.SLEEP,
      type: prismaEnums.ResourceType.LIEN_EXTERNE,
      duration: 15,
      level: 1,
    },

    // RELATIONSHIP
    {
      name: "Healthy Communication",
      category: prismaEnums.ResourceCategory.RELATIONSHIP,
      type: prismaEnums.ResourceType.ARTICLE,
      duration: 15,
      level: 1,
    },
    {
      name: "Active Listening Exercise",
      category: prismaEnums.ResourceCategory.RELATIONSHIP,
      type: prismaEnums.ResourceType.EXERCICE,
      duration: 10,
      level: 1,
    },
    {
      name: "Setting Healthy Boundaries",
      category: prismaEnums.ResourceCategory.RELATIONSHIP,
      type: prismaEnums.ResourceType.FICHE_PRATIQUE,
      duration: 20,
      level: 2,
    },
    {
      name: "Relationship Support Resources",
      category: prismaEnums.ResourceCategory.RELATIONSHIP,
      type: prismaEnums.ResourceType.LIEN_EXTERNE,
      duration: 10,
      level: 1,
    },

    // WORK
    {
      name: "Understanding Workplace Stress",
      category: prismaEnums.ResourceCategory.WORK,
      type: prismaEnums.ResourceType.ARTICLE,
      duration: 12,
      level: 1,
    },
    {
      name: "Taking Effective Breaks",
      category: prismaEnums.ResourceCategory.WORK,
      type: prismaEnums.ResourceType.EXERCICE,
      duration: 5,
      level: 1,
    },
    {
      name: "Managing Your Workload",
      category: prismaEnums.ResourceCategory.WORK,
      type: prismaEnums.ResourceType.FICHE_PRATIQUE,
      duration: 20,
      level: 2,
    },
    {
      name: "Work-Life Balance Resources",
      category: prismaEnums.ResourceCategory.WORK,
      type: prismaEnums.ResourceType.LIEN_EXTERNE,
      duration: 10,
      level: 1,
    },

    // GRIEF
    {
      name: "Understanding Grief",
      category: prismaEnums.ResourceCategory.GRIEF,
      type: prismaEnums.ResourceType.ARTICLE,
      duration: 15,
      level: 1,
    },
    {
      name: "Finding Moments of Calm",
      category: prismaEnums.ResourceCategory.GRIEF,
      type: prismaEnums.ResourceType.EXERCICE,
      duration: 10,
      level: 1,
    },
    {
      name: "Coping With Loss",
      category: prismaEnums.ResourceCategory.GRIEF,
      type: prismaEnums.ResourceType.FICHE_PRATIQUE,
      duration: 20,
      level: 2,
    },
    {
      name: "Grief Support Organizations",
      category: prismaEnums.ResourceCategory.GRIEF,
      type: prismaEnums.ResourceType.LIEN_EXTERNE,
      duration: 15,
      level: 1,
    },
  ];

  const resources: Resource[] = [];

  for (const data of resourceData) {
    const resource = await prisma.resource.upsert({
      where: {
        name: data.name,
      },
      update: {
        category: data.category,
        type: data.type,
        duration: data.duration,
        level: data.level,
      },
      create: data,
    });

    resources.push(resource);
  }

  console.log(`🌱 ${resources.length} resources created/updated successfully`);

  // ============================================================
  // GROUPS
  // ============================================================

  console.log("🌱 Creating groups...");

  const groupData = [
    {
      name: "Anxiety Support",
      theme: "Anxiety Management",
      desc: "A supportive community for discussing anxiety and everyday stress.",
      rules:
        "Be respectful. Do not judge other members. Respect everyone's privacy.",
      visibility: prismaEnums.GroupVisibility.PUBLIC,
    },
    {
      name: "Better Sleep",
      theme: "Sleep and Rest",
      desc: "A community for discussing sleep habits, routines and relaxation.",
      rules:
        "Share experiences respectfully. Do not present personal experiences as medical advice.",
      visibility: prismaEnums.GroupVisibility.PUBLIC,
    },
    {
      name: "Private Support Circle",
      theme: "General Wellbeing",
      desc: "A smaller private community for members looking for a personal support environment.",
      rules:
        "Respect confidentiality. Do not share private conversations outside this group.",
      visibility: prismaEnums.GroupVisibility.PRIVE,
    },
  ];

  const groups: Group[] = [];

  for (const data of groupData) {
    const group = await prisma.group.upsert({
      where: {
        name: data.name,
      },
      update: {
        theme: data.theme,
        desc: data.desc,
        rules: data.rules,
        visibility: data.visibility,
      },
      create: data,
    });

    groups.push(group);
  }

  console.log(`🌱 ${groups.length} groups created/updated successfully`);

  // ============================================================
  // GROUP MEMBERS
  // ============================================================

  console.log("🌱 Creating group memberships...");

  const anxietyGroup = getItem(groups, 0);
  const sleepGroup = getItem(groups, 1);
  const privateGroup = getItem(groups, 2);

  const sophie = getItem(users, 0);
  const thomas = getItem(users, 1);
  const emma = getItem(users, 2);
  const lucas = getItem(users, 3);
  const chloe = getItem(users, 4);
  const gabriel = getItem(users, 5);
  const lea = getItem(users, 6);
  const nathan = getItem(users, 7);
  const camille = getItem(users, 8);

  const membershipData = [
    // Anxiety Support
    {
      userId: admin.userId,
      groupId: anxietyGroup.groupId,
      role: prismaEnums.GroupRole.MODERATEUR,
      requestStatus: prismaEnums.GroupRequestStatus.ACCEPTEE,
    },
    {
      userId: sophie.userId,
      groupId: anxietyGroup.groupId,
      role: prismaEnums.GroupRole.MEMBRE,
      requestStatus: prismaEnums.GroupRequestStatus.ACCEPTEE,
    },
    {
      userId: thomas.userId,
      groupId: anxietyGroup.groupId,
      role: prismaEnums.GroupRole.MEMBRE,
      requestStatus: prismaEnums.GroupRequestStatus.ACCEPTEE,
    },
    {
      userId: emma.userId,
      groupId: anxietyGroup.groupId,
      role: prismaEnums.GroupRole.MEMBRE,
      requestStatus: prismaEnums.GroupRequestStatus.ACCEPTEE,
    },
    {
      userId: nathan.userId,
      groupId: anxietyGroup.groupId,
      role: prismaEnums.GroupRole.MEMBRE,
      requestStatus: prismaEnums.GroupRequestStatus.ACCEPTEE,
    },

    // Better Sleep
    {
      userId: admin.userId,
      groupId: sleepGroup.groupId,
      role: prismaEnums.GroupRole.MODERATEUR,
      requestStatus: prismaEnums.GroupRequestStatus.ACCEPTEE,
    },
    {
      userId: thomas.userId,
      groupId: sleepGroup.groupId,
      role: prismaEnums.GroupRole.MEMBRE,
      requestStatus: prismaEnums.GroupRequestStatus.ACCEPTEE,
    },
    {
      userId: lucas.userId,
      groupId: sleepGroup.groupId,
      role: prismaEnums.GroupRole.MEMBRE,
      requestStatus: prismaEnums.GroupRequestStatus.ACCEPTEE,
    },
    {
      userId: gabriel.userId,
      groupId: sleepGroup.groupId,
      role: prismaEnums.GroupRole.MEMBRE,
      requestStatus: prismaEnums.GroupRequestStatus.ACCEPTEE,
    },
    {
      userId: camille.userId,
      groupId: sleepGroup.groupId,
      role: prismaEnums.GroupRole.MEMBRE,
      requestStatus: prismaEnums.GroupRequestStatus.ACCEPTEE,
    },

    // Private Support Circle
    {
      userId: admin.userId,
      groupId: privateGroup.groupId,
      role: prismaEnums.GroupRole.MODERATEUR,
      requestStatus: prismaEnums.GroupRequestStatus.ACCEPTEE,
    },
    {
      userId: sophie.userId,
      groupId: privateGroup.groupId,
      role: prismaEnums.GroupRole.MEMBRE,
      requestStatus: prismaEnums.GroupRequestStatus.ACCEPTEE,
    },
    {
      userId: chloe.userId,
      groupId: privateGroup.groupId,
      role: prismaEnums.GroupRole.MEMBRE,
      requestStatus: prismaEnums.GroupRequestStatus.ACCEPTEE,
    },
    {
      userId: lea.userId,
      groupId: privateGroup.groupId,
      role: prismaEnums.GroupRole.MEMBRE,
      requestStatus: prismaEnums.GroupRequestStatus.ACCEPTEE,
    },
    {
      userId: camille.userId,
      groupId: privateGroup.groupId,
      role: prismaEnums.GroupRole.NON_MEMBRE,
      requestStatus: prismaEnums.GroupRequestStatus.EN_ATTENTE,
    },
    {
      userId: lucas.userId,
      groupId: privateGroup.groupId,
      role: prismaEnums.GroupRole.NON_MEMBRE,
      requestStatus: prismaEnums.GroupRequestStatus.REFUSEE,
    },
  ];

  for (const data of membershipData) {
    await prisma.groupMember.upsert({
      where: {
        userId_groupId: {
          userId: data.userId,
          groupId: data.groupId,
        },
      },
      update: {
        role: data.role,
        requestStatus: data.requestStatus,
      },
      create: data,
    });
  }

  console.log(
    `🌱 ${membershipData.length} group memberships created/updated successfully`,
  );

  // ============================================================
  // JOURNAL ENTRIES
  // ============================================================

  console.log("🌱 Creating 30 days of journal entries...");

  const journalUser = getItem(users, 0);

  for (let i = 0; i < 30; i++) {
    const date = new Date();

    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (29 - i));

    const journal = await prisma.journalEntry.upsert({
      where: {
        userId_createdAt: {
          userId: journalUser.userId,
          createdAt: date,
        },
      },
      update: {},
      create: {
        userId: journalUser.userId,

        generalMood: Math.min(5, 2 + Math.floor(i / 10)),
        energyLevel: Math.min(5, 2 + Math.floor(i / 8)),
        sleepQuality: Math.min(5, 2 + Math.floor(i / 7)),
        stressLevel: Math.max(1, 5 - Math.floor(i / 8)),

        // keyEvents describes something notable that happened during the day.
        keyEvents:
          i % 3 === 0
            ? "Had a productive day at school and spent some time outside."
            : i % 3 === 1
              ? "Had a good conversation with a friend."
              : "Spent some quiet time reading and relaxing.",

        dailyGratitude:
          i % 2 === 0
            ? "I am grateful for the people who support me."
            : "I am grateful for having some quiet time today.",

        createdAt: date,
      },
    });

    const activity = getItem(activities, i % activities.length);

    await prisma.journalActivity.upsert({
      where: {
        journalId_activityId: {
          journalId: journal.journalId,
          activityId: activity.activityId,
        },
      },
      update: {},
      create: {
        journalId: journal.journalId,
        activityId: activity.activityId,
      },
    });

    if (i % 2 === 0) {
      const secondActivity = getItem(activities, (i + 1) % activities.length);

      await prisma.journalActivity.upsert({
        where: {
          journalId_activityId: {
            journalId: journal.journalId,
            activityId: secondActivity.activityId,
          },
        },
        update: {},
        create: {
          journalId: journal.journalId,
          activityId: secondActivity.activityId,
        },
      });
    }
  }

  console.log("🌱 30 journal entries created/updated successfully");

  // ============================================================
  // POSTS
  // ============================================================

  console.log("🌱 Creating posts...");

  const postTitles = [
    "What helps you manage stressful days?",
    "How do you maintain a healthy sleep routine?",
    "What is your favorite relaxation technique?",
    "How do you deal with a difficult week?",
    "Small things that improve my day",
    "What has helped you feel less overwhelmed?",
    "How do you disconnect after work?",
    "Sharing a positive experience",
    "What does a good evening routine look like?",
    "How do you stay motivated?",
  ];

  const posts: Post[] = [];

  for (let i = 0; i < 50; i++) {
    const group = getItem(groups, i % groups.length);
    const user = getItem(allUsers, (i + 1) % allUsers.length);

    const postId = seedUuid("00000000", i + 1);

    const post = await prisma.post.upsert({
      where: {
        postId,
      },
      update: {
        userId: user.userId,
        groupId: group.groupId,
        title: `${getItem(postTitles, i % postTitles.length)} #${i + 1}`,
        body:
          "This is sample community content for the MindHarbor demonstration. " +
          "It provides realistic content for demonstrating posts, discussions " +
          "and pagination without relying on real user data.",
      },
      create: {
        postId,
        userId: user.userId,
        groupId: group.groupId,
        title: `${getItem(postTitles, i % postTitles.length)} #${i + 1}`,
        body:
          "This is sample community content for the MindHarbor demonstration. " +
          "It provides realistic content for demonstrating posts, discussions " +
          "and pagination without relying on real user data.",
      },
    });

    posts.push(post);
  }

  console.log(`🌱 ${posts.length} posts created/updated successfully`);

  // ============================================================
  // COMMENTS
  // ============================================================

  console.log("🌱 Creating comments...");

  for (let i = 0; i < 75; i++) {
    const post = getItem(posts, i % posts.length);
    const user = getItem(allUsers, (i + 2) % allUsers.length);

    const commentId = seedUuid("10000000", i + 1);

    const comment =
      i % 3 === 0
        ? "Thanks for sharing this. I can definitely relate to that."
        : i % 3 === 1
          ? "That is a really useful perspective. I might try this myself."
          : "I have had a similar experience. Thanks for starting the discussion.";

    await prisma.comment.upsert({
      where: {
        commentId,
      },
      update: {
        postId: post.postId,
        userId: user.userId,
        comment,
      },
      create: {
        commentId,
        postId: post.postId,
        userId: user.userId,
        comment,
      },
    });
  }

  console.log("🌱 75 comments created/updated successfully");

  // ============================================================
  // FAVORITES
  // ============================================================

  console.log("🌱 Creating favorite resources...");

  for (let i = 0; i < 20; i++) {
    const user = getItem(allUsers, (i + 1) % allUsers.length);
    const resource = getItem(resources, i % resources.length);

    await prisma.favorite.upsert({
      where: {
        UserId_resourceId: {
          UserId: user.userId,
          resourceId: resource.resourceId,
        },
      },
      update: {},
      create: {
        UserId: user.userId,
        resourceId: resource.resourceId,
      },
    });
  }

  console.log("🌱 20 favorites created/updated successfully");

  // ============================================================
  // MESSAGES
  // ============================================================

  console.log("🌱 Creating messages...");

  const messageTexts = [
    "Hey! How have you been?",
    "Thanks for your message!",
    "I found that resource really helpful.",
    "Hope you're having a good day.",
    "That sounds like a great idea.",
  ];

  for (let i = 0; i < 20; i++) {
    const sender = getItem(allUsers, i % allUsers.length);
    const recipient = getItem(allUsers, (i + 1) % allUsers.length);

    const messageId = seedUuid("20000000", i + 1);

    await prisma.message.upsert({
      where: {
        messageId,
      },
      update: {
        senderId: sender.userId,
        recipientId: recipient.userId,
        message: getItem(messageTexts, i % messageTexts.length),
        readReceipt:
          i % 3 === 0
            ? prismaEnums.MessageReadReceipt.SENT
            : prismaEnums.MessageReadReceipt.READ,
      },
      create: {
        messageId,
        senderId: sender.userId,
        recipientId: recipient.userId,
        message: getItem(messageTexts, i % messageTexts.length),
        readReceipt:
          i % 3 === 0
            ? prismaEnums.MessageReadReceipt.SENT
            : prismaEnums.MessageReadReceipt.READ,
      },
    });
  }

  console.log("🌱 20 messages created/updated successfully");

  // ============================================================
  // REPORTS
  // ============================================================

  console.log("🌱 Creating reports...");

  const reportCategories = [
    prismaEnums.ReportCategory.INAPPROPRIE,
    prismaEnums.ReportCategory.SPAM,
    prismaEnums.ReportCategory.INQUIETANT,
  ];

  const reportStatuses = [
    prismaEnums.ReportStatus.EN_ATTENTE,
    prismaEnums.ReportStatus.EN_COURS_DE_REVISION,
    prismaEnums.ReportStatus.RESOLUE,
    prismaEnums.ReportStatus.REJETEE,
  ];

  for (let i = 0; i < 10; i++) {
    const post = getItem(posts, i);
    const user = getItem(allUsers, (i + 3) % allUsers.length);

    const reportId = seedUuid("30000000", i + 1);

    await prisma.report.upsert({
      where: {
        reportId,
      },
      update: {
        postId: post.postId,
        userId: user.userId,
        category: getItem(reportCategories, i % reportCategories.length),
        status: getItem(reportStatuses, i % reportStatuses.length),
      },
      create: {
        reportId,
        postId: post.postId,
        userId: user.userId,
        category: getItem(reportCategories, i % reportCategories.length),
        status: getItem(reportStatuses, i % reportStatuses.length),
      },
    });
  }

  console.log("🌱 10 reports created/updated successfully");

  // ============================================================
  // SUMMARY
  // ============================================================

  console.log("\n========================================");
  console.log("🌱 SEED COMPLETED SUCCESSFULLY");
  console.log("========================================");
  console.log(`Users:            ${allUsers.length}`);
  console.log(`Activities:       ${activities.length}`);
  console.log(`Resources:        ${resources.length}`);
  console.log(`Groups:           ${groups.length}`);
  console.log("Journal entries:  30");
  console.log(`Posts:             ${posts.length}`);
  console.log("Comments:          75");
  console.log("Favorites:         20");
  console.log("Messages:          20");
  console.log("Reports:           10");
  console.log("========================================");

  console.log("\nAdmin credentials:");
  console.log("Email:    admin@mindharbor.com");
  console.log("Password: Admin123");
}

main()
  .catch((error: unknown) => {
    console.error("Seed failed:");

    if (error instanceof Error) {
      console.error(error.message);
      console.error(error.stack);
    } else {
      console.error(error);
    }

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
