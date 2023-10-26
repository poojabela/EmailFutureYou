import { date, pgTableCreator, text, time, uuid } from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `email-app_${name}`);

export const emails = pgTable("emails", {
  id: uuid("id").defaultRandom().primaryKey(),
  to: text("to").notNull(),
  from: text("from").notNull(),
  subject: text("subject").notNull(),
  date: date("date").notNull(),
  body: text("body").notNull(),
});
