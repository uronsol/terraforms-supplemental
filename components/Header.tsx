import Link from 'next/link';
import Image from 'next/image';
import useEagerConnect from '../hooks/useEagerConnect';
import Account from './Account';
import { PageProps } from '../types';

const Routes = [
  {
    name: 'Wallet',
    key: 'wallet',
    route: '/',
  },
  {
    name: 'Search',
    key: 'search',
    route: '/search',
  },
  {
    name: 'Terraform',
    key: 'terraform',
    route: '/terraform',
  },
];

interface DotProps {
  selected: boolean;
}

const Dot = ({ selected }: DotProps) => {
  if (!selected) return <div className="h-1 w-1 mt-1"></div>;
  return <div className="h-1 w-1 rounded-md mt-1 bg-white"></div>;
};

const Header = ({ pageProps: { pageKey } }: PageProps) => {
  const triedToEagerConnect = useEagerConnect();
  return (
    <div className="flex flex-row justify-between items-center py-8 w-full px-6">
      <Link passHref href="/">
        <a
          className={`text-white font-mono opacity-70 text-xl`}
          style={{
            width: 280,
          }}
        >
          Terraforms Supplemental
        </a>
      </Link>
      <div className="flex flex-row justify-center items-center py-8">
        {Routes.map(({ name, key, route }, index) => {
          return (
            <div
              key={`route-${key}`}
              className="flex flex-row justify-center items-center"
            >
              <Link passHref href={route}>
                <a
                  className={`text-white font-mono opacity-70 text-xs md:text-base ${
                    index === 0 ? '' : 'ml-2 md:ml-6'
                  }`}
                >
                  {name}
                  <div className="flex flex-col justify-center items-center">
                    <Dot selected={pageKey === key} />
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
      <div
        className="flex flex-row items-center justify-end"
        style={{
          width: 280,
        }}
      >
        <div className="mr-8">
          <a
            href="https://twitter.com/uronsol"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/assets/icons/twitter.svg"
              width={38}
              height={30}
              alt="alpha-logo"
            />
          </a>
        </div>
        <Account triedToEagerConnect={triedToEagerConnect} />
      </div>
    </div>
  );
};

export { Header };
