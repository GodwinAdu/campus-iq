"use client";

import { ModalType, useModal } from '@/hooks/use-modal-store';
import { ChannelType } from '@/lib/models/channel.models';
import { MemberRole } from '@/lib/models/member.models';
import { cn } from '@/lib/utils';
import { Edit, Hash, Lock, Mic, Trash, Video } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { ActionTooltip } from '../action-tooltip';

interface Channel {
    _id: string;
    name: string;
    type: ChannelType;
}

interface Server {
    // Define properties of Server here
}

interface ServerChannelProps {
    channel: Channel;
    server: Server;
    role?: MemberRole;
}

const iconMap: Record<ChannelType, React.JSX.Element> = {
    [ChannelType.TEXT]: <Hash />,
    [ChannelType.AUDIO]: <Mic />,
    [ChannelType.VIDEO]: <Video />
};

const ServerChannel = ({
    channel,
    server,
    role
}: ServerChannelProps) => {
    const { onOpen } = useModal();
    const params = useParams();
    const router = useRouter();

    // Using the icon type safely
    const Icon = channel?.type ? iconMap[channel.type] : null;

    const handleClick = () => {
        if (channel?._id) {
            router.push(`/group_discussion/servers/${params?.serverId}/channels/${channel._id}`);
        }
    };

    const onAction = (e: React.MouseEvent, action: ModalType) => {
        e.stopPropagation();
        onOpen(action, { channel, server });
    };

    return (
        <>
            <button
                onClick={handleClick}
                className={cn('group px-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1',
                    params?.channelId === channel._id && 'bg-zinc-700/20 dark:bg-zinc-700')}
            >
                {Icon && React.cloneElement(Icon, { className: "flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" })}
                <p className={cn('line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition',
                    params?.channelId === channel._id && 'text-primary dark:text-zinc-200 dark:group-hover:text-white')}>
                    {channel.name}
                </p>
                {channel.name !== "general" && role !== MemberRole.GUEST && (
                    <div className="ml-auto flex items-center gap-x-2">
                        <ActionTooltip label="Edit">
                            <Edit
                                onClick={(e) => onAction(e, "editChannel")}
                                className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                            />
                        </ActionTooltip>
                        <ActionTooltip label="Delete">
                            <Trash
                                onClick={(e) => onAction(e, "deleteChannel")}
                                className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                            />
                        </ActionTooltip>
                    </div>
                )}
                {channel.name === "general" && (
                    <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                )}
            </button>
        </>

    );
}

export default ServerChannel;
