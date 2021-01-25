import React from 'react';
import { useRouter } from 'next/router';
import { DropdownButton, Dropdown, Image } from 'react-bootstrap';
import ILocalResources from '../interfaces/ilocalresources';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';

library.add(faGlobeAmericas);

type Props = {
  localResources: ILocalResources;
};

const LanguagePicker = ({ localResources }: Props) => {
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
            className="fa-2x"
            style={{ color: 'white' }}
          />
        }
      >
        <Dropdown.Item eventKey="en" onSelect={changeLanguage}>
          <Image src="/assets/lang/usa.svg" height={45} width={90} rounded />
        </Dropdown.Item>
        <Dropdown.Item eventKey="es" onSelect={changeLanguage}>
          <Image src="/assets/lang/spain.svg" height={45} width={90} rounded />
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
};

export default LanguagePicker;
