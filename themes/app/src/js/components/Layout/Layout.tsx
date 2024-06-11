import React from 'react';

import type { LayoutProps as Props } from './types';
import { MenuBar } from '@/components';

const Layout = ({ menuItems, children }: Props) => (
  <>
    <MenuBar menuItems={menuItems} />
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      {children}
    </main>
  </>
);

export default Layout;
