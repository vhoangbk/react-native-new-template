import React, {useEffect, useState, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Division = ({width=15, color = 'green', type = 'normal', value = 0}) => {
  return(
    <View style={{
      width: width,
      height: 50,
      alignItems: 'center',
      justifyContent: 'flex-end',
    }}>
      <View style={{
        width: type === 'big' ? 3 : 2,
        height: type === 'big' ? 30 : 20,
        backgroundColor: color
      }} />
    </View>
  )
}

const DivisionLabel = ({width, value, type}) => {
  return(
    <View style={{width: width, alignItems: type === 'start' ? 'flex-start' : type === 'end' ? 'flex-end' : 'center'}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: type === 'start' ? 5 : 0, marginRight: type === 'end' ? -5 : 0}}>{value}</Text>
    </View>
  )
}

const WeightScale = ({style}) => {

  const MIN = 0;
  const MAX = 100;
  const DIVISION_WIDTH = 20
  const DIVISION_SET = 5

  const [divisions, setDivisions] = useState([])
  const [divisionSetArr, setDivisionSetArr] = useState([])

  const scrollRef = useRef();

  useEffect(() => {
    let divs = []
    let divset = []
    for(let i=0; i<=MAX-MIN; i++){
      divs.push(i)
      if (i%DIVISION_SET === 0) {
        divset.push(i)
      }
    }
    setDivisions(divs)
    setDivisionSetArr(divset)
  }, [])

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: 'red', width: 2, height: 30, marginLeft: DIVISION_WIDTH * Math.round(SCREEN_WIDTH/2/DIVISION_WIDTH) + DIVISION_WIDTH/2 }} />
      <ScrollView
        ref={scrollRef}
        horizontal
        decelerationRate='fast'
        snapToAlignment='start'
        snapToInterval={DIVISION_WIDTH}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          let offset = e.nativeEvent.contentOffset.x - SCREEN_WIDTH/2
          let value = (offset + SCREEN_WIDTH/2) / DIVISION_WIDTH
          console.log('value', value)
        }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: SCREEN_WIDTH/2}}/>
            <View>
              <View style={{flexDirection:'row'}}>
                {divisionSetArr.map(e => {
                  return(
                    <DivisionLabel width={e === MIN || e === MAX? DIVISION_WIDTH*DIVISION_SET / 2 + DIVISION_WIDTH / 2 : DIVISION_WIDTH*DIVISION_SET} value={e}
                    type={e === MIN ? 'start' : e === MAX ? 'end' : 'normal'} />
                  )
                })}
              </View>
              <View style={styles.containerScale}>
                {divisions.map((e) => {
                  return(
                    <Division width={DIVISION_WIDTH} value={e} type={e % DIVISION_SET === 0 ? 'big' : 'normal'} />
                  )
                })}
              </View>
            </View>
            <View style={{width: SCREEN_WIDTH/2 - DIVISION_WIDTH}}/>
          </View>
    </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    height: 100,
  },
  containerLabel: {
    height: 30,
    alignItems: 'center',
    width: '100%'
  },
  containerScale: {
    flexDirection: 'row',
  },
  scale: {
    height: 20,
    width: 2,
    backgroundColor: 'red',
  }

});

export default WeightScale;
