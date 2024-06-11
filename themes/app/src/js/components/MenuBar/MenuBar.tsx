import React from 'react';

import type { MenuBarProps as Props } from './types';
import { MenuItem } from '@/components';

const MenuBar = ({ menuItems }: Props) => (
  <nav aria-label="Main navigation">
    <ul role="menubar-navigation">
      {menuItems.map((item) => (
        <MenuItem key={item.id} {...item} />
      ))}
    </ul>
  </nav>
);

export default MenuBar;
