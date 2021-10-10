import {useState} from 'react';

import {useSelector} from 'react-redux';

import {selectHasBegun} from '~/store/selectors/individual-exercise';

// types
// - 1 = in hold out hold
// - 2 = in out hold
// - 3 = in hold out
// - 4 = in out
// useGetTime(type: 1, steps: [4, 4, 4, 4]);
// useGetTime(type: 2, steps: [4, 0, 4, 4]);
// useGetTime(type: 3, steps: [4, 4, 4, 0]);
// useGetTime(type: 4, steps: [4, 0, 4, 0]);

const secToMill = (seconds: number) => seconds * 1000;

export default function useGetTime(type: number, exercise: number[]) {
  const hasBegun = useSelector(selectHasBegun);
  const [steps, setSteps] = useState<string>();

  if (type === 1) {
    if (hasBegun) {
      setSteps('Inhale');

      setTimeout(() => {
        setSteps('Hold');
      }, secToMill(exercise[0]));

      setTimeout(() => {
        setSteps('Exhale');
      }, secToMill(exercise[1]));

      setTimeout(() => {
        setSteps('Hold');
      }, secToMill(exercise[2]));
    }
  }
  return {steps};
}
