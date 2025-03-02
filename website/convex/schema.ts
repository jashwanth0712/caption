import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { create } from "domain";

export default defineSchema({
    sessions :defineTable({
        sessionTitle: v.string(),
        sessionPassword: v.string(),
        sessionType: v.string(),
    }),
});
