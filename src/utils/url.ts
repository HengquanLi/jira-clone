import { useMemo } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { cleanObject } from 'utils';

//return the parameters in current page url;

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParam = useSetUrlSearchParams()
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || '' };
        }, {} as { [key in K]: string }),
      [searchParams]
    ),
    (params:Partial<{[key in K]:unknown}>)=>{
      return setSearchParam(params)
    }
    
  ] as const;
};

export const useSetUrlSearchParams = ()=>{
  const [searchParams, setSearchParam] = useSearchParams();
  return (params:{[key in string]:unknown})=>{
     const o = cleanObject({
       ...Object.fromEntries(searchParams),
       ...params,
     }) as URLSearchParamsInit;
     return setSearchParam(o);
  }
}
// const a =['jack',12,{name:'ma',age:12}] => a:(string|number|{name:string,age:number})[]
// const a =['jack',12,{name:'ma',age:12}] as const => a: readOnly['jack',12,{name,string}]
