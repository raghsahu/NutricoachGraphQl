import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import style from './style';

//ASSETS & CONFIG
import CONFIGURATION from '../../Components/Config';

//COMMON COMPONENT
import ClientsBox from '../../Components/ClientsBox';
import GeneralStatusBar from './../../Components/GeneralStatusBar';

//CONTEXT
import {APPContext} from '../../Context/AppProvider';

//PACKAGES
import LinearGradient from 'react-native-linear-gradient';

const index = () => {
  const [isLoading, setLoading] = useState(true);
  const [client, setClient] = useState([]);
  const [searchText, setSearchText] = useState('')
  const [filterData, setFilterData] = useState([])

  const {getClients} = useContext(APPContext);

  useEffect(() => {
    getClientData();
    return () => {};
  }, []);

  async function getClientData() {
    const result = await getClients();
    setLoading(false);
    if (result && result.data && result.data.data && result.data.data.me) {
      setClient(result.data.data.me.customers);
    }
  }

    const search = (searchText) => {
    setSearchText(searchText)
    let filteredData = client.filter(item => {
      if (item.profile.fullName.toLowerCase().match(searchText.toLowerCase())) {
        return item
      }
    })
    setFilterData(filteredData)
  };

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
          <View style={{width: 35}}></View>
          <Text style={style.titleText}>Clients</Text>
          <TouchableOpacity style={style.bellBg}>
            <Image
              resizeMode={'contain'}
              style={style.bellIcon}
              source={require('./../../assetss/Download.png')}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={style.whiteView}>
        <View style={style.profileView}>
          <Image
            source={require('./../../assetss/Search.png')}
            style={style.searchIcoN}
          />
          <TextInput
            style={{width: '80%', fontFamily: CONFIGURATION.TextRegular}}
            placeholder="Search Client"
            placeholderTextColor={CONFIGURATION.loginpalceholder}
             onChangeText={text => {
              search(text);
            }}
            value={searchText}
          />
          <Image
            source={require('./../../assetss/Filter.png')}
            style={style.searchIcoN}
          />
        </View>

        {isLoading ? (
          <View style={{height: 100, justifyContent: 'center'}}>
            <ActivityIndicator style={{alignSelf: 'center'}} />
          </View>
        ) : (
          <View style={{flex: 1.0, marginTop: 35}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {filterData && filterData.length > 0 ? 
              filterData.map((data, index) => {
                return <ClientsBox key={index} item={data} />; 
                })
              :
               client.map((data, index) => {
                return <ClientsBox key={index} item={data} />;
              })
              }
            </ScrollView>
          </View>
        )}
      </View>
      <TouchableOpacity style={{position: 'absolute', bottom: 20, right: 20}}>
        <Image
          resizeMode={'contain'}
          style={{height: 50, width: 50}}
          source={require('./../../assetss/add.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default index;
