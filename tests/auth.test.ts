import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

const TEST_USER = {
  email: "test@example.com",
  password: "0123456789",
  name: "Test User",
};

describe("Authentication system", () => {
  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: {
          in: [TEST_USER.email, TEST_USER.email],
        },
      },
    });
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.session.deleteMany();
    await prisma.user.deleteMany({
      where: {
        email: {
          in: [TEST_USER.email, TEST_USER.email],
        },
      },
    });
  });

  describe("Sign up", () => {
    it("should create a new account with valid data", async () => {
      const response = await auth.api.signUpEmail({
        body: {
          email: TEST_USER.email,
          password: TEST_USER.password,
          name: TEST_USER.name,
        },
      });

      expect(response).toBeDefined();
      expect(response.user).toBeDefined();
      expect(response.user.email).toBe(TEST_USER.email);
      expect(response.user.name).toBe(TEST_USER.name);
      expect(response.token).toBeDefined();

      const userInDb = await prisma.user.findUnique({
        where: { email: TEST_USER.email },
      });
      expect(userInDb).toBeDefined();
      expect(userInDb?.email).toBe(TEST_USER.email);
      expect(userInDb?.name).toBe(TEST_USER.name);
    });

    it("should fail with an existing email", async () => {
      await auth.api.signUpEmail({
        body: {
          email: TEST_USER.email,
          password: TEST_USER.password,
          name: TEST_USER.name,
        },
      });

      await expect(
        auth.api.signUpEmail({
          body: {
            email: TEST_USER.email,
            password: "other-password",
            name: "OtherName",
          },
        })
      ).rejects.toThrow();
    });

    it("should fail with an invalid email", async () => {
      await expect(
        auth.api.signUpEmail({
          body: {
            email: "invalid-email",
            password: "0123456789",
            name: "",
          },
        })
      ).rejects.toThrow();
    });
  });

  describe("Sign in", () => {
    beforeEach(async () => {
      await auth.api.signUpEmail({
        body: {
          email: TEST_USER.email,
          password: TEST_USER.password,
          name: TEST_USER.name,
        },
      });
    });

    it("should connect a user with valid credentials", async () => {
      const response = await auth.api.signInEmail({
        body: {
          email: TEST_USER.email,
          password: TEST_USER.password,
        },
      });

      expect(response).toBeDefined();
      expect(response.user).toBeDefined();
      expect(response.user.email).toBe(TEST_USER.email);
      expect(response.token).toBeDefined();
    });

    it("should fail with an incorrect password", async () => {
      await expect(
        auth.api.signInEmail({
          body: {
            email: TEST_USER.email,
            password: "wrong-password",
          },
        })
      ).rejects.toThrow();
    });

    it("should fail with an non-existent email", async () => {
      await expect(
        auth.api.signInEmail({
          body: {
            email: "non-existent@example.com",
            password: TEST_USER.password,
          },
        })
      ).rejects.toThrow();
    });
  });

  describe("Database integration", () => {
    beforeEach(async () => {
      await auth.api.signUpEmail({
        body: {
          email: TEST_USER.email,
          password: TEST_USER.password,
          name: TEST_USER.name,
        },
      });
    });

    it("should create the right entries in the database", async () => {
      const user = await prisma.user.findUnique({
        where: { email: TEST_USER.email },
        include: {
          sessions: true,
          accounts: true,
        },
      });

      expect(user).toBeDefined();
      expect(user?.email).toBe(TEST_USER.email);
      expect(user?.name).toBe(TEST_USER.name);
      expect(user?.sessions).toBeDefined();
      expect(user?.accounts).toBeDefined();
    });
  });
});
