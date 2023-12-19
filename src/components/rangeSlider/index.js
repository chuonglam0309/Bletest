import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Slider from 'rn-range-slider';

import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Notch from './Notch';
import Label from './Label';
import styles from './styles';

const SliderScreen = ({title,initialValues, minRange, maxRange, handelValueSlider}) => {
  const [rangeDisabled, setRangeDisabled] = useState(false);
  const [low, setLow] = useState(initialValues?.low || 0);
  const [high, setHigh] = useState(initialValues?.high || 100);
  const [min, setMin] = useState(minRange || 0);
  const [max, setMax] = useState(maxRange || 100);
  const [floatingLabel, setFloatingLabel] = useState(false);

  const renderThumb = useCallback(
    (name: 'high' | 'low') => <Thumb name={name} />,
    [],
  );
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((lowValue, highValue) => {
    setLow(lowValue);
    setHigh(highValue)
    handelValueSlider && handelValueSlider(lowValue, highValue);
  }, [handelValueSlider]);

  // Cập nhật giá trị khi props thay đổi
  useEffect(() => {
    setLow(initialValues?.low || 0);
    setHigh(initialValues?.high || 100);
    setMin(minRange || 0);
    setMax(maxRange || 100);
    console.log('initialValues:', initialValues);
  }, [initialValues, minRange, maxRange]);


  return (
    <View style={styles.root}>
      <Text  style={styles.textTitle}>{title}</Text>
      <Slider
        style={styles.slider}
        min={min}
        max={max}
        step={1}
        // floatingLabel={floatingLabel}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        // renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
      <View style={styles.horizontalContainer}>
        <Text style={styles.valueText}>{low}</Text>
        <Text style={styles.valueText}>{high}</Text>
      </View>
    </View>
  );
};

export default SliderScreen;
