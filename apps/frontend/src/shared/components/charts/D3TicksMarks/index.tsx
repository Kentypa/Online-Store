import { FC } from 'react';

type D3TicksMarksProps = {
  name: string;
  values: string[] | number[];
  className?: string;
};

export const D3TicksMarks: FC<D3TicksMarksProps> = ({ values, className, name }) => {
  return (
    <div className={className}>
      <ul className='flex flex-col-reverse items-center h-full justify-between pt-2 text-body-small opacity-60 text-subtle-dark'>
        {values.map((value) => {
          return <li key={value}>{value}</li>;
        })}
      </ul>
      <h4 className='self-center -rotate-90 text-body-large'>{name}</h4>
    </div>
  );
};
