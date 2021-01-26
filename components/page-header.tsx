import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const PageHeader = ({ children }: Props) => {
  return (
    <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-tight md:leading-none my-8 md:my-12 text-center md:text-left">
      {children}
    </h1>
  );
};

export default PageHeader;
