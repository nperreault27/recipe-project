import { createClient } from '@/lib/supabase/server';
import SignUpButton from './SignUpButton';

import {
  Avatar,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
} from '@mantine/core';
import { Bookmark, NotebookPen, NotebookText } from 'lucide-react';

const nameToNumber = (name: string) => {
  return [...name].reduce((sum, char) => char.charCodeAt(0) + sum, 0);
};
const possibleColors = [
  '#ffb6b9',
  '#b39ddb',
  '#cb89e6',
  '#ff92c2',
  '#ffad6b',
  '#7dbbff',
  '#ccccff',
];

export const ProfileButton = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return <SignUpButton />;
  }

  const userName = user.user_metadata.display_name;
  const color = possibleColors[nameToNumber(userName) % possibleColors.length];
  console.log(user);
  return (
    <Menu trigger='hover' openDelay={100} closeDelay={400}>
      <MenuTarget>
        <Avatar
          variant='filled'
          size='45'
          color={color}
          name={userName}
          bd={'1px solid black'}
        ></Avatar>
      </MenuTarget>

      <MenuDropdown>
        <MenuLabel>Recipes</MenuLabel>
        <MenuItem leftSection={<NotebookPen />}>Create a Recipe</MenuItem>
        <MenuItem leftSection={<NotebookText />}>Created Recipes</MenuItem>
        <MenuItem leftSection={<Bookmark />}>Saved Recipes</MenuItem>
        <MenuDivider />
        <MenuLabel>Account</MenuLabel>
        <MenuItem>Logout</MenuItem>
      </MenuDropdown>
    </Menu>
  );
};

export default ProfileButton;
