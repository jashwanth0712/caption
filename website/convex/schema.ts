import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { create } from "domain";

export default defineSchema({
    sessions :defineTable({
        sessionTitle: v.string(),
        sessionPassword: v.optional(v.string()),
        sessionType: v.string(),
        imageArray: v.array(v.id("_storage")),
    }),
});
