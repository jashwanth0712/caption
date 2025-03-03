"use client";
import { MessageSquare, Plus, Settings, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useRouter } from 'next/navigation';

interface ActivityItem {
  id: string;
  sessionTitle: string;
  _creationTime: string;
}

// Create a function to take in timestamp and return the amount of time since the timestamp
function timeSince(date: any) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export function Sidebar() {
  const history = useQuery(api.sessions.fetchSessions, {});


  return (
    <div className="flex h-full w-64 flex-col bg-gradient-to-b from-[#E93A7D] to-[#FF655B] text-white">
      <div className="p-4">
        <div className="flex items-center">
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
            <path d="M2 17L12 22L22 17" fill="white" />
            <path d="M2 12L12 17L22 12" fill="white" />
          </svg>
          <h1 className="text-lg font-bold">Caption</h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <h2 className="mb-2 text-sm font-medium">History</h2>
          <ul className="space-y-2">
            {history && history.sessions && history.sessions.map((item: any) => (
              <ActivityItemComponent key={item._id} item={item} />
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4">
        <Button
          variant="outline"
          className="w-full justify-start border-white/20 bg-white/10 text-white hover:bg-white/20"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Conversation
        </Button>
      </div>

      <div className="mt-auto border-t border-white/20 p-4">
        <Button
          variant="outline"
          className="mb-4 w-full justify-start border-white/20 bg-white/10 text-white hover:bg-white/20"
        >
          ⭐ us on Github
        </Button>
        <p className="text-sm">
          The history gets deleted after every 5hrs powered by Convex Cron Jobs
        </p>
      </div>
    </div>
  );
}

function ActivityItemComponent({ item }: { item: ActivityItem }) {
  const router = useRouter();
  return (
    <li className="group rounded-md p-2 hover:bg-white/10">
      <button
        className="flex w-full items-start text-left"
        onClick={() => { router.push(`/chat?id=${item._id??""}`); }} // Use item.id to navigate dynamically
      >
        <MessageSquare className="mr-2 mt-0.5 h-4 w-4 shrink-0 opacity-70" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium">{item.sessionTitle}</div>
        </div>
        <span className="ml-2 shrink-0 text-xs opacity-70">{timeSince(item._creationTime)}</span>
      </button>
    </li>
  );
}
