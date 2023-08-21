import AsyncStorage from '@react-native-async-storage/async-storage';
const FIREBASE_MAIN = "METAGAMES"
const FIREBASE_Chat = "METACHAT"
const burl = Math.floor(Math.random() * 6)
import bg_img from '../assets/Aeon/aeon_login_bg.png'

export default {

  //  meta.botz.trade
  //  metafuture.trade
  // BASE_URL: burl == 1 ? 'https://meta-fx.trade/' : burl == 2 ? 'https://server1.meta-fx.trade/' : burl == 3 ? 'https://server2.meta-fx.trade/' : burl == 4 ? 'https://server3.meta-fx.trade/' : burl == 5 ? 'https://server4.meta-fx.trade/'
  //   : 'https://server5.meta-fx.trade/',
  BASE_URL:'https://quickfx.in.net/',
  priceURL: 'http://43.240.64.165:8085/getPrices',
  //'http://3.6.110.28:8082/getPrices',
  //'http://43.205.88.26/getPrices',//
  appFontR:'aribau-grotesk-regular',
  appFontM:'aribau-grotesk-medium',
  appFontL:'aribau-grotesk-light',
  appFontB:'aribau-grotesk-bold',
  global_cur: 'USD',
  appColor1: '#ffc32f',//'#edb000', //yellow
  appColor2: '#000', //skyblue
  top10json: '',
  appColor3: '#026CE4', //navy blue
  appColorGreen: '#134c39',
  livebalFX:'',
  placeColor: '#404040',
  bold: 'LemonMilkProBold',//,bold',//'Helvetica',
  light: 'arial,sans-serif',
  bold2: 'arial,sans-serif',
  grad1: '#f0f0f0',
  grad2: '#d0d0d0', //'#FAFAD2',//'#d0d0d0',
  grad3: '#161e33',
  grad4: '#10131a',
  ismaster: '0',
  darkGreen: '#012019',
  green: '#217019',
  appName: 'Quickfx',
  hedge_updated: '',
  login_now: false,
  fest_json: '',
  freeUser: '',
  fest_date: 0,
  appmodal: false,
  apptype: null,
  addr: null,
  ismaster: '0',
  uid: '',
  callStore: false,
  chartpair: '',
  max_lev: null,
  symname: '',
  symname1: '',
  symname2: '',
  hitApi: true,
  iscopytrade: 'False',
  fest_month: 0,
  fest_year: 0,
  refreshed: true,
  top1: '#3f4e6a',
  CopyId: '',
  top2: '#1f2630',
  top21: '#00000',
  top3: '#29313c',
  topdarkBlue: '#171e26',
  topnavyBlue: '#1f2630',
  CUR: '',
  theme: '',
  vbal: '0',
  bbal: '0',
  ebal: '0',
  pbal: '0',
  rbal: '0',
  all_cur: '',
  lg_without_pwd: false,
  manual_trade: false,
  BNB: '',
  price_arr: [],
  per_arr: [],
  val: '',
  notify_count: '',
  notify_count1: '',
  total_notify: '',
  Coins: '',
  Store: '',
  NAME: '',
  EMAIL: '',
  AMT: '',
  internet: true,
  closesocket: 1,
  PWD: '',
  signal: 0,
  cur_name: 'INR',
  cur_value: '80',
  api_key: '',
  status: 'start',
  strategy: 'wwm',
  api_secret: '',
  refurl: '',
  api_type: 'websocket',
  activeId: false,
  ReqValue: '',
  demo: 'false',
  txnPassword: '',
  autoStatus: '',
  autobot_time: '',
  autoNum: '',
  autoAmt: '',
  autotype: '',
  dt: '',
  autoFamt: '',
  refurlProm: '',
  timeleft: '',
  kycreq: '',
  low_24: '',
  high_24: '',
  mypcp: 0.0,
  myprice: 0.0,
  kycreq: '',
  prevtime: '',
  prevtime1: '',
  prevtime2: '',
  prevtime3: '',
  prevtime_market: '',
  apiUsed:'css_mob',
  restart: '0',
  FIREBASE_ROOM_REF: FIREBASE_MAIN + "/ROOMS",
  FIREBASE_Chat_REF: FIREBASE_Chat + "/ChatRoom",
  AccMode: 'live',
  EBAL: '',
  master: null,
  superData: [],
  normalData: [],
  livebal: '',
  demobal: '',
  hedge: '',
  api_key_data: null,
  depTxt: '',
  rank: '',
  depShow: '', signalInterval: '15',
  news: '',
  secondaryDatabase: ''
  , secondaryApp: null,
  firebase: '',
  token: '',
  tradeCapital: '0',
  storyfont: 'storyfonts',
  askValue: false,
  bgimg: bg_img,
  server_name: '',
  appStarted: false,
  allSymbolPrices: [],
  addOnSymbol: '',
  notHit: false,
  balance: ''
};