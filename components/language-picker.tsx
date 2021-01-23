import React from 'react';
import { useRouter } from 'next/router';

const LanguagePicker = () => {
  const router = useRouter();

  const changeLanguage = (e: any) => {
    router.push(router.pathname, router.pathname, {
      locale: e.target.value,
    });
  };

  return (
    <>
      <select onChange={changeLanguage}>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </>
  );
};

export default LanguagePicker;
