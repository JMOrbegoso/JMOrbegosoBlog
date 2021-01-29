import { SocialNetwork } from '../enums/socialNetwork';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faFacebook,
  faTwitter,
  faGithub,
  faLinkedin,
  faYoutube,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

type Props = {
  socialNetwork: SocialNetwork;
  userName?: string;
};

const ContactWay = ({ socialNetwork, userName }: Props) => {
  if (userName) {
    const baseUrl = getBaseUrl(socialNetwork);
    const icon = getIcon(socialNetwork);

    return (
      <>
        <a href={`${baseUrl}/${userName}`} target="_blank">
          <FontAwesomeIcon
            className="m-2"
            icon={icon}
            size="3x"
            color="white"
            aria-hidden="true"
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

function getIcon(socialNetwork: SocialNetwork) {
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
