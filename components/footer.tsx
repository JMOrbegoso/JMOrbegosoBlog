import ContactWay from './contact-way';
import { SocialNetwork } from '../lib/enums/socialNetwork';
import Container from './container';
import { CREDITS, COPYRIGHT } from '../lib/constants';
import Author from '../types/author';

type Props = {
  author: Author;
};

const Footer = ({ author }: Props) => {
  return (
    <footer className="bg-primary">
      <Container>
        <div className="row">
          <div className="col-md-12 py-5 text-center">
            <a className="text-white" href={author.web} target="_blank">
              {CREDITS}
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-5 text-center">
            <ContactWay
              socialNetwork={SocialNetwork.Facebook}
              userName={author.facebook}
            />
            <ContactWay
              socialNetwork={SocialNetwork.Twitter}
              userName={author.twitter}
            />
            <ContactWay
              socialNetwork={SocialNetwork.GitHub}
              userName={author.github}
            />
            <ContactWay
              socialNetwork={SocialNetwork.LinkedIn}
              userName={author.linkedin}
            />
            <ContactWay
              socialNetwork={SocialNetwork.YouTube}
              userName={author.youtube}
            />
            <ContactWay
              socialNetwork={SocialNetwork.Instagram}
              userName={author.instagram}
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
