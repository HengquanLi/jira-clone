import React from 'react';

const Marker = ({ name, keyword }: { name: string; keyword: string }) => {


  const arr = name.split(keyword);
  if (!keyword) {
    return <>{name}</>;
  }
  return (
    <>
      {arr.map((str: string, index: number) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <span style={{ color: '#257AFD' }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
};

export default Marker;
