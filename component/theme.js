import * as React from 'react';
import { ThemeProvider } from '@react-navigation/native';
import global from './global'
import { View, Text, Button, Dimensions,Switch, TouchableOpacity, StyleSheet,RefreshControl, Image, StatusBar, FlatList, ScrollView, TextInput,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

export default {
    prim:'#007076',
    seco:'#012f43',
    bg:'#0A0B1D',
    vbg:'#3D3F70',
    hgl:'#165a05',
    lgt:'#b0b0b0b0'
}

