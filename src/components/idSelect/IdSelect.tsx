import { Select } from 'antd';
import React from 'react';
import { Raw } from 'types';

// get all Select component props

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

/*
value can be different type 
onChange only return number or undefined
if isNaN(Number(value)) is true, select default type
if select default type, onChange will return undefined
 */

const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  const toNumber = (value: unknown) =>
    isNaN(Number(value)) ? 0 : Number(value);
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default IdSelect;
