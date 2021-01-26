import { SocialNetwork } from '../lib/enums/socialNetwork';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebook,
  faTwitter,
  faGithub,
  faLinkedin,
  faYoutube,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

library.add(
  faFacebook,
  faTwitter,
  faGithub,
  faLinkedin,
  faYoutube,
  faInstagram,
);

type Props = {
  socialNetwork: SocialNetwork;
  userName?: string;
};

const ContactWay = ({ socialNetwork, userName }: Props) => {
  if (userName) {
    const baseUrl = getBaseUrl(socialNetwork);
    const icon = getFontAwesomeIcon(socialNetwork);

    return (
      <>
        <a href={`${baseUrl}/${userName}`} target="_blank">
          <FontAwesomeIcon
            icon={icon}
            className="m-2 fa-3x"
            style={{ color: 'white' }}
          />
        </a>
      </>
    );
  }
  return <></>;
};

function getBaseUrl(socialNetwork: SocialNetwork): string {
  switch (socialNetwork) {
    case SocialNetwork.Facebook:
      return 'https://facebook.com';
    case SocialNetwork.Twitter:
      return 'https://twitter.com';
    case SocialNetwork.GitHub:
      return 'https://github.com';
    case SocialNetwork.LinkedIn:
      return 'https://www.linkedin.com/in';
    case SocialNetwork.YouTube:
      return 'https://youtube.com/c';
    case SocialNetwork.Instagram:
      return 'https://instagram.com';
  }
}

function getFontAwesomeIcon(socialNetwork: SocialNetwork) {
  switch (socialNetwork) {
    case SocialNetwork.Facebook:
      return faFacebook;
    case SocialNetwork.Twitter:
      return faTwitter;
    case SocialNetwork.GitHub:
      return faGithub;
    case SocialNetwork.LinkedIn:
      return faLinkedin;
    case SocialNetwork.YouTube:
      return faYoutube;
    case SocialNetwork.Instagram:
      return faInstagram;
  }
}

export default ContactWay;
