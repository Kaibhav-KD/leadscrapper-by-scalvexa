import { twMerge } from 'tailwind-merge';
import { config } from './../../config';

interface ILogoProps {
  size?: 'base' | 'sm';
  /** When true, show only the image (no app name text). */
  imageOnly?: boolean;
}

const getLogoSrc = (): string => {
  try {
    if (typeof chrome !== 'undefined' && chrome.runtime?.getURL) {
      return chrome.runtime.getURL('logo.png');
    }
  } catch {
    // ignore — fall through to relative path
  }
  return '/logo.png';
};

export const Logo: React.FC<ILogoProps> = ({ size = 'base', imageOnly = false }) => {
  let className = 'logo';

  switch (size) {
    case 'base':
      className = twMerge(className, 'logo-base');
      break;
    case 'sm':
      className = twMerge(className, 'logo-sm');
      break;
  }

  return (
    <div className={className}>
      <img src={getLogoSrc()} alt={config.APP_NAME} className="logo-image" />
      {!imageOnly && <span className="logo-text">{config.APP_NAME}</span>}
    </div>
  );
};
