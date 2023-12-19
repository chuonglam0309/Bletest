import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  TextInput,
  Image,
  Switch,
} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import RangeSlider from '../components/rangeSlider';
import UIHeader from '../components/UIHeader';
import DatePicker from 'react-native-date-picker';
import { Button } from '../components/button';
import BleManager from 'react-native-ble-manager';
import { Buffer } from 'buffer';
import { error } from 'console';




const MonitorBLE = (props) => {
  // nhận param liên quan đến navigation
  const { navigation, route } = props;
  // //functions of navigate to/back
  const { navigate, goBack } = navigation;

  const { deviceInfo } = route?.params || {};
  // console.log(deviceInfo);  
  const [valueData, setValueData] = useState('');



  


  
  // hàm để nhận dữ liệu từ Range Slider
  const handleSliderChange = (min, max) => {
    // Xử lý giá trị min và max ở đây
    console.log('Selected Range:', min, max);
  };
  // thành phần của tabbar1
  const FirstRoute = () => (
    <View style={{ flex: 1, paddingHorizontal: 10, }}>
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <View style={styles.controlAutoViews}>
          <RangeSlider title={'Temperature(°C)'} minRange={0} maxRange={200} initialValues={{ low: 0, high: 200 }} handelValueSlider={(min, max) => {
            console.log('minMain:' + min);
            console.log('maxMain:' + max);
          }} />
        </View>
        <View style={styles.controlAutoViews}>
          <RangeSlider title={'Humidity(%RH)'} minRange={0} maxRange={100} initialValues={{ low: 0, high: 100 }} handelValueSlider={(min, max) => {
            console.log('minMain:' + min);
            console.log('maxMain:' + max);
          }} />
        </View>
        <View style={styles.controlAutoViews}>
          <RangeSlider title={'CO2(PPM)'} minRange={0} maxRange={1000} initialValues={{ low: 0, high: 1000 }} handelValueSlider={(min, max) => {
            console.log('minMain:' + min);
            console.log('maxMain:' + max);
          }} />
        </View>
      </View>
      <View style={{ flex: 1 }}></View>

    </View>
  );
  // thành phần của tabbar2
  const SecondRoute = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
      <View style={{ flex: 1, paddingHorizontal: 10, marginVertical: 10 }}>

        <View style={styles.mainControlManual}>
          <View style={styles.controlPowerView}>
            <Text style={styles.textControlPower}>Power</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#34C759' }}
              thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
            />
          </View>
          <View style={styles.controlScheduleView}>

          </View>
        </View>
        <View style={styles.blankControlManual}>
        </View>
      </View>
    );
  }
  // thành phần của tabbar3
  const ThirdRoute = () => {
    const [isEnabled, setIsEnabled] = useState(false);


    const [showTimer, setShowTimer] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [selectedTime, setSelectedTime] = useState(new Date()); // Thêm biến trạng thái

    return (
      <View style={{ flex: 1, paddingHorizontal: 10, margin: 10 }}>
        <View style={{ flex: 1, justifyContent: 'space-around', }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={styles.textControlPower} >Timer</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#34C759' }}
              thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
            />
          </View>
          <View style={{ height: '50%', justifyContent: 'space-evenly' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>On</Text>
              <TouchableOpacity
              onPress={()=>{
                setShowTimer(!showTimer)
              }}
              >
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#B3B3B3' }}>{selectedTime.getHours()}: {selectedTime.getMinutes()}</Text>
              </TouchableOpacity>
              <DatePicker
                modal
                is24hourSource="locale"
                mode="time"
                open={showTimer}
                date={selectedTime}
                onConfirm={(date) => {
                  setSelectedTime(date)
                  console.log(`${date.getHours()}:${date.getMinutes()}`);
                }}
                onCancel={() => {
                  setShowTimer(false)
                }}
              />            
              </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>Off</Text>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#B3B3B3' }}>07:00</Text>
            </View>

          </View>
          
        </View>
        <View style={{ flex: 3, }}>
        <Button tittle={'Receive BLE'} bgcolors={'white'} textcolors={''} onPress={() => {
 
        }}/>

        <Button tittle={'Send data'} bgcolors={'white'} textcolors={''} onPress={() => {
          
        }}/>

        </View>


        {/* <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
        <Text style={styles.textControlPower} >Scheduled Time</Text>
        <Switch
        trackColor={{false: '#767577', true: '#34C759'}}
        thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
      />
        </View>
        <View>
        <Text style={{fontSize:16, fontWeight:'600'}}>Power On</Text>
        <Text style={{fontSize:16, fontWeight:'600',color:'#B3B3B3'}}>07:00</Text>
        </View> */}

      </View>
    );
  }


  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      style={{
        backgroundColor: '#d5d5d2',
        borderRadius: 10,
        width: '70%',
        alignSelf: 'center'
      }}
      {...props}
      indicatorStyle={{ backgroundColor: 'none' }}
      renderLabel={({ route, focused, color }) => (
        <View style={{ backgroundColor: focused ? '#333333' : undefined, width: '100%', borderRadius: 8 }}>
          <Text style={{ width: '100%', fontWeight: focused ? '900' : 'normal', margin: 8, color: focused ? '#F4F4F4' : 'gray', fontSize: 18 }}>
            {route.title}
          </Text>
        </View>
      )}


    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <UIHeader
        title={'Factory'}
        leftIconName={"chevron-left"}
        onPressLeftIcon={() =>
          goBack()
        }
      />
      <View style={styles.contentView}>
        <View style={[styles.viewDeviceName]}>
          <Text style={styles.textDeviceName}>{deviceInfo ? deviceInfo.name : 'name'}</Text>
        </View>
        <View style={styles.displayValue}>
          <View style={styles.displayValueChild}>
            <Image style={styles.imageDisplayValueChild} source={require('../../assets/images/temperature.png')} />
            <Text style={styles.textDisplayValueChild}>26.5<Text style={{ fontSize: 11 }}>°C</Text></Text>
          </View>
          <View style={styles.displayValueChild}>
            <Image style={styles.imageDisplayValueChild} source={require('../../assets/images/humidity.png')} />
            <Text style={styles.textDisplayValueChild}>26.5<Text style={{ fontSize: 11 }}>%</Text></Text>
          </View>
          <View style={styles.displayValueChild}>
            <Image style={styles.imageDisplayValueChild} source={require('../../assets/images/co2.png')} />
            <Text style={styles.textDisplayValueChild}> 550<Text style={{ fontSize: 11 }}>PPM</Text></Text>
          </View>
        </View>
      </View>
      <View style={[styles.controlView]}>
        <TabView
          navigationState={{ index: 0, routes: [{ key: 'first', title: 'Auto' }, { key: 'third', title: 'Timer' }, { key: 'second', title: 'Manual' },] }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={(index) => { }}
          swipeEnabled={false}  // Tắt chức năng vuốt giữa các tab
          style={{
            borderRadius: 10
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MonitorBLE;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red'
  },
  contentView: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'space-evenly'
  },
  viewDeviceName: {
    borderBottomWidth: 0.8,
    // width:'30%'
    alignSelf: 'center'
  },
  textDeviceName: {
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  displayValue: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  displayValueChild: {
    flexDirection: 'row',
    maxWidth: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageDisplayValueChild: {
    maxWidth: 35,
    maxHeight: 35,
  },
  textDisplayValueChild: {
    fontWeight: '500',
    fontSize: 16,
    color: '#B3B3B3',
  },
  controlView: {
    flex: 8,
    // backgroundColor: 'blue',
  },
  controlAutoViews: {
    borderRadius: 8,
    backgroundColor: 'white',
  },
  mainControlManual: {
    flex: 1,
    // backgroundColor:'red'
  },
  blankControlManual: {
    flex: 2,
    // backgroundColor:'blue'
  },
  controlPowerView: {
    // backgroundColor:'red'
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textControlPower: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600'
  },
  controlScheduleView: {
    flex: 2,
    justifyContent: 'space-between',
    // backgroundColor:'blue'
  },
});
