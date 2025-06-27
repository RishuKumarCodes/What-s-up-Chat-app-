"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Copy, MoveUpRight } from "lucide-react"; // Icons
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import GroupChatCardMenu from "./GroupChatCardMenu";
import { toast } from "sonner";
import Env from "@/lib/env";
import { ChatGroupType } from "../../../types";

export default function GroupChatCard({
  group,
  user,
}: {
  group: ChatGroupType;
  user: CustomUser;
}) {
  const [showPasscode, setShowPasscode] = useState(false);

  const handleCopyPasscode = () => {
    navigator.clipboard?.writeText(group.passcode);
    toast.success("Passcode copied to clipboard!");
  };

  const handleJoinChat = () => {
    const chatUrl = `${Env.APP_URL}/chat/${group.id}`;
    window.open(chatUrl, "_blank");
  };

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-baseline w-96">
        <div>
          <CardTitle className="text-2xl">{group.title}</CardTitle>
          <p className="text-xs text-gray-700">
            {new Date(group.created_at).toDateString()}
          </p>
        </div>
        <GroupChatCardMenu user={user} group={group} />
      </CardHeader>

      <CardContent className="space-y-3">
        <div className=" items-center gap-2">
          <p>Passcode:</p>
          <div className="flex items-center justify-between bg-gray-200 rounded-lg p-0.5 px-2.5 mt-2">
            <strong>{showPasscode ? group.passcode : "••••••"}</strong>
            <div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowPasscode(!showPasscode)}
                title="Toggle Visibility"
              >
                {showPasscode ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleCopyPasscode}
                title="Copy Passcode"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            size="sm"
            onClick={handleJoinChat}
            className="flex items-center gap-2 rounded-full px-4! mt-2 hover:bg-black bg-white text-black hover:text-white border border-gray-400 hover:border-black"
          >
            <>
              Join Chat
              <MoveUpRight />
            </>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
