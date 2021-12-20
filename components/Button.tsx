import Link from 'next/link';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import Loader from 'react-loader-spinner';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  loading?: boolean;
}

interface LinkButtonProps {
  href: string;
  className?: string;
  loading?: boolean;
  children: ReactNode;
}

const Button = ({
  onClick,
  children,
  className,
  loading,
  ...extraProps
}: ButtonProps) => {
  return (
    <button
      className={`bg-black text-white border-white border font-mono py-2 px-4 rounded text-xs ${className}`}
      onClick={onClick}
      {...extraProps}
    >
      {loading ? (
        <div className="flex flex-row items-center justify-center">
          <Loader type="ThreeDots" color="#FFFFFF" height={16} width={32} />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

const LinkButton = ({
  href,
  className,
  loading,
  children,
}: LinkButtonProps) => {
  return (
    <Link href={href}>
      <a
        className={`bg-black text-white border-white border font-mono py-2 px-4 rounded text-xs ${className}`}
      >
        {loading ? (
          <div className="flex flex-row items-center justify-center"></div>
        ) : (
          children
        )}
      </a>
    </Link>
  );
};

export { Button, LinkButton };
