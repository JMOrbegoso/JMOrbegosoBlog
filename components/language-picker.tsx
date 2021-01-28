import React from 'react';
import { useRouter } from 'next/router';
import { DropdownButton, Dropdown, Image } from 'react-bootstrap';
import ILocalResources from '../interfaces/ilocalresources';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';

type Props = {
  localResources: ILocalResources;
};

const LanguagePicker = ({ localResources }: Props) => {
  const router = useRouter();

  const changeLanguage = (param: any) => {
    router.push(router.asPath, router.asPath, { locale: param });
  };

  const createDropdownItem = (locale: string) => {
    return (
      <>
        <Dropdown.Item key={locale} onSelect={() => changeLanguage(locale)}>
          <Image
            src={`/assets/lang/${locale}.svg`}
            height={45}
            width={90}
            rounded
          />
        </Dropdown.Item>
      </>
    );
  };

  return (
    <>
      <DropdownButton
        className="mr-lg-5"
        title={
          <FontAwesomeIcon
            icon={faGlobeAmericas}
            size="2x"
            color="white"
            aria-hidden="true"
          />
        }
      >
        {router.locales?.map((locale: string) => createDropdownItem(locale))}
      </DropdownButton>
    </>
  );
};

export default LanguagePicker;
