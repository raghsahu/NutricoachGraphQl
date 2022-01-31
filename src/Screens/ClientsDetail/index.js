import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  TextInput,
  FlatList,
  Animated,
  Alert,
  ActivityIndicator,
  SegmentedControlIOSComponent,
} from 'react-native';
import CONFIGURATION from '../../Components/Config';
import GeneralStatusBar from './../../Components/GeneralStatusBar';
import LinearGradient from 'react-native-linear-gradient';
import style from './style';
import MassageBox from '../../Components/MessageBox';
import Comments from '../../Components/Comments';
import Notes from '../../Components/Notes';
import Pogress from './../../Components/progressbar';
import {identifier} from '@babel/types';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import Calender from './../../Components/Calender';
import {
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {LineChart, BarChart} from './../../Components/dist/index';
import Toast from 'react-native-simple-toast';
//CONTEXT
import {APPContext} from '../../Context/AppProvider';
import Moment from 'moment';
import {VariablesInAllowedPositionRule} from 'graphql';
import {fallbackHttpConfig} from '@apollo/client';
import {ScreenStackHeaderRightView} from 'react-native-screens';

const data = {
  labels: ['20', '21', '22', '23', '24', '25', '26'],
  datasets: [
    {
      data: [120, 105, 110, 115, 90, 80, 60],
      color: (opacity = 1) => CONFIGURATION.DarkYellow, // optional
    },
  ],
};
const chartData = [
  {label: 'Venezuela', value: '250'},
  {label: 'Saudi', value: '260'},
  {label: 'Canada', value: '180'},
  {label: 'Iran', value: '140'},
  {label: 'Russia', value: '115'},
  {label: 'UAE', value: '100'},
  {label: 'US', value: '30'},
  {label: 'China', value: '30'},
];
//STEP 3 - Chart Configurations
const chartConfigs = {
  type: 'column2D',
  width: '100%',
  height: '400',
  dataFormat: 'json',
  dataSource: {
    chart: {
      caption: 'Countries With Most Oil Reserves [2017-18]',
      subCaption: 'In MMbbl = One Million barrels',
      xAxisName: 'Country',
      yAxisName: 'Reserves (MMbbl)',
      numberSuffix: 'K',
      theme: 'fusion',
      exportEnabled: 1, // to enable the export chart functionality
    },
    data: chartData,
  },
};
const chartConfig = {
  backgroundGradientFrom: '#00ff00',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: 'red',
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => CONFIGURATION.TextDarkGray,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0,
  useShadowColorFromDataset: false, // optional
};
const {height, width} = Dimensions.get('screen');

const index = props => {
  const customerId = props.route.params.toUser;
  const [isLoading, setLoading] = useState(true);

  const {
    getClientsDetails,
    getClientsMealComments,
    AddNotes,
    getNotesListData,
    getExcersizeOfClient,
    getWaterInstack,
    getDailyWaights,
  } = useContext(APPContext);

  const refRBSheet = useRef();
  const refRBPopup = useRef();
  const [selectedNames, setselectedNames] = useState('Meal of the day');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectDate, setselectDate] = useState('');
  const [writeNotes, setwriteNotes] = useState('');
  const [selected, setselected] = useState(0);
  const [mealDay, setmealDay] = useState(0);
  const [mealDay2, setmealDay2] = useState(0);
  const [open1, setopen1] = useState(true);
  const [value1, setvalue1] = useState(new Animated.Value(0));
  const [open2, setopen2] = useState(false);
  const [value2, setvalue2] = useState(new Animated.Value(0));
  const [open3, setopen3] = useState(false);
  const [value3, setvalue3] = useState(new Animated.Value(0));
  const [open4, setopen4] = useState(false);
  const [value4, setvalue4] = useState(new Animated.Value(0));
  const [open5, setopen5] = useState(false);
  const [value5, setvalue5] = useState(new Animated.Value(0));
  const [open6, setopen6] = useState(false);
  const [value6, setvalue6] = useState(new Animated.Value(0));
  const [open7, setopen7] = useState(false);
  const [value7, setvalue7] = useState(new Animated.Value(0));
  const [open8, setopen8] = useState(false);
  const [value8, setvalue8] = useState(new Animated.Value(0));
  const [open9, setopen9] = useState(false);
  const [value9, setvalue9] = useState(new Animated.Value(0));
  const [number, setnumber] = useState([8000, 6000, 4000, 2000, 0]);
  const [numberX, setnumberX] = useState([20, 21, 22, 23, 24, 25, 26]);
  const [values, setvalues] = useState([110, 140, 140, 105, 135, 130, 130]);
  const [clientData, setClientData] = useState('');

  const [profile, setProfile] = useState({});
  const [dailyWeights, setDailyWeights] = useState({});
  const [healthProfile, setHealthProfile] = useState({});
  const [clientMealCommentsData, setClientMealCommentsData] = useState([]);
  const [notesData, setNotesData] = useState([]);

  const [email, setEmail] = useState('');
  const [lastActivity, setlastActivity] = useState('');
  const [isGhost, setisGhost] = useState(true);

  const [bodyFatMassKg, setbodyFatMassKg] = useState('');
  const [muscleMassKg, setmuscleMassKg] = useState('');
  const [bodyFatPercentage, setbodyFatPercentage] = useState('');
  const [muscleMassPercentage, setmuscleMassPercentage] = useState('');
  const [isDate, setDatePicker] = useState(false);

  const [Dates, setDates] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [month, setmonth] = useState(moment(new Date()).format('MMMM, YYYY'));
  const [addMonth, setaddMonth] = useState(0);
  const [fixDate, setfixDate] = useState(moment().format('YYYY-MM-DD'));
  const [currentDate, setCurrentDate] = useState(moment().format('DD/MM/YYYY'));

  const [commentLoading, setCommentLoading] = useState(false);
  const [isError, setError] = useState(false);

  const [title, setTitle] = useState('');
  const [commentArray, setCommentArray] = useState([]);
  const [waterData, setWaterData] = useState([]);
  const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    var dateObj = moment(month, 'MMMM, YYYY').daysInMonth();
    setaddMonth(dateObj);
    var dates = [];
    for (var i = 1; i <= dateObj; i++) {
      dates.push(i);
    }
    setDates(dates);
    console.log('====================================');
    console.log(dates);
    console.log('====================================');
  }, [month]);

  useEffect(() => {
    // getClientData();
    if (selectedNames == 'Meal of the day') {
      getMealComments(fixDate);
    } else if (selectedNames == 'Exercise of the day') {
      getExcersizeComment(fixDate);
    } else if (selectedNames == 'Water Intake') {
      getWaterInstackUser(fixDate);
    } else if (selectedNames == 'Weight') {
      getWaights(fixDate);
    }
  }, []);

  useEffect(() => {
    getClientData();
    getNotesList();
    //getMealComments();
  }, []);

  const handleConfirm = date => {
    //console.log(moment(currentDate).format("DD-MM-YYYY"));
    setselectDate(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePicker(false);
  };

  const getClientData = async () => {
    const result = await getClientsDetails(customerId);
    console.log('RESULT========>', JSON.stringify(result));

    if (result.status == true && result.data && result.data.data.me != null) {
      setTimeout(() => {
        setEmail(result.data.data.me.customer.email);
        setlastActivity(result.data.data.me.customer.lastActivity);
        setisGhost(result.data.data.me.customer.isGhost);

        setProfile(result.data.data.me.customer.profile);
        setHealthProfile(result.data.data.me.customer.healthProfile);
        setDailyWeights(result.data.data.me.customer.dailyWeights);

        if (
          result.data.data.me.customer.healthProfile &&
          result.data.data.me.customer.healthProfile.latestBodyComposition !=
            null
        ) {
          setbodyFatMassKg(
            result.data.data.me.customer.healthProfile.latestBodyComposition
              .bodyFatMassKg,
          );
          setmuscleMassKg(
            result.data.data.me.customer.healthProfile.latestBodyComposition
              .muscleMassKg,
          );
          setbodyFatPercentage(
            result.data.data.me.customer.healthProfile.latestBodyComposition
              .bodyFatPercentage,
          );
          setmuscleMassPercentage(
            result.data.data.me.customer.healthProfile.latestBodyComposition
              .muscleMassPercentage,
          );
        }
      }, 100);
    } else {
      Toast.show(result.error, 2000);
    }
  };

  function getLastDailyWeight() {
    let lastCurrentWeight = '0';
    if (dailyWeights && dailyWeights.nodes && dailyWeights.nodes.length > 0) {
      // for (let i = 0; i < dailyWeights.nodes.length; i++) {
      lastCurrentWeight =
        dailyWeights.nodes[dailyWeights.nodes.length - 1].value;
      //}
      return lastCurrentWeight; //get last current weight
    } else {
      return '0';
    }
  };

  const getWaights = async date => {
    setCommentLoading(true);
    const result = await getDailyWaights(customerId, date);
    setCommentLoading(false);

    if (
      result.status == true &&
      result.data &&
      result.data.data.me.customer.dailyWeights.nodes.length > 0
    ) {
      setTimeout(() => {
        setCommentLoading(false);
        setWeightData(result.data.data.me.customer.dailyWeights.nodes);
        setError(false);
      }, 300);
    } else {
      setCommentLoading(false);
      setWeightData([]);
      Toast.show('No Data Found');
      setError(true);
    }
  };

  const getWaterInstackUser = async date => {
    setCommentLoading(true);
    const result = await getWaterInstack(customerId, date);
    setCommentLoading(false);

    console.log('WaterInstack====>', JSON.stringify(result));
    if (
      result.status == true &&
      result.data &&
      result.data.data.me.customer.waterIntakes.nodes.length > 0
    ) {
      setTimeout(() => {
        setCommentLoading(false);
        setWaterData(result.data.data.me.customer.waterIntakes.nodes);
        setError(false);
      }, 300);
    } else {
      setCommentLoading(false);
      setWaterData([]);
      Toast.show('No Data Found');
      setError(true);
    }
  };

  const getMealComments = async date => {
    setCommentLoading(true);
    const result = await getClientsMealComments(customerId, date);
    console.log('MEALDATAT====>', JSON.stringify(result));
    if (
      result.status == true &&
      result.data &&
      result.data.data.me.customer.meals.nodes.length > 0
    ) {
      setTimeout(() => {
        setCommentLoading(false);
        setClientMealCommentsData(result.data.data.me.customer.meals.nodes);
        setTitle(result.data.data.me.customer.meals.nodes[0].mealType);
        setCommentArray(result.data.data.me.customer.meals.nodes[0].comments);
        setError(false);
      }, 300);
    } else {
      setCommentLoading(false);
      setClientMealCommentsData([]);
      Toast.show('No Data Found');
      setError(true);
    }
  };

  const getExcersizeComment = async date => {
    setCommentLoading(true);
    const result = await getExcersizeOfClient(customerId, date);
    setLoading(false);
    if (
      result.status == true &&
      result.data &&
      result.data.data.me.customer.exercises.nodes.length > 0
    ) {
      setTimeout(() => {
        setCommentLoading(false);
        setClientMealCommentsData(result.data.data.me.customer.exercises.nodes);
        setCommentArray(
          result.data.data.me.customer.exercises.nodes[0].comments,
        );
        setError(false);
      }, 300);
    } else {
      setCommentLoading(false);
      setClientMealCommentsData([]);
      Toast.show('No Data Found');
      setError(true);
    }
  };

  const getNotesList = async () => {
    const result = await getNotesListData(customerId);
    console.log('Notedata ', JSON.stringify(result));
    if (
      result.status == true &&
      result.data &&
      result.data.data.allCustomerRemark != null
    ) {
      setTimeout(() => {
        setNotesData(result.data.data.allCustomerRemark);
      }, 100);
    } else {
      setNotesData([]);
      // Toast.show(result.error, 2000);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios' ? true : false);
    setDate(currentDate);
    //console.log(moment(currentDate).format("DD-MM-YYYY"));
    setselectDate(moment(currentDate).format('YYYY-MM-DD'));
  };

  const showMode = currentMode => {
    setShow(true);
    setDatePicker(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const WriteNotesData = async () => {
    if (!selectDate) {
      Toast.show('Please select date');
    } else if (!writeNotes) {
      Toast.show('Please enter Notes');
    } else {
      setLoading(true);
      const result = await AddNotes(customerId, selectDate, writeNotes);
      setLoading(false);
      //  console.log("LoginUser", result)
      if (result.data && result.data.data.createRemark != null) {
        setTimeout(() => {
          Toast.show('Notes added successfully', 2000);
          setselectDate('');
          setwriteNotes('');
          getNotesList();
        }, 100);
      } else {
        // Toast.show('invalid credential', 2000);
      }
    }
  };

  function getLastTime(lastActivity) {
    Moment.locale('en');
    var localDate = new Date(lastActivity);
    return Moment(localDate).format('MM-DD-yyyy hh:mm a');
  }

  return (
    <View style={style.container}>
      <GeneralStatusBar
        backgroundColor={CONFIGURATION.statusbarColor}
        barStyle="light-content"
      />
      <LinearGradient
        colors={[CONFIGURATION.lightYellow, CONFIGURATION.DarkYellow]}
        style={style.yellowView}>
        <View style={style.menuView}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
            style={style.bellBg}>
            <Image
              resizeMode={'contain'}
              style={style.bellIcon}
              source={require('./../../assetss/back.png')}
            />
          </TouchableOpacity>
          <Text style={style.titleText}>Clients detail</Text>
          <View style={{width: 35}}></View>
        </View>
      </LinearGradient>
      <View style={style.whiteView}>
        <ScrollView>
          <View style={style.appView}>
            <Image
              resizeMode={'cover'}
              style={style.imagesa}
              //source={{ uri: "https://images.unsplash.com/photo-1612904372219-885abc44dfa8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZlbWFsZSUyMG1vZGVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" }}
              source={
                profile.profileImg == '' ? null : {uri: profile.profileImg}
              }
            />
            <View style={{width: '73%'}}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: CONFIGURATION.TextBold,
                  color: CONFIGURATION.TextDarkBlack,
                }}>
                {profile.fullName}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: CONFIGURATION.TextRegular,
                  color: CONFIGURATION.TextDarkGray,
                }}>
                {profile.dateOfBirth} | {profile.gender}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontFamily: CONFIGURATION.TextBold,
                fontSize: 20,
                color: CONFIGURATION.TextDarkBlack,
              }}>
              Diabetic Diet Plan
            </Text>
            <View
              style={{
                padding: 10,
                backgroundColor: CONFIGURATION.lightGreen,
                borderRadius: 5,
                paddingHorizontal: 20,
              }}>
              <Text
                style={{
                  fontFamily: CONFIGURATION.TextBold,
                  color: CONFIGURATION.primaryGreen,
                }}>
                Active
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: CONFIGURATION.TextRegular,
                color: CONFIGURATION.TextDarkGray,
              }}>
              Workplace :{' '}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: CONFIGURATION.TextBold,
                  color: CONFIGURATION.TextDarkBlack,
                }}>
                My Fitness Gym
              </Text>
              <Image
                resizeMode={'contain'}
                style={{height: 10, width: 10, marginTop: 5, marginLeft: 10}}
                source={require('./../../assetss/down.png')}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: CONFIGURATION.TextRegular,
                color: CONFIGURATION.TextDarkGray,
              }}>
              Last Activity :
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: CONFIGURATION.TextBold,
                  color: CONFIGURATION.TextDarkBlack,
                }}>
                {lastActivity ? getLastTime(lastActivity) : ''}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: CONFIGURATION.TextRegular,
                color: CONFIGURATION.TextDarkGray,
              }}>
              Progress :
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: CONFIGURATION.TextBold,
                  color: CONFIGURATION.primaryGreen,
                }}>
                50%
              </Text>
              <Pogress width={50} color={CONFIGURATION.primaryGreen} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: CONFIGURATION.TextRegular,
                color: CONFIGURATION.TextDarkGray,
              }}>
              Phycial activity :
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: CONFIGURATION.TextBold,
                  color: CONFIGURATION.lightYellow,
                }}>
                80%
              </Text>
              <Pogress width={80} color={CONFIGURATION.lightYellow} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              marginVertical: 10,
              justifyContent: 'space-between',
            }}>
            {isGhost ? (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  borderColor: CONFIGURATION.blueBorder,
                  borderWidth: 1,
                  borderRadius: 50,
                  paddingHorizontal: 15,
                }}>
                <Image
                  style={{height: 15, width: 15, marginRight: 10}}
                  source={require('./../../assetss/invite.png')}
                />
                <Text
                  style={{
                    fontFamily: CONFIGURATION.TextBold,
                    color: CONFIGURATION.blueBorder,
                    fontSize: 14,
                  }}>
                  Invite to download app
                </Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                backgroundColor: CONFIGURATION.primaryGreen,
                borderRadius: 50,
                paddingHorizontal: 25,
              }}
              onPress={() => {
                props.navigation.navigate('ChatView', {
                  toUser: customerId,
                  fullName: profile.fullName,
                  profileImage: profile.profileImg,
                  // item: item
                });
              }}>
              <Text
                style={{
                  fontFamily: CONFIGURATION.TextBold,
                  color: CONFIGURATION.white,
                  fontSize: 14,
                }}>
                Message
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: CONFIGURATION.white,
              borderColor: CONFIGURATION.lightGray,
              borderTopWidth: 0.5,
              paddingTop: 15,
              elevation: 2,
              marginTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: width,
                paddingHorizontal: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setselected(0);
                }}
                style={{alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily:
                      selected == 0
                        ? CONFIGURATION.TextBold
                        : CONFIGURATION.TextRegular,
                    color:
                      selected == 0
                        ? CONFIGURATION.primaryGreen
                        : CONFIGURATION.TextDarkGray,
                  }}>
                  Profile
                </Text>
                <View
                  style={{
                    height: 3,
                    width: 50,
                    backgroundColor:
                      selected == 0 ? CONFIGURATION.primaryGreen : null,
                    marginTop: 15,
                  }}></View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setselected(1);
                  // getMealComments();
                }}
                style={{alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily:
                      selected == 1
                        ? CONFIGURATION.TextBold
                        : CONFIGURATION.TextRegular,
                    color:
                      selected == 1
                        ? CONFIGURATION.primaryGreen
                        : CONFIGURATION.TextDarkGray,
                  }}>
                  Diary
                </Text>
                <View
                  style={{
                    height: 3,
                    width: 50,
                    backgroundColor:
                      selected == 1 ? CONFIGURATION.primaryGreen : null,
                    marginTop: 15,
                  }}></View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setselected(2);
                }}
                style={{alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily:
                      selected == 2
                        ? CONFIGURATION.TextBold
                        : CONFIGURATION.TextRegular,
                    color:
                      selected == 2
                        ? CONFIGURATION.primaryGreen
                        : CONFIGURATION.TextDarkGray,
                  }}>
                  Programs
                </Text>
                <View
                  style={{
                    height: 3,
                    width: 50,
                    backgroundColor:
                      selected == 2 ? CONFIGURATION.primaryGreen : null,
                    marginTop: 15,
                  }}></View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setselected(3);
                }}
                style={{alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily:
                      selected == 3
                        ? CONFIGURATION.TextBold
                        : CONFIGURATION.TextRegular,
                    color:
                      selected == 3
                        ? CONFIGURATION.primaryGreen
                        : CONFIGURATION.TextDarkGray,
                  }}>
                  Appointment
                </Text>
                <View
                  style={{
                    height: 3,
                    width: 50,
                    backgroundColor:
                      selected == 3 ? CONFIGURATION.primaryGreen : null,
                    marginTop: 15,
                  }}></View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{backgroundColor: CONFIGURATION.homeBG, flex: 1}}>
            {selected == 0 ? (
              <>
                <View
                  style={{
                    width: width - 40,
                    marginHorizontal: 20,
                    backgroundColor: CONFIGURATION.white,
                    marginVertical: 20,
                    elevation: 2,
                    paddingHorizontal: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderColor: CONFIGURATION.lightGray,
                      borderBottomWidth: 1,
                      paddingVertical: 20,
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setopen1(!open1);
                      }}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: CONFIGURATION.TextBold,
                          color: CONFIGURATION.TextDarkBlack,
                        }}>
                        Personal Information
                      </Text>
                      {open1 ? (
                        <Image
                          resizeMode={'contain'}
                          style={{
                            height: 10,
                            width: 10,
                            marginTop: 5,
                            marginLeft: 10,
                          }}
                          source={require('./../../assetss/up.png')}
                        />
                      ) : (
                        <Image
                          resizeMode={'contain'}
                          style={{
                            height: 10,
                            width: 10,
                            marginTop: 5,
                            marginLeft: 10,
                          }}
                          source={require('./../../assetss/down.png')}
                        />
                      )}
                    </TouchableOpacity>
                    <Image
                      resizeMode={'contain'}
                      style={{height: 30, width: 30}}
                      source={require('./../../assetss/edit.png')}
                    />
                  </View>
                  {open1 ? (
                    <View
                      style={{
                        backgroundColor: CONFIGURATION.white,
                        overflow: 'hidden',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Name :
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            {profile.fullName}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Email :
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            {email}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Birthday :
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            {profile.dateOfBirth}
                          </Text>
                        </View>
                      </View>
                      {/* <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Occupation :
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            Businessmen
                          </Text>
                        </View>
                      </View> */}
                      {/* <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Country :
                        </Text>
                        <View style={style.textV}>
                          <Image
                            style={{ height: 15, width: 15, marginRight: 10 }}
                            source={require('./../../assetss/usaflag.png')}
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            USA
                          </Text>
                        </View>
                      </View> */}
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Phone No. :
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            {profile.mobileNum}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Landline No. :
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            {profile.landlineNum}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Package start to end :
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            10 Mar, 20 - 20 Mar, 21
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{
                    width: width - 40,
                    marginHorizontal: 20,
                    backgroundColor: CONFIGURATION.white,
                    marginBottom: 20,
                    elevation: 2,
                    paddingHorizontal: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderColor: CONFIGURATION.lightGray,
                      borderBottomWidth: 1,
                      paddingVertical: 20,
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setopen2(!open2);
                      }}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: CONFIGURATION.TextBold,
                          color: CONFIGURATION.TextDarkBlack,
                        }}>
                        Body Measurements
                      </Text>
                      {open2 ? (
                        <Image
                          resizeMode={'contain'}
                          style={{
                            height: 10,
                            width: 10,
                            marginTop: 5,
                            marginLeft: 10,
                          }}
                          source={require('./../../assetss/up.png')}
                        />
                      ) : (
                        <Image
                          resizeMode={'contain'}
                          style={{
                            height: 10,
                            width: 10,
                            marginTop: 5,
                            marginLeft: 10,
                          }}
                          source={require('./../../assetss/down.png')}
                        />
                      )}
                    </TouchableOpacity>
                    <Image
                      resizeMode={'contain'}
                      style={{height: 30, width: 30}}
                      source={require('./../../assetss/edit.png')}
                    />
                  </View>
                  {open2 ? (
                    <View
                      style={{
                        backgroundColor: CONFIGURATION.white,
                        overflow: 'hidden',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginHorizontal: 20,
                          justifyContent: 'space-between',
                          marginTop: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '48%',
                          }}>
                          <Image
                            style={{height: 35, width: 35}}
                            source={require('./../../assetss/weight.png')}
                          />
                          <View style={{marginLeft: 10}}>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 20,
                                fontFamily: CONFIGURATION.TextBold,
                                color: CONFIGURATION.TextDarkBlack,
                              }}>
                              {getLastDailyWeight()} kg
                              {/* {healthProfile.weight.currentWeight ? healthProfile.weight.currentWeight : '0'} kg */}
                            </Text>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 11,
                                fontFamily: CONFIGURATION.TextBold,
                                color: CONFIGURATION.TextDarkGray,
                              }}>
                              Current Weight
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '48%',
                          }}>
                          <Image
                            style={{height: 35, width: 35}}
                            source={require('./../../assetss/weight.png')}
                          />
                          <View style={{marginHorizontal: 10}}>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 20,
                                fontFamily: CONFIGURATION.TextBold,
                                color: CONFIGURATION.TextDarkBlack,
                              }}>
                              {healthProfile.weight.targetWeight
                                ? healthProfile.weight.targetWeight
                                : '0'}{' '}
                              kg
                            </Text>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 11,
                                fontFamily: CONFIGURATION.TextBold,
                                color: CONFIGURATION.TextDarkGray,
                              }}>
                              Target Weight
                            </Text>
                          </View>
                        </View>
                      </View>
                      {/* <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Ideal body weight :
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            {healthProfile.weight.currentWeight ? healthProfile.weight.currentWeight : '0'}'{healthProfile.weight.targetWeight}{' '}
                            kg
                          </Text>
                        </View>
                      </View> */}
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Height :
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            {healthProfile.height.feet}'
                            {healthProfile.height.inches}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Thighs :
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            {healthProfile.bodyMeasurements.thighsCm} cm
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Arms :
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            {healthProfile.bodyMeasurements.armsCm} cm
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Waist :
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            {healthProfile.bodyMeasurements.waistCm} cm
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Hips :
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            {healthProfile.bodyMeasurements.hipsCm} cm
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Abdomen :
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            {healthProfile.bodyMeasurements.abdomenCm} cm
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Chest :
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            {healthProfile.bodyMeasurements.chestCm} cm
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Claves :
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            {healthProfile.bodyMeasurements.calvesCm} cm
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={{
                          fontFamily: CONFIGURATION.TextBold,
                          color: CONFIGURATION.blueBorder,
                          textDecorationLine: 'underline',
                          textAlign: 'center',
                          marginVertical: 15,
                        }}>
                        View measurement history
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{
                    width: width - 40,
                    marginHorizontal: 20,
                    backgroundColor: CONFIGURATION.white,
                    marginBottom: 20,
                    elevation: 2,
                    paddingHorizontal: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderColor: CONFIGURATION.lightGray,
                      borderBottomWidth: 1,
                      paddingVertical: 20,
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setopen3(!open3);
                      }}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: CONFIGURATION.TextBold,
                          color: CONFIGURATION.TextDarkBlack,
                        }}>
                        Body Compisition
                      </Text>
                      {open3 ? (
                        <Image
                          resizeMode={'contain'}
                          style={{
                            height: 10,
                            width: 10,
                            marginTop: 5,
                            marginLeft: 10,
                          }}
                          source={require('./../../assetss/up.png')}
                        />
                      ) : (
                        <Image
                          resizeMode={'contain'}
                          style={{
                            height: 10,
                            width: 10,
                            marginTop: 5,
                            marginLeft: 10,
                          }}
                          source={require('./../../assetss/down.png')}
                        />
                      )}
                    </TouchableOpacity>
                    <Image
                      resizeMode={'contain'}
                      style={{height: 30, width: 30}}
                      source={require('./../../assetss/edit.png')}
                    />
                  </View>
                  {open3 ? (
                    <View
                      style={{
                        backgroundColor: CONFIGURATION.white,
                        overflow: 'hidden',
                        zIndex: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Fat mass(kg)
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            {bodyFatMassKg ? bodyFatMassKg : ''} kg
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Body fat percentage(%)
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            {bodyFatPercentage ? bodyFatPercentage * 100 : ''} %
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Muscle mass(kg)
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            {muscleMassKg ? muscleMassKg : ''} Kg
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          width: width - 80,
                        }}>
                        <Text numberOfLines={1} style={style.textx}>
                          Muscle mass percentage(%)
                        </Text>
                        <View style={style.textV}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                            }}>
                            {muscleMassPercentage
                              ? muscleMassPercentage * 100
                              : ''}{' '}
                            %
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={{
                          fontFamily: CONFIGURATION.TextBold,
                          color: CONFIGURATION.blueBorder,
                          textDecorationLine: 'underline',
                          textAlign: 'center',
                          marginVertical: 15,
                        }}>
                        View history
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{
                    width: width - 40,
                    marginHorizontal: 20,
                    backgroundColor: CONFIGURATION.white,
                    marginBottom: 20,
                    elevation: 2,
                    paddingHorizontal: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderColor: CONFIGURATION.lightGray,
                      borderBottomWidth: 1,
                      paddingVertical: 20,
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setopen4(!open4);
                      }}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: CONFIGURATION.TextBold,
                          color: CONFIGURATION.TextDarkBlack,
                        }}>
                        Dietary history
                      </Text>
                      {open4 ? (
                        <Image
                          resizeMode={'contain'}
                          style={{
                            height: 10,
                            width: 10,
                            marginTop: 5,
                            marginLeft: 10,
                          }}
                          source={require('./../../assetss/up.png')}
                        />
                      ) : (
                        <Image
                          resizeMode={'contain'}
                          style={{
                            height: 10,
                            width: 10,
                            marginTop: 5,
                            marginLeft: 10,
                          }}
                          source={require('./../../assetss/down.png')}
                        />
                      )}
                    </TouchableOpacity>
                    <Image
                      resizeMode={'contain'}
                      style={{height: 30, width: 30}}
                      source={require('./../../assetss/edit.png')}
                    />
                  </View>
                  {open4 ? (
                    <View
                      style={{
                        backgroundColor: CONFIGURATION.white,
                        overflow: 'hidden',
                        zIndex: 10,
                      }}>
                      {/* <View
                        style={{
                          paddingVertical: 15,
                          borderColor: CONFIGURATION.lightGray,
                          borderBottomWidth: 1,
                        }}>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image
                            style={{ height: 35, width: 35 }}
                            source={require('./../../assetss/apple.png')}
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 16,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                              marginLeft: 10,
                            }}>
                            Preffered type of diet
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                          <TouchableOpacity
                            style={{
                              backgroundColor: CONFIGURATION.lightGray,
                              paddingVertical: 7,
                              paddingHorizontal: 10,
                            }}>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 14,
                                fontFamily: CONFIGURATION.TextBold,
                                color: CONFIGURATION.TextDarkGray,
                              }}>
                              Pescatarian
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              backgroundColor: CONFIGURATION.lightGray,
                              paddingVertical: 7,
                              paddingHorizontal: 10,
                              marginLeft: 10,
                            }}>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 14,
                                fontFamily: CONFIGURATION.TextBold,
                                color: CONFIGURATION.TextDarkGray,
                              }}>
                              Locavore
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View> */}
                      <View
                        style={{
                          paddingVertical: 15,
                          borderColor: CONFIGURATION.lightGray,
                          borderBottomWidth: 1,
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            style={{height: 35, width: 35}}
                            source={require('./../../assetss/alss.png')}
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 16,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                              marginLeft: 10,
                            }}>
                            Allergies/Food Intolerance
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                          <TouchableOpacity
                            style={{
                              backgroundColor: CONFIGURATION.lightGray,
                              paddingVertical: 7,
                              paddingHorizontal: 10,
                            }}>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 14,
                                fontFamily: CONFIGURATION.TextBold,
                                color: CONFIGURATION.TextDarkGray,
                              }}>
                              {healthProfile.foodIntolerance}
                            </Text>
                          </TouchableOpacity>
                        </View>

                        {/* <Text
                          style={{
                            fontSize: 14,
                            marginTop: 10,
                            fontFamily: CONFIGURATION.TextRegular,
                            color: CONFIGURATION.TextDarkGray,
                          }}>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry
                        </Text> */}
                      </View>
                      {/* <View
                        style={{
                          paddingVertical: 15,
                          borderColor: CONFIGURATION.lightGray,
                          borderBottomWidth: 1,
                        }}>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image
                            style={{ height: 35, width: 35 }}
                            source={require('./../../assetss/apple.png')}
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 16,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                              marginLeft: 10,
                            }}>
                            Food Intolerance
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            alignItems: 'center',
                            backgroundColor: CONFIGURATION.lightGray,
                            padding: 10,
                            borderRadius: 10,
                          }}>
                          <Image
                            resizeMode={'contain'}
                            style={{ height: 40, width: 40 }}
                            source={require('./../../assetss/PDF.png')}
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                              marginLeft: 15,
                            }}>
                            Diet plan.pdf
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontFamily: CONFIGURATION.TextBold,
                            color: CONFIGURATION.blueBorder,
                            textDecorationLine: 'underline',
                            textAlign: 'left',
                            marginTop: 15,
                          }}>
                          View More
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            marginTop: 15,
                            fontFamily: CONFIGURATION.TextRegular,
                            color: CONFIGURATION.TextDarkGray,
                          }}>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry
                        </Text>
                      </View> */}
                    </View>
                  ) : null}
                </View>
                <View
                  style={{
                    width: width - 40,
                    marginHorizontal: 20,
                    backgroundColor: CONFIGURATION.white,
                    marginBottom: 20,
                    elevation: 2,
                    paddingHorizontal: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderColor: CONFIGURATION.lightGray,
                      borderBottomWidth: 1,
                      paddingVertical: 20,
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setopen5(!open5);
                      }}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: CONFIGURATION.TextBold,
                          color: CONFIGURATION.TextDarkBlack,
                        }}>
                        Medical history
                      </Text>
                      {open5 ? (
                        <Image
                          resizeMode={'contain'}
                          style={{
                            height: 10,
                            width: 10,
                            marginTop: 5,
                            marginLeft: 10,
                          }}
                          source={require('./../../assetss/up.png')}
                        />
                      ) : (
                        <Image
                          resizeMode={'contain'}
                          style={{
                            height: 10,
                            width: 10,
                            marginTop: 5,
                            marginLeft: 10,
                          }}
                          source={require('./../../assetss/down.png')}
                        />
                      )}
                    </TouchableOpacity>
                    <Image
                      resizeMode={'contain'}
                      style={{height: 30, width: 30}}
                      source={require('./../../assetss/edit.png')}
                    />
                  </View>
                  {open5 ? (
                    <View
                      style={{
                        backgroundColor: CONFIGURATION.white,
                        overflow: 'hidden',
                        zIndex: 10,
                      }}>
                      <View
                        style={{
                          paddingVertical: 15,
                          borderColor: CONFIGURATION.lightGray,
                          borderBottomWidth: 1,
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            style={{height: 35, width: 35}}
                            source={require('./../../assetss/Preg.png')}
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 16,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                              marginLeft: 10,
                            }}>
                            Pregnancy history
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            marginBottom: 10,
                          }}>
                          <TouchableOpacity
                            style={{
                              backgroundColor: CONFIGURATION.lightGray,
                              paddingVertical: 7,
                              paddingHorizontal: 10,
                            }}>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 14,
                                fontFamily: CONFIGURATION.TextBold,
                                color: CONFIGURATION.TextDarkGray,
                              }}>
                              {healthProfile.pregnancyHistory.pregnancyCount
                                ? healthProfile.pregnancyHistory.pregnancyCount
                                : '0'}{' '}
                              time pregnancy
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginVertical: 10,
                            width: width - 80,
                          }}>
                          <Text numberOfLines={1} style={style.textx}>
                            Begining of lactation :
                          </Text>
                          <View style={style.textV}>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 14,
                                fontFamily: CONFIGURATION.TextBold,
                                color: CONFIGURATION.TextDarkBlack,
                              }}>
                              {
                                healthProfile.pregnancyHistory
                                  .firstDayOfLactation
                              }
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginVertical: 10,
                            width: width - 80,
                          }}>
                          <Text numberOfLines={1} style={style.textx}>
                            Duration of lactation :
                          </Text>
                          <View style={style.textV}>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 14,
                                fontFamily: CONFIGURATION.TextBold,
                                color: CONFIGURATION.TextDarkBlack,
                              }}>
                              {healthProfile.pregnancyHistory
                                .lactationDurationMonths
                                ? healthProfile.pregnancyHistory
                                    .lactationDurationMonths
                                : '0'}{' '}
                              Months
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          paddingVertical: 15,
                          borderColor: CONFIGURATION.lightGray,
                          borderBottomWidth: 1,
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            style={{height: 35, width: 35}}
                            source={require('./../../assetss/corona.png')}
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 16,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                              marginLeft: 10,
                            }}>
                            Ailments/ illnesses (if any)
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                          {healthProfile.medicalCondition ? (
                            <TouchableOpacity
                              style={{
                                backgroundColor: CONFIGURATION.lightGray,
                                paddingVertical: 7,
                                paddingHorizontal: 10,
                              }}>
                              <Text
                                numberOfLines={1}
                                style={{
                                  fontSize: 14,
                                  fontFamily: CONFIGURATION.TextBold,
                                  color: CONFIGURATION.TextDarkGray,
                                }}>
                                {healthProfile.medicalCondition}
                              </Text>
                            </TouchableOpacity>
                          ) : null}
                        </View>

                        {/* <Text
                          style={{
                            fontSize: 14,
                            marginTop: 10,
                            fontFamily: CONFIGURATION.TextRegular,
                            color: CONFIGURATION.TextDarkGray,
                          }}>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry
                        </Text> */}
                      </View>
                      <View
                        style={{
                          paddingVertical: 15,
                          borderColor: CONFIGURATION.lightGray,
                          borderBottomWidth: 1,
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            style={{height: 35, width: 35}}
                            source={require('./../../assetss/corona.png')}
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 16,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                              marginLeft: 10,
                            }}>
                            Other
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 14,
                            marginTop: 10,
                            fontFamily: CONFIGURATION.TextRegular,
                            color: CONFIGURATION.TextDarkGray,
                          }}>
                          {healthProfile.pregnancyHistory.observation}
                        </Text>
                        {/* <Text
                          numberOfLines={1}
                          style={{
                            fontSize: 16,
                            fontFamily: CONFIGURATION.TextBold,
                            color: CONFIGURATION.TextDarkBlack,
                            marginVertical: 10,
                          }}>
                          Family History
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            marginTop: 0,
                            fontFamily: CONFIGURATION.TextRegular,
                            color: CONFIGURATION.TextDarkGray,
                          }}>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry
                        </Text> */}
                      </View>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{
                    width: width - 40,
                    marginHorizontal: 20,
                    backgroundColor: CONFIGURATION.white,
                    marginBottom: 20,
                    elevation: 2,
                    paddingHorizontal: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderColor: CONFIGURATION.lightGray,
                      borderBottomWidth: 1,
                      paddingVertical: 20,
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setopen6(!open6);
                      }}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: CONFIGURATION.TextBold,
                          color: CONFIGURATION.TextDarkBlack,
                        }}>
                        Lifestyle
                      </Text>
                      {open6 ? (
                        <Image
                          resizeMode={'contain'}
                          style={{
                            height: 10,
                            width: 10,
                            marginTop: 5,
                            marginLeft: 10,
                          }}
                          source={require('./../../assetss/up.png')}
                        />
                      ) : (
                        <Image
                          resizeMode={'contain'}
                          style={{
                            height: 10,
                            width: 10,
                            marginTop: 5,
                            marginLeft: 10,
                          }}
                          source={require('./../../assetss/down.png')}
                        />
                      )}
                    </TouchableOpacity>
                    <Image
                      resizeMode={'contain'}
                      style={{height: 30, width: 30}}
                      source={require('./../../assetss/edit.png')}
                    />
                  </View>
                  {open6 ? (
                    <View
                      style={{
                        backgroundColor: CONFIGURATION.white,
                        overflow: 'hidden',
                        zIndex: 10,
                      }}>
                      <View
                        style={{
                          paddingVertical: 15,
                          borderColor: CONFIGURATION.lightGray,
                          borderBottomWidth: 1,
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            style={{height: 35, width: 35}}
                            source={require('./../../assetss/user.png')}
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 16,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                              marginLeft: 10,
                            }}>
                            Preferred type coaching type
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            marginBottom: 10,
                          }}>
                          <TouchableOpacity
                            style={{
                              backgroundColor: CONFIGURATION.lightGray,
                              paddingVertical: 7,
                              paddingHorizontal: 10,
                            }}>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 14,
                                fontFamily: CONFIGURATION.TextBold,
                                color: CONFIGURATION.TextDarkGray,
                              }}>
                              {healthProfile.coachingType}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View
                        style={{
                          paddingVertical: 15,
                          borderColor: CONFIGURATION.lightGray,
                          borderBottomWidth: 1,
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            style={{height: 35, width: 35}}
                            source={require('./../../assetss/tree.png')}
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 16,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                              marginLeft: 10,
                            }}>
                            Activity Level
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            marginBottom: 10,
                          }}>
                          <TouchableOpacity
                            style={{
                              backgroundColor: CONFIGURATION.lightGray,
                              paddingVertical: 7,
                              paddingHorizontal: 10,
                            }}>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 14,
                                fontFamily: CONFIGURATION.TextBold,
                                color: CONFIGURATION.TextDarkGray,
                              }}>
                              {healthProfile.physicalActivityLevel}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View
                        style={{
                          paddingVertical: 15,
                          borderColor: CONFIGURATION.lightGray,
                          borderBottomWidth: 1,
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            style={{height: 35, width: 35}}
                            source={require('./../../assetss/boll.png')}
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 16,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                              marginLeft: 10,
                            }}>
                            Sport
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 14,
                            marginTop: 10,
                            fontFamily: CONFIGURATION.TextRegular,
                            color: CONFIGURATION.TextDarkGray,
                          }}>
                          {healthProfile.sports.description
                            ? healthProfile.sports.description
                            : ''}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginVertical: 10,
                            width: width - 80,
                          }}>
                          <Text numberOfLines={1} style={style.textx}>
                            Frequency :
                          </Text>
                          <View style={style.textV}>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 14,
                                fontFamily: CONFIGURATION.TextBold,
                                color: CONFIGURATION.TextDarkBlack,
                              }}>
                              {healthProfile.sports.frequency
                                ? healthProfile.sports.frequency
                                : ''}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          paddingVertical: 15,
                          borderColor: CONFIGURATION.lightGray,
                          borderBottomWidth: 1,
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            style={{height: 35, width: 35}}
                            source={require('./../../assetss/walk.png')}
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 16,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                              marginLeft: 10,
                            }}>
                            Do you drink alcohol?
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                          <TouchableOpacity
                            style={{
                              backgroundColor: CONFIGURATION.lightGray,
                              paddingVertical: 7,
                              paddingHorizontal: 10,
                            }}>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 14,
                                fontFamily: CONFIGURATION.TextBold,
                                color: CONFIGURATION.TextDarkGray,
                              }}>
                              {healthProfile.alcoholIntake.doYouDrink === true
                                ? 'YES'
                                : 'NO'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        {/* 
                        <Text
                          style={{
                            fontSize: 14,
                            marginTop: 10,
                            fontFamily: CONFIGURATION.TextRegular,
                            color: CONFIGURATION.TextDarkGray,
                          }}>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry
                        </Text> */}
                      </View>
                      {/* <View
                        style={{
                          paddingVertical: 15,
                          borderColor: CONFIGURATION.lightGray,
                          borderBottomWidth: 1,
                        }}>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image
                            style={{ height: 35, width: 35 }}
                            source={require('./../../assetss/spring.png')}
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 16,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                              marginLeft: 10,
                            }}>
                            Bowel movement
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                          <TouchableOpacity
                            style={{
                              backgroundColor: CONFIGURATION.lightGray,
                              paddingVertical: 7,
                              paddingHorizontal: 10,
                            }}>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 14,
                                fontFamily: CONFIGURATION.TextBold,
                                color: CONFIGURATION.TextDarkGray,
                              }}>
                              Constipation
                            </Text>
                          </TouchableOpacity>
                        </View>

                        <Text
                          style={{
                            fontSize: 14,
                            marginTop: 10,
                            fontFamily: CONFIGURATION.TextRegular,
                            color: CONFIGURATION.TextDarkGray,
                          }}>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry
                        </Text>
                      </View> */}
                      <View
                        style={{
                          paddingVertical: 15,
                          borderColor: CONFIGURATION.lightGray,
                          borderBottomWidth: 1,
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            style={{height: 35, width: 35}}
                            source={require('./../../assetss/bed.png')}
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 16,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.TextDarkBlack,
                              marginLeft: 10,
                            }}>
                            Sleep pattern
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                          {healthProfile.hoursOfSleep ? (
                            <TouchableOpacity
                              style={{
                                backgroundColor: CONFIGURATION.lightGray,
                                paddingVertical: 7,
                                paddingHorizontal: 10,
                              }}>
                              <Text
                                numberOfLines={1}
                                style={{
                                  fontSize: 14,
                                  fontFamily: CONFIGURATION.TextBold,
                                  color: CONFIGURATION.TextDarkGray,
                                }}>
                                About{' '}
                                {healthProfile.hoursOfSleep
                                  ? healthProfile.hoursOfSleep
                                  : ''}{' '}
                                hours
                              </Text>
                            </TouchableOpacity>
                          ) : null}
                        </View>
                        {/* 
                        <Text
                          style={{
                            fontSize: 14,
                            marginTop: 10,
                            fontFamily: CONFIGURATION.TextRegular,
                            color: CONFIGURATION.TextDarkGray,
                          }}>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry
                        </Text> */}
                      </View>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{
                    width: width - 40,
                    marginHorizontal: 20,
                    backgroundColor: CONFIGURATION.white,
                    marginBottom: 20,
                    elevation: 2,
                    paddingHorizontal: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderColor: CONFIGURATION.lightGray,
                      borderBottomWidth: 1,
                      paddingVertical: 20,
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setopen7(!open7);
                      }}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: CONFIGURATION.TextBold,
                          color: CONFIGURATION.TextDarkBlack,
                        }}>
                        Notes & Observations
                      </Text>
                      {open7 ? (
                        <Image
                          resizeMode={'contain'}
                          style={{
                            height: 10,
                            width: 10,
                            marginTop: 5,
                            marginLeft: 10,
                          }}
                          source={require('./../../assetss/up.png')}
                        />
                      ) : (
                        <Image
                          resizeMode={'contain'}
                          style={{
                            height: 10,
                            width: 10,
                            marginTop: 5,
                            marginLeft: 10,
                          }}
                          source={require('./../../assetss/down.png')}
                        />
                      )}
                    </TouchableOpacity>
                    <Image
                      resizeMode={'contain'}
                      style={{height: 30, width: 30}}
                      source={require('./../../assetss/edit.png')}
                    />
                  </View>
                  {open7 ? (
                    <View
                      style={{
                        backgroundColor: CONFIGURATION.white,
                        overflow: 'hidden',
                        zIndex: 10,
                      }}>
                      <View
                        style={{
                          paddingVertical: 15,
                          borderColor: CONFIGURATION.lightGray,
                          borderBottomWidth: 1,
                        }}>
                        <TouchableOpacity
                          //onPress={showDatepicker}
                          onPress={() => {
                            showDatepicker();
                          }}
                          style={[
                            style.InputBox,
                            {
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: 15,
                            },
                          ]}>
                          <TextInput
                            style={[style.textInput, {width: '85%'}]}
                            placeholder="Select Date"
                            value={selectDate}
                            placeholderTextColor={
                              CONFIGURATION.loginpalceholder
                            }
                            editable={false}
                          />
                          <Icon
                            name="calendar"
                            size={18}
                            color={CONFIGURATION.loginIconeye}
                          />
                        </TouchableOpacity>
                        <View
                          style={[
                            style.InputBox,
                            {
                              flexDirection: 'row',
                              // alignItems: 'center',
                              marginTop: 15,
                            },
                          ]}>
                          <TextInput
                            style={[
                              style.textInput,
                              {width: '90%', height: 100, textAlign: 'auto'},
                            ]}
                            placeholder="Write Notes"
                            value={writeNotes}
                            placeholderTextColor={
                              CONFIGURATION.loginpalceholder
                            }
                            multiline={true}
                            onChangeText={text => {
                              setwriteNotes(text);
                            }}
                          />
                        </View>
                        {show && (
                          <DateTimePickerModal
                            isVisible={isDate}
                            mode="date"
                            format="YYYY-MM-DD"
                            maximumDate={new Date()}
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                          />
                        )}
                        <TouchableOpacity
                          style={{
                            alignSelf: 'center',
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40%',
                            backgroundColor: CONFIGURATION.primaryGreen,
                            marginVertical: 15,
                            borderRadius: 50,
                          }}
                          onPress={() => {
                            WriteNotesData();
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: CONFIGURATION.TextBold,
                              color: CONFIGURATION.white,
                            }}>
                            Add
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View style={{flex: 1.0}}>
                        <FlatList
                          data={
                            notesData && notesData.length > 0 ? notesData : null
                          }
                          // inverted={true}
                          showsVerticalScrollIndicator={false}
                          extraData={notesData}
                          keyExtractor={(item, index) => item.id}
                          renderItem={({item, index}) => {
                            return <Notes item={item} />;
                          }}
                        />
                      </View>
                    </View>
                  ) : null}
                </View>
              </>
            ) : null}
            {selected == 1 ? (
              <>
                <View
                  style={{
                    marginTop: 20,
                    backgroundColor: CONFIGURATION.white,
                    paddingVertical: 10,
                    elevation: 2,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginHorizontal: 20,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        var monthS = moment(month, 'MMMM, YYYY')
                          .subtract('month', 1)
                          .format('MMMM, YYYY');
                        setmonth(monthS);
                      }}>
                      <Icon2
                        name="chevron-left"
                        size={25}
                        color={CONFIGURATION.TextDarkBlack}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        props.onClick(month);
                      }}>
                      <Text
                        style={{
                          fontFamily: CONFIGURATION.TextBold,
                          color: CONFIGURATION.TextDarkBlack,
                          fontSize: 18,
                        }}>
                        {month}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        var monthS = moment(month, 'MMMM, YYYY')
                          .add('month', 1)
                          .format('MMMM, YYYY');
                        setmonth(monthS);
                      }}>
                      <Icon2
                        name="chevron-right"
                        size={25}
                        color={CONFIGURATION.TextDarkBlack}
                      />
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={Dates}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{marginHorizontal: 20, marginVertical: 10}}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setfixDate(
                              moment(item + ' ' + month).format('YYYY-MM-DD'),
                            );
                            if (selectedNames == 'Meal of the day') {
                              getMealComments(
                                moment(item + ' ' + month).format('YYYY-MM-DD'),
                              );
                            } else if (selectedNames == 'Exercise of the day') {
                              getExcersizeComment(
                                moment(item + ' ' + month).format('YYYY-MM-DD'),
                              );
                            } else if (selectedNames == 'Water Intake') {
                              getWaterInstackUser(
                                moment(item + ' ' + month).format('YYYY-MM-DD'),
                              );
                            } else if (selectedNames == 'Weight') {
                              getWaights(
                                moment(item + ' ' + month).format('YYYY-MM-DD'),
                              );
                            }
                          }}
                          style={{
                            height: 70,
                            width: width / 6 - 13,
                            backgroundColor:
                              moment(item + ' ' + month).format('YYYY-MM-DD') ==
                              fixDate
                                ? CONFIGURATION.btnColorGreen
                                : CONFIGURATION.lightGray,
                            marginHorizontal: 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: CONFIGURATION.TextBold,
                              fontSize: 16,
                              color:
                                moment(item + ' ' + month).format(
                                  'YYYY-MM-DD',
                                ) == fixDate
                                  ? CONFIGURATION.white
                                  : CONFIGURATION.TextDarkGray,
                            }}>
                            {item}
                          </Text>
                          <Text
                            style={{
                              fontFamily: CONFIGURATION.TextRegular,
                              fontSize: 14,
                              color:
                                moment(item + ' ' + month).format(
                                  'YYYY-MM-DD',
                                ) == fixDate
                                  ? CONFIGURATION.white
                                  : CONFIGURATION.TextDarkGray,
                            }}>
                            {moment(item + month).format('ddd')}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                    keyExtractor={item => item.id}
                  />

                  {/* <Calender
                    onClick={date => {
                      props.navigation.navigate('CalenderView', { date });
                    }}
                  /> */}

                  <TouchableOpacity
                    onPress={() => {
                      refRBSheet.current.open();
                    }}
                    style={{
                      borderColor: CONFIGURATION.loginInputBorder,
                      borderWidth: 1,
                      width: width - 40,
                      marginHorizontal: 20,
                      padding: 15,
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontFamily: CONFIGURATION.TextRegular}}>
                      {selectedNames}
                    </Text>
                    <Icon2
                      name="chevron-down"
                      size={15}
                      color={CONFIGURATION.TextDarkBlack}
                    />
                  </TouchableOpacity>
                </View>

                {selectedNames == 'Meal of the day' ? (
                  <>
                    <View>
                      {commentLoading ? (
                        <ActivityIndicator
                          style={{
                            marginTop: 26,
                            alignSelf: 'center',
                            marginBottom: 100,
                          }}
                          size="small"
                          color="#000"
                        />
                      ) : (
                        <>
                          {isError ? (
                            <View style={{flex: 1.0, marginBottom: 56}}>
                              <Text
                                style={{
                                  fontFamily: CONFIGURATION.TextBold,
                                  marginHorizontal: 20,
                                  marginVertical: 20,
                                  fontSize: 15,
                                  alignSelf: 'center',
                                }}>
                                No Data Found
                              </Text>
                            </View>
                          ) : (
                            <>
                              <Text
                                style={{
                                  fontFamily: CONFIGURATION.TextBold,
                                  marginHorizontal: 20,
                                  marginVertical: 20,
                                  fontSize: 24,
                                }}>
                                Meal of the day
                              </Text>
                              <View
                                style={{
                                  width: width - 40,
                                  marginHorizontal: 20,
                                  padding: 20,
                                  backgroundColor: CONFIGURATION.white,
                                  elevation: 2,
                                  marginBottom: 20,
                                }}>
                                <Text
                                  style={{fontFamily: CONFIGURATION.TextBold}}>
                                  Total Calories Consumed
                                </Text>
                                <View
                                  style={{
                                    height: 10,
                                    width: width - 80,
                                    backgroundColor: CONFIGURATION.lightGray,
                                    borderRadius: 20,
                                    marginVertical: 20,
                                  }}>
                                  <View
                                    style={{
                                      height: 10,
                                      width: width - 150,
                                      borderRadius: 20,
                                      backgroundColor: CONFIGURATION.DarkYellow,
                                    }}></View>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: CONFIGURATION.TextRegular,
                                      color: CONFIGURATION.TextDarkGray,
                                    }}>
                                    Consumed
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: CONFIGURATION.TextRegular,
                                      color: CONFIGURATION.TextDarkGray,
                                    }}>
                                    Goal
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: CONFIGURATION.TextBold,
                                      color: CONFIGURATION.TextDarkBlack,
                                    }}>
                                    800
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: CONFIGURATION.TextBold,
                                      color: CONFIGURATION.TextDarkGray,
                                    }}>
                                    1200
                                  </Text>
                                </View>
                              </View>
                              <TouchableOpacity
                                onPress={() => {
                                  refRBPopup.current.open();
                                }}
                                style={{
                                  width: width - 40,
                                  marginHorizontal: 20,
                                  padding: 15,
                                  flexDirection: 'row',
                                  alignItems: 'flex-start',
                                  justifyContent: 'space-between',
                                  backgroundColor: CONFIGURATION.white,
                                  elevation: 2,
                                  marginBottom: 20,
                                }}>
                                <Text
                                  style={{
                                    fontFamily: CONFIGURATION.TextRegular,
                                  }}>
                                  {title}
                                </Text>
                                <Icon2
                                  name="chevron-down"
                                  size={15}
                                  color={CONFIGURATION.TextDarkBlack}
                                />
                              </TouchableOpacity>
                              <View
                                style={{
                                  height: 50,
                                  width: width - 40,
                                  marginHorizontal: 20,
                                  backgroundColor: CONFIGURATION.white,
                                  elevation: 2,
                                  borderRadius: 50,
                                  marginBottom: 20,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  paddingHorizontal: 5,
                                  justifyContent: 'space-between',
                                }}>
                                <TouchableOpacity
                                  onPress={() => {
                                    setmealDay(0);
                                  }}
                                  style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 45,
                                    width: width / 3 - 18,
                                    backgroundColor:
                                      mealDay == 0
                                        ? CONFIGURATION.DarkYellow
                                        : CONFIGURATION.white,
                                    borderRadius: 50,
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily:
                                        mealDay == 0
                                          ? CONFIGURATION.TextBold
                                          : CONFIGURATION.TextRegular,
                                      color:
                                        mealDay == 0
                                          ? CONFIGURATION.white
                                          : CONFIGURATION.TextDarkBlack,
                                    }}>
                                    Details
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => {
                                    setmealDay(1);
                                  }}
                                  style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 45,
                                    width: width / 3 - 18,
                                    backgroundColor:
                                      mealDay == 1
                                        ? CONFIGURATION.DarkYellow
                                        : CONFIGURATION.white,
                                    borderRadius: 50,
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily:
                                        mealDay == 1
                                          ? CONFIGURATION.TextBold
                                          : CONFIGURATION.TextRegular,
                                      color:
                                        mealDay == 1
                                          ? CONFIGURATION.white
                                          : CONFIGURATION.TextDarkBlack,
                                    }}>
                                    Comments
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => {
                                    setmealDay(2);
                                  }}
                                  style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 45,
                                    width: width / 3 - 18,
                                    backgroundColor:
                                      mealDay == 2
                                        ? CONFIGURATION.DarkYellow
                                        : CONFIGURATION.white,
                                    borderRadius: 50,
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily:
                                        mealDay == 2
                                          ? CONFIGURATION.TextBold
                                          : CONFIGURATION.TextRegular,
                                      color:
                                        mealDay == 2
                                          ? CONFIGURATION.white
                                          : CONFIGURATION.TextDarkBlack,
                                    }}>
                                    Recommended
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              <View
                                style={{
                                  width: width - 40,
                                  marginHorizontal: 20,
                                  backgroundColor: CONFIGURATION.white,
                                  marginBottom: 20,
                                  elevation: 2,
                                  paddingHorizontal: 20,
                                }}>
                                {mealDay == 0 ? (
                                  <>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderColor: CONFIGURATION.lightGray,
                                        borderBottomWidth: 1,
                                      }}>
                                      <Image
                                        resizeMode={'contain'}
                                        source={require('./../../assetss/breakfast.png')}
                                        style={{height: 40, width: 40}}
                                      />
                                      <View
                                        style={{
                                          justifyContent: 'center',
                                          paddingVertical: 20,
                                          width: '63%',
                                        }}>
                                        <TouchableOpacity
                                          onPress={() => {
                                            setopen8(!open8);
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                          }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontFamily:
                                                CONFIGURATION.TextBold,
                                              color:
                                                CONFIGURATION.TextDarkBlack,
                                            }}>
                                            Breakfast
                                          </Text>
                                          {open8 ? (
                                            <Image
                                              resizeMode={'contain'}
                                              style={{
                                                height: 10,
                                                width: 10,
                                                marginTop: 5,
                                                marginLeft: 10,
                                              }}
                                              source={require('./../../assetss/up.png')}
                                            />
                                          ) : (
                                            <Image
                                              resizeMode={'contain'}
                                              style={{
                                                height: 10,
                                                width: 10,
                                                marginTop: 5,
                                                marginLeft: 10,
                                              }}
                                              source={require('./../../assetss/down.png')}
                                            />
                                          )}
                                        </TouchableOpacity>
                                        <Text
                                          style={{
                                            fontFamily:
                                              CONFIGURATION.TextRegular,
                                            color: CONFIGURATION.TextDarkGray,
                                            fontSize: 12,
                                          }}>
                                          Calorie consumed/goal : 200/400
                                        </Text>
                                      </View>
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          fontFamily: CONFIGURATION.TextRegular,
                                          color: CONFIGURATION.TextDarkGray,
                                        }}>
                                        09:00 AM
                                      </Text>
                                    </View>
                                    {open8 ? (
                                      <View
                                        style={{
                                          backgroundColor: CONFIGURATION.white,
                                          overflow: 'hidden',
                                          zIndex: 10,
                                        }}>
                                        <View
                                          style={{
                                            paddingVertical: 15,
                                            borderColor:
                                              CONFIGURATION.lightGray,
                                            borderBottomWidth: 1,
                                          }}>
                                          <Text
                                            style={{
                                              fontFamily:
                                                CONFIGURATION.TextRegular,
                                              color: CONFIGURATION.TextDarkGray,
                                            }}>
                                            Lorem Ipsum is simply dummy text of
                                            the printing and typesetting
                                            industry.
                                          </Text>
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              justifyContent: 'space-between',
                                            }}>
                                            <Image
                                              resizeMode={'contain'}
                                              source={require('./../../assetss/masala.png')}
                                              style={{height: 40, width: 40}}
                                            />
                                            <View
                                              style={{
                                                justifyContent: 'center',
                                                paddingVertical: 20,
                                                width: '63%',
                                              }}>
                                              <View
                                                style={{
                                                  flexDirection: 'row',
                                                  alignItems: 'center',
                                                }}>
                                                <Text
                                                  style={{
                                                    fontSize: 16,
                                                    fontFamily:
                                                      CONFIGURATION.TextBold,
                                                    color:
                                                      CONFIGURATION.TextDarkBlack,
                                                  }}>
                                                  Masala fish curry
                                                </Text>
                                              </View>
                                              <Text
                                                style={{
                                                  fontFamily:
                                                    CONFIGURATION.TextRegular,
                                                  color:
                                                    CONFIGURATION.TextDarkGray,
                                                  fontSize: 12,
                                                }}>
                                                320 cals I 1 Standard serving
                                              </Text>
                                            </View>
                                            <TouchableOpacity
                                              style={{
                                                backgroundColor:
                                                  CONFIGURATION.lightGray,
                                                paddingHorizontal: 10,
                                                paddingVertical: 5,
                                                borderRadius: 5,
                                              }}>
                                              <Text
                                                style={{
                                                  fontSize: 12,
                                                  fontFamily:
                                                    CONFIGURATION.TextRegular,
                                                  color:
                                                    CONFIGURATION.TextDarkGray,
                                                }}>
                                                Info
                                              </Text>
                                            </TouchableOpacity>
                                          </View>
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              marginBottom: 10,
                                            }}>
                                            <Image
                                              source={require('./../../assetss/food_1.png')}
                                              style={{
                                                height: 60,
                                                width: 60,
                                                borderRadius: 5,
                                                marginRight: 10,
                                              }}
                                            />
                                            <Image
                                              source={require('./../../assetss/food_2.png')}
                                              style={{
                                                height: 60,
                                                width: 60,
                                                borderRadius: 5,
                                                marginRight: 10,
                                              }}
                                            />
                                            <Image
                                              source={require('./../../assetss/food_3.png')}
                                              style={{
                                                height: 60,
                                                width: 60,
                                                borderRadius: 5,
                                                marginRight: 10,
                                              }}
                                            />
                                          </View>
                                        </View>
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                          }}>
                                          <Image
                                            resizeMode={'contain'}
                                            source={require('./../../assetss/banana.png')}
                                            style={{height: 40, width: 40}}
                                          />
                                          <View
                                            style={{
                                              justifyContent: 'center',
                                              paddingVertical: 20,
                                              width: '82%',
                                            }}>
                                            <View
                                              style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                              }}>
                                              <Text
                                                style={{
                                                  fontSize: 16,
                                                  fontFamily:
                                                    CONFIGURATION.TextBold,
                                                  color:
                                                    CONFIGURATION.TextDarkBlack,
                                                }}>
                                                Banana
                                              </Text>
                                            </View>
                                            <Text
                                              style={{
                                                fontFamily:
                                                  CONFIGURATION.TextRegular,
                                                color:
                                                  CONFIGURATION.TextDarkGray,
                                                fontSize: 12,
                                              }}>
                                              240 cals I 1 Standard serving
                                            </Text>
                                          </View>
                                        </View>
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                          }}>
                                          <View
                                            style={{
                                              width: '50%',
                                              backgroundColor:
                                                CONFIGURATION.lightGray,
                                              height: 80,
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                            }}>
                                            <Image
                                              resizeMode={'cover'}
                                              source={require('./../../assetss/orenge.png')}
                                              style={{height: 50, width: 50}}
                                            />
                                            <View style={{marginRight: 10}}>
                                              <Text
                                                style={{
                                                  fontSize: 16,
                                                  fontFamily:
                                                    CONFIGURATION.TextBold,
                                                  color:
                                                    CONFIGURATION.TextDarkBlack,
                                                }}>
                                                Good
                                              </Text>
                                              <Text
                                                style={{
                                                  fontFamily:
                                                    CONFIGURATION.TextRegular,
                                                  color:
                                                    CONFIGURATION.TextDarkGray,
                                                  fontSize: 12,
                                                }}>
                                                Client rate
                                              </Text>
                                            </View>
                                          </View>
                                          <TouchableOpacity
                                            style={{
                                              borderColor:
                                                CONFIGURATION.primaryGreen,
                                              borderWidth: 1,
                                              width: '45%',
                                              height: 50,
                                              borderRadius: 50,
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                            }}>
                                            <Text
                                              style={{
                                                fontFamily:
                                                  CONFIGURATION.TextBold,
                                                color:
                                                  CONFIGURATION.primaryGreen,
                                              }}>
                                              Rate Meal
                                            </Text>
                                          </TouchableOpacity>
                                        </View>
                                      </View>
                                    ) : null}
                                  </>
                                ) : null}
                                {mealDay == 1 ? (
                                  <>
                                    {commentArray && commentArray.length > 0 ? (
                                      <View style={{paddingVertical: 15}}>
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                          }}>
                                          <Text
                                            style={{
                                              fontSize: 18,
                                              fontFamily:
                                                CONFIGURATION.TextBold,
                                              color:
                                                CONFIGURATION.TextDarkBlack,
                                            }}>
                                            Comments
                                          </Text>
                                          <TouchableOpacity
                                            style={{
                                              borderColor:
                                                CONFIGURATION.primaryGreen,
                                              borderWidth: 1,
                                              width: '45%',
                                              height: 45,
                                              borderRadius: 50,
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                            }}>
                                            <Text
                                              style={{
                                                fontFamily:
                                                  CONFIGURATION.TextBold,
                                                color:
                                                  CONFIGURATION.primaryGreen,
                                              }}>
                                              Comment
                                            </Text>
                                          </TouchableOpacity>
                                        </View>

                                        <View style={{flex: 1.0}}>
                                          {commentArray.map((data, index) => {
                                            console.log(
                                              'DATA========>',
                                              JSON.stringify(data),
                                            );
                                            return (
                                              <View
                                                style={{
                                                  flexDirection: 'row',
                                                  justifyContent:
                                                    'space-between',
                                                  borderColor:
                                                    CONFIGURATION.lightGray,
                                                  borderBottomWidth: 1,
                                                  paddingVertical: 20,
                                                }}>
                                                <Image
                                                  style={{
                                                    height: 60,
                                                    width: 60,
                                                    borderRadius: 60 / 2,
                                                  }}
                                                  source={{
                                                    uri: data.author.profile
                                                      .profileImg,
                                                  }}
                                                />
                                                <View style={{width: '77%'}}>
                                                  <View
                                                    style={{
                                                      flexDirection: 'row',
                                                      alignItems: 'center',
                                                      justifyContent:
                                                        'space-between',
                                                    }}>
                                                    <Text
                                                      style={{
                                                        fontFamily:
                                                          CONFIGURATION.TextBold,
                                                        fontSize: 18,
                                                        color:
                                                          CONFIGURATION.TextDarkBlack,
                                                      }}>
                                                      {
                                                        data.author.profile
                                                          .fullName
                                                      }
                                                    </Text>
                                                    <Text
                                                      style={{
                                                        fontFamily:
                                                          CONFIGURATION.TextRegular,
                                                        fontSize: 12,
                                                        color:
                                                          CONFIGURATION.TextDarkGray,
                                                      }}>
                                                      12:20 PM
                                                    </Text>
                                                  </View>
                                                  <Text
                                                    style={{
                                                      fontFamily:
                                                        CONFIGURATION.TextRegular,
                                                      color:
                                                        CONFIGURATION.TextDarkGray,
                                                      marginVertical: 5,
                                                    }}>
                                                    {data.body}
                                                  </Text>
                                                  <TouchableOpacity
                                                    style={{
                                                      flexDirection: 'row',
                                                      alignItems: 'center',
                                                      marginTop: 10,
                                                    }}>
                                                    <Image
                                                      style={{
                                                        height: 20,
                                                        width: 20,
                                                      }}
                                                      source={require('./../../assetss/replay.png')}
                                                    />
                                                    <Text
                                                      style={{
                                                        fontFamily:
                                                          CONFIGURATION.TextBold,
                                                        color:
                                                          CONFIGURATION.TextDarkBlack,
                                                        fontSize: 12,
                                                      }}>
                                                      {' '}
                                                      Reply
                                                    </Text>
                                                  </TouchableOpacity>
                                                </View>
                                              </View>
                                            );
                                          })}
                                        </View>
                                      </View>
                                    ) : (
                                      <View style={{flex: 1.0}}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            fontFamily:
                                              CONFIGURATION.TextRegular,
                                            color: CONFIGURATION.TextDarkBlack,
                                            alignSelf: 'center',
                                          }}>
                                          Comments Not Availble
                                        </Text>
                                      </View>
                                    )}
                                  </>
                                ) : null}
                                {mealDay == 2 ? (
                                  <View style={{paddingVertical: 15}}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 18,
                                          fontFamily: CONFIGURATION.TextBold,
                                          color: CONFIGURATION.TextDarkBlack,
                                        }}>
                                        Recommended breakfast
                                      </Text>
                                      {/* <TouchableOpacity style={{ borderColor: CONFIGURATION.primaryGreen, borderWidth: 1, width: "45%", height: 45, borderRadius: 50, alignItems: "center", justifyContent: "center" }}>
                                                          <Text style={{ fontFamily: CONFIGURATION.TextBold, color: CONFIGURATION.primaryGreen }}>Comment</Text>
                                                      </TouchableOpacity> */}
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        borderColor: CONFIGURATION.lightGray,
                                        borderBottomWidth: 1,
                                        marginTop: 10,
                                      }}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          justifyContent: 'space-between',
                                        }}>
                                        <Image
                                          resizeMode={'contain'}
                                          source={require('./../../assetss/masala.png')}
                                          style={{height: 40, width: 40}}
                                        />
                                        <View
                                          style={{
                                            justifyContent: 'center',
                                            paddingVertical: 20,
                                            width: '63%',
                                          }}>
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                            }}>
                                            <Text
                                              style={{
                                                fontSize: 16,
                                                fontFamily:
                                                  CONFIGURATION.TextBold,
                                                color:
                                                  CONFIGURATION.TextDarkBlack,
                                              }}>
                                              Masala fish curry
                                            </Text>
                                          </View>
                                          <Text
                                            style={{
                                              fontFamily:
                                                CONFIGURATION.TextRegular,
                                              color: CONFIGURATION.TextDarkGray,
                                              fontSize: 12,
                                            }}>
                                            320 cals I 1 Standard serving
                                          </Text>
                                        </View>
                                        <TouchableOpacity
                                          style={{
                                            backgroundColor:
                                              CONFIGURATION.lightGray,
                                            paddingHorizontal: 10,
                                            paddingVertical: 5,
                                            borderRadius: 5,
                                          }}>
                                          <Text
                                            style={{
                                              fontSize: 12,
                                              fontFamily:
                                                CONFIGURATION.TextRegular,
                                              color: CONFIGURATION.TextDarkGray,
                                            }}>
                                            Info
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        borderColor: CONFIGURATION.lightGray,
                                        borderBottomWidth: 1,
                                        paddingVertical: 0,
                                      }}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          justifyContent: 'space-between',
                                        }}>
                                        <Image
                                          resizeMode={'contain'}
                                          source={require('./../../assetss/banana.png')}
                                          style={{height: 40, width: 40}}
                                        />
                                        <View
                                          style={{
                                            justifyContent: 'center',
                                            paddingVertical: 20,
                                            width: '82%',
                                          }}>
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                            }}>
                                            <Text
                                              style={{
                                                fontSize: 16,
                                                fontFamily:
                                                  CONFIGURATION.TextBold,
                                                color:
                                                  CONFIGURATION.TextDarkBlack,
                                              }}>
                                              Banana
                                            </Text>
                                          </View>
                                          <Text
                                            style={{
                                              fontFamily:
                                                CONFIGURATION.TextRegular,
                                              color: CONFIGURATION.TextDarkGray,
                                              fontSize: 12,
                                            }}>
                                            240 cals I 1 Standard serving
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                ) : null}
                              </View>
                            </>
                          )}
                        </>
                      )}
                    </View>
                  </>
                ) : null}
                {selectedNames == 'Exercise of the day' ? (
                  <>
                    {commentLoading ? (
                      <ActivityIndicator
                        style={{
                          marginTop: 26,
                          alignSelf: 'center',
                          marginBottom: 100,
                        }}
                        size="small"
                        color="#000"
                      />
                    ) : (
                      <>
                        {isError ? (
                          <View style={{flex: 1.0, marginBottom: 56}}>
                            <Text
                              style={{
                                fontFamily: CONFIGURATION.TextBold,
                                marginHorizontal: 20,
                                marginVertical: 20,
                                fontSize: 15,
                                alignSelf: 'center',
                              }}>
                              No Data Found
                            </Text>
                          </View>
                        ) : (
                          <View>
                            <Text
                              style={{
                                fontFamily: CONFIGURATION.TextBold,
                                marginHorizontal: 20,
                                marginVertical: 20,
                                fontSize: 24,
                              }}>
                              Exercise of the day
                            </Text>
                            <View
                              style={{
                                height: 50,
                                width: width - 40,
                                marginHorizontal: 20,
                                backgroundColor: CONFIGURATION.white,
                                elevation: 2,
                                borderRadius: 50,
                                marginBottom: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: 5,
                                justifyContent: 'space-between',
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  setmealDay2(0);
                                }}
                                style={{
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: 45,
                                  width: width / 3 - 18,
                                  backgroundColor:
                                    mealDay2 == 0
                                      ? CONFIGURATION.DarkYellow
                                      : CONFIGURATION.white,
                                  borderRadius: 50,
                                }}>
                                <Text
                                  style={{
                                    fontFamily:
                                      mealDay2 == 0
                                        ? CONFIGURATION.TextBold
                                        : CONFIGURATION.TextRegular,
                                    color:
                                      mealDay2 == 0
                                        ? CONFIGURATION.white
                                        : CONFIGURATION.TextDarkBlack,
                                  }}>
                                  Details
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  setmealDay2(1);
                                }}
                                style={{
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: 45,
                                  width: width / 3 - 18,
                                  backgroundColor:
                                    mealDay2 == 1
                                      ? CONFIGURATION.DarkYellow
                                      : CONFIGURATION.white,
                                  borderRadius: 50,
                                }}>
                                <Text
                                  style={{
                                    fontFamily:
                                      mealDay2 == 1
                                        ? CONFIGURATION.TextBold
                                        : CONFIGURATION.TextRegular,
                                    color:
                                      mealDay2 == 1
                                        ? CONFIGURATION.white
                                        : CONFIGURATION.TextDarkBlack,
                                  }}>
                                  Comments
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  setmealDay2(2);
                                }}
                                style={{
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: 45,
                                  width: width / 3 - 18,
                                  backgroundColor:
                                    mealDay2 == 2
                                      ? CONFIGURATION.DarkYellow
                                      : CONFIGURATION.white,
                                  borderRadius: 50,
                                }}>
                                <Text
                                  style={{
                                    fontFamily:
                                      mealDay2 == 2
                                        ? CONFIGURATION.TextBold
                                        : CONFIGURATION.TextRegular,
                                    color:
                                      mealDay2 == 2
                                        ? CONFIGURATION.white
                                        : CONFIGURATION.TextDarkBlack,
                                  }}>
                                  Recommended
                                </Text>
                              </TouchableOpacity>
                            </View>

                            {mealDay2 == 1 ? (
                              <>
                                <View style={{paddingVertical: 15}}>
                                  <View style={{flex: 1.0}}>
                                    {clientMealCommentsData[0].comments &&
                                    clientMealCommentsData[0].comments.length >
                                      0 ? (
                                      <>
                                        {clientMealCommentsData[0].comments.map(
                                          (data, index) => {
                                            console.log(
                                              'DATA========>',
                                              JSON.stringify(data),
                                            );
                                            return (
                                              <View
                                                style={{
                                                  flexDirection: 'row',
                                                  justifyContent:
                                                    'space-between',
                                                  borderColor:
                                                    CONFIGURATION.lightGray,
                                                  borderBottomWidth: 1,
                                                  paddingVertical: 20,
                                                }}>
                                                <Image
                                                  style={{
                                                    height: 60,
                                                    width: 60,
                                                    borderRadius: 60 / 2,
                                                  }}
                                                  source={{
                                                    uri: data.author.profile
                                                      .profileImg,
                                                  }}
                                                />
                                                <View style={{width: '77%'}}>
                                                  <View
                                                    style={{
                                                      flexDirection: 'row',
                                                      alignItems: 'center',
                                                      justifyContent:
                                                        'space-between',
                                                    }}>
                                                    <Text
                                                      style={{
                                                        fontFamily:
                                                          CONFIGURATION.TextBold,
                                                        fontSize: 18,
                                                        color:
                                                          CONFIGURATION.TextDarkBlack,
                                                      }}>
                                                      {
                                                        data.author.profile
                                                          .fullName
                                                      }
                                                    </Text>
                                                    <Text
                                                      style={{
                                                        fontFamily:
                                                          CONFIGURATION.TextRegular,
                                                        fontSize: 12,
                                                        color:
                                                          CONFIGURATION.TextDarkGray,
                                                      }}>
                                                      12:20 PM
                                                    </Text>
                                                  </View>
                                                  <Text
                                                    style={{
                                                      fontFamily:
                                                        CONFIGURATION.TextRegular,
                                                      color:
                                                        CONFIGURATION.TextDarkGray,
                                                      marginVertical: 5,
                                                    }}>
                                                    {data.body}
                                                  </Text>
                                                  <TouchableOpacity
                                                    style={{
                                                      flexDirection: 'row',
                                                      alignItems: 'center',
                                                      marginTop: 10,
                                                    }}>
                                                    <Image
                                                      style={{
                                                        height: 20,
                                                        width: 20,
                                                      }}
                                                      source={require('./../../assetss/replay.png')}
                                                    />
                                                    <Text
                                                      style={{
                                                        fontFamily:
                                                          CONFIGURATION.TextBold,
                                                        color:
                                                          CONFIGURATION.TextDarkBlack,
                                                        fontSize: 12,
                                                      }}>
                                                      {' '}
                                                      Reply
                                                    </Text>
                                                  </TouchableOpacity>
                                                </View>
                                              </View>
                                            );
                                          },
                                        )}
                                      </>
                                    ) : (
                                      <View style={{flex: 1.0}}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            fontFamily:
                                              CONFIGURATION.TextRegular,
                                            color: CONFIGURATION.TextDarkBlack,
                                            alignSelf: 'center',
                                          }}>
                                          Comments Not Availble
                                        </Text>
                                      </View>
                                    )}
                                  </View>
                                </View>
                              </>
                            ) : null}
                            {mealDay2 == 0 ? (
                              <>
                                <View
                                  style={{
                                    width: width - 40,
                                    marginHorizontal: 20,
                                    paddingHorizontal: 20,
                                    backgroundColor: CONFIGURATION.white,
                                    elevation: 2,
                                    marginBottom: 20,
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      borderColor: CONFIGURATION.lightGray,
                                      borderBottomWidth: 1,
                                    }}>
                                    <Image
                                      resizeMode={'contain'}
                                      source={require('./../../assetss/mens.png')}
                                      style={{height: 60, width: 60}}
                                    />
                                    <View
                                      style={{
                                        justifyContent: 'center',
                                        paddingVertical: 20,
                                        width: '77%',
                                      }}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          setopen9(!open9);
                                        }}
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            fontFamily: CONFIGURATION.TextBold,
                                            color: CONFIGURATION.TextDarkBlack,
                                          }}>
                                          Push ups
                                        </Text>
                                        {open9 ? (
                                          <Image
                                            resizeMode={'contain'}
                                            style={{
                                              height: 10,
                                              width: 10,
                                              marginTop: 5,
                                              marginLeft: 10,
                                            }}
                                            source={require('./../../assetss/up.png')}
                                          />
                                        ) : (
                                          <Image
                                            resizeMode={'contain'}
                                            style={{
                                              height: 10,
                                              width: 10,
                                              marginTop: 5,
                                              marginLeft: 10,
                                            }}
                                            source={require('./../../assetss/down.png')}
                                          />
                                        )}
                                      </TouchableOpacity>
                                      <Text
                                        style={{
                                          fontFamily: CONFIGURATION.TextRegular,
                                          color: CONFIGURATION.TextDarkGray,
                                          fontSize: 12,
                                          marginVertical: 5,
                                        }}>
                                        12 reps | 3 sets | 20 kg
                                      </Text>
                                      <Text
                                        style={{
                                          fontFamily: CONFIGURATION.TextRegular,
                                          color: CONFIGURATION.TextDarkGray,
                                          fontSize: 12,
                                        }}>
                                        2 time/week
                                      </Text>
                                    </View>
                                  </View>
                                  {open9 ? (
                                    <View
                                      style={{
                                        backgroundColor: CONFIGURATION.white,
                                        overflow: 'hidden',
                                        zIndex: 10,
                                      }}>
                                      <View style={{paddingVertical: 15}}>
                                        <Text
                                          style={{
                                            fontFamily:
                                              CONFIGURATION.TextRegular,
                                            color: CONFIGURATION.TextDarkGray,
                                          }}>
                                          Lorem Ipsum is simply dummy text of
                                          the printing and typesetting industry.
                                        </Text>
                                        <View
                                          style={{
                                            width: '100%',
                                            backgroundColor:
                                              CONFIGURATION.lightGray,
                                            paddingTop: 20,
                                            paddingHorizontal: 20,
                                            marginVertical: 20,
                                          }}>
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              marginBottom: 30,
                                            }}>
                                            <View
                                              style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                width: '50%',
                                              }}>
                                              <Image
                                                style={{height: 40, width: 40}}
                                                source={require('./../../assetss/Reps.png')}
                                              />
                                              <View style={{marginLeft: 10}}>
                                                <Text
                                                  style={{
                                                    fontFamily:
                                                      CONFIGURATION.TextBold,
                                                    color:
                                                      CONFIGURATION.TextDarkBlack,
                                                    fontSize: 18,
                                                  }}>
                                                  12
                                                </Text>
                                                <Text
                                                  style={{
                                                    fontFamily:
                                                      CONFIGURATION.TextRegular,
                                                    color:
                                                      CONFIGURATION.TextDarkGray,
                                                    fontSize: 14,
                                                  }}>
                                                  Reps
                                                </Text>
                                              </View>
                                            </View>
                                            <View
                                              style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                width: '50%',
                                              }}>
                                              <Image
                                                style={{height: 40, width: 40}}
                                                source={require('./../../assetss/Sets.png')}
                                              />
                                              <View style={{marginLeft: 10}}>
                                                <Text
                                                  style={{
                                                    fontFamily:
                                                      CONFIGURATION.TextBold,
                                                    color:
                                                      CONFIGURATION.TextDarkBlack,
                                                    fontSize: 18,
                                                  }}>
                                                  10
                                                </Text>
                                                <Text
                                                  style={{
                                                    fontFamily:
                                                      CONFIGURATION.TextRegular,
                                                    color:
                                                      CONFIGURATION.TextDarkGray,
                                                    fontSize: 14,
                                                  }}>
                                                  Sets
                                                </Text>
                                              </View>
                                            </View>
                                          </View>
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              marginBottom: 30,
                                            }}>
                                            <View
                                              style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                width: '50%',
                                              }}>
                                              <Image
                                                style={{height: 40, width: 40}}
                                                source={require('./../../assetss/Duration.png')}
                                              />
                                              <View style={{marginLeft: 10}}>
                                                <Text
                                                  style={{
                                                    fontFamily:
                                                      CONFIGURATION.TextBold,
                                                    color:
                                                      CONFIGURATION.TextDarkBlack,
                                                    fontSize: 18,
                                                  }}>
                                                  10 Min
                                                </Text>
                                                <Text
                                                  style={{
                                                    fontFamily:
                                                      CONFIGURATION.TextRegular,
                                                    color:
                                                      CONFIGURATION.TextDarkGray,
                                                    fontSize: 14,
                                                  }}>
                                                  Duration
                                                </Text>
                                              </View>
                                            </View>
                                            <View
                                              style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                width: '50%',
                                              }}>
                                              <Image
                                                style={{height: 40, width: 40}}
                                                source={require('./../../assetss/Distance.png')}
                                              />
                                              <View style={{marginLeft: 10}}>
                                                <Text
                                                  style={{
                                                    fontFamily:
                                                      CONFIGURATION.TextBold,
                                                    color:
                                                      CONFIGURATION.TextDarkBlack,
                                                    fontSize: 18,
                                                  }}>
                                                  01 Km
                                                </Text>
                                                <Text
                                                  style={{
                                                    fontFamily:
                                                      CONFIGURATION.TextRegular,
                                                    color:
                                                      CONFIGURATION.TextDarkGray,
                                                    fontSize: 14,
                                                  }}>
                                                  Distance
                                                </Text>
                                              </View>
                                            </View>
                                          </View>
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              marginBottom: 20,
                                            }}>
                                            <View
                                              style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                width: '50%',
                                              }}>
                                              <Image
                                                style={{height: 40, width: 40}}
                                                source={require('./../../assetss/Speed.png')}
                                              />
                                              <View style={{marginLeft: 10}}>
                                                <Text
                                                  style={{
                                                    fontFamily:
                                                      CONFIGURATION.TextBold,
                                                    color:
                                                      CONFIGURATION.TextDarkBlack,
                                                    fontSize: 18,
                                                  }}>
                                                  120
                                                </Text>
                                                <Text
                                                  style={{
                                                    fontFamily:
                                                      CONFIGURATION.TextRegular,
                                                    color:
                                                      CONFIGURATION.TextDarkGray,
                                                    fontSize: 14,
                                                  }}>
                                                  Speed
                                                </Text>
                                              </View>
                                            </View>
                                            <View
                                              style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                width: '50%',
                                              }}>
                                              <Image
                                                style={{height: 40, width: 40}}
                                                source={require('./../../assetss/Sets.png')}
                                              />
                                              <View style={{marginLeft: 10}}>
                                                <Text
                                                  style={{
                                                    fontFamily:
                                                      CONFIGURATION.TextBold,
                                                    color:
                                                      CONFIGURATION.TextDarkBlack,
                                                    fontSize: 18,
                                                  }}>
                                                  750 Cal
                                                </Text>
                                                <Text
                                                  numberOfLines={1}
                                                  style={{
                                                    fontFamily:
                                                      CONFIGURATION.TextRegular,
                                                    color:
                                                      CONFIGURATION.TextDarkGray,
                                                    fontSize: 14,
                                                    width: '90%',
                                                  }}>
                                                  Calories burnt
                                                </Text>
                                              </View>
                                            </View>
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                  ) : null}
                                </View>
                                <View
                                  style={{
                                    width: width - 40,
                                    marginHorizontal: 20,
                                    paddingHorizontal: 20,
                                    backgroundColor: CONFIGURATION.white,
                                    elevation: 2,
                                    marginBottom: 20,
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      borderColor: CONFIGURATION.lightGray,
                                      borderBottomWidth: 1,
                                    }}>
                                    <Image
                                      resizeMode={'contain'}
                                      source={require('./../../assetss/mens.png')}
                                      style={{height: 60, width: 60}}
                                    />
                                    <View
                                      style={{
                                        justifyContent: 'center',
                                        paddingVertical: 20,
                                        width: '77%',
                                      }}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          setopen9(!open9);
                                        }}
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            fontFamily: CONFIGURATION.TextBold,
                                            color: CONFIGURATION.TextDarkBlack,
                                          }}>
                                          Barbell Curl
                                        </Text>
                                        {open9 ? (
                                          <Image
                                            resizeMode={'contain'}
                                            style={{
                                              height: 10,
                                              width: 10,
                                              marginTop: 5,
                                              marginLeft: 10,
                                            }}
                                            source={require('./../../assetss/up.png')}
                                          />
                                        ) : (
                                          <Image
                                            resizeMode={'contain'}
                                            style={{
                                              height: 10,
                                              width: 10,
                                              marginTop: 5,
                                              marginLeft: 10,
                                            }}
                                            source={require('./../../assetss/down.png')}
                                          />
                                        )}
                                      </TouchableOpacity>
                                      <Text
                                        style={{
                                          fontFamily: CONFIGURATION.TextRegular,
                                          color: CONFIGURATION.TextDarkGray,
                                          fontSize: 12,
                                          marginVertical: 5,
                                        }}>
                                        12 reps | 3 sets | 20 kg
                                      </Text>
                                      <Text
                                        style={{
                                          fontFamily: CONFIGURATION.TextRegular,
                                          color: CONFIGURATION.TextDarkGray,
                                          fontSize: 12,
                                        }}>
                                        2 time/week
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              </>
                            ) : null}
                            {mealDay2 == 2 ? (
                              <>
                                <View
                                  style={{
                                    width: width - 40,
                                    marginHorizontal: 20,
                                    paddingHorizontal: 20,
                                    backgroundColor: CONFIGURATION.white,
                                    elevation: 2,
                                    marginBottom: 20,
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                    }}>
                                    <Image
                                      resizeMode={'contain'}
                                      source={require('./../../assetss/mens.png')}
                                      style={{height: 50, width: 50}}
                                    />
                                    <View
                                      style={{
                                        justifyContent: 'center',
                                        paddingVertical: 20,
                                        width: '56%',
                                      }}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            fontFamily: CONFIGURATION.TextBold,
                                            color: CONFIGURATION.TextDarkBlack,
                                          }}>
                                          Barbell Curl
                                        </Text>
                                      </View>
                                      <Text
                                        style={{
                                          fontFamily: CONFIGURATION.TextRegular,
                                          color: CONFIGURATION.TextDarkGray,
                                          fontSize: 12,
                                        }}>
                                        12 reps | 3 sets | 20 kg
                                      </Text>
                                    </View>
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        fontFamily: CONFIGURATION.TextRegular,
                                        color: CONFIGURATION.TextDarkGray,
                                      }}>
                                      2 time/week
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    width: width - 40,
                                    marginHorizontal: 20,
                                    paddingHorizontal: 20,
                                    backgroundColor: CONFIGURATION.white,
                                    elevation: 2,
                                    marginBottom: 20,
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                    }}>
                                    <Image
                                      resizeMode={'contain'}
                                      source={require('./../../assetss/mens.png')}
                                      style={{height: 50, width: 50}}
                                    />
                                    <View
                                      style={{
                                        justifyContent: 'center',
                                        paddingVertical: 20,
                                        width: '56%',
                                      }}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            fontFamily: CONFIGURATION.TextBold,
                                            color: CONFIGURATION.TextDarkBlack,
                                          }}>
                                          Barbell Curl
                                        </Text>
                                      </View>
                                      <Text
                                        style={{
                                          fontFamily: CONFIGURATION.TextRegular,
                                          color: CONFIGURATION.TextDarkGray,
                                          fontSize: 12,
                                        }}>
                                        12 reps | 3 sets | 20 kg
                                      </Text>
                                    </View>
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        fontFamily: CONFIGURATION.TextRegular,
                                        color: CONFIGURATION.TextDarkGray,
                                      }}>
                                      2 time/week
                                    </Text>
                                  </View>
                                </View>
                              </>
                            ) : null}
                          </View>
                        )}
                      </>
                    )}
                  </>
                ) : null}
                {selectedNames == 'Water Intake' ? (
                  <>
                    {commentLoading ? (
                      <ActivityIndicator
                        style={{
                          marginTop: 26,
                          alignSelf: 'center',
                          marginBottom: 100,
                        }}
                        size="small"
                        color="#000"
                      />
                    ) : (
                      <>
                        {isError ? (
                          <View style={{flex: 1.0, marginBottom: 56}}>
                            <Text
                              style={{
                                fontFamily: CONFIGURATION.TextBold,
                                marginHorizontal: 20,
                                marginVertical: 20,
                                fontSize: 15,
                                alignSelf: 'center',
                              }}>
                              No Data Found
                            </Text>
                          </View>
                        ) : (
                          <>
                            <Text
                              style={{
                                fontFamily: CONFIGURATION.TextBold,
                                marginHorizontal: 20,
                                marginVertical: 20,
                                fontSize: 24,
                              }}>
                              Water Intake
                            </Text>
                            <View
                              style={{
                                width: width - 40,
                                marginHorizontal: 20,
                                paddingHorizontal: 20,
                                backgroundColor: CONFIGURATION.white,
                                elevation: 2,
                                marginBottom: 20,
                              }}>
                              <View
                                style={{
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  paddingVertical: 20,
                                  borderColor: CONFIGURATION.lightGray,
                                  borderBottomWidth: 1,
                                }}>
                                <Image
                                  resizeMode={'contain'}
                                  source={require('./../../assetss/water.png')}
                                  style={{height: 150, width: 150}}
                                />
                                <View style={{position: 'absolute'}}>
                                  <Text
                                    style={{
                                      fontFamily: CONFIGURATION.TextBold,
                                      fontSize: 20,
                                    }}>
                                    1500ml/
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: CONFIGURATION.TextRegular,
                                      fontSize: 14,
                                      textAlign: 'center',
                                    }}>
                                    2500ml
                                  </Text>
                                </View>
                              </View>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontFamily: CONFIGURATION.TextBold,
                                  marginTop: 10,
                                }}>
                                Today’s log
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                }}>
                                <View
                                  style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: 50 / 2,
                                    backgroundColor: '#2D87BB10',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <Image
                                    resizeMode={'contain'}
                                    source={require('./../../assetss/Group.png')}
                                    style={{height: 25, width: 25}}
                                  />
                                </View>
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    paddingVertical: 20,
                                    width: '63%',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        fontFamily: CONFIGURATION.TextBold,
                                        color: CONFIGURATION.TextDarkBlack,
                                      }}>
                                      240ml Taken
                                    </Text>
                                  </View>
                                  <Text
                                    style={{
                                      fontFamily: CONFIGURATION.TextRegular,
                                      color: CONFIGURATION.TextDarkGray,
                                      fontSize: 12,
                                    }}>
                                    12:00 Pm
                                  </Text>
                                </View>
                                <Image
                                  resizeMode={'contain'}
                                  source={require('./../../assetss/more.png')}
                                  style={{height: 30, width: 30}}
                                />
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                }}>
                                <View
                                  style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: 50 / 2,
                                    backgroundColor: '#2D87BB10',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <Image
                                    resizeMode={'contain'}
                                    source={require('./../../assetss/Group.png')}
                                    style={{height: 25, width: 25}}
                                  />
                                </View>
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    paddingVertical: 20,
                                    width: '63%',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        fontFamily: CONFIGURATION.TextBold,
                                        color: CONFIGURATION.TextDarkBlack,
                                      }}>
                                      300ml Taken
                                    </Text>
                                  </View>
                                  <Text
                                    style={{
                                      fontFamily: CONFIGURATION.TextRegular,
                                      color: CONFIGURATION.TextDarkGray,
                                      fontSize: 12,
                                    }}>
                                    01:00 Pm
                                  </Text>
                                </View>
                                <Image
                                  resizeMode={'contain'}
                                  source={require('./../../assetss/more.png')}
                                  style={{height: 30, width: 30}}
                                />
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                }}>
                                <View
                                  style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: 50 / 2,
                                    backgroundColor: '#2D87BB10',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <Image
                                    resizeMode={'contain'}
                                    source={require('./../../assetss/Group.png')}
                                    style={{height: 25, width: 25}}
                                  />
                                </View>
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    paddingVertical: 20,
                                    width: '63%',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        fontFamily: CONFIGURATION.TextBold,
                                        color: CONFIGURATION.TextDarkBlack,
                                      }}>
                                      500ml Taken
                                    </Text>
                                  </View>
                                  <Text
                                    style={{
                                      fontFamily: CONFIGURATION.TextRegular,
                                      color: CONFIGURATION.TextDarkGray,
                                      fontSize: 12,
                                    }}>
                                    01:00 Pm
                                  </Text>
                                </View>
                                <Image
                                  resizeMode={'contain'}
                                  source={require('./../../assetss/more.png')}
                                  style={{height: 30, width: 30}}
                                />
                              </View>
                            </View>
                            <View
                              style={{
                                width: width - 40,
                                marginHorizontal: 20,
                                paddingHorizontal: 20,
                                backgroundColor: CONFIGURATION.white,
                                elevation: 2,
                                marginBottom: 20,
                                paddingVertical: 20,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                <View>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        fontFamily: CONFIGURATION.TextBold,
                                      }}>
                                      Dec 2020
                                    </Text>
                                    <Image
                                      resizeMode={'contain'}
                                      style={{
                                        height: 10,
                                        width: 10,
                                        marginTop: 0,
                                        marginLeft: 10,
                                      }}
                                      source={require('./../../assetss/up.png')}
                                    />
                                  </View>
                                  <Text
                                    style={{
                                      fontFamily: CONFIGURATION.TextRegular,
                                      color: CONFIGURATION.TextDarkGray,
                                      fontSize: 12,
                                      marginTop: 5,
                                    }}>
                                    20 Dec - 26 Dec
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: CONFIGURATION.TextRegular,
                                      color: CONFIGURATION.TextDarkGray,
                                    }}>
                                    My Goal
                                  </Text>
                                  <View
                                    style={{
                                      backgroundColor: '#18A3FA10',
                                      paddingVertical: 5,
                                      paddingHorizontal: 10,
                                      borderRadius: 5,
                                      marginLeft: 5,
                                    }}>
                                    <Text
                                      style={{
                                        fontFamily: CONFIGURATION.TextBold,
                                        color: '#18A3FA',
                                      }}>
                                      3500ml
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              <ScrollView
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                style={{width: '100%'}}>
                                <View
                                  style={{
                                    height: 150,
                                    width: '100%',
                                    marginTop: 40,
                                    marginBottom: 40,
                                  }}>
                                  <View
                                    style={{
                                      width: '100%',
                                      flexDirection: 'column',
                                      position: 'absolute',
                                      left: 0,
                                      bottom: -9,
                                      zIndex: -20,
                                      height: '120%',
                                      justifyContent: 'space-between',
                                      overflow: 'hidden',
                                    }}>
                                    {number.map((item, index) => {
                                      // console.log((item).toString().length);
                                      var ilen = item.toString().length;
                                      return (
                                        <View
                                          key={'y' + index}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                          }}>
                                          <Text
                                            style={{
                                              marginRight: 10,
                                              fontSize: 14,
                                              color: CONFIGURATION.TextDarkGray,
                                              textAlign: 'center',
                                              width: '10%',
                                              fontFamily:
                                                CONFIGURATION.TextRegular,
                                            }}>
                                            {item}
                                          </Text>
                                          <Text
                                            numberOfLines={1}
                                            style={{
                                              color: '#D6D9DC60',
                                              fontSize: 20,
                                              textAlignVertical: 'center',
                                              lineHeight: 30,
                                            }}>
                                            {
                                              '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'
                                            }
                                          </Text>
                                        </View>
                                      );
                                    })}
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      marginLeft: 20,
                                    }}>
                                    {numberX.map((item, index) => {
                                      // console.log(item);
                                      // var ra = _.random(colorArray.length-1);
                                      //var ra = 9;
                                      //var val = values[index];
                                      // console.log(values[index]);
                                      return (
                                        <View
                                          key={'bar' + index}
                                          style={{
                                            marginLeft: index == 0 ? 40 : 20,
                                            marginHorizontal: 20,
                                            alignSelf: 'flex-end',
                                          }}>
                                          <View
                                            style={{
                                              justifyContent: 'flex-end',
                                              height: '100%',
                                            }}>
                                            <View
                                              style={{
                                                height: values[index],
                                                width: 7,
                                                borderRadius: 5,
                                                backgroundColor: '#62D9FF',
                                                marginLeft: 4,
                                                bottom: 5,
                                              }}
                                            />
                                          </View>
                                          <View style={{marginTop: 10}}>
                                            <Text
                                              style={{
                                                fontSize: 12,
                                                color:
                                                  CONFIGURATION.TextDarkGray,
                                                fontFamily:
                                                  CONFIGURATION.TextRegular,
                                              }}>
                                              {item}
                                            </Text>
                                          </View>
                                        </View>
                                      );
                                    })}
                                  </View>
                                </View>
                              </ScrollView>
                            </View>
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : null}

                {selectedNames == 'Weight' ? (
                  <>
                    {commentLoading ? (
                      <ActivityIndicator
                        style={{
                          marginTop: 26,
                          alignSelf: 'center',
                          marginBottom: 100,
                        }}
                        size="small"
                        color="#000"
                      />
                    ) : (
                      <>
                        {isError ? (
                          <View style={{flex: 1.0, marginBottom: 56}}>
                            <Text
                              style={{
                                fontFamily: CONFIGURATION.TextBold,
                                marginHorizontal: 20,
                                marginVertical: 20,
                                fontSize: 15,
                                alignSelf: 'center',
                              }}>
                              No Data Found
                            </Text>
                          </View>
                        ) : (
                          <>
                            <Text
                              style={{
                                fontFamily: CONFIGURATION.TextBold,
                                marginHorizontal: 20,
                                marginVertical: 20,
                                fontSize: 24,
                              }}>
                              Weight
                            </Text>
                            <View
                              style={{
                                width: width - 40,
                                marginHorizontal: 20,
                                paddingHorizontal: 20,
                                backgroundColor: CONFIGURATION.white,
                                elevation: 2,
                                marginBottom: 20,
                              }}>
                              <View
                                style={{
                                  paddingVertical: 20,
                                  borderColor: CONFIGURATION.lightGray,
                                  borderBottomWidth: 1,
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                  }}>
                                  <Image
                                    source={require('./../../assetss/scale_1.png')}
                                    style={{height: 50, width: 50}}
                                  />
                                  <Text
                                    style={{
                                      fontFamily: CONFIGURATION.TextBold,
                                      fontSize: 20,
                                      width: '60%',
                                    }}>
                                    Currrent Weight
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: CONFIGURATION.TextBold,
                                      fontSize: 20,
                                    }}>
                                    58kg
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: 20,
                                    width: width - 80,
                                  }}>
                                  <Text
                                    numberOfLines={1}
                                    style={[
                                      style.textx,
                                      {fontFamily: CONFIGURATION.TextBold},
                                    ]}>
                                    Initial Weight
                                  </Text>
                                  <View style={style.textV}>
                                    <Text
                                      numberOfLines={1}
                                      style={{
                                        fontSize: 14,
                                        fontFamily: CONFIGURATION.TextBold,
                                        color: CONFIGURATION.TextDarkGray,
                                      }}>
                                      Goal Weight
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginVertical: 10,
                                    width: width - 80,
                                  }}>
                                  <Text
                                    numberOfLines={1}
                                    style={[
                                      style.textx,
                                      {fontFamily: CONFIGURATION.TextBold},
                                    ]}>
                                    65 Kg
                                  </Text>
                                  <View style={style.textV}>
                                    <Text
                                      numberOfLines={1}
                                      style={{
                                        fontSize: 14,
                                        fontFamily: CONFIGURATION.TextBold,
                                        color: CONFIGURATION.TextDarkGray,
                                      }}>
                                      55 Kg
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    height: 5,
                                    width: '100%',
                                    backgroundColor: CONFIGURATION.lightGray,
                                    borderRadius: 50,
                                    overflow: 'hidden',
                                    marginBottom: 10,
                                    marginTop: 5,
                                  }}>
                                  <View
                                    style={{
                                      height: 5,
                                      width: '70%',
                                      backgroundColor:
                                        CONFIGURATION.lightYellow,
                                      borderRadius: 50,
                                      overflow: 'hidden',
                                    }}></View>
                                </View>
                              </View>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontFamily: CONFIGURATION.TextBold,
                                  marginTop: 10,
                                }}>
                                Past log
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                }}>
                                <View
                                  style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: 50 / 2,
                                    backgroundColor: CONFIGURATION.lightOrenge,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <Image
                                    resizeMode={'contain'}
                                    source={require('./../../assetss/scale.png')}
                                    style={{height: 25, width: 25}}
                                  />
                                </View>
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    paddingVertical: 20,
                                    width: '63%',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        fontFamily: CONFIGURATION.TextBold,
                                        color: CONFIGURATION.TextDarkBlack,
                                      }}>
                                      240ml Taken
                                    </Text>
                                  </View>
                                  <Text
                                    style={{
                                      fontFamily: CONFIGURATION.TextRegular,
                                      color: CONFIGURATION.TextDarkGray,
                                      fontSize: 12,
                                    }}>
                                    12:00 Pm
                                  </Text>
                                </View>
                                <Image
                                  resizeMode={'contain'}
                                  source={require('./../../assetss/more.png')}
                                  style={{height: 30, width: 30}}
                                />
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                }}>
                                <View
                                  style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: 50 / 2,
                                    backgroundColor: CONFIGURATION.lightOrenge,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <Image
                                    resizeMode={'contain'}
                                    source={require('./../../assetss/scale.png')}
                                    style={{height: 25, width: 25}}
                                  />
                                </View>
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    paddingVertical: 20,
                                    width: '63%',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        fontFamily: CONFIGURATION.TextBold,
                                        color: CONFIGURATION.TextDarkBlack,
                                      }}>
                                      240ml Taken
                                    </Text>
                                  </View>
                                  <Text
                                    style={{
                                      fontFamily: CONFIGURATION.TextRegular,
                                      color: CONFIGURATION.TextDarkGray,
                                      fontSize: 12,
                                    }}>
                                    12:00 Pm
                                  </Text>
                                </View>
                                <Image
                                  resizeMode={'contain'}
                                  source={require('./../../assetss/more.png')}
                                  style={{height: 30, width: 30}}
                                />
                              </View>
                            </View>
                            <View
                              style={{
                                width: width - 40,
                                marginHorizontal: 20,
                                paddingHorizontal: 20,
                                backgroundColor: CONFIGURATION.white,
                                elevation: 2,
                                marginBottom: 20,
                                paddingVertical: 20,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                <View>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        fontFamily: CONFIGURATION.TextBold,
                                      }}>
                                      Dec 2020
                                    </Text>
                                    <Image
                                      resizeMode={'contain'}
                                      style={{
                                        height: 10,
                                        width: 10,
                                        marginTop: 0,
                                        marginLeft: 10,
                                      }}
                                      source={require('./../../assetss/up.png')}
                                    />
                                  </View>
                                  <Text
                                    style={{
                                      fontFamily: CONFIGURATION.TextRegular,
                                      color: CONFIGURATION.TextDarkGray,
                                      fontSize: 12,
                                      marginTop: 5,
                                    }}>
                                    20 Dec - 26 Dec
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: CONFIGURATION.TextRegular,
                                      color: CONFIGURATION.TextDarkGray,
                                    }}>
                                    My Goal
                                  </Text>
                                  <View
                                    style={{
                                      backgroundColor:
                                        CONFIGURATION.lightOrenge,
                                      paddingVertical: 5,
                                      paddingHorizontal: 10,
                                      borderRadius: 5,
                                      marginLeft: 5,
                                    }}>
                                    <Text
                                      style={{
                                        fontFamily: CONFIGURATION.TextBold,
                                        color: CONFIGURATION.lightYellow,
                                      }}>
                                      65 kg
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              <View style={{width: width - 80, marginTop: 20}}>
                                <ScrollView
                                  horizontal={true}
                                  showsHorizontalScrollIndicator={false}>
                                  <LineChart
                                    data={data}
                                    width={width}
                                    height={220}
                                    chartConfig={chartConfig}
                                    withShadow={false}
                                    formatYLabel={y => {
                                      console.log('asdas', parseInt(y));
                                      return parseInt(y);
                                    }}
                                    fromZero
                                  />
                                </ScrollView>
                              </View>
                            </View>
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : null}
              </>
            ) : null}
          </View>
        </ScrollView>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={height / 2}
        customStyles={{
          wrapper: {
            backgroundColor: '#00000050',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <ScrollView>
          <TouchableOpacity
            onPress={() => {
              setselectedNames('Meal of the day');
              getMealComments(moment().format('YYYY-MM-DD'));
              refRBSheet.current.close();
            }}
            style={{
              marginHorizontal: 20,
              borderColor: CONFIGURATION.lightGray,
              borderWidth: 1,
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 5,
              marginTop: 10,
            }}>
            <Text style={{fontFamily: CONFIGURATION.TextBold}}>
              Meal of the day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setselectedNames('Exercise of the day');
              getExcersizeComment(moment().format('YYYY-MM-DD'));
              refRBSheet.current.close();
            }}
            style={{
              marginHorizontal: 20,
              borderColor: CONFIGURATION.lightGray,
              borderWidth: 1,
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 5,
              marginTop: 10,
            }}>
            <Text style={{fontFamily: CONFIGURATION.TextBold}}>
              Exercise of the day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setselectedNames('Water Intake');
              getWaterInstackUser(moment().format('YYYY-MM-DD'));
              refRBSheet.current.close();
            }}
            style={{
              marginHorizontal: 20,
              borderColor: CONFIGURATION.lightGray,
              borderWidth: 1,
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 5,
              marginTop: 10,
            }}>
            <Text style={{fontFamily: CONFIGURATION.TextBold}}>
              Water Intake
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setselectedNames('Weight');
              getWaights(moment().format('YYYY-MM-DD'));
              refRBSheet.current.close();
            }}
            style={{
              marginHorizontal: 20,
              borderColor: CONFIGURATION.lightGray,
              borderWidth: 1,
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 5,
              marginTop: 10,
            }}>
            <Text style={{fontFamily: CONFIGURATION.TextBold}}>Weight</Text>
          </TouchableOpacity>
        </ScrollView>
      </RBSheet>
      <RBSheet
        ref={refRBPopup}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={height / 2}
        customStyles={{
          wrapper: {
            backgroundColor: '#00000050',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View>
          <FlatList
            data={clientMealCommentsData}
            showsVerticalScrollIndicator={false}
            extraData={notesData}
            keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setTitle(item.mealType);
                    setCommentArray(item.comments);
                    refRBPopup.current.close();
                  }}
                  style={{
                    marginHorizontal: 20,
                    borderColor: CONFIGURATION.lightGray,
                    borderWidth: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                    borderRadius: 5,
                    marginTop: 10,
                  }}>
                  <Text style={{fontFamily: CONFIGURATION.TextBold}}>
                    {item.mealType}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default index;
