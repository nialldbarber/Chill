import React from 'react';
import {StyleSheet, View} from 'react-native';
import Instructions from '~/components/Exercise/Icons/Instructions';
import In from '~/components/Exercise/Icons/In';
import Out from '~/components/Exercise/Icons/Out';
import Hold from '~/components/Exercise/Icons/Hold';

type InstructionsContainerProps = {
  type: number | undefined;
  exercise: number[];
};

export default function InstructionsContainer({
  type,
  exercise,
}: InstructionsContainerProps) {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });

  function getType() {
    switch (type) {
      case 1:
        return (
          <>
            <Instructions
              icon={<In />}
              title="Breathe in"
              instructions={exercise[0]}
            />
            <Instructions
              icon={<Hold />}
              title="Hold"
              instructions={exercise[1]}
            />
            <Instructions
              icon={<Out />}
              title="Breathe out"
              instructions={exercise[2]}
            />
            <Instructions
              icon={<Hold />}
              title="Hold"
              instructions={exercise[3]}
            />
          </>
        );
      case 2:
        return (
          <>
            <Instructions
              icon={<In />}
              title="Breathe in"
              instructions={exercise[0]}
            />
            <Instructions
              icon={<Out />}
              title="Breathe out"
              instructions={exercise[2]}
            />
            <Instructions
              icon={<Hold />}
              title="Hold"
              instructions={exercise[3]}
            />
          </>
        );
      case 3:
        return (
          <>
            <Instructions
              icon={<In />}
              title="Breathe in"
              instructions={exercise[0]}
            />
            <Instructions
              icon={<Hold />}
              title="Hold"
              instructions={exercise[1]}
            />
            <Instructions
              icon={<Out />}
              title="Breathe out"
              instructions={exercise[2]}
            />
          </>
        );
      case 4:
        return (
          <>
            <Instructions
              icon={<In />}
              title="Breathe in"
              instructions={exercise[0]}
            />
            <Instructions
              icon={<Out />}
              title="Breathe out"
              instructions={exercise[2]}
            />
          </>
        );
      default:
        return null;
    }
  }

  return <View style={styles.container}>{getType()}</View>;
}
