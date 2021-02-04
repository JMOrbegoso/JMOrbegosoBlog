import React from 'react';
import { useRouter } from 'next/router';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

type Props = {};

const LanguagePicker = ({}: Props) => {
  const router = useRouter();

  const changeLanguage = (param: any) => {
    router.push(router.asPath, router.asPath, { locale: param });
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
        {router.locales?.map((locale: string) => (
          <Dropdown.Item key={locale} onSelect={() => changeLanguage(locale)}>
            <Image src={`/assets/lang/${locale}.svg`} height={45} width={90} />
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </>
  );
};

export default LanguagePicker;
