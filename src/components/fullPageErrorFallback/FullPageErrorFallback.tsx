import ErrorBox from 'components/errorBox/ErrorBox';
import FullPage from 'components/fullPage/FullPage';
import React from 'react';

const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
  return (
    <FullPage>
      <ErrorBox error={error} />
    </FullPage>
  );
};

export default FullPageErrorFallback;
