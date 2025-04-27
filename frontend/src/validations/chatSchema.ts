import { z } from "zod";
export const createChatSchema = z
  .object({
    title: z
      .string()
      .min(4, { message: "Chat title must be 4 characters long." })
      .max(190, { message: "Title can't be more than 190 characters" }),
    passcode: z
      .string()
      .min(4, { message: "Passode must be atleast 4 characters long" })
      .max(25, { message: "passcode must be lesser than 25 characters " }),
  })
  .required();

export type createChatSchemaType = z.infer<typeof createChatSchema>;
