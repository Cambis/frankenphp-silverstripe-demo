import React from 'react';

import { Link } from '@inertiajs/react';

import type { MenuItemProps as Props } from './types';

const MenuItem = ({ menuTitle, link }: Props) => (
  <li role="none">
    <Link role="menuitem" href={link} only={['title', 'content']}>
      {menuTitle}
    </Link>
  </li>
);

export default MenuItem;
