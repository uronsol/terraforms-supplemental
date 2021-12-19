import Link from 'next/link';
import Image from 'next/image';
import useEagerConnect from '../hooks/useEagerConnect';
import Account from './Account';

const Header = () => {
  const triedToEagerConnect = useEagerConnect();
  return (
    <div className="flex flex-row justify-between items-center py-8 w-full px-6">
      <Link passHref href="/">
        <a className={`text-white font-mono opacity-70 text-xl`}>
          Terraforms Supplemental
        </a>
      </Link>
      <div className="flex flex-row items-center justify-center">
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
