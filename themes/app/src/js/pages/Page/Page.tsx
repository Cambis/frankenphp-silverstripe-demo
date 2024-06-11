import React from 'react';

import parse from 'html-react-parser';

import type { PageProps as Props } from './types';
import { Layout } from '@/components';

const Page = ({ title, content, menuItems }: Props) => (
  <Layout menuItems={menuItems}>
    <div className="mx-auto w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <h1 className="text-6xl font-bold">{title}</h1>

      <article className="prose lg:prose-xl">{parse(content)}</article>
    </div>
  </Layout>
);

export default Page;
