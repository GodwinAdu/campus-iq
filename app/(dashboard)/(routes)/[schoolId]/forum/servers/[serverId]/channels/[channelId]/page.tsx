
import React from "react"
import { findChannelById } from '@/lib/actions/channel.actions';
import { redirect } from "next/navigation";
import { ChatHeader } from "@/components/forums/chat/chat-header";
import { ChatInput } from "@/components/forums/chat/chat-input";
import { ChatMessages } from "@/components/forums/chat/chat-message";
import { MediaRoom } from "@/components/forums/media-room";
import { findMembersByServerAndProfile } from "@/lib/actions/member.action";
import { currentUser } from "@/lib/helpers/current-user";
import { ChannelType } from "@/lib/models/channel.models";


interface ChannelIdPageProps {
  params: Promise<{schoolId:string,channelId:string,serverId:string}>
}


const ChannelIdPage = async ({
  params
}: ChannelIdPageProps) => {
  const {schoolId,channelId,serverId} = await params;
  const profile = await currentUser();


  const channel = await findChannelById(channelId)

  const member = await findMembersByServerAndProfile(serverId, profile?._id)


  if (!channel || !member) {
    redirect(`/${schoolId}/forum`);
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={serverId}
        type="channel"
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel._id}
            type="channel"
            apiUrl="/api/group-messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel._id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel._id}
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel._id,
              serverId: channel.serverId,
            }}
          />
        </>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom
          user={profile}
          chatId={channel._id}
          video={false}
          audio={true}
        />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom
          user={profile}
          chatId={channel._id}
          video={true}
          audio={true}
        />
      )}
    </div>
  );
}

export default ChannelIdPage;