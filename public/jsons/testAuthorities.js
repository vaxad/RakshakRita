const gujaratDistricts = [
    'Ahmedabad',
    'Surat',
    'Vadodara',
    'Rajkot',
    'Bhavnagar',
    'Jamnagar',
    'Junagadh',
    'Gandhinagar',
    'Jhalod',
    'Rander',
    'Bharuch',
    'Anand',
    'Porbandar',
    'Godhra',
    'Navsari',
    'Dahod',
    'Botad',
    'Kheda',
    'Amreli',
    'Valsad',
    'Nadiad',
    'Surendranagar',
    'Morbi',
    'Mahesana',
    'Veraval',
    'Palanpur',
    'Deesa',
    'Wadhwan',
    'Anjar',
    'Patan',
    'Kadi',
    'Mansa',
    'Umreth',
    'Keshod',
    'Wankaner',
    'Dhoraji',
    'Jetpur',
    'Kalol',
    'Kaprada',
    'Sanand',
    'Kundla',
    'Thangadh',
    'Dharampur',
    'Lathi',
    'Rajpipla',
    'Vijapur',
    'Visnagar',
    'Upleta',
    'Vadnagar',
    'Manavadar',
    'Mahuva',
    'Palitana',
    'Mandvi',
    'Viramgam',
    'Modasa',
    'Mangrol',
    'Vyara',
    'Lunawada',
    'Rajula',
  ];
  
  const talukasByDistrict = {
    Ahmedabad: ['Taluka1', 'Taluka2', 'Taluka3'],
    Surat: ['Taluka4', 'Taluka5'],
    Vadodara: ['Taluka6', 'Taluka7', 'Taluka8'],
    Rajkot: ['Taluka9', 'Taluka10', 'Taluka11'],
    Bhavnagar: ['Taluka12', 'Taluka13'],
    Jamnagar: ['Taluka14', 'Taluka15'],
    Junagadh: ['Taluka16', 'Taluka17'],
    Gandhinagar: ['Taluka18', 'Taluka19'],
    Jhalod: ['Taluka20', 'Taluka21'],
    Rander: ['Taluka22', 'Taluka23'],
    Bharuch: ['Taluka24', 'Taluka25'],
    Anand: ['Taluka26', 'Taluka27'],
    Porbandar: ['Taluka28', 'Taluka29'],
    Godhra: ['Taluka30', 'Taluka31'],
    Navsari: ['Taluka32', 'Taluka33'],
    Dahod: ['Taluka34', 'Taluka35'],
    Botad: ['Taluka36', 'Taluka37'],
    Kheda: ['Taluka38', 'Taluka39'],
    Amreli: ['Taluka40', 'Taluka41'],
    Valsad: ['Taluka42', 'Taluka43'],
    Nadiad: ['Taluka44', 'Taluka45'],
    Surendranagar: ['Taluka46', 'Taluka47'],
    Morbi: ['Taluka48', 'Taluka49'],
    Mahesana: ['Taluka50', 'Taluka51'],
    Veraval: ['Taluka52', 'Taluka53'],
    Palanpur: ['Taluka54', 'Taluka55'],
    Deesa: ['Taluka56', 'Taluka57'],
    Wadhwan: ['Taluka58', 'Taluka59'],
    Anjar: ['Taluka60', 'Taluka61'],


    // Add talukas for other districts
  };
  
  const generateRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
  let ctr=-1;
  const createRandomData = () => {
    const district = generateRandomElement(gujaratDistricts);
    const talukaOptions = talukasByDistrict[district] || ['all'];
    const taluka = generateRandomElement(talukaOptions);
    ctr=ctr+1;
    return {
      policeId: [126277, 272637, 315142, 263724, 162425, 617242, 721523, 819271, 165229, 172526, 276216, 192721, 271524, 382615, 181624, 152411, 212331,753253,143213,677432][ctr],
      name: `Random Name${ctr}`,
      email: `random${ctr}@example.com`,
      password: 'randompassword',
      post: ['DCP','IPS','ACP','PSI','ASI','Constable'][Math.floor(Math.random() * 6)],
      state: 'Gujarat',
      district,
      taluka,
      village: 'all',
    };
  };
  
  const dataArray = Array.from({ length: 20 }, createRandomData);
  
  console.log(dataArray);
  