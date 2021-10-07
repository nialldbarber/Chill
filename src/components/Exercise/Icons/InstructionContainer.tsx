import React from 'react';
import {StyleSheet, View} from 'react-native';
import Instructions from './Instructions';
import In from './In';
import Out from './Out';
import Hold from './Hold';

type InstructionsContainerProps = {
  type: number;
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

  const getType = () => {
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
  };

  return <View style={styles.container}>{getType()}</View>;
}
