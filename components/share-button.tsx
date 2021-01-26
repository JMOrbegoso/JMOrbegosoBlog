import { ShareType } from '../lib/enums/shareType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTwitter,
  faFacebook,
  faTelegram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

library.add(faFacebook, faTwitter, faTelegram, faLinkedin);

type Props = {
  title: string;
  url: string;
  shareType: ShareType;
};

const ShareButton = ({ title, url, shareType }: Props) => {
  const shareURL = getShareURL(title, url, shareType);
  const icon = getFontAwesomeIcon(shareType);

  return (
    <>
      <a href={shareURL} target="_blank">
        <FontAwesomeIcon
          icon={icon}
          className="m-2 fa-2x"
          style={{ color: 'white' }}
        />
      </a>
    </>
  );
};

export default ShareButton;

function getShareURL(title: string, url: string, shareType: ShareType) {
  switch (shareType) {
    case ShareType.Twitter:
      return `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
    case ShareType.Facebook:
      return `https://www.facebook.com/sharer/sharer.php?title=${title}&u=${url}`;
    case ShareType.Telegram:
      return `https://telegram.me/share?text=${title}&url=${url}`;
    case ShareType.LinkedIn:
      return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  }
}

function getFontAwesomeIcon(shareType: ShareType) {
  switch (shareType) {
    case ShareType.Twitter:
      return faTwitter;
    case ShareType.Facebook:
      return faFacebook;
    case ShareType.Telegram:
      return faTelegram;
    case ShareType.LinkedIn:
      return faLinkedin;
  }
}
