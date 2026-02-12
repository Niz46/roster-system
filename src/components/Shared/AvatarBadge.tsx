/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Avatar, Tooltip } from '@chakra-ui/react';

const AvatarBadge: React.FC<{ name: string; size?: string; src?: string }> = ({ name, size = 'sm', src }) => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Avatar.Root size={size as any}>
           <Avatar.Fallback name={name} />
           <Avatar.Image src={src} />
        </Avatar.Root>
      </Tooltip.Trigger>
      <Tooltip.Content>
        {name}
      </Tooltip.Content>
    </Tooltip.Root>
  );
};

export default AvatarBadge;