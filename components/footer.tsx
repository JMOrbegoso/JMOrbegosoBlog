import ContactWay from './contact-way';
import { SocialNetwork } from '../lib/enums/socialNetwork';
import Container from './container';

type Props = {
  title: string;
  copyright: string;
  personalweb: string;
  facebook?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  youtube?: string;
  instagram?: string;
};

const Footer = ({
  title,
  copyright,
  personalweb,
  facebook,
  twitter,
  github,
  linkedin,
  youtube,
  instagram,
}: Props) => {
  return (
    <footer className="bg-primary">
      <Container>
        <div className="row">
          <div className="col-md-12 py-5 text-center">
            <a className="text-white" href={personalweb} target="_blank">
              {title}
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-5 text-center">
            <ContactWay
              socialNetwork={SocialNetwork.Facebook}
              userName={facebook}
            />
            <ContactWay
              socialNetwork={SocialNetwork.Twitter}
              userName={twitter}
            />
            <ContactWay
              socialNetwork={SocialNetwork.GitHub}
              userName={github}
            />
            <ContactWay
              socialNetwork={SocialNetwork.LinkedIn}
              userName={linkedin}
            />
            <ContactWay
              socialNetwork={SocialNetwork.YouTube}
              userName={youtube}
            />
            <ContactWay
              socialNetwork={SocialNetwork.Instagram}
              userName={instagram}
            />
          </div>
        </div>
      </Container>
      <div className="footer-copyright container-fluid text-center py-3">
        <p className="text-white-50">{copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
