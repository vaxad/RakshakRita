const connect = require('../../lib/db/connection');
const Stations = require('../../lib/db/models/Stations');
const fs = require('fs');
const qr = require('qrcode');
const axios = require('axios');
// Sample array of objects with a field to convert to QR code
const data = [{
  "_id": {
    "$oid": "6539279ee0265e4af914b846"
  },
  "name": "Police Station-Limbdi",
  "area": "SH-62",
  "district": "Jhalod",
  "state": "Gujarat",
  "pincode": "389180",
  "latitude": 23.05244,
  "longitude": 74.30577
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b847"
  },
  "name": "Varachha Police Station",
  "area": "Varachha Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395006",
  "latitude": 21.209634223,
  "longitude": 72.849761241
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b848"
  },
  "name": "Police Station-Rander",
  "area": "Khidmat Nagar",
  "district": "Rander",
  "state": "Gujarat",
  "pincode": "395005",
  "latitude": 21.218334045,
  "longitude": 72.7945853
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b849"
  },
  "name": "Gayakwad Haveli",
  "area": "Gaikwad Haveli",
  "district": "Raikhad",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.01599,
  "longitude": 72.5809
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b84a"
  },
  "name": "Amroli Police Station",
  "area": "Surat",
  "district": "394107",
  "state": "Gujarat",
  "pincode": "394107",
  "latitude": 21.2475467002,
  "longitude": 72.8515746286
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b84b"
  },
  "name": "Chhaya Police Chowki",
  "area": "Indra Gandhi Marg Chhaya",
  "district": "360578",
  "state": "Gujarat",
  "pincode": "Porbandar 360578",
  "latitude": 21.628061,
  "longitude": 69.634724
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b84c"
  },
  "name": "Rustam Pura Police Chowki",
  "area": "Hazrat Akbar Shahid Tekra",
  "district": "Rustampura",
  "state": "Gujarat",
  "pincode": "395002",
  "latitude": 21.1889940231,
  "longitude": 72.8330562923
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b84d"
  },
  "name": "Chhapi Police Station",
  "area": "Vadgam 385210",
  "district": "Vadgam 385210",
  "state": "Gujarat",
  "pincode": "Vadgam 385210",
  "latitude": 24.02959,
  "longitude": 72.39973
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b84e"
  },
  "name": "Sachin Police Station",
  "area": "SH 6",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "394230",
  "latitude": 21.086984,
  "longitude": 72.881619
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b84f"
  },
  "name": "Naroda Police Station",
  "area": "Naroda Road",
  "district": "Naroda",
  "state": "Gujarat",
  "pincode": "382330",
  "latitude": 23.098269,
  "longitude": 72.667129
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b850"
  },
  "name": "Naroda Police Check Post",
  "area": "Ahmedabad",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "382330",
  "latitude": 23.064274,
  "longitude": 72.643332
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b851"
  },
  "name": "Zila Police Adhikari Kachahery",
  "area": "Hariyana Plot 119",
  "district": "Para",
  "state": "Gujarat",
  "pincode": "364001",
  "latitude": 21.769171,
  "longitude": 72.15039
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b852"
  },
  "name": "Police Station-Suigam",
  "area": "SH-127",
  "district": "Vav",
  "state": "Gujarat",
  "pincode": "385570",
  "latitude": 24.15644156,
  "longitude": 71.35487701
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b853"
  },
  "name": "Police Station-Bantwa",
  "area": "Bantwa Pajod Road",
  "district": "Manavadar",
  "state": "Gujarat",
  "pincode": "362620",
  "latitude": 21.49081,
  "longitude": 70.07472
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b854"
  },
  "name": "Mahila Police Station",
  "area": "Mithakhali",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.0315661,
  "longitude": 72.5640245
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b855"
  },
  "name": "Police Station-Bodeli",
  "area": "Sankheda",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.2714679067,
  "longitude": 73.71647983
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b856"
  },
  "name": "Samta Police Chowki",
  "area": "Samta Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390003",
  "latitude": 22.32432,
  "longitude": 73.148399
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b857"
  },
  "name": "SRP GP  9 Makarpura Rod Vadodara",
  "area": "Vadodara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.2615544896,
  "longitude": 73.2003408029
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b858"
  },
  "name": "Bhavnagar Police",
  "area": "DSP office",
  "district": "navapar",
  "state": "Gujarat",
  "pincode": "364001",
  "latitude": 21.7704391,
  "longitude": 72.1423721
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b859"
  },
  "name": "Limbayat Police Station",
  "area": "Rustam Bagh Road",
  "district": "Limbayat",
  "state": "Gujarat",
  "pincode": "394210",
  "latitude": 21.175923,
  "longitude": 72.856863
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b85a"
  },
  "name": "Police Station Bapunagar",
  "area": "Opposite Siddhi Vinayk Ganesh Mandir",
  "district": "Bapunagar",
  "state": "Gujarat",
  "pincode": "380024",
  "latitude": 23.03247,
  "longitude": 72.631441
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b85b"
  },
  "name": "Police Chawki",
  "area": "Radhanpur 385340",
  "district": "Radhanpur 385340",
  "state": "Gujarat",
  "pincode": "Radhanpur 385340",
  "latitude": 23.833967,
  "longitude": 71.605517
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b85c"
  },
  "name": "Katargam Police Station",
  "area": "Surat",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "395004",
  "latitude": 21.2233324672,
  "longitude": 72.8331131745
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b85d"
  },
  "name": "Police Station-Udepur Road",
  "area": "Devgadh Baria",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "389380",
  "latitude": 22.70014,
  "longitude": 73.91466
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b85e"
  },
  "name": "Paliwal Police Chowky",
  "area": "GIDC",
  "district": "Sachin",
  "state": "Gujarat",
  "pincode": "394230",
  "latitude": 21.092055,
  "longitude": 72.862293
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b85f"
  },
  "name": "Police Station Jamnager",
  "area": "Victoria Bridge Road",
  "district": "361120",
  "state": "Gujarat",
  "pincode": "Jamnagar 361120",
  "latitude": 22.475959,
  "longitude": 70.095408
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b860"
  },
  "name": "Police Chowki Malaviya Nagar",
  "area": "Near Maudi Chowkdi",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.2697801,
  "longitude": 70.788699
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b861"
  },
  "name": "Police Station-Upleta",
  "area": "Upleta 360490",
  "district": "Upleta 360490",
  "state": "Gujarat",
  "pincode": "Upleta 360490",
  "latitude": 21.74757,
  "longitude": 70.27513
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b862"
  },
  "name": "Police Station-Vansda",
  "area": "Bansda",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "396580",
  "latitude": 20.76203,
  "longitude": 73.36238
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b863"
  },
  "name": "Khokhra Police Station",
  "area": "Ahmedabad",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.0013222,
  "longitude": 72.6205328
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b864"
  },
  "name": "DSP Office",
  "area": "Swami Narayan Marg",
  "district": "370001",
  "state": "Gujarat",
  "pincode": "Bhuj 370001",
  "latitude": 23.24281,
  "longitude": 69.666435
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b865"
  },
  "name": "Shaher Kotada Police Station",
  "area": "Ahmedabad",
  "district": "380002",
  "state": "Gujarat",
  "pincode": "380002",
  "latitude": 23.0333,
  "longitude": 72.6167
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b866"
  },
  "name": "Thana-Badhrav Janpadh-Raybareli",
  "area": "NH-24B",
  "district": "229301",
  "state": "Gujarat",
  "pincode": "Bachhrawan 229301",
  "latitude": 26.47015,
  "longitude": 81.11172
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b867"
  },
  "name": "Bhachau Police Station",
  "area": "Bhachau 370140",
  "district": "Bhachau 370140",
  "state": "Gujarat",
  "pincode": "Bhachau 370140",
  "latitude": 23.288376,
  "longitude": 70.343934
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b868"
  },
  "name": "Laskana Police Chowki",
  "area": "Laskana",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395013",
  "latitude": 21.251337605,
  "longitude": 72.9277244587
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b869"
  },
  "name": "Adazan Police Station",
  "area": "LP Savani Road",
  "district": "Ram",
  "state": "Gujarat",
  "pincode": "395009",
  "latitude": 21.190543,
  "longitude": 72.794617
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b86a"
  },
  "name": "Thangadh Police Station",
  "area": "Chotila road",
  "district": "",
  "state": "Gujarat",
  "pincode": "Thangadh",
  "latitude": 22.58456,
  "longitude": 71.2048
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b86b"
  },
  "name": "Police Pared Ground , Anand",
  "area": "Anand",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.5427271,
  "longitude": 72.9618235
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b86c"
  },
  "name": "Police Station Kushtagi",
  "area": "SH 30",
  "district": "583277",
  "state": "Gujarat",
  "pincode": "Kushtagi 583277",
  "latitude": 15.752983,
  "longitude": 76.196155
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b86d"
  },
  "name": "Police Chowki",
  "area": "Jamnagar 361001",
  "district": "Jamnagar 361001",
  "state": "Gujarat",
  "pincode": "Jamnagar 361001",
  "latitude": 22.4642284,
  "longitude": 70.0799917
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b86e"
  },
  "name": "Vejalpur Police Chowki",
  "area": "Dr Jivraj Mehta Marg",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380051",
  "latitude": 23.004082,
  "longitude": 72.522669
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b86f"
  },
  "name": "Bhagol Police Station-Naroda",
  "area": "Galaxy Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "382330",
  "latitude": 23.0747484,
  "longitude": 72.6553748
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b870"
  },
  "name": "Haveli Police Stations",
  "area": "Gaikwad Haveli Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.016943,
  "longitude": 72.581002
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b871"
  },
  "name": "Valsad DSP Office",
  "area": "SH-6",
  "district": "",
  "state": "Gujarat",
  "pincode": "Valsad",
  "latitude": 20.60681214,
  "longitude": 72.929547089
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b872"
  },
  "name": "Shirpur Rural",
  "area": "Shirpur Chopda Highway",
  "district": "425421",
  "state": "Gujarat",
  "pincode": "Shirpur 425421",
  "latitude": 21.27183,
  "longitude": 75.08679
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b873"
  },
  "name": "Police Station-Shirpur",
  "area": "NH-3",
  "district": "425405",
  "state": "Gujarat",
  "pincode": "Shirpur 425405",
  "latitude": 21.346710885,
  "longitude": 74.879744285
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b874"
  },
  "name": "Police Station-Gandhidham",
  "area": "Gandhidham 370201",
  "district": "Gandhidham 370201",
  "state": "Gujarat",
  "pincode": "Gandhidham 370201",
  "latitude": 23.07061,
  "longitude": 70.13524
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b875"
  },
  "name": "Jarod Outpost Police Station",
  "area": "Vaghodia INA 391510",
  "district": "Vaghodia INA 391510",
  "state": "Gujarat",
  "pincode": "Vaghodia INA 391510",
  "latitude": 22.440342,
  "longitude": 73.337037
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b876"
  },
  "name": "Vidhyanagar Police Station",
  "area": "Vallabh Vidhyanagar 388121",
  "district": "Vallabh Vidhyanagar 388121",
  "state": "Gujarat",
  "pincode": "Vallabh Vidhyanagar 388121",
  "latitude": 22.549759,
  "longitude": 72.932117
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b877"
  },
  "name": "Adipur Police Station",
  "area": "SH-46",
  "district": "370205",
  "state": "Gujarat",
  "pincode": "Gandhidham 370205",
  "latitude": 23.071502,
  "longitude": 70.076669
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b878"
  },
  "name": "Godhra Saher Police Station",
  "area": "Godhra City",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.77426,
  "longitude": 73.62528
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b879"
  },
  "name": "Pith Police Chowki",
  "area": "Lal Darwaja Road",
  "district": "Chakla",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.31976,
  "longitude": 72.62015
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b87a"
  },
  "name": "Laxman Nagar Police Satation",
  "area": "Varacha Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.20938,
  "longitude": 72.84959
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b87b"
  },
  "name": "Jivraj Park Police Chowki",
  "area": "132 Feet Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380051",
  "latitude": 23.00078,
  "longitude": 72.53557
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b87c"
  },
  "name": "Police Station Bhavnagar",
  "area": "Jail Road",
  "district": "Devbagh",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.7674,
  "longitude": 72.13981
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b87d"
  },
  "name": "Bhavnagar Police Station",
  "area": "Bus Station Road",
  "district": "Panwadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.76926,
  "longitude": 72.13507
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b87e"
  },
  "name": "Kruti Mandir Police Station",
  "area": "SVP Road",
  "district": "Porbandar",
  "state": "Gujarat",
  "pincode": "360575",
  "latitude": 21.6421,
  "longitude": 69.60506
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b87f"
  },
  "name": "Sanand Police Station",
  "area": "SH-17",
  "district": "Sanand",
  "state": "Gujarat",
  "pincode": "382110",
  "latitude": 22.98796,
  "longitude": 72.38623
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b880"
  },
  "name": "Police Station Kalavad",
  "area": "Dhoraji Road",
  "district": "Of",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.19704,
  "longitude": 70.38424
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b881"
  },
  "name": "Visnagar Police Station",
  "area": "SH-130",
  "district": "Ganjbazar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.70634,
  "longitude": 72.54094
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b882"
  },
  "name": "Visnagar Police Station",
  "area": "Sh130",
  "district": "Lake",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.69721,
  "longitude": 72.55261
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b883"
  },
  "name": "Vijapur Police Chowki",
  "area": "Main Road",
  "district": "Bharucha",
  "state": "Gujarat",
  "pincode": "392001",
  "latitude": 21.69093,
  "longitude": 72.97616
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b884"
  },
  "name": "Mehsana Police Station",
  "area": "Station Road",
  "district": "Mahesana",
  "state": "Gujarat",
  "pincode": "384001",
  "latitude": 23.60309,
  "longitude": 72.39193
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b885"
  },
  "name": "Karjan Police Station",
  "area": "Ranjit Nagar",
  "district": "Station",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.05427,
  "longitude": 73.11276
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b886"
  },
  "name": "Dabhoi Police Station",
  "area": "Station Road",
  "district": "Dabhoi",
  "state": "Gujarat",
  "pincode": "391110",
  "latitude": 22.13784,
  "longitude": 73.41936
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b887"
  },
  "name": "Police Station Dabhoi",
  "area": "Government Hospital Road",
  "district": "Dabhoi",
  "state": "Gujarat",
  "pincode": "391110",
  "latitude": 22.13136,
  "longitude": 73.42573
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b888"
  },
  "name": "Dabhan Chokadi Police Chowki",
  "area": "Narol Naroda Road",
  "district": "Taluka",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.70707,
  "longitude": 72.82646
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b889"
  },
  "name": "Police Station Porbandar",
  "area": "Nh8b",
  "district": "Nehru",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.63929,
  "longitude": 69.62317
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b88a"
  },
  "name": "Police Station-Porbandar",
  "area": "Swami Dayanand Saraswati Road",
  "district": "Bazar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.64001,
  "longitude": 69.60552
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b88b"
  },
  "name": "Porbandar City Police Station",
  "area": "Station Road",
  "district": "Plot",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.64221,
  "longitude": 69.61426
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b88c"
  },
  "name": "Bhalka Police Chowki",
  "area": "Bhalka Road",
  "district": "Veraval",
  "state": "Gujarat",
  "pincode": "362268",
  "latitude": 20.91047,
  "longitude": 70.37855
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b88d"
  },
  "name": "Mahuva Police Station",
  "area": "Sh35",
  "district": "Shala",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.09231,
  "longitude": 71.76921
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b88e"
  },
  "name": "Police Station Raigadh",
  "area": "Raigadh",
  "district": "Sabarkadha",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.60324,
  "longitude": 73.17978
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b88f"
  },
  "name": "Police Station-Bhachau",
  "area": "Nh8a Kutch Road",
  "district": "370140",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.28819,
  "longitude": 70.34406
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b890"
  },
  "name": "Police Station Bodeli",
  "area": "Bodeli Road",
  "district": "Hospital",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.27145,
  "longitude": 73.71656
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b891"
  },
  "name": "Kalwa Chowk Police Chowki",
  "area": "M G Road",
  "district": "Kadiwad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.5138,
  "longitude": 70.46319
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b892"
  },
  "name": "Sheth Wadana Police Station",
  "area": "SH-94",
  "district": "Vadala",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.03927,
  "longitude": 70.1246
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b893"
  },
  "name": "Khodiyar Police Station",
  "area": "Swami Vivekanand Road",
  "district": "Raipur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.01733,
  "longitude": 72.59439
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b894"
  },
  "name": "Darbargadh Police Chowki",
  "area": "Aashapura Road",
  "district": "Jamnagar",
  "state": "Gujarat",
  "pincode": "361001",
  "latitude": 22.46456,
  "longitude": 70.07991
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b895"
  },
  "name": "Sayla Police Station",
  "area": "Ahmedabad Rajkot Highway",
  "district": "363430",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.53801,
  "longitude": 71.48053
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b896"
  },
  "name": "Police Station Olpad",
  "area": "Sh6 Surat Road",
  "district": "394335",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.33759,
  "longitude": 72.75098
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b897"
  },
  "name": "Amroli Police Station",
  "area": "Sayan Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "394107",
  "latitude": 21.23821,
  "longitude": 72.84861
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b898"
  },
  "name": "Amroli Police Station",
  "area": "Amroli Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "394107",
  "latitude": 21.24494,
  "longitude": 72.85113
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b899"
  },
  "name": "Amroli Police Station",
  "area": "Amroli Sayan Road",
  "district": "Kosad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.26532,
  "longitude": 72.84643
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b89a"
  },
  "name": "Jhalod Police Station",
  "area": "Jhalod Road",
  "district": "Court",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.1046,
  "longitude": 74.15825
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b89b"
  },
  "name": "Gandhidham Police Station",
  "area": "Near Collector Road",
  "district": "370205",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.07073,
  "longitude": 70.13519
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b89c"
  },
  "name": "Gandhidham Railway Police Station",
  "area": "Station Road",
  "district": "370205",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.06894,
  "longitude": 70.14692
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b89d"
  },
  "name": "Gandhidham Division Police Station",
  "area": "Adipur Road",
  "district": "370203",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.06345,
  "longitude": 70.12895
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b89e"
  },
  "name": "Police Station-Manjal",
  "area": "SH-42",
  "district": "Nakhatrana",
  "state": "Gujarat",
  "pincode": "370030",
  "latitude": 23.2352,
  "longitude": 69.4035
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b89f"
  },
  "name": "Kalikund Police Chowki",
  "area": "NH751",
  "district": "Dholka",
  "state": "Gujarat",
  "pincode": "382225",
  "latitude": 22.7418,
  "longitude": 72.4493
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8a0"
  },
  "name": "Lunawada Police Station",
  "area": "SH-5",
  "district": "389230",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.12537,
  "longitude": 73.60547
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8a1"
  },
  "name": "Police Station, Lunawada",
  "area": "Nagar Seva Sadan",
  "district": "Seva",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.12596,
  "longitude": 73.60959
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8a2"
  },
  "name": "Police Station Kacheri",
  "area": "Near Hospital Road",
  "district": "Bhuj",
  "state": "Gujarat",
  "pincode": "370020",
  "latitude": 23.24711,
  "longitude": 69.67411
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8a3"
  },
  "name": "Kacheri Police Station",
  "area": "Kapadvanj Market",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02687,
  "longitude": 73.0683
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8a4"
  },
  "name": "Mamlatdar Kacheri & Police Station",
  "area": "Lilia Mahal",
  "district": "365535",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.53799,
  "longitude": 71.36282
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8a5"
  },
  "name": "Police Station, Old Sakkar Bag Area",
  "area": "Station Road",
  "district": "City",
  "state": "Gujarat",
  "pincode": "362001",
  "latitude": 21.5287,
  "longitude": 70.45879
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8a6"
  },
  "name": "Rajula Police Station",
  "area": "SH-34",
  "district": "365560",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.03425,
  "longitude": 71.4419
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8a7"
  },
  "name": "Thaltej Police Station",
  "area": "Thaltej Shilaj Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380059",
  "latitude": 23.05049,
  "longitude": 72.5093
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8a8"
  },
  "name": "Thaltej Police Chowki",
  "area": "Drive In Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380052",
  "latitude": 23.0477,
  "longitude": 72.52737
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8a9"
  },
  "name": "Veraval Police Station",
  "area": "Veraval 362265",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.90581,
  "longitude": 70.37099
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8aa"
  },
  "name": "Maninager Police Station,styel Check,rambag",
  "area": "Ahmedabad",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.9976419189,
  "longitude": 72.602514495
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8ab"
  },
  "name": "Nagnath Police Chowki",
  "area": "Natwar Road",
  "district": "360490",
  "state": "Gujarat",
  "pincode": "Upleta 360490",
  "latitude": 21.744224,
  "longitude": 70.288235
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8ac"
  },
  "name": "Police Station-Balsinor",
  "area": "NH-59",
  "district": "388255",
  "state": "Gujarat",
  "pincode": "Balasinor 388255",
  "latitude": 22.9402577,
  "longitude": 73.3370485
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8ad"
  },
  "name": "Meghani Nagar Police Station",
  "area": "Near Last Bus Stop",
  "district": "Meghani",
  "state": "Gujarat",
  "pincode": "380016",
  "latitude": 23.057915,
  "longitude": 72.617822
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8ae"
  },
  "name": "SRPF Ground Naroda Patiya",
  "area": "Ahmedabad",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.0565407501,
  "longitude": 72.6461490998
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8af"
  },
  "name": "Police Station-Kaprada",
  "area": "Dharampur",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.34438,
  "longitude": 73.21393
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8b0"
  },
  "name": "Kaprada Police Station",
  "area": "SH-67",
  "district": "Dharampur",
  "state": "Gujarat",
  "pincode": "396065",
  "latitude": 20.34346,
  "longitude": 73.219129
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8b1"
  },
  "name": "Police Station-Kaprada",
  "area": "SH-183",
  "district": "Dharampur",
  "state": "Gujarat",
  "pincode": "396126",
  "latitude": 20.41394,
  "longitude": 73.12652
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8b2"
  },
  "name": "Juhapura Police Station",
  "area": "Ahmedabad",
  "district": "380055",
  "state": "Gujarat",
  "pincode": "380055",
  "latitude": 22.99368,
  "longitude": 72.527183
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8b3"
  },
  "name": "Amroli Police Station",
  "area": "Kosad Singh Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395008",
  "latitude": 21.238056,
  "longitude": 72.848555
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8b4"
  },
  "name": "Police Station-Khatodara",
  "area": "Udhana-Magdalla Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395002",
  "latitude": 21.1759,
  "longitude": 72.83114
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8b5"
  },
  "name": "Police Station-Valod",
  "area": "Valod",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "394640",
  "latitude": 21.0481422,
  "longitude": 73.2621571
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8b6"
  },
  "name": "Adajan Police Station",
  "area": "Surat",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.19302725,
  "longitude": 72.79265815
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8b7"
  },
  "name": "Police Station-Uun",
  "area": "SH-26",
  "district": "Un",
  "state": "Gujarat",
  "pincode": "451440",
  "latitude": 21.82118,
  "longitude": 75.45355
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8b8"
  },
  "name": "Umara Police Station",
  "area": "Ghod Dod Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395001",
  "latitude": 21.175741,
  "longitude": 72.809896
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8b9"
  },
  "name": "Sanvali Police Station",
  "area": "Police Line",
  "district": "Savli",
  "state": "Gujarat",
  "pincode": "391770",
  "latitude": 22.55741,
  "longitude": 73.222295
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8ba"
  },
  "name": "Gandhidham Police Station",
  "area": "Gandhidham",
  "district": "Gandhidham",
  "state": "Gujarat",
  "pincode": "Gandhidham",
  "latitude": 23.0708268576,
  "longitude": 70.1351218232
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8bb"
  },
  "name": "Sayajigunj Police Station",
  "area": "Tilak Marg",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390005",
  "latitude": 22.309768,
  "longitude": 73.18294
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8bc"
  },
  "name": "Bedi Marine Police Station",
  "area": "SH-26",
  "district": "361002",
  "state": "Gujarat",
  "pincode": "Jamnagar 361002",
  "latitude": 22.49395,
  "longitude": 70.04611
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8bd"
  },
  "name": "Police Station-Marin",
  "area": "Surat",
  "district": "394270",
  "state": "Gujarat",
  "pincode": "394270",
  "latitude": 21.09644,
  "longitude": 72.65033
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8be"
  },
  "name": "Mundra Marine Police Station",
  "area": "Mundra 370421",
  "district": "Mundra 370421",
  "state": "Gujarat",
  "pincode": "Mundra 370421",
  "latitude": 22.821219,
  "longitude": 69.723628
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8bf"
  },
  "name": "Police Pared Ground , Anand",
  "area": "Anand",
  "district": "388001",
  "state": "Gujarat",
  "pincode": "388001",
  "latitude": 22.5433484585,
  "longitude": 72.9614944284
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8c0"
  },
  "name": "Sayaji Ganj Police Station",
  "area": "Aurobindo Ghosh Road",
  "district": "Railway",
  "state": "Gujarat",
  "pincode": "390005",
  "latitude": 22.309759,
  "longitude": 73.182928
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8c1"
  },
  "name": "Police Station-Suigam",
  "area": "Vav",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 24.15842,
  "longitude": 71.35847
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8c2"
  },
  "name": "Police Station Suigam",
  "area": "Vav",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "385570",
  "latitude": 24.15859,
  "longitude": 71.35865
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8c3"
  },
  "name": "Chuda Police Station",
  "area": "Chuda",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "363410",
  "latitude": 22.484624,
  "longitude": 71.69678
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8c4"
  },
  "name": "Rural Police Line,nadiad",
  "area": "Rural Police Line",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "Nadiad 387001",
  "latitude": 22.690879,
  "longitude": 72.8609725
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8c5"
  },
  "name": "Khokhar Police Chowki",
  "area": "Ahmedabad",
  "district": "380008",
  "state": "Gujarat",
  "pincode": "380008",
  "latitude": 23.001525,
  "longitude": 72.620004
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8c6"
  },
  "name": "D C B Police Station-Pratap Nagar",
  "area": "Yashin Khan Pathan Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390017",
  "latitude": 22.29668,
  "longitude": 73.21527
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8c7"
  },
  "name": "Police Station Kalupur Outer",
  "area": "Ahmedabad",
  "district": "380002",
  "state": "Gujarat",
  "pincode": "380002",
  "latitude": 23.030798,
  "longitude": 72.59881
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8c8"
  },
  "name": "Lakkad Khod Police Station",
  "area": "Lakkad Road",
  "district": "Khod",
  "state": "Gujarat",
  "pincode": "395003",
  "latitude": 21.200902,
  "longitude": 72.836364
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8c9"
  },
  "name": "Police Station-Songadh",
  "area": "Songadh",
  "district": "Songadh",
  "state": "Gujarat",
  "pincode": "Songadh",
  "latitude": 21.1676,
  "longitude": 73.56134
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8ca"
  },
  "name": "Kalu Pur Police Chowki",
  "area": "Kalupur",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.030813,
  "longitude": 72.59784
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8cb"
  },
  "name": "Khambha Police Compound",
  "area": "Khambha",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "365650",
  "latitude": 21.141154,
  "longitude": 71.253473
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8cc"
  },
  "name": "Tambu Chowki",
  "area": "Dariapur",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.035585,
  "longitude": 72.593005
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8cd"
  },
  "name": "Kalidindi Police Station",
  "area": "SH-63",
  "district": "Kalidindi",
  "state": "Gujarat",
  "pincode": "521344",
  "latitude": 16.5085,
  "longitude": 81.29688
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8ce"
  },
  "name": "Radhanpur Circle Police Station",
  "area": "Mehsana 384002",
  "district": "Mehsana 384002",
  "state": "Gujarat",
  "pincode": "Mehsana 384002",
  "latitude": 23.605648,
  "longitude": 72.381653
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8cf"
  },
  "name": "Police Station-Neradigonda",
  "area": "Boath",
  "district": "Boath",
  "state": "Gujarat",
  "pincode": "Boath",
  "latitude": 19.30357,
  "longitude": 78.40682
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8d0"
  },
  "name": "Champaner-Police Station",
  "area": "Halol",
  "district": "Halol",
  "state": "Gujarat",
  "pincode": "Halol",
  "latitude": 22.46863,
  "longitude": 73.52319
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8d1"
  },
  "name": "Ahwa Police Station",
  "area": "Main Road Ahwa",
  "district": "394710",
  "state": "Gujarat",
  "pincode": "Ahwa 394710",
  "latitude": 20.7569446564,
  "longitude": 73.6875
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8d2"
  },
  "name": "Police Chowki Punagam",
  "area": "Surat",
  "district": "395010",
  "state": "Gujarat",
  "pincode": "395010",
  "latitude": 21.20263,
  "longitude": 72.87261
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8d3"
  },
  "name": "Police station-gotri",
  "area": "Vadodara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.31217,
  "longitude": 73.13322
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8d4"
  },
  "name": "Begampura Police Station",
  "area": "Nawabwadi Road",
  "district": "Begampura",
  "state": "Gujarat",
  "pincode": "395003",
  "latitude": 21.196303,
  "longitude": 72.83721
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8d5"
  },
  "name": "B Division Police Station Mehsana City",
  "area": "Sagar Society",
  "district": "Mehsana",
  "state": "Gujarat",
  "pincode": "Mehsana 384002",
  "latitude": 23.598815,
  "longitude": 72.378828
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8d6"
  },
  "name": "Sami Police Station",
  "area": "Shankheswar To Radhanpur Road Sami",
  "district": "Sami",
  "state": "Gujarat",
  "pincode": "384245",
  "latitude": 23.6872,
  "longitude": 71.77912
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8d7"
  },
  "name": "Satellite Police Station-Ramdev Nagar",
  "area": "Satellite Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380015",
  "latitude": 23.02746,
  "longitude": 72.51091
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8d8"
  },
  "name": "Tankara",
  "area": "Tankara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.72076,
  "longitude": 70.78475
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8d9"
  },
  "name": "Adishwarnagar Bit Chowki",
  "area": "Nava Naroda Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "382330",
  "latitude": 23.068425,
  "longitude": 72.660933
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8da"
  },
  "name": "નાયબ પોલીસ અધિક્ષક શ્રી ની કચેરી, વાપી",
  "area": "વાપી જી.આઇ.ડી.સી પોલીસ સ્ટેશન ની સામે",
  "district": "બ્રિગેડ",
  "state": "Gujarat",
  "pincode": "Valsad 396195",
  "latitude": 20.37133,
  "longitude": 72.90903
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8db"
  },
  "name": "Police Station-Palanpur",
  "area": "Palanpur 385001",
  "district": "Palanpur 385001",
  "state": "Gujarat",
  "pincode": "Palanpur 385001",
  "latitude": 24.19378,
  "longitude": 72.437
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8dc"
  },
  "name": "Town Police Station-Tadpatri",
  "area": "Putlur Road",
  "district": "515411",
  "state": "Gujarat",
  "pincode": "Tadipatri 515411",
  "latitude": 14.9094538,
  "longitude": 78.0092951
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8dd"
  },
  "name": "Vatva New Police Station",
  "area": "Vatva Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "382440",
  "latitude": 22.9609532205,
  "longitude": 72.6125482677
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8de"
  },
  "name": "Vatva Police Chowki",
  "area": "Ahmedabad",
  "district": "382445",
  "state": "Gujarat",
  "pincode": "382445",
  "latitude": 22.971415,
  "longitude": 72.62839
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8df"
  },
  "name": "Rokadnath Police Station",
  "area": "Navabazar",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390001",
  "latitude": 22.303333,
  "longitude": 73.206389
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8e0"
  },
  "name": "Police Station-Sankheda",
  "area": "Sankheda",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "391125",
  "latitude": 22.1947,
  "longitude": 73.54139
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8e1"
  },
  "name": "Umbergaon Police Chowki",
  "area": "Umargam",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "396170",
  "latitude": 20.19917,
  "longitude": 72.7503
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8e2"
  },
  "name": "Harni Police Station",
  "area": "Harni",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390022",
  "latitude": 22.35026,
  "longitude": 73.229223
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8e3"
  },
  "name": "Police Station-Ramol Chokdi",
  "area": "Vatva Gidc Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "382445",
  "latitude": 22.96713,
  "longitude": 72.64669
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8e4"
  },
  "name": "Subhash Bridge Police Station",
  "area": "Ashram Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380027",
  "latitude": 23.066363,
  "longitude": 72.582604
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8e5"
  },
  "name": "Police Station-City Wadhwan",
  "area": "Dudhrej Road",
  "district": "363001",
  "state": "Gujarat",
  "pincode": "Dudhrej 363001",
  "latitude": 22.72507,
  "longitude": 71.62842
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8e6"
  },
  "name": "Vastral Ring Road Police Chowki",
  "area": "Ahmedabad",
  "district": "382418",
  "state": "Gujarat",
  "pincode": "382418",
  "latitude": 22.999633,
  "longitude": 72.666705
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8e7"
  },
  "name": "Vastral Police Chowki",
  "area": "Ahmedabad",
  "district": "382418",
  "state": "Gujarat",
  "pincode": "382418",
  "latitude": 23.002493,
  "longitude": 72.649253
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8e8"
  },
  "name": "Police Station-Mehsana",
  "area": "Mehsana 384002",
  "district": "Mehsana 384002",
  "state": "Gujarat",
  "pincode": "Mehsana 384002",
  "latitude": 23.60787,
  "longitude": 72.38215
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8e9"
  },
  "name": "Vadtal Police Station",
  "area": "Nadiad 387375",
  "district": "Nadiad 387375",
  "state": "Gujarat",
  "pincode": "Nadiad 387375",
  "latitude": 22.5945432,
  "longitude": 72.87367
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8ea"
  },
  "name": "Rural Police Station-Tadipatri",
  "area": "SH-31",
  "district": "515411",
  "state": "Gujarat",
  "pincode": "Tadipatri 515411",
  "latitude": 14.9044712,
  "longitude": 78.0199311
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8eb"
  },
  "name": "Halvad police station",
  "area": "Halvad",
  "district": "Halvad",
  "state": "Gujarat",
  "pincode": "Halvad",
  "latitude": 23.0133320241,
  "longitude": 71.1759287854
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8ec"
  },
  "name": "Police Station Madhapar",
  "area": "Bhuj 370020",
  "district": "Bhuj 370020",
  "state": "Gujarat",
  "pincode": "Bhuj 370020",
  "latitude": 23.24076,
  "longitude": 69.71083
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8ed"
  },
  "name": "Police Station-Chhani",
  "area": "Rama Kaka Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "391740",
  "latitude": 22.36489,
  "longitude": 73.16756
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8ee"
  },
  "name": "Chhani Jagat Naka Police Station",
  "area": "Vadodara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "390024",
  "latitude": 22.343076,
  "longitude": 73.177316
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8ef"
  },
  "name": "Tarsali Police Chowki",
  "area": "Maharshi Dayanand Marg",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390009",
  "latitude": 22.257375,
  "longitude": 73.212343
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8f0"
  },
  "name": "Superintendent of Police",
  "area": "DC 5",
  "district": "Adipur",
  "state": "Gujarat",
  "pincode": "Gandhidham 370205",
  "latitude": 23.068416,
  "longitude": 70.103438
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8f1"
  },
  "name": "Office of the Superintendent of Police",
  "area": "Dudhrej 363001",
  "district": "Dudhrej 363001",
  "state": "Gujarat",
  "pincode": "Dudhrej 363001",
  "latitude": 22.72766,
  "longitude": 71.62114
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8f2"
  },
  "name": "Madhapur Police Stations",
  "area": "Madhavpura",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380004",
  "latitude": 23.01632,
  "longitude": 72.61359
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8f3"
  },
  "name": "Piplod Police Chowki",
  "area": "Surat Dumas Road",
  "district": "Lake",
  "state": "Gujarat",
  "pincode": "395007",
  "latitude": 21.1683205,
  "longitude": 72.7785810667
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8f4"
  },
  "name": "Police Station-Kuvadva Road",
  "area": "Kuvadva Road",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.32259,
  "longitude": 70.84674
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8f5"
  },
  "name": "Police Station-Bhelupur",
  "area": "SH-6",
  "district": "388530",
  "state": "Gujarat",
  "pincode": "Borsad 388530",
  "latitude": 22.36355,
  "longitude": 72.90429
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8f6"
  },
  "name": "Dakor Police Station",
  "area": "SH-60",
  "district": "388225",
  "state": "Gujarat",
  "pincode": "Dakor 388225",
  "latitude": 22.7517454703,
  "longitude": 73.1519401073
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8f7"
  },
  "name": "Thorala Police Station",
  "area": "Bhavnagar Road",
  "district": "",
  "state": "Gujarat",
  "pincode": "360003",
  "latitude": 22.29191,
  "longitude": 70.8220933
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8f8"
  },
  "name": "Police Station",
  "area": "Khed Brahma",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "383255",
  "latitude": 24.037439,
  "longitude": 73.049036
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8f9"
  },
  "name": "Anandnagar Police Station",
  "area": "Satellite Service Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380015",
  "latitude": 23.0237385333,
  "longitude": 72.5331023333
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8fa"
  },
  "name": "Jambusar Bypass Police Chowki",
  "area": "Dahej Road",
  "district": "Bypass",
  "state": "Gujarat",
  "pincode": "Bharuch 392001",
  "latitude": 21.705438,
  "longitude": 72.966119
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8fb"
  },
  "name": "Jambusar Police Station",
  "area": "Near Juma Masjid Road",
  "district": "392001",
  "state": "Gujarat",
  "pincode": "Bharuch 392001",
  "latitude": 21.69288,
  "longitude": 72.983366
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8fc"
  },
  "name": "Police Station-Rajkot Sub-District",
  "area": "Rajkot",
  "district": "360025",
  "state": "Gujarat",
  "pincode": "360025",
  "latitude": 22.13843,
  "longitude": 70.98323
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8fd"
  },
  "name": "Pandesara Police Station",
  "area": "Pani Ki Tanki Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "394220",
  "latitude": 21.1485068007,
  "longitude": 72.8328092502
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8fe"
  },
  "name": "Nagnath Gate Police Chowki",
  "area": "I. G. Road",
  "district": "361001",
  "state": "Gujarat",
  "pincode": "Jamnagar 361001",
  "latitude": 22.47259,
  "longitude": 70.07884
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b8ff"
  },
  "name": "Police Chowki Idgah",
  "area": "Idgah Circle",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380004",
  "latitude": 23.040464,
  "longitude": 72.596364
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b900"
  },
  "name": "Khadia Police Station",
  "area": "Ahmedabad",
  "district": "380001",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.0173465284,
  "longitude": 72.5946138707
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b901"
  },
  "name": "Ambavadi Police Line",
  "area": "Himatnagar 383001",
  "district": "Himatnagar 383001",
  "state": "Gujarat",
  "pincode": "Himatnagar 383001",
  "latitude": 23.596269,
  "longitude": 72.967718
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b902"
  },
  "name": "Police Station Lal Bazar",
  "area": "Bharuch 392001",
  "district": "Bharuch 392001",
  "state": "Gujarat",
  "pincode": "Bharuch 392001",
  "latitude": 21.693798,
  "longitude": 72.980688
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b903"
  },
  "name": "Police Station-Khanpur",
  "area": "Khanpur Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.0304,
  "longitude": 72.57702
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b904"
  },
  "name": "Kamal Bagh Police Station",
  "area": "MG Road Opposite - Kamla Nehru Park",
  "district": "360575",
  "state": "Gujarat",
  "pincode": "Porbandar 360575",
  "latitude": 21.63918,
  "longitude": 69.623174
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b905"
  },
  "name": "Kamlabaug Police Station",
  "area": "Porbandar",
  "district": "Porbandar",
  "state": "Gujarat",
  "pincode": "Porbandar",
  "latitude": 21.63791716,
  "longitude": 69.6262091308
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b906"
  },
  "name": "Kirti Mandir Police Station",
  "area": "Kirti Mandir Road",
  "district": "360575",
  "state": "Gujarat",
  "pincode": "Porbandar 360575",
  "latitude": 21.642323,
  "longitude": 69.600742
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b907"
  },
  "name": "Juni Fuvara Police Lines",
  "area": "Porbandar 360575",
  "district": "Porbandar 360575",
  "state": "Gujarat",
  "pincode": "Porbandar 360575",
  "latitude": 21.639335,
  "longitude": 69.610527
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b908"
  },
  "name": "Police Station-Datha",
  "area": "Talaja 364130",
  "district": "Talaja 364130",
  "state": "Gujarat",
  "pincode": "Talaja 364130",
  "latitude": 21.20257,
  "longitude": 71.96023
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b909"
  },
  "name": "Bhuj Central Jail",
  "area": "Bhuj 370002",
  "district": "Bhuj 370002",
  "state": "Gujarat",
  "pincode": "Bhuj 370002",
  "latitude": 23.2416,
  "longitude": 69.71129
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b90a"
  },
  "name": "Police Station Chowk Bazar",
  "area": "Surat",
  "district": "395003",
  "state": "Gujarat",
  "pincode": "395003",
  "latitude": 21.218458,
  "longitude": 72.822073
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b90b"
  },
  "name": "Bhadran Police Station",
  "area": "Borsad 388530",
  "district": "Borsad 388530",
  "state": "Gujarat",
  "pincode": "Borsad 388530",
  "latitude": 22.3598861953,
  "longitude": 72.9032490368
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b90c"
  },
  "name": "Police Station-Tadepalligudem",
  "area": "Tadepalligudem 534101",
  "district": "Tadepalligudem 534101",
  "state": "Gujarat",
  "pincode": "Tadepalligudem 534101",
  "latitude": 16.81424,
  "longitude": 81.5272
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b90d"
  },
  "name": "Mendarda Police Line",
  "area": "SH-26",
  "district": "Mendarda",
  "state": "Gujarat",
  "pincode": "362260",
  "latitude": 21.321977,
  "longitude": 70.444416
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b90e"
  },
  "name": "Heerapur Police Chowki",
  "area": "Mahemdabad Road",
  "district": "Badodara",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.91582,
  "longitude": 72.70014
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b90f"
  },
  "name": "Sachin Police Station",
  "area": "Old Surat Mumbai Highway",
  "district": "Kanade",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.08736,
  "longitude": 72.8816
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b910"
  },
  "name": "Manmohan Police Station",
  "area": "Nikhol Odhav Road",
  "district": "Nicol",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.03709,
  "longitude": 72.66203
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b911"
  },
  "name": "Police Station-Madhavpur",
  "area": "NH-51",
  "district": "362225",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.15947,
  "longitude": 70.07258
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b912"
  },
  "name": "Police Station, Madhavpur",
  "area": "Nh51",
  "district": "Bus-Station",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.2574,
  "longitude": 69.96388
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b913"
  },
  "name": "Ranavav Police Station",
  "area": "SH-95",
  "district": "Ranavav",
  "state": "Gujarat",
  "pincode": "360550",
  "latitude": 21.68254,
  "longitude": 69.74358
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b914"
  },
  "name": "Police Station Sikka",
  "area": "Nagani Road",
  "district": "Gram",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.43335,
  "longitude": 69.83799
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b915"
  },
  "name": "Gondal Police Station",
  "area": "SH-31",
  "district": "Vavdi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.77577,
  "longitude": 70.81114
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b916"
  },
  "name": "Gondal Taluka Police Station",
  "area": "SH-320",
  "district": "Madhda",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.85186,
  "longitude": 71.02578
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b917"
  },
  "name": "Gondal City Police Station",
  "area": "Gj Sh122",
  "district": "Bhagavatpara",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.96799,
  "longitude": 70.80772
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b918"
  },
  "name": "Gondal Road Cheak Post",
  "area": "Ring Road",
  "district": "Vavdi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.24277,
  "longitude": 70.7997
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b919"
  },
  "name": "Gondal Police Head Quarter",
  "area": "Sukhnath Nagar",
  "district": "Phase",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.96731,
  "longitude": 70.80804
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b91a"
  },
  "name": "Police Station-Kothara",
  "area": "Near Sh91",
  "district": "Rural",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.1317,
  "longitude": 68.9376
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b91b"
  },
  "name": "Kothara Police Station",
  "area": "SH-91",
  "district": "Kothara",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.13095,
  "longitude": 68.94093
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b91c"
  },
  "name": "Kesar Police Station",
  "area": "Main Road",
  "district": "Grampanchayat",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.73598,
  "longitude": 73.31589
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b91d"
  },
  "name": "B Div Police Station",
  "area": "Bambakama Road",
  "district": "Panchabatti",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.69181,
  "longitude": 72.97457
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b91e"
  },
  "name": "Jarod Outpost Police Station",
  "area": "Jarod Baypass",
  "district": "Of",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.44038,
  "longitude": 73.3367
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b91f"
  },
  "name": "Police Chowki Jarod",
  "area": "SH-63",
  "district": "391510",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.4821,
  "longitude": 73.30053
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b920"
  },
  "name": "Police Chawki",
  "area": "Indira Gandhi Road",
  "district": "Chhaya",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.62804,
  "longitude": 69.63484
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b921"
  },
  "name": "Chhiri Police Chawki",
  "area": "Koparli Road",
  "district": "(Pardi)",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.37852,
  "longitude": 72.93916
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b922"
  },
  "name": "Rentlav Police Chawki",
  "area": "Nh8",
  "district": "Rentlav",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.46145,
  "longitude": 72.91986
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b923"
  },
  "name": "Saraspur Police Chowki",
  "area": "Shri Vasudevdasji Maharaj Marg",
  "district": "Kadiawad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.03118,
  "longitude": 72.61079
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b924"
  },
  "name": "Bombay Housing Police Chowki Saraspur",
  "area": "Rakhial Road",
  "district": "Saraspura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02158,
  "longitude": 72.60951
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b925"
  },
  "name": "Saiyad Pura Police Station",
  "area": "Raghunathpura Station Road",
  "district": "Hospital",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.20682,
  "longitude": 72.82586
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b926"
  },
  "name": "Chandod Police Chowki",
  "area": "Chandod Village Road",
  "district": "Chandod",
  "state": "Gujarat",
  "pincode": "391105",
  "latitude": 21.99061,
  "longitude": 73.45238
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b927"
  },
  "name": "Aproch Police Chowki Thakkarbapa Nagar",
  "area": "India Colony Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "382350",
  "latitude": 23.03912,
  "longitude": 72.63936
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b928"
  },
  "name": "Police Stations Parda",
  "area": "Near Bus Stand Road",
  "district": "Pur",
  "state": "Gujarat",
  "pincode": "391440",
  "latitude": 22.2418,
  "longitude": 73.0839
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b929"
  },
  "name": "Dhoraji City Police Station",
  "area": "Blue Star Cinema",
  "district": "New",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.73009,
  "longitude": 70.45088
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b92a"
  },
  "name": "Naroda Police Station",
  "area": "Sutarna Karkhana Road",
  "district": "Makarpura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.07834,
  "longitude": 72.65644
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b92b"
  },
  "name": "Sri Siddhi Vinayaka Police Chowk Memar",
  "area": "SH-3",
  "district": "387130",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.8326,
  "longitude": 72.76359
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b92c"
  },
  "name": "Vapi GIDC Police Station",
  "area": "Koprali Road",
  "district": "Balitha",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.37536,
  "longitude": 72.9205
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b92d"
  },
  "name": "GIDC Police Station",
  "area": "Gidc Road",
  "district": "Pulp",
  "state": "Gujarat",
  "pincode": "396191",
  "latitude": 20.36099,
  "longitude": 72.92202
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b92e"
  },
  "name": "Gidc Police Chowki",
  "area": "Savli Halol Road",
  "district": "Industrial",
  "state": "Gujarat",
  "pincode": "389350",
  "latitude": 22.53046,
  "longitude": 73.4649
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b92f"
  },
  "name": "GIDC Police Station",
  "area": "Gidc",
  "district": "GIDC",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.17001,
  "longitude": 72.81663
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b930"
  },
  "name": "GIDC Police Station",
  "area": "Gidc",
  "district": "Dehgam",
  "state": "Gujarat",
  "pincode": "382305",
  "latitude": 23.17066,
  "longitude": 72.8205
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b931"
  },
  "name": "Gidc Police Chowki",
  "area": "Bhavnagar Road",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360002",
  "latitude": 22.28146,
  "longitude": 70.83321
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b932"
  },
  "name": "Hazira Marine Police Station",
  "area": "Adajan Hajira Road",
  "district": "Gam",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.09657,
  "longitude": 72.65087
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b933"
  },
  "name": "Hazira Police Station",
  "area": "Hazira Road",
  "district": "And",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.14657,
  "longitude": 72.66049
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b934"
  },
  "name": "Ankleshwar Police Station",
  "area": "NH-64",
  "district": "Anklesvar",
  "state": "Gujarat",
  "pincode": "393001",
  "latitude": 21.6337,
  "longitude": 72.99245
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b935"
  },
  "name": "Ankleshwar Rural Police Station",
  "area": "Ankleshwar Civil Court",
  "district": "Anklesvar",
  "state": "Gujarat",
  "pincode": "393001",
  "latitude": 21.62783,
  "longitude": 73.00896
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b936"
  },
  "name": "Talod Police Station",
  "area": "Civil Road",
  "district": "383215",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.35132,
  "longitude": 72.94932
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b937"
  },
  "name": "Mangrol Police Station",
  "area": "Sh97",
  "district": "Peer",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.12445,
  "longitude": 70.11995
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b938"
  },
  "name": "Khanpur Police Station",
  "area": "Bakor Road",
  "district": "Bakor",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.34313,
  "longitude": 73.60609
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b939"
  },
  "name": "Madiya Police Chowki",
  "area": "SH-5",
  "district": "383317",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.53836,
  "longitude": 73.31244
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b93a"
  },
  "name": "Chipwad Police Chowki Valsad",
  "area": "Sri Chamunda",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "396001",
  "latitude": 20.61826,
  "longitude": 72.93246
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b93b"
  },
  "name": "Nayab Police Station",
  "area": "Porbandar Airport Road",
  "district": "Sai",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.64575,
  "longitude": 69.6567
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b93c"
  },
  "name": "Nayab Police Station",
  "area": "Station Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.77904,
  "longitude": 73.62122
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b93d"
  },
  "name": "Nayab Police Station",
  "area": "Bhagatsinh Road",
  "district": "Gavliwad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30003,
  "longitude": 70.79852
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b93e"
  },
  "name": "Nayab Police Station",
  "area": "Sant Kabir Road",
  "district": "Mohalla",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29674,
  "longitude": 73.21541
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b93f"
  },
  "name": "Paliwal Police Station",
  "area": "Sachin GIDC Road 6",
  "district": "Gabheni",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.09204,
  "longitude": 72.86225
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b940"
  },
  "name": "Vav Police Station",
  "area": "Nh15",
  "district": "385575",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.35965,
  "longitude": 71.51637
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b941"
  },
  "name": "Shaktinagar Police Chowki",
  "area": "Khodiyar Colony",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.46781,
  "longitude": 70.04811
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b942"
  },
  "name": "Sabarmati Police Commissioner Office",
  "area": "Bulakhidas Road",
  "district": "Police",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.08564,
  "longitude": 72.59127
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b943"
  },
  "name": "Gundavadi Police Chowki",
  "area": "Canal Road",
  "district": "Laxmiwadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.28881,
  "longitude": 70.80806
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b944"
  },
  "name": "Bhiloda Police Chowki",
  "area": "SH-10",
  "district": "383245",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.76972,
  "longitude": 73.2406
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b945"
  },
  "name": "Bhiloda Police Station",
  "area": "SH-10",
  "district": "383245",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.76961,
  "longitude": 73.24053
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b946"
  },
  "name": "Police Station Mithapur",
  "area": "NH-51",
  "district": "365555",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.929,
  "longitude": 71.3457
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b947"
  },
  "name": "Nava Bilimora Police Station",
  "area": "Karmavir Nagar",
  "district": "Sh210",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.71866,
  "longitude": 72.87067
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b948"
  },
  "name": "Dawrka Police Station",
  "area": "NH151A",
  "district": "Dwarka",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.24544,
  "longitude": 68.96431
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b949"
  },
  "name": "Kasor Out Post Police",
  "area": "Kasor Road",
  "district": "Kasor",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.54928,
  "longitude": 72.77582
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b94a"
  },
  "name": "Tambu Police Station",
  "area": "Sant Surdas Road",
  "district": "Vadigam",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.03557,
  "longitude": 72.59294
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b94b"
  },
  "name": "SRP Tambu Police Chordia Panigate",
  "area": "Gurunathan Mandir",
  "district": "Moghulwada",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29745,
  "longitude": 73.21545
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b94c"
  },
  "name": "Nandasan Police Station",
  "area": "Sh189",
  "district": "Nandasan",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.37978,
  "longitude": 72.40687
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b94d"
  },
  "name": "Limkheda Police Station",
  "area": "NH147D",
  "district": "Town",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.83274,
  "longitude": 73.98735
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b94e"
  },
  "name": "Police Station-Nakhatrana",
  "area": "SH-42",
  "district": "Nagalpar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.3446,
  "longitude": 69.2713
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b94f"
  },
  "name": "Hudco Police Chowki",
  "area": "Kothariya Main Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.26302,
  "longitude": 70.81483
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b950"
  },
  "name": "Narsanda Police Station",
  "area": "Narol Naroda Road",
  "district": "Taluka",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.63205,
  "longitude": 72.90004
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b951"
  },
  "name": "Rangpur Police Station",
  "area": "Rangapur Road",
  "district": "Rangapur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.37541,
  "longitude": 74.16789
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b952"
  },
  "name": "Amraiwadi Police Station",
  "area": "Amraiwadi Village Road",
  "district": "Amraiwadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.00667,
  "longitude": 72.62486
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b953"
  },
  "name": "Ghodasar Police Station",
  "area": "Ghodasar Road",
  "district": "Ghodasar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.98649,
  "longitude": 72.61141
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b954"
  },
  "name": "Ranpur Police Station",
  "area": "Ranpur 382245",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.35345,
  "longitude": 71.71433
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b955"
  },
  "name": "Gotri Police Station",
  "area": "Gotri Road",
  "district": "Gotri",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.31001,
  "longitude": 73.13865
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b956"
  },
  "name": "Gotri Police Station",
  "area": "Gotri To Sindhrot Road",
  "district": "Hyundai",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.31824,
  "longitude": 73.12367
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b957"
  },
  "name": "Gotri Road Police Station",
  "area": "S K Chaudhari Marg",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.31338,
  "longitude": 73.1452
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b958"
  },
  "name": "Kanij Police Chowki",
  "area": "SH-3",
  "district": "387120",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.87473,
  "longitude": 72.7281
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b959"
  },
  "name": "Bakrol Road Post Police Chowki",
  "area": "NH751",
  "district": "Village",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.93649,
  "longitude": 72.49765
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b95a"
  },
  "name": "Police Station Valod",
  "area": "Sh187 Ambaji Street",
  "district": "394640",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.04807,
  "longitude": 73.2621
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b95b"
  },
  "name": "Kamalpura Police Station",
  "area": "Kamalpura Road",
  "district": "Ambedker",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.17685,
  "longitude": 72.44351
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b95c"
  },
  "name": "Sihor Police Station",
  "area": "Parmat St",
  "district": "Post",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.7137,
  "longitude": 71.96008
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b95d"
  },
  "name": "Sagbara Police Station",
  "area": "NH753B",
  "district": "393050",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.54418,
  "longitude": 73.79127
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b95e"
  },
  "name": "Juhapura Police Chowki",
  "area": "Jawaharlal Nehru Road",
  "district": "Park",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.99355,
  "longitude": 72.52677
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b95f"
  },
  "name": "Karnawati Police Chowki",
  "area": "Lambha Vatva Road",
  "district": "Vatwa",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.94659,
  "longitude": 72.59639
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b960"
  },
  "name": "Police Station-Samakhiyali",
  "area": "Near Nh8a",
  "district": "Sub",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.3073,
  "longitude": 70.4967
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b961"
  },
  "name": "Kavat Police Station Kadipani",
  "area": "SH-62",
  "district": "391175",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.01163,
  "longitude": 74.09178
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b962"
  },
  "name": "Bapod Police Station",
  "area": "Swarnim Gujarat Ring Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30551,
  "longitude": 73.23887
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b963"
  },
  "name": "Banba Gate Police Chowki",
  "area": "SH-97",
  "district": "360490",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.74073,
  "longitude": 70.28392
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b964"
  },
  "name": "Police Station B Chavadi",
  "area": "New Station Road",
  "district": "Dhatia",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.24957,
  "longitude": 69.66856
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b965"
  },
  "name": "Chavadi Gate Police Chowki",
  "area": "Vadava Road",
  "district": "Bagh",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.7734,
  "longitude": 72.1364
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b966"
  },
  "name": "Pavagadh Police Station",
  "area": "Halol Pavagad Road",
  "district": "Pavagad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.48475,
  "longitude": 73.53453
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b967"
  },
  "name": "New Maninagar Policeh Chowki",
  "area": "Sardar Patel Ring Road",
  "district": "Maninagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.98439,
  "longitude": 72.64253
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b968"
  },
  "name": "Maninagar Police Station",
  "area": "Lala Lajpatrai Marg",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.99841,
  "longitude": 72.60241
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b969"
  },
  "name": "Maninagar Police Chowki",
  "area": "Ramkrishna Paramhansa Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.00017,
  "longitude": 72.60709
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b96a"
  },
  "name": "Railway Station Police Chowki Maninagar",
  "area": "Punit Maharaj Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.99826,
  "longitude": 72.61144
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b96b"
  },
  "name": "Dosabhai Bag Police Station",
  "area": "Tower Rd",
  "district": "Bank",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.70009,
  "longitude": 72.54621
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b96c"
  },
  "name": "Jayarathna Police Chowki",
  "area": "R V Desai Road",
  "district": "Kevdabaug",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29281,
  "longitude": 73.20335
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b96d"
  },
  "name": "Police Station-Deesa",
  "area": "Nh14 Banaskantha Road",
  "district": "385530",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.1506,
  "longitude": 71.98456
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b96e"
  },
  "name": "Police Station-Deesa",
  "area": "Nh14 Banaskantha Road",
  "district": "385535",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.25767,
  "longitude": 72.18946
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b96f"
  },
  "name": "Deesa Town Police Station",
  "area": "Jagruti Trust Hospital",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.25553,
  "longitude": 72.1759
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b970"
  },
  "name": "Thorala Police Station",
  "area": "Bhavnagar Road",
  "district": "Pura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29178,
  "longitude": 70.8225
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b971"
  },
  "name": "Kosamba Police Chowki",
  "area": "Nana Borsara",
  "district": "394125",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.52759,
  "longitude": 73.00462
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b972"
  },
  "name": "Kadi Police Station",
  "area": "Kadi",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.2753478,
  "longitude": 72.31922825
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b973"
  },
  "name": "Police station-Fatepuri",
  "area": "Ahmedabad",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "380007",
  "latitude": 23.00743,
  "longitude": 72.55756
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b974"
  },
  "name": "Navapura Police Chowki",
  "area": "31",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "395003",
  "latitude": 21.196296,
  "longitude": 72.834486
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b975"
  },
  "name": "Apaksh Sarkar",
  "area": "NIKOL WORD",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "382330",
  "latitude": 23.0442791,
  "longitude": 72.6746216
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b976"
  },
  "name": "Gadhechi Police Chowki",
  "area": "Railway Compound",
  "district": "Bhavnagar",
  "state": "Gujarat",
  "pincode": "364003",
  "latitude": 21.765844,
  "longitude": 72.117101
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b977"
  },
  "name": "Kasba Police Chowki",
  "area": "Mehsana",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "384001",
  "latitude": 23.599491,
  "longitude": 72.393123
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b978"
  },
  "name": "Mora Police Station",
  "area": "Surat",
  "district": "394510",
  "state": "Gujarat",
  "pincode": "394510",
  "latitude": 21.178543746,
  "longitude": 72.659571593
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b979"
  },
  "name": "Police Station-Bhuj",
  "area": "Bhuj 370001",
  "district": "Bhuj 370001",
  "state": "Gujarat",
  "pincode": "Bhuj 370001",
  "latitude": 23.255,
  "longitude": 69.65712
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b97a"
  },
  "name": "Police Station-Chhota Udaypur",
  "area": "Chhota Udepur",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "391165",
  "latitude": 22.3031,
  "longitude": 74.01601
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b97b"
  },
  "name": "Ajit Mill Police Chowki",
  "area": "Ajit Mill Char Rasta",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380023",
  "latitude": 23.019945,
  "longitude": 72.632955
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b97c"
  },
  "name": "Police Head Quarters",
  "area": "Maharshi Arvinda Marg",
  "district": "Police",
  "state": "Gujarat",
  "pincode": "362001",
  "latitude": 21.514901,
  "longitude": 70.459844
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b97d"
  },
  "name": "Gondal City Police Station",
  "area": "Opp-SRP Camp",
  "district": "Gondal",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 21.963161981,
  "longitude": 70.8022559949
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b97e"
  },
  "name": "Government Police School",
  "area": "Police Line Kehti Road",
  "district": "Anand",
  "state": "Gujarat",
  "pincode": "388001",
  "latitude": 22.542861,
  "longitude": 72.960725
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b97f"
  },
  "name": "Gingita Police Station",
  "area": "Dr Ambedkar Marg",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.03037,
  "longitude": 72.58754
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b980"
  },
  "name": "Police Station-Bagbahra",
  "area": "NH-217",
  "district": "Bagbahara",
  "state": "Gujarat",
  "pincode": "493449",
  "latitude": 21.05163,
  "longitude": 82.37867
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b981"
  },
  "name": "Chandola Police Chowki",
  "area": "Dani Limda Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380028",
  "latitude": 22.98932,
  "longitude": 72.582346
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b982"
  },
  "name": "Shirapur Police Station",
  "area": "Shirpur",
  "district": "Maharashtra",
  "state": "Gujarat",
  "pincode": "425405",
  "latitude": 21.3485,
  "longitude": 74.88328
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b983"
  },
  "name": "city police-station, surendranagar",
  "area": "Dudhrej",
  "district": "Dudhrej",
  "state": "Gujarat",
  "pincode": "Dudhrej",
  "latitude": 22.7228094153,
  "longitude": 71.6446283953
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b984"
  },
  "name": "Police Station-Tadipatri",
  "area": "SH-31",
  "district": "Tadpatri",
  "state": "Gujarat",
  "pincode": "515411",
  "latitude": 14.89794,
  "longitude": 78.02768
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b985"
  },
  "name": "Police Station-Dhngnghra",
  "area": "SH-7",
  "district": "Dhrangadhra",
  "state": "Gujarat",
  "pincode": "363310",
  "latitude": 22.99711,
  "longitude": 71.4658
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b986"
  },
  "name": "Police Chowki-Kasak",
  "area": "Bharuch",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "392012",
  "latitude": 21.70341,
  "longitude": 73.00231
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b987"
  },
  "name": "Police Station-Zinzuwada",
  "area": "Dasada",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.34976,
  "longitude": 71.65529
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b988"
  },
  "name": "Halol Police Station",
  "area": "Halol",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "389350",
  "latitude": 22.501645,
  "longitude": 73.481672
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b989"
  },
  "name": "Police Station-Champaner",
  "area": "Halol",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "389360",
  "latitude": 22.46794,
  "longitude": 73.52402
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b98a"
  },
  "name": "Police Station-Morbi",
  "area": "SH-22",
  "district": "Morbi",
  "state": "Gujarat",
  "pincode": "363642",
  "latitude": 22.85899638,
  "longitude": 70.85265571
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b98b"
  },
  "name": "Police Station-Civil Hospital",
  "area": "Meganei Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380016",
  "latitude": 23.05309,
  "longitude": 72.61041
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b98c"
  },
  "name": "Bajrangwadi Police Chowki",
  "area": "Jam Nagar Road",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360006",
  "latitude": 22.321285,
  "longitude": 70.781525
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b98d"
  },
  "name": "Khokhra Police Station",
  "area": "Ahmedabad",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.9939006,
  "longitude": 72.620757
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b98e"
  },
  "name": "Police Station-Guvnl",
  "area": "Dudh Sagar Road",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360003",
  "latitude": 22.29401,
  "longitude": 70.82098
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b98f"
  },
  "name": "Police Parade Ground",
  "area": "Head Quarter Road",
  "district": "Police",
  "state": "Gujarat",
  "pincode": "362001",
  "latitude": 21.513299,
  "longitude": 70.458776
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b990"
  },
  "name": "Ghataprabha Police Station",
  "area": "Ghataprabha",
  "district": "Karnataka",
  "state": "Gujarat",
  "pincode": "591306",
  "latitude": 16.235933,
  "longitude": 74.765133
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b991"
  },
  "name": "Marine Police Station",
  "area": "Surat",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "394270",
  "latitude": 21.147077,
  "longitude": 72.661101
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b992"
  },
  "name": "Police Station-Raipur",
  "area": "Thasra",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "388225",
  "latitude": 22.78688,
  "longitude": 73.1045
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b993"
  },
  "name": "Killa Pardi Police Station",
  "area": "Pardi",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "396125",
  "latitude": 20.507731,
  "longitude": 72.946563
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b994"
  },
  "name": "Alipura Police Chowki",
  "area": "Sankheda",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "391135",
  "latitude": 22.275111,
  "longitude": 73.716435
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b995"
  },
  "name": "Police Station-Dhirol",
  "area": "Talaja",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "364150",
  "latitude": 21.4783,
  "longitude": 72.03494
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b996"
  },
  "name": "Saurabh Police Chowki",
  "area": "TGB Hotel Road",
  "district": "Amarapali",
  "state": "Gujarat",
  "pincode": "395009",
  "latitude": 21.193668,
  "longitude": 72.783419
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b997"
  },
  "name": "Kishanwadi Police Station",
  "area": "Vadodara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "390019",
  "latitude": 22.30924,
  "longitude": 73.22937
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b998"
  },
  "name": "Kishan Vadi Police Chowki",
  "area": "Vadodara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "390019",
  "latitude": 22.308983,
  "longitude": 73.228522
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b999"
  },
  "name": "Police Station-Lakhtar",
  "area": "Lakhtar",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.85988,
  "longitude": 71.78313
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b99a"
  },
  "name": "Ahmedabad Traffic Police",
  "area": "Ahmedabad",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "380004",
  "latitude": 23.05451,
  "longitude": 72.58761
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b99b"
  },
  "name": "Police Station Salon Bazar",
  "area": "Nadiad 387001",
  "district": "Nadiad 387001",
  "state": "Gujarat",
  "pincode": "Nadiad 387001",
  "latitude": 22.69579,
  "longitude": 72.870139
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b99c"
  },
  "name": "Police Station-Haripura",
  "area": "Ahmedabad",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "380008",
  "latitude": 22.98821,
  "longitude": 72.61695
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b99d"
  },
  "name": "Buhari Police Station",
  "area": "Buhari",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "394630",
  "latitude": 20.967255,
  "longitude": 73.309295
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b99e"
  },
  "name": "Police Chowki",
  "area": "Bhavnagar 364002",
  "district": "Bhavnagar 364002",
  "state": "Gujarat",
  "pincode": "Bhavnagar 364002",
  "latitude": 21.748806,
  "longitude": 72.148173
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b99f"
  },
  "name": "Police Parade Ground",
  "area": "RTO Road",
  "district": "Area",
  "state": "Gujarat",
  "pincode": "Bhavnagar 364002",
  "latitude": 21.755282,
  "longitude": 72.130759
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9a0"
  },
  "name": "Akhlol Police Station",
  "area": "Gaurath Path",
  "district": "364004",
  "state": "Gujarat",
  "pincode": "Bhavnagar 364004",
  "latitude": 21.7511,
  "longitude": 72.0886
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9a1"
  },
  "name": "Vatger Police Chowki",
  "area": "Press Road",
  "district": "Chowk",
  "state": "Gujarat",
  "pincode": "Bhavnagar 364001",
  "latitude": 21.783488,
  "longitude": 72.152758
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9a2"
  },
  "name": "Ghodha Gate Police Chowki",
  "area": "Khhar Gate Road",
  "district": "364001",
  "state": "Gujarat",
  "pincode": "Bhavnagar 364001",
  "latitude": 21.776048,
  "longitude": 72.1454
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9a3"
  },
  "name": "Ukai Police Station",
  "area": "Songadh",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "394670",
  "latitude": 21.231642,
  "longitude": 73.5782695
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9a4"
  },
  "name": "Police Station Nardipur",
  "area": "SH-138",
  "district": "Nardipur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.33188,
  "longitude": 72.5638
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9a5"
  },
  "name": "Jasdan Police Station",
  "area": "SH-119",
  "district": "360050",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.10451,
  "longitude": 71.19843
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9a6"
  },
  "name": "Gadhechi Police Chowki",
  "area": "Tulsinagar",
  "district": "Para",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.7657,
  "longitude": 72.1178
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9a7"
  },
  "name": "Lambe Hanuman Police Chowki",
  "area": "Akshardeep Vidya Bhawan",
  "district": "Hanuman",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.20475,
  "longitude": 72.8448
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9a8"
  },
  "name": "Hatkeshwar Police Station",
  "area": "Khokhra Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.00095,
  "longitude": 72.62274
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9a9"
  },
  "name": "Gambhirpura Police Station",
  "area": "Gambhirpura",
  "district": "383430",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.85898,
  "longitude": 73.01606
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9aa"
  },
  "name": "Radhu Out Police Chowki",
  "area": "Dholka Kheda Road",
  "district": "Radhu",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.70252,
  "longitude": 72.58308
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9ab"
  },
  "name": "Devriya Police Chowki",
  "area": "NH151A",
  "district": "361010",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30759,
  "longitude": 69.73268
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9ac"
  },
  "name": "Police Station, Jamjodhpur",
  "area": "Bal Mandir Road",
  "district": "Town",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.90201,
  "longitude": 70.03433
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9ad"
  },
  "name": "Udhana Police Station",
  "area": "Surat Dumas Road",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.13858,
  "longitude": 72.75199
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9ae"
  },
  "name": "Madadnish Police Commissioner office B Division Udhana",
  "area": "Station Road",
  "district": "Udhana",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.17006,
  "longitude": 72.84236
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9af"
  },
  "name": "Shihor Police Station",
  "area": "SH-25",
  "district": "364240",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.71649,
  "longitude": 71.95863
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9b0"
  },
  "name": "Sankheda Police Station",
  "area": "Sankheda Road",
  "district": "391145",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.17018,
  "longitude": 73.57551
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9b1"
  },
  "name": "Anti Corruption Bureau Police Station",
  "area": "Talav Darbaza Road",
  "district": "Kadiwad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.51922,
  "longitude": 70.45972
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9b2"
  },
  "name": "Mamlatdar And Exclusive Magistrate Ni Kacheri Police Colony",
  "area": "Jila Panchayat Road",
  "district": "Office",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.72544,
  "longitude": 71.62463
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9b3"
  },
  "name": "Gopipura Police Station",
  "area": "Chairs Bazar Road",
  "district": "Market",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.19366,
  "longitude": 72.82539
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9b4"
  },
  "name": "Detection Of Crime Branch Surat City Gopipura",
  "area": "Dariya Mahal Rd",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.19826,
  "longitude": 72.8195
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9b5"
  },
  "name": "Gorwa Police Station",
  "area": "Gujarat Refinery Road",
  "district": "And",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.33346,
  "longitude": 73.15724
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9b6"
  },
  "name": "Police Station Dasai Bara",
  "area": "Junagarh Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.7524,
  "longitude": 70.6166
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9b7"
  },
  "name": "Harij Police Station",
  "area": "Becharaji To Harij Road",
  "district": "Mandir",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.69322,
  "longitude": 71.90742
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9b8"
  },
  "name": "Bahucharaji Police Station",
  "area": "SH-7",
  "district": "Chanasma",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.49842,
  "longitude": 72.04467
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9b9"
  },
  "name": "Bahucharaji Police Chowki",
  "area": "Bahucharaji Road",
  "district": "Nagarwada",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30729,
  "longitude": 73.20016
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9ba"
  },
  "name": "B Division Police Station Wadhwan Phase 3",
  "area": "Tramway Road",
  "district": "Hyundai",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.71914,
  "longitude": 71.66021
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9bb"
  },
  "name": "Police Station Santej",
  "area": "Santej Sub Post Office",
  "district": "Santej",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.10765,
  "longitude": 72.47242
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9bc"
  },
  "name": "Pandesara Bhestan Police Station",
  "area": "Udhana Main Road",
  "district": "Bhestan",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.128,
  "longitude": 72.85506
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9bd"
  },
  "name": "Pandesara Police Station",
  "area": "Rey Road",
  "district": "Police",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.14191,
  "longitude": 72.83979
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9be"
  },
  "name": "Gujarat Housing Police Chowki Pandesara",
  "area": "Middle Ring Road",
  "district": "Om",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.14861,
  "longitude": 72.83209
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9bf"
  },
  "name": "B R C Police Chowki Pandesara",
  "area": "Sant Shri Narhari Maharaj Marg",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.1566,
  "longitude": 72.8379
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9c0"
  },
  "name": "Umbergaon Police Station",
  "area": "M M High School",
  "district": "Gidc",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.19363,
  "longitude": 72.74993
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9c1"
  },
  "name": "Adhoi Police Station",
  "area": "Bhachau 370135",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.38876,
  "longitude": 70.50948
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9c2"
  },
  "name": "Mahatar Police Chowki",
  "area": "Court Road",
  "district": "387001",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.70516,
  "longitude": 72.85854
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9c3"
  },
  "name": "Mohanpura Police Station",
  "area": "St Basil High School",
  "district": "Makarpura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.24286,
  "longitude": 73.19117
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9c4"
  },
  "name": "Sukhnath Police Station",
  "area": "Sukhnath Road",
  "district": "Coat",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.52778,
  "longitude": 70.46423
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9c5"
  },
  "name": "Borsad Police Station",
  "area": "College Road",
  "district": "388540",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.40777,
  "longitude": 72.90289
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9c6"
  },
  "name": "Athwa Police Station",
  "area": "Ring Road",
  "district": "Kharwawad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.18649,
  "longitude": 72.81039
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9c7"
  },
  "name": "Mahila Police Station Athwa Line",
  "area": "Maa Thakur Bhai Desai Marg",
  "district": "Nandan",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.17882,
  "longitude": 72.80373
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9c8"
  },
  "name": "Vishnagar Police Station",
  "area": "Tower Rd",
  "district": "Bank",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.6993,
  "longitude": 72.54736
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9c9"
  },
  "name": "Waghodia Police Chowki",
  "area": "Indrapuri Road",
  "district": "Vaikunth",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29675,
  "longitude": 73.25275
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9ca"
  },
  "name": "Waghodia Police Station",
  "area": "Waghodia Dabhoi Road Waghodia",
  "district": "391760",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30448,
  "longitude": 73.40369
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9cb"
  },
  "name": "Police Station Limdi Chowk",
  "area": "Bambakama Road",
  "district": "Panchabatti",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.69171,
  "longitude": 72.97454
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9cc"
  },
  "name": "Limdi Police Station",
  "area": "Nava Bazar Road",
  "district": "Limdi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.00964,
  "longitude": 74.15831
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9cd"
  },
  "name": "Police Station Ankaleshwar GIDC",
  "area": "Gidc Police Station",
  "district": "Gidc",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.61005,
  "longitude": 73.02207
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9ce"
  },
  "name": "Vadodara Sahar Dabakhana Police Chowki",
  "area": "Tilak Road",
  "district": "Anandpura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30471,
  "longitude": 73.1911
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9cf"
  },
  "name": "Dhanera Police Chowki",
  "area": "Sethi Hospital",
  "district": "Bazar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.50565,
  "longitude": 72.02835
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9d0"
  },
  "name": "Gender Resource Center Dhanera",
  "area": "Dhanera Railway Station",
  "district": "385310",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.50589,
  "longitude": 72.02971
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9d1"
  },
  "name": "Kashipura Police Chowki",
  "area": "Kashipura Road",
  "district": "Kashipura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.40642,
  "longitude": 72.89722
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9d2"
  },
  "name": "Chaklasi Police Station",
  "area": "Chaklasi",
  "district": "Chaklasi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.65116,
  "longitude": 72.94985
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9d3"
  },
  "name": "Chandola Police Chowki",
  "area": "Narol Road",
  "district": "Chhipakuva",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.98922,
  "longitude": 72.5823
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9d4"
  },
  "name": "Police Station Jantanagar",
  "area": "Jantanagar",
  "district": "Sabarkadha",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.35525,
  "longitude": 72.95297
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9d5"
  },
  "name": "Jantanagar Police Chowki",
  "area": "Ramol Gam Road",
  "district": "Gam",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.98736,
  "longitude": 72.65249
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9d6"
  },
  "name": "Khambholaj Police Station",
  "area": "Khambholaj Road",
  "district": "Khambholaj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.57433,
  "longitude": 73.08547
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9d7"
  },
  "name": "Umreth Police Township",
  "area": "Umreth Road",
  "district": "Bajar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.69947,
  "longitude": 73.11702
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9d8"
  },
  "name": "Superintendent Of Police",
  "area": "Amreli to Lathi Road",
  "district": "Report",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.60936,
  "longitude": 71.21771
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9d9"
  },
  "name": "Women Police Station",
  "area": "Chital Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.60973,
  "longitude": 71.21777
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9da"
  },
  "name": "Dwarka Police Station",
  "area": "Railwat Station Rd",
  "district": "Dwarka",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.24492,
  "longitude": 68.9728
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9db"
  },
  "name": "Office of The Superintendent of Police Western Railway",
  "area": "Road 3",
  "district": "9",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.20618,
  "longitude": 72.65725
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9dc"
  },
  "name": "Police Station Janata Nagar",
  "area": "SH-59",
  "district": "383310",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.35556,
  "longitude": 73.21283
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9dd"
  },
  "name": "Bagodara Police Station",
  "area": "Ahmedabad Rajkot Highway",
  "district": "Bagodara",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.63964,
  "longitude": 72.19575
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9de"
  },
  "name": "Police Station, Jalaramnagar Society",
  "area": "Jalaramnagar Society",
  "district": "396125",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.51754,
  "longitude": 72.95019
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9df"
  },
  "name": "T B Police Chowki Nandhanvan",
  "area": "Dhagndra Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.74008,
  "longitude": 71.62366
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9e0"
  },
  "name": "Wadi Police Station",
  "area": "Gendigate Road",
  "district": "Sultanpura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29671,
  "longitude": 73.21057
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9e1"
  },
  "name": "Kathlal Town Police Chowki",
  "area": "SH-59",
  "district": "387630",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.89922,
  "longitude": 72.98966
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9e2"
  },
  "name": "Ghosa Check Post",
  "area": "NH-51",
  "district": "360576",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.50585,
  "longitude": 69.73896
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9e3"
  },
  "name": "Circle Police Station",
  "area": "Jail Road",
  "district": "363641",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.81189,
  "longitude": 70.83692
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9e4"
  },
  "name": "Mahudha Police Chowki",
  "area": "SH-60",
  "district": "387335",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.8148,
  "longitude": 72.93743
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9e5"
  },
  "name": "Jasdan Police Chowki",
  "area": "SH-1",
  "district": "360050",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.03766,
  "longitude": 71.20967
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9e6"
  },
  "name": "Vakaner Police Station",
  "area": "Ahmedabad Rajkot Highway",
  "district": "363693",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.42353,
  "longitude": 71.08739
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9e7"
  },
  "name": "Dahod Rural Police Station",
  "area": "Godhra Road",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.83112,
  "longitude": 74.22755
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9e8"
  },
  "name": "Kapurai Check Post",
  "area": "Dabhoi Road",
  "district": "Talav",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.27556,
  "longitude": 73.23986
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9e9"
  },
  "name": "New Police Station Kapadvanj",
  "area": "Nh59 Kheda Road",
  "district": "387620",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02566,
  "longitude": 73.0667
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9ea"
  },
  "name": "Sardar Nagar Police Chowki",
  "area": "Airport Road",
  "district": "Patel",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.08428,
  "longitude": 72.63729
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9eb"
  },
  "name": "Ode Police Chowki",
  "area": "Baroda Road",
  "district": "M",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.62435,
  "longitude": 73.11612
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9ec"
  },
  "name": "Sardhar Out Post Police Chowki",
  "area": "Sardhar",
  "district": "Taluka",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.13863,
  "longitude": 70.98339
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9ed"
  },
  "name": "Upleta Police Chowki",
  "area": "Upleta 360490",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.74436,
  "longitude": 70.28836
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9ee"
  },
  "name": "Marine Police Station",
  "area": "Nawa Bandar Road",
  "district": "Akwada",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.75741,
  "longitude": 72.22843
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9ef"
  },
  "name": "Police Station Nar Town",
  "area": "Nar Town Road",
  "district": "Nar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.47517,
  "longitude": 72.71016
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9f0"
  },
  "name": "Indian Oil Petrol Station",
  "area": "Bhavnagar to Ahmedabad Road",
  "district": "Sanes",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.90419,
  "longitude": 72.06932
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9f1"
  },
  "name": "Hindorna Police Chowki",
  "area": "SH-34",
  "district": "365560",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.009,
  "longitude": 71.43421
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9f2"
  },
  "name": "Police Station Bhadariyaagoan",
  "area": "Talaja Road",
  "district": "Bhandariya",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.58599,
  "longitude": 72.13235
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9f3"
  },
  "name": "Police Check Post",
  "area": "NH-51",
  "district": "362565",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.85981,
  "longitude": 71.16651
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9f4"
  },
  "name": "Gujarat University Police Station",
  "area": "Shri Pannalal Patel Marg",
  "district": "Area",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.03495,
  "longitude": 72.53975
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9f5"
  },
  "name": "Helmet Circle Police Chowki",
  "area": "Drive In Road",
  "district": "Area",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.04516,
  "longitude": 72.54191
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9f6"
  },
  "name": "Check Post Police Gothana Vinjrana",
  "area": "SH-95",
  "district": "360579",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.7902,
  "longitude": 69.65185
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9f7"
  },
  "name": "Inspector General Police Coastal Security",
  "area": "Gandhinagar Lunch Rushvat Virodhi Police Station",
  "district": "30",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.23999,
  "longitude": 72.67307
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9f8"
  },
  "name": "Police Station Kacheri",
  "area": "Near Hospital Road",
  "district": "Tekri",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.2471,
  "longitude": 69.6741
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9f9"
  },
  "name": "Police Chowki Talaja",
  "area": "Talaja Road",
  "district": "Bus",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.35243,
  "longitude": 72.03608
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9fa"
  },
  "name": "Takteshwar Chowki",
  "area": "Waghawadi Road",
  "district": "Devbagh",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.76535,
  "longitude": 72.14784
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9fb"
  },
  "name": "Sami Police Chowki",
  "area": "SH-18",
  "district": "384245",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.68224,
  "longitude": 71.77073
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9fc"
  },
  "name": "Police Station Sector 9",
  "area": "Nayab Police Adhishak Ni Kacheri",
  "district": "9",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.2089,
  "longitude": 72.6577
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9fd"
  },
  "name": "Napa Police Chowki",
  "area": "SH-75",
  "district": "388560",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.47855,
  "longitude": 72.9131
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9fe"
  },
  "name": "Deva Get Police Station",
  "area": "Sbi Atm",
  "district": "Kundla",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.33952,
  "longitude": 71.30526
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914b9ff"
  },
  "name": "Deputy Officer Of The Forest Department Police Colony",
  "area": "Jila Panchayat Road",
  "district": "Office",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.72421,
  "longitude": 71.62249
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba00"
  },
  "name": "Aji Dham Police Chowki",
  "area": "Kothariya Main Road",
  "district": "Park",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.24784,
  "longitude": 70.81865
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba01"
  },
  "name": "Ajidem Police Station",
  "area": "Kothariya Main Road",
  "district": "Park",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.24788,
  "longitude": 70.8184
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba02"
  },
  "name": "Bedeshwar Police Chowki",
  "area": "Bedeshwar Road",
  "district": "Bedi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.49409,
  "longitude": 70.04614
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba03"
  },
  "name": "Danta Police Station",
  "area": "Ambaji Road",
  "district": "Danta",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.11159,
  "longitude": 72.45632
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba04"
  },
  "name": "Khatraj Police Chowki",
  "area": "Sanand Kalol Road",
  "district": "Khatraj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.13928,
  "longitude": 72.44654
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba05"
  },
  "name": "Kheda District Check Post",
  "area": "SH-16",
  "district": "387560",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.70079,
  "longitude": 72.52698
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba06"
  },
  "name": "Shree Somnath Police Chowki",
  "area": "Desra Road",
  "district": "Palace",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.76174,
  "longitude": 72.97449
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba07"
  },
  "name": "Jambuva Police Chowki",
  "area": "Makarpura Road",
  "district": "Maneja",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.22714,
  "longitude": 73.18711
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba08"
  },
  "name": "Virsad Police Station",
  "area": "Borsad 388580",
  "district": "Borsad 388580",
  "state": "Gujarat",
  "pincode": "Borsad 388580",
  "latitude": 22.386394,
  "longitude": 72.778059
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba09"
  },
  "name": "Gulbai Tekra Approach BRTS Bus Stop",
  "area": "120 Feet Circular Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380015",
  "latitude": 23.029352,
  "longitude": 72.547064
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba0a"
  },
  "name": "Police Station-Khambhalia",
  "area": "Jamkhambhaliya 361306",
  "district": "Jamkhambhaliya 361306",
  "state": "Gujarat",
  "pincode": "Jamkhambhaliya 361306",
  "latitude": 22.2033,
  "longitude": 69.6518
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba0b"
  },
  "name": "Police Station-Kothara",
  "area": "Kothara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "370645",
  "latitude": 23.13165,
  "longitude": 68.93761
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba0c"
  },
  "name": "Assistant Commissioner of Police Office",
  "area": "Surat",
  "district": "395023",
  "state": "Gujarat",
  "pincode": "395023",
  "latitude": 21.143545,
  "longitude": 72.848187
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba0d"
  },
  "name": "Police Station Labheshwar",
  "area": "Lambay Hanuman Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395010",
  "latitude": 21.209913,
  "longitude": 72.856267
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba0e"
  },
  "name": "Police Station-Bhiloda",
  "area": "Bhiloda",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.76951,
  "longitude": 73.24034
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba0f"
  },
  "name": "Karanj Police Chowki",
  "area": "Karanj Bhavan",
  "district": "Bhadrakali",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.024027,
  "longitude": 72.583178
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba10"
  },
  "name": "Police Station-Paldi",
  "area": "Dharnidhar Derasar Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380007",
  "latitude": 23.0050724,
  "longitude": 72.5524746
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba11"
  },
  "name": "Radip Police Chowki",
  "area": "Ranip Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "382480",
  "latitude": 23.080513,
  "longitude": 72.578575
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba12"
  },
  "name": "Police Station-Pradhyuman Nagar",
  "area": "Rajkot",
  "district": "360001",
  "state": "Gujarat",
  "pincode": "360001",
  "latitude": 22.309501,
  "longitude": 70.7921611
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba13"
  },
  "name": "Assistant Commissioner of Police",
  "area": "Plot No 12/10 A",
  "district": "Dham",
  "state": "Gujarat",
  "pincode": "Gandhidham 370201",
  "latitude": 23.067072,
  "longitude": 70.12079
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba14"
  },
  "name": "Police Station-Vadali",
  "area": "SH-9",
  "district": "383235",
  "state": "Gujarat",
  "pincode": "Vadali 383235",
  "latitude": 23.9432,
  "longitude": 73.03802
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba15"
  },
  "name": "Police Station-Gunjan",
  "area": "Vapi 396191",
  "district": "Vapi 396191",
  "state": "Gujarat",
  "pincode": "Vapi 396191",
  "latitude": 20.37537,
  "longitude": 72.92074
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba16"
  },
  "name": "Police Station-Gundawadi",
  "area": "Gundawadi Hospital Chowk",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.28881,
  "longitude": 70.80814
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba17"
  },
  "name": "Hansot Police Station",
  "area": "Hansot",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "393030",
  "latitude": 21.586559,
  "longitude": 72.810452
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba18"
  },
  "name": "Police Station-Changodar",
  "area": "Service Road",
  "district": "382213",
  "state": "Gujarat",
  "pincode": "Sanand 382213",
  "latitude": 22.92935,
  "longitude": 72.44767
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba19"
  },
  "name": "POLICE STATION-KRUSHNA NAGAR",
  "area": "Naroda Village Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "382330",
  "latitude": 23.0746332,
  "longitude": 72.6556097
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba1a"
  },
  "name": "Karanj Police Stations",
  "area": "Three Gates",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.016309,
  "longitude": 72.6136
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba1b"
  },
  "name": "Kutiyana Police Station",
  "area": "Kutiyana 362650",
  "district": "Kutiyana 362650",
  "state": "Gujarat",
  "pincode": "Kutiyana 362650",
  "latitude": 21.622388,
  "longitude": 69.988338
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba1c"
  },
  "name": "GSCSC Kutiyana Godown",
  "area": "ST Road",
  "district": "362650",
  "state": "Gujarat",
  "pincode": "Kutiyana 362650",
  "latitude": 21.626822,
  "longitude": 69.980875
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba1d"
  },
  "name": "Police Station-Kagdapith",
  "area": "Swami Vivekanand Marg",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380022",
  "latitude": 23.0182,
  "longitude": 72.5981
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba1e"
  },
  "name": "Police Station-Ichhapor",
  "area": "Surat",
  "district": "394510",
  "state": "Gujarat",
  "pincode": "394510",
  "latitude": 21.18698054,
  "longitude": 72.71038999
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba1f"
  },
  "name": "Police Station-Nadiyad",
  "area": "SH-61",
  "district": "387001",
  "state": "Gujarat",
  "pincode": "Nadiad 387001",
  "latitude": 22.69907,
  "longitude": 72.85598
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba20"
  },
  "name": "Police Line Patel Chawl",
  "area": "Amdupura Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380025",
  "latitude": 23.03854,
  "longitude": 72.61731
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba21"
  },
  "name": "Dataram Jail Police Block",
  "area": "Junagadh",
  "district": "Junagadh",
  "state": "Gujarat",
  "pincode": "Junagadh",
  "latitude": 21.5053932,
  "longitude": 70.4672479
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba22"
  },
  "name": "Police Chowki",
  "area": "Borsad 391440",
  "district": "Borsad 391440",
  "state": "Gujarat",
  "pincode": "Borsad 391440",
  "latitude": 22.260233,
  "longitude": 73.000108
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba23"
  },
  "name": "Police Station-Panthawada",
  "area": "SH-27",
  "district": "Dantiwada",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 24.49099,
  "longitude": 72.30461
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba24"
  },
  "name": "Hidayat Nagar Society",
  "area": "Hidayat Nagar Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395009",
  "latitude": 21.211779,
  "longitude": 72.783897
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba25"
  },
  "name": "Police Station",
  "area": "Bharuch 392220",
  "district": "Bharuch 392220",
  "state": "Gujarat",
  "pincode": "Bharuch 392220",
  "latitude": 21.922353,
  "longitude": 73.080418
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba26"
  },
  "name": "Police Line Tandalja",
  "area": "C-56",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "390012",
  "latitude": 22.288624,
  "longitude": 73.153632
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba27"
  },
  "name": "Neelam Bagh Police Station",
  "area": "Nilambagh Palace Hotel",
  "district": "",
  "state": "Gujarat",
  "pincode": "Bhavnagar",
  "latitude": 21.76782398,
  "longitude": 72.13949644
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba28"
  },
  "name": "Sutrapada Police Station",
  "area": "Veraval 362275",
  "district": "Veraval 362275",
  "state": "Gujarat",
  "pincode": "Veraval 362275",
  "latitude": 20.84355,
  "longitude": 70.48676
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba29"
  },
  "name": "Memnagar Police Chowki",
  "area": "Luyangidev Crossing Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380052",
  "latitude": 23.047545,
  "longitude": 72.539563
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba2a"
  },
  "name": "Visnagar City Police",
  "area": "Vijay Para",
  "district": "384315",
  "state": "Gujarat",
  "pincode": "Visnagar 384315",
  "latitude": 23.699533,
  "longitude": 72.547381
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba2b"
  },
  "name": "Police Station-Lakhtar",
  "area": "Lakhtar",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "382775",
  "latitude": 22.85992948,
  "longitude": 71.78273165
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba2c"
  },
  "name": "Govindpura Police Chowki",
  "area": "Parda Road",
  "district": "391440",
  "state": "Gujarat",
  "pincode": "Padra 391440",
  "latitude": 22.244387,
  "longitude": 73.083741
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba2d"
  },
  "name": "B Division Police Station",
  "area": "Bhavnagar 364001",
  "district": "Bhavnagar 364001",
  "state": "Gujarat",
  "pincode": "Bhavnagar 364001",
  "latitude": 21.759644,
  "longitude": 72.15832
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba2e"
  },
  "name": "C Division Police Station",
  "area": "Kala Nala Road",
  "district": "364001",
  "state": "Gujarat",
  "pincode": "Bhavnagar 364001",
  "latitude": 21.771363,
  "longitude": 72.14611
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba2f"
  },
  "name": "B Division Police Station Junagadh",
  "area": "MG Road Near Civil Hospital",
  "district": "",
  "state": "Gujarat",
  "pincode": "Junagadh",
  "latitude": 21.5193671333,
  "longitude": 70.4608135334
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba30"
  },
  "name": "A Division Police Station Rajkot",
  "area": "No 1 Sheri",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360001",
  "latitude": 22.2898317,
  "longitude": 70.8045786
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba31"
  },
  "name": "D Division Police Station",
  "area": "Raj court Road",
  "district": "364001",
  "state": "Gujarat",
  "pincode": "Bhavnagar 364001",
  "latitude": 21.763712,
  "longitude": 72.123194
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba32"
  },
  "name": "City Kotwali",
  "area": "Budhwara",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "450331",
  "latitude": 21.310414,
  "longitude": 76.232726
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba33"
  },
  "name": "BC Para Police Station",
  "area": "Morbi 363641",
  "district": "Morbi 363641",
  "state": "Gujarat",
  "pincode": "Morbi 363641",
  "latitude": 22.823047,
  "longitude": 70.835763
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba34"
  },
  "name": "Sahyog Police Chowki",
  "area": "Gorva Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390016",
  "latitude": 22.336477,
  "longitude": 73.1503
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba35"
  },
  "name": "Police Station-Garbada",
  "area": "Dohad",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "389152",
  "latitude": 22.74263,
  "longitude": 74.17035
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba36"
  },
  "name": "Palanpur City Police Station",
  "area": "Railway Station Road",
  "district": "385001",
  "state": "Gujarat",
  "pincode": "Palanpur 385001",
  "latitude": 24.174247,
  "longitude": 72.434969
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba37"
  },
  "name": "Sant Shree Gopalbapa Sthanak",
  "area": "Mankuwa",
  "district": "Mankuva",
  "state": "Gujarat",
  "pincode": "370030",
  "latitude": 23.211669,
  "longitude": 69.560838
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba38"
  },
  "name": "Police Station-Sukhsar",
  "area": "Santrampur",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.11645,
  "longitude": 73.99845
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba39"
  },
  "name": "Police Station-Lalpur",
  "area": "SH-27",
  "district": "361170",
  "state": "Gujarat",
  "pincode": "Jamnagar 361170",
  "latitude": 22.19104,
  "longitude": 69.96278
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba3a"
  },
  "name": "Raopura Police Station",
  "area": "Raopura Road",
  "district": "Raopura",
  "state": "Gujarat",
  "pincode": "390001",
  "latitude": 22.303889,
  "longitude": 73.196549
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba3b"
  },
  "name": "Police Station-Raopura",
  "area": "Vadodara",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.30401717,
  "longitude": 73.196636
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba3c"
  },
  "name": "Police Station-Karjan",
  "area": "Karjan",
  "district": "391240",
  "state": "Gujarat",
  "pincode": "391240",
  "latitude": 22.05423,
  "longitude": 73.11313
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba3d"
  },
  "name": "Police Head Quater Amreli",
  "area": "Amreli",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 21.6078805,
  "longitude": 71.21748
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba3e"
  },
  "name": "Gaekwad Haveli",
  "area": "Ahmedabad",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.0119444444,
  "longitude": 72.58
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba3f"
  },
  "name": "DC Police Station",
  "area": "Vadodara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "390017",
  "latitude": 22.2966239001,
  "longitude": 73.2151914998
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba40"
  },
  "name": "Police Station-Valsad",
  "area": "Valsad",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 20.606451628,
  "longitude": 72.9285644
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba41"
  },
  "name": "Karanja Police Station",
  "area": "Karanj Bhavan",
  "district": "Bhadrakali",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.024688,
  "longitude": 72.582022
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba42"
  },
  "name": "Railway Police Force Barrak",
  "area": "Jamnagar Railway Station",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.49151,
  "longitude": 70.05225
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba43"
  },
  "name": "Wadi Police Station",
  "area": "Laheri Pura New Road",
  "district": "Bazar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29718,
  "longitude": 73.21048
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba44"
  },
  "name": "Loteshwar Bha Police Station",
  "area": "Chalodiya Street",
  "district": "Chora",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.54931,
  "longitude": 72.95632
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba45"
  },
  "name": "Umra Police Station",
  "area": "Mananiy Shri Thakur Bhai Desai Marg",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.17913,
  "longitude": 72.80383
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba46"
  },
  "name": "Odhav Police Station",
  "area": "Sardar Patel Ring Road",
  "district": "Odhav",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02613,
  "longitude": 72.67354
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba47"
  },
  "name": "Mataji Police Station",
  "area": "Lambe Hanuman Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.20878,
  "longitude": 72.85326
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba48"
  },
  "name": "Talaja Police Station",
  "area": "Maya Petroleum",
  "district": "Talaja",
  "state": "Gujarat",
  "pincode": "364140",
  "latitude": 21.35165,
  "longitude": 72.03941
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba49"
  },
  "name": "Naranpura Police Station",
  "area": "Late Shri Umedbhai Patel Road",
  "district": "Wadaj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.06334,
  "longitude": 72.56603
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba4a"
  },
  "name": "Naranpura Police Station",
  "area": "Gujarat Housing Board Lane",
  "district": "Naranpura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.06582,
  "longitude": 72.55915
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba4b"
  },
  "name": "Naranpura Police Chowki",
  "area": "Naranpura Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.05249,
  "longitude": 72.55923
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba4c"
  },
  "name": "Vallabh Vidyanagar Police Station",
  "area": "Anand Vidhyanagar Road",
  "district": "Vidya",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.54965,
  "longitude": 72.93202
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba4d"
  },
  "name": "Vadi Police Station",
  "area": "Sant Kabir Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390007",
  "latitude": 22.29671,
  "longitude": 73.21057
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba4e"
  },
  "name": "Rander Road Police Station",
  "area": "New Rander Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.19876,
  "longitude": 72.80823
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba4f"
  },
  "name": "Rander Police Station",
  "area": "Arya Samaj Marg",
  "district": "Rander",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.21874,
  "longitude": 72.79505
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba50"
  },
  "name": "Maskan Octroi Police Chowki",
  "area": "SH-6",
  "district": "Nagalpar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.83332,
  "longitude": 69.36484
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba51"
  },
  "name": "Tarapur Chowki",
  "area": "SH-16",
  "district": "382225",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.71944,
  "longitude": 72.44147
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba52"
  },
  "name": "Tarapur Police Station",
  "area": "Tarapur Road",
  "district": "Market",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.48559,
  "longitude": 72.66223
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba53"
  },
  "name": "Zalak Police Station",
  "area": "Petlad Road",
  "district": "387001",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.67575,
  "longitude": 72.8634
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba54"
  },
  "name": "Thermal Police Station",
  "area": "Rozva Sevalia Road",
  "district": "Rozva",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.86602,
  "longitude": 73.34689
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba55"
  },
  "name": "Anjar Police Station",
  "area": "Mundra Port Road",
  "district": "Temple",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.09228,
  "longitude": 70.04889
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba56"
  },
  "name": "Anjar Police Station",
  "area": "Shree Jasvantbhai Bhardiya Marg",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.10992,
  "longitude": 70.03438
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba57"
  },
  "name": "Jabalpur Police Station",
  "area": "Bhagtacharya Road",
  "district": "Kocharab",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.01315,
  "longitude": 72.5675
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba58"
  },
  "name": "Patiya Police Station",
  "area": "Narol To Naroda Road",
  "district": "Patiya",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.06386,
  "longitude": 72.64319
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba59"
  },
  "name": "Sector 20 Srp Police Station",
  "area": "Srp Police Station Sector Xx",
  "district": "20",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.23047,
  "longitude": 72.6724
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba5a"
  },
  "name": "Police Station Palli",
  "area": "SH-62",
  "district": "Palli",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.8281,
  "longitude": 73.98881
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba5b"
  },
  "name": "Gadu Tran Rasta Police Station",
  "area": "Nh51",
  "district": "Bank",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.05324,
  "longitude": 70.28972
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba5c"
  },
  "name": "Sahara Darwaza Police Station",
  "area": "Ring Road",
  "district": "Begampura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.19491,
  "longitude": 72.84319
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba5d"
  },
  "name": "Amdavadi Darwaza Police Station",
  "area": "Railway Station Road",
  "district": "387001",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.69623,
  "longitude": 72.86021
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba5e"
  },
  "name": "Girr Darwaja Police Station",
  "area": "Datar Road",
  "district": "Coat",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.52129,
  "longitude": 70.474
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba5f"
  },
  "name": "Amtol Darwaja Police Station",
  "area": "Vadnagar Ring Road",
  "district": "Masjid",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.7844,
  "longitude": 72.63589
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba60"
  },
  "name": "Costal Police Station",
  "area": "Vardhaman Nagar",
  "district": "Baroi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.82917,
  "longitude": 69.7237
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba61"
  },
  "name": "Police Station Chhatral Cross Rd",
  "area": "SH-41",
  "district": "I",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.27821,
  "longitude": 72.44136
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba62"
  },
  "name": "Mandal Police Station",
  "area": "Lal Darwaja Road",
  "district": "Limdi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.3174,
  "longitude": 72.6184
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba63"
  },
  "name": "Lehripura Gate Chowk Police Station",
  "area": "Lehripura New Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390001",
  "latitude": 22.29987,
  "longitude": 73.20674
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba64"
  },
  "name": "Nandodi Bhagol Police Chowki",
  "area": "SH-63",
  "district": "391110",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.12911,
  "longitude": 73.42297
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba65"
  },
  "name": "Mahila Police Station Vadodara",
  "area": "Shree Shiv Mandir",
  "district": "Fatepura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30634,
  "longitude": 73.20511
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba66"
  },
  "name": "Mahila Police Station",
  "area": "Gandhi Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.02416,
  "longitude": 72.5832
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba67"
  },
  "name": "Mahila Police Station",
  "area": "Sindhi Society Road",
  "district": "Water",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.83794,
  "longitude": 74.25914
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba68"
  },
  "name": "Mahila Police Station",
  "area": "Navper",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.7722,
  "longitude": 72.15
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba69"
  },
  "name": "Mahila Police Station",
  "area": "Adipur Police Station",
  "district": "5",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.0744,
  "longitude": 70.09787
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba6a"
  },
  "name": "Mahila Police Station",
  "area": "Vijay Talkies Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.21172,
  "longitude": 69.64968
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba6b"
  },
  "name": "Mahila Police Station",
  "area": "Himat Nagar Road 1",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.48134,
  "longitude": 70.0665
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba6c"
  },
  "name": "Police Association Andolan Samiti - PAAS",
  "area": "UL/5",
  "district": "Avenue",
  "state": "Gujarat",
  "pincode": "380007",
  "latitude": 22.9983807,
  "longitude": 72.549263
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba6d"
  },
  "name": "Adalaj Police Chowki",
  "area": "IOC Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "382428",
  "latitude": 23.114602,
  "longitude": 72.580396
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba6e"
  },
  "name": "Police Station-Susner",
  "area": "Susner 465447",
  "district": "Susner 465447",
  "state": "Gujarat",
  "pincode": "Susner 465447",
  "latitude": 23.94391,
  "longitude": 76.10089
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba6f"
  },
  "name": "Sami Police Station",
  "area": "SH-18",
  "district": "Sami",
  "state": "Gujarat",
  "pincode": "384245",
  "latitude": 23.68225,
  "longitude": 71.77088
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba70"
  },
  "name": "Rakhiyal Police Chowki",
  "area": "Rakhial Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380023",
  "latitude": 23.02172,
  "longitude": 72.622327
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba71"
  },
  "name": "Karelibaug Police Station",
  "area": "Fatehpura",
  "district": "Karelibagh",
  "state": "Gujarat",
  "pincode": "390018",
  "latitude": 22.307084,
  "longitude": 73.204525
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba72"
  },
  "name": "Police Station-Bapunagar",
  "area": "Ahmedabad",
  "district": "380024",
  "state": "Gujarat",
  "pincode": "380024",
  "latitude": 23.03225,
  "longitude": 72.63133
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba73"
  },
  "name": "Police Station-Kathalal",
  "area": "Nadiyad Road",
  "district": "Kathlal",
  "state": "Gujarat",
  "pincode": "387630",
  "latitude": 22.89302,
  "longitude": 72.98654
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba74"
  },
  "name": "Police Station Joranagar",
  "area": "Rajkot Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.719,
  "longitude": 71.6284
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba75"
  },
  "name": "Subhash Nagar Police Chowki",
  "area": "Jawar Road",
  "district": "Bunder",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.64195,
  "longitude": 69.58718
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba76"
  },
  "name": "Railway Suraksha Bol Check Post",
  "area": "Doctor Venibhai Modi Marg",
  "district": "Lalbaug",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.28205,
  "longitude": 73.2026
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba77"
  },
  "name": "Dumas Police Chowki",
  "area": "Sultanabad Dumas Main Road",
  "district": "Dumas",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.08612,
  "longitude": 72.71474
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba78"
  },
  "name": "Serviclenc Squad Police",
  "area": "Local Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.51967,
  "longitude": 70.46078
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba79"
  },
  "name": "Mehmadabad Police Station",
  "area": "Mahemdabad Road",
  "district": "Mahemdabad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.82052,
  "longitude": 72.75779
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba7a"
  },
  "name": "Malpur Police Chowki",
  "area": "SH-5",
  "district": "383345",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.36314,
  "longitude": 73.46796
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba7b"
  },
  "name": "Tower Chowk Police Chowki",
  "area": "NH251",
  "district": "362560",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.81989,
  "longitude": 71.04222
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba7c"
  },
  "name": "Police Chowki Shukhram Nagar",
  "area": "Late Shri Taj Mahammad Khan Pathan Marg",
  "district": "Gomtipur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.01998,
  "longitude": 72.62007
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba7d"
  },
  "name": "Police Station Navper",
  "area": "Navper",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.7726,
  "longitude": 72.1502
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba7e"
  },
  "name": "B Division Police Station",
  "area": "Kavi Shrikrishnalal Marg",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.77265,
  "longitude": 72.15022
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba7f"
  },
  "name": "Desa Sahar North Police Station",
  "area": "Hospital Road",
  "district": "385535",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.25766,
  "longitude": 72.18647
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba80"
  },
  "name": "Gandhi Beat Police Chowki",
  "area": "Tower Road",
  "district": "College",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.92149,
  "longitude": 72.91888
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba81"
  },
  "name": "Jalalpore Station Police Chowki",
  "area": "Station Road",
  "district": "Jalalpore",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.94956,
  "longitude": 72.91224
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba82"
  },
  "name": "Navsari Town Police Chowki",
  "area": "Raichand Road",
  "district": "Jalalpore",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.94966,
  "longitude": 72.91232
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba83"
  },
  "name": "Police Station Shiv Nagar",
  "area": "SH-7",
  "district": "385535",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.26809,
  "longitude": 72.18178
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba84"
  },
  "name": "Arambhada Police Chowki",
  "area": "Arambhada",
  "district": "361345",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.43359,
  "longitude": 69.03891
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba85"
  },
  "name": "Anand City Police Station",
  "area": "Amul Dairy Road",
  "district": "Gambi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.55808,
  "longitude": 72.96802
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba86"
  },
  "name": "Dumash Police Station",
  "area": "Sultanabad Dumas Main Road",
  "district": "Sultanabad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.0939,
  "longitude": 72.70778
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba87"
  },
  "name": "Bhakti Nagar Police Station",
  "area": "Kothariya Main Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.27707,
  "longitude": 70.81175
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba88"
  },
  "name": "Arya Nagar Police Station",
  "area": "Kuvadva Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30576,
  "longitude": 70.81199
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba89"
  },
  "name": "Udyog Nagar Police Station",
  "area": "G. I. D. C. Road",
  "district": "Yard",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.64951,
  "longitude": 69.63635
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba8a"
  },
  "name": "Mandai Police Chowki",
  "area": "Lal Darwaja Road",
  "district": "Limdi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.31742,
  "longitude": 72.61826
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba8b"
  },
  "name": "Narol Police Chowki",
  "area": "Nh8",
  "district": "English",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.96215,
  "longitude": 72.59174
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba8c"
  },
  "name": "City Circle Police Inspector",
  "area": "Sindhi Society Road",
  "district": "Police",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.83917,
  "longitude": 74.25979
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba8d"
  },
  "name": "Traffic Police Station",
  "area": "Sindhi Society Road",
  "district": "Police",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.83891,
  "longitude": 74.25958
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba8e"
  },
  "name": "Motor Transport Vibhag Police Head Quarter",
  "area": "Sindhi Society Road",
  "district": "Water",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.83847,
  "longitude": 74.25874
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba8f"
  },
  "name": "Ralnapur Police Chowki",
  "area": "Palanpur Abu Highway",
  "district": "Gurukul",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.19446,
  "longitude": 72.43772
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba90"
  },
  "name": "Kanrej Police Station",
  "area": "Kamrej Surat Road",
  "district": "394180",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.26957,
  "longitude": 72.95816
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba91"
  },
  "name": "NH 8 Police Chowki",
  "area": "Uma Mangal Road",
  "district": "Kholvad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.26885,
  "longitude": 72.95839
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba92"
  },
  "name": "Shiv Police Chowki",
  "area": "Railway Station Road",
  "district": "Bank",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.89516,
  "longitude": 70.40072
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba93"
  },
  "name": "The Police Welfare Centre",
  "area": "Dumas Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.18141,
  "longitude": 72.80279
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba94"
  },
  "name": "Police Commissioner Kacheri",
  "area": "Dumas Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.18127,
  "longitude": 72.80179
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba95"
  },
  "name": "Jawahar Chowk Police Chowki",
  "area": "Sarvottam Nagar Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.09107,
  "longitude": 72.58525
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba96"
  },
  "name": "Prabhas Police Station",
  "area": "Somnath Temple Chowk",
  "district": "Patan",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.88681,
  "longitude": 70.40682
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba97"
  },
  "name": "Jila Police Head Quarter",
  "area": "Vakeel Pran Sankar Gatiya Road",
  "district": "Face",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.63441,
  "longitude": 69.61374
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba98"
  },
  "name": "Ajwa Road Check Post",
  "area": "Ajwa Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.32269,
  "longitude": 73.25464
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba99"
  },
  "name": "Bahiyal Police Station",
  "area": "Chandiyal Ghamij Road",
  "district": "Village",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.0744,
  "longitude": 72.89139
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba9a"
  },
  "name": "Jahangir Pura Police Station",
  "area": "Gymkhana Road",
  "district": "Rander",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.22244,
  "longitude": 72.79143
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba9b"
  },
  "name": "Mission Police Chowki",
  "area": "Chaloda",
  "district": "Chaloda",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.8053,
  "longitude": 72.44723
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba9c"
  },
  "name": "Freelandgunj Police Station",
  "area": "Godhra Road",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.83126,
  "longitude": 74.2278
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba9d"
  },
  "name": "Thara Police Chowki",
  "area": "NH-27",
  "district": "385555",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.97029,
  "longitude": 71.82797
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba9e"
  },
  "name": "Central Jail",
  "area": "Ahmedabad",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.0795774472,
  "longitude": 72.5824152396
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914ba9f"
  },
  "name": "Police Head Quarters",
  "area": "Kheti Bari Road",
  "district": "Anand",
  "state": "Gujarat",
  "pincode": "388001",
  "latitude": 22.542429,
  "longitude": 72.961586
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baa0"
  },
  "name": "Tambu Choki",
  "area": "Dariyapur",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.0353235,
  "longitude": 72.5928361
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baa1"
  },
  "name": "Police Station-Bhawani Kheda",
  "area": "Junagadh",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "362004",
  "latitude": 21.52732,
  "longitude": 70.50208
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baa2"
  },
  "name": "Bayad Police Station",
  "area": "SH-69",
  "district": "Bayad",
  "state": "Gujarat",
  "pincode": "383325",
  "latitude": 23.22008,
  "longitude": 73.21411
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baa3"
  },
  "name": "Police Head Quarters Rajpipla",
  "area": "Jitnagar",
  "district": "393145",
  "state": "Gujarat",
  "pincode": "Rajpipla 393145",
  "latitude": 21.87437,
  "longitude": 73.50255
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baa4"
  },
  "name": "Kheda Town Police Station",
  "area": "Kheda 387411",
  "district": "Kheda 387411",
  "state": "Gujarat",
  "pincode": "Kheda 387411",
  "latitude": 22.750034,
  "longitude": 72.685638
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baa5"
  },
  "name": "Traffic Police Station-Ghanshyam Nagar",
  "area": "Bhuj 370001",
  "district": "Bhuj 370001",
  "state": "Gujarat",
  "pincode": "Bhuj 370001",
  "latitude": 23.24695,
  "longitude": 69.66754
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baa6"
  },
  "name": "Police Station-Ode",
  "area": "Anand",
  "district": "388210",
  "state": "Gujarat",
  "pincode": "388210",
  "latitude": 22.62449,
  "longitude": 73.12026
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baa7"
  },
  "name": "Police station-Premchand Nagar",
  "area": "Off Judges Bungalow Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.03685,
  "longitude": 72.51656
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baa8"
  },
  "name": "Highway Police Chowki",
  "area": "Unjha 384170",
  "district": "Unjha 384170",
  "state": "Gujarat",
  "pincode": "Unjha 384170",
  "latitude": 23.80491,
  "longitude": 72.379692
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baa9"
  },
  "name": "Police Station-Junagadh",
  "area": "SH-26",
  "district": "362001",
  "state": "Gujarat",
  "pincode": "Junagadh 362001",
  "latitude": 21.52907,
  "longitude": 70.45876
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baaa"
  },
  "name": "Police Station-Vithhalpura",
  "area": "Vithalpur",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "382130",
  "latitude": 23.36623,
  "longitude": 72.05035
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baab"
  },
  "name": "Police Station-Thanghad",
  "area": "Thangadh 363530",
  "district": "Thangadh 363530",
  "state": "Gujarat",
  "pincode": "Thangadh 363530",
  "latitude": 22.57515,
  "longitude": 71.19761
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baac"
  },
  "name": "Dehgma Police Station",
  "area": "Gandhinagar",
  "district": "382305",
  "state": "Gujarat",
  "pincode": "Dehgam 382305",
  "latitude": 23.169914,
  "longitude": 72.816697
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baad"
  },
  "name": "Dhoraji City Police Station",
  "area": "Dhoraji 360410",
  "district": "Dhoraji 360410",
  "state": "Gujarat",
  "pincode": "Dhoraji 360410",
  "latitude": 21.73025,
  "longitude": 70.451187
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baae"
  },
  "name": "Police Station Chanasana",
  "area": "Chanasma 384220",
  "district": "Chanasma 384220",
  "state": "Gujarat",
  "pincode": "Chanasma 384220",
  "latitude": 23.72008,
  "longitude": 72.1101
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baaf"
  },
  "name": "Police Station-Tharat",
  "area": "Tharad 385565",
  "district": "Tharad 385565",
  "state": "Gujarat",
  "pincode": "Tharad 385565",
  "latitude": 24.38512,
  "longitude": 71.62149
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bab0"
  },
  "name": "Harni Police Station",
  "area": "Airport Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.35032,
  "longitude": 73.229225
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bab1"
  },
  "name": "Police Station-Naliya",
  "area": "Naliya",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "370655",
  "latitude": 23.25726,
  "longitude": 68.83617
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bab2"
  },
  "name": "Karaj Police Station Ghee Kanta",
  "area": "Ahmedabad",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.0055246,
  "longitude": 72.5550814
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bab3"
  },
  "name": "Baharpara Police Chowki",
  "area": "Amreli 365601",
  "district": "Amreli 365601",
  "state": "Gujarat",
  "pincode": "Amreli 365601",
  "latitude": 21.597577,
  "longitude": 71.211986
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bab4"
  },
  "name": "Police Thana Barhanpur",
  "area": "Burhanpur",
  "district": "450331",
  "state": "Gujarat",
  "pincode": "450331",
  "latitude": 21.309577,
  "longitude": 76.232689
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bab5"
  },
  "name": "Nadiad District Traffic Police Station",
  "area": "Nadiad 387230",
  "district": "Nadiad 387230",
  "state": "Gujarat",
  "pincode": "Nadiad 387230",
  "latitude": 22.708066,
  "longitude": 72.826008
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bab6"
  },
  "name": "Universal Chowk Traffic Police Chowki",
  "area": "Ring Road",
  "district": "Zone",
  "state": "Gujarat",
  "pincode": "395002",
  "latitude": 21.188258,
  "longitude": 72.840569
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bab7"
  },
  "name": "Hadvad Police Chowki",
  "area": "Ambawadi Market",
  "district": "Parimal",
  "state": "Gujarat",
  "pincode": "380006",
  "latitude": 23.019876,
  "longitude": 72.554973
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bab8"
  },
  "name": "Police Station",
  "area": "Dhandhuka 382460",
  "district": "Dhandhuka 382460",
  "state": "Gujarat",
  "pincode": "Dhandhuka 382460",
  "latitude": 22.382152,
  "longitude": 71.986885
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bab9"
  },
  "name": "Police Station-Palitana",
  "area": "SH-112",
  "district": "364270",
  "state": "Gujarat",
  "pincode": "Palitana 364270",
  "latitude": 21.52726,
  "longitude": 71.82319
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baba"
  },
  "name": "Chamanpura Housing Police Chowki",
  "area": "Gujarat Housing Board",
  "district": "Kalapinagar",
  "state": "Gujarat",
  "pincode": "380016",
  "latitude": 23.050956,
  "longitude": 72.612757
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914babb"
  },
  "name": "Police Station Lambe Hanuman Road",
  "area": "Surat",
  "district": "395010",
  "state": "Gujarat",
  "pincode": "395010",
  "latitude": 21.204924,
  "longitude": 72.844281
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914babc"
  },
  "name": "Police Station-Bhuj",
  "area": "SH-46",
  "district": "370105",
  "state": "Gujarat",
  "pincode": "Bhuj 370105",
  "latitude": 23.2290498,
  "longitude": 69.7598934
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914babd"
  },
  "name": "Police Station-Liliya",
  "area": "SH-114",
  "district": "Liliya",
  "state": "Gujarat",
  "pincode": "365535",
  "latitude": 21.53851,
  "longitude": 71.36446
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914babe"
  },
  "name": "Vadnagar Police Station",
  "area": "Station Road",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "Vadnagar 384355",
  "latitude": 23.784682,
  "longitude": 72.63057
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914babf"
  },
  "name": "Police Station-Wav",
  "area": "longtuna",
  "district": "Vav",
  "state": "Gujarat",
  "pincode": "385575",
  "latitude": 24.35905,
  "longitude": 71.51796
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bac0"
  },
  "name": "Jam City B Division Jamnagar",
  "area": "NEAR GURUDVARA CIRCLE OPP. AYURVEDIC HOSPITAL",
  "district": "",
  "state": "Gujarat",
  "pincode": "Jamnagar",
  "latitude": 21.21787,
  "longitude": 72.82386
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bac1"
  },
  "name": "Police Headquarter",
  "area": "Police Head Quarter",
  "district": "Valsad",
  "state": "Gujarat",
  "pincode": "396050",
  "latitude": 20.541542,
  "longitude": 73.184408
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bac2"
  },
  "name": "Mandivi Police Station",
  "area": "NH-8A",
  "district": "Cutch-Mandvi",
  "state": "Gujarat",
  "pincode": "370465",
  "latitude": 22.837585,
  "longitude": 69.342074
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bac3"
  },
  "name": "Police Station-Dabhoda",
  "area": "Dehgam 382355",
  "district": "Dehgam 382355",
  "state": "Gujarat",
  "pincode": "Dehgam 382355",
  "latitude": 23.17611,
  "longitude": 72.74732
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bac4"
  },
  "name": "Nayab Police Adhikshak Office",
  "area": "Morbi 363641",
  "district": "Morbi 363641",
  "state": "Gujarat",
  "pincode": "Morbi 363641",
  "latitude": 22.823967,
  "longitude": 70.847132
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bac5"
  },
  "name": "Gorubathan Police Station",
  "area": "Kalimpang 735231",
  "district": "Kalimpang 735231",
  "state": "Gujarat",
  "pincode": "Kalimpang 735231",
  "latitude": 26.9653,
  "longitude": 88.7091
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bac6"
  },
  "name": "Police Chowki-Dhinkwa",
  "area": "Babubhai Shankarbhai Thakor Marg",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.0255,
  "longitude": 72.59116
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bac7"
  },
  "name": "Kheda Police Headquarter",
  "area": "Kheda Camp",
  "district": "387421",
  "state": "Gujarat",
  "pincode": "Mahemdavad 387421",
  "latitude": 22.753411,
  "longitude": 72.705331
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bac8"
  },
  "name": "Amrapali Police Station",
  "area": "Riya Road",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360007",
  "latitude": 22.298906,
  "longitude": 70.783433
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bac9"
  },
  "name": "Police Station-VGVCL & Aec",
  "area": "Ahmedabad",
  "district": "380005",
  "state": "Gujarat",
  "pincode": "380005",
  "latitude": 23.06919,
  "longitude": 72.58968
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baca"
  },
  "name": "Kaniz Highway Police Chowki",
  "area": "Santshri Sashgeji Marg",
  "district": "387130",
  "state": "Gujarat",
  "pincode": "Mahemdavad 387130",
  "latitude": 22.874606,
  "longitude": 72.727915
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bacb"
  },
  "name": "Poshina Police Station",
  "area": "Khed Brahma",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "383422",
  "latitude": 24.3675783,
  "longitude": 73.0299431
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bacc"
  },
  "name": "Police Station-Samakhiyali",
  "area": "Service Road",
  "district": "370140",
  "state": "Gujarat",
  "pincode": "Gadhada 370140",
  "latitude": 23.30731,
  "longitude": 70.49672
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bacd"
  },
  "name": "Vinchhiya Police Station",
  "area": "Jasdan 360055",
  "district": "Jasdan 360055",
  "state": "Gujarat",
  "pincode": "Jasdan 360055",
  "latitude": 22.205554,
  "longitude": 71.383903
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bace"
  },
  "name": "Police Station-Bakor",
  "area": "Lunavada 389232",
  "district": "Lunavada 389232",
  "state": "Gujarat",
  "pincode": "Lunavada 389232",
  "latitude": 23.406,
  "longitude": 73.7116
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bacf"
  },
  "name": "Police Station-Kalol City",
  "area": "Kalol Main Road",
  "district": "382721",
  "state": "Gujarat",
  "pincode": "Kalol 382721",
  "latitude": 23.24834,
  "longitude": 72.49539
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bad0"
  },
  "name": "Local Crime Branch-Jamnagar",
  "area": "Jamnagar 361001",
  "district": "Jamnagar 361001",
  "state": "Gujarat",
  "pincode": "Jamnagar 361001",
  "latitude": 22.46748,
  "longitude": 70.06701
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bad1"
  },
  "name": "Gundlav Police Station",
  "area": "Valsad 396035",
  "district": "Valsad 396035",
  "state": "Gujarat",
  "pincode": "Valsad 396035",
  "latitude": 20.619874,
  "longitude": 72.971666
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bad2"
  },
  "name": "City Police Line",
  "area": "Valsad 396001",
  "district": "Valsad 396001",
  "state": "Gujarat",
  "pincode": "Valsad 396001",
  "latitude": 20.607026,
  "longitude": 72.928431
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bad3"
  },
  "name": "Police Line-Ahwa",
  "area": "Ahwa 394710",
  "district": "Ahwa 394710",
  "state": "Gujarat",
  "pincode": "Ahwa 394710",
  "latitude": 20.76314,
  "longitude": 73.68703
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bad4"
  },
  "name": "Police Station-Sagbara",
  "area": "SH-4",
  "district": "Sagbara",
  "state": "Gujarat",
  "pincode": "393050",
  "latitude": 21.5442,
  "longitude": 73.79139
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bad5"
  },
  "name": "Police Station-Dadana",
  "area": "Vapi Silvassa Road",
  "district": "Dadra",
  "state": "Gujarat",
  "pincode": "396193",
  "latitude": 20.3189487,
  "longitude": 72.9663376
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bad6"
  },
  "name": "Sanand Police Station",
  "area": "SANAND",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.03309,
  "longitude": 72.61689
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bad7"
  },
  "name": "Changoder Police Chowki",
  "area": "Sanand 382213",
  "district": "Sanand 382213",
  "state": "Gujarat",
  "pincode": "Sanand 382213",
  "latitude": 22.92986274,
  "longitude": 72.4484039
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bad8"
  },
  "name": "Traffic Police Station",
  "area": "Khokhra Mahmedabad Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "382449",
  "latitude": 22.989354,
  "longitude": 72.640749
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bad9"
  },
  "name": "Police Head Quarters",
  "area": "Ahmedabad",
  "district": "380001",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.026372,
  "longitude": 72.577209
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bada"
  },
  "name": "Police Station-Dharmavaram",
  "area": "Dharmavaram 515671",
  "district": "Dharmavaram 515671",
  "state": "Gujarat",
  "pincode": "Dharmavaram 515671",
  "latitude": 14.4124191,
  "longitude": 77.7183289
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914badb"
  },
  "name": "IG Police Office",
  "area": "Sahibaug Civil Hospital Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380016",
  "latitude": 23.053048,
  "longitude": 72.610046
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914badc"
  },
  "name": "Police Station Markhel",
  "area": "Dudhrej 363002",
  "district": "Dudhrej 363002",
  "state": "Gujarat",
  "pincode": "Dudhrej 363002",
  "latitude": 22.7363079,
  "longitude": 71.6319294
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914badd"
  },
  "name": "Police Station Bhavnath",
  "area": "Junagadh 362004",
  "district": "Junagadh 362004",
  "state": "Gujarat",
  "pincode": "Junagadh 362004",
  "latitude": 21.52724,
  "longitude": 70.502088
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bade"
  },
  "name": "Police Station-Atkot",
  "area": "Jasdan",
  "district": "Jasdan",
  "state": "Gujarat",
  "pincode": "Jasdan",
  "latitude": 22.01203,
  "longitude": 71.14667
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914badf"
  },
  "name": "Mankuva Police Station",
  "area": "Mankuva Road",
  "district": "Mankuva",
  "state": "Gujarat",
  "pincode": "370030",
  "latitude": 23.210598,
  "longitude": 69.568546
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bae0"
  },
  "name": "Police Station-Gambhoi",
  "area": "Himatnagar",
  "district": "Himatnagar",
  "state": "Gujarat",
  "pincode": "Himatnagar",
  "latitude": 23.60395,
  "longitude": 73.098037
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bae1"
  },
  "name": "Police Parade Ground, Surat",
  "area": "Surat",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.1823633562,
  "longitude": 72.8031699447
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bae2"
  },
  "name": "Sonal Police Chowki",
  "area": "Shrinand Nagar Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380051",
  "latitude": 22.99765,
  "longitude": 72.51865
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bae3"
  },
  "name": "Sardar Police Chowki",
  "area": "Mangarh Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395006",
  "latitude": 21.213534,
  "longitude": 72.850874
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bae4"
  },
  "name": "Pardi Police Station",
  "area": "NH-8",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "Pardi 396125",
  "latitude": 20.51755,
  "longitude": 72.950231
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bae5"
  },
  "name": "Police Station-Kathalal",
  "area": "Nadiyad Road",
  "district": "Kathlal",
  "state": "Gujarat",
  "pincode": "387630",
  "latitude": 22.893009,
  "longitude": 72.9865556
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bae6"
  },
  "name": "Gundavadi Police Chowki",
  "area": "Kanal Road",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360006",
  "latitude": 22.314034,
  "longitude": 70.767529
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bae7"
  },
  "name": "Kamrej Police Chowki",
  "area": "Kamrej",
  "district": "Kamrej",
  "state": "Gujarat",
  "pincode": "394185",
  "latitude": 21.269443,
  "longitude": 72.958294
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bae8"
  },
  "name": "Samarkha Out Post Police Chowki",
  "area": "GJ SH 60",
  "district": "Samarkha",
  "state": "Gujarat",
  "pincode": "388360",
  "latitude": 22.600905,
  "longitude": 72.984377
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bae9"
  },
  "name": "Police Station-Laxmipura",
  "area": "Vadodara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "390021",
  "latitude": 22.32746,
  "longitude": 73.13999
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baea"
  },
  "name": "Police Parade Ground, Ghaludi",
  "area": "Kathor",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 21.3216263,
  "longitude": 72.9309472
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baeb"
  },
  "name": "Police Station Sabalpur",
  "area": "Junagadh 362037",
  "district": "Junagadh 362037",
  "state": "Gujarat",
  "pincode": "Junagadh 362037",
  "latitude": 21.57097,
  "longitude": 70.46687
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baec"
  },
  "name": "Police Station-Sarghawada",
  "area": "Junagadh 362037",
  "district": "Junagadh 362037",
  "state": "Gujarat",
  "pincode": "Junagadh 362037",
  "latitude": 21.57098,
  "longitude": 70.46692
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baed"
  },
  "name": "Police Station Doulathabad",
  "area": "Dudhrej 363002",
  "district": "Dudhrej 363002",
  "state": "Gujarat",
  "pincode": "Dudhrej 363002",
  "latitude": 22.730575,
  "longitude": 71.644885
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baee"
  },
  "name": "Police Station-Neredigonda",
  "area": "AH43",
  "district": "504323",
  "state": "Gujarat",
  "pincode": "Boath 504323",
  "latitude": 19.3034027,
  "longitude": 78.4066019
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baef"
  },
  "name": "Police Station-Limbasi",
  "area": "SH-16",
  "district": "Matar",
  "state": "Gujarat",
  "pincode": "387520",
  "latitude": 22.61284,
  "longitude": 72.62318
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baf0"
  },
  "name": "Police Station-Railway Station Road",
  "area": "Upleta 360450",
  "district": "Upleta 360450",
  "state": "Gujarat",
  "pincode": "Upleta 360450",
  "latitude": 21.85042,
  "longitude": 70.23702
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baf1"
  },
  "name": "SRPF Police Station",
  "area": "Surat",
  "district": "394326",
  "state": "Gujarat",
  "pincode": "394326",
  "latitude": 21.248475,
  "longitude": 72.963355
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baf2"
  },
  "name": "Panigate Police Station",
  "area": "Vadodara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.3,
  "longitude": 73.2
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baf3"
  },
  "name": "Police Station",
  "area": "Panchwali Park Main Road",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360001",
  "latitude": 22.282164,
  "longitude": 70.785068
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baf4"
  },
  "name": "Hudki Police Chowki",
  "area": "Kothariya Main Road",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360002",
  "latitude": 22.263045,
  "longitude": 70.814734
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baf5"
  },
  "name": "Police Station-Sabarmati Riverfront East",
  "area": "Riverfront Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380004",
  "latitude": 23.05394,
  "longitude": 72.58004
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baf6"
  },
  "name": "Police Station-Vasad",
  "area": "Anand",
  "district": "388306",
  "state": "Gujarat",
  "pincode": "388306",
  "latitude": 22.4531066,
  "longitude": 73.0626841
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baf7"
  },
  "name": "Police Station Ghondal",
  "area": "Gondal",
  "district": "360311",
  "state": "Gujarat",
  "pincode": "360311",
  "latitude": 21.97283,
  "longitude": 70.80813
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baf8"
  },
  "name": "City Police Station",
  "area": "Gondal",
  "district": "360311",
  "state": "Gujarat",
  "pincode": "360311",
  "latitude": 21.969044,
  "longitude": 70.807577
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baf9"
  },
  "name": "Jawahar Nagar Police Chowki",
  "area": "Jawahar Nagar Karchiya Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "391346",
  "latitude": 22.392107215,
  "longitude": 73.121573376
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bafa"
  },
  "name": "Police Station-Lakhani",
  "area": "Service Road",
  "district": "441804",
  "state": "Gujarat",
  "pincode": "Lakhni 441804",
  "latitude": 21.06825,
  "longitude": 79.83575
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bafb"
  },
  "name": "Mithapur OP Police Station",
  "area": "Mithapur",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "361345",
  "latitude": 22.412901,
  "longitude": 69.010697
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bafc"
  },
  "name": "Bapod Police Station",
  "area": "Nivedanam Complex",
  "district": "Char",
  "state": "Gujarat",
  "pincode": "390019",
  "latitude": 22.305424,
  "longitude": 73.239032
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bafd"
  },
  "name": "Police Station-Asha Purima",
  "area": "Surat",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "394107",
  "latitude": 21.24286,
  "longitude": 72.84729
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bafe"
  },
  "name": "Police Station-Lalbag",
  "area": "Burhanpur",
  "district": "Pradesh",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 21.33366,
  "longitude": 76.20148
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914baff"
  },
  "name": "Police Station-Siganpore",
  "area": "Surat",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "395004",
  "latitude": 21.21367,
  "longitude": 72.81966
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb00"
  },
  "name": "Police Station-Valod",
  "area": "Valod",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "394640",
  "latitude": 21.04832,
  "longitude": 73.26219
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb01"
  },
  "name": "Nana Varachha Police Station",
  "area": "Varachha Road",
  "district": "Faliya",
  "state": "Gujarat",
  "pincode": "395008",
  "latitude": 21.226672,
  "longitude": 72.888768
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb02"
  },
  "name": "Ganpati Naka,Burhanpur",
  "area": "Burhanpur",
  "district": "450331",
  "state": "Gujarat",
  "pincode": "450331",
  "latitude": 21.31438428,
  "longitude": 76.22653828
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb03"
  },
  "name": "Police commisioner(shahibaugh Road",
  "area": "Ahmedabad",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.049662536,
  "longitude": 72.5894882005
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb04"
  },
  "name": "State Reserve Police Force",
  "area": "Gondal",
  "district": "360311",
  "state": "Gujarat",
  "pincode": "360311",
  "latitude": 21.968557,
  "longitude": 70.80738
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb05"
  },
  "name": "CDC Police Station Surat",
  "area": "Sachin",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "394230",
  "latitude": 21.100806,
  "longitude": 72.864363
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb06"
  },
  "name": "Police Station-Kalupur",
  "area": "Relief Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.0295224,
  "longitude": 72.5931725
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb07"
  },
  "name": "Superintendent of Police Office",
  "area": "IDGAH Road",
  "district": "392001",
  "state": "Gujarat",
  "pincode": "Bharuch 392001",
  "latitude": 21.68912,
  "longitude": 72.965146
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb08"
  },
  "name": "Patthar Gute Police Chowki",
  "area": "Vadodara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "390001",
  "latitude": 22.296607,
  "longitude": 73.205784
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb09"
  },
  "name": "Police Station-Amraiwadi",
  "area": "Amraiwadi",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380026",
  "latitude": 23.0067623668,
  "longitude": 72.6250017832
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb0a"
  },
  "name": "Jalalpur Chowki",
  "area": "Jalalpur Road",
  "district": "Navsari",
  "state": "Gujarat",
  "pincode": "Navsari 396445",
  "latitude": 20.949579,
  "longitude": 72.912183
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb0b"
  },
  "name": "Police Station",
  "area": "Jamnagar 361008",
  "district": "Jamnagar 361008",
  "state": "Gujarat",
  "pincode": "Jamnagar 361008",
  "latitude": 22.4749,
  "longitude": 70.065152
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb0c"
  },
  "name": "Jetpur Police Station",
  "area": "Jetpur",
  "district": "360370",
  "state": "Gujarat",
  "pincode": "Jetpur 360370",
  "latitude": 21.754975,
  "longitude": 70.6223275
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb0d"
  },
  "name": "Satellite police station",
  "area": "Opp. Gulmohar Park",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "380015",
  "latitude": 23.0276795053,
  "longitude": 72.5111327892
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb0e"
  },
  "name": "Police Headquarter",
  "area": "SH 210",
  "district": "Kheda",
  "state": "Gujarat",
  "pincode": "387411",
  "latitude": 22.750683,
  "longitude": 72.684639
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb0f"
  },
  "name": "Police Sanskar Kendra",
  "area": "New Road",
  "district": "Nawapara",
  "state": "Gujarat",
  "pincode": "Bhavnagar 364001",
  "latitude": 21.772473,
  "longitude": 72.152216
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb10"
  },
  "name": "Bedipara Police Chowki",
  "area": "Bhavnagar Road",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360003",
  "latitude": 22.305394,
  "longitude": 70.811875
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb11"
  },
  "name": "Police Chowki",
  "area": "Bhavnagar 364060",
  "district": "Bhavnagar 364060",
  "state": "Gujarat",
  "pincode": "Bhavnagar 364060",
  "latitude": 21.7479644,
  "longitude": 72.0812593
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb12"
  },
  "name": "Police Station",
  "area": "Hirad",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "385110",
  "latitude": 24.334065,
  "longitude": 72.853608
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb13"
  },
  "name": "Police Station-Ichoda",
  "area": "NH-7",
  "district": "504307",
  "state": "Gujarat",
  "pincode": "Boath 504307",
  "latitude": 19.42531,
  "longitude": 78.45182
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb14"
  },
  "name": "Police Station-Songadh",
  "area": "Songadh 394670",
  "district": "Songadh 394670",
  "state": "Gujarat",
  "pincode": "Songadh 394670",
  "latitude": 21.1674498,
  "longitude": 73.5616176
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb15"
  },
  "name": "सरवाना",
  "area": "Bhorol",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "343041",
  "latitude": 24.7069783,
  "longitude": 71.4983733
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb16"
  },
  "name": "Anandnagar Police Station",
  "area": "Beside Umiya Vijay Complex",
  "district": "Mangaldas",
  "state": "Gujarat",
  "pincode": "380015",
  "latitude": 23.023616,
  "longitude": 72.532957
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb17"
  },
  "name": "Police Head Quarters",
  "area": "Race course ring road",
  "district": "",
  "state": "Gujarat",
  "pincode": "360001",
  "latitude": 22.31057101,
  "longitude": 70.79043525
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb18"
  },
  "name": "Police Station",
  "area": "Mawdi Main Road",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360004",
  "latitude": 22.26991,
  "longitude": 70.788801
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb19"
  },
  "name": "Pad Dhri Police Station",
  "area": "Paddhari 360110",
  "district": "Paddhari 360110",
  "state": "Gujarat",
  "pincode": "Paddhari 360110",
  "latitude": 22.435398,
  "longitude": 70.602903
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb1a"
  },
  "name": "Ellis Bridge Police Lines",
  "area": "Ahmedabad",
  "district": "380006",
  "state": "Gujarat",
  "pincode": "380006",
  "latitude": 23.0262488,
  "longitude": 72.5639771
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb1b"
  },
  "name": "Taluka Police Station",
  "area": "Gali No 5",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360001",
  "latitude": 22.309426,
  "longitude": 70.796978
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb1c"
  },
  "name": "Khatodra Police Station",
  "area": "Surat",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.176515712,
  "longitude": 72.831677311
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb1d"
  },
  "name": "Shahpur Police Station",
  "area": "Mehta Building",
  "district": "Bahai",
  "state": "Gujarat",
  "pincode": "380004",
  "latitude": 23.039554,
  "longitude": 72.579887
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb1e"
  },
  "name": "Anand Ruler Police Station",
  "area": "Anand Umreth Road",
  "district": "Andharia",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.50786,
  "longitude": 72.9511
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb1f"
  },
  "name": "Sukhnath Police Station",
  "area": "Sukhnath Road",
  "district": "Coat",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.52776,
  "longitude": 70.46412
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb20"
  },
  "name": "Police Station-Abdasa",
  "area": "Near Nh8a",
  "district": "Rural",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.41533,
  "longitude": 68.69446
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb21"
  },
  "name": "Police Station Bodeli",
  "area": "Bodeli Road",
  "district": "Hospital",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.27144,
  "longitude": 73.71653
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb22"
  },
  "name": "Kamalbang Police Station",
  "area": "Kamla Baug",
  "district": "360578",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.63918,
  "longitude": 69.62326
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb23"
  },
  "name": "Mahatma Gandhi Sabji and Fal Mandi Police Chowki",
  "area": "Dharwada Road",
  "district": "Kasba",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.82057,
  "longitude": 74.26178
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb24"
  },
  "name": "Police Station Patan City",
  "area": "Police Station-Patan City",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.8475,
  "longitude": 72.1108
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb25"
  },
  "name": "Sulun Darwada Police Chowki",
  "area": "Doctor Bhimrao Ambedkar Road",
  "district": "387002",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.69581,
  "longitude": 72.87038
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb26"
  },
  "name": "Mundra Police Chowki",
  "area": "Bramhapuri",
  "district": "Bramhapuri",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.83975,
  "longitude": 69.7234
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb27"
  },
  "name": "Hospital Police Chowki",
  "area": "Mahatma Gandhi Road",
  "district": "Kadiwad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.5211,
  "longitude": 70.46019
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb28"
  },
  "name": "Harij Police Station",
  "area": "Becharaji To Harij Road",
  "district": "Mandir",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.69315,
  "longitude": 71.90741
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb29"
  },
  "name": "Sri Abzar Chwadi Police Chowki",
  "area": "K T Shah Road",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.831,
  "longitude": 69.35041
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb2a"
  },
  "name": "Pansora Police Chowki",
  "area": "SH-188",
  "district": "Pansora",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.69513,
  "longitude": 73.03122
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb2b"
  },
  "name": "G I D C Police Chok Halol",
  "area": "SH-150",
  "district": "I",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.53045,
  "longitude": 73.46491
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb2c"
  },
  "name": "Halol Industrial Estate Police Chowki",
  "area": "SH-150",
  "district": "I",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.53056,
  "longitude": 73.46475
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb2d"
  },
  "name": "Police Kalyan Kendra",
  "area": "Police Line Road",
  "district": "Line",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.61147,
  "longitude": 72.39355
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb2e"
  },
  "name": "Sadan Bazaar Police Chowki",
  "area": "Saloon Bazar Road",
  "district": "387001",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.69579,
  "longitude": 72.87018
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb2f"
  },
  "name": "Saloon Bazaar Police Station",
  "area": "Junaraopura",
  "district": "387001",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.69508,
  "longitude": 72.87097
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb30"
  },
  "name": "Laharipuri Police Station",
  "area": "Champaner Gate from Fhatepur Main Road",
  "district": "Pol",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29996,
  "longitude": 73.21087
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb31"
  },
  "name": "Police Band Training Office",
  "area": "Police Quarters Lane",
  "district": "Dudeshwar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.05617,
  "longitude": 72.58762
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb32"
  },
  "name": "Kamla Bag Police Station",
  "area": "Wadia Road",
  "district": "Face",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.63852,
  "longitude": 69.61074
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb33"
  },
  "name": "Circle Police Inspector Kacheri",
  "area": "Hatadiya Bazar",
  "district": "Bazar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.12218,
  "longitude": 73.60744
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb34"
  },
  "name": "Police Station Ambica Society",
  "area": "Sabarkadha Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.568,
  "longitude": 72.74925
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb35"
  },
  "name": "Vijapur Police Chowki",
  "area": "Vijapur 382870",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.56785,
  "longitude": 72.74974
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb36"
  },
  "name": "Police Control Office",
  "area": "Station Road",
  "district": "Talao",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.6068,
  "longitude": 72.9207
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb37"
  },
  "name": "Aru Police Chowki",
  "area": "Aru Road",
  "district": "Vijalpore",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.92204,
  "longitude": 72.90921
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb38"
  },
  "name": "Police Headquarters",
  "area": "Madhupura Road",
  "district": "Vidhyalaya",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.16237,
  "longitude": 72.44689
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb39"
  },
  "name": "Partapnagar Police Station",
  "area": "Doctor Venibhai Modi Marg",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.28202,
  "longitude": 73.20752
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb3a"
  },
  "name": "Police Headquarters",
  "area": "Brilliant Class",
  "district": "Danteshwar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.28057,
  "longitude": 73.20733
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb3b"
  },
  "name": "Railway Police Force Office",
  "area": "Jadeshwar Road",
  "district": "Bank",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.21722,
  "longitude": 69.65745
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb3c"
  },
  "name": "Govt Railway Police",
  "area": "Jadeshwar Road",
  "district": "Bank",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.21685,
  "longitude": 69.65679
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb3d"
  },
  "name": "Mahemdavad Police Station",
  "area": "Mahemdavad City",
  "district": "Khatraj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.81926,
  "longitude": 72.75286
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb3e"
  },
  "name": "Kankaria Police Chowki",
  "area": "Kankaria Road",
  "district": "Kankaria",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.00944,
  "longitude": 72.59947
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb3f"
  },
  "name": "Office of Police Commisnor",
  "area": "Girnar Road",
  "district": "K",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29866,
  "longitude": 70.79236
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb40"
  },
  "name": "Zila Police Adhikari Chowki",
  "area": "Yagnik Road",
  "district": "Veermaya",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.2987,
  "longitude": 70.7926
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb41"
  },
  "name": "State Reserve Police Force Group XI Station",
  "area": "Makarpura Road",
  "district": "Tarsali",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.26023,
  "longitude": 73.20027
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb42"
  },
  "name": "Police Station-Ambaji",
  "area": "SH-9",
  "district": "Ambaji",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.33131,
  "longitude": 72.85033
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb43"
  },
  "name": "Ambika Nagar Police Circle",
  "area": "Acharya Tulsi Marg",
  "district": "Village",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.35058,
  "longitude": 73.201
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb44"
  },
  "name": "Superintendent of Police Station",
  "area": "Krishna Nagar Phase II",
  "district": "364001",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.77031,
  "longitude": 72.15027
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb45"
  },
  "name": "CTM Police Chowki",
  "area": "Ramol Road",
  "district": "Hatkeshwar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.98939,
  "longitude": 72.64076
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb46"
  },
  "name": "Superintendent Of Police House",
  "area": "Banas Dairy Road",
  "district": "Madhupura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.15958,
  "longitude": 72.43857
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb47"
  },
  "name": "Police Station Somnath Mandir Road",
  "area": "Bileshwar Street",
  "district": "362265",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.91045,
  "longitude": 70.37854
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb48"
  },
  "name": "Kheda Town Police Station",
  "area": "Kheda City",
  "district": "Mahemdabad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.75006,
  "longitude": 72.68571
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb49"
  },
  "name": "Memdabad Police Station",
  "area": "Kheda Mahemdabad Road",
  "district": "387411",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.74987,
  "longitude": 72.68624
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb4a"
  },
  "name": "Sector 21 Police Station",
  "area": "Wishram Grih Hotel",
  "district": "21",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.22756,
  "longitude": 72.66283
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb4b"
  },
  "name": "Police Headquarter",
  "area": "SH56A",
  "district": "Ambika",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.61028,
  "longitude": 72.39331
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb4c"
  },
  "name": "Police Station Raj Mahal",
  "area": "Rajmahal Road",
  "district": "Ambika",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.6074,
  "longitude": 72.392
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb4d"
  },
  "name": "JB Police Station Sunarwad",
  "area": "Doodh Sagar Marg",
  "district": "Pura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29284,
  "longitude": 70.81818
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb4e"
  },
  "name": "Navapura Police Chowki",
  "area": "Hazrat Makhdoom Shahid Baba Raho Masjid",
  "district": "Navapura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.28968,
  "longitude": 73.20114
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb4f"
  },
  "name": "Nava Naroda Police Station",
  "area": "Bapa Sitaram Road",
  "district": "Sitaram",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.04952,
  "longitude": 72.65784
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb50"
  },
  "name": "Police Suraksha Society Gujarat Police",
  "area": "Sh31",
  "district": "Bank",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.55163,
  "longitude": 70.46202
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb51"
  },
  "name": "Umreth Police Chowki",
  "area": "SH-12",
  "district": "388220",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.69808,
  "longitude": 73.10933
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb52"
  },
  "name": "Kalka Gate Police Chowki",
  "area": "Petlad Road",
  "district": "Shekhadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.48052,
  "longitude": 72.79898
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb53"
  },
  "name": "Police Line Headquarter",
  "area": "Police Line",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.47914,
  "longitude": 70.04852
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb54"
  },
  "name": "Jilha Police MT Section",
  "area": "Station Road Sardar Ganj",
  "district": "Gambi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.55765,
  "longitude": 72.96893
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb55"
  },
  "name": "Anand Town Police Station",
  "area": "Amul Dairy Road",
  "district": "Gambi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.55812,
  "longitude": 72.96807
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb56"
  },
  "name": "Mission Police Chowki",
  "area": "Dandi Heritage Route",
  "district": "387001",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.7031,
  "longitude": 72.841
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb57"
  },
  "name": "Tarsali Police Chowki",
  "area": "Baroda Dairy Road",
  "district": "Tarsali",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.25737,
  "longitude": 73.21248
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb58"
  },
  "name": "CPI Police Officer",
  "area": "Vadodara To Kevdi Eco Campsite Road",
  "district": "Lake",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.50156,
  "longitude": 73.48161
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb59"
  },
  "name": "Halol Police Chowki",
  "area": "SH-5",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.50151,
  "longitude": 73.4813
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb5a"
  },
  "name": "Nayab Police Adhikari Kacheri",
  "area": "SH-5",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.50131,
  "longitude": 73.48157
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb5b"
  },
  "name": "Kothari Baugh Police Chowki",
  "area": "SH-7",
  "district": "382150",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.12746,
  "longitude": 72.05164
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb5c"
  },
  "name": "Viramgam Railway Station Police Station",
  "area": "Railway Station",
  "district": "Station",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.12811,
  "longitude": 72.05293
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb5d"
  },
  "name": "Police Station Viramgam",
  "area": "Ahemdabad Road",
  "district": "382150",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.1279,
  "longitude": 72.0502
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb5e"
  },
  "name": "Police Station Songrah",
  "area": "Nh6 Tapi Road",
  "district": "394670",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.16735,
  "longitude": 73.56139
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb5f"
  },
  "name": "Chaklasi Mahadev Police Chowki",
  "area": "Main Bazar",
  "district": "Chaklasi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.65481,
  "longitude": 72.94518
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb60"
  },
  "name": "Police Station Maltiya",
  "area": "Near Sh45",
  "district": "Sonivad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.2605,
  "longitude": 69.6679
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb61"
  },
  "name": "Shilaj Traffic Police Chowki",
  "area": "Sardar Patel Ring Road",
  "district": "Shilaj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.05341,
  "longitude": 72.47984
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb62"
  },
  "name": "Air Force Police Station",
  "area": "Komal Nagar",
  "district": "Govardhanpur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.46892,
  "longitude": 70.03895
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb63"
  },
  "name": "Pava Pure Police Chowki",
  "area": "Idar 383430",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.85888,
  "longitude": 73.01589
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb64"
  },
  "name": "Ghogha Road Police Chowki",
  "area": "Ghogha Road",
  "district": "Talav",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.74424,
  "longitude": 72.17363
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb65"
  },
  "name": "Warasiya Police Station",
  "area": "RTO Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30907,
  "longitude": 73.21923
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb66"
  },
  "name": "Pipload Police Station",
  "area": "Service Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.165405,
  "longitude": 72.7813282
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb67"
  },
  "name": "Sec 20 Police Chowki",
  "area": "Sec-20",
  "district": "Gandhinagar",
  "state": "Gujarat",
  "pincode": "382021",
  "latitude": 23.230451,
  "longitude": 72.672189
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb68"
  },
  "name": "Police Station-Sayla",
  "area": "Service Road",
  "district": "Sayla",
  "state": "Gujarat",
  "pincode": "363430",
  "latitude": 22.53811,
  "longitude": 71.48155
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb69"
  },
  "name": "Police Station-Kadi",
  "area": "Kadi",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "382715",
  "latitude": 23.30096,
  "longitude": 72.33106
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb6a"
  },
  "name": "Police Station-Paanshina",
  "area": "NH-8A",
  "district": "Limbdi",
  "state": "Gujarat",
  "pincode": "363423",
  "latitude": 22.5746,
  "longitude": 71.95032
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb6b"
  },
  "name": "Janta Bazaar Police Chowki",
  "area": "Borsad",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "388540",
  "latitude": 22.411768,
  "longitude": 72.899159
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb6c"
  },
  "name": "Police Outpost",
  "area": "Ghoghla Main Road",
  "district": "Ghoghla",
  "state": "Gujarat",
  "pincode": "Dadra and Nagar Haveli And Daman and Diu",
  "latitude": 20.72346,
  "longitude": 70.98856
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb6d"
  },
  "name": "Police Station, Rajasthan",
  "area": "NH-48",
  "district": "314801",
  "state": "Gujarat",
  "pincode": "Rajasthan",
  "latitude": 23.75585,
  "longitude": 73.44174
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb6e"
  },
  "name": "Jawahar Nagar Police Station",
  "area": "Ranoli",
  "district": "Karachiya",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.39216,
  "longitude": 73.12175
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb6f"
  },
  "name": "Aru Police Chowki",
  "area": "NH-64",
  "district": "Village",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.92203,
  "longitude": 72.90921
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb70"
  },
  "name": "Nagarvel Hanuman Police Chowki",
  "area": "Nagarvel Hanuman Mandir Road",
  "district": "Amraiwadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.0114,
  "longitude": 72.63092
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb71"
  },
  "name": "Bhanwara SRP Point",
  "area": "Shri Muktjivan Swami Bapa Marg",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.31191,
  "longitude": 73.21083
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb72"
  },
  "name": "Sarkhej Mahila Police Station",
  "area": "Sarkhej Gandhinagar Highway",
  "district": "Makarba",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.99454,
  "longitude": 72.49757
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb73"
  },
  "name": "Rambharosha Police Station",
  "area": "Aradhana Complex",
  "district": "362265",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.90936,
  "longitude": 70.36904
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb74"
  },
  "name": "A Division Police Station",
  "area": "Mahatma Gandhi Road",
  "district": "Kadiwad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.51954,
  "longitude": 70.46106
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb75"
  },
  "name": "Railway Police Chowki",
  "area": "Dharampur Road",
  "district": "Mograwadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.59514,
  "longitude": 72.93119
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb76"
  },
  "name": "Una Police Station",
  "area": "NH-51",
  "district": "362560",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.82182,
  "longitude": 71.04181
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb77"
  },
  "name": "Green Police Chowki",
  "area": "Mahendra Drive Road",
  "district": "363641",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.81752,
  "longitude": 70.83659
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb78"
  },
  "name": "Porbandar Khajh Jail",
  "area": "M G Road",
  "district": "Baug",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.63973,
  "longitude": 69.62471
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb79"
  },
  "name": "Police Station Mundra",
  "area": "Bramhapuri",
  "district": "Bramhapuri",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.84009,
  "longitude": 69.72349
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb7a"
  },
  "name": "Superintendent Of Police House",
  "area": "Banas Dairy Road",
  "district": "Madhupura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.15956,
  "longitude": 72.43853
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb7b"
  },
  "name": "Police Savrakshan Kacheri",
  "area": "Ashram Road",
  "district": "387001",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.69902,
  "longitude": 72.85497
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb7c"
  },
  "name": "Deesa Rural Police Station",
  "area": "G G Road",
  "district": "385535",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.26209,
  "longitude": 72.18535
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb7d"
  },
  "name": "Detection Of Crime Branch Surat City Gopipura",
  "area": "Dariya Mahal Rd",
  "district": "Nanavat",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.19827,
  "longitude": 72.81944
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb7e"
  },
  "name": "Nasvaadi Police Station",
  "area": "Nasvadi Road",
  "district": "Nasvadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.04344,
  "longitude": 73.727
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb7f"
  },
  "name": "Moti Bazaar Police Chowki",
  "area": "Moti Bazar",
  "district": "Rajghadhi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.17201,
  "longitude": 72.44171
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb80"
  },
  "name": "Govt Railway Police",
  "area": "Jadeshwar Road",
  "district": "Bank",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.21679,
  "longitude": 69.65679
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb81"
  },
  "name": "Railway Police Force Office",
  "area": "Jadeshwar Road",
  "district": "Bank",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.21726,
  "longitude": 69.65743
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb82"
  },
  "name": "Khambhat Railway Station Police Chowki",
  "area": "Petlad Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.32351,
  "longitude": 72.62826
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb83"
  },
  "name": "Office Of The Superintendent Of Police Police Colony",
  "area": "Sardar Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.72779,
  "longitude": 71.62144
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb84"
  },
  "name": "Mahila Police Chowki Rani Bagh",
  "area": "Swami Vivekananda Road",
  "district": "Bagh",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.64137,
  "longitude": 69.61886
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb85"
  },
  "name": "Crs Office",
  "area": "Javahar Dhakka Road",
  "district": "Petroleum",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.60395,
  "longitude": 72.93059
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb86"
  },
  "name": "Office of The Superintendent Of Police",
  "area": "Police Line Road",
  "district": "Line",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.61248,
  "longitude": 72.39317
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb87"
  },
  "name": "Soni Ni Chali Police Chowki",
  "area": "Narol Naroda Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02031,
  "longitude": 72.63874
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb88"
  },
  "name": "Behrampura Police Chowki",
  "area": "Shri Mahant Narsinhdas Marg",
  "district": "Calicomill",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.00809,
  "longitude": 72.58034
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb89"
  },
  "name": "Jamalpur Police Chowki",
  "area": "Jagannath Mandir Marg",
  "district": "Jamalpur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.01188,
  "longitude": 72.58114
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb8a"
  },
  "name": "Station Police Chowki",
  "area": "Subhash Road",
  "district": "Ganj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.56053,
  "longitude": 72.96633
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb8b"
  },
  "name": "Chhota Udaipur Police Station",
  "area": "Chhota Udaipur Road",
  "district": "Udaipur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.31239,
  "longitude": 74.01334
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb8c"
  },
  "name": "Prahlad Nagar Police Traffic Booth",
  "area": "Ma Anandmayi Marg",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.01175,
  "longitude": 72.50649
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb8d"
  },
  "name": "Police Unit Mount Khapat",
  "area": "Adityana Road",
  "district": "360579",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.66686,
  "longitude": 69.62445
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb8e"
  },
  "name": "Godhra Police Chokdi No 6",
  "area": "Vhoravad Road",
  "district": "Wad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.77658,
  "longitude": 73.60932
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb8f"
  },
  "name": "Police Station Kosad",
  "area": "Kosad Road",
  "district": "Township",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.2554,
  "longitude": 72.85271
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb90"
  },
  "name": "Sardar Nagar Police Station",
  "area": "Hansol Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.08328,
  "longitude": 72.62071
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb91"
  },
  "name": "Police Chowki, Prantij",
  "area": "Prantij 383205",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.43501,
  "longitude": 72.85715
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb92"
  },
  "name": "Bhagwat Police Chowki",
  "area": "Sarkhej Gandhinagar Highway",
  "district": "Police",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.08604,
  "longitude": 72.52877
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb93"
  },
  "name": "Lakhdirsingh Police Station",
  "area": "SH-22",
  "district": "363642",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.8237,
  "longitude": 70.8452
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb94"
  },
  "name": "Police Chowki Sector 29",
  "area": "Rangmanch",
  "district": "29",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.24209,
  "longitude": 72.66413
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb95"
  },
  "name": "Sector 22 Police Chowki",
  "area": "Vatsal Garden",
  "district": "22",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.23735,
  "longitude": 72.65527
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb96"
  },
  "name": "Sinor Police Chowk",
  "area": "Sinor Road",
  "district": "391110",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.12831,
  "longitude": 73.4118
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb97"
  },
  "name": "Ram Rahim Police Station",
  "area": "Shri Mahant Narsinhdas Marg",
  "district": "Calicomill",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.00142,
  "longitude": 72.57633
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb98"
  },
  "name": "Kalwa Police Station",
  "area": "MG Road",
  "district": "362001",
  "state": "Gujarat",
  "pincode": "Junagadh 362001",
  "latitude": 21.513908,
  "longitude": 70.463187
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb99"
  },
  "name": "Rail Way Police Station",
  "area": "Joshipara Main Road",
  "district": "362001",
  "state": "Gujarat",
  "pincode": "Junagadh 362001",
  "latitude": 21.526035,
  "longitude": 70.456882
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb9a"
  },
  "name": "Tankara Police Station",
  "area": "Tankara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "363650",
  "latitude": 22.656719,
  "longitude": 70.746753
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb9b"
  },
  "name": "Police Station-Aslali",
  "area": "Ahmedabad",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.91935,
  "longitude": 72.59445
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb9c"
  },
  "name": "Police Station-Chaklasi",
  "area": "Chaklasi 387315",
  "district": "Chaklasi 387315",
  "state": "Gujarat",
  "pincode": "Chaklasi 387315",
  "latitude": 22.6548071,
  "longitude": 72.9452591
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb9d"
  },
  "name": "Daryapur Police Chowki",
  "area": "Jorden Road",
  "district": "Char",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.035601,
  "longitude": 72.592894
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb9e"
  },
  "name": "Dabhan Highway Traffic Police Madad Chowki",
  "area": "Nadiad 387001",
  "district": "Nadiad 387001",
  "state": "Gujarat",
  "pincode": "Nadiad 387001",
  "latitude": 22.707049,
  "longitude": 72.82673
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bb9f"
  },
  "name": "Police Station-Dholka",
  "area": "Dholka 382225",
  "district": "Dholka 382225",
  "state": "Gujarat",
  "pincode": "Dholka 382225",
  "latitude": 22.73434,
  "longitude": 72.43661
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bba0"
  },
  "name": "JP Road Police Station",
  "area": "Jay Prakash Narayan Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390012",
  "latitude": 22.28984,
  "longitude": 73.15444
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bba1"
  },
  "name": "Police Station-Bhanvad",
  "area": "Bhanvad 360510",
  "district": "Bhanvad 360510",
  "state": "Gujarat",
  "pincode": "Bhanvad 360510",
  "latitude": 21.93079,
  "longitude": 69.77942
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bba2"
  },
  "name": "Mahila Police Station",
  "area": "navrangpura meetha khadi six road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "360001",
  "latitude": 22.30771904,
  "longitude": 70.78989397
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bba3"
  },
  "name": "City Police Station Dhrangadhra",
  "area": "DHG Matwan Road",
  "district": "363310",
  "state": "Gujarat",
  "pincode": "Dhrangadhra 363310",
  "latitude": 22.995989,
  "longitude": 71.470624
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bba4"
  },
  "name": "Police station-Jahangirpura",
  "area": "Surat",
  "district": "395005",
  "state": "Gujarat",
  "pincode": "395005",
  "latitude": 21.2223827,
  "longitude": 72.7905494
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bba5"
  },
  "name": "Chavdi Gate Police Chowki",
  "area": "ST Road",
  "district": "364001",
  "state": "Gujarat",
  "pincode": "Bhavnagar 364001",
  "latitude": 21.773578,
  "longitude": 72.136559
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bba6"
  },
  "name": "Gariyadhar Police Station",
  "area": "Gariyadhar",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "364505",
  "latitude": 21.5407199,
  "longitude": 71.5780781
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bba7"
  },
  "name": "District Police Head Quarter-Main Gate",
  "area": "Jamnagar 361002",
  "district": "Jamnagar 361002",
  "state": "Gujarat",
  "pincode": "Jamnagar 361002",
  "latitude": 22.47749,
  "longitude": 70.05114
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bba8"
  },
  "name": "Police Station Giddalur",
  "area": "Dudhrej 363001",
  "district": "Dudhrej 363001",
  "state": "Gujarat",
  "pincode": "Dudhrej 363001",
  "latitude": 22.7329,
  "longitude": 71.62245
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bba9"
  },
  "name": "Police Chowki-Mota",
  "area": "SH-64",
  "district": "392001",
  "state": "Gujarat",
  "pincode": "Bharuch 392001",
  "latitude": 21.69596,
  "longitude": 72.97768
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbaa"
  },
  "name": "Police Station-Sayan",
  "area": "Olpad",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "394130",
  "latitude": 21.3168875803,
  "longitude": 72.8888582998
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbab"
  },
  "name": "Sheetal Varsha - Mahavir Business Park",
  "area": "Opp. Behrampura Police Chowki",
  "district": "Jamalpur",
  "state": "Gujarat",
  "pincode": "380022",
  "latitude": 23.0309872334,
  "longitude": 72.5801787334
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbac"
  },
  "name": "Police Station-Dhod",
  "area": "NH-59",
  "district": "Dohad",
  "state": "Gujarat",
  "pincode": "389160",
  "latitude": 22.83152,
  "longitude": 74.22152
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbad"
  },
  "name": "Fatehpura Police Chowki",
  "area": "Near Fatepura Post Office",
  "district": "Desai",
  "state": "Gujarat",
  "pincode": "380007",
  "latitude": 23.007584,
  "longitude": 72.557567
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbae"
  },
  "name": "Kathlal Police Station",
  "area": "National Highway-59",
  "district": "Kathlal",
  "state": "Gujarat",
  "pincode": "387630",
  "latitude": 22.89403875,
  "longitude": 72.9866753
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbaf"
  },
  "name": "Nobal Nagar Police Chwoky",
  "area": "Near Nobal Nagar",
  "district": "Sardarnagar",
  "state": "Gujarat",
  "pincode": "382340",
  "latitude": 23.090467,
  "longitude": 72.653402
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbb0"
  },
  "name": "Police Station-Mahidharpura",
  "area": "Tower Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395003",
  "latitude": 21.19831,
  "longitude": 72.83379
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbb1"
  },
  "name": "Police Station-Nikol",
  "area": "Ahmedabad",
  "district": "382350",
  "state": "Gujarat",
  "pincode": "382350",
  "latitude": 23.0445483809,
  "longitude": 72.6777518334
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbb2"
  },
  "name": "Police Station-Potra",
  "area": "Gandhi Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380002",
  "latitude": 23.02706,
  "longitude": 72.6
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbb3"
  },
  "name": "Police Station-Jhodhiya",
  "area": "Bandar Road",
  "district": "Jodiya",
  "state": "Gujarat",
  "pincode": "361250",
  "latitude": 22.69298,
  "longitude": 70.31605
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbb4"
  },
  "name": "Police Station-Muli",
  "area": "SH-21",
  "district": "Muli",
  "state": "Gujarat",
  "pincode": "363510",
  "latitude": 22.63612,
  "longitude": 71.46055
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbb5"
  },
  "name": "Police Station-Sojitra",
  "area": "Railway Station Road",
  "district": "Sojitra",
  "state": "Gujarat",
  "pincode": "387240",
  "latitude": 22.5435246,
  "longitude": 72.7199698
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbb6"
  },
  "name": "Police Station-Mahudi",
  "area": "Kajiwada Parabdi Mahudi Gate Road",
  "district": "391110",
  "state": "Gujarat",
  "pincode": "Dabhoi 391110",
  "latitude": 22.13786,
  "longitude": 73.41942
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbb7"
  },
  "name": "Police Station-Dhanera",
  "area": "Dhanera 385310",
  "district": "Dhanera 385310",
  "state": "Gujarat",
  "pincode": "Dhanera 385310",
  "latitude": 24.50651,
  "longitude": 72.03018
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbb8"
  },
  "name": "Navapura Police Station",
  "area": "R V Desai Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390001",
  "latitude": 22.289552015,
  "longitude": 73.205471237
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbb9"
  },
  "name": "Textile Police Chowki-Sanjay Nagar",
  "area": "Bharat Ratna Babasaheb Ambedkar Flyover",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395002",
  "latitude": 21.19097,
  "longitude": 72.84205
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbba"
  },
  "name": "Police Chowki-Navli",
  "area": "Kanatalav Road",
  "district": "Savarkundla",
  "state": "Gujarat",
  "pincode": "364515",
  "latitude": 21.33915,
  "longitude": 71.31033
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbbb"
  },
  "name": "Police Station-Hindorna",
  "area": "NH-8E",
  "district": "365560",
  "state": "Gujarat",
  "pincode": "Rajula 365560",
  "latitude": 21.00881,
  "longitude": 71.43424
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbbc"
  },
  "name": "Gir Somnath Sp Office",
  "area": "Somnath",
  "district": "Somnath",
  "state": "Gujarat",
  "pincode": "Somnath",
  "latitude": 20.9100278,
  "longitude": 70.3625087
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbbd"
  },
  "name": "Police Station-Mandavi",
  "area": "Dhal Road",
  "district": "362001",
  "state": "Gujarat",
  "pincode": "Junagadh 362001",
  "latitude": 21.52235,
  "longitude": 70.46376
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbbe"
  },
  "name": "Police Station-Gita Nagar",
  "area": "NH-228",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "394210",
  "latitude": 21.15822,
  "longitude": 72.86288
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbbf"
  },
  "name": "SP Office Morbi",
  "area": "Morbi 363641",
  "district": "Morbi 363641",
  "state": "Gujarat",
  "pincode": "Morbi 363641",
  "latitude": 22.827512,
  "longitude": 70.840385
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbc0"
  },
  "name": "SP Office",
  "area": "Bhavnagar 364001",
  "district": "Bhavnagar 364001",
  "state": "Gujarat",
  "pincode": "Bhavnagar 364001",
  "latitude": 21.770031,
  "longitude": 72.150328
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbc1"
  },
  "name": "Police Chowki",
  "area": "Bhavnagar Road",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360003",
  "latitude": 22.281564,
  "longitude": 70.833059
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbc2"
  },
  "name": "Surajkardi Mithapur Police Chowki",
  "area": "Mithapur Main Road",
  "district": "361347",
  "state": "Gujarat",
  "pincode": "Mithapur 361347",
  "latitude": 22.417661,
  "longitude": 69.01543
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbc3"
  },
  "name": "Superintendent of Police Office",
  "area": "Uper Court Road",
  "district": "362001",
  "state": "Gujarat",
  "pincode": "Junagadh 362001",
  "latitude": 21.521775,
  "longitude": 70.468223
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbc4"
  },
  "name": "Joravarnagar, Surendranagar",
  "area": "Dudhrej",
  "district": "Dudhrej",
  "state": "Gujarat",
  "pincode": "Dudhrej",
  "latitude": 22.7131900081,
  "longitude": 71.6354868506
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbc5"
  },
  "name": "Police Head Quarters",
  "area": "Dumas Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395001",
  "latitude": 21.181223,
  "longitude": 72.802004
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbc6"
  },
  "name": "Mahila Police Station-Mithakhali",
  "area": "Mithakhali Six Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380009",
  "latitude": 23.0318543,
  "longitude": 72.5640638
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbc7"
  },
  "name": "Police Station-Limkheda",
  "area": "SH-62",
  "district": "Limkheda",
  "state": "Gujarat",
  "pincode": "389140",
  "latitude": 22.83303,
  "longitude": 73.98759
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbc8"
  },
  "name": "Police Station-Bharuch",
  "area": "NH-8",
  "district": "392011",
  "state": "Gujarat",
  "pincode": "Bharuch 392011",
  "latitude": 21.72451,
  "longitude": 73.0353
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbc9"
  },
  "name": "Jamnagar Road Police Station",
  "area": "Jamnagar Road",
  "district": "Sadar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30777,
  "longitude": 70.79728
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbca"
  },
  "name": "Bopal Police Station",
  "area": "S Bhopal Main Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.03289,
  "longitude": 72.46524
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbcb"
  },
  "name": "Bopal Police Station",
  "area": "South Bopal Main Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02458,
  "longitude": 72.4708
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbcc"
  },
  "name": "Palej Police Chowki",
  "area": "Bharucha",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "392220",
  "latitude": 21.9225,
  "longitude": 73.08041
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbcd"
  },
  "name": "Kasak Police Chowki",
  "area": "Bharuch Bypass Road",
  "district": "Bypass",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.70348,
  "longitude": 73.00242
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbce"
  },
  "name": "Anandnagar Police Station",
  "area": "Sheth Surendra Mangaldas Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02362,
  "longitude": 72.53302
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbcf"
  },
  "name": "Raikhad Police Station",
  "area": "Mb Kadri Road",
  "district": "Church",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.01823,
  "longitude": 72.58059
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbd0"
  },
  "name": "Astodia Police Chowki",
  "area": "Sardar Patel Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.01713,
  "longitude": 72.59056
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbd1"
  },
  "name": "Panchkuva Police Chowki",
  "area": "Gandhi Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.02536,
  "longitude": 72.59704
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbd2"
  },
  "name": "Udhna Police Station",
  "area": "Indira Gandhi Marg",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395011",
  "latitude": 21.11348,
  "longitude": 72.8608
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbd3"
  },
  "name": "Udhna Udyog Nagar Police Station",
  "area": "Udhana Palsana Road",
  "district": "Ichcha",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.1701,
  "longitude": 72.8415
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbd4"
  },
  "name": "Udhna Railway Station Police Chowki",
  "area": "Udhana Station Road",
  "district": "Udhyog",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.16985,
  "longitude": 72.85123
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbd5"
  },
  "name": "Dariyapur Police Station",
  "area": "Kasturba Gandhi Road",
  "district": "Vadigam",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.03477,
  "longitude": 72.59627
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbd6"
  },
  "name": "Metoda GIDC Police Chowki",
  "area": "Kisan Gate Road",
  "district": "Metoda",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.24634,
  "longitude": 70.67343
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbd7"
  },
  "name": "Shath Kawa Police Chowki",
  "area": "SH-6",
  "district": "Navsari",
  "state": "Gujarat",
  "pincode": "396445",
  "latitude": 20.94989,
  "longitude": 72.91956
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbd8"
  },
  "name": "Rakhial Police Station",
  "area": "Rakhial Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380021",
  "latitude": 23.02155,
  "longitude": 72.62285
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbd9"
  },
  "name": "H Traffic Police Station Rakhial",
  "area": "Rameshwar Mahadev Cross Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380021",
  "latitude": 23.01984,
  "longitude": 72.63281
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbda"
  },
  "name": "Khambhat Police Station",
  "area": "Aakruti Twp Road",
  "district": "Twp",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.32714,
  "longitude": 72.62937
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbdb"
  },
  "name": "Khambhat City Police Station",
  "area": "Lal Darwaja Road",
  "district": "Limdi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.32366,
  "longitude": 72.62085
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbdc"
  },
  "name": "Khambhat City Police Station",
  "area": "Petlad Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.3234,
  "longitude": 72.62808
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbdd"
  },
  "name": "Khambhat City Police Station",
  "area": "Lal Darwaja Road",
  "district": "Pol",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.3121,
  "longitude": 72.61759
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbde"
  },
  "name": "Radhanpur Police Station",
  "area": "Ahmedabad To Patan Highway",
  "district": "Circle",
  "state": "Gujarat",
  "pincode": "384001",
  "latitude": 23.60584,
  "longitude": 72.3816
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbdf"
  },
  "name": "Police Station-Radhanpur",
  "area": "Sh861 Banaskantha Road",
  "district": "Radhanpur",
  "state": "Gujarat",
  "pincode": "385340",
  "latitude": 23.82878,
  "longitude": 71.61443
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbe0"
  },
  "name": "Police Station-Washi Road",
  "area": "Washirad Road",
  "district": "Santosh",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.0888,
  "longitude": 71.7686
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbe1"
  },
  "name": "Karshna Nagar Police Station",
  "area": "Naroda Dehgam Road",
  "district": "Makarpura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.07469,
  "longitude": 72.65545
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbe2"
  },
  "name": "Malia Police Station",
  "area": "Government School",
  "district": "362245",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.16082,
  "longitude": 70.30581
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbe3"
  },
  "name": "Kheda Town Police Station Gobhalaj",
  "area": "Narol Naroda Road",
  "district": "387550",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.79187,
  "longitude": 72.63349
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbe4"
  },
  "name": "Pansora Police Chowki",
  "area": "SH-188",
  "district": "Umreth",
  "state": "Gujarat",
  "pincode": "387115",
  "latitude": 22.69513,
  "longitude": 73.03115
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbe5"
  },
  "name": "Police Station Biss Nagar Road",
  "area": "Biss Nagar Road",
  "district": "Tavadiya",
  "state": "Gujarat",
  "pincode": "384001",
  "latitude": 23.6117,
  "longitude": 72.3921
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbe6"
  },
  "name": "Police Station Kandla",
  "area": "Swami Lilashah Road",
  "district": "Gandhidham",
  "state": "Gujarat",
  "pincode": "370205",
  "latitude": 23.0715,
  "longitude": 70.077
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbe7"
  },
  "name": "Aslo Police Chowki",
  "area": "Oslo Road",
  "district": "370203",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.06038,
  "longitude": 70.13137
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbe8"
  },
  "name": "Joshipura Police Station",
  "area": "Sardarpura Main Road",
  "district": "City",
  "state": "Gujarat",
  "pincode": "362002",
  "latitude": 21.52979,
  "longitude": 70.45552
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbe9"
  },
  "name": "Police Chokdi Lunawada",
  "area": "Modasa Road",
  "district": "Lunawada",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.12945,
  "longitude": 73.61551
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbea"
  },
  "name": "Kawant Police Chokdi",
  "area": "SH-62",
  "district": "391170",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.09249,
  "longitude": 74.04993
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbeb"
  },
  "name": "Tejgadh Police Chokdi",
  "area": "Tejgadh Gam Road",
  "district": "Tejgadh",
  "state": "Gujarat",
  "pincode": "391156",
  "latitude": 22.35007,
  "longitude": 73.90697
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbec"
  },
  "name": "Botad Police Station",
  "area": "Sh38",
  "district": "Bank",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.17413,
  "longitude": 71.666
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbed"
  },
  "name": "Police Station Kach Nav Vibhag",
  "area": "New Mint Road",
  "district": "Bhuj",
  "state": "Gujarat",
  "pincode": "370605",
  "latitude": 23.2502,
  "longitude": 69.6667
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbee"
  },
  "name": "NFD Circle Police Chowki",
  "area": "Bodakdev Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380015",
  "latitude": 23.04351,
  "longitude": 72.5205
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbef"
  },
  "name": "Upleta Police Station",
  "area": "Kolki Road",
  "district": "360490",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.7473,
  "longitude": 70.27548
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbf0"
  },
  "name": "Golden Breage Police Chowki",
  "area": "Ankleshwar Road",
  "district": "Circle",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.70078,
  "longitude": 73.00084
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbf1"
  },
  "name": "Police Station Shivnagar Society",
  "area": "Lambe Hanuman Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395010",
  "latitude": 21.20856,
  "longitude": 72.85318
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbf2"
  },
  "name": "Shivnagar Police Chowki",
  "area": "Service Road",
  "district": "Temple",
  "state": "Gujarat",
  "pincode": "385535",
  "latitude": 24.26886,
  "longitude": 72.18156
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbf3"
  },
  "name": "Police Chowki Umaria",
  "area": "SH-2",
  "district": "389265",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.13295,
  "longitude": 73.71261
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbf4"
  },
  "name": "Anklav Police Station",
  "area": "Anklav Road",
  "district": "388510",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.37761,
  "longitude": 72.99728
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbf5"
  },
  "name": "Anklav Police Station",
  "area": "Joshikuva Village",
  "district": "Asodar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.38291,
  "longitude": 72.99676
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbf6"
  },
  "name": "Khadakiya Police Chok",
  "area": "Gadhboriyad Road",
  "district": "Gadhboriyad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.05348,
  "longitude": 73.83173
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbf7"
  },
  "name": "Lunawada Police Chok",
  "area": "SH-5",
  "district": "Lunawada",
  "state": "Gujarat",
  "pincode": "389230",
  "latitude": 23.13104,
  "longitude": 73.60519
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbf8"
  },
  "name": "Godhra Town Police Chok",
  "area": "Tower Road",
  "district": "Godhra",
  "state": "Gujarat",
  "pincode": "389001",
  "latitude": 22.77435,
  "longitude": 73.61344
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbf9"
  },
  "name": "Police Stations Lal Bhag",
  "area": "Near Over Bril Highway",
  "district": "Panchmahal",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.7798,
  "longitude": 73.622
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbfa"
  },
  "name": "Babra Police Station",
  "area": "SH-31",
  "district": "Vadia",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.81308,
  "longitude": 71.04316
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbfb"
  },
  "name": "Police Station-Yelodha",
  "area": "NH-8 Service Road",
  "district": "Gandhinagar",
  "state": "Gujarat",
  "pincode": "382355",
  "latitude": 23.2270727,
  "longitude": 72.7306127
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbfc"
  },
  "name": "Sikka Police Station",
  "area": "Sikka",
  "district": "361140",
  "state": "Gujarat",
  "pincode": "361140",
  "latitude": 22.434406,
  "longitude": 69.837973
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbfd"
  },
  "name": "Police Station-Shihor",
  "area": "Bhavnagar Road",
  "district": "",
  "state": "Gujarat",
  "pincode": "Sihor",
  "latitude": 21.71678,
  "longitude": 71.95867
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbfe"
  },
  "name": "Police Station-Saputara",
  "area": "Sarad",
  "district": "Maharashtra",
  "state": "Gujarat",
  "pincode": "394720",
  "latitude": 20.57871,
  "longitude": 73.75113
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bbff"
  },
  "name": "Police Station",
  "area": "Sector 24",
  "district": "Gandhinagar",
  "state": "Gujarat",
  "pincode": "382024",
  "latitude": 23.243363,
  "longitude": 72.642654
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc00"
  },
  "name": "Police Station-Sector No 18",
  "area": "CHH Road",
  "district": "Gandhinagar",
  "state": "Gujarat",
  "pincode": "382007",
  "latitude": 23.21394,
  "longitude": 72.65816
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc01"
  },
  "name": "Sector 22 Traffic Police Station Gandhinagar",
  "area": "Sector 22 Road",
  "district": "Gandhinagar",
  "state": "Gujarat",
  "pincode": "382021",
  "latitude": 23.2371358,
  "longitude": 72.6564106
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc02"
  },
  "name": "Checkpost",
  "area": "Vadodara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "391740",
  "latitude": 22.366096,
  "longitude": 73.1909494
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc03"
  },
  "name": "Police Station-Fatehgunj",
  "area": "Dharamsinh Desai Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390024",
  "latitude": 22.33528,
  "longitude": 73.17392
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc04"
  },
  "name": "Police Station",
  "area": "State Highway 9",
  "district": "Alkapuri",
  "state": "Gujarat",
  "pincode": "Himatnagar 383001",
  "latitude": 23.6040928,
  "longitude": 72.9614305
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc05"
  },
  "name": "Police Station Gurgaon",
  "area": "Umbergaon Railway Station Road",
  "district": "Police",
  "state": "Gujarat",
  "pincode": "Maharashtra",
  "latitude": 20.14886,
  "longitude": 72.83098
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc06"
  },
  "name": "Sadhli Out Post Police Station",
  "area": "Kayavarohan Road",
  "district": "Sadhali",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.98542,
  "longitude": 73.29236
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc07"
  },
  "name": "Atladara Police Chowki",
  "area": "Atladra",
  "district": "Atladara",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.27545,
  "longitude": 73.15549
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc08"
  },
  "name": "Atladara Check Post",
  "area": "Vadodara To Padra Road",
  "district": "Atladra",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.27475,
  "longitude": 73.153
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc09"
  },
  "name": "Pipalaget Police Chowki",
  "area": "Shree Panchasara Parshwanath Jain Derasar",
  "district": "Patel",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.85442,
  "longitude": 72.11677
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc0a"
  },
  "name": "D Division Police Station",
  "area": "Rajkot Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.76364,
  "longitude": 72.12311
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc0b"
  },
  "name": "Kashipura Police Chowki",
  "area": "Kashipura Road",
  "district": "Kashipura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.406353,
  "longitude": 72.897138
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc0c"
  },
  "name": "Police Station Dev Bagh",
  "area": "Dev Bagh",
  "district": "Devbagh",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.7673,
  "longitude": 72.1399
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc0d"
  },
  "name": "Police Station Shahpur",
  "area": "Dudeshwar Road",
  "district": "Dudeshwar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.04736,
  "longitude": 72.58287
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc0e"
  },
  "name": "Kalyan Police Chowki",
  "area": "Rameshwar Mahadev Cross Road",
  "district": "Bogha",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.05355,
  "longitude": 72.63067
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc0f"
  },
  "name": "Barton Library Police Chowk",
  "area": "Diwanpara Road",
  "district": "Bazar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.77825,
  "longitude": 72.14983
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc10"
  },
  "name": "Ruvapari Police Station",
  "area": "Diwanpara Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.77821,
  "longitude": 72.15005
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc11"
  },
  "name": "Police Station Palavasana",
  "area": "Sh41",
  "district": "Palanpur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.5988,
  "longitude": 72.3794
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc12"
  },
  "name": "Dundiyawadi Police Chowki",
  "area": "Railway Maal Godown Road",
  "district": "Railway",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.1715,
  "longitude": 72.42831
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc13"
  },
  "name": "Palanpur Shahar Haive Police Chowki",
  "area": "Gurunanak Road",
  "district": "Railway",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.17132,
  "longitude": 72.42817
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc14"
  },
  "name": "A Divisoin Police Station Porbandar",
  "area": "Kasturba Road",
  "district": "Chowk",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.64244,
  "longitude": 69.60094
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc15"
  },
  "name": "Vetican Police Chowki",
  "area": "Vatva Village Road",
  "district": "Vatwa",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.95008,
  "longitude": 72.624
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc16"
  },
  "name": "Highway Police Chowki",
  "area": "Tulasi Nagar",
  "district": "Mehsana",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.80497,
  "longitude": 72.37968
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc17"
  },
  "name": "Hagh Ways Police Chowki",
  "area": "Ahmedabad To Palanpur Highway Road",
  "district": "Circle",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.8049,
  "longitude": 72.37969
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc18"
  },
  "name": "Police Head Quarter",
  "area": "Bus Stand Road",
  "district": "Chandnagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.6016,
  "longitude": 72.9596
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc19"
  },
  "name": "Railway Security Force Station",
  "area": "Brilliant Class",
  "district": "Danteshwar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.27872,
  "longitude": 73.21523
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc1a"
  },
  "name": "Pandesara Bhestan Police Station",
  "area": "Udhana Main Road",
  "district": "Udhna",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.12802,
  "longitude": 72.85511
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc1b"
  },
  "name": "Mehmadabad Police Station",
  "area": "Mahemdabad Road",
  "district": "Mahemdabad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.82056,
  "longitude": 72.75778
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc1c"
  },
  "name": "Police Station Shera Godhra",
  "area": "Ranchoji Mandir Road",
  "district": "Shera",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.77413,
  "longitude": 73.61349
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc1d"
  },
  "name": "Godhra Town Police Chok",
  "area": "Tower Road",
  "district": "Soniwada",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.77438,
  "longitude": 73.61338
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc1e"
  },
  "name": "Girr Darwaja Police Station",
  "area": "Datar Road",
  "district": "Coat",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.5213,
  "longitude": 70.47399
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc1f"
  },
  "name": "Pradip Police Chowki",
  "area": "Pradip Cinema Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.51215,
  "longitude": 70.46476
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc20"
  },
  "name": "Kawant Police Chokdi",
  "area": "SH-62",
  "district": "391170",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.0925,
  "longitude": 74.04995
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc21"
  },
  "name": "Police Headquarters",
  "area": "Madhupura Road",
  "district": "Vidhyalaya",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.16237,
  "longitude": 72.44687
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc22"
  },
  "name": "Police Station Bhuj",
  "area": "Near Kodki Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.25491,
  "longitude": 69.65705
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc23"
  },
  "name": "Jayarathna Police Chowki",
  "area": "R V Desai Road",
  "district": "Kevdabaug",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29281,
  "longitude": 73.20332
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc24"
  },
  "name": "Ajit Mill Policeh Chowki",
  "area": "Soni Ni Chawl Flyover",
  "district": "Ni",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02033,
  "longitude": 72.63808
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc25"
  },
  "name": "Rameshwar Police Station",
  "area": "Rameshwar Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.05747,
  "longitude": 72.62164
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc26"
  },
  "name": "Meghaninagar Police Station",
  "area": "Meghani Nagar Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.0578,
  "longitude": 72.61783
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc27"
  },
  "name": "Nayab Police Station",
  "area": "Station Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.77902,
  "longitude": 73.62126
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc28"
  },
  "name": "Tarapur Town Police Chowki",
  "area": "Tarapur Khambhat Road",
  "district": "Market",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.4894,
  "longitude": 72.65608
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc29"
  },
  "name": "Police Station Sochitra Road",
  "area": "SH-83",
  "district": "Park",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.54492,
  "longitude": 72.96822
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc2a"
  },
  "name": "Gujarat Housing Board Police Chowki",
  "area": "Bank Of Baroda Atm",
  "district": "Chandkheda",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.11619,
  "longitude": 72.57192
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc2b"
  },
  "name": "Vijapur Police Chowki",
  "area": "Main Road",
  "district": "Bazar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.690945,
  "longitude": 72.976092
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc2c"
  },
  "name": "Lalbajar Police Chowki",
  "area": "Kasak Main Road",
  "district": "Circle",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.69379,
  "longitude": 72.98077
},
{
  "_id": {
    "$oid": "6539279ee0265e4af914bc2d"
  },
  "name": "Mehsana Police Station",
  "area": "Mehsana",
  "district": "Mehsana",
  "state": "Gujarat",
  "pincode": "Mehsana",
  "latitude": 23.6010033,
  "longitude": 72.38075001
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc2e"
  },
  "name": "Gadvi Saheb Police Office",
  "area": "Ahmedabad",
  "district": "382475",
  "state": "Gujarat",
  "pincode": "382475",
  "latitude": 23.084068,
  "longitude": 72.616978
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc2f"
  },
  "name": "Ladies Police Station",
  "area": "Ahmedabad",
  "district": "380001",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.024329,
  "longitude": 72.583056
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc30"
  },
  "name": "Hadia Police Chowki",
  "area": "Ahmedabad",
  "district": "380001",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.0172951,
  "longitude": 72.5943595
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc31"
  },
  "name": "Joint Interrogation Centre",
  "area": "Bhuj 370001",
  "district": "Bhuj 370001",
  "state": "Gujarat",
  "pincode": "Bhuj 370001",
  "latitude": 23.226552,
  "longitude": 69.666023
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc32"
  },
  "name": "Aslali Police Line",
  "area": "Ahmedabad",
  "district": "382427",
  "state": "Gujarat",
  "pincode": "382427",
  "latitude": 22.920565,
  "longitude": 72.594044
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc33"
  },
  "name": "Sola High Court Police Station",
  "area": "Near Gujarat High Court",
  "district": "Highway",
  "state": "Gujarat",
  "pincode": "382481",
  "latitude": 23.08745,
  "longitude": 72.529653
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc34"
  },
  "name": "Police Station-Vatva",
  "area": "Vatva Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "382440",
  "latitude": 22.95788,
  "longitude": 72.61209
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc35"
  },
  "name": "Police Station-Special Operation Group",
  "area": "Juhapura Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380055",
  "latitude": 22.99376,
  "longitude": 72.52741
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc36"
  },
  "name": "Kadana Out Post Police Station",
  "area": "Santrampur",
  "district": "389250",
  "state": "Gujarat",
  "pincode": "389250",
  "latitude": 23.284609,
  "longitude": 73.838277
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc37"
  },
  "name": "Office of Police Commissioner",
  "area": "Balvantrai Mehta Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380004",
  "latitude": 23.0497,
  "longitude": 72.58967
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc38"
  },
  "name": "Bagsara Police Station",
  "area": "SH-30",
  "district": "365440",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.48144,
  "longitude": 70.95075
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc39"
  },
  "name": "Kathvada Police Station",
  "area": "Bhuvaladi Gram Road",
  "district": "Kathwada",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02563,
  "longitude": 72.69194
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc3a"
  },
  "name": "Bhayavadar Police Station",
  "area": "Bhayavadar Railway Station",
  "district": "Bhayavadar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.85019,
  "longitude": 70.23709
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc3b"
  },
  "name": "Kovaya Police Station",
  "area": "Rajula 365560",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.91686,
  "longitude": 71.45537
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc3c"
  },
  "name": "Ditwas Police Station",
  "area": "Ditwas Road",
  "district": "Village",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.41895,
  "longitude": 73.75336
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc3d"
  },
  "name": "Gajrawadi Police Chowki",
  "area": "Nandghar Anganwadi Kendra No X",
  "district": "Gajrawadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29509,
  "longitude": 73.21603
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc3e"
  },
  "name": "Vadinar Marin Police Station",
  "area": "SH6C",
  "district": "361010",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.39847,
  "longitude": 69.71705
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc3f"
  },
  "name": "Vasda Police Station",
  "area": "SH708",
  "district": "Town",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.76209,
  "longitude": 73.36211
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc40"
  },
  "name": "Radhanpur Circle Police Chowki",
  "area": "Gujrat Sh41",
  "district": "Mehsana",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.60572,
  "longitude": 72.38164
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc41"
  },
  "name": "Vadava Police Chowki",
  "area": "Vadava Road",
  "district": "Darbargadh",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.77435,
  "longitude": 72.14012
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc42"
  },
  "name": "Tirupati Nagar Police Station",
  "area": "150 Feet Ring Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29743,
  "longitude": 70.76929
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc43"
  },
  "name": "Gawara Police Station",
  "area": "Jawahar Road",
  "district": "Lake",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.31668,
  "longitude": 72.62386
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc44"
  },
  "name": "Nageshree Police Station",
  "area": "NH-51",
  "district": "364265",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.92883,
  "longitude": 71.34568
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc45"
  },
  "name": "Netrang Police Station",
  "area": "SH-13",
  "district": "Borkhadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.63811,
  "longitude": 73.36558
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc46"
  },
  "name": "Tankara Police Station",
  "area": "SH-22",
  "district": "363650",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.65662,
  "longitude": 70.74641
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc47"
  },
  "name": "Rander Police Station",
  "area": "Causeway Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.21344,
  "longitude": 72.79688
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc48"
  },
  "name": "Maan Darwaja Police Station",
  "area": "Ring Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.18464,
  "longitude": 72.83615
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc49"
  },
  "name": "Police Chowki",
  "area": "Una Diu Road",
  "district": "Beach",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.73936,
  "longitude": 71.00612
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc4a"
  },
  "name": "City Police Station Vadodara",
  "area": "Panigate Road",
  "district": "Syedwada",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.3003,
  "longitude": 73.21334
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc4b"
  },
  "name": "Zoz Pilice Station",
  "area": "Khuntaliya Road",
  "district": "Bus",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.44459,
  "longitude": 73.96245
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc4c"
  },
  "name": "Karnali Out Post",
  "area": "Karnali Road",
  "district": "Karnali",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.98187,
  "longitude": 73.47257
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc4d"
  },
  "name": "Modhera Circle Police Chowki",
  "area": "Hari Nagar",
  "district": "384002",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.59157,
  "longitude": 72.37864
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc4e"
  },
  "name": "SOG Vadodara City Police",
  "area": "Vasna Tandalja Road",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.28884,
  "longitude": 73.15471
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc4f"
  },
  "name": "Karali Police Station",
  "area": "Sherpura Road",
  "district": "Sherpura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.19222,
  "longitude": 73.84927
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc50"
  },
  "name": "Karali Police Station",
  "area": "SH-157",
  "district": "Pavi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.20515,
  "longitude": 73.84647
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc51"
  },
  "name": "DSP Office",
  "area": "Agriculture University Road",
  "district": "Mangalpura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.54314,
  "longitude": 72.96093
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc52"
  },
  "name": "DSP Office",
  "area": "Pandit Dindyal Upadhyay Marg",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.0078,
  "longitude": 72.60586
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc53"
  },
  "name": "DSP Office",
  "area": "Gali Road",
  "district": "Water",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.83793,
  "longitude": 74.25804
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc54"
  },
  "name": "Police Training Senter",
  "area": "NH-51",
  "district": "362725",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.81472,
  "longitude": 70.69034
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc55"
  },
  "name": "Baroda Railway Police Station",
  "area": "Farmajee Road",
  "district": "Alkapuri",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30991,
  "longitude": 73.18014
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc56"
  },
  "name": "Civil Lines Police Station",
  "area": "Civil Hospital Road",
  "district": "Asarwa",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.04889,
  "longitude": 72.60814
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc57"
  },
  "name": "Office of The Superintendent Police",
  "area": "Dafnala Road",
  "district": "Vidyalaya",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.06132,
  "longitude": 72.59763
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc58"
  },
  "name": "Railway Police Station",
  "area": "Station Road",
  "district": "Railway",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.17506,
  "longitude": 72.43149
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc59"
  },
  "name": "Hatadiya Chowki",
  "area": "Kheralu 384325",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.88359,
  "longitude": 72.61587
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc5a"
  },
  "name": "Traffic Police Shanti Nagar",
  "area": "Indira Nagar Road",
  "district": "387001",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.6908,
  "longitude": 72.86197
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc5b"
  },
  "name": "Police Up Adhikshak Office",
  "area": "Ambaji Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.60127,
  "longitude": 72.96017
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc5c"
  },
  "name": "Manshrovar Police Chowki",
  "area": "Mansarovar Road",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.18406,
  "longitude": 72.43324
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc5d"
  },
  "name": "Zadeshwar Police Chowki",
  "area": "NH-48",
  "district": "Zadeshwar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.72313,
  "longitude": 73.03681
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc5e"
  },
  "name": "Ambaji Police Station",
  "area": "SH-9",
  "district": "Ambaji",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.33078,
  "longitude": 72.85154
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc5f"
  },
  "name": "Police Head Office Palitana",
  "area": "Court Road",
  "district": "Court",
  "state": "Gujarat",
  "pincode": "364270",
  "latitude": 21.52903,
  "longitude": 71.83
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc60"
  },
  "name": "Ranchhodray Police Chowki",
  "area": "Station Road",
  "district": "388450",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.47693,
  "longitude": 72.80363
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc61"
  },
  "name": "Paldi Police Chowki",
  "area": "Bhagtacharya Road",
  "district": "Kocharab",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.01326,
  "longitude": 72.5675
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc62"
  },
  "name": "Umreth Police Station",
  "area": "Umreth Main Road",
  "district": "388220",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.70557,
  "longitude": 73.11715
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc63"
  },
  "name": "Khadayata Chhatralay Police Chowki",
  "area": "Kadiyavada Road",
  "district": "Clinic",
  "state": "Gujarat",
  "pincode": "383315",
  "latitude": 23.46254,
  "longitude": 73.29549
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc64"
  },
  "name": "Kariya Brothers",
  "area": "Waniyavad School Road",
  "district": "Dhatia",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.2505,
  "longitude": 69.67204
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc65"
  },
  "name": "Amrapali Police Station",
  "area": "Raiya Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29893,
  "longitude": 70.78325
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc66"
  },
  "name": "Station Raod Police Station",
  "area": "Station Road",
  "district": "Wadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.7304,
  "longitude": 70.4514
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc67"
  },
  "name": "Station Raod Police Station",
  "area": "Station Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.7282,
  "longitude": 70.4465
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc68"
  },
  "name": "Shehera Police Station",
  "area": "Shehera Road",
  "district": "389210",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.94764,
  "longitude": 73.63296
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc69"
  },
  "name": "Sulun Darwada Police Chowki",
  "area": "Doctor Bhimrao Ambedkar Road",
  "district": "Nadiad",
  "state": "Gujarat",
  "pincode": "387002",
  "latitude": 22.69581,
  "longitude": 72.8704
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc6a"
  },
  "name": "Police Station Modasa",
  "area": "Deep Road",
  "district": "Bank",
  "state": "Gujarat",
  "pincode": "383315",
  "latitude": 23.46501,
  "longitude": 73.29654
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc6b"
  },
  "name": "Chandkheda Police Station",
  "area": "IOC Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.11507,
  "longitude": 72.58272
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc6c"
  },
  "name": "Ratanpura Police Station",
  "area": "NH-48",
  "district": "383251",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.75326,
  "longitude": 73.44002
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc6d"
  },
  "name": "Ghod Dod Road Police Chowki",
  "area": "Ghod Dhod Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.17574,
  "longitude": 72.81014
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc6e"
  },
  "name": "Vasna Police Chowki Vishala",
  "area": "Vishala Road",
  "district": "School",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.99921,
  "longitude": 72.5456
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc6f"
  },
  "name": "Police Station Desar",
  "area": "Desar Road",
  "district": "Desar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.71735,
  "longitude": 73.29049
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc70"
  },
  "name": "Petlad Police Station",
  "area": "Station Road",
  "district": "388450",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.48214,
  "longitude": 72.80154
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc71"
  },
  "name": "Petlad Town Police Station",
  "area": "Sh140 Aanand Road",
  "district": "388450",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.48117,
  "longitude": 72.80198
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc72"
  },
  "name": "Dakor Police Chowki",
  "area": "Kapadvanj Dakor Road",
  "district": "388225",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.77163,
  "longitude": 73.15281
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc73"
  },
  "name": "Dakor Police Station",
  "area": "Dakor Market",
  "district": "Mandir",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.7515,
  "longitude": 73.15225
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc74"
  },
  "name": "Dakor Road Police Choki Shree Ram Nagar",
  "area": "Ahmedabad Road",
  "district": "Railway",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.78456,
  "longitude": 73.60713
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc75"
  },
  "name": "Sojitra Police Station",
  "area": "Sojitra Road",
  "district": "Sojitra",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.54333,
  "longitude": 72.72065
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc76"
  },
  "name": "Kambola Out Post Police Station",
  "area": "Savli Halol Road",
  "district": "Temple",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.53515,
  "longitude": 73.37945
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc77"
  },
  "name": "Thasra Police Station",
  "area": "Ashapuri",
  "district": "Sevaliya",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.79631,
  "longitude": 73.2131
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc78"
  },
  "name": "Police Station Sarangpur",
  "area": "SH-64",
  "district": "Roshni",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.63549,
  "longitude": 73.03633
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc79"
  },
  "name": "Sarangpur Police Station",
  "area": "Sarangpur Darwaja Road",
  "district": "Babasaheb",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02258,
  "longitude": 72.59798
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc7a"
  },
  "name": "Kalol Police Station",
  "area": "Sarkhej Gandhinagar Highway",
  "district": "Adalaj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.1717,
  "longitude": 72.57558
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc7b"
  },
  "name": "Police Station, Kalol",
  "area": "Highway Market",
  "district": "Halol",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.60593,
  "longitude": 73.45945
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc7c"
  },
  "name": "Kalol Police Station",
  "area": "Laxmi Nagar",
  "district": "382721",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.23596,
  "longitude": 72.49555
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc7d"
  },
  "name": "Police Adhikshak Kachery",
  "area": "Diwan Chowk",
  "district": "Kadiwad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.52069,
  "longitude": 70.46501
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc7e"
  },
  "name": "Nayab Police Madadnich Kachery",
  "area": "Sector 30 Road",
  "district": "Gandhinagar",
  "state": "Gujarat",
  "pincode": "382030",
  "latitude": 23.23958,
  "longitude": 72.67314
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc7f"
  },
  "name": "Department Police Officers Shree Kachery",
  "area": "Paliyad Road",
  "district": "Ranpur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.1734,
  "longitude": 71.6612
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc80"
  },
  "name": "Adalaj Police Station",
  "area": "Sarkhej Gandhinagar Highway",
  "district": "Adalaj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.16916,
  "longitude": 72.57241
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc81"
  },
  "name": "Udhna Magdalla Police Chowki",
  "area": "Udhana Magdalla Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.16865,
  "longitude": 72.82175
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc82"
  },
  "name": "Harni Police Station",
  "area": "Airport Road",
  "district": "Hospital",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.33993,
  "longitude": 73.22054
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc83"
  },
  "name": "Harni Police Chowki",
  "area": "Swarnim Gujarat Ring Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390002",
  "latitude": 22.32539,
  "longitude": 73.19617
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc84"
  },
  "name": "Amdavadi Bazaar Police Station",
  "area": "Junaraopura",
  "district": "Nadiad",
  "state": "Gujarat",
  "pincode": "387001",
  "latitude": 22.69658,
  "longitude": 72.86352
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc85"
  },
  "name": "Police Station Kathor",
  "area": "Sh167 Surat Road",
  "district": "Kathor",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.29102,
  "longitude": 72.93647
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc86"
  },
  "name": "Police Station-Abdasa",
  "area": "Near Nh8a",
  "district": "Rural",
  "state": "Gujarat",
  "pincode": "370511",
  "latitude": 23.4153,
  "longitude": 68.6945
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc87"
  },
  "name": "Anil Starch Police Chowki",
  "area": "Anil Starch Road",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.0416,
  "longitude": 72.62452
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc88"
  },
  "name": "Isanpur Police Station",
  "area": "Late Ramlal Rupalal Marg",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380043",
  "latitude": 22.99298,
  "longitude": 72.59632
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc89"
  },
  "name": "Khalikpur Police Chowki",
  "area": "SH-5",
  "district": "383315",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.4539,
  "longitude": 73.31556
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc8a"
  },
  "name": "Dhuva Police Chowki",
  "area": "Matel Road",
  "district": "385310",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.71643,
  "longitude": 70.9386
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc8b"
  },
  "name": "Karanj Police Station",
  "area": "Gandhi Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.02447,
  "longitude": 72.58197
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc8c"
  },
  "name": "Police Station Karanj",
  "area": "SH-65",
  "district": "Karanj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.37109,
  "longitude": 72.99376
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc8d"
  },
  "name": "Moti Bazzar Police Station",
  "area": "City School Road",
  "district": "Mata",
  "state": "Gujarat",
  "pincode": "385001",
  "latitude": 24.17229,
  "longitude": 72.44038
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc8e"
  },
  "name": "Mandavi Police Station",
  "area": "NH-41",
  "district": "370465",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.83756,
  "longitude": 69.342
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc8f"
  },
  "name": "Arban Police Station",
  "area": "Station Road",
  "district": "Circle",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.59646,
  "longitude": 72.96717
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc90"
  },
  "name": "Jamnagar Police Station",
  "area": "Valkeshwari Park Colony",
  "district": "Nagri",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.47537,
  "longitude": 70.06552
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc91"
  },
  "name": "Shanti Nagar Police Station",
  "area": "Gariyadhar Road",
  "district": "364001",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.54148,
  "longitude": 71.57867
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc92"
  },
  "name": "Silver Police Station",
  "area": "Vastral Road",
  "district": "Gomtipur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.01049,
  "longitude": 72.60929
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc93"
  },
  "name": "Gramin Police Station",
  "area": "Ambaji Bypass Road",
  "district": "Village",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.62061,
  "longitude": 72.94255
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc94"
  },
  "name": "Dehamame Gaon Police Chowki",
  "area": "SH-59",
  "district": "383330",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.15688,
  "longitude": 73.21643
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc95"
  },
  "name": "PSI Wireless Workshop",
  "area": "Sindhi Society Road",
  "district": "Water",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.83798,
  "longitude": 74.25928
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc96"
  },
  "name": "Dahod Police Control Room",
  "area": "Gali Road",
  "district": "Water",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.83775,
  "longitude": 74.25817
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc97"
  },
  "name": "Police Station Marin Police Station",
  "area": "Hazarat Bilal Mosque",
  "district": "Ghogha",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.69166,
  "longitude": 72.27718
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc98"
  },
  "name": "Police Heardquarter",
  "area": "Palanpur Abu Highway",
  "district": "Gurukul",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.19333,
  "longitude": 72.43694
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc99"
  },
  "name": "Laxmipura Police Station",
  "area": "Badiyadev Maharaj Mandir",
  "district": "Laxmipura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.32757,
  "longitude": 73.13997
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc9a"
  },
  "name": "Halwad Police Station",
  "area": "Halvad 363330",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.01567,
  "longitude": 71.18624
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc9b"
  },
  "name": "Police Sub Inspector Kacheri",
  "area": "Tower Road",
  "district": "Bazar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.19443,
  "longitude": 73.89467
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc9c"
  },
  "name": "Police Head Quarter Nana Mava",
  "area": "Nana Mava Road",
  "district": "Mava",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30774,
  "longitude": 70.79158
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc9d"
  },
  "name": "Police Station Krishna Park Society",
  "area": "Krishna Park Society",
  "district": "Lonawala",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.13112,
  "longitude": 73.60496
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc9e"
  },
  "name": "Sadbhavana Nagar Police Chowki",
  "area": "Vatva Railway Station Road",
  "district": "Prasad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.96116,
  "longitude": 72.6227
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bc9f"
  },
  "name": "Inspector General of Police Surat Rang",
  "area": "Dumas Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.1805,
  "longitude": 72.80074
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bca0"
  },
  "name": "Jilla Police Bhavan",
  "area": "Dumas Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.18108,
  "longitude": 72.80131
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bca1"
  },
  "name": "Naya Police Adhiksham",
  "area": "Airport Road",
  "district": "Prastha",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.64571,
  "longitude": 69.65693
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bca2"
  },
  "name": "Guvnl Police Station",
  "area": "NH-8",
  "district": "Vihar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.58091,
  "longitude": 72.95978
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bca3"
  },
  "name": "Bambhakhana Police Station",
  "area": "Idgah Road",
  "district": "Church",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.68911,
  "longitude": 72.97103
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bca4"
  },
  "name": "Police Chowki-Dwarka",
  "area": "Sh06 Jamnagar Road",
  "district": "Dwarka",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.24394,
  "longitude": 68.96492
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bca5"
  },
  "name": "Motisa Chowk Police Chowki",
  "area": "Loteshvar Mahadev Temple",
  "district": "Part",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.84386,
  "longitude": 72.11214
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bca6"
  },
  "name": "Ekta Nagar Police Chowki",
  "area": "Ajwa To Waghodia Ring Road",
  "district": "Hadees",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.3113,
  "longitude": 73.24889
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bca7"
  },
  "name": "Bijay Beat Traffic Police",
  "area": "120 Feet Ring Road",
  "district": "University",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.03865,
  "longitude": 72.54892
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bca8"
  },
  "name": "Police Station Vayara",
  "area": "Tapi Road",
  "district": "Vayara",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.10965,
  "longitude": 73.38707
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bca9"
  },
  "name": "Vyara Police Chowki",
  "area": "Vyara",
  "district": "394650",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.10697,
  "longitude": 73.39282
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcaa"
  },
  "name": "Jila Traffic Police",
  "area": "Surat Bardoli Road",
  "district": "Township",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.11538,
  "longitude": 73.10836
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcab"
  },
  "name": "Police Station Sector 7",
  "area": "Sector Vii Bus Stand",
  "district": "7B",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.21155,
  "longitude": 72.63965
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcac"
  },
  "name": "Police Station Mindhola",
  "area": "Mumbai Road",
  "district": "Vejalpor",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.99819,
  "longitude": 72.97063
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcad"
  },
  "name": "Bhana Railway Suraksha Bal",
  "area": "Aurobindo Ghosh Road",
  "district": "Alkapuri",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.32122,
  "longitude": 73.17708
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcae"
  },
  "name": "Police Station N C C",
  "area": "Yusufshah Bhavnashah Road",
  "district": "Madhapara",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.25657,
  "longitude": 69.67791
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcaf"
  },
  "name": "Vitthal Park Traffic Police Center",
  "area": "R C Technical Institute Ahmedabad",
  "district": "Sola",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.08196,
  "longitude": 72.52894
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcb0"
  },
  "name": "Kutiyana Police Chowki",
  "area": "Bus Stand Road",
  "district": "362650",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.62659,
  "longitude": 69.98134
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcb1"
  },
  "name": "Jawahar Nagar Police Chowki",
  "area": "Court Road",
  "district": "387001",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.70892,
  "longitude": 72.86094
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcb2"
  },
  "name": "Kadana Out Post Police Station",
  "area": "SH-2A",
  "district": "389250",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.28447,
  "longitude": 73.83838
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcb3"
  },
  "name": "Police Station Sector-24",
  "area": "Sector-24",
  "district": "24",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.2433,
  "longitude": 72.6427
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcb4"
  },
  "name": "Koyali Police Chowki",
  "area": "Adarsh Kumar Shala Koyali",
  "district": "Koyali",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.36213,
  "longitude": 73.11333
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcb5"
  },
  "name": "Police Station Mani Nagar",
  "area": "Khuli Jail Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.60756,
  "longitude": 71.21192
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcb6"
  },
  "name": "Gujarat Rajya Police Awas Nigam Ltd",
  "area": "Amul Dairy Road",
  "district": "Ganj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.54973,
  "longitude": 72.96839
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcb7"
  },
  "name": "Cangodar Police Chowki",
  "area": "Sarkhej Ahmedabad Road",
  "district": "Sanathal",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.96222,
  "longitude": 72.47571
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcb8"
  },
  "name": "Singrawa Police Station",
  "area": "Odhav Singarwa Road",
  "district": "Kathwada",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02525,
  "longitude": 72.69015
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcb9"
  },
  "name": "Chandkheda Police Chowki",
  "area": "132 Feet Road",
  "district": "Chandkheda",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.12993,
  "longitude": 72.58483
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcba"
  },
  "name": "Dholka Rural Police Station",
  "area": "SH-74",
  "district": "382225",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.72043,
  "longitude": 72.46219
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcbb"
  },
  "name": "Mathura Police Chowki",
  "area": "SH-16",
  "district": "382225",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.7171,
  "longitude": 72.46131
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcbc"
  },
  "name": "Sola Police Chowki",
  "area": "Science City Road",
  "district": "Thaltej",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.06966,
  "longitude": 72.52264
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcbd"
  },
  "name": "Superintendent of Police Navsari",
  "area": "Lunsikui Road",
  "district": "Bus",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.94776,
  "longitude": 72.93787
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcbe"
  },
  "name": "Office of Commissioner Of Police Anandpura",
  "area": "Jail Road",
  "district": "Anandpur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30133,
  "longitude": 73.19305
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcbf"
  },
  "name": "Police Bhavan",
  "area": "Jail Road",
  "district": "Anandpur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30155,
  "longitude": 73.19334
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcc0"
  },
  "name": "Tilkwada Police Station",
  "area": "Tilakwada Road",
  "district": "Tilakwada",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.95047,
  "longitude": 73.58983
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcc1"
  },
  "name": "Bahadarpura Outpost",
  "area": "Bahadurpur Road",
  "district": "Bahadurpur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.17449,
  "longitude": 73.56081
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcc2"
  },
  "name": "Santosh Nagar Police Station",
  "area": "Baherampura Road",
  "district": "Calicomill",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.99892,
  "longitude": 72.5714
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcc3"
  },
  "name": "Dasa Police Station",
  "area": "Bhachau 364730",
  "district": "Bhachau 364730",
  "state": "Gujarat",
  "pincode": "Bhachau 364730",
  "latitude": 21.806118,
  "longitude": 71.514487
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcc4"
  },
  "name": "Fatehpura Police Station",
  "area": "Santrampur",
  "district": "389172",
  "state": "Gujarat",
  "pincode": "389172",
  "latitude": 23.25927,
  "longitude": 74.039353
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcc5"
  },
  "name": "Sukhsar Police Station",
  "area": "Santrampur",
  "district": "389190",
  "state": "Gujarat",
  "pincode": "389190",
  "latitude": 23.149411,
  "longitude": 74.026474
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcc6"
  },
  "name": "Police Station-Dhoraji",
  "area": "Dhoraji 360410",
  "district": "Dhoraji 360410",
  "state": "Gujarat",
  "pincode": "Dhoraji 360410",
  "latitude": 21.74057,
  "longitude": 70.4533
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcc7"
  },
  "name": "Police Station-Ganj Khana",
  "area": "Vadodara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.29945,
  "longitude": 73.21851
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcc8"
  },
  "name": "Police Station-Balagam",
  "area": "Keshod 362220",
  "district": "Keshod 362220",
  "state": "Gujarat",
  "pincode": "Keshod 362220",
  "latitude": 21.368,
  "longitude": 70.09699
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcc9"
  },
  "name": "Police Station-Ranapur",
  "area": "SH-39",
  "district": "457993",
  "state": "Gujarat",
  "pincode": "Ranapur 457993",
  "latitude": 22.64879347,
  "longitude": 74.5194378
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcca"
  },
  "name": "Ataldara Police Chowki",
  "area": "Old Padre Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390012",
  "latitude": 22.275553,
  "longitude": 73.155344
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bccb"
  },
  "name": "Police Station Limbdi",
  "area": "Limbdi 363421",
  "district": "Limbdi 363421",
  "state": "Gujarat",
  "pincode": "Limbdi 363421",
  "latitude": 22.56815,
  "longitude": 71.81475
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bccc"
  },
  "name": "Police Station-Rajgarh",
  "area": "NH-59",
  "district": "454116",
  "state": "Gujarat",
  "pincode": "Sardarpur 454116",
  "latitude": 22.67234,
  "longitude": 74.94192
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bccd"
  },
  "name": "Police Station Bhayavadar",
  "area": "Upleta 360450",
  "district": "Upleta 360450",
  "state": "Gujarat",
  "pincode": "Upleta 360450",
  "latitude": 21.85061,
  "longitude": 70.23358
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcce"
  },
  "name": "Police Station-Kalej",
  "area": "SH-3",
  "district": "387120",
  "state": "Gujarat",
  "pincode": "Mahemdavad 387120",
  "latitude": 22.8999753,
  "longitude": 72.716796
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bccf"
  },
  "name": "Police Station Taluka",
  "area": "Police Line",
  "district": "360370",
  "state": "Gujarat",
  "pincode": "Jetpur 360370",
  "latitude": 21.752367,
  "longitude": 70.616613
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcd0"
  },
  "name": "Ghatapraba Police Station",
  "area": "Ghataprabha",
  "district": "591306",
  "state": "Gujarat",
  "pincode": "591306",
  "latitude": 16.23638,
  "longitude": 74.76549
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcd1"
  },
  "name": "panigate police station,vadodara.",
  "area": "Panigate Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390019",
  "latitude": 22.2971816,
  "longitude": 73.2154968
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcd2"
  },
  "name": "Police Station-City",
  "area": "Panigate Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390017",
  "latitude": 22.30019,
  "longitude": 73.21351
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcd3"
  },
  "name": "Vasad Police Station",
  "area": "Anand",
  "district": "388306",
  "state": "Gujarat",
  "pincode": "388306",
  "latitude": 22.4529872,
  "longitude": 73.062465
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcd4"
  },
  "name": "Police Station-Fatepura",
  "area": "Santrampur",
  "district": "389172",
  "state": "Gujarat",
  "pincode": "389172",
  "latitude": 23.2567,
  "longitude": 74.0387
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcd5"
  },
  "name": "Law Garden Police Station",
  "area": "Netaji Road",
  "district": "Ellisbridge",
  "state": "Gujarat",
  "pincode": "380006",
  "latitude": 23.02735,
  "longitude": 72.561367
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcd6"
  },
  "name": "Ahmedabad City Police - Vejalpur area",
  "area": "Vejalpure Police Station",
  "district": "A.P.M.C",
  "state": "Gujarat",
  "pincode": "380055",
  "latitude": 22.99656,
  "longitude": 72.53725
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcd7"
  },
  "name": "Police Station-Joshipura",
  "area": "Junagadh",
  "district": "Junagadh",
  "state": "Gujarat",
  "pincode": "Junagadh",
  "latitude": 21.52971,
  "longitude": 70.45562
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcd8"
  },
  "name": "GG Hospital Police Chowki",
  "area": "Shri Mp Shah Medical College",
  "district": "Chowk",
  "state": "Gujarat",
  "pincode": "Jamnagar 361008",
  "latitude": 22.478587,
  "longitude": 70.06317
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcd9"
  },
  "name": "Police Station-Bachao",
  "area": "Service Road",
  "district": "370140",
  "state": "Gujarat",
  "pincode": "Bhachau 370140",
  "latitude": 23.2907,
  "longitude": 70.34596
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcda"
  },
  "name": "Police Station-Ghondal",
  "area": "SH-122",
  "district": "Gondal",
  "state": "Gujarat",
  "pincode": "360311",
  "latitude": 21.9721699,
  "longitude": 70.80795
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcdb"
  },
  "name": "Sojitra Police Station",
  "area": "Railway Station Road",
  "district": "Sojitra",
  "state": "Gujarat",
  "pincode": "387240",
  "latitude": 22.543405,
  "longitude": 72.720464
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcdc"
  },
  "name": "Savli Police Station",
  "area": "Savli",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.5560468,
  "longitude": 73.2209885
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcdd"
  },
  "name": "savli Police Station",
  "area": "SH-150",
  "district": "Savli",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.53385,
  "longitude": 73.38114
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcde"
  },
  "name": "Police Station Meghani Nagar",
  "area": "Meghani Nagar Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380016",
  "latitude": 23.0579,
  "longitude": 72.61778
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcdf"
  },
  "name": "Police Station-Meghani Nagar",
  "area": "Meghani Nagar Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380016",
  "latitude": 23.05785,
  "longitude": 72.61771
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bce0"
  },
  "name": "Police Commissioner Katchery",
  "area": "Shahibag",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380004",
  "latitude": 23.049915,
  "longitude": 72.589007
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bce1"
  },
  "name": "Shahibaugh, Ahmedabad",
  "area": "Hhj",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.0746479331,
  "longitude": 72.6615312414
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bce2"
  },
  "name": "police station - gandhi gram",
  "area": "Service Road",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360007",
  "latitude": 22.2974,
  "longitude": 70.76934
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bce3"
  },
  "name": "Police Station-Aslali",
  "area": "Ahmedabad",
  "district": "382427",
  "state": "Gujarat",
  "pincode": "382427",
  "latitude": 22.9143806,
  "longitude": 72.593901
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bce4"
  },
  "name": "Aslali Police Station",
  "area": "Ahmedabad",
  "district": "382427",
  "state": "Gujarat",
  "pincode": "382427",
  "latitude": 22.919236,
  "longitude": 72.594629
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bce5"
  },
  "name": "Police Station Mandavi",
  "area": "Moti Sag Market Road",
  "district": "362001",
  "state": "Gujarat",
  "pincode": "Junagadh 362001",
  "latitude": 21.52235,
  "longitude": 70.46425
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bce6"
  },
  "name": "Thorala Police Station",
  "area": "Bhavnagar Road",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360003",
  "latitude": 22.27817,
  "longitude": 70.836444
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bce7"
  },
  "name": "Police Station-Vadaj",
  "area": "Ahmedabad",
  "district": "380013",
  "state": "Gujarat",
  "pincode": "380013",
  "latitude": 23.06326,
  "longitude": 72.56628
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bce8"
  },
  "name": "Varacha Police Station",
  "area": "Surat",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.2043572,
  "longitude": 72.8441316
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bce9"
  },
  "name": "Saraspur Police Chowki",
  "area": "Bapu Nagar Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380018",
  "latitude": 23.031169,
  "longitude": 72.610788
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcea"
  },
  "name": "Kalupur Police Chowki",
  "area": "Ahmedabad",
  "district": "380004",
  "state": "Gujarat",
  "pincode": "380004",
  "latitude": 23.03084,
  "longitude": 72.59806
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bceb"
  },
  "name": "Tower Road, Rajula City",
  "area": "Rajula",
  "district": "Rajula",
  "state": "Gujarat",
  "pincode": "Rajula",
  "latitude": 21.0381493,
  "longitude": 71.4435087
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcec"
  },
  "name": "Naranpura Police Station",
  "area": "Adarshnagar Housing Flat",
  "district": "Char",
  "state": "Gujarat",
  "pincode": "380013",
  "latitude": 23.06348,
  "longitude": 72.566176
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bced"
  },
  "name": "Ahmedabad Police Headquarter",
  "area": "Makbara Police Headquarter",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380015",
  "latitude": 23.0333,
  "longitude": 72.6167
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcee"
  },
  "name": "Shankheshwar Police Station",
  "area": "Shankheshwar",
  "district": "Sami",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.5017241,
  "longitude": 71.784747
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcef"
  },
  "name": "Prantij Police Station",
  "area": "Prantij",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.4439891,
  "longitude": 72.8539824
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcf0"
  },
  "name": "Police Station Prantij",
  "area": "Prantij",
  "district": "383205",
  "state": "Gujarat",
  "pincode": "383205",
  "latitude": 23.443941,
  "longitude": 72.854196
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcf1"
  },
  "name": "Ranavav Police Chowki",
  "area": "New Bus Stand",
  "district": "360550",
  "state": "Gujarat",
  "pincode": "Ranavav 360550",
  "latitude": 21.682322,
  "longitude": 69.745353
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcf2"
  },
  "name": "Makarpura Police Station",
  "area": "Bhavance Circle",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.2707670259,
  "longitude": 73.2030523745
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcf3"
  },
  "name": "Laxmipura Police Station",
  "area": "Laxmipura",
  "district": "Shubhanpura",
  "state": "Gujarat",
  "pincode": "390003",
  "latitude": 22.327604,
  "longitude": 73.140145
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcf4"
  },
  "name": "Police Station-Chowk Bazaar",
  "area": "Begampura Sheri",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395003",
  "latitude": 21.20399,
  "longitude": 72.82741
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcf5"
  },
  "name": "Police Station-Umreth",
  "area": "SH-188",
  "district": "Anand",
  "state": "Gujarat",
  "pincode": "388205",
  "latitude": 22.63499,
  "longitude": 73.0279
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcf6"
  },
  "name": "karelibaug Police Station",
  "area": "Vadodara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.3075752258,
  "longitude": 73.2047805786
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcf7"
  },
  "name": "Borsad Police Station",
  "area": "Borsad 388540",
  "district": "Borsad 388540",
  "state": "Gujarat",
  "pincode": "Borsad 388540",
  "latitude": 22.407278,
  "longitude": 72.903313
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcf8"
  },
  "name": "Rajkot City Ladies Police Station-Race Course",
  "area": "Race Course Ring Road",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360001",
  "latitude": 22.30722,
  "longitude": 70.78954
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcf9"
  },
  "name": "New Cotton Police Chwoki-Amraiwadi",
  "area": "Ahmedabad",
  "district": "380026",
  "state": "Gujarat",
  "pincode": "380026",
  "latitude": 23.01102,
  "longitude": 72.61803
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcfa"
  },
  "name": "Valbhnager Police Station.",
  "area": "Vallabhnagar Police Station",
  "district": "387355",
  "state": "Gujarat",
  "pincode": "Nadiad 387355",
  "latitude": 22.6905987795,
  "longitude": 72.8553923927
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcfb"
  },
  "name": "RPF Police Thana",
  "area": "Gandhi Dham",
  "district": "Station",
  "state": "Gujarat",
  "pincode": "Gandhidham 370240",
  "latitude": 23.068108,
  "longitude": 70.147607
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcfc"
  },
  "name": "RPF Police Station",
  "area": "Station Road",
  "district": "396001",
  "state": "Gujarat",
  "pincode": "Valsad 396001",
  "latitude": 20.606145,
  "longitude": 72.934259
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcfd"
  },
  "name": "Vallbhipur Police Station",
  "area": "Vallabhipur",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "364310",
  "latitude": 21.891671,
  "longitude": 71.8777
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcfe"
  },
  "name": "Shree Momai Mataji Sthanak",
  "area": "GJ SH 46",
  "district": "Kukma",
  "state": "Gujarat",
  "pincode": "Bhuj 370105",
  "latitude": 23.216766,
  "longitude": 69.778662
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bcff"
  },
  "name": "Octroi Naka",
  "area": "Shyam Prasad Vasavada Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "382330",
  "latitude": 23.107024,
  "longitude": 72.671801
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd00"
  },
  "name": "Kagda Pith Police Station",
  "area": "Swami Vivekanand Marg",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380022",
  "latitude": 23.0181878524,
  "longitude": 72.5985739563
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd01"
  },
  "name": "Police Station-Kherwara",
  "area": "Santrampur",
  "district": "389235",
  "state": "Gujarat",
  "pincode": "389235",
  "latitude": 23.16271,
  "longitude": 73.73922
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd02"
  },
  "name": "Dehgam Police Station-Gandhinagar",
  "area": "SH-141",
  "district": "382305",
  "state": "Gujarat",
  "pincode": "Dehgam 382305",
  "latitude": 23.1698476,
  "longitude": 72.816312
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd03"
  },
  "name": "Police Station-Vatva Narol",
  "area": "Service Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "382440",
  "latitude": 22.96235,
  "longitude": 72.59165
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd04"
  },
  "name": "Paras Police Station",
  "area": "Katargam Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.213074,
  "longitude": 72.82803
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd05"
  },
  "name": "Police Station-Balsinor",
  "area": "NH-59",
  "district": "388255",
  "state": "Gujarat",
  "pincode": "Balasinor 388255",
  "latitude": 22.94026,
  "longitude": 73.33706
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd06"
  },
  "name": "Laherpura Police Chowki",
  "area": "MG Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390001",
  "latitude": 22.300047,
  "longitude": 73.206657
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd07"
  },
  "name": "Police Station-Dhasa",
  "area": "SH-21",
  "district": "364740",
  "state": "Gujarat",
  "pincode": "Gadhada 364740",
  "latitude": 21.78408,
  "longitude": 71.51698
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd08"
  },
  "name": "Police Station-Shikarpura",
  "area": "SH-27",
  "district": "Burhanpur",
  "state": "Gujarat",
  "pincode": "450331",
  "latitude": 21.296185,
  "longitude": 76.22223667
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd09"
  },
  "name": "Station Police Chowki Kalol",
  "area": "Railway Station Road",
  "district": "382721",
  "state": "Gujarat",
  "pincode": "Kalol 382721",
  "latitude": 23.245135,
  "longitude": 72.50157
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd0a"
  },
  "name": "Police Station-Mahuva",
  "area": "Mahuva",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 21.09226,
  "longitude": 71.76904
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd0b"
  },
  "name": "Police Station-Vapi",
  "area": "Vapi 396191",
  "district": "Vapi 396191",
  "state": "Gujarat",
  "pincode": "Vapi 396191",
  "latitude": 20.38262,
  "longitude": 72.90346
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd0c"
  },
  "name": "Surat Sachin Gidc Police Station",
  "area": "Surat",
  "district": "394230",
  "state": "Gujarat",
  "pincode": "394230",
  "latitude": 21.101607805,
  "longitude": 72.85145724
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd0d"
  },
  "name": "Mahila Police Station-Vastrapur",
  "area": "Swami Bhushivani Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380015",
  "latitude": 23.02923,
  "longitude": 72.54125
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd0e"
  },
  "name": "Raikhand Police Lines",
  "area": "Raykhad Nadi Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.01846,
  "longitude": 72.57993
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd0f"
  },
  "name": "Police Station-B Division",
  "area": "No 1 Sheri",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360001",
  "latitude": 22.29202,
  "longitude": 70.81
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd10"
  },
  "name": "Vapi Police Station",
  "area": "Custom Road",
  "district": "396195",
  "state": "Gujarat",
  "pincode": "Vapi 396195",
  "latitude": 20.379127,
  "longitude": 72.906695
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd11"
  },
  "name": "Joint Interrogation Centre",
  "area": "Bhuj 370001",
  "district": "Bhuj 370001",
  "state": "Gujarat",
  "pincode": "Bhuj 370001",
  "latitude": 33.7364465,
  "longitude": 75.1550903
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd12"
  },
  "name": "Gujarat Police Training Ground",
  "area": "Rajkot",
  "district": "360001",
  "state": "Gujarat",
  "pincode": "360001",
  "latitude": 22.321891,
  "longitude": 70.800688
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd13"
  },
  "name": "Fatepura Police Chowki",
  "area": "Vadodara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "390019",
  "latitude": 22.305614273,
  "longitude": 73.2111360113
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd14"
  },
  "name": "District Police Head Quarter Panchmahal",
  "area": "Godhra 389001",
  "district": "Godhra 389001",
  "state": "Gujarat",
  "pincode": "Godhra 389001",
  "latitude": 22.7774247258,
  "longitude": 73.6219405254
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd15"
  },
  "name": "Rakhiyal Police Station",
  "area": "Rakhial Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380023",
  "latitude": 23.0215011895,
  "longitude": 72.6227934388
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd16"
  },
  "name": "Police Station-Pansora",
  "area": "SH-188",
  "district": "Anand",
  "state": "Gujarat",
  "pincode": "388220",
  "latitude": 22.69427,
  "longitude": 73.03119
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd17"
  },
  "name": "Kothariya Police Chowki",
  "area": "Rajkot",
  "district": "360001",
  "state": "Gujarat",
  "pincode": "360001",
  "latitude": 22.296386,
  "longitude": 70.808455
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd18"
  },
  "name": "Adajan Gam Police Chowki",
  "area": "SMC Quarters",
  "district": "Mahal",
  "state": "Gujarat",
  "pincode": "395009",
  "latitude": 21.194582,
  "longitude": 72.798576
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd19"
  },
  "name": "Police Station-Thara",
  "area": "Service Road",
  "district": "Thara",
  "state": "Gujarat",
  "pincode": "385555",
  "latitude": 23.97016,
  "longitude": 71.82761
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd1a"
  },
  "name": "Police Station-Mavsari",
  "area": "Vav",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 24.6153,
  "longitude": 71.36922
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd1b"
  },
  "name": "Police Station-Kheralu",
  "area": "Kheralu 384325",
  "district": "Kheralu 384325",
  "state": "Gujarat",
  "pincode": "Kheralu 384325",
  "latitude": 23.88619,
  "longitude": 72.61848
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd1c"
  },
  "name": "Chandkheda Police Chowki",
  "area": "Circular Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "382428",
  "latitude": 23.13006,
  "longitude": 72.58513
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd1d"
  },
  "name": "Savli Circle Police Inspector Kacheri",
  "area": "Savli",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.5597751,
  "longitude": 73.2228488
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd1e"
  },
  "name": "Police Station",
  "area": "Amreli 365601",
  "district": "Amreli 365601",
  "state": "Gujarat",
  "pincode": "Amreli 365601",
  "latitude": 21.607212,
  "longitude": 71.21719
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd1f"
  },
  "name": "Police Station-Vadgam",
  "area": "Vadgam 385410",
  "district": "Vadgam 385410",
  "state": "Gujarat",
  "pincode": "Vadgam 385410",
  "latitude": 24.0831624,
  "longitude": 72.4888232
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd20"
  },
  "name": "Police Station-Vadgam",
  "area": "Vadgam 385410",
  "district": "Vadgam 385410",
  "state": "Gujarat",
  "pincode": "Vadgam 385410",
  "latitude": 24.08316,
  "longitude": 72.48884
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd21"
  },
  "name": "Sardar Police Chowky Police Station",
  "area": "SH-150",
  "district": "Baria",
  "state": "Gujarat",
  "pincode": "389380",
  "latitude": 22.70025,
  "longitude": 73.91254
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd22"
  },
  "name": "Police Station-Sanjay Nagar",
  "area": "Surat",
  "district": "395012",
  "state": "Gujarat",
  "pincode": "395012",
  "latitude": 21.16786,
  "longitude": 72.86336
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd23"
  },
  "name": "SP Office Amreli",
  "area": "Chital Road",
  "district": "365601",
  "state": "Gujarat",
  "pincode": "Amreli 365601",
  "latitude": 21.609251,
  "longitude": 71.21742
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd24"
  },
  "name": "Police Station - Sardar Nagar",
  "area": "Ambavadi",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "382475",
  "latitude": 23.08342,
  "longitude": 72.62138
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd25"
  },
  "name": "Sarangpur Police Chowki",
  "area": "Besides Girish Cold Drinks",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.022529,
  "longitude": 72.597496
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd26"
  },
  "name": "Bombay Housing Police Line",
  "area": "Rakhial Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380021",
  "latitude": 23.02121,
  "longitude": 72.60984
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd27"
  },
  "name": "Veraval Shapar Police Chowki",
  "area": "Padavala Road",
  "district": "Shapar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.15702,
  "longitude": 70.79181
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd28"
  },
  "name": "Veraval District Highway Police",
  "area": "Station Road",
  "district": "362265",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.90735,
  "longitude": 70.36556
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd29"
  },
  "name": "Police Station Halol",
  "area": "SH-5",
  "district": "Halol",
  "state": "Gujarat",
  "pincode": "389350",
  "latitude": 22.50169,
  "longitude": 73.47995
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd2a"
  },
  "name": "Halol Police Station",
  "area": "Main Bazar",
  "district": "Bazar",
  "state": "Gujarat",
  "pincode": "389350",
  "latitude": 22.5013,
  "longitude": 73.47473
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd2b"
  },
  "name": "Police Station, Ridder",
  "area": "Idar 383430",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.83756,
  "longitude": 73.00447
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd2c"
  },
  "name": "Kathlal Police Station",
  "area": "Kathlal",
  "district": "387630",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.89213,
  "longitude": 72.98423
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd2d"
  },
  "name": "Kathlal Road Police Station",
  "area": "Balasinor Market",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.94721,
  "longitude": 73.33034
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd2e"
  },
  "name": "Shahe Alam Police Station",
  "area": "Geeta Mandir Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380043",
  "latitude": 23.00098,
  "longitude": 72.58962
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd2f"
  },
  "name": "Help Desk Vallabh Vidyanagar",
  "area": "Anand Vidya Nagar Road",
  "district": "Anand",
  "state": "Gujarat",
  "pincode": "388120",
  "latitude": 22.55135,
  "longitude": 72.9368
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd30"
  },
  "name": "Kotda Police Station",
  "area": "Swami Narayan Mandir Road",
  "district": "Wadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.03147,
  "longitude": 72.59123
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd31"
  },
  "name": "Police Station, Godhra",
  "area": "Station Road",
  "district": "Baug",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.7773,
  "longitude": 73.61232
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd32"
  },
  "name": "Godhra Police Station",
  "area": "Godhra Road",
  "district": "Wad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.77575,
  "longitude": 73.6079
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd33"
  },
  "name": "Police Station Shera Godhra",
  "area": "Ranchoji Mandir Road",
  "district": "Shera",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.7742,
  "longitude": 73.6135
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd34"
  },
  "name": "Police Choki No 1 Godhra",
  "area": "Court Road",
  "district": "Panjarapole",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.77428,
  "longitude": 73.61715
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd35"
  },
  "name": "Godhra Saher B Division Police Station",
  "area": "Vhoravad Road",
  "district": "Wad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.77728,
  "longitude": 73.61198
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd36"
  },
  "name": "Police Station, Bardoli",
  "area": "Station Road",
  "district": "M",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.11698,
  "longitude": 73.11195
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd37"
  },
  "name": "Beed Chowk Police Station",
  "area": "Sri Mandvi Taluka",
  "district": "Chowk",
  "state": "Gujarat",
  "pincode": "370465",
  "latitude": 22.83126,
  "longitude": 69.35547
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd38"
  },
  "name": "Madosa Police Station",
  "area": "Pahadpur",
  "district": "383315",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.46532,
  "longitude": 73.29798
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd39"
  },
  "name": "Kheda Nadiad Traffic Police",
  "area": "Yogi Nagar Society",
  "district": "Taluka",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.70799,
  "longitude": 72.82672
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd3a"
  },
  "name": "Nadiad Town Police Station",
  "area": "Station Road",
  "district": "387001",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.69406,
  "longitude": 72.85852
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd3b"
  },
  "name": "Nadiad West Police Chowki",
  "area": "Sh149",
  "district": "Taluka",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.68787,
  "longitude": 72.83844
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd3c"
  },
  "name": "Lohana Para Police Station",
  "area": "Dhebar Road",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360001",
  "latitude": 22.29543,
  "longitude": 70.80275
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd3d"
  },
  "name": "TRC Police Station",
  "area": "Indira Gandhi Marg",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "394221",
  "latitude": 21.15684,
  "longitude": 72.8443
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd3e"
  },
  "name": "Chorwad Police Station",
  "area": "Main Chorvar Road",
  "district": "Chorwad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.03144,
  "longitude": 70.23701
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd3f"
  },
  "name": "Chorwad Police Chowki",
  "area": "Nh51",
  "district": "Railway",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.05329,
  "longitude": 70.28976
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd40"
  },
  "name": "Alipur Police Station",
  "area": "Sh 11",
  "district": "Bus",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.27509,
  "longitude": 73.7165
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd41"
  },
  "name": "Vadu Police Chowki",
  "area": "Vadu Road",
  "district": "Bank",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.21867,
  "longitude": 72.98187
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd42"
  },
  "name": "Vapi Police Station",
  "area": "Chanod",
  "district": "396195",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.36224,
  "longitude": 72.92247
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd43"
  },
  "name": "Vapi Town Police Station",
  "area": "Bal Mandir Road",
  "district": "Railway",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.37299,
  "longitude": 72.90686
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd44"
  },
  "name": "Vapi Town Police Station",
  "area": "Daman Road",
  "district": "(Pardi)",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.37903,
  "longitude": 72.9069
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd45"
  },
  "name": "Sinor Police Chowk",
  "area": "Sinor Road",
  "district": "Dabhoi",
  "state": "Gujarat",
  "pincode": "391110",
  "latitude": 22.12839,
  "longitude": 73.4118
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd46"
  },
  "name": "Sinor Police Station",
  "area": "Sinor Road",
  "district": "Junction",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.91059,
  "longitude": 73.34213
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd47"
  },
  "name": "Navapara Police Chowki",
  "area": "Bandargah Road",
  "district": "Bazar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.64363,
  "longitude": 69.59576
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd48"
  },
  "name": "Ghogha Get Police Station",
  "area": "M G Road",
  "district": "Bhavnagar",
  "state": "Gujarat",
  "pincode": "364001",
  "latitude": 21.77611,
  "longitude": 72.14555
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd49"
  },
  "name": "Ghogha Police Station",
  "area": "SH-36",
  "district": "Mahal",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.68715,
  "longitude": 72.27237
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd4a"
  },
  "name": "Ghogha Circle Police Chowki",
  "area": "Ghogha Road",
  "district": "Bhavnagar",
  "state": "Gujarat",
  "pincode": "364001",
  "latitude": 21.75962,
  "longitude": 72.15775
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd4b"
  },
  "name": "Zanda Bazar Police Chowki",
  "area": "Petlad Road",
  "district": "Petlad",
  "state": "Gujarat",
  "pincode": "388450",
  "latitude": 22.47706,
  "longitude": 72.79759
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd4c"
  },
  "name": "Vasad Police Station",
  "area": "Vasad Road",
  "district": "Vasad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.45214,
  "longitude": 73.06252
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd4d"
  },
  "name": "Jila Taleem Kendra Police",
  "area": "Central Water Filter Plant",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.83774,
  "longitude": 74.25866
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd4e"
  },
  "name": "Police Station Amreli",
  "area": "Station Road",
  "district": "Marketyard",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.60475,
  "longitude": 71.22407
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd4f"
  },
  "name": "Hardas Nagar Police Station",
  "area": "General Hospital Road",
  "district": "Rakhial",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02834,
  "longitude": 72.6248
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd50"
  },
  "name": "Police Station Bhara",
  "area": "Kunla to Babra Road",
  "district": "Jesingpara",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.59769,
  "longitude": 71.21217
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd51"
  },
  "name": "Chikhli Police Station",
  "area": "Chikhli",
  "district": "396521",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.7573,
  "longitude": 73.05506
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd52"
  },
  "name": "Police Station-Surendranagar",
  "area": "Milan Cinema Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.72231,
  "longitude": 71.64487
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd53"
  },
  "name": "Police Station-Surendranagar",
  "area": "Chamunda Road",
  "district": "363520",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.42346,
  "longitude": 71.20044
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd54"
  },
  "name": "Police Station-Surendranagar",
  "area": "Ahmedabad Rajkot Highway",
  "district": "363520",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.48849,
  "longitude": 71.30159
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd55"
  },
  "name": "Police Station-Surendranagar",
  "area": "Sh17 Rajkot Road",
  "district": "Taluka",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.71457,
  "longitude": 71.60563
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd56"
  },
  "name": "Police Station-Shihori",
  "area": "Sh130 Banaskantha Road",
  "district": "Sihori",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.04025,
  "longitude": 71.93687
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd57"
  },
  "name": "Police Station-Shihori",
  "area": "Sh130 Banaskantha Road",
  "district": "Sihori",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.04029,
  "longitude": 71.93938
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd58"
  },
  "name": "Police Station Palitana",
  "area": "Gadiyadhar Road",
  "district": "Jeshar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.52722,
  "longitude": 71.82302
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd59"
  },
  "name": "Kathvada Sayaji Police Choki",
  "area": "NH-47",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "382430",
  "latitude": 23.02318,
  "longitude": 72.69674
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd5a"
  },
  "name": "Police Chowki Unn",
  "area": "108",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "394210",
  "latitude": 21.112469,
  "longitude": 72.861463
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd5b"
  },
  "name": "Police Station-Wadi Baliya",
  "area": "Dr Champaklal Dhiyabhai Marg",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395001",
  "latitude": 21.19228,
  "longitude": 72.82967
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd5c"
  },
  "name": "Police Station-Himatnagar",
  "area": "Himatnagar",
  "district": "Himatnagar",
  "state": "Gujarat",
  "pincode": "Himatnagar",
  "latitude": 23.59997,
  "longitude": 73.20709
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd5d"
  },
  "name": "Police Station-Vadodara Taluka",
  "area": "Vadodara ( Rural )",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390019",
  "latitude": 22.3023936,
  "longitude": 73.2146931
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd5e"
  },
  "name": "Police Station-Mandali",
  "area": "SH-41 Service Road",
  "district": "382732",
  "state": "Gujarat",
  "pincode": "Mehsana 382732",
  "latitude": 23.44376,
  "longitude": 72.39375
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd5f"
  },
  "name": "Bopal Police Station",
  "area": "Bopal Police Station",
  "district": "Chittvan",
  "state": "Gujarat",
  "pincode": "380058",
  "latitude": 23.0261977,
  "longitude": 72.52359185
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd60"
  },
  "name": "Manjalpur Police Station",
  "area": "Vadodara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.2563232,
  "longitude": 73.1804655
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd61"
  },
  "name": "Marine Police Station-Pipavav",
  "area": "SH-6",
  "district": "Rajula",
  "state": "Gujarat",
  "pincode": "365555",
  "latitude": 21.01147,
  "longitude": 71.54691
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd62"
  },
  "name": "Veraval City Police Station",
  "area": "Veraval",
  "district": "Veraval",
  "state": "Gujarat",
  "pincode": "Veraval",
  "latitude": 20.909845473,
  "longitude": 70.364902686
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd63"
  },
  "name": "Sola Highcourt Police Station",
  "area": "Near Gujarat High Court",
  "district": "Highway",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.0874991223,
  "longitude": 72.5294093739
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd64"
  },
  "name": "Police Station Makarpura",
  "area": "Tagore Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390011",
  "latitude": 22.2706984,
  "longitude": 73.2032794498
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd65"
  },
  "name": "Police Station-Dayapar",
  "area": "Lakhpat",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.2275231,
  "longitude": 69.665731
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd66"
  },
  "name": "Magdalla Police Lines",
  "area": "Surat",
  "district": "394518",
  "state": "Gujarat",
  "pincode": "394518",
  "latitude": 21.144875,
  "longitude": 72.749999
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd67"
  },
  "name": "Police Station-Isanpur",
  "area": "Ahmedabad",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.98691,
  "longitude": 72.61151
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd68"
  },
  "name": "Police Station-Jasdan",
  "area": "SH-317",
  "district": "360025",
  "state": "Gujarat",
  "pincode": "Jasdan 360025",
  "latitude": 22.18352,
  "longitude": 71.09642
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd69"
  },
  "name": "Ahmedabad Police",
  "area": "Police Commissioners Office",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380004",
  "latitude": 23.0564757907,
  "longitude": 72.5863265991
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd6a"
  },
  "name": "Bechraji Police Station",
  "area": "Becharaji Road",
  "district": "Modhera",
  "state": "Gujarat",
  "pincode": "384210",
  "latitude": 23.498359,
  "longitude": 72.04473
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd6b"
  },
  "name": "Office of Commissioner of Police, Police Bhawan, Vadodara",
  "area": "Police Bhawan",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "390001",
  "latitude": 22.3017234649,
  "longitude": 73.1930218464
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd6c"
  },
  "name": "Mahila Police Station-Nagarwada",
  "area": "Vadodara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "390001",
  "latitude": 22.30479,
  "longitude": 73.19271
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd6d"
  },
  "name": "Athwaline Police Chowki",
  "area": "Opposite To Nawdi Bandar Road",
  "district": "Plaza",
  "state": "Gujarat",
  "pincode": "395009",
  "latitude": 21.186436,
  "longitude": 72.810252
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd6e"
  },
  "name": "Banba Gate Police Chowki",
  "area": "Raj Marg",
  "district": "360490",
  "state": "Gujarat",
  "pincode": "Upleta 360490",
  "latitude": 21.740734,
  "longitude": 70.28393
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd6f"
  },
  "name": "Police Chowk-M G Ratanad",
  "area": "Nadiad 387001",
  "district": "Nadiad 387001",
  "state": "Gujarat",
  "pincode": "Nadiad 387001",
  "latitude": 22.69701,
  "longitude": 72.863
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd70"
  },
  "name": "Nadiad Cant SRP Police Camp",
  "area": "Mill Road Mahuda Road",
  "district": "387001",
  "state": "Gujarat",
  "pincode": "Nadiad 387001",
  "latitude": 22.715561,
  "longitude": 72.866268
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd71"
  },
  "name": "Bordi Gate Police Chowki",
  "area": "Deepak Chowk Main Road",
  "district": "364001",
  "state": "Gujarat",
  "pincode": "Bhavnagar 364001",
  "latitude": 21.774948,
  "longitude": 72.160571
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd72"
  },
  "name": "Police Chowki Juna Vadaj",
  "area": "Near Old Wadaj",
  "district": "Bus",
  "state": "Gujarat",
  "pincode": "380013",
  "latitude": 23.054442,
  "longitude": 72.571903
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd73"
  },
  "name": "Nava Vadaj Police Stasion",
  "area": "nava vadaj",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380013",
  "latitude": 23.0631018504,
  "longitude": 72.5661204924
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd74"
  },
  "name": "Barampura Police Station",
  "area": "Narol Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.008589,
  "longitude": 72.580286
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd75"
  },
  "name": "Police Station-Sabarmati Riverfront West",
  "area": "Ahmedabad",
  "district": "380006",
  "state": "Gujarat",
  "pincode": "380006",
  "latitude": 23.0119,
  "longitude": 72.5718
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd76"
  },
  "name": "Sankeswar Police Station",
  "area": "Sankeshwar 591313",
  "district": "Sankeshwar 591313",
  "state": "Gujarat",
  "pincode": "Sankeshwar 591313",
  "latitude": 16.2543386,
  "longitude": 74.4882176
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd77"
  },
  "name": "Police Inspector Sector 3 Railway Station",
  "area": "Lambe Hanuman Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "395010",
  "latitude": 21.204224,
  "longitude": 72.840586
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd78"
  },
  "name": "Police Station-Surendar Nagar",
  "area": "SH-17",
  "district": "363001",
  "state": "Gujarat",
  "pincode": "Dudhrej 363001",
  "latitude": 22.71947,
  "longitude": 71.6283
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd79"
  },
  "name": "Police Station Bharuch",
  "area": "Maktampur",
  "district": "392012",
  "state": "Gujarat",
  "pincode": "Bharuch 392012",
  "latitude": 21.7069259267,
  "longitude": 73.008196625
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd7a"
  },
  "name": "Police Station-Santalpur",
  "area": "Service Road",
  "district": "Santalpur",
  "state": "Gujarat",
  "pincode": "385350",
  "latitude": 23.76128,
  "longitude": 71.16869
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd7b"
  },
  "name": "Olpad Court",
  "area": "Olpad",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 21.335842018,
  "longitude": 72.7430410155
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd7c"
  },
  "name": "Police Station-Odhav",
  "area": "Ahmedabad",
  "district": "382415",
  "state": "Gujarat",
  "pincode": "382415",
  "latitude": 23.02016,
  "longitude": 72.66125
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd7d"
  },
  "name": "Odhav Police Chowki",
  "area": "Ahmedabad",
  "district": "382415",
  "state": "Gujarat",
  "pincode": "382415",
  "latitude": 23.025323,
  "longitude": 72.672625
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd7e"
  },
  "name": "Sagrampura Police Chowki",
  "area": "Momnawad",
  "district": "Sagrampura",
  "state": "Gujarat",
  "pincode": "395001",
  "latitude": 21.189135,
  "longitude": 72.825169
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd7f"
  },
  "name": "Mahemabad Police Station",
  "area": "Station Road",
  "district": "387130",
  "state": "Gujarat",
  "pincode": "Mahemdavad 387130",
  "latitude": 22.820067,
  "longitude": 72.757674
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd80"
  },
  "name": "Kalidindi Police Station",
  "area": "SH-63",
  "district": "Kalidindi",
  "state": "Gujarat",
  "pincode": "521344",
  "latitude": 16.5085206,
  "longitude": 81.2968751
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd81"
  },
  "name": "Police Station-Chuda",
  "area": "Chuda",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "363410",
  "latitude": 22.48438,
  "longitude": 71.69512
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd82"
  },
  "name": "Ramnath Para Police Line",
  "area": "Ramnath Pura",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360001",
  "latitude": 22.293003,
  "longitude": 70.812775
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd83"
  },
  "name": "Police Station-Bhbara",
  "area": "Upleta 360450",
  "district": "Upleta 360450",
  "state": "Gujarat",
  "pincode": "Upleta 360450",
  "latitude": 21.85063,
  "longitude": 70.23354
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd84"
  },
  "name": "Kadodra Police Station",
  "area": "Ahmedabad Bombay Highway",
  "district": "Lakdawala",
  "state": "Gujarat",
  "pincode": "394327",
  "latitude": 21.170984,
  "longitude": 72.963081
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd85"
  },
  "name": "Vejalpur Police Station",
  "area": "Ahmedabad",
  "district": "389340",
  "state": "Gujarat",
  "pincode": "389340",
  "latitude": 22.690759,
  "longitude": 73.559128
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd86"
  },
  "name": "Vejalpur Police Station Jivraj Park",
  "area": "132 Feet Circular Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380051",
  "latitude": 23.000964,
  "longitude": 72.535253
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd87"
  },
  "name": "Vejalpur Police Station",
  "area": "Near APMC Market",
  "district": "Vishala",
  "state": "Gujarat",
  "pincode": "380055",
  "latitude": 22.996748,
  "longitude": 72.537284
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd88"
  },
  "name": "Police Inspector Udhna Darwaja",
  "area": "Ring Road",
  "district": "2",
  "state": "Gujarat",
  "pincode": "395002",
  "latitude": 21.20235,
  "longitude": 72.83957
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd89"
  },
  "name": "Puna Police Station",
  "area": "near Surat Kadodara road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395010",
  "latitude": 21.189473304,
  "longitude": 72.8720388562
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd8a"
  },
  "name": "Dindoli Police Station",
  "area": "Surat",
  "district": "394210",
  "state": "Gujarat",
  "pincode": "394210",
  "latitude": 21.157882,
  "longitude": 72.862676
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd8b"
  },
  "name": "Gandhinagar Lunchrushvat Virodhi Police Station",
  "area": "Rto Office",
  "district": "30",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.24157,
  "longitude": 72.67219
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd8c"
  },
  "name": "Mograwadi Police Station",
  "area": "Mograwadi Road",
  "district": "Sandhpor",
  "state": "Gujarat",
  "pincode": "396001",
  "latitude": 20.61242,
  "longitude": 72.93732
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd8d"
  },
  "name": "Madhupura Police Chowki",
  "area": "Madhupura Road",
  "district": "Madhupura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.25629,
  "longitude": 69.95952
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd8e"
  },
  "name": "Chalala Police Station",
  "area": "Chalala Police Station",
  "district": "Yard",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.40881,
  "longitude": 71.16435
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd8f"
  },
  "name": "Katargam Police Station",
  "area": "Katargam Main Road",
  "district": "Katargam",
  "state": "Gujarat",
  "pincode": "395004",
  "latitude": 21.22331,
  "longitude": 72.83322
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd90"
  },
  "name": "Malaviya Nagar Police Station",
  "area": "Alka Society Road 1",
  "district": "Chandreshnagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.27062,
  "longitude": 70.78894
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd91"
  },
  "name": "Gambhoi Police Station",
  "area": "Bhiloda Road",
  "district": "Himatnagar",
  "state": "Gujarat",
  "pincode": "383030",
  "latitude": 23.60214,
  "longitude": 73.09785
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd92"
  },
  "name": "Sri Abzar Chwadi Police Chowki",
  "area": "K T Shah Road",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "370465",
  "latitude": 22.831,
  "longitude": 69.35045
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd93"
  },
  "name": "Jalalpur Police Station",
  "area": "Jalal Por Road",
  "district": "Village",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.94976,
  "longitude": 72.90169
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd94"
  },
  "name": "Rupani Police Chowki",
  "area": "Sanskar Nagar Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.75929,
  "longitude": 72.152
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd95"
  },
  "name": "Hanspura Police Chowki",
  "area": "Naroda Dehgam Road",
  "district": "Kathwada",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.08873,
  "longitude": 72.68678
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd96"
  },
  "name": "Round Forest Thaanu Umarpur",
  "area": "SH-5",
  "district": "389001",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.85909,
  "longitude": 73.62665
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd97"
  },
  "name": "Morva Police Station",
  "area": "SH-63",
  "district": "389220",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.91436,
  "longitude": 73.46796
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd98"
  },
  "name": "Dandia Bazaar Police Chowki",
  "area": "Hazikhan Bazaar Road",
  "district": "Panchabatti",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.69849,
  "longitude": 72.99369
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd99"
  },
  "name": "Lalpura Check Post",
  "area": "Lalpura Road",
  "district": "Lalpura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.60565,
  "longitude": 73.17906
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd9a"
  },
  "name": "Police Station Malpur",
  "area": "Sh5 Malpur Godhra Road",
  "district": "383345",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.36425,
  "longitude": 73.46875
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd9b"
  },
  "name": "Wadali Police Station",
  "area": "NH-58",
  "district": "383235",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.94347,
  "longitude": 73.03811
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd9c"
  },
  "name": "Infocity Police Chowki",
  "area": "Pujya Ravishankar Maharaj Marg",
  "district": "2",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.19759,
  "longitude": 72.63174
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd9d"
  },
  "name": "Infocity Police Chowki",
  "area": "Infocity Service Road",
  "district": "Zero",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.19666,
  "longitude": 72.6329
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd9e"
  },
  "name": "Police Station Unjha",
  "area": "Khajuri Pur",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.8093,
  "longitude": 72.3959
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bd9f"
  },
  "name": "Manjalpur Police Station",
  "area": "Makarpura GIDC Road",
  "district": "GIDC",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.25598,
  "longitude": 73.18076
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bda0"
  },
  "name": "Jila Police Adhikari Kachhari",
  "area": "Navper",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.7692,
  "longitude": 72.1504
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bda1"
  },
  "name": "Changoder Aour Post Police Chowki",
  "area": "Changodar Road",
  "district": "Changodar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.93017,
  "longitude": 72.44798
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bda2"
  },
  "name": "Alkapuri Police Station",
  "area": "RC Dutt Road",
  "district": "Alkapuri",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.31111,
  "longitude": 73.17277
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bda3"
  },
  "name": "Police Station-Lathi",
  "area": "Police Station-Lathi",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.72833,
  "longitude": 71.39111
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bda4"
  },
  "name": "Chanasma Police Station",
  "area": "Chanasma",
  "district": "Hospital",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.71651,
  "longitude": 72.10931
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bda5"
  },
  "name": "Santrampur Police Station",
  "area": "Santrampur 389260",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.19481,
  "longitude": 73.88783
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bda6"
  },
  "name": "Santrampur Police Station",
  "area": "Tower Road",
  "district": "Bazar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.19445,
  "longitude": 73.89442
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bda7"
  },
  "name": "Police Station Madhapar",
  "area": "NH341",
  "district": "Industrial",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.24081,
  "longitude": 69.71081
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bda8"
  },
  "name": "Vejalpur Police Station",
  "area": "Muktijivan Bhandar Road",
  "district": "Market",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.99656,
  "longitude": 72.53725
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bda9"
  },
  "name": "Vejalpur Police Station",
  "area": "NH148N",
  "district": "389340",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.68889,
  "longitude": 73.55681
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdaa"
  },
  "name": "Vejalpur Police Chowki",
  "area": "Vejalpur Road",
  "district": "Juhapura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.00413,
  "longitude": 72.5227
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdab"
  },
  "name": "Vejalpur Police Station",
  "area": "Kalol 389340",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.69062,
  "longitude": 73.55932
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdac"
  },
  "name": "Okha Police Station",
  "area": "Gujrat Maritm Board Office",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.47368,
  "longitude": 69.07888
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdad"
  },
  "name": "Okha Police Station",
  "area": "Okhamandal 361335",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.37037,
  "longitude": 69.10656
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdae"
  },
  "name": "Piplod Police Chowki",
  "area": "Dumas Road",
  "district": "Light",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.16473,
  "longitude": 72.78014
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdaf"
  },
  "name": "Railway Protection Force Police Station Gandhigram",
  "area": "Gandhigram Railway Station Road",
  "district": "Bridge",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02701,
  "longitude": 72.56926
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdb0"
  },
  "name": "Police Station Gandhigram",
  "area": "150 Feet Ring Road",
  "district": "Ghandhigram",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30713,
  "longitude": 70.76828
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdb1"
  },
  "name": "Gandhigram Police Chowki",
  "area": "Evnagar Road",
  "district": "Area",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.50533,
  "longitude": 70.4582
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdb2"
  },
  "name": "Vallabhnagar Police Station",
  "area": "Napad Road",
  "district": "387001",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.6906,
  "longitude": 72.85526
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdb3"
  },
  "name": "Chandod Police Choki",
  "area": "Chandod Road",
  "district": "Chandod",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.99061,
  "longitude": 73.45238
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdb4"
  },
  "name": "Jetpur Pavi Police Choki",
  "area": "Sh11",
  "district": "Stand",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.34298,
  "longitude": 73.84071
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdb5"
  },
  "name": "Kamrunagar Police Choki",
  "area": "Anjana Metha Pani Road",
  "district": "Dumbhal",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.18033,
  "longitude": 72.85533
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdb6"
  },
  "name": "Sanand St Police Choki",
  "area": "SH-135",
  "district": "Heights",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.9922,
  "longitude": 72.37721
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdb7"
  },
  "name": "Saurabh Police Choki",
  "area": "TGB Road",
  "district": "Residence",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.19373,
  "longitude": 72.7835
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdb8"
  },
  "name": "Chhani Police Choki",
  "area": "Chhani Road",
  "district": "Chhani",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.42915,
  "longitude": 73.66292
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdb9"
  },
  "name": "Chalamani Police Choki",
  "area": "Chalamali Road",
  "district": "Chalamali",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.13734,
  "longitude": 73.83065
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdba"
  },
  "name": "Palod Police Station",
  "area": "Palod",
  "district": "394111",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.38536,
  "longitude": 72.95815
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdbb"
  },
  "name": "Gamdi Police Chowki",
  "area": "Main Road",
  "district": "Gamdi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.56881,
  "longitude": 72.9731
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdbc"
  },
  "name": "Talala Police Station",
  "area": "Sh98",
  "district": "Vegetables",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.0574,
  "longitude": 70.53197
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdbd"
  },
  "name": "Gondal Taluka Police Station",
  "area": "Rajkot Porbandar Highway",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.95015,
  "longitude": 70.77845
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdbe"
  },
  "name": "Rajkot Taluka Police Station",
  "area": "Kalawad Road",
  "district": "Mava",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.27041,
  "longitude": 70.74792
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdbf"
  },
  "name": "Police Station Shahpur Rangila",
  "area": "Doctor Bhagwat Prasad Pathak Marg",
  "district": "Shahpur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.03509,
  "longitude": 72.57937
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdc0"
  },
  "name": "Police Station Kosad",
  "area": "Kosad Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "394107",
  "latitude": 21.25549,
  "longitude": 72.85266
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdc1"
  },
  "name": "RPF Police Station",
  "area": "Railway Station",
  "district": "Station",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.74413,
  "longitude": 71.62799
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdc2"
  },
  "name": "Morava Hade Police Station",
  "area": "SH-152",
  "district": "Hadaf",
  "state": "Gujarat",
  "pincode": "389120",
  "latitude": 22.91752,
  "longitude": 73.84138
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdc3"
  },
  "name": "Police Station-Bhuj",
  "area": "SH-42",
  "district": "Kukma",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.2292,
  "longitude": 69.76
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdc4"
  },
  "name": "Police Station Bhuj",
  "area": "Near Kodki Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.25498,
  "longitude": 69.65708
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdc5"
  },
  "name": "Bhuj Police Station",
  "area": "Near Sh45",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.24687,
  "longitude": 69.66593
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdc6"
  },
  "name": "Bhuj Police Head Quarter",
  "area": "Sonivad",
  "district": "Sonivad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.25866,
  "longitude": 69.66818
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdc7"
  },
  "name": "Gulbai Tekra Police Chowki",
  "area": "120 Circular Road",
  "district": "Basti",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02893,
  "longitude": 72.54684
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdc8"
  },
  "name": "Adajan Police Station",
  "area": "Chatrapati Shivaji Marg",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395009",
  "latitude": 21.19239,
  "longitude": 72.79473
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdc9"
  },
  "name": "Adajan Gam Police Chowki",
  "area": "Anand Mahal Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.19485,
  "longitude": 72.79816
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdca"
  },
  "name": "Palanpur Police Station",
  "area": "Station Road",
  "district": "Railway",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.17414,
  "longitude": 72.43497
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdcb"
  },
  "name": "Palanpur West Police Station Banaskantha",
  "area": "Palanpur Abu Highway",
  "district": "Gurukul",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.19261,
  "longitude": 72.43657
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdcc"
  },
  "name": "Palanpur Shahar Police Station",
  "area": "Palanpur Abu Highway",
  "district": "Gurukul",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.19388,
  "longitude": 72.43726
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdcd"
  },
  "name": "River Front Pashchim Police Station",
  "area": "Bhagtacharya Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380007",
  "latitude": 23.01189,
  "longitude": 72.57208
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdce"
  },
  "name": "Police Station Kharchi",
  "area": "Kharchi",
  "district": "Bharuch",
  "state": "Gujarat",
  "pincode": "392160",
  "latitude": 21.66815,
  "longitude": 73.09049
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdcf"
  },
  "name": "Jetpur Police Station",
  "area": "Police Line Area",
  "district": "360370",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.74716,
  "longitude": 70.61424
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdd0"
  },
  "name": "Jetpur Police Station",
  "area": "Pavijetpur Road",
  "district": "Of",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.3449,
  "longitude": 73.84268
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdd1"
  },
  "name": "Jetpur City Police Station",
  "area": "Station Road",
  "district": "Khodpara",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.75469,
  "longitude": 70.62173
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdd2"
  },
  "name": "Bordi Gate Police Chowki",
  "area": "Shishu Vihar Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.77522,
  "longitude": 72.16034
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdd3"
  },
  "name": "Valsad Police Station",
  "area": "Sh5e",
  "district": "Office",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.6098,
  "longitude": 72.9297
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdd4"
  },
  "name": "Valsad Town Police Station",
  "area": "Jalaram Road",
  "district": "Head",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.60684,
  "longitude": 72.92849
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdd5"
  },
  "name": "Valsad Railway Police Station",
  "area": "Abrama Road",
  "district": "Mograwadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.60594,
  "longitude": 72.93395
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdd6"
  },
  "name": "Shahpur Police Station",
  "area": "Kasturba Gandhi Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.03951,
  "longitude": 72.57982
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdd7"
  },
  "name": "Police Station Shahpur",
  "area": "Dudeshwar Road",
  "district": "Dudeshwar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.04735,
  "longitude": 72.58289
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdd8"
  },
  "name": "Balasinor Police Station",
  "area": "Ahmedabad Road",
  "district": "Balasinor",
  "state": "Gujarat",
  "pincode": "388255",
  "latitude": 22.94766,
  "longitude": 73.3301
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdd9"
  },
  "name": "Bayad Police Station",
  "area": "Old Bayad Village Road",
  "district": "Bayad",
  "state": "Gujarat",
  "pincode": "383325",
  "latitude": 23.21966,
  "longitude": 73.21429
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdda"
  },
  "name": "Mahudi Bhagol Police Chowki",
  "area": "Mahudi Bhagol",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.13792,
  "longitude": 73.41937
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bddb"
  },
  "name": "Police Station-Naliya",
  "area": "Nh8a Kutch Road",
  "district": "Abdasa",
  "state": "Gujarat",
  "pincode": "370655",
  "latitude": 23.25683,
  "longitude": 68.83596
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bddc"
  },
  "name": "Keshod Police Station",
  "area": "SH-97",
  "district": "362220",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.30217,
  "longitude": 70.24921
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bddd"
  },
  "name": "Navapura Police Station",
  "area": "Omkareshwar Mahadev Mandir",
  "district": "Bakrawadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.28963,
  "longitude": 73.20553
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdde"
  },
  "name": "Hanuman Gufa Police Station",
  "area": "Hanthi Tanki Road",
  "district": "Plot",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.64204,
  "longitude": 69.60686
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bddf"
  },
  "name": "Virpur Police Station",
  "area": "Virpur Gam Road",
  "district": "Virpur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.1876,
  "longitude": 73.47451
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bde0"
  },
  "name": "Navagam Police Station",
  "area": "Kamrej Surat Road",
  "district": "Kholvad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.2696,
  "longitude": 72.9582
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bde1"
  },
  "name": "Police Chowki Ambaji",
  "area": "SH-9",
  "district": "Ambaji",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.33961,
  "longitude": 72.84436
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bde2"
  },
  "name": "Kuber Nagar Police Chowki",
  "area": "Railway Station Road",
  "district": "Naroda",
  "state": "Gujarat",
  "pincode": "382330",
  "latitude": 23.07035,
  "longitude": 72.64228
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bde3"
  },
  "name": "Dhansura Police Chowki",
  "area": "SH-59",
  "district": "383310",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.35538,
  "longitude": 73.21238
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bde4"
  },
  "name": "Bayad Police Chowki",
  "area": "SH-59",
  "district": "Bayad",
  "state": "Gujarat",
  "pincode": "383325",
  "latitude": 23.2197,
  "longitude": 73.21414
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bde5"
  },
  "name": "Makarba Police Chowki",
  "area": "Makarba Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380051",
  "latitude": 22.99486,
  "longitude": 72.50809
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bde6"
  },
  "name": "Morbi Police Chowki",
  "area": "Morbi Road",
  "district": "Bedi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.33997,
  "longitude": 70.80881
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bde7"
  },
  "name": "Police Station, Ahwa",
  "area": "Sh174",
  "district": "Bus",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.75817,
  "longitude": 73.68851
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bde8"
  },
  "name": "Police Head Quarters Ahwa",
  "area": "Police Colony Road",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.76262,
  "longitude": 73.68812
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bde9"
  },
  "name": "Madhavpura Police Station",
  "area": "Oswal Bhavan Road",
  "district": "Police",
  "state": "Gujarat",
  "pincode": "380004",
  "latitude": 23.05728,
  "longitude": 72.59386
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdea"
  },
  "name": "Police Head Quarter Vadodara",
  "area": "Danteshwar",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390004",
  "latitude": 22.2817,
  "longitude": 73.20822
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdeb"
  },
  "name": "Vadodara City Police Station",
  "area": "Rajmahal Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390001",
  "latitude": 22.29644,
  "longitude": 73.19984
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdec"
  },
  "name": "Traffic Police Chowki Vadodara Railway Station",
  "area": "Indian Overseas Bank Atm",
  "district": "Sayajiganj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.31135,
  "longitude": 73.18091
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bded"
  },
  "name": "Surat Kharadi Police Chowki",
  "area": "Mithapur",
  "district": "361345",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.41847,
  "longitude": 69.01631
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdee"
  },
  "name": "Salaya Marin Police Station",
  "area": "Gujarat Sh93",
  "district": "Khambhalia",
  "state": "Gujarat",
  "pincode": "361310",
  "latitude": 22.30728,
  "longitude": 69.59765
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdef"
  },
  "name": "Langhnaj Police Station",
  "area": "SH-217",
  "district": "Taluka",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.4468,
  "longitude": 72.4911
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdf0"
  },
  "name": "Police Station Sathamba",
  "area": "Vavfali",
  "district": "Sathamba",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.17249,
  "longitude": 73.32792
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdf1"
  },
  "name": "Special Operation Group Cyber Cell Tagore Bagh",
  "area": "Tower Road",
  "district": "Bagh",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.72422,
  "longitude": 71.62728
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdf2"
  },
  "name": "Sarsavani Police Outpost",
  "area": "Sarsvani Road",
  "district": "Sarsvani",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.90457,
  "longitude": 72.86692
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdf3"
  },
  "name": "Shivmata Police Chowki",
  "area": "Ghogha Road",
  "district": "Talav",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.74414,
  "longitude": 72.17363
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdf4"
  },
  "name": "Behrampura Police Chowki",
  "area": "Shri Mahant Narsinhdas Marg",
  "district": "Calicomill",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.00811,
  "longitude": 72.58031
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdf5"
  },
  "name": "Bhadran Police Station",
  "area": "Pipali Road",
  "district": "388520",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.34692,
  "longitude": 72.94715
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdf6"
  },
  "name": "Ramari Gate Police Chowki",
  "area": "Bhadrakali Road",
  "district": "Dwarka",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.244,
  "longitude": 68.96498
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdf7"
  },
  "name": "Ambala Police Station",
  "area": "Chhotaudepur Chandpur Road",
  "district": "Udaipur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.38666,
  "longitude": 74.08954
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdf8"
  },
  "name": "Police Adhikarit Kacheri Makarba",
  "area": "Sarkhej Gandhinagar Highway",
  "district": "Makarba",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.99488,
  "longitude": 72.49751
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdf9"
  },
  "name": "Palanpur Shahar Haive Police Chowki",
  "area": "Gurunanak Road",
  "district": "Railway",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.17131,
  "longitude": 72.42817
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdfa"
  },
  "name": "Paniyari Police",
  "area": "Kheda To Khambhat Highway",
  "district": "Paniyari",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.31374,
  "longitude": 72.62315
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdfb"
  },
  "name": "Navsari District Police Station",
  "area": "Jalalpore Road",
  "district": "Jalalpore",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.94921,
  "longitude": 72.90177
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdfc"
  },
  "name": "District Police Station Godhra",
  "area": "Nurani Masjid Road",
  "district": "Rayavadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.76751,
  "longitude": 73.62005
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdfd"
  },
  "name": "Junagadh District Police Station",
  "area": "Mullawada",
  "district": "Sakkar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.52949,
  "longitude": 70.46134
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdfe"
  },
  "name": "Ambika Police Station",
  "area": "Borisana Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.24066,
  "longitude": 72.488
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bdff"
  },
  "name": "Ladies Police Station",
  "area": "Amir Road",
  "district": "Gate",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.16842,
  "longitude": 72.4358
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be00"
  },
  "name": "Ladies Police Station Chhota Udaipur",
  "area": "Main Bazar",
  "district": "Udaipur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30372,
  "longitude": 74.01614
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be01"
  },
  "name": "Bhaktinagar Police Station",
  "area": "Gita Nagar Road 1",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.27539,
  "longitude": 70.80045
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be02"
  },
  "name": "GNFC Police Chowki",
  "area": "Bharuch Bypass Road",
  "district": "Shopping",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.73114,
  "longitude": 73.02835
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be03"
  },
  "name": "Nikol Police Station",
  "area": "Nikol Gam Road",
  "district": "Nicol",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.04297,
  "longitude": 72.67619
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be04"
  },
  "name": "Kathana Out Post",
  "area": "Kathana Road",
  "district": "Kathana",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29503,
  "longitude": 72.78944
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be05"
  },
  "name": "Damnagar Police Station",
  "area": "SH-21",
  "district": "Damnagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.6905,
  "longitude": 71.51672
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be06"
  },
  "name": "Chhani Police Station",
  "area": "Chhani Shak Market",
  "district": "Chhayapuri",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.36487,
  "longitude": 73.16777
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be07"
  },
  "name": "Kasba Jail Chhota Udaipur",
  "area": "Chhota Udaipur Road",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30181,
  "longitude": 74.01047
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be08"
  },
  "name": "Adajan Police Station",
  "area": "Adajan Garden Road",
  "district": "Adajan",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.19051,
  "longitude": 72.79456
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be09"
  },
  "name": "Ladawel Chowki",
  "area": "SH-141",
  "district": "387640",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.90949,
  "longitude": 73.12605
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be0a"
  },
  "name": "Police Chowki",
  "area": "Geedwani Road",
  "district": "Vezalpur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.776,
  "longitude": 73.6076
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be0b"
  },
  "name": "Police Station Mukhya Kacheri",
  "area": "Dumas Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.18215,
  "longitude": 72.80364
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be0c"
  },
  "name": "Sanand Police Station",
  "area": "SH-17",
  "district": "Geppara",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.98796,
  "longitude": 72.38622
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be0d"
  },
  "name": "Mehsana Police Head Quarter",
  "area": "Gujrat Sh56a",
  "district": "Office",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.61154,
  "longitude": 72.39276
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be0e"
  },
  "name": "Mehsana B Division Police Station",
  "area": "Gujrat Sh41",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.61651,
  "longitude": 72.38542
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be0f"
  },
  "name": "Local Crime Branch Lunawada",
  "area": "Lunawada Road",
  "district": "Lunawada",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.11931,
  "longitude": 73.59894
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be10"
  },
  "name": "Police Inspector Kacheri",
  "area": "Mahatma Gandhi Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.64104,
  "longitude": 69.63032
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be11"
  },
  "name": "Laxmipura Police Chowki",
  "area": "Laxmipura Road",
  "district": "Alkapuri",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.32143,
  "longitude": 73.13551
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be12"
  },
  "name": "Dolut Gunj Bazaar Police Station",
  "area": "Daulat Ganj Bazar Road",
  "district": "Ganj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.832,
  "longitude": 74.26302
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be13"
  },
  "name": "Nandesari Police Station",
  "area": "Hanuman Mandir",
  "district": "Nandesari",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.40822,
  "longitude": 73.08715
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be14"
  },
  "name": "Kishanwadi Police Circle",
  "area": "Shiv Mandir",
  "district": "Kisanwadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30958,
  "longitude": 73.22911
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be15"
  },
  "name": "Fatehpura Police Circle",
  "area": "Hathikhana Main Road",
  "district": "Fatehpura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30537,
  "longitude": 73.21069
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be16"
  },
  "name": "Koba Circle Police Station",
  "area": "Gandhi Nagar Road",
  "district": "Sughad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.13319,
  "longitude": 72.63245
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be17"
  },
  "name": "Mahila Police Station Nana Mava",
  "area": "Racecourse Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30746,
  "longitude": 70.79
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be18"
  },
  "name": "Karelibaug Police Station",
  "area": "Shak Market Road",
  "district": "Fatehpura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30689,
  "longitude": 73.2043
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be19"
  },
  "name": "Fatehgunj Police Circle",
  "area": "Swarnim Gujarat Ring Road",
  "district": "Fatehgunj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.32398,
  "longitude": 73.1894
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be1a"
  },
  "name": "Nirma Gota Police Chowki",
  "area": "Sarkhej Gandhinagar Highway",
  "district": "University",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.13132,
  "longitude": 72.54165
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be1b"
  },
  "name": "Sonal Police Chowki",
  "area": "Shrinand Nagar Road",
  "district": "Power",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.9978,
  "longitude": 72.51891
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be1c"
  },
  "name": "Vivekananda Nagar Police Station",
  "area": "Vivekandnagar Road",
  "district": "Vinjol",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.93267,
  "longitude": 72.66396
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be1d"
  },
  "name": "New Faisal Nagar Police Station",
  "area": "Chhipakuva Road",
  "district": "Chhipakuva",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.97982,
  "longitude": 72.58027
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be1e"
  },
  "name": "Guvnl Police Station",
  "area": "Rajendra Park",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.06904,
  "longitude": 72.58941
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be1f"
  },
  "name": "Gandhi Dham Police",
  "area": "V T Nagar Road",
  "district": "Baug",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.08879,
  "longitude": 71.76128
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be20"
  },
  "name": "Police Station Nootan Nagar",
  "area": "Nootan Nagar",
  "district": "Una",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.0893,
  "longitude": 71.7621
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be21"
  },
  "name": "Bhilad Check Post",
  "area": "Naroli",
  "district": "And",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 20.2629432678,
  "longitude": 72.884223938
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be22"
  },
  "name": "Vadodara Shaher Police",
  "area": "Alkapuri Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.31076,
  "longitude": 73.16847
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be23"
  },
  "name": "Police Station-Vakaner",
  "area": "Wankaner 363621",
  "district": "Wankaner 363621",
  "state": "Gujarat",
  "pincode": "Wankaner 363621",
  "latitude": 22.60997,
  "longitude": 70.95348
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be24"
  },
  "name": "Police Station Anti Correption",
  "area": "Gandhinagar",
  "district": "382030",
  "state": "Gujarat",
  "pincode": "382030",
  "latitude": 23.241947,
  "longitude": 72.672175
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be25"
  },
  "name": "Police Station-Kamrej",
  "area": "Kamrej",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "394180",
  "latitude": 21.26949,
  "longitude": 72.958
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be26"
  },
  "name": "Police Station-Mangrol",
  "area": "Mangrol 394421",
  "district": "Mangrol 394421",
  "state": "Gujarat",
  "pincode": "Mangrol 394421",
  "latitude": 21.46059,
  "longitude": 73.15536
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be27"
  },
  "name": "Navsari Kachri Police Station",
  "area": "Nh 8 Road",
  "district": "Navsari",
  "state": "Gujarat",
  "pincode": "Navsari 396424",
  "latitude": 20.947191,
  "longitude": 72.958969
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be28"
  },
  "name": "Police Station-Udhana",
  "area": "Jawahar No. 1 Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "394210",
  "latitude": 21.16512,
  "longitude": 72.85118
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be29"
  },
  "name": "Superintendent of Police Navsari",
  "area": "Lions Circle Navsari",
  "district": "396445",
  "state": "Gujarat",
  "pincode": "Navsari 396445",
  "latitude": 20.947483,
  "longitude": 72.937801
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be2a"
  },
  "name": "Superintendent of Police Office",
  "area": "Court Road",
  "district": "Patan",
  "state": "Gujarat",
  "pincode": "384265",
  "latitude": 23.851292,
  "longitude": 72.136381
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be2b"
  },
  "name": "Police Station Surendranagar",
  "area": "Wadhwan",
  "district": "363035",
  "state": "Gujarat",
  "pincode": "Wadhwan 363035",
  "latitude": 22.7190324,
  "longitude": 71.6584669
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be2c"
  },
  "name": "Police Station-Ghoghla",
  "area": "Diu una Road",
  "district": "Diu",
  "state": "Gujarat",
  "pincode": "362540",
  "latitude": 20.7295567,
  "longitude": 70.9884291
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be2d"
  },
  "name": "Polish Station-Div",
  "area": "Diu",
  "district": "362540",
  "state": "Gujarat",
  "pincode": "362540",
  "latitude": 20.729583,
  "longitude": 70.9884088
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be2e"
  },
  "name": "State Reserve Police Force Group 1",
  "area": "SRP Complex Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390001",
  "latitude": 22.28632369,
  "longitude": 73.19462756
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be2f"
  },
  "name": "Police Station-Gidc",
  "area": "Ahmedabad",
  "district": "382445",
  "state": "Gujarat",
  "pincode": "382445",
  "latitude": 22.97164,
  "longitude": 72.62749
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be30"
  },
  "name": "Vyra Police Station",
  "area": "Main Bazar Road",
  "district": "394650",
  "state": "Gujarat",
  "pincode": "Vyara 394650",
  "latitude": 21.109701,
  "longitude": 73.3873
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be31"
  },
  "name": "Police Academia Interaction Forum - PAIF Gujarat",
  "area": "",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.24081,
  "longitude": 72.63733
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be32"
  },
  "name": "Dhari Police Station",
  "area": "Dhari",
  "district": "Dhari",
  "state": "Gujarat",
  "pincode": "Dhari",
  "latitude": 21.3289625,
  "longitude": 71.0323707
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be33"
  },
  "name": "Chotil Police Chowki",
  "area": "Chamunda Temple Road",
  "district": "Chotila",
  "state": "Gujarat",
  "pincode": "363520",
  "latitude": 22.422662,
  "longitude": 71.202245
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be34"
  },
  "name": "Police Station Gorwa",
  "area": "Gorwa Road",
  "district": "Gorwa",
  "state": "Gujarat",
  "pincode": "390016",
  "latitude": 22.333248,
  "longitude": 73.157321
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be35"
  },
  "name": "Police Station-Ghanshyam Nagar",
  "area": "Jalalpore 396421",
  "district": "Jalalpore 396421",
  "state": "Gujarat",
  "pincode": "Jalalpore 396421",
  "latitude": 20.9473,
  "longitude": 72.90492
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be36"
  },
  "name": "Namadar Police Chowki",
  "area": "Indulal Yagnik Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380018",
  "latitude": 23.020429,
  "longitude": 72.605433
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be37"
  },
  "name": "Police Commissioner Office",
  "area": "Ahmedabad",
  "district": "380055",
  "state": "Gujarat",
  "pincode": "380055",
  "latitude": 22.993091,
  "longitude": 72.527029
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be38"
  },
  "name": "Police Station-Pandesara",
  "area": "Rey Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "394221",
  "latitude": 21.14178,
  "longitude": 72.83982
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be39"
  },
  "name": "Police Station-Garbada",
  "area": "Dohad",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "389155",
  "latitude": 22.685117125,
  "longitude": 74.3117113999
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be3a"
  },
  "name": "Police Station-Infocity",
  "area": "Sector 7 Road",
  "district": "Gandhinagar",
  "state": "Gujarat",
  "pincode": "382007",
  "latitude": 23.21131,
  "longitude": 72.63978
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be3b"
  },
  "name": "Police Chowki",
  "area": "Sector 6",
  "district": "Gandhinagar",
  "state": "Gujarat",
  "pincode": "382006",
  "latitude": 23.212687,
  "longitude": 72.636451
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be3c"
  },
  "name": "City Division Police Station",
  "area": "Jamnagar 361001",
  "district": "Jamnagar 361001",
  "state": "Gujarat",
  "pincode": "Jamnagar 361001",
  "latitude": 22.464231,
  "longitude": 70.080274
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be3d"
  },
  "name": "Kite Festival Jamnagar",
  "area": "Sarusection",
  "district": "",
  "state": "Gujarat",
  "pincode": "Jamnagar",
  "latitude": 22.47285,
  "longitude": 70.05226
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be3e"
  },
  "name": "Police Station-Jalalpur",
  "area": "Jalalpore",
  "district": "Jalalpore",
  "state": "Gujarat",
  "pincode": "Jalalpore",
  "latitude": 20.94987,
  "longitude": 72.90183
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be3f"
  },
  "name": "Dwarka Police Chowki",
  "area": "Shri Mad Ballabha Charya Marg",
  "district": "361335",
  "state": "Gujarat",
  "pincode": "Dwarka 361335",
  "latitude": 22.24398,
  "longitude": 68.96484
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be40"
  },
  "name": "Gujarat Police Academy",
  "area": "Gandhinagar",
  "district": "382330",
  "state": "Gujarat",
  "pincode": "382330",
  "latitude": 23.117189,
  "longitude": 72.660038
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be41"
  },
  "name": "Police Academy Karai",
  "area": "Gandhinagar",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.1060608,
  "longitude": 72.6317191
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be42"
  },
  "name": "Police Station-Mandvi",
  "area": "Police Line",
  "district": "394160",
  "state": "Gujarat",
  "pincode": "Mandvi 394160",
  "latitude": 21.25022823,
  "longitude": 73.30099701
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be43"
  },
  "name": "Ankleshwar Police Station",
  "area": "Railway Station Road",
  "district": "393001",
  "state": "Gujarat",
  "pincode": "Ankleshwar 393001",
  "latitude": 21.62558,
  "longitude": 73.00064
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be44"
  },
  "name": "Rajkiya Police Station",
  "area": "Arunoday Nagar Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390007",
  "latitude": 22.31267,
  "longitude": 73.17882
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be45"
  },
  "name": "Bhaktinagar Police Station",
  "area": "Kothariya Main Road",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360002",
  "latitude": 22.278288,
  "longitude": 70.81129
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be46"
  },
  "name": "Police Training College",
  "area": "Swami Vivekanand Marg Madavi Nagar",
  "district": "Junagarh",
  "state": "Gujarat",
  "pincode": "Junagadh 362001",
  "latitude": 21.5012774,
  "longitude": 70.4698175
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be47"
  },
  "name": "Police Station-Rajkot City",
  "area": "Rajkot",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "360001",
  "latitude": 22.29598,
  "longitude": 70.80271
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be48"
  },
  "name": "Police Station-Nizar",
  "area": "Nizar",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "394370",
  "latitude": 21.47771,
  "longitude": 74.19317
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be49"
  },
  "name": "Police Station-S T Road",
  "area": "Dhrol 361210",
  "district": "Dhrol 361210",
  "state": "Gujarat",
  "pincode": "Dhrol 361210",
  "latitude": 22.56381,
  "longitude": 70.41294
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be4a"
  },
  "name": "Police Station",
  "area": "SH-104",
  "district": "Una",
  "state": "Gujarat",
  "pincode": "362560",
  "latitude": 20.82676,
  "longitude": 71.04503
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be4b"
  },
  "name": "Gandhi Gram Police Station",
  "area": "Ring Road",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360005",
  "latitude": 22.297521,
  "longitude": 70.769518
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be4c"
  },
  "name": "Police Station-Vadodara",
  "area": "NEW IPCL Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.3189,
  "longitude": 73.16067
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be4d"
  },
  "name": "Kutiyana Town Police Chowki",
  "area": "ST Road",
  "district": "362650",
  "state": "Gujarat",
  "pincode": "Kutiyana 362650",
  "latitude": 21.626517,
  "longitude": 69.98136
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be4e"
  },
  "name": "Police Station-Anjar",
  "area": "opp bus  station",
  "district": "Anjar",
  "state": "Gujarat",
  "pincode": "370110",
  "latitude": 23.1098611,
  "longitude": 70.0341194
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be4f"
  },
  "name": "Police Station-Vesma",
  "area": "Service Road",
  "district": "396475",
  "state": "Gujarat",
  "pincode": "Jalalpore 396475",
  "latitude": 21.0312,
  "longitude": 72.97058
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be50"
  },
  "name": "Dwareka Police Station",
  "area": "Murli Mandir Marg",
  "district": "361335",
  "state": "Gujarat",
  "pincode": "Dwarka 361335",
  "latitude": 22.249348,
  "longitude": 68.979184
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be51"
  },
  "name": "M G Road Police Station",
  "area": "M G Road",
  "district": "Hospital",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.63393,
  "longitude": 69.61672
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be52"
  },
  "name": "Por Police Chowki",
  "area": "Kayavarohan Road",
  "district": "Of",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.13792,
  "longitude": 73.1852
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be53"
  },
  "name": "Trapaj Police Chowki",
  "area": "SH-37",
  "district": "Trapaj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.42599,
  "longitude": 72.10948
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be54"
  },
  "name": "Sarkhej Mahila Police Station",
  "area": "Sarkhej Gandhinagar Highway",
  "district": "Makarba",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.99459,
  "longitude": 72.49756
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be55"
  },
  "name": "Sarkhej Police Station",
  "area": "Jawaharlal Nehru Road",
  "district": "Sarkhej",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.98744,
  "longitude": 72.50297
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be56"
  },
  "name": "Kutiyana Police Station",
  "area": "SH-32",
  "district": "362650",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.62481,
  "longitude": 69.99146
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be57"
  },
  "name": "Chiloda Police Station",
  "area": "Mota Chiloda Road",
  "district": "Moti",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.22726,
  "longitude": 72.73069
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be58"
  },
  "name": "Bamangam Out Post Police Station",
  "area": "Bamangam Road",
  "district": "Mandir",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.28824,
  "longitude": 73.00768
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be59"
  },
  "name": "Bamangam Police Check Post",
  "area": "NH148M",
  "district": "388520",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.28078,
  "longitude": 72.98972
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be5a"
  },
  "name": "Fulwadi Police Chowki",
  "area": "Motiwala Apartment",
  "district": "Fulwadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.75854,
  "longitude": 70.6256
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be5b"
  },
  "name": "Golvad Police Gate",
  "area": "SH-6",
  "district": "Nagarwada",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.95329,
  "longitude": 72.92616
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be5c"
  },
  "name": "Golvad Police Chowki",
  "area": "Golwadi Road",
  "district": "382150",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.12589,
  "longitude": 72.04911
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be5d"
  },
  "name": "Police Station Lakhtar",
  "area": "Station Road",
  "district": "382775",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.85997,
  "longitude": 71.78307
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be5e"
  },
  "name": "Sevaliya Police Station",
  "area": "SH-12",
  "district": "388245",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.80728,
  "longitude": 73.33883
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be5f"
  },
  "name": "Dabhan Highway Police Chowki",
  "area": "Narol Naroda Road",
  "district": "Taluka",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.70727,
  "longitude": 72.82678
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be60"
  },
  "name": "Police Station Aniyor",
  "area": "Aniyor",
  "district": "Dhansura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.33209,
  "longitude": 73.34391
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be61"
  },
  "name": "Suryanagar Police Station",
  "area": "Isanpur Vatva Road",
  "district": "Roja",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.98914,
  "longitude": 72.59564
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be62"
  },
  "name": "Vesma Police Station",
  "area": "SH-195",
  "district": "Vesma",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.03138,
  "longitude": 72.97073
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be63"
  },
  "name": "Maheboob Pura Police Chowki",
  "area": "Shree Vishwanath Ganeshay Mandir",
  "district": "Navapura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.28802,
  "longitude": 73.20316
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be64"
  },
  "name": "Bhalej Police Chowki",
  "area": "SH-60",
  "district": "Bhalej",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.6343,
  "longitude": 73.02843
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be65"
  },
  "name": "Timba Out Post",
  "area": "Timba Road",
  "district": "Timba",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.81831,
  "longitude": 73.4041
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be66"
  },
  "name": "Sarthana Police Station",
  "area": "Haveli Marg",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.22236,
  "longitude": 72.90319
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be67"
  },
  "name": "Adipur Police Station",
  "area": "Rambaug Road",
  "district": "370205",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.07441,
  "longitude": 70.09783
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be68"
  },
  "name": "Adipur Police Station",
  "area": "Anjar to Adipur Road",
  "district": "370205",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.0715,
  "longitude": 70.0769
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be69"
  },
  "name": "Adipur Police Chowki",
  "area": "Anjar Road",
  "district": "370205",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.06726,
  "longitude": 70.07283
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be6a"
  },
  "name": "Madadnish Commission Police",
  "area": "Khokhra Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.00171,
  "longitude": 72.61978
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be6b"
  },
  "name": "Mendarda Police Station",
  "area": "Mendarda Panchayat Kacheri",
  "district": "362260",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.32088,
  "longitude": 70.44367
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be6c"
  },
  "name": "Bavlu Police Station",
  "area": "Bavlu",
  "district": "382165",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.15824,
  "longitude": 72.3112
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be6d"
  },
  "name": "Kaprada Police Station",
  "area": "Nashik Dharampur Road",
  "district": "396050",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.34379,
  "longitude": 73.21917
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be6e"
  },
  "name": "Bhadla Police Station",
  "area": "SH 317",
  "district": "Bhadla",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.18311,
  "longitude": 71.09616
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be6f"
  },
  "name": "Police Station-Jakhau",
  "area": "SH-49",
  "district": "Jakhau",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.2148,
  "longitude": 68.7172
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be70"
  },
  "name": "Tankhala Out Post",
  "area": "Tankhala Road",
  "district": "Tankhala",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.97333,
  "longitude": 73.77593
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be71"
  },
  "name": "Police Station Varachha",
  "area": "Lambe Hanuman Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.20999,
  "longitude": 72.85671
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be72"
  },
  "name": "Bombay Hanuman Police Station Varachha",
  "area": "Lambe Hanuman Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.20473,
  "longitude": 72.8446
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be73"
  },
  "name": "Mota Varachha Police Station",
  "area": "Abarama Road",
  "district": "Varachha",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.24311,
  "longitude": 72.88455
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be74"
  },
  "name": "Sangrampur Police Station",
  "area": "Rudra Pura Road",
  "district": "Garden",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.18905,
  "longitude": 72.82518
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be75"
  },
  "name": "Tower Bajar Police Station",
  "area": "Hanumaan Temple",
  "district": "Bazar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.78548,
  "longitude": 72.64049
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be76"
  },
  "name": "Modasar Police Chowki",
  "area": "NH56",
  "district": "391140",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.2556,
  "longitude": 73.72664
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be77"
  },
  "name": "Chhapi Police Chowki",
  "area": "Vadgam 385210",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.02959,
  "longitude": 72.39966
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be78"
  },
  "name": "Madawa Police Station",
  "area": "Sundarpur",
  "district": "383230",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.82235,
  "longitude": 72.82076
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be79"
  },
  "name": "Drol Police Station",
  "area": "Jamnagar Rajkot Road",
  "district": "361210",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.56169,
  "longitude": 70.41409
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be7a"
  },
  "name": "Charodia Police Station",
  "area": "General Hospital Road",
  "district": "Rakhial",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02503,
  "longitude": 72.62568
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be7b"
  },
  "name": "Navrangpura Police Station",
  "area": "Navrangpura Police Station Road",
  "district": "Gam",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.03499,
  "longitude": 72.56741
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be7c"
  },
  "name": "Police Chowki Navrangpura",
  "area": "NH151A",
  "district": "361210",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.56644,
  "longitude": 70.41411
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be7d"
  },
  "name": "Deodar City Police Station",
  "area": "SH-872",
  "district": "385330",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.10893,
  "longitude": 71.77561
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be7e"
  },
  "name": "Police Station-Jadodar",
  "area": "SH-42",
  "district": "Mankuva",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.21062,
  "longitude": 69.5683
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be7f"
  },
  "name": "Fatehgunj Police Station",
  "area": "Aurobindo Ghosh Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.33535,
  "longitude": 73.17386
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be80"
  },
  "name": "Fatehwadi Police Station",
  "area": "100 Feet Ring Road",
  "district": "Sarkhej",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.97994,
  "longitude": 72.51184
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be81"
  },
  "name": "Nayab Police Adhishak ni Kacheri",
  "area": "Sector 9 Inner Road",
  "district": "Force",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.2093,
  "longitude": 72.65784
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be82"
  },
  "name": "Office of Suprident of Police",
  "area": "Mahatma Gandhi Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29868,
  "longitude": 70.7928
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be83"
  },
  "name": "Bhilad Police Station",
  "area": "Bhilad",
  "district": "396105",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.26836,
  "longitude": 72.88633
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be84"
  },
  "name": "Samarkha Out Post Police Chowki",
  "area": "Bhalej Road",
  "district": "Samarkha",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.60088,
  "longitude": 72.98441
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be85"
  },
  "name": "Shahibag Police Station",
  "area": "Oswal Bhavan Road",
  "district": "Hall",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.05513,
  "longitude": 72.59312
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be86"
  },
  "name": "Investigation Unit For Crime Shahibag",
  "area": "Oswal Bhavan Road",
  "district": "Police",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.05486,
  "longitude": 72.59473
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be87"
  },
  "name": "Juna Vadaj Police Chowki",
  "area": "Ashram Road",
  "district": "Vadaj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.05462,
  "longitude": 72.57179
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be88"
  },
  "name": "Juna Vadaj Police Chowki",
  "area": "Late Rajendra Mistri Marg",
  "district": "Thekra",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.06358,
  "longitude": 72.57181
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be89"
  },
  "name": "Nayak Police Mahanirikshak Chowki",
  "area": "Kasturba Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29996,
  "longitude": 70.79862
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be8a"
  },
  "name": "Himatnagar A Division Police Station",
  "area": "Engineering Circle",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.59625,
  "longitude": 72.96707
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be8b"
  },
  "name": "Rajendranagar Police Chowki",
  "area": "NH-48",
  "district": "383276",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.59988,
  "longitude": 73.20752
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be8c"
  },
  "name": "Chauta Bazaar Police Station",
  "area": "Sh6",
  "district": "Bazar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.6336,
  "longitude": 72.9925
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be8d"
  },
  "name": "Limbayat Police Station",
  "area": "Mithi Khadi Road",
  "district": "Limbayat",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.17599,
  "longitude": 72.85715
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be8e"
  },
  "name": "Porbandar Miyani Check Post",
  "area": "NH-51",
  "district": "360579",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.83883,
  "longitude": 69.38712
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be8f"
  },
  "name": "Police Adhikshak Office Panch Hatdi",
  "area": "Wadia Road",
  "district": "V",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.63519,
  "longitude": 69.61485
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be90"
  },
  "name": "Juna Fuvara Police Line Panch Hatdi",
  "area": "Porbandar Road",
  "district": "Hatdi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.63864,
  "longitude": 69.61046
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be91"
  },
  "name": "Sindhvai Police Chowki",
  "area": "Sevashram Road",
  "district": "Cybar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.70612,
  "longitude": 72.98635
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be92"
  },
  "name": "Ratanpar Police Station",
  "area": "Jorawar Nagar Ratanpur Road",
  "district": "Rameshwar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.71905,
  "longitude": 71.62843
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be93"
  },
  "name": "Gundawadi Police Station",
  "area": "Jangleshwar Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.267,
  "longitude": 70.81862
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be94"
  },
  "name": "Ram Bhoraj Police Chowki",
  "area": "Rajender Bhavan Road",
  "district": "Mugal",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.9096,
  "longitude": 70.36901
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be95"
  },
  "name": "Police Unit Mount Khapat",
  "area": "Adityana Road",
  "district": "360579",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.6669,
  "longitude": 69.62439
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be96"
  },
  "name": "Chakliya Police Station",
  "area": "Chakaliya",
  "district": "389180",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.05281,
  "longitude": 74.30589
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be97"
  },
  "name": "Khatodra Police Station",
  "area": "Udhana Magdalla Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.17647,
  "longitude": 72.83161
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be98"
  },
  "name": "Atisar Police Chowk Lathi Bazar",
  "area": "Modasa Road",
  "district": "Bazar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02553,
  "longitude": 73.07339
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be99"
  },
  "name": "Makarpura Police Station",
  "area": "Makarpura Road",
  "district": "Lalbaug",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.27058,
  "longitude": 73.20323
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be9a"
  },
  "name": "Pethapur Police Chowki",
  "area": "Ambaji Mandir",
  "district": "Pethapur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.24756,
  "longitude": 72.67147
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be9b"
  },
  "name": "Police Station Pethapur",
  "area": "G. E. B. Road",
  "district": "Pethapur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.2585,
  "longitude": 72.6732
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be9c"
  },
  "name": "Hatkesh Police Station",
  "area": "120 Circular Road",
  "district": "Navrangpura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.0467,
  "longitude": 72.55299
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be9d"
  },
  "name": "Vadaliya Police Station",
  "area": "Kotsafil Main Road",
  "district": "Mandan",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.19294,
  "longitude": 72.82969
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be9e"
  },
  "name": "Libasi Police Chowki",
  "area": "SH-16",
  "district": "Rampur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.71549,
  "longitude": 72.46648
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914be9f"
  },
  "name": "Pradhuman Nagar Police Station",
  "area": "Babu Bhai Shah Marg",
  "district": "Vishwanath",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30084,
  "longitude": 70.79674
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bea0"
  },
  "name": "Dindoli Police Station",
  "area": "Udhana Palsana Road",
  "district": "Gam",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.14325,
  "longitude": 72.88074
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bea1"
  },
  "name": "Vastral Police Chowki",
  "area": "Vastral Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.00245,
  "longitude": 72.64904
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bea2"
  },
  "name": "Police Station, Vartej",
  "area": "Sh25",
  "district": "Oil",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.74219,
  "longitude": 72.06354
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bea3"
  },
  "name": "Ranip Police Station",
  "area": "Doctor Ambedkar Road",
  "district": "Vadaj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.06766,
  "longitude": 72.58223
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bea4"
  },
  "name": "Ranip Police Station",
  "area": "Central Jail Road",
  "district": "Ranip",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.08052,
  "longitude": 72.57859
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bea5"
  },
  "name": "Chatral Police Chowki",
  "area": "SH-41",
  "district": "I",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.27835,
  "longitude": 72.4414
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bea6"
  },
  "name": "Police Station Palsana",
  "area": "Sh187 Surat Road",
  "district": "394315",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.08662,
  "longitude": 72.98762
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bea7"
  },
  "name": "Amdupura Police Station",
  "area": "Naroda Road",
  "district": "Saraspura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.04061,
  "longitude": 72.61119
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bea8"
  },
  "name": "Police Chowki Ranakandorna",
  "area": "Ranakandorna Road",
  "district": "Ranakandorna",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.64899,
  "longitude": 69.88564
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bea9"
  },
  "name": "Badipara Police Chowki",
  "area": "Bhavnagar Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30521,
  "longitude": 70.81185
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beaa"
  },
  "name": "Aslali Police Station",
  "area": "Dandi Heritage Route",
  "district": "Ali",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.92032,
  "longitude": 72.59459
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beab"
  },
  "name": "Aslali Police Station Town Beat",
  "area": "Oriental Bank Of Commerce",
  "district": "Aslali",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.91499,
  "longitude": 72.59311
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beac"
  },
  "name": "Varacha Police Station",
  "area": "Varacha Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.20947,
  "longitude": 72.84959
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bead"
  },
  "name": "Dabhoda Police Station",
  "area": "Dabhoda Road",
  "district": "Dabhoda",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.17632,
  "longitude": 72.74708
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beae"
  },
  "name": "Police Chowki, Uparkot",
  "area": "Uperkot Road",
  "district": "Coat",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.52244,
  "longitude": 70.46976
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beaf"
  },
  "name": "Lajpor Central Jail",
  "area": "Surat Navsari Road",
  "district": "Sachin",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.07294,
  "longitude": 72.88872
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beb0"
  },
  "name": "Bagvadar Police Station",
  "area": "SH-28",
  "district": "360590",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.79144,
  "longitude": 69.59052
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beb1"
  },
  "name": "Kadodara Police Station",
  "area": "Nh8",
  "district": "Chowk",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.17115,
  "longitude": 72.96325
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beb2"
  },
  "name": "Sola Highcourt Police Station",
  "area": "Sarkhej Gandhinagar Highway",
  "district": "Gota",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.08745,
  "longitude": 72.52964
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beb3"
  },
  "name": "Waghjipur Police Station",
  "area": "Waghjipur Road",
  "district": "Waghjipur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.88231,
  "longitude": 73.76288
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beb4"
  },
  "name": "Laskana Police Station",
  "area": "Kamrej Surat Road",
  "district": "Village",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.24908,
  "longitude": 72.92386
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beb5"
  },
  "name": "Joravar Nagar Police Station",
  "area": "Mahatma Gandhi Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.71315,
  "longitude": 71.64669
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beb6"
  },
  "name": "Murila Gate Police",
  "area": "Axis Bank",
  "district": "Town",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.20687,
  "longitude": 70.38372
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beb7"
  },
  "name": "Mahila Police Station",
  "area": "Ambaji Road",
  "district": "Village",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.60175,
  "longitude": 72.96009
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beb8"
  },
  "name": "Mahila Police Station",
  "area": "Doctor Vikram Sarabhai Marg",
  "district": "Pol",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02918,
  "longitude": 72.54137
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beb9"
  },
  "name": "Champaner Police Chowki",
  "area": "Naya Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390001",
  "latitude": 22.30365,
  "longitude": 73.21042
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beba"
  },
  "name": "Sayaji Gunj Police Station",
  "area": "Aurobindo Ghosh Road",
  "district": "Sarod",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30983,
  "longitude": 73.18289
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bebb"
  },
  "name": "Mandvi Chowk Police Station",
  "area": "Sukhnath Road",
  "district": "City",
  "state": "Gujarat",
  "pincode": "362001",
  "latitude": 21.52247,
  "longitude": 70.46421
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bebc"
  },
  "name": "Mandvi Chowk Police Station",
  "area": "Station Road",
  "district": "Gondal",
  "state": "Gujarat",
  "pincode": "360311",
  "latitude": 21.96405,
  "longitude": 70.80298
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bebd"
  },
  "name": "Moghul Wada Police Station",
  "area": "Yamuna Mill Road",
  "district": "Wadi",
  "state": "Gujarat",
  "pincode": "390017",
  "latitude": 22.29748,
  "longitude": 73.21547
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bebe"
  },
  "name": "Sardar Baug Police Station",
  "area": "100 Feet Road",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.5632,
  "longitude": 72.9597
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bebf"
  },
  "name": "Ghoda Gate Police Chowki",
  "area": "M G Road",
  "district": "Darbargadh",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.7761,
  "longitude": 72.1454
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bec0"
  },
  "name": "Himmat Nagar Police Station",
  "area": "Tower Road",
  "district": "Himatnagar",
  "state": "Gujarat",
  "pincode": "383001",
  "latitude": 23.59682,
  "longitude": 72.95964
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bec1"
  },
  "name": "Puna Police Station",
  "area": "Kumbhariya Road",
  "district": "Indusrtial",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.18995,
  "longitude": 72.87164
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bec2"
  },
  "name": "Bharuch Taluka Police Station",
  "area": "Zadeswar Road",
  "district": "Maktampur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.70691,
  "longitude": 73.008
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bec3"
  },
  "name": "A Div Police Station Bharuch",
  "area": "Panch Bati",
  "district": "Bazaar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.69709,
  "longitude": 72.98743
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bec4"
  },
  "name": "Bharuch Station Police Chowki",
  "area": "Station Road",
  "district": "Village",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.70343,
  "longitude": 72.99887
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bec5"
  },
  "name": "Police Station, Uchchhal",
  "area": "NH-53",
  "district": "Uchchhal",
  "state": "Gujarat",
  "pincode": "394670",
  "latitude": 21.18091,
  "longitude": 73.60197
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bec6"
  },
  "name": "Ambli Police Station",
  "area": "Ambli Road",
  "district": "Gold",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02771,
  "longitude": 72.47887
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bec7"
  },
  "name": "Madhupur Police Station",
  "area": "Late Shri Ishwarlal Adhaji Waghela Marg",
  "district": "Dariyapur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.04285,
  "longitude": 72.58227
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bec8"
  },
  "name": "Vatva Police Chowki",
  "area": "Vatva Gaon Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "382445",
  "latitude": 22.95375,
  "longitude": 72.61276
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bec9"
  },
  "name": "Vatva Police Station",
  "area": "Vatva Gam Road",
  "district": "Vatva",
  "state": "Gujarat",
  "pincode": "382405",
  "latitude": 22.96108,
  "longitude": 72.61781
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beca"
  },
  "name": "Vatva Police Chowki",
  "area": "Gidc Vatwa Road",
  "district": "Mandir",
  "state": "Gujarat",
  "pincode": "382445",
  "latitude": 22.97141,
  "longitude": 72.62837
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914becb"
  },
  "name": "Lodhika Police Station",
  "area": "Lodhika",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "360035",
  "latitude": 22.13514,
  "longitude": 70.63596
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914becc"
  },
  "name": "Gaura Police Chowki",
  "area": "Jawahar Road",
  "district": "Khambhat",
  "state": "Gujarat",
  "pincode": "388620",
  "latitude": 22.3167,
  "longitude": 72.62397
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914becd"
  },
  "name": "Kamdar Maidan Police Station",
  "area": "Rakhial Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380021",
  "latitude": 23.02043,
  "longitude": 72.60535
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bece"
  },
  "name": "Chona Jobhiya Police Station",
  "area": "Bakrawadi Road",
  "district": "Baranpura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29336,
  "longitude": 73.20819
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914becf"
  },
  "name": "Begum Pura Police Station",
  "area": "Zampa Bazaar Main Road",
  "district": "Navapura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.19637,
  "longitude": 72.83724
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bed0"
  },
  "name": "Police Station, Barwala",
  "area": "Barwala",
  "district": "382450",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.15697,
  "longitude": 71.89263
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bed1"
  },
  "name": "Perol Flo Scord Godhra",
  "area": "Vadodara Road",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.77037,
  "longitude": 73.62057
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bed2"
  },
  "name": "Aatar Sumba Police Station",
  "area": "Kapadvanj Road",
  "district": "Sumba",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.05435,
  "longitude": 72.9689
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bed3"
  },
  "name": "Salun Police Station",
  "area": "SH-12",
  "district": "Taluka",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.70195,
  "longitude": 72.92163
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bed4"
  },
  "name": "Bhatha Gam Police Station",
  "area": "Adajan Hajira Road",
  "district": "Revenue",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.18436,
  "longitude": 72.76175
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bed5"
  },
  "name": "Katargam Darvaja Police Station",
  "area": "Sayedpura Main Road",
  "district": "Darwaja",
  "state": "Gujarat",
  "pincode": "395003",
  "latitude": 21.20696,
  "longitude": 72.82542
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bed6"
  },
  "name": "Vadodara Taluka Police Station",
  "area": "Om Pathupateshwar Mahadev Nu Mandir",
  "district": "Yakutpura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30243,
  "longitude": 73.21456
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bed7"
  },
  "name": "Sindhrot Police Chowki",
  "area": "State Highway 11",
  "district": "Taluka",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.34452,
  "longitude": 73.06055
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bed8"
  },
  "name": "Home Guard Office",
  "area": "Kadi Road",
  "district": "382715",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.30561,
  "longitude": 72.32851
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bed9"
  },
  "name": "Rajkot Traffice Police Station Industrial Gidc",
  "area": "Bhavnagar Road",
  "district": "GIDC",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.27862,
  "longitude": 70.83589
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beda"
  },
  "name": "Junagadh Road Police Station",
  "area": "Mullawada",
  "district": "Coat",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.52376,
  "longitude": 70.46722
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bedb"
  },
  "name": "Police Adhyaksh Ni Branch Junagadh",
  "area": "Nagar Road",
  "district": "Kadiwad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.5203,
  "longitude": 70.46473
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bedc"
  },
  "name": "Junagadh City Division Police Station",
  "area": "Mg Road",
  "district": "Mullawada",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.52543,
  "longitude": 70.46005
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bedd"
  },
  "name": "Devgadh Bariya Police Station",
  "area": "Police Station",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.7013,
  "longitude": 73.91471
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bede"
  },
  "name": "Patadi Police Station",
  "area": "Patdi Road",
  "district": "382765",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.18908,
  "longitude": 71.7955
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bedf"
  },
  "name": "Dahod Town Police Station",
  "area": "Sindhi Society Road",
  "district": "Police",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.83883,
  "longitude": 74.25949
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bee0"
  },
  "name": "Dahod Town Police Station",
  "area": "Godi Road",
  "district": "Railway",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.84504,
  "longitude": 74.25685
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bee1"
  },
  "name": "Dahod Town Police Station",
  "area": "S V Patel Road",
  "district": "Marketyard",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.82659,
  "longitude": 74.26261
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bee2"
  },
  "name": "Jetpur Taluka Police Station",
  "area": "Nh151",
  "district": "Tractor",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.75263,
  "longitude": 70.61669
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bee3"
  },
  "name": "Taluka Police Station Mahesana",
  "area": "Station Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.60262,
  "longitude": 72.39399
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bee4"
  },
  "name": "Godhra Taluka Police Station",
  "area": "Mamlatdar Kacheri",
  "district": "Soni",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.77396,
  "longitude": 73.61771
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bee5"
  },
  "name": "Bhuj Taluka Police Station",
  "area": "Airport Road",
  "district": "Nagari",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.27064,
  "longitude": 69.67383
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bee6"
  },
  "name": "Bhuj Taluka Police Station",
  "area": "Airport Road",
  "district": "Airport",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.27108,
  "longitude": 69.66253
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bee7"
  },
  "name": "Taluka Police Station",
  "area": "Dharmashala Road",
  "district": "City",
  "state": "Gujarat",
  "pincode": "362001",
  "latitude": 21.52921,
  "longitude": 70.46702
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bee8"
  },
  "name": "Kathvada Police Station",
  "area": "Bhuvaladi Gram Road",
  "district": "Kathwada",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02564,
  "longitude": 72.69194
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bee9"
  },
  "name": "Kupwada Police Station",
  "area": "Anandpar Road",
  "district": "Navagam",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.31397,
  "longitude": 70.83475
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beea"
  },
  "name": "Police Station Manchi",
  "area": "Champaner Machi Road",
  "district": "Manchi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.46601,
  "longitude": 73.51573
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beeb"
  },
  "name": "Rameshwar Police Chowki",
  "area": "Manav Ashram Circle",
  "district": "Mehsana",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.61464,
  "longitude": 72.40823
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beec"
  },
  "name": "Commissioner of Police",
  "area": "Dumas Road",
  "district": "Lines",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.18168,
  "longitude": 72.80408
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beed"
  },
  "name": "Mahila Police Station Athwa Line",
  "area": "Maa Thakur Bhai Desai Marg",
  "district": "Nandan",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.17888,
  "longitude": 72.80369
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beee"
  },
  "name": "Udhna Udyog Nagar Police Station",
  "area": "Udhana Palsana Road",
  "district": "Udhyog",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.17016,
  "longitude": 72.84152
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beef"
  },
  "name": "Main Police Station",
  "area": "Dahej Bypass Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.69325,
  "longitude": 72.96453
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bef0"
  },
  "name": "Puri Police Station",
  "area": "Lal Bag",
  "district": "Stations-Taluka",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.17664,
  "longitude": 72.44455
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bef1"
  },
  "name": "Sector-7 Police Chowki",
  "area": "Gandhinagar Sector 6 Road",
  "district": "6",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.21248,
  "longitude": 72.63631
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bef2"
  },
  "name": "Morbi Tahluka Police Station",
  "area": "SH-22",
  "district": "363642",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.82432,
  "longitude": 70.84725
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bef3"
  },
  "name": "Hazikhana Bazaar Police Chowki",
  "area": "Hazikhan Bazaar Road",
  "district": "Panchabatti",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.69739,
  "longitude": 72.99131
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bef4"
  },
  "name": "Haji Khana Police Chowki",
  "area": "Old Market Road",
  "district": "Panchabatti",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.69739,
  "longitude": 72.99129
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bef5"
  },
  "name": "Police Inspector Care",
  "area": "Airport Rd",
  "district": "Chowk",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.7678,
  "longitude": 72.16081
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bef6"
  },
  "name": "H Traffic Police Station Rakhial",
  "area": "Rameshwar Mahadev Cross Road",
  "district": "Hirpur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.01989,
  "longitude": 72.63297
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bef7"
  },
  "name": "Manjalpur Police Station",
  "area": "Makarpura GIDC Road",
  "district": "GIDC",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.25603,
  "longitude": 73.18076
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bef8"
  },
  "name": "Vatva Police Chowki",
  "area": "Vatva Gaon Road",
  "district": "Gam",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.95374,
  "longitude": 72.6127
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bef9"
  },
  "name": "Central Jail, Popat Para",
  "area": "Popat Para",
  "district": "Para",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.3174,
  "longitude": 70.80103
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914befa"
  },
  "name": "Dig Police",
  "area": "Indira Gandhi Road",
  "district": "Anandpur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.3023,
  "longitude": 73.1949
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914befb"
  },
  "name": "Superintendent Police Office GRP Western Railway",
  "area": "Indira Gandhi Road",
  "district": "Bazar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.3015,
  "longitude": 73.1952
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914befc"
  },
  "name": "Reserve Police Sub Inspector",
  "area": "Jamshedji Tata Road",
  "district": "Kaliawadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.94702,
  "longitude": 72.93769
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914befd"
  },
  "name": "Navsari Superintendent of Police",
  "area": "Hargovan Marg",
  "district": "Talav",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.94684,
  "longitude": 72.93795
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914befe"
  },
  "name": "Sevaliya Police Chowki",
  "area": "SH-12",
  "district": "Sevaliya",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.80826,
  "longitude": 73.34412
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914beff"
  },
  "name": "Kuwadva Road Police Station",
  "area": "NH-27",
  "district": "Navagam",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.314,
  "longitude": 70.83484
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf00"
  },
  "name": "Marin Police Station",
  "area": "State Bank Of India Atm",
  "district": "Jafarabad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.86716,
  "longitude": 71.36569
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf01"
  },
  "name": "Paniyari Police",
  "area": "Kheda To Khambhat Highway",
  "district": "Paniyari",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.3138,
  "longitude": 72.62311
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf02"
  },
  "name": "Railway Police Chowki",
  "area": "Petlad Road",
  "district": "388450",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.48526,
  "longitude": 72.80163
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf03"
  },
  "name": "Roa Puli Police Chowki",
  "area": "Anand Nagar",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.775818,
  "longitude": 72.172198
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf04"
  },
  "name": "Superintendent of Police",
  "area": "Wadia Road",
  "district": "V",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.63454,
  "longitude": 69.61525
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf05"
  },
  "name": "Police Chowki Shahid Chowk",
  "area": "Gachiwad Road",
  "district": "Mata",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.61788,
  "longitude": 72.92433
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf06"
  },
  "name": "Mogaravadi Police Chowki",
  "area": "Mogaravadi Road",
  "district": "Sandhpor",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.61242,
  "longitude": 72.93724
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf07"
  },
  "name": "Mograwadi Police Station",
  "area": "Mograwadi Road",
  "district": "Sandhpor",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.61239,
  "longitude": 72.93728
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf08"
  },
  "name": "Police Headquarter",
  "area": "Koteshwar Nagar",
  "district": "Mograwadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.60676,
  "longitude": 72.94183
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf09"
  },
  "name": "Zanda Bazar Police Chowki",
  "area": "Petlad Road",
  "district": "388450",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.477039,
  "longitude": 72.797596
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf0a"
  },
  "name": "Police Station Petlaad",
  "area": "Station Road",
  "district": "388450",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.47667,
  "longitude": 72.80314
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf0b"
  },
  "name": "Jetpur Pavi Police Choki",
  "area": "Sh11",
  "district": "Stand",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.34298,
  "longitude": 73.84067
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf0c"
  },
  "name": "Police Chowki Udyog Nagar",
  "area": "80 Feet Road",
  "district": "Wadhavan",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.7239,
  "longitude": 71.6669
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf0d"
  },
  "name": "Fatehgunj Police Circle",
  "area": "Swarnim Gujarat Ring Road",
  "district": "Fatehgunj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.32402,
  "longitude": 73.18939
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf0e"
  },
  "name": "Police Station Sikka",
  "area": "Nagani Road",
  "district": "Gram",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.43341,
  "longitude": 69.83802
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf0f"
  },
  "name": "Police Choki Manchi",
  "area": "Champaner Machi Road",
  "district": "Manchi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.464953,
  "longitude": 73.521125
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf10"
  },
  "name": "Town Police Chowki",
  "area": "Main Bazar",
  "district": "Station",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.60556,
  "longitude": 73.46361
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf11"
  },
  "name": "Libadiya Chowki",
  "area": "SH-191",
  "district": "389230",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.241074,
  "longitude": 73.589373
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf12"
  },
  "name": "Mota Varachha Police Station",
  "area": "Abarama Road",
  "district": "Varachha",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.24311,
  "longitude": 72.88452
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf13"
  },
  "name": "Gandhidham Traffic Police Chowki",
  "area": "Station Road",
  "district": "370205",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.06821,
  "longitude": 70.14453
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf14"
  },
  "name": "Police Training Senter",
  "area": "NH-51",
  "district": "362725",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.81464,
  "longitude": 70.69032
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf15"
  },
  "name": "Police Station Sarangpur",
  "area": "SH-64",
  "district": "Roshni",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.63549,
  "longitude": 73.03632
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf16"
  },
  "name": "Shitla Chowk Police Station",
  "area": "Phalgosia Road",
  "district": "Bazar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.64654,
  "longitude": 69.60399
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf17"
  },
  "name": "Tower Cross Road Police Station",
  "area": "Sh97",
  "district": "Taluka",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.12847,
  "longitude": 70.11584
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf18"
  },
  "name": "Mahila Police Station Sector 15",
  "area": "Government Primary School Sector Xvi",
  "district": "16",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.23107,
  "longitude": 72.64738
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf19"
  },
  "name": "Lions Police Chowk Mina Bazar",
  "area": "Kachiyavad",
  "district": "Bazar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02167,
  "longitude": 73.07169
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf1a"
  },
  "name": "વાંકાનેર સિટી પોલીસ સ્ટેશન",
  "area": "Dudhrej",
  "district": "Dudhrej",
  "state": "Gujarat",
  "pincode": "Dudhrej",
  "latitude": 22.7250628,
  "longitude": 71.617839
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf1b"
  },
  "name": "Pandhasara Police Chowki",
  "area": "Surat",
  "district": "395023",
  "state": "Gujarat",
  "pincode": "395023",
  "latitude": 21.141647,
  "longitude": 72.840002
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf1c"
  },
  "name": "Bhutdi Zampa Police Station",
  "area": "Vadodara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.3061237,
  "longitude": 73.2011809
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf1d"
  },
  "name": "Adalaj Police Station",
  "area": "Adalaj 382421",
  "district": "Adalaj 382421",
  "state": "Gujarat",
  "pincode": "Adalaj 382421",
  "latitude": 23.1667,
  "longitude": 72.5833
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf1e"
  },
  "name": "Cyber Crime Cell - Vadodara Range",
  "area": "",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30405,
  "longitude": 73.19727
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf1f"
  },
  "name": "Piplod Police Chowki",
  "area": "Dumas Road Near Lake View Gardens",
  "district": "Piplod",
  "state": "Gujarat",
  "pincode": "395007",
  "latitude": 21.164645,
  "longitude": 72.780145
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf20"
  },
  "name": "Bardoli division police",
  "area": "",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.1336,
  "longitude": 73.10661
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf21"
  },
  "name": "Variyavi Bazar Police Station",
  "area": "Mughal Sarai Main Road",
  "district": "Darwaja",
  "state": "Gujarat",
  "pincode": "395003",
  "latitude": 21.205106,
  "longitude": 72.823936
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf22"
  },
  "name": "Heroregis",
  "area": "",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.05896,
  "longitude": 73.97204
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf23"
  },
  "name": "Mahila Polish Station Rajkot",
  "area": "Rajkot",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.307675,
  "longitude": 70.790085
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf24"
  },
  "name": "Cyber Crime Cell - ChhotaUdepur",
  "area": "Chhota Udepur SP office",
  "district": "Udepur",
  "state": "Gujarat",
  "pincode": "391165",
  "latitude": 22.3139,
  "longitude": 74.01393
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf25"
  },
  "name": "Ghogha Jety",
  "area": "Ghogha",
  "district": "Bhavnagar",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 21.68686,
  "longitude": 72.2766
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf26"
  },
  "name": "પ્રાંત કચેરી ધોળકા",
  "area": "Dholka",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.7343188,
  "longitude": 72.4359878
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf27"
  },
  "name": "Wadi Police Station",
  "area": "Pratap Nagar Road",
  "district": "Gendi",
  "state": "Gujarat",
  "pincode": "390001",
  "latitude": 22.296613,
  "longitude": 73.210469
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf28"
  },
  "name": "Vadodra Gorva Police Station",
  "area": "Vadodara",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.3326343557,
  "longitude": 73.1575184315
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf29"
  },
  "name": "Police Station-Rajkot City A Division",
  "area": "Dhebar Road",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360001",
  "latitude": 22.296,
  "longitude": 70.80275
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf2a"
  },
  "name": "Rajkot City Police",
  "area": "Karanpara",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360001",
  "latitude": 22.290614,
  "longitude": 70.805139
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf2b"
  },
  "name": "Vallabhnagar Police Station",
  "area": "Vallabhnagar Police Station",
  "district": "Nadiad",
  "state": "Gujarat",
  "pincode": "387002",
  "latitude": 22.6906480221,
  "longitude": 72.8555933107
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf2c"
  },
  "name": "Manoharsinh jadeja",
  "area": "",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29857,
  "longitude": 70.79394
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf2d"
  },
  "name": "Police Station-Beed",
  "area": "Boath",
  "district": "504304",
  "state": "Gujarat",
  "pincode": "504304",
  "latitude": 19.45579,
  "longitude": 78.35212
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf2e"
  },
  "name": "Police Station-Raopura",
  "area": "Kothi Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390001",
  "latitude": 22.30402,
  "longitude": 73.19646
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf2f"
  },
  "name": "Police Head Office",
  "area": "Porbandar",
  "district": "360575",
  "state": "Gujarat",
  "pincode": "360575",
  "latitude": 21.634281,
  "longitude": 69.611096
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf30"
  },
  "name": "Ahambadi Police Chowki",
  "area": "Station Road",
  "district": "Nadiad",
  "state": "Gujarat",
  "pincode": "387001",
  "latitude": 22.697121,
  "longitude": 72.863249
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf31"
  },
  "name": "Judges Banglow Police Station",
  "area": "Premchand Nagar Road",
  "district": "Bunglow",
  "state": "Gujarat",
  "pincode": "380054",
  "latitude": 23.036949,
  "longitude": 72.516319
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf32"
  },
  "name": "Bhadrawa",
  "area": "Savli",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.5145006,
  "longitude": 73.1271792
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf33"
  },
  "name": "Police Station New Vejalpur",
  "area": "Vejalpur",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380051",
  "latitude": 22.996748,
  "longitude": 72.537284
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf34"
  },
  "name": "Kathi Sahab Ki Chowkdi",
  "area": "Hazrat Mazhar Kathi Marg",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.0177725,
  "longitude": 72.5709199
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf35"
  },
  "name": "Dumas Police Chowki",
  "area": "Sultanabad Dumas Main Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "394550",
  "latitude": 21.086364,
  "longitude": 72.715684
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf36"
  },
  "name": "Darbargadh Police Station",
  "area": "Darbargadh",
  "district": "Jamnagar",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.4640215789,
  "longitude": 70.0803706102
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf37"
  },
  "name": "Police Station-Junagara",
  "area": "Junagarh",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 19.86098,
  "longitude": 82.939
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf38"
  },
  "name": "Pra-nagar Police Station",
  "area": "Lodhika",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.30348968,
  "longitude": 70.79656672
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf39"
  },
  "name": "Octroi Naka",
  "area": "Ranip Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380005",
  "latitude": 23.071293,
  "longitude": 72.586331
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf3a"
  },
  "name": "Kapodra Police Station",
  "area": "Nana Varachha Road",
  "district": "Highway",
  "state": "Gujarat",
  "pincode": "395010",
  "latitude": 21.220552,
  "longitude": 72.875535
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf3b"
  },
  "name": "Kapodra Police Station",
  "area": "Surat",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 21.17,
  "longitude": 72.83
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf3c"
  },
  "name": "Morbi Police Station",
  "area": "Lati Plot Main Road",
  "district": "Morbi",
  "state": "Gujarat",
  "pincode": "363641",
  "latitude": 22.817553,
  "longitude": 70.828285
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf3d"
  },
  "name": "Pitega India",
  "area": "Ahmedabad",
  "district": "GJ",
  "state": "Gujarat",
  "pincode": "380002",
  "latitude": 23.02777,
  "longitude": 72.60028
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf3e"
  },
  "name": "Police Station-Morvi",
  "area": "Morbi",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.81309,
  "longitude": 70.83573
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf3f"
  },
  "name": "Green Police Chowki",
  "area": "Sardar Road",
  "district": "Morbi",
  "state": "Gujarat",
  "pincode": "363641",
  "latitude": 22.817699,
  "longitude": 70.836741
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf40"
  },
  "name": "Police Station Dharamvaram",
  "area": "New Bus Stand Road",
  "district": "Dharmavaram",
  "state": "Gujarat",
  "pincode": "515671",
  "latitude": 14.41239,
  "longitude": 77.71754
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf41"
  },
  "name": "Police Station Puna Pi Zala",
  "area": "Puna Kumbhariya Road",
  "district": "Industrial",
  "state": "Gujarat",
  "pincode": "395010",
  "latitude": 21.189338,
  "longitude": 72.872123
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf42"
  },
  "name": "Police Station-Jamkandorna",
  "area": "SH-26",
  "district": "Mewasa",
  "state": "Gujarat",
  "pincode": "360405",
  "latitude": 21.89226,
  "longitude": 70.4958
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf43"
  },
  "name": "ખેડા ટાઉન પોલીસ સ્ટેશન",
  "area": "Kheda",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.75054,
  "longitude": 72.68653
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf44"
  },
  "name": "LG Corner Police Chowki",
  "area": "LG Corner",
  "district": "of",
  "state": "Gujarat",
  "pincode": "380008",
  "latitude": 23.000192,
  "longitude": 72.607034
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf45"
  },
  "name": "Station Police Chowki",
  "area": "Nandelaw Road",
  "district": "Bharuch",
  "state": "Gujarat",
  "pincode": "392001",
  "latitude": 21.703557,
  "longitude": 72.998818
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf46"
  },
  "name": "Police Station-Junagadh",
  "area": "SH-30",
  "district": "Junagadh",
  "state": "Gujarat",
  "pincode": "362001",
  "latitude": 21.52502,
  "longitude": 70.45986
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf47"
  },
  "name": "Mora Police Station",
  "area": "Surat",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "394517",
  "latitude": 21.178535,
  "longitude": 72.658537
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf48"
  },
  "name": "Mahila Police Station-Nagarwada",
  "area": "Kothi Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390001",
  "latitude": 22.30484,
  "longitude": 73.19271
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf49"
  },
  "name": "Vavta Police Station",
  "area": "Ahmedabad",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.971502,
  "longitude": 72.5910288
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf4a"
  },
  "name": "Town Police Chowki",
  "area": "Station Road",
  "district": "Khambhalia",
  "state": "Gujarat",
  "pincode": "361305",
  "latitude": 22.20806,
  "longitude": 69.653254
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf4b"
  },
  "name": "Tarapur Town Police Chowki",
  "area": "Station Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "388180",
  "latitude": 22.489375,
  "longitude": 72.656053
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf4c"
  },
  "name": "Dandiya Market Police Chowki",
  "area": "Dandiya Market Road",
  "district": "Farma",
  "state": "Gujarat",
  "pincode": "Bharuch 392001",
  "latitude": 21.698443,
  "longitude": 72.993422
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf4d"
  },
  "name": "Police Station-Rajkot Taluka",
  "area": "Rajkot",
  "district": "360001",
  "state": "Gujarat",
  "pincode": "360001",
  "latitude": 22.3092137,
  "longitude": 70.7973888
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf4e"
  },
  "name": "Valsad Police Station",
  "area": "Railway station",
  "district": "390001",
  "state": "Gujarat",
  "pincode": "Valsad 390001",
  "latitude": 20.609977,
  "longitude": 72.929882
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf4f"
  },
  "name": "Nadiad Police Chowki",
  "area": "Station Road",
  "district": "387001",
  "state": "Gujarat",
  "pincode": "Nadiad 387001",
  "latitude": 22.6875132,
  "longitude": 72.838836
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf50"
  },
  "name": "Police Chowki",
  "area": "Chandra Shekhar Azad Marg",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380024",
  "latitude": 23.028347,
  "longitude": 72.624729
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf51"
  },
  "name": "Police Station-Godhara",
  "area": "Godhra 389001",
  "district": "Godhra 389001",
  "state": "Gujarat",
  "pincode": "Godhra 389001",
  "latitude": 22.77602,
  "longitude": 73.62757
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf52"
  },
  "name": "State Reserve Police Force Group VII",
  "area": "Nadiad 387001",
  "district": "Nadiad 387001",
  "state": "Gujarat",
  "pincode": "Nadiad 387001",
  "latitude": 22.716027,
  "longitude": 72.866137
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf53"
  },
  "name": "Umar Police Station",
  "area": "Maa Thakur Bhai Desai Marg",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395001",
  "latitude": 21.17881,
  "longitude": 72.80399
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf54"
  },
  "name": "Umra Police Station",
  "area": "Surat",
  "district": "395001",
  "state": "Gujarat",
  "pincode": "395001",
  "latitude": 21.1791751864,
  "longitude": 72.8038351751
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf55"
  },
  "name": "Naroha Police Station",
  "area": "Ahmedabad",
  "district": "382350",
  "state": "Gujarat",
  "pincode": "382350",
  "latitude": 23.04958,
  "longitude": 72.657867
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf56"
  },
  "name": "Police Station-Bhagidari",
  "area": "NH-8A",
  "district": "Bavla",
  "state": "Gujarat",
  "pincode": "382230",
  "latitude": 22.6400636,
  "longitude": 72.1961488
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf57"
  },
  "name": "Police Station-Karanj",
  "area": "Nagardevi Bhadrakali Chowk",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.0244054,
  "longitude": 72.5820024
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf58"
  },
  "name": "Police Station-Deepak Roll",
  "area": "Junagadh",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "362001",
  "latitude": 21.5294,
  "longitude": 70.44967
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf59"
  },
  "name": "City B Police Jamnagar",
  "area": "Near Gg Hospital",
  "district": "361006",
  "state": "Gujarat",
  "pincode": "Jamnagar 361006",
  "latitude": 22.46916,
  "longitude": 70.07095
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf5a"
  },
  "name": "Varacha Police Station",
  "area": "Lambay Hanuman Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395010",
  "latitude": 21.204482,
  "longitude": 72.84409
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf5b"
  },
  "name": "Cyber Crime Cell, Crime Branch Ahmedabad",
  "area": "Bungalow Number 15",
  "district": "IPS",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.0653563,
  "longitude": 72.5983813
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf5c"
  },
  "name": "Kalupur Police Station",
  "area": "Relief Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380002",
  "latitude": 23.028201,
  "longitude": 72.59401
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf5d"
  },
  "name": "Bopal Police Station",
  "area": "Ahmedabad",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.03324014,
  "longitude": 72.46590162
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf5e"
  },
  "name": "Police Station-Shikarpura",
  "area": "SH-27",
  "district": "Burhanpur",
  "state": "Gujarat",
  "pincode": "450331",
  "latitude": 21.29623,
  "longitude": 76.22238
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf5f"
  },
  "name": "Upleta Police Station",
  "area": "Vikas Path",
  "district": "360490",
  "state": "Gujarat",
  "pincode": "Upleta 360490",
  "latitude": 21.747343,
  "longitude": 70.275406
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf60"
  },
  "name": "Mahemdavad Police Station",
  "area": "Mahemdavad",
  "district": "Mahemdavad",
  "state": "Gujarat",
  "pincode": "Mahemdavad",
  "latitude": 22.8205939,
  "longitude": 72.757253
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf61"
  },
  "name": "Police Station-Dabhoi",
  "area": "Dabhoi 391110",
  "district": "Dabhoi 391110",
  "state": "Gujarat",
  "pincode": "Dabhoi 391110",
  "latitude": 22.13297,
  "longitude": 73.41174
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf62"
  },
  "name": "Police Station-Jila Highway",
  "area": "SH-30",
  "district": "Junagadh",
  "state": "Gujarat",
  "pincode": "362001",
  "latitude": 21.52502,
  "longitude": 70.45986
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf63"
  },
  "name": "Sardar Estate Police Station",
  "area": "Swarnim Gujarat Ring Road",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30996,
  "longitude": 73.23622
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf64"
  },
  "name": "Police Station-Naliya",
  "area": "Near Nh8a",
  "district": "Rural",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.25735,
  "longitude": 68.83621
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf65"
  },
  "name": "Golden Bridge Police Chowki",
  "area": "NH-64",
  "district": "392001",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.68584,
  "longitude": 73.00899
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf66"
  },
  "name": "Bhatiya Outpost Police Chowki",
  "area": "Kalyanpur 361315",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.09097,
  "longitude": 69.2718
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf67"
  },
  "name": "Dharangdar Taluka Police",
  "area": "SH-7",
  "district": "363310",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.99657,
  "longitude": 71.47013
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf68"
  },
  "name": "Forest Police Chowki",
  "area": "Sokhada",
  "district": "Navagam",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.3262,
  "longitude": 70.86286
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf69"
  },
  "name": "Aatkot Outpost Police Chowki",
  "area": "SH-1",
  "district": "Atkot",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.01173,
  "longitude": 71.14574
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf6a"
  },
  "name": "Police Station Manar",
  "area": "Manar",
  "district": "Bhavnagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.4175,
  "longitude": 72.1589
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf6b"
  },
  "name": "Police Chowki New Laxmi Nagar",
  "area": "SH-5",
  "district": "383315",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.45299,
  "longitude": 73.31663
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf6c"
  },
  "name": "Police Sub Inspector Office Kheda Camp",
  "area": "Kheda Camp Vithalpura Road",
  "district": "Camp",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.75256,
  "longitude": 72.70706
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf6d"
  },
  "name": "Sachin Gidc Police Station",
  "area": "Sachin GIDC Road 6",
  "district": "GIDC",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.10083,
  "longitude": 72.86433
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf6e"
  },
  "name": "Police Station-Dayapar",
  "area": "SH-42",
  "district": "Dayapar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.631,
  "longitude": 68.903
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf6f"
  },
  "name": "Nayab Police Adhikshak Kacheri",
  "area": "SH-62",
  "district": "389140",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.83135,
  "longitude": 73.98906
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf70"
  },
  "name": "Ashwin Check Police Chowki",
  "area": "Upleta 360490",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.73683,
  "longitude": 70.28462
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf71"
  },
  "name": "Ekbalgad Police Station",
  "area": "Iqbalgadh",
  "district": "385135",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.34934,
  "longitude": 72.53636
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf72"
  },
  "name": "Sanjan Out Post Police Station",
  "area": "Sanjan Railway Station Road",
  "district": "Railway",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.193,
  "longitude": 72.82109
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf73"
  },
  "name": "Nani Khadol Police Chowki",
  "area": "Nani Khadol",
  "district": "387335",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.81091,
  "longitude": 72.98191
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf74"
  },
  "name": "Police Station Patel Society",
  "area": "SH-10",
  "district": "383245",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.76968,
  "longitude": 73.2406
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf75"
  },
  "name": "Modhera Police Chowki",
  "area": "Rohitvas Mohlla",
  "district": "Ki",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.5821,
  "longitude": 72.13847
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf76"
  },
  "name": "Navsari Police Chowki",
  "area": "Nh8",
  "district": "Kabilpore",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.94711,
  "longitude": 72.95899
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf77"
  },
  "name": "Bhilad Police Check Post Station",
  "area": "Nh8",
  "district": "Rto",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.26141,
  "longitude": 72.88469
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf78"
  },
  "name": "Police Headquarter",
  "area": "Koteshwar Nagar",
  "district": "Mograwadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.6068,
  "longitude": 72.9419
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf79"
  },
  "name": "Deva Police Chowki",
  "area": "SH-69",
  "district": "388260",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.177,
  "longitude": 73.46902
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf7a"
  },
  "name": "Virampur Police Station",
  "area": "SH-54",
  "district": "385001",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.26796,
  "longitude": 72.66406
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf7b"
  },
  "name": "Sub Division Office Danta",
  "area": "Ambaji Highway",
  "district": "Police",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.18508,
  "longitude": 72.75926
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf7c"
  },
  "name": "Danta Police Station",
  "area": "Danta",
  "district": "385120",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.18547,
  "longitude": 72.76057
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf7d"
  },
  "name": "Bahucharaji Police Station",
  "area": "SH-7",
  "district": "384210",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.4984,
  "longitude": 72.0447
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf7e"
  },
  "name": "Sp Office, Gandhinagar",
  "area": "sector 27",
  "district": "Gandhinagar",
  "state": "Gujarat",
  "pincode": "382028",
  "latitude": 23.253849665,
  "longitude": 72.6519323365
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf7f"
  },
  "name": "Police Chowki",
  "area": "Lambay Hanuman Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395003",
  "latitude": 21.204788,
  "longitude": 72.844849
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf80"
  },
  "name": "Balubhai B Chowki",
  "area": "Moti Bazar Road",
  "district": "396445",
  "state": "Gujarat",
  "pincode": "Navsari 396445",
  "latitude": 20.953971,
  "longitude": 72.931135
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf81"
  },
  "name": "Superintendent of Police Office",
  "area": "Vapi 396191",
  "district": "Vapi 396191",
  "state": "Gujarat",
  "pincode": "Vapi 396191",
  "latitude": 20.378591,
  "longitude": 72.910243
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf82"
  },
  "name": "Tarwal Police Chowki",
  "area": "Palanpur Patia Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395009",
  "latitude": 21.207925,
  "longitude": 72.795582
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf83"
  },
  "name": "Police Station-Zalod",
  "area": "Santrampur",
  "district": "389260",
  "state": "Gujarat",
  "pincode": "389260",
  "latitude": 23.11032,
  "longitude": 73.95354
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf84"
  },
  "name": "Palsana Police Station",
  "area": "Nr Silicon Township",
  "district": "Canal",
  "state": "Gujarat",
  "pincode": "394315",
  "latitude": 21.086292,
  "longitude": 72.98781
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf85"
  },
  "name": "Una Police Station",
  "area": "Una Main Road",
  "district": "Una",
  "state": "Gujarat",
  "pincode": "362560",
  "latitude": 20.821038,
  "longitude": 71.042206
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf86"
  },
  "name": "Police Station-Tawer",
  "area": "Una",
  "district": "362560",
  "state": "Gujarat",
  "pincode": "362560",
  "latitude": 20.82015,
  "longitude": 71.04229
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf87"
  },
  "name": "Maharashtra Police Thane",
  "area": "Talasari Umbergaon Road",
  "district": "Talasri",
  "state": "Gujarat",
  "pincode": "401606",
  "latitude": 20.148709,
  "longitude": 72.830948
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf88"
  },
  "name": "Bhadra Bistar Police Station",
  "area": "Bhadra Bistar",
  "district": "Patan",
  "state": "Gujarat",
  "pincode": "384265",
  "latitude": 23.847665,
  "longitude": 72.111001
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf89"
  },
  "name": "Police Colony",
  "area": "Ashapuri Road",
  "district": "396445",
  "state": "Gujarat",
  "pincode": "Navsari 396445",
  "latitude": 20.94728,
  "longitude": 72.92321
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf8a"
  },
  "name": "Police Station-Golapur",
  "area": "Patan",
  "district": "384265",
  "state": "Gujarat",
  "pincode": "384265",
  "latitude": 23.82132,
  "longitude": 72.1257
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf8b"
  },
  "name": "Dadilimda Police Station",
  "area": "Dadilimda",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380028",
  "latitude": 22.997092,
  "longitude": 72.583526
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf8c"
  },
  "name": "Police Station Vijapur",
  "area": "Vijapur 382870",
  "district": "Vijapur 382870",
  "state": "Gujarat",
  "pincode": "Vijapur 382870",
  "latitude": 23.56726,
  "longitude": 72.74567
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf8d"
  },
  "name": "Ramol Police Station",
  "area": "Ahmedabad",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.9893055419,
  "longitude": 72.6424135175
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf8e"
  },
  "name": "Mansa Police Station",
  "area": "College Road",
  "district": "Computer",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.42884,
  "longitude": 72.65286
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf8f"
  },
  "name": "Shaskiy Railway Police Station",
  "area": "Station Road",
  "district": "Gunj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.60109,
  "longitude": 72.38948
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf90"
  },
  "name": "Vibhakta Police Adhikari Kacheri",
  "area": "GPO Road",
  "district": "Ganj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.56011,
  "longitude": 72.96642
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf91"
  },
  "name": "Chamanpura Housing Police Chowki",
  "area": "Umiyanagar Road",
  "district": "Police",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.05103,
  "longitude": 72.61268
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf92"
  },
  "name": "Chamnpura Police Station",
  "area": "Meghani Nagar Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.05088,
  "longitude": 72.61285
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf93"
  },
  "name": "Gender Resource Center Dhanera",
  "area": "Dhanera Railway Station",
  "district": "385310",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.50587,
  "longitude": 72.02973
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf94"
  },
  "name": "Police Superintendent Office",
  "area": "SH-83",
  "district": "College",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.54395,
  "longitude": 72.9608
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf95"
  },
  "name": "Juna Fuvara Police Line Panch Hatdi",
  "area": "Porbandar Road",
  "district": "Hatdi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.63863,
  "longitude": 69.61053
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf96"
  },
  "name": "Traffic Police Station Patan",
  "area": "Tin Darwaja Road",
  "district": "Gate",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.8503,
  "longitude": 72.1138
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf97"
  },
  "name": "Bareja Police Chowki",
  "area": "Bareja",
  "district": "Bareja",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.85622,
  "longitude": 72.5945
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf98"
  },
  "name": "Asarwa Police Chowki",
  "area": "Dada Hari Ni Vav Road",
  "district": "School",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.04049,
  "longitude": 72.60562
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf99"
  },
  "name": "C Division Police Station",
  "area": "Gandhi Gram Road",
  "district": "Area",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.50526,
  "longitude": 70.45777
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf9a"
  },
  "name": "DY Office of the Inspector General Of Police",
  "area": "Bilkha Road",
  "district": "Dhara",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.5069,
  "longitude": 70.46385
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf9b"
  },
  "name": "Aproch Police Chowki Thakkarbapa Nagar",
  "area": "India Colony Road",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.03911,
  "longitude": 72.63936
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf9c"
  },
  "name": "Gandhi Beat Police Chowki",
  "area": "Tower Road",
  "district": "College",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.92153,
  "longitude": 72.91888
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf9d"
  },
  "name": "Mill Vistar Police Chowki",
  "area": "Mafatlal Colony Road",
  "district": "Block",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.9462,
  "longitude": 72.913
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf9e"
  },
  "name": "Moti Bazzar Police Station",
  "area": "City School Road",
  "district": "Mata",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.17237,
  "longitude": 72.44041
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bf9f"
  },
  "name": "Goya Gate Police Chowki",
  "area": "Makarpura Road",
  "district": "Masjid",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.28398,
  "longitude": 73.20827
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfa0"
  },
  "name": "Police Station Nayaknagar",
  "area": "Nayaknagar",
  "district": "Sabarkadha",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.83761,
  "longitude": 73.00443
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfa1"
  },
  "name": "Alka Police Chowki",
  "area": "Railway Station Road",
  "district": "Darbargadh",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.77842,
  "longitude": 72.1388
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfa2"
  },
  "name": "Police Chowki Bhadkodara",
  "area": "Bank Of Baroda Atm",
  "district": "Bhadkodara",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.60466,
  "longitude": 73.01361
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfa3"
  },
  "name": "Main Police Station",
  "area": "Saroo Section Road",
  "district": "Line",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.47759,
  "longitude": 70.05115
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfa4"
  },
  "name": "District Police Headquarter",
  "area": "Saru Section Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.47741,
  "longitude": 70.05101
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfa5"
  },
  "name": "Changoder Aour Post Police Chowki",
  "area": "Changodar Road",
  "district": "Changodar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.93023,
  "longitude": 72.448
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfa6"
  },
  "name": "Narayan Police Chowki",
  "area": "Vadodara To Kevdi Eco Campsite Road",
  "district": "Lake",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.50141,
  "longitude": 73.47745
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfa7"
  },
  "name": "Shree Swaminarayan Police Chokdi",
  "area": "Halol Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.50146,
  "longitude": 73.47744
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfa8"
  },
  "name": "Ring Road Police Chowki",
  "area": "Damjibhai Dudhagari Marg",
  "district": "Gundavadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.28847,
  "longitude": 70.81029
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfa9"
  },
  "name": "Police Heardquarter",
  "area": "Palanpur Abu Highway",
  "district": "Gurukul",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.19331,
  "longitude": 72.43698
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfaa"
  },
  "name": "Manshrovar Police Chowki",
  "area": "Mansarovar Road",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.18411,
  "longitude": 72.4333
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfab"
  },
  "name": "S T Police Chowki",
  "area": "Srinath Dham Haweli Road",
  "district": "Dhatia",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.25683,
  "longitude": 69.66851
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfac"
  },
  "name": "Subhash Nagar Police Station",
  "area": "Subhash Nagar",
  "district": "387001",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.69857,
  "longitude": 72.85477
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfad"
  },
  "name": "Police Chowki Tower Building",
  "area": "Malan",
  "district": "382845",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.42651,
  "longitude": 72.65733
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfae"
  },
  "name": "Mahila Police Station",
  "area": "Adipur Police Station",
  "district": "5",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.07441,
  "longitude": 70.09779
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfaf"
  },
  "name": "Adipur Police Station",
  "area": "Rambaug Road",
  "district": "370205",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.07441,
  "longitude": 70.09779
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfb0"
  },
  "name": "Out Post Police Station Masiya",
  "area": "SH-5",
  "district": "389230",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.24316,
  "longitude": 73.58874
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfb1"
  },
  "name": "Bhagawatipara Police Station",
  "area": "Bhagwati Para Main Road",
  "district": "Bhagwatipara",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.31644,
  "longitude": 70.80834
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfb2"
  },
  "name": "Barej Beat Police Station",
  "area": "Dandi Heritage Route",
  "district": "Ali",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.91907,
  "longitude": 72.59456
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfb3"
  },
  "name": "Varnama Out Post Police Station",
  "area": "Varanama Road",
  "district": "Temple",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.18191,
  "longitude": 73.18188
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfb4"
  },
  "name": "Kelanpur Out post Varnama Police Station",
  "area": "Dabhoi Road",
  "district": "Taluka",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.24014,
  "longitude": 73.27023
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfb5"
  },
  "name": "Police Chowki Valaji Ki Dhani",
  "area": "NH-68",
  "district": "343041",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.66963,
  "longitude": 71.76506
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfb6"
  },
  "name": "Delhi Darvaj Policeh Chowki",
  "area": "Kasturba Gandhi Road",
  "district": "Chakla",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.03774,
  "longitude": 72.58818
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfb7"
  },
  "name": "Office of Commissioner",
  "area": "Bacher Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.6141,
  "longitude": 72.9331
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfb8"
  },
  "name": "Jodiya Police Station",
  "area": "Jodiya 361250",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.69354,
  "longitude": 70.31498
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfb9"
  },
  "name": "Police Station-Bhavpara",
  "area": "NH-51",
  "district": "360579",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.82665,
  "longitude": 69.39463
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfba"
  },
  "name": "Ellisbridge Police Station",
  "area": "Pritham Rai Road",
  "district": "Bridge",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02284,
  "longitude": 72.5716
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfbb"
  },
  "name": "Sonini Chali Chowki",
  "area": "NH-47",
  "district": "387340",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.90137,
  "longitude": 73.06221
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfbc"
  },
  "name": "Police Station Punsri",
  "area": "Sh57 Sagpur Road",
  "district": "Punsri",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.39642,
  "longitude": 73.11
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfbd"
  },
  "name": "Kanabha Police Station",
  "area": "Odhav Singarwa Road",
  "district": "Kathwada",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.01439,
  "longitude": 72.71517
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfbe"
  },
  "name": "Kasendra Police Station",
  "area": "Sh4",
  "district": "Village",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.89313,
  "longitude": 72.48824
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfbf"
  },
  "name": "Khakhriya Out Post Police Station",
  "area": "SH-150",
  "district": "391510",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.54213,
  "longitude": 73.4067
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfc0"
  },
  "name": "Adadara Out Police Station",
  "area": "SH-150",
  "district": "389341",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.64614,
  "longitude": 73.61883
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfc1"
  },
  "name": "Bantwa Police Station",
  "area": "Bantwa",
  "district": "362620",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.49234,
  "longitude": 70.07585
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfc2"
  },
  "name": "B Division Police Station Ramnathpara",
  "area": "Ramnath Para Main Road",
  "district": "Para",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29191,
  "longitude": 70.81343
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfc3"
  },
  "name": "Sutrapada Police Station",
  "area": "Sutrapada",
  "district": "362275",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.84266,
  "longitude": 70.48629
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfc4"
  },
  "name": "Desa City South Police",
  "area": "Deesa City Police Station",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.25573,
  "longitude": 72.17596
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfc5"
  },
  "name": "Juna Police Station",
  "area": "Kaliawadi",
  "district": "Kui",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.9513,
  "longitude": 72.9376
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfc6"
  },
  "name": "Juna Police Station",
  "area": "Nh51",
  "district": "Ground",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.2562,
  "longitude": 69.95964
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfc7"
  },
  "name": "Damavav Out Police Station",
  "area": "SH-150",
  "district": "389380",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.7041,
  "longitude": 73.757
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfc8"
  },
  "name": "Bholav Police Chowki",
  "area": "College Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.70905,
  "longitude": 73.00083
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfc9"
  },
  "name": "Police Petlad Police Station Nagarkuva",
  "area": "Petlad Station Road",
  "district": "388450",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.48115,
  "longitude": 72.80208
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfca"
  },
  "name": "Tharad Police Station",
  "area": "Tharad",
  "district": "385565",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.3931,
  "longitude": 71.62616
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfcb"
  },
  "name": "Vishal Bav Police Chowki",
  "area": "Jawahar Road",
  "district": "Chowk",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.51587,
  "longitude": 70.46548
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfcc"
  },
  "name": "Umeta Out Police Chowki",
  "area": "State Highway 11",
  "district": "388510",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.34074,
  "longitude": 73.04732
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfcd"
  },
  "name": "Rakhiyal Police Station",
  "area": "Rakhial",
  "district": "Station",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.25129,
  "longitude": 72.90294
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfce"
  },
  "name": "Dabriya Chowk Police Station",
  "area": "Bakrawadi Road",
  "district": "Baranpura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29338,
  "longitude": 73.20822
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfcf"
  },
  "name": "Pratin Police Chowki",
  "area": "Gujarat Sh76",
  "district": "Police",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.62501,
  "longitude": 73.00342
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfd0"
  },
  "name": "Kawant Police Station",
  "area": "Kawant Road",
  "district": "Kawant",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.09076,
  "longitude": 74.05609
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfd1"
  },
  "name": "Limbdi Police Station",
  "area": "Nh8a",
  "district": "Limdi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.57138,
  "longitude": 71.79899
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfd2"
  },
  "name": "Railway Police Chowki Limbdi",
  "area": "Railway Station Road",
  "district": "Limdi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.56615,
  "longitude": 71.78987
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfd3"
  },
  "name": "Vijalpur Police Chowki",
  "area": "Jalalpur Road",
  "district": "Jalalpore",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.94957,
  "longitude": 72.91171
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfd4"
  },
  "name": "Vijalpur Udyog Nagar Police Chowki",
  "area": "Vijal Por Road",
  "district": "Vijalpore",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.94369,
  "longitude": 72.92054
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfd5"
  },
  "name": "Police Station-Visavada",
  "area": "Nh8e Porbandar Road",
  "district": "360579",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.77131,
  "longitude": 69.4546
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfd6"
  },
  "name": "Office of The Additional DGP",
  "area": "Keshav Nagar Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.0683,
  "longitude": 72.58398
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfd7"
  },
  "name": "Ghatlodia Police Station",
  "area": "Ghatlidiya Police Station Road",
  "district": "Naranpura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.05777,
  "longitude": 72.54344
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfd8"
  },
  "name": "Ghatlodia Police Line",
  "area": "Somnath Mahadev Mandir",
  "district": "Ghatlodiya",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.07492,
  "longitude": 72.54103
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfd9"
  },
  "name": "Circle Police Katchery",
  "area": "Chandulala Sukhalal Mehata Road",
  "district": "Bagh",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.7256,
  "longitude": 71.6284
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfda"
  },
  "name": "Ghavat Police Chowki",
  "area": "Bharuch Road",
  "district": "Bazar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.04901,
  "longitude": 73.12757
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfdb"
  },
  "name": "Bodakdev Police Chowki",
  "area": "Sarkhej Gandhinagar Highway Service Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.0383,
  "longitude": 72.51203
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfdc"
  },
  "name": "Althan Police Chowki",
  "area": "Azad Nagar Main Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.15828,
  "longitude": 72.81118
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfdd"
  },
  "name": "Police Station Rajpipla",
  "area": "Sh160 Narmda Road",
  "district": "Vadia",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.86637,
  "longitude": 73.51455
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfde"
  },
  "name": "Rustampura Police Station",
  "area": "Hajirat Akbar Sahib Road",
  "district": "Rushtampura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.18933,
  "longitude": 72.83238
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfdf"
  },
  "name": "Magol Police Station",
  "area": "Kumbhariya Road",
  "district": "Patiya",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.18995,
  "longitude": 72.8686
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfe0"
  },
  "name": "Malekpur Out Post Lunavada",
  "area": "Himmat Nagar Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.23503,
  "longitude": 73.73175
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfe1"
  },
  "name": "Shahibag Police Chowki",
  "area": "Airport Road",
  "district": "Police",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.05044,
  "longitude": 72.59338
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfe2"
  },
  "name": "New Police Parade Ground, HQ, Lunawada",
  "area": "Lunavada",
  "district": "Lunavada",
  "state": "Gujarat",
  "pincode": "Lunavada",
  "latitude": 23.1252831,
  "longitude": 73.602205
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfe3"
  },
  "name": "Kasak Police Chowki",
  "area": "Kasak Chowk",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "Bharuch 392002",
  "latitude": 21.703425,
  "longitude": 73.002464
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfe4"
  },
  "name": "Police Station Dani Limda",
  "area": "Swaminarayan College Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380028",
  "latitude": 22.99773,
  "longitude": 72.57985
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfe5"
  },
  "name": "Police Station Fatehgunj",
  "area": "Chani Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390008",
  "latitude": 22.34284,
  "longitude": 73.177152
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfe6"
  },
  "name": "Police Station-Sama",
  "area": "Vadodara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.34602,
  "longitude": 73.17775
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfe7"
  },
  "name": "Sama Police Station",
  "area": "New Narmada Colony",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "390008",
  "latitude": 22.346274,
  "longitude": 73.177584
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfe8"
  },
  "name": "Police Station-Vatva",
  "area": "Vatva Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "382440",
  "latitude": 22.95789,
  "longitude": 72.61201
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfe9"
  },
  "name": "Vatva Police Station",
  "area": "Near Golden Cinema",
  "district": "Vatva",
  "state": "Gujarat",
  "pincode": "382405",
  "latitude": 22.957777,
  "longitude": 72.611406
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfea"
  },
  "name": "Vatva Police Chowki",
  "area": "Vatva Gam",
  "district": "Chok",
  "state": "Gujarat",
  "pincode": "382440",
  "latitude": 22.953593,
  "longitude": 72.613014
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfeb"
  },
  "name": "Narol Police Station",
  "area": "Nh8",
  "district": "Aslali",
  "state": "Gujarat",
  "pincode": "382405",
  "latitude": 22.959709,
  "longitude": 72.590791
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfec"
  },
  "name": "Police Station Kotda Sangani",
  "area": "Gondal",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 21.9618823,
  "longitude": 70.7942281
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfed"
  },
  "name": "Hatkeshwar Police Chowki",
  "area": "Near Hatkeshwar Circle",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380008",
  "latitude": 22.99916,
  "longitude": 72.624248
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfee"
  },
  "name": "Police Station Gotri",
  "area": "Gotri Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390015",
  "latitude": 22.312846949,
  "longitude": 73.145873267
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfef"
  },
  "name": "Police Station-Amroli",
  "area": "Surat",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.23816,
  "longitude": 72.84884
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bff0"
  },
  "name": "Kapadvanj Town Police Station",
  "area": "Kapadvanj 387620",
  "district": "Kapadvanj 387620",
  "state": "Gujarat",
  "pincode": "Kapadvanj 387620",
  "latitude": 23.026867344,
  "longitude": 73.068749378
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bff1"
  },
  "name": "Police Station Karelibaug",
  "area": "Transport Office Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390018",
  "latitude": 22.30727,
  "longitude": 73.20452
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bff2"
  },
  "name": "Karelibaug Police Station",
  "area": "Vadodara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.3072457314,
  "longitude": 73.2044416666
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bff3"
  },
  "name": "Police Thana Rampur",
  "area": "Station Road",
  "district": "457993",
  "state": "Gujarat",
  "pincode": "Ranapur 457993",
  "latitude": 22.6488,
  "longitude": 74.5194292
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bff4"
  },
  "name": "Superintendent of Police Kachchh Office",
  "area": "Swami Narayan Main Road",
  "district": "370001",
  "state": "Gujarat",
  "pincode": "Bhuj 370001",
  "latitude": 23.243086,
  "longitude": 69.666508
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bff5"
  },
  "name": "Police Station-Vadinar",
  "area": "Khambhaliya",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "361010",
  "latitude": 22.39852,
  "longitude": 69.71639
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bff6"
  },
  "name": "Police Station-Bavla",
  "area": "SH-74",
  "district": "Bavla",
  "state": "Gujarat",
  "pincode": "382220",
  "latitude": 22.82793,
  "longitude": 72.3685
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bff7"
  },
  "name": "Gandhidham City Traffic Police Station",
  "area": "Sardar Patel Circle",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "Gandhidham 370201",
  "latitude": 23.068307,
  "longitude": 70.144287
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bff8"
  },
  "name": "Police Station-Dhasa",
  "area": "Gadhada",
  "district": "Gadhada",
  "state": "Gujarat",
  "pincode": "Gadhada",
  "latitude": 21.783949542,
  "longitude": 71.517216452
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bff9"
  },
  "name": "Kishu Mali Ni Bethak",
  "area": "Vadodara",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.2971675,
  "longitude": 73.2015731
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bffa"
  },
  "name": "Police Station Rakhial",
  "area": "In Side Chhotalal Ni Chali L Type",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "380023",
  "latitude": 23.021455,
  "longitude": 72.622875
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bffb"
  },
  "name": "Tadipatri Rural Police Station",
  "area": "Tadipatri",
  "district": "Tadipatri",
  "state": "Gujarat",
  "pincode": "Tadipatri",
  "latitude": 14.9045,
  "longitude": 78.01992
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bffc"
  },
  "name": "Sabrmati Central Jail",
  "area": "Sabarmati",
  "district": "Ahmedabad-Gujarat",
  "state": "Gujarat",
  "pincode": "380005",
  "latitude": 23.0752850842,
  "longitude": 72.5856714177
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bffd"
  },
  "name": "City Police Line",
  "area": "Valsad 396001",
  "district": "Valsad 396001",
  "state": "Gujarat",
  "pincode": "Valsad 396001",
  "latitude": 20.606871002,
  "longitude": 72.928419062
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bffe"
  },
  "name": "Nava Vadaj Police Station",
  "area": "New Vadaj Ring Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380027",
  "latitude": 23.06253,
  "longitude": 72.58012
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914bfff"
  },
  "name": "Vatva GIDC Police Station",
  "area": "Opposite Bombay Condactar Factory",
  "district": "Water",
  "state": "Gujarat",
  "pincode": "382445",
  "latitude": 22.95991,
  "longitude": 72.63675
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c000"
  },
  "name": "Mahemdabad Police Chowki",
  "area": "Mahemdavad 387130",
  "district": "Mahemdavad 387130",
  "state": "Gujarat",
  "pincode": "Mahemdavad 387130",
  "latitude": 22.819797,
  "longitude": 72.753045
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c001"
  },
  "name": "Madhupura Police Station",
  "area": "Ahmedabad",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.0427052394,
  "longitude": 72.5814602909
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c002"
  },
  "name": "Police Station-Radhanpur",
  "area": "NH-15",
  "district": "385340",
  "state": "Gujarat",
  "pincode": "Radhanpur 385340",
  "latitude": 23.83225,
  "longitude": 71.62266
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c003"
  },
  "name": "Chandkheda Police Station",
  "area": "IOC Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "382428",
  "latitude": 23.114798,
  "longitude": 72.580894
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c004"
  },
  "name": "Police Chowki Dudheshwar",
  "area": "Dudheshwar Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380004",
  "latitude": 23.047255,
  "longitude": 72.583097
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c005"
  },
  "name": "Police Station-Khadiya",
  "area": "Ahmedabad",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.0169447,
  "longitude": 72.59437
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c006"
  },
  "name": "Ellis Bridge Police Line",
  "area": "Ahmedabad",
  "district": "380006",
  "state": "Gujarat",
  "pincode": "380006",
  "latitude": 23.026003,
  "longitude": 72.563976
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c007"
  },
  "name": "police station-Shaher kotda",
  "area": "Matergate Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380002",
  "latitude": 23.03128,
  "longitude": 72.60317
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c008"
  },
  "name": "Joravarnagar Police Station",
  "area": "Dudhrej 363001",
  "district": "Dudhrej 363001",
  "state": "Gujarat",
  "pincode": "Dudhrej 363001",
  "latitude": 22.719041,
  "longitude": 71.628431
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c009"
  },
  "name": "Nanpura Police Station",
  "area": "Chowki Street",
  "district": "Timaliawad",
  "state": "Gujarat",
  "pincode": "395001",
  "latitude": 21.1902974,
  "longitude": 72.8154483
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c00a"
  },
  "name": "Navrangpura Police Station",
  "area": "Navrangpura",
  "district": "Navrangpura",
  "state": "Gujarat",
  "pincode": "380009",
  "latitude": 23.038253,
  "longitude": 72.554591
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c00b"
  },
  "name": "Nani Vavdi Chowki",
  "area": "Morbi 363641",
  "district": "Morbi 363641",
  "state": "Gujarat",
  "pincode": "Morbi 363641",
  "latitude": 22.825688,
  "longitude": 70.810419
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c00c"
  },
  "name": "Khadodra Police Station",
  "area": "Near Jogani Temple",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "395002",
  "latitude": 21.17664,
  "longitude": 72.831731
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c00d"
  },
  "name": "Ramnathpara Police Station",
  "area": "Rajkot",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29159707,
  "longitude": 70.81440804
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c00e"
  },
  "name": "Gomtipur Police Head Quarters",
  "area": "Ahmedabad",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.0333,
  "longitude": 72.6167
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c00f"
  },
  "name": "Police Station Shahibaug",
  "area": "Ahmedabad",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.054619714,
  "longitude": 72.596355102
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c010"
  },
  "name": "Santrampur Police Station, Dist Mahisagar.",
  "area": "Ahmedabad",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.11023039,
  "longitude": 72.5854422
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c011"
  },
  "name": "Police Station-Gayakwad Haveli",
  "area": "Ahmedabad",
  "district": "380001",
  "state": "Gujarat",
  "pincode": "380001",
  "latitude": 23.015861373,
  "longitude": 72.5793927
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c012"
  },
  "name": "Rustam Pura Police Station",
  "area": "Salawatpura Main Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395002",
  "latitude": 21.189177,
  "longitude": 72.832413
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c013"
  },
  "name": "Rabupura Police Thana",
  "area": "Rabupura",
  "district": "Rabupura",
  "state": "Gujarat",
  "pincode": "Rabupura",
  "latitude": 28.25,
  "longitude": 77.6
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c014"
  },
  "name": "Raiyapur Police Chowki",
  "area": "Raiyapur",
  "district": "Station",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.1205,
  "longitude": 72.05656
},
{
  "_id": {
    "$oid": "653927a0e0265e4af914c015"
  },
  "name": "Ganga Police Chowki",
  "area": "Petlad Road",
  "district": "387355",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.67244,
  "longitude": 72.86138
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c016"
  },
  "name": "Orvada Out Police Chowki",
  "area": "Santroad Road",
  "district": "Orwada",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.80066,
  "longitude": 73.77477
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c017"
  },
  "name": "Bhadra Naka Police Chowki",
  "area": "NH927D",
  "district": "360405",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.8908,
  "longitude": 70.49589
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c018"
  },
  "name": "Jamkandorna Police Chowki",
  "area": "Jamkandorna 360405",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.89242,
  "longitude": 70.49556
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c019"
  },
  "name": "Meghapur Police Station",
  "area": "NH151A",
  "district": "Padana",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.34919,
  "longitude": 69.81498
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c01a"
  },
  "name": "Santh Shivlala Bhi Chowki",
  "area": "Aradi Road",
  "district": "Vatav",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.51042,
  "longitude": 72.82466
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c01b"
  },
  "name": "Mehsana A Division Police Station",
  "area": "Station Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.60319,
  "longitude": 72.39222
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c01c"
  },
  "name": "Bhilpur Police Station",
  "area": "Dabhoi Road",
  "district": "391760",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.19761,
  "longitude": 73.32119
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c01d"
  },
  "name": "Police Check Post",
  "area": "Nh51",
  "district": "Timbi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.88649,
  "longitude": 71.19603
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c01e"
  },
  "name": "State Reserve Police Training Center",
  "area": "Junagadh 362315",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.65726,
  "longitude": 70.53387
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c01f"
  },
  "name": "Gajrawadi Police Chowki",
  "area": "Nandghar Anganwadi Kendra No X",
  "district": "Gajrawadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29511,
  "longitude": 73.21563
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c020"
  },
  "name": "Godarva Police Station",
  "area": "Nandarva Road",
  "district": "Nandarva",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.98198,
  "longitude": 73.70269
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c021"
  },
  "name": "Navibandar Police Station",
  "area": "Nh51",
  "district": "Ratia",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.4502,
  "longitude": 69.78776
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c022"
  },
  "name": "South Class Police Chowki",
  "area": "SH-130",
  "district": "384170",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.7973,
  "longitude": 72.3956
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c023"
  },
  "name": "Borsad Police Station",
  "area": "College Road",
  "district": "388540",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.4078,
  "longitude": 72.90318
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c024"
  },
  "name": "Sadhli Out Post Police Station",
  "area": "Kayavarohan Road",
  "district": "Sadhali",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.98544,
  "longitude": 73.29231
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c025"
  },
  "name": "Motipura Police Chowki",
  "area": "National Highwat 48",
  "district": "Circle",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.58276,
  "longitude": 72.95868
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c026"
  },
  "name": "Ladhav Police Chowki",
  "area": "Vidya Nagar Main Road",
  "district": "Rajputpara",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.28958,
  "longitude": 70.80066
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c027"
  },
  "name": "Navayard Police Circle",
  "area": "Dharam Sinh Desai Road",
  "district": "Jakat",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.34378,
  "longitude": 73.16402
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c028"
  },
  "name": "Laxmipura Police Station",
  "area": "Badiyadev Maharaj Mandir",
  "district": "Laxmipura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.32755,
  "longitude": 73.13988
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c029"
  },
  "name": "Shivnagar Police Chowki",
  "area": "Service Road",
  "district": "Temple",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.26892,
  "longitude": 72.18149
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c02a"
  },
  "name": "Police Station Shivnagar Society",
  "area": "Lambe Hanuman Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.2085,
  "longitude": 72.8532
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c02b"
  },
  "name": "Bus Stand Police Chowki",
  "area": "State Highway 33",
  "district": "Chalala",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.4084,
  "longitude": 71.16319
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c02c"
  },
  "name": "Joravar Nagar Police Station",
  "area": "Mahatma Gandhi Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.71317,
  "longitude": 71.6467
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c02d"
  },
  "name": "Gambhoi Police Station",
  "area": "Gambhoi Village Bhiloda Road",
  "district": "Village",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.6022,
  "longitude": 73.0977
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c02e"
  },
  "name": "Police Station Kandla",
  "area": "Swami Lilashah Road",
  "district": "370205",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.0715,
  "longitude": 70.0769
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c02f"
  },
  "name": "Hudco Police Chowki",
  "area": "Kothariya Main Road",
  "district": "Jangleshwar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.26303,
  "longitude": 70.81482
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c030"
  },
  "name": "Police Station Unjha",
  "area": "Khajuri Pur",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.80934,
  "longitude": 72.39589
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c031"
  },
  "name": "Talaja Police Station",
  "area": "Maya Petroleum",
  "district": "Town",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.35168,
  "longitude": 72.03944
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c032"
  },
  "name": "Savarkundala Town Police Station",
  "area": "SH-96",
  "district": "364515",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.33717,
  "longitude": 71.31365
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c033"
  },
  "name": "Golvad Police Gate",
  "area": "NH-64",
  "district": "Nagarwada",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.95325,
  "longitude": 72.92616
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c034"
  },
  "name": "Golvad Police Chowki",
  "area": "Golwadi Road",
  "district": "382150",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.12592,
  "longitude": 72.04912
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c035"
  },
  "name": "Jetpur Police Station",
  "area": "Pavijetpur Road",
  "district": "Of",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.34484,
  "longitude": 73.84269
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c036"
  },
  "name": "New Maninagar Policeh Chowki",
  "area": "Sardar Patel Ring Road",
  "district": "Maninagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.98438,
  "longitude": 72.64254
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c037"
  },
  "name": "Gujrat Police Tad Road Check Post",
  "area": "Kesariya Road",
  "district": "362510",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.74491,
  "longitude": 70.9343
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c038"
  },
  "name": "Sihor Police Station",
  "area": "Parmat St",
  "district": "Post",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.71369,
  "longitude": 71.96005
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c039"
  },
  "name": "GIDC Police Station",
  "area": "Gidc Road",
  "district": "Pulp",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.36104,
  "longitude": 72.92205
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c03a"
  },
  "name": "Naroda Gidc Police Chowki",
  "area": "Naroda Gidc Road",
  "district": "Exchange",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.09043,
  "longitude": 72.66543
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c03b"
  },
  "name": "Gidc Police Chowki",
  "area": "Savli Halol Road",
  "district": "Industrial",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.53045,
  "longitude": 73.46491
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c03c"
  },
  "name": "GIDC Police Station",
  "area": "Gidc",
  "district": "GIDC",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.17061,
  "longitude": 72.82042
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c03d"
  },
  "name": "Khadayata Chhatralay Police Chowki",
  "area": "Shamlaji Road",
  "district": "383315",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.46257,
  "longitude": 73.29556
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c03e"
  },
  "name": "Police Station Changodar",
  "area": "Nh8a",
  "district": "Changodar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.93022,
  "longitude": 72.4481
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c03f"
  },
  "name": "Fulwadi Police Chowki",
  "area": "Motiwala Apartment",
  "district": "Fulwadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.75857,
  "longitude": 70.62565
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c040"
  },
  "name": "Kamdar Maidan Police Station",
  "area": "Rakhial Road",
  "district": "Gomtipur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02041,
  "longitude": 72.60536
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c041"
  },
  "name": "Shaktinagar Police Chowki",
  "area": "Khodiyar Colony",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.4678,
  "longitude": 70.0481
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c042"
  },
  "name": "Kanrej Police Station",
  "area": "Kamrej Surat Road",
  "district": "Kholvad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.2696,
  "longitude": 72.95816
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c043"
  },
  "name": "Sangrampur Police Station",
  "area": "Rudra Pura Road",
  "district": "Bazaar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.18912,
  "longitude": 72.82518
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c044"
  },
  "name": "Gotri Police Station",
  "area": "Gotri",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.31058,
  "longitude": 73.13913
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c045"
  },
  "name": "Gotri Road Police Station",
  "area": "S K Chaudhari Marg",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.31337,
  "longitude": 73.1452
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c046"
  },
  "name": "Botad Police Station",
  "area": "Station Road",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "Botad 364710",
  "latitude": 22.1743,
  "longitude": 71.665809
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c047"
  },
  "name": "Police Station Maninagar",
  "area": "Lala Lajpat Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380008",
  "latitude": 22.99842,
  "longitude": 72.60225
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c048"
  },
  "name": "Police Commissioner Kacheri",
  "area": "Macchiwar Khari Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395001",
  "latitude": 21.192543,
  "longitude": 72.817127
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c049"
  },
  "name": "Shahibaugh Police Station",
  "area": "Rani Shakti Mandir Road",
  "district": "Under",
  "state": "Gujarat",
  "pincode": "380004",
  "latitude": 23.05507225,
  "longitude": 72.59418645
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c04a"
  },
  "name": "Police Chowki",
  "area": "Ahmedabad",
  "district": "380008",
  "state": "Gujarat",
  "pincode": "380008",
  "latitude": 22.992386,
  "longitude": 72.596619
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c04b"
  },
  "name": "Police Head Quarters",
  "area": "Main Mograwadi Road",
  "district": "396001",
  "state": "Gujarat",
  "pincode": "Valsad 396001",
  "latitude": 20.604747,
  "longitude": 72.940726
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c04c"
  },
  "name": "Navrangpura Police Station",
  "area": "Opp. Railway Crossing",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380009",
  "latitude": 23.0376192002,
  "longitude": 72.565072895
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c04d"
  },
  "name": "Gujarat Mahanagar Police Sanchalit",
  "area": "Nanawata Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395003",
  "latitude": 21.199046,
  "longitude": 72.822032
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c04e"
  },
  "name": "Ramol Police Station",
  "area": "Ramol",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 22.9893433,
  "longitude": 72.6420517
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c04f"
  },
  "name": "Colva Police Station(Goa)",
  "area": "Ahmedabad",
  "district": "",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 23.01598,
  "longitude": 72.53688
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c050"
  },
  "name": "Police Station Tiruttani",
  "area": "Dudhrej 363001",
  "district": "Dudhrej 363001",
  "state": "Gujarat",
  "pincode": "Dudhrej 363001",
  "latitude": 22.734851,
  "longitude": 71.6261821
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c051"
  },
  "name": "B Division Police Station",
  "area": "Dudhrej 363002",
  "district": "Dudhrej 363002",
  "state": "Gujarat",
  "pincode": "Dudhrej 363002",
  "latitude": 22.719153,
  "longitude": 71.660197
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c052"
  },
  "name": "Police Station-Faziya Road",
  "area": "Halol 389350",
  "district": "Halol 389350",
  "state": "Gujarat",
  "pincode": "Halol 389350",
  "latitude": 22.5016555377,
  "longitude": 73.474241053
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c053"
  },
  "name": "Police Station-Valsad",
  "area": "SH-67",
  "district": "396001",
  "state": "Gujarat",
  "pincode": "Valsad 396001",
  "latitude": 20.60666,
  "longitude": 72.92803
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c054"
  },
  "name": "Police Head Quarters",
  "area": "near post office",
  "district": "383001",
  "state": "Gujarat",
  "pincode": "Himatnagar 383001",
  "latitude": 23.601562,
  "longitude": 72.959554
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c055"
  },
  "name": "Special Operation Group-Vadodara City",
  "area": "Hathikhana Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390001",
  "latitude": 22.30694,
  "longitude": 73.20411
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c056"
  },
  "name": "IG Circle Police Chowki",
  "area": "Bhuj 370001",
  "district": "Bhuj 370001",
  "state": "Gujarat",
  "pincode": "Bhuj 370001",
  "latitude": 23.230193,
  "longitude": 69.662803
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c057"
  },
  "name": "Katargam Police Station",
  "area": "Surat",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.22346,
  "longitude": 72.83266
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c058"
  },
  "name": "Police Station Balsinor",
  "area": "Balasinor 388255",
  "district": "Balasinor 388255",
  "state": "Gujarat",
  "pincode": "Balasinor 388255",
  "latitude": 22.940305,
  "longitude": 73.336993
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c059"
  },
  "name": "Assistant Police Commissioners Office",
  "area": "Macchiwar Khari Road",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "395001",
  "latitude": 21.19275,
  "longitude": 72.817068
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c05a"
  },
  "name": "Rural Police Line,Nadiad",
  "area": "Nadiad 387001",
  "district": "Nadiad 387001",
  "state": "Gujarat",
  "pincode": "Nadiad 387001",
  "latitude": 22.6908617,
  "longitude": 72.8609973
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c05b"
  },
  "name": "Aaवो Kabhi Puरानी हवेली परkasøtiya Vanshi",
  "area": "હાવજ ના ઠેકાણા નો હોય...વાલા",
  "district": "",
  "state": "Gujarat",
  "pincode": "Bhavnagar",
  "latitude": 21.757762,
  "longitude": 72.1450804
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c05c"
  },
  "name": "Umra Policestation",
  "area": "Surat",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.1774805635,
  "longitude": 72.8012073786
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c05d"
  },
  "name": "Rander Surat India",
  "area": "Surat",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.219116225,
  "longitude": 72.796209943
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c05e"
  },
  "name": "Police Station Amraiwadi",
  "area": "Ahmedabad",
  "district": "380026",
  "state": "Gujarat",
  "pincode": "380026",
  "latitude": 23.0064,
  "longitude": 72.62504
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c05f"
  },
  "name": "Chorwad,Junagadh",
  "area": "Chorwad",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 21.030926,
  "longitude": 70.23556
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c060"
  },
  "name": "Kamrej Police Station",
  "area": "Kamrej",
  "district": "Gujarat",
  "state": "Gujarat",
  "pincode": "India",
  "latitude": 21.2850351069,
  "longitude": 72.9704203141
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c061"
  },
  "name": "Police Station , Chaklasi",
  "area": "Nadiad",
  "district": "Nadiad",
  "state": "Gujarat",
  "pincode": "Nadiad",
  "latitude": 22.6327875053,
  "longitude": 72.9471588135
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c062"
  },
  "name": "Okhla Police Station",
  "area": "Okha Port 361350",
  "district": "Okha Port 361350",
  "state": "Gujarat",
  "pincode": "Okha Port 361350",
  "latitude": 22.475812,
  "longitude": 69.076009
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c063"
  },
  "name": "Police Station-Santram",
  "area": "Nadiad 387001",
  "district": "Nadiad 387001",
  "state": "Gujarat",
  "pincode": "Nadiad 387001",
  "latitude": 22.6914,
  "longitude": 72.86443
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c064"
  },
  "name": "Rander Police Station",
  "area": "Surat",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.218336704,
  "longitude": 72.794553042
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c065"
  },
  "name": "Police Chowki Naliya",
  "area": "Nh8a Kutch Road",
  "district": "Naliya",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.25443,
  "longitude": 68.838
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c066"
  },
  "name": "Kothwada Check Post Police Station",
  "area": "Karajan Road",
  "district": "391243",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.11256,
  "longitude": 73.07971
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c067"
  },
  "name": "Chavta Check Post",
  "area": "Rajkot Porbandar Highway",
  "district": "362650",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.63084,
  "longitude": 70.01695
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c068"
  },
  "name": "Viramgam Police Station",
  "area": "Viramgam 382150",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.12571,
  "longitude": 72.04905
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c069"
  },
  "name": "Railway Police Station Sipahi Society",
  "area": "Nava Junction Road",
  "district": "Bank",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.7436,
  "longitude": 71.63043
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c06a"
  },
  "name": "Police Station Chijali",
  "area": "SH-181",
  "district": "396521",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.75873,
  "longitude": 73.06503
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c06b"
  },
  "name": "Limdi Police Station",
  "area": "Nava Bazar Road",
  "district": "Limdi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.0096,
  "longitude": 74.1583
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c06c"
  },
  "name": "Madhavpura Police Station",
  "area": "Oswal Bhavan Road",
  "district": "Police",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.05727,
  "longitude": 72.59386
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c06d"
  },
  "name": "Police Station Kach Nav Vibhag",
  "area": "New Mint Road",
  "district": "Dhatia",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.25029,
  "longitude": 69.66665
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c06e"
  },
  "name": "River Front Pashchim Police Station",
  "area": "Bhagtacharya Road",
  "district": "Kocharab",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.01192,
  "longitude": 72.57209
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c06f"
  },
  "name": "Umreth Police Township",
  "area": "Umreth Road",
  "district": "Bajar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.6994,
  "longitude": 73.117
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c070"
  },
  "name": "Shahibag Police Station",
  "area": "Oswal Bhavan Road",
  "district": "Hall",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.05512,
  "longitude": 72.59312
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c071"
  },
  "name": "Ghod Dod Road Police Chowki",
  "area": "Ghod Dhod Road",
  "district": "Village",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.17575,
  "longitude": 72.81014
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c072"
  },
  "name": "Police Chowki, Uparkot",
  "area": "Uperkot Road",
  "district": "Coat",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.52242,
  "longitude": 70.4698
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c073"
  },
  "name": "Pethapur Police Chowki",
  "area": "Ambaji Temple",
  "district": "Pethapur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.26428,
  "longitude": 72.67148
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c074"
  },
  "name": "Patthar Gate Police Chowki",
  "area": "Rajguru Mahadev Marg",
  "district": "Sultanpura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29657,
  "longitude": 73.20594
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c075"
  },
  "name": "Hariom Police Chowki",
  "area": "Hariom Police Chowki",
  "district": "Stand",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.79205,
  "longitude": 70.70018
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c076"
  },
  "name": "Kamlabag Police Station",
  "area": "M G Road",
  "district": "Hospital",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.63929,
  "longitude": 69.61193
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c077"
  },
  "name": "Patan Sahar Police",
  "area": "Gujarat Sh220",
  "district": "Mahadev",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.84729,
  "longitude": 72.11177
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c078"
  },
  "name": "State Reserve Police Force",
  "area": "Ahmedabad",
  "district": "382345",
  "state": "Gujarat",
  "pincode": "382345",
  "latitude": 23.060895,
  "longitude": 72.643468
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c079"
  },
  "name": "Danilimda Police Station",
  "area": "120 Circular Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.99773,
  "longitude": 72.57962
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c07a"
  },
  "name": "Danilimda Police Station",
  "area": "120 Circular Road",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.00021,
  "longitude": 72.58345
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c07b"
  },
  "name": "Danilimda Police Station",
  "area": "Shah Alam Road",
  "district": "Lake",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.99585,
  "longitude": 72.58243
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c07c"
  },
  "name": "Dabka Out Post Police Station",
  "area": "Dabka Road",
  "district": "Maa",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.2475,
  "longitude": 72.95728
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c07d"
  },
  "name": "Kaligam Police Chowki",
  "area": "Kali Gam Road",
  "district": "Colony",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.09104,
  "longitude": 72.57528
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c07e"
  },
  "name": "Police Sahker Office",
  "area": "Kalubha Road",
  "district": "Devbagh",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.76644,
  "longitude": 72.14361
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c07f"
  },
  "name": "Vajiriya Out Post",
  "area": "Vajeriya Road",
  "district": "Vajeriya",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.03725,
  "longitude": 73.58406
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c080"
  },
  "name": "Sukhsar Police Station",
  "area": "Police Station Road",
  "district": "Sukhsar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.14935,
  "longitude": 74.02655
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c081"
  },
  "name": "Police Stataion",
  "area": "State Bank Of India Atm",
  "district": "Jafarabad",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.86777,
  "longitude": 71.36486
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c082"
  },
  "name": "Traffic Aid Post Vanana",
  "area": "Rajkot Porbandar Highway",
  "district": "360560",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.66567,
  "longitude": 69.71044
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c083"
  },
  "name": "Police Station Amodra",
  "area": "SH-237",
  "district": "383210",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.496,
  "longitude": 72.97378
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c084"
  },
  "name": "Kheda Bharma Police Chowki",
  "area": "NH-58",
  "district": "383255",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.02475,
  "longitude": 73.04578
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c085"
  },
  "name": "Pethapur Police Chowki",
  "area": "Ambaji Temple",
  "district": "Pethapur",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.26431,
  "longitude": 72.67147
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c086"
  },
  "name": "Police Savrakshan Kacheri",
  "area": "Ashram Road",
  "district": "387001",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.69905,
  "longitude": 72.85499
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c087"
  },
  "name": "Vastrapur Police Station",
  "area": "Hill Darshan Bungalows Lane",
  "district": "Ambe",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.04943,
  "longitude": 72.52329
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c088"
  },
  "name": "Rajgadh Police Station",
  "area": "Police Station",
  "district": "Dam",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.57039,
  "longitude": 73.65219
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c089"
  },
  "name": "Sihunj Police Chowki",
  "area": "SH-60",
  "district": "387430",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.82114,
  "longitude": 72.87679
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c08a"
  },
  "name": "Wadal Police Chowki",
  "area": "Una 362560",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.8269,
  "longitude": 71.04506
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c08b"
  },
  "name": "Millpara Police Chowki",
  "area": "Millpara Road",
  "district": "Plot",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.64556,
  "longitude": 69.62095
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c08c"
  },
  "name": "Ajit Mill Policeh Chowki",
  "area": "Soni Ni Chawl Flyover",
  "district": "Ni",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02041,
  "longitude": 72.63806
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c08d"
  },
  "name": "Jaction Police Chowki",
  "area": "Jaksan Plot Main Road",
  "district": "Mochi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.31399,
  "longitude": 70.80172
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c08e"
  },
  "name": "Hazikhana Bazaar Police Chowki",
  "area": "Hazikhan Bazaar Road",
  "district": "Panchabatti",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.69734,
  "longitude": 72.99132
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c08f"
  },
  "name": "Kiriti Mandhir Police Chowki",
  "area": "Old Bhatiya Bazar Road",
  "district": "Bhatiya",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.64228,
  "longitude": 69.60094
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c090"
  },
  "name": "Tajpura Police Station",
  "area": "Tajpura Road",
  "district": "Tajpura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.44403,
  "longitude": 73.47261
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c091"
  },
  "name": "Nagarwada Ladies Police Station",
  "area": "Kothi Road",
  "district": "Jambubet",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.30492,
  "longitude": 73.1928
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c092"
  },
  "name": "Bagsara Police Station",
  "area": "Bank Of India",
  "district": "365440",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.49355,
  "longitude": 70.95223
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c093"
  },
  "name": "Vaso Police Station",
  "area": "Vaso Road",
  "district": "Vaso",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.66559,
  "longitude": 72.75552
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c094"
  },
  "name": "Police Station Shraddha Society",
  "area": "Shraddha Society",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.9892,
  "longitude": 72.86869
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c095"
  },
  "name": "Rapanji Police Station",
  "area": "SH-37",
  "district": "Trapaj",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.42602,
  "longitude": 72.11004
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c096"
  },
  "name": "Tower Cross Road Police Station",
  "area": "Sh97",
  "district": "Taluka",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.12851,
  "longitude": 70.11584
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c097"
  },
  "name": "Rupal Police Chowki",
  "area": "NH-8",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.94722,
  "longitude": 72.95909
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c098"
  },
  "name": "Civil Police Chowki",
  "area": "Bindu Sarovar To Mukti Dham Road",
  "district": "Bank",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.91485,
  "longitude": 72.37258
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c099"
  },
  "name": "Police Chowki Singh Dwar",
  "area": "SH-56",
  "district": "385110",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.31564,
  "longitude": 72.84508
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c09a"
  },
  "name": "Chhaya Police Chowki",
  "area": "Indira Gandhi Road",
  "district": "Chhaya",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.62805,
  "longitude": 69.63471
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c09b"
  },
  "name": "Bhadra Police Chowki",
  "area": "SH-6",
  "district": "Bhadra",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.66234,
  "longitude": 70.35842
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c09c"
  },
  "name": "Ranjit Nagar Out Post Police Station",
  "area": "Ranjitnagar",
  "district": "Village",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.51991,
  "longitude": 73.59441
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c09d"
  },
  "name": "Matar Police Station",
  "area": "SH-16",
  "district": "387530",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.7094,
  "longitude": 72.6646
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c09e"
  },
  "name": "Police Station, Nijhar",
  "area": "Nijhar 394370",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.47757,
  "longitude": 74.19335
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c09f"
  },
  "name": "Railway Security Force Station",
  "area": "Brilliant Class",
  "district": "Danteshwar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.27869,
  "longitude": 73.21521
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0a0"
  },
  "name": "Tower Police Chowki",
  "area": "Sankheda Road",
  "district": "391145",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.16916,
  "longitude": 73.57666
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0a1"
  },
  "name": "Masar Road Police Chowki",
  "area": "Masar Road",
  "district": "391421",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.10869,
  "longitude": 72.8875
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0a2"
  },
  "name": "Mandai Police Chowki",
  "area": "Bank Of India",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.83396,
  "longitude": 71.60562
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0a3"
  },
  "name": "State Reserve Police Station",
  "area": "Nh8",
  "district": "Village",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.24887,
  "longitude": 72.96674
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0a4"
  },
  "name": "Savali Police Station",
  "area": "Savli 391770",
  "district": "",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.55749,
  "longitude": 73.22219
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0a5"
  },
  "name": "Nilpara Police Station",
  "area": "Millpara Road",
  "district": "Plot",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.64568,
  "longitude": 69.62099
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0a6"
  },
  "name": "Bavala Police Station",
  "area": "SH-144",
  "district": "Rajoda",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.82777,
  "longitude": 72.36871
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0a7"
  },
  "name": "Motakuntwada Police Station",
  "area": "Mota Khuntavada",
  "district": "364280",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.19059,
  "longitude": 71.64729
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0a8"
  },
  "name": "Passivad Police Station",
  "area": "Golvad Road",
  "district": "Udvada",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 20.95548,
  "longitude": 72.92449
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0a9"
  },
  "name": "Jasdhan Police Station",
  "area": "SH-1",
  "district": "(Jas)",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.05427,
  "longitude": 71.22248
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0aa"
  },
  "name": "Babra Police Station",
  "area": "SH-25",
  "district": "365421",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.84947,
  "longitude": 71.30493
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0ab"
  },
  "name": "Vibhagiya Police Adhikarai Kacheri",
  "area": "Kapadvanj Market",
  "district": "Road",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.02224,
  "longitude": 73.06562
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0ac"
  },
  "name": "Police Adhikshak",
  "area": "Sh10 Patan Road",
  "district": "Railway",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.85144,
  "longitude": 72.13648
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0ad"
  },
  "name": "Nayab Police Adhikshak",
  "area": "Sh864 Banaskantha Road",
  "district": "385330",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 24.10592,
  "longitude": 71.77884
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0ae"
  },
  "name": "Police Adhikshak Office",
  "area": "Station Road",
  "district": "Society",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.21117,
  "longitude": 69.65502
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0af"
  },
  "name": "Police Adhikshak Office",
  "area": "Sh59 Sabarkadha Road",
  "district": "383315",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.46594,
  "longitude": 73.29846
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0b0"
  },
  "name": "Police Adhikshak Office",
  "area": "Sh130 Mehsana Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.69776,
  "longitude": 72.54774
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0b1"
  },
  "name": "Police Station Chotila",
  "area": "Sh119",
  "district": "Hospital",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.4237,
  "longitude": 71.2003
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0b2"
  },
  "name": "Nayab Police Adhikshak",
  "area": "Sh861 Banaskantha Road",
  "district": "385340",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.82896,
  "longitude": 71.61432
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0b3"
  },
  "name": "Nayab Police Adhikshak",
  "area": "Baardoli",
  "district": "Surat",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.1154,
  "longitude": 73.10948
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0b4"
  },
  "name": "Sambhag Wadi Mukhya Police Station",
  "area": "Sindhi Society Road",
  "district": "Police",
  "state": "Gujarat",
  "pincode": "389151",
  "latitude": 22.83848,
  "longitude": 74.25908
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0b5"
  },
  "name": "Santram Chowki",
  "area": "SH-60",
  "district": "387130",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.81508,
  "longitude": 72.75632
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0b6"
  },
  "name": "Garbada Police Station",
  "area": "Bus Station Road",
  "district": "Garbada",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.68544,
  "longitude": 74.31114
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0b7"
  },
  "name": "Pruthvi Infosys",
  "area": "Narol Naroda Road",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "382415",
  "latitude": 23.02641,
  "longitude": 72.63906
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0b8"
  },
  "name": "Kadval Police Station",
  "area": "Kadwal Road",
  "district": "Primary",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.48601,
  "longitude": 73.76719
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0b9"
  },
  "name": "Gomtipur Police Station",
  "area": "Gomtipur Road",
  "district": "Police",
  "state": "Gujarat",
  "pincode": "380021",
  "latitude": 23.02091,
  "longitude": 72.61234
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0ba"
  },
  "name": "Gomtipur Police Station",
  "area": "Anupam Cinema Road",
  "district": "Army",
  "state": "Gujarat",
  "pincode": "380021",
  "latitude": 23.00868,
  "longitude": 72.608
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0bb"
  },
  "name": "Vadtal Outpost Police Chowki",
  "area": "SH-139",
  "district": "Taluka",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.59427,
  "longitude": 72.873
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0bc"
  },
  "name": "Koyali Check Post",
  "area": "Undera Koyali Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.35441,
  "longitude": 73.11867
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0bd"
  },
  "name": "Fatehpura Police Station",
  "area": "Jagruti Girls Highschool Road",
  "district": "Office",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.25889,
  "longitude": 74.03935
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0be"
  },
  "name": "Police Station Manchi",
  "area": "Champaner Machi Road",
  "district": "Manchi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.466,
  "longitude": 73.51572
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0bf"
  },
  "name": "Police Choki Manchi",
  "area": "Champaner Machi Road",
  "district": "Manchi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.4649,
  "longitude": 73.52114
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0c0"
  },
  "name": "Police Station Manchi",
  "area": "Champaner Machi Road",
  "district": "Manchi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.46858,
  "longitude": 73.52314
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0c1"
  },
  "name": "Jamnabai Police Chowki",
  "area": "Panigate Road",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390017",
  "latitude": 22.30005,
  "longitude": 73.21193
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0c2"
  },
  "name": "Demai Police Station",
  "area": "SH-59",
  "district": "383330",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.15657,
  "longitude": 73.21639
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0c3"
  },
  "name": "Kupwada Police Station",
  "area": "Anandpar Road",
  "district": "Rajkot",
  "state": "Gujarat",
  "pincode": "360003",
  "latitude": 22.31389,
  "longitude": 70.83477
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0c4"
  },
  "name": "Roa Puli Police Chowki",
  "area": "Anand Nagar",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.7758,
  "longitude": 72.1722
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0c5"
  },
  "name": "Kuba Masjid Police Station",
  "area": "Bakri Pole Vadi",
  "district": "Vadodara",
  "state": "Gujarat",
  "pincode": "390007",
  "latitude": 22.29839,
  "longitude": 73.2149
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0c6"
  },
  "name": "Padra Police Station",
  "area": "Maruthi Nagar Padra Road",
  "district": "Govindpura",
  "state": "Gujarat",
  "pincode": "391440",
  "latitude": 22.24178,
  "longitude": 73.08437
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0c7"
  },
  "name": "Ichhapur Police Station",
  "area": "Hazira Road",
  "district": "Nh6",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.18602,
  "longitude": 72.71013
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0c8"
  },
  "name": "Saliya Police Station",
  "area": "SH-152",
  "district": "Hadaf",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.7995,
  "longitude": 73.79776
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0c9"
  },
  "name": "Jilla Purvatha Mamledar Kacheri Police Colony",
  "area": "Jila Panchayat Road",
  "district": "Office",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.72412,
  "longitude": 71.62384
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0ca"
  },
  "name": "Panpur Police Station",
  "area": "National Highwat 48",
  "district": "Jal",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.62061,
  "longitude": 72.94281
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0cb"
  },
  "name": "Holy Chakla Police Station",
  "area": "Bodeli Road",
  "district": "Hospital",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.27145,
  "longitude": 73.71652
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0cc"
  },
  "name": "Delhi Chakala Police Chowki",
  "area": "Mirzapur Road",
  "district": "House",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.03129,
  "longitude": 72.58385
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0cd"
  },
  "name": "Manavadar Police Station",
  "area": "Jay Shree Jhulelal Temple",
  "district": "Ratanpara",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.49679,
  "longitude": 70.13794
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0ce"
  },
  "name": "Bapunagar Police Station",
  "area": "Rameshwar Mahadev Cross Road",
  "district": "Bapunagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 23.03258,
  "longitude": 72.63128
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0cf"
  },
  "name": "Valan Out Post Police Station",
  "area": "Valan Gam Road",
  "district": "Of",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.95347,
  "longitude": 73.0724
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0d0"
  },
  "name": "Datha Police Station",
  "area": "Datha Village Road",
  "district": "Police",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.19289,
  "longitude": 71.95717
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0d1"
  },
  "name": "Vinoda Bhave Nagar Police Station",
  "area": "Vinoba Nagar Road",
  "district": "Mata",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.93603,
  "longitude": 72.64881
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0d2"
  },
  "name": "Police Station Kotara",
  "area": "Kotda Sanganird",
  "district": "Kotda",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.0497,
  "longitude": 70.8692
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0d3"
  },
  "name": "Kotecha Nagar Police Station",
  "area": "Shri Society Main Road",
  "district": "Nagar",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.28218,
  "longitude": 70.7848
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0d4"
  },
  "name": "B Division Police Station Sorathiya Plot",
  "area": "Ramnath Para Main Road",
  "district": "Pura",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 22.29204,
  "longitude": 70.81389
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0d5"
  },
  "name": "Police Station Sarbhan",
  "area": "SH-61",
  "district": "392035",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.99445,
  "longitude": 72.94341
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0d6"
  },
  "name": "Golwad Police Station",
  "area": "Asha Nagar",
  "district": "Navsari",
  "state": "Gujarat",
  "pincode": "396445",
  "latitude": 20.95318,
  "longitude": 72.92617
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0d7"
  },
  "name": "Zadeshwar Police Station",
  "area": "SH-6",
  "district": "Bharucha",
  "state": "Gujarat",
  "pincode": "392015",
  "latitude": 21.72976,
  "longitude": 73.03015
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0d8"
  },
  "name": "Eroma Police Chowki",
  "area": "Gurunanak Road",
  "district": "Palanpur",
  "state": "Gujarat",
  "pincode": "385002",
  "latitude": 24.17454,
  "longitude": 72.4176
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0d9"
  },
  "name": "Dahegam Police Station",
  "area": "Sh141",
  "district": "Dehgam",
  "state": "Gujarat",
  "pincode": "382305",
  "latitude": 23.17006,
  "longitude": 72.81645
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0da"
  },
  "name": "Police Sahker Buth",
  "area": "Moti Bagh Road",
  "district": "Manekwadi",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.77099,
  "longitude": 72.14586
},
{
  "_id": {
    "$oid": "653927a1e0265e4af914c0db"
  },
  "name": "Check Post Police Chowki Madhupura",
  "area": "Porbandar Road",
  "district": "360576",
  "state": "Gujarat",
  "pincode": "",
  "latitude": 21.25051,
  "longitude": 69.98906
}];
connect()
// Directory where QR code images will be saved
const outputDirectory = './qrcodes/';

// Ensure the output directory exists
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

// Function to generate and save QR codes
function generateQRCode(data) {
  data.forEach((item) => {
    const id = item._id.$oid;
    const qrCodeData = `https://rakshakrita0.vercel.app/feedback/${id}` // Convert the field to QR code
    const fileName = `${outputDirectory}${id}.png`;

    qr.toDataURL(qrCodeData, async (err, url) => {
      if (err) {
          console.error(err);
          return NextResponse.json("not ok")

      } else {
          // Upload the QR code to Cloudinary

          const formData = new FormData();
          formData.append('file', url);
          formData.append('upload_preset', 'rakshakrita');
          const response = await axios.post(
              'https://api.cloudinary.com/v1_1/ddhncnedj/image/upload',
              formData
          );

          //.log(response.statusText);
          if (response.statusText === "OK") {
              myPost = await Stations.findById(id)
              myPost.qr = response.data.url
              myPost.save()
          } else {

          }
      }
  });
  });
}

// Call the function to generate and save QR codes
generateQRCode(data);
