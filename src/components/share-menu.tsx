import PostType from '../types/post';
import { useRouter } from 'next/router';
import Container from './container';
import ShareButton from './share-button';
import { ShareType } from '../enums/shareType';
import { URL_BASE } from '../lib/constants';
import useTranslation from 'next-translate/useTranslation';
import TranslationResource from '../enums/translationResource';

type Props = {
  post: PostType;
};

const ShareMenu = ({ post }: Props) => {
  const router = useRouter();
  const { t, lang } = useTranslation('common');

  const shareURL = `${URL_BASE}${router.asPath}`;

  return (
    <Container>
      <div className="row my-5">
        <div className="col-md-12 text-center">
          {t(TranslationResource.did_you_like_the_post)}
        </div>
        <div className="col-md-12 text-center">
          {t(TranslationResource.share_on_social_networks)}
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
