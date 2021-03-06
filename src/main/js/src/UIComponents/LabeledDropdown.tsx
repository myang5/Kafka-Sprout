import React from 'react';
import styled from 'styled-components';

interface DropdownProps {
  name: string,
  label: string,
  options: string[],
  value: string,
  [key: string]: any
}

/**
 * Basic select element with label element positioned on top of dropdown.
 * Width of select is hardcoded to 100% but code could be edited.
 * Select is controlled component for now.
 */
const LabeledDropdown = (props: DropdownProps) => {
  return (
    <>
      <label htmlFor={props.name}>{props.label}</label>
      <Select value={props.value} name={props.name} onChange={props.onChange}>
        {props.options.sort().map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </Select>
    </>
  );
};

const Select = styled.select`
  width: 100%;
  padding: 0.25rem;
  box-sizing: border-box;
`

export default LabeledDropdown;