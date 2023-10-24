const fs = require('fs');

const loc = [
    {
      "type": "Feature",
      "properties": {
        "@id": "node/1601018129",
        "amenity": "police",
        "name": "Kutch District Police Headquarters"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          69.6664617,
          23.2430111
        ]
      },
      "id": "node/1601018129"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/1740714649",
        "amenity": "police",
        "name": "Dumral Bazzar Police Station"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.8643665,
          22.6914433
        ]
      },
      "id": "node/1740714649"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/1763259331",
        "amenity": "police",
        "name": "Nadiad Main Police Station"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.8585041,
          22.6942361
        ]
      },
      "id": "node/1763259331"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/1828263212",
        "amenity": "police",
        "name": "Veraval Tower Police station"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          70.3647844,
          20.9097351
        ]
      },
      "id": "node/1828263212"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/1885476293",
        "amenity": "police",
        "name": "Makarpura Road Police Station"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          73.2032808,
          22.2707302
        ]
      },
      "id": "node/1885476293"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/2496597060",
        "amenity": "police",
        "name": "Mahsana District Jail"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.3843978,
          23.6090155
        ]
      },
      "id": "node/2496597060"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/2629371913",
        "amenity": "police",
        "name": "Chowk Bazar Police Station (Furja)"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.8194544,
          21.1983247
        ]
      },
      "id": "node/2629371913"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/2630973214",
        "amenity": "police",
        "name": "Piplod Police Chowki"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.7803298,
          21.1648314
        ]
      },
      "id": "node/2630973214"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/3236022280",
        "addr:city": "Ahmedabad",
        "addr:postcode": "380006",
        "addr:street": "Ashram Road",
        "amenity": "police",
        "name": "Ellisbridge Police Station",
        "operator": "Ahmedabad City Police"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.5716416,
          23.022886
        ]
      },
      "id": "node/3236022280"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/3247356200",
        "addr:city": "ahmedabad",
        "amenity": "police",
        "building": "yes",
        "name": "Sardarnagar Police Station",
        "phone": "+917922864345",
        "postal_code": "382475"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.620522,
          23.0804289
        ]
      },
      "id": "node/3247356200"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/3247518115",
        "addr:city": "Ahmedabad",
        "addr:postcode": "380021",
        "addr:state": "Gujarat",
        "amenity": "police",
        "name": "kalupur Police Station",
        "phone": "+917922167530"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.5938493,
          23.0280667
        ]
      },
      "id": "node/3247518115"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/3294480829",
        "amenity": "police"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          70.3785534,
          20.9103757
        ]
      },
      "id": "node/3294480829"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/3296283179",
        "amenity": "police"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          71.0059757,
          20.739476
        ]
      },
      "id": "node/3296283179"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/3299344297",
        "amenity": "police"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          69.6661334,
          23.2467343
        ]
      },
      "id": "node/3299344297"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/3299344421",
        "amenity": "police"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          69.6703411,
          23.2542578
        ]
      },
      "id": "node/3299344421"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/3306683250",
        "amenity": "police",
        "name": "Karanj Police Station"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.5820394,
          23.0245097
        ]
      },
      "id": "node/3306683250"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/3622444415",
        "amenity": "police",
        "name": "Police station"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          70.0665251,
          22.4674468
        ]
      },
      "id": "node/3622444415"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/3755161464",
        "amenity": "police"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          69.6064493,
          21.6425951
        ]
      },
      "id": "node/3755161464"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/3775189520",
        "amenity": "police",
        "name": "SOLA POLICE STATION"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.5290719,
          23.0869563
        ]
      },
      "id": "node/3775189520"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4268052361",
        "amenity": "police",
        "name": "Police Headquaters"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          70.0505385,
          22.4782767
        ]
      },
      "id": "node/4268052361"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4292013894",
        "addr:street": "sh-41",
        "amenity": "police",
        "name": "Kalol police station"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.5039766,
          23.2321535
        ]
      },
      "id": "node/4292013894"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4292073591",
        "addr:street": "Ahmedabad Palanpur State Highway SH41",
        "amenity": "police",
        "name": "BSF"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.3802364,
          23.4996701
        ]
      },
      "id": "node/4292073591"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4296179893",
        "addr:street": "bazar road",
        "amenity": "police",
        "name": "police station"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.3925592,
          23.6033095
        ]
      },
      "id": "node/4296179893"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4297341692",
        "addr:postcode": "384001",
        "addr:street": "Ahmedabad Palanpur State Highway SH41",
        "amenity": "police",
        "name": "police parade Ground"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.3936483,
          23.6105725
        ]
      },
      "id": "node/4297341692"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4297344289",
        "addr:street": "rajmahel road",
        "amenity": "police",
        "name": "Police head quarters "
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.3933116,
          23.6104715
        ]
      },
      "id": "node/4297344289"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4303548297",
        "addr:street": "station road",
        "amenity": "police",
        "name": "Mehsana city trafic police"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.3900917,
          23.6017456
        ]
      },
      "id": "node/4303548297"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4306901990",
        "addr:street": "Para Road",
        "amenity": "police",
        "name": "Sarovar Police station"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.3962892,
          23.6058092
        ]
      },
      "id": "node/4306901990"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4308250613",
        "addr:street": "Ahmedabad Palanpur State Highway SH41",
        "amenity": "police",
        "name": "Radhanpur circle police station"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.3816721,
          23.6056242
        ]
      },
      "id": "node/4308250613"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4326820496",
        "addr:street": "Rajkot Bypass",
        "amenity": "police",
        "name": "kuvadva road police staion"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          70.8353128,
          22.3141856
        ]
      },
      "id": "node/4326820496"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4358515491",
        "amenity": "police",
        "name": "Vatva police"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.6275,
          22.9718545
        ]
      },
      "id": "node/4358515491"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4435502189",
        "addr:city": "ahmedabad",
        "addr:street": "Sardar Patel Ring Road",
        "amenity": "police",
        "description": "new building",
        "name": "Odhav police station (new building)"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.6724978,
          23.0259396
        ]
      },
      "id": "node/4435502189"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4469973891",
        "addr:housenumber": "13 C Rupal Ind1",
        "addr:postcode": "395002",
        "addr:street": "Bamroli Road",
        "amenity": "police",
        "name": "Digital Printer",
        "name:en": "Digital Printer",
        "phone": "00912612631253"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.8300864,
          21.1689912
        ]
      },
      "id": "node/4469973891"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4481510796",
        "amenity": "police",
        "name": "Hanspura/Dehgam naka police station",
        "name:en": "Hanspura/Dehgam naka police station",
        "name:hi": "हंसपुरा पुलिस स्टेशन"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.686768,
          23.08872
        ]
      },
      "id": "node/4481510796"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4488080693",
        "addr:street": "Nana Viramgam",
        "amenity": "police"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.3634999,
          23.0724693
        ]
      },
      "id": "node/4488080693"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4508358594",
        "addr:postcode": "363641",
        "addr:street": "jail road",
        "amenity": "police",
        "name": "City police line &  A divison police station",
        "name:en": "City police line &  A divison police station"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          70.8358361,
          22.8132593
        ]
      },
      "id": "node/4508358594"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4510463892",
        "amenity": "police",
        "name": "Police Station"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.863415,
          22.6757356
        ]
      },
      "id": "node/4510463892"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4646885289",
        "addr:postcode": "380009",
        "addr:street": "Dr. Vikram Sarabhai Road",
        "amenity": "police",
        "name": "Gujarat university police station",
        "name:en": "Gujarat university police station",
        "opening_hours": "24/7"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.5405988,
          23.0347446
        ]
      },
      "id": "node/4646885289"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4794246530",
        "amenity": "police",
        "name": "Maganpura Police Chowki",
        "name:en": "Maganpura Police Chowki"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.5785719,
          23.0805194
        ]
      },
      "id": "node/4794246530"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/4832529753",
        "amenity": "police",
        "name": "Saputara Police Station"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          73.7519774,
          20.5792511
        ]
      },
      "id": "node/4832529753"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/5037460523",
        "amenity": "police",
        "name": "Local crime branch office",
        "name:en": "Local crime branch office"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          70.4586508,
          21.5286827
        ]
      },
      "id": "node/5037460523"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/5661768121",
        "amenity": "police",
        "name": "Ranip Police Station"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.5779962,
          23.0806075
        ]
      },
      "id": "node/5661768121"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/7234808381",
        "amenity": "police",
        "name": "Police Chowki",
        "operator": "Indian Police"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          69.7191669,
          22.9791531
        ]
      },
      "id": "node/7234808381"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/8815172866",
        "amenity": "police",
        "name": "Police Station, Hatkesh"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.5530175,
          23.0467062
        ]
      },
      "id": "node/8815172866"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/9903992870",
        "addr:city": "Gandevi",
        "addr:postcode": "396360",
        "amenity": "police",
        "name": "Gandevi Police Station"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          73.0052069,
          20.8138833
        ]
      },
      "id": "node/9903992870"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/9907620351",
        "amenity": "police",
        "name": "Udyognagar Police Chawki",
        "name:hi": "उद्योगनगर पोलिस चोकी"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          70.050873,
          22.4570771
        ]
      },
      "id": "node/9907620351"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/9914012349",
        "amenity": "police",
        "name": "Meghpar Police Station"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          69.8155437,
          22.3487056
        ]
      },
      "id": "node/9914012349"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/9918580688",
        "addr:city": "Gandevi",
        "addr:postcode": "396360",
        "amenity": "police",
        "name": "Police station"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          72.9962453,
          20.8113154
        ]
      },
      "id": "node/9918580688"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/10233379398",
        "addr:city": "Dhrol",
        "addr:street": "Dhrol Main Road",
        "amenity": "police",
        "name": "Dhrol Police Station",
        "source": "survey;local knowledge;aerial imagery;gps;streetlevel imagery;osm notes"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          70.4141854,
          22.5663614
        ]
      },
      "id": "node/10233379398"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/11149524311",
        "amenity": "police",
        "name": "B-Division"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          70.4601209,
          21.5257201
        ]
      },
      "id": "node/11149524311"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/11149869643",
        "amenity": "police",
        "name": "Police Head Quarters"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          70.4614335,
          21.5173636
        ]
      },
      "id": "node/11149869643"
    },
    {
      "type": "Feature",
      "properties": {
        "@id": "node/11149947480",
        "amenity": "police",
        "name": "Police Line"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          70.4631409,
          21.5139029
        ]
      },
      "id": "node/11149947480"
    }
  ]

  const transformedArray = loc.map((item) => {
    return {
      name: item.properties.name,
      coordinates: item.geometry.coordinates,
      type: item.geometry.type,
    };
  });
  
  console.log(transformedArray)
  // Convert the array to a JSON string
const jsonString = JSON.stringify(transformedArray, null, 2);

// Specify the file path where you want to save the JSON data
const filePath = 'transformedData.json';

// Write the JSON string to a file
fs.writeFile(filePath, jsonString, 'utf8', (err) => {
  if (err) {
    console.error('Error writing JSON file:', err);
  } else {
    console.log('JSON data has been written to', filePath);
  }
});