import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mutation to create a new session
export const createSession = mutation({
    args: { sessionTitle: v.string(), sessionPassword: v.string(), sessionType: v.string() },
    handler: async (ctx, args) => {
      const sessionId = await ctx.db.insert("sessions", { sessionTitle: args.sessionTitle, sessionPassword: args.sessionPassword, sessionType: args.sessionType });
      return { sessionId };
    },
  });

// Mutation to update an existing session
export const updateSession = mutation({
    args: {id: v.id("sessions"), sessionTitle: v.string(), sessionPassword: v.string(), sessionType: v.string() },
    handler: async (ctx, args) => {
      await ctx.db.patch(args.id, { sessionTitle: args.sessionTitle, sessionPassword: args.sessionPassword, sessionType: args.sessionType });
    },
    });
// Mutation to delete a session
export const deleteSession = mutation({
    args: { id: v.id("sessions") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
    });
// Query to fetch all sessions
export const fetchSessions = query({
    args: {},
    handler: async (ctx) => {
      const sessions = await ctx.db.query("sessions").collect();
      return { sessions };
    },
    });
// Query to fetch a session by sessionId
export const fetchSession = query({
    args: { id: v.id("sessions") },
    handler: async (ctx, args) => {
      const session = await ctx.db.get(args.id);
      return { session };
    },
    });

