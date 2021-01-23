import React from 'react';
import { useRouter } from 'next/router';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import ILocalResources from '../interfaces/ilocalresources';

type Props = {
  localResources: ILocalResources;
};

const LanguagePicker = ({ localResources }: Props) => {
  const router = useRouter();

  const changeLanguage = (param: any) => {
    router.push(router.pathname, router.pathname, {
      locale: param,
    });
  };

  return (
    <>
      <DropdownButton
        id="dropdown-basic-button"
        title={localResources.change_language}
      >
        <Dropdown.Item eventKey="en" onSelect={changeLanguage}>
          English
        </Dropdown.Item>
        <Dropdown.Item eventKey="es" onSelect={changeLanguage}>
          Español
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
};

export default LanguagePicker;
