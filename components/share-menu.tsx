import PostType from '../types/post';
import { useRouter } from 'next/router';
import Container from './container';
import ShareButton from './share-button';
import { ShareType } from '../lib/enums/shareType';
import { URL_BASE } from '../lib/constants';
import ILocalResources from '../interfaces/ilocalresources';

type Props = {
  post: PostType;
  localResources: ILocalResources;
};

const ShareMenu = ({ post, localResources }: Props) => {
  const router = useRouter();
  const shareURL = `${URL_BASE}${router.asPath}`;

  return (
    <Container>
      <div className="row my-5">
        <div className="col-md-12 text-center">
          {localResources.did_you_like_the_post}
        </div>
        <div className="col-md-12 text-center">
          {localResources.share_on_social_networks}
        </div>
        <div className="col-md-12 text-center">
          <ShareButton
            title={post.title}
            url={shareURL}
            shareType={ShareType.Twitter}
          />
          <ShareButton
            title={post.title}
            url={shareURL}
            shareType={ShareType.Facebook}
          />
          <ShareButton
            title={post.title}
            url={shareURL}
            shareType={ShareType.Telegram}
          />
          <ShareButton
            title={post.title}
            url={shareURL}
            shareType={ShareType.LinkedIn}
          />
        </div>
      </div>
    </Container>
  );
};

export default ShareMenu;
