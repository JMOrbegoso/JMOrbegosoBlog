import ContactWay from './contact-way';
import { SocialNetwork } from '../lib/enums/socialNetwork';
import Container from './container';
import {
  CREDITS,
  COPYRIGHT,
  PERSONAL_WEB,
  FACEBOOK,
  TWITTER,
  GITHUB,
  LINKEDIN,
  YOUTUBE,
  INSTAGRAM,
} from '../lib/constants';

const Footer = () => {
  return (
    <footer className="bg-primary">
      <Container>
        <div className="row">
          <div className="col-md-12 py-5 text-center">
            <a className="text-white" href={PERSONAL_WEB} target="_blank">
              {CREDITS}
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-5 text-center">
            <ContactWay
              socialNetwork={SocialNetwork.Facebook}
              userName={FACEBOOK}
            />
            <ContactWay
              socialNetwork={SocialNetwork.Twitter}
              userName={TWITTER}
            />
            <ContactWay
              socialNetwork={SocialNetwork.GitHub}
              userName={GITHUB}
            />
            <ContactWay
              socialNetwork={SocialNetwork.LinkedIn}
              userName={LINKEDIN}
            />
            <ContactWay
              socialNetwork={SocialNetwork.YouTube}
              userName={YOUTUBE}
            />
            <ContactWay
              socialNetwork={SocialNetwork.Instagram}
              userName={INSTAGRAM}
            />
          </div>
        </div>
      </Container>
      <div className="footer-copyright container-fluid text-center py-3">
        <p className="text-white-50">{COPYRIGHT}</p>
      </div>
    </footer>
  );
};

export default Footer;
