import { prisma } from "@/lib/prisma";
import {
  createCommentLogic,
  getCommentsLogic,
  sendEmailLogic,
} from "@/server/logic";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

const TEST_USER = {
  id: "test-user-id-bis",
  email: "test-bis@example.com",
  name: "Test User",
};

const TEST_EMAIL_DATA = {
  email: TEST_USER.email,
  object: "Test Subject",
  message: "This is a test message",
};

const TEST_COMMENT_DATA = {
  content: "This is a test comment",
  userId: TEST_USER.id,
};

describe("Contact System", () => {
  afterAll(async () => {
    await prisma.comment.deleteMany({
      where: { userId: TEST_USER.id },
    });
    await prisma.user.deleteMany({
      where: { email: TEST_USER.email },
    });
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.comment.deleteMany({
      where: { userId: TEST_USER.id },
    });
    await prisma.user.deleteMany({
      where: { email: TEST_USER.email },
    });

    await prisma.user.create({
      data: {
        id: TEST_USER.id,
        email: TEST_USER.email,
        name: TEST_USER.name,
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  });

  describe("Comment System", () => {
    describe("Create Comment", () => {
      it("should create a comment successfully with valid data", async () => {
        const result = await createCommentLogic(TEST_COMMENT_DATA);
        expect(result.status).toBe(201);

        const commentInDb = await prisma.comment.findFirst({
          where: {
            userId: TEST_USER.id,
            content: TEST_COMMENT_DATA.content,
          },
        });
        expect(commentInDb).toBeDefined();
        expect(commentInDb?.content).toBe(TEST_COMMENT_DATA.content);
        expect(commentInDb?.userId).toBe(TEST_USER.id);
      });

      it("should fail when user does not exist", async () => {
        const invalidCommentData = {
          content: "Test comment",
          userId: "nonexistent-user-id-bis",
        };

        const result = await createCommentLogic(invalidCommentData);
        expect(result.status).toBe(500);
        expect(result.message).toBe("User not found");

        const commentCount = await prisma.comment.count({
          where: { content: invalidCommentData.content },
        });
        expect(commentCount).toBe(0);
      });
    });

    describe("Get Comments", () => {
      beforeEach(async () => {
        await prisma.comment.createMany({
          data: [
            {
              content: "First comment",
              userId: TEST_USER.id,
              createdAt: new Date("2024-01-01"),
            },
            {
              content: "Second comment",
              userId: TEST_USER.id,
              createdAt: new Date("2024-01-02"),
            },
            {
              content: "Third comment",
              userId: TEST_USER.id,
              createdAt: new Date("2024-01-03"),
            },
          ],
        });
      });

      it("should retrieve all comments successfully", async () => {
        const result = await getCommentsLogic();
        expect(result.status).toBe(200);
        expect(result?.comments).toBeDefined();
        expect(result?.comments?.length).toBe(3);

        const comments = result.comments;
        if (comments && comments.length >= 2 && comments[0] && comments[1]) {
          expect(new Date(comments[0].createdAt).getTime()).toBeGreaterThan(
            new Date(comments[1].createdAt).getTime()
          );
        }
      });
    });
  });

  describe("Email System", () => {
    describe("Send Email", () => {
      it("should send email successfully with valid data", async () => {
        const result = await sendEmailLogic(TEST_EMAIL_DATA);
        expect(result.status).toBe(201);
      });

      it("should fail when user email does not exist", async () => {
        const invalidEmailData = {
          email: "nonexistentbis@example.com",
          object: "Test Subject",
          message: "Test message",
        };

        await expect(sendEmailLogic(invalidEmailData)).rejects.toThrow(
          "Email not found"
        );
      });
    });
  });
});
