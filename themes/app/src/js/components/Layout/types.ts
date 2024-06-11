import type { ReactNode } from 'react';

import type { MenuItemProps } from '../MenuItem/types';

type LayoutProps = {
  menuItems: MenuItemProps[];
  children: ReactNode;
};

export type { LayoutProps };
