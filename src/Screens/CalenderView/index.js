import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
// @ts-expect-error
import { Agenda } from 'react-native-calendars';
import CONFIGURATION from '../../Components/Config';
import GeneralStatusBar from './../../Components/GeneralStatusBar'
import style from './style';
import LinearGradient from 'react-native-linear-gradient';

export default class AgendaScreen extends Component {
    state = {
        items: {
            '2021-09-20': [{ name: 'item 1 - any js object' }],
            '2021-09-21': [{ name: 'item 2 - any js object', height: 80 }],
            '2021-09-22': [],
            '2021-09-25': [{ name: 'item 3 - any js object' }, { name: 'any js object' },],
            '2021-09-18': [{ name: 'item 1 - any js object' }],
            '2021-09-19': [{ name: 'item 2 - any js object', height: 80 }],
            '2021-09-23': [],
            '2021-09-24': [{ name: 'item 3 - any js object' }, { name: 'any js object' }],
            '2021-09-26': [{ name: 'item 1 - any js object' }],
            '2021-09-27': [{ name: 'item 2 - any js object', height: 80 }],
            '2021-09-28': [],
            '2021-09-29': [{ name: 'item 3 - any js object' }, { name: 'any js object' },],
            '2021-09-30': [{ name: 'item 1 - any js object' }],
            '2021-10-01': [{ name: 'item 2 - any js object', height: 80 }],
            '2021-10-02': [],
            '2021-10-05': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
        }
    };

    render() {
        return (
            <>
                <GeneralStatusBar backgroundColor={CONFIGURATION.statusbarColor} barStyle="light-content" />
                <LinearGradient colors={[CONFIGURATION.lightYellow, CONFIGURATION.DarkYellow]} style={style.yellowView}>
                    <View style={style.menuView}>
                        <TouchableOpacity>
                            
                        </TouchableOpacity>
                        <Text style={style.titleText}>{this.props.route.params.date}</Text>
                        <View style={{ width: 35 }}></View>
                    </View>
                </LinearGradient>
                <Agenda
                    testID={'agenda'}
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    selected={new Date()}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    showClosingKnob={true}
                    minDate={new Date()}
                // markingType={'period'}
                // markedDates={{
                //    '2017-05-08': {textColor: '#43515c'},
                //    '2017-05-09': {textColor: '#43515c'},
                //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                //    '2017-05-21': {startingDay: true, color: 'blue'},
                //    '2017-05-22': {endingDay: true, color: 'gray'},
                //    '2017-05-24': {startingDay: true, color: 'gray'},
                //    '2017-05-25': {color: 'gray'},
                //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                // monthFormat={'yyyy'}
                // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                // hideExtraDays={false}
                />
            </>
        );
    }

    loadItems(day) {
        // setTimeout(() => {
        //   for (let i = -15; i < 85; i++) {
        //     const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        //     const strTime = this.timeToString(time);
        //     if (!this.state.items[strTime]) {
        //       this.state.items[strTime] = [];
        //       const numItems = Math.floor(Math.random() * 3 + 1);
        //       for (let j = 0; j < numItems; j++) {
        //         this.state.items[strTime].push({
        //           name: 'Item for ' + strTime + ' #' + j,
        //           height: Math.max(50, Math.floor(Math.random() * 150))
        //         });
        //       }
        //     }
        //   }
        //   const newItems = {};
        //   Object.keys(this.state.items).forEach(key => {
        //     newItems[key] = this.state.items[key];
        //   });
        //   this.setState({
        //     items: newItems
        //   });
        // }, 1000);
    }

    renderItem(item) {
        return (
            <TouchableOpacity
                testID={'item'}
                style={[styles.item, { height: item.height }]}
                onPress={() => Alert.alert(item.name)}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
            </View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});