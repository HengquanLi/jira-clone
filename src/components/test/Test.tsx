import React from 'react';
import { useArray } from '../../utils';

const Test = () => {
  const persons: { name: string; age: number }[] = [
    { name: 'JJ', age: 34 },
    { name: 'John', age: 40 },
  ];
  const { value, add, removeIndex, clear } = useArray(persons);

  return <div>
    <button onClick={()=>add({name:'test',age:22})}>add test</button>
    <button onClick={()=>removeIndex(0)}>remove index(0)</button>
    <button onClick={()=>clear()}>clear all</button>
    {
      value.map((person:{name:string, age:number},index:number) =>(
        <div>
          <span>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))
    }
  </div>;
};

export default Test;
