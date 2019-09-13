
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Directive,
  Input
} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormsModule
} from '@angular/forms';
import {
  ErrorStateMatcher
} from '@angular/material/core';
import {
  Observable
} from 'rxjs';
import {
  startWith,
  map,
  sample
} from 'rxjs/operators';
import {
  AuthService
} from '../../app/Services/auth.service';

// import {
//   SnotifyService
// } from 'ng-snotify';
import {
  NgxNotificationService
} from 'ngx-notification';
// import {
//   MatStepper
// } from '@angular/material/stepper';
import {
  Router
} from '@angular/router';

import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
  MatTooltip
} from '@angular/material/';
export interface StateGroup {
  letter: string;
  names: string[];
}
export interface hd {
  group: string;
  mapping_id: number;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {
  // @ViewChild('stepper',{static: false}) private myStepper: MatStepper;
  @ViewChild('otpModal') private otpModal: any;
  @ViewChild('photoModal') private photoModal: any;

  time = {
    hour: 13,
    minute: 30
  };
  currentCity;
  maritalStatus;
  gender;
  motherTongue;
  caste;
  maxHeight;
  minHeight;
  minAge;
  maxAge;
  birthDate: any;
  indexForHeight: number;
  isCompleted1 = false;
  isCompleted2 = false;
  isCompleted3 = false;
  isCompleted4 = false;
  isCompleted5 = false;
  dateofBirth: '';
  success = [];
  startDate = new Date(1985, 0, 1);
  birthdayValid: Boolean;
  PageOne: FormGroup;
  secondFormGroup: FormGroup;
  otpForm: FormGroup;
  otp: string = '';
  otpVerified: boolean = false;
  otp1: any;
  otp2: any;
  otp3: any;
  otp4: any;
  PreferencesDetails: FormGroup;
  EducationDetails: FormGroup;
  changeNumber: boolean = false;
  FamilyDetails: FormGroup;
  stateForm: FormGroup;
  mapping_id: number;
  manglikValue: string;
  manglikPreference = ['Manglik', 'Anshik Manglik'];
  nonManglikPreference = ['Non-Manglik', 'Anshik Manglik'];
  castePref: any;
  prefManglik = [];

  Caste: Boolean = false;
  AllCastes: Boolean = false;
  HoroScopes: Boolean = false;
  Mangaliks: Boolean = false;
  public imagePath;
  fullimagePath;
  frontimagePath;
  backimagePath;
  imgURL: any;
  BackimgURL;
  frontfile;
  fullimgURL;
  fd: false;
  currentAge: number;
  public message: string;
  degrees: any = [];
  S = false;
  Advertise = true;
  today: any;
  dd: any;
  mm: any;
  yyyy: any;
  dropdownList: any = [];
  selectedItems = [];
  selectedItems1: any = [];
  dropdownSettings = {};

  HigherEducation: hd[] = [{
      group: 'Engineering Design',
      mapping_id: 4,
      names: ["B.E\/B.Tech", "B.Pharma", "M.E\/M.Tech", "M.Pharma", "M.S. Engineering", "B.Arch", "M.Arch", "B.Des", "M.Des"]
    }, {
      group: 'Computers',
      mapping_id: 4,
      names: ["MCA\/PGDCA", "BCA", "B.IT"]
    }, {
      group: 'Finance',
      mapping_id: 4,
      names: ["B.Com", "CA", "CS", "ICWA", "M.Com", "CFA"]
    }, {
      group: 'Managment',
      mapping_id: 4,
      names: ["MBA\/PGDM", "BBA", "BHM"]
    },
    {
      group: 'Medicine',
      mapping_id: 4,
      names: ["MBBS", "M.D.", "BAMS", "BHMS", "BDS", "M.S. (Medicine)", "MVSc.", "BvSc.", "MDS", "BPT", "MPT", "DM", "MCh"]
    },
    {
      group: 'Law',
      mapping_id: 4,
      names: ["BL\/LLB", "ML\/LLM"]
    },
    {
      group: 'Arts\/Science"',
      mapping_id: 4,
      names: ["B.A", "B.Sc.", "M.A.", "M.Sc.", "B.Ed", "M.Ed", "MSW", "BFA", "MFA", "BJMC", "MJMC"]
    },
    {
      group: 'Doctorate',
      mapping_id: 4,
      names: ["Ph.D", "M.Phil"]
    },
    {
      group: 'Non Graduate',
      mapping_id: 4,
      names: ["Diploma", "High School", "Trade School", "Other"]
    }
  ];
  stateGroups: StateGroup[] = [{
    letter: 'North',
    names: ["Hindi-Delhi",
      'Hindi-MP',
      'Hindi-UP',
      'Punjabi',
      'Bihari',
      'Rajasthani/Marwari',
      'Haryanvi',
      'Himachali',
      'Kashmiri',
      'Sindhi', 'Urdu'
    ]
  }, {
    letter: 'East',
    names: ['Bengali', 'Oriya', 'Assamese', 'Sikkim/ Nepali']
  }, {
    letter: 'South',
    names: ['Tamil',
      'Telugu',
      'Kannada',
      'Malayalam',
      'Tulu',
      'Urdu'
    ]
  }, {
    letter: 'West',
    names: ['Marathi',
      'Gujarati / Kutchi',
      'Hindi-MP',
      'Konkani',
      'Sindhi'
    ]
  }, {
    letter: 'Others',
    names: ['English']
  }];
  Heights: string[] = ['4.0"', '4.1"', '4.2"', '4.3"', '4.4"', '4.5"', '4.6"', '4.7"', '4.8"', '4.9"', '5.0', '5.1"', '5.2"', '5.3"', '5.5"', '5.5"', '5.6"', '5.7"', '5.8"', '5.9"', '6.0"', '6.1"', '6.2"', '6.3"', '6.6"', '6.5"', '6.6"', '6.7"', '6.8"', '6.9"', '7.0"'];
  Religions: string[] = ['Hindu', 'Muslim', 'Sikh', 'Christian', 'Buddhist', 'Jain', 'Parsi', 'Jewish', 'Bahai'];
  MaritalStaus: string[] = ['Never Married', 'Awaiting Divorce', 'Divorced', 'Widowed', 'Anulled'];
  Occupation: string[] = ['Private Company', 'Business/Self Employed', 'Government Job', 'Doctor', 'Teacher', 'Not Working'];
  Working: string[] = ['Working', 'Not Working', "Doesn't matter"]
  AnnualIncome: any[] = ['No Income', 'Rs 0-1 Lakh', 'Rs 1-2 Lakh', 'Rs 2-3 Lakh', 'Rs 3-4 Lakh', 'Rs 4-5 Lakh', 'Rs 5-7.5 Lakh',
    'Rs 7.5-12 Lakh',
    'Rs 12-15 Lakh', 'Rs 15-20 Lakh', 'Rs 20-25 Lakh', 'Rs 25-50 Lakh', 'Rs 50Lakh-1Crore', 'Rs 1Crore+'
  ];
  Castes: hd[];
  Mangalika: string[];
  HoroScope: string[];
  Sects: string[];
  foodpreferences1: string[] = ['Non-vegetarian', 'Vegetarian'];
  foodpreferences: string[] = ["Doesn't matter", 'Non-vegetarian', 'Vegetarian'];
  createProfile: string[] = ['Self', 'Son', 'Daughter', 'Brother', 'Sister', 'Other'];
  Gender: string[] = ['Male', 'Female', 'Others'];
  FamilyType: string[] = ['JointFamily', 'Nuclear Family', 'Others'];
  FatherOccupation: string[] = ['Buisness', 'Service', 'Army'];
  MotherOccupation: string[] = ['Housewife', 'Buisness', 'Service', 'Army', 'Private Company',
    'Business/Self Employed', 'Government Job', 'Doctor', 'Teacher', 'Not Working'
  ];
  Brother: any[] = ['None', 0, 1, 2, 3, '3+'];
  Sister: any[] = ['None', 0, 1, 2, 3, '3+'];
  state: string[] = ['Andaman & Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh',
    'Assam', 'Bihar', 'Chhattisgarh', 'Dadra & Nagar Haveli',
    'Daman & Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir',
    'Jharkhand', 'Karnataka', 'Kerala', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Pondichery', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];


  FamilyOptions: Observable < string[] > ;
  ProfileOptions: Observable < string[] > ;
  GenderOptions: Observable < string[] > ;
  fo: Observable < string[] > ;
  mo: Observable < string[] > ;
  bro: Observable < any[] > ;
  sis: Observable < any[] > ;
  stateo: Observable < string[] > ;
  citis: Observable < string[] > ;
  ReligionOptions: Observable < string[] > ;
  MartalStatusOtions: Observable < string[] > ;
  stateGroupOptions: Observable < StateGroup[] > ;
  CasteOptions: Observable < hd[] > ;
  MangalikOptions: Observable < string[] > ;
  HoroScopeOptions: Observable < string[] > ;
  OccupatiinOptions: Observable < string[] > ;
  AOptions: Observable < any[] > ;
  HigherEducationOptions: Observable < hd[] > ;
  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder, private Auth: AuthService, private router: Router,
    private ngxNotificationService: NgxNotificationService) {
    this.stateForm = this._formBuilder.group({
      'stateGroup': ['', Validators
        .compose([Validators.required])
      ],
      'Religion': ['', Validators.compose([Validators.required])],
      'MaritalStatus': ['', Validators.compose([Validators.required])],
      'Height': ['', Validators.compose([Validators.required, Validators.maxLength(4)])],
      'Weight': ['', Validators.compose([Validators.required, Validators.maxLength(4)])],
      'Castes': ['', Validators.compose([])],
      'Mangalik': ['', Validators.compose([])],
      'gotra': ['', Validators.compose([])],
      'HoroScope': ['', Validators.compose([])],
      'Sect': ['', Validators.compose([])],
      'Open': [false],
      'Currentcity': ['', Validators.compose([Validators.required])],
    });
    this.PageOne = this._formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required])],
      'fullname': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'create': ['', Validators.compose([Validators.required])],
      'gender': ['', Validators.compose([Validators.required])],
      'phone': ['', Validators.compose([Validators.pattern('[0-9]*'),
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])],
      'whatsapp': ['', Validators.compose([Validators.pattern('[0-9]*'),
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])],
      // 'Date': ['', Validators.compose([Validators.required])],
      // 'birth_time': ['', Validators.compose([Validators.required])],
      // 'birth_place': ['', Validators.compose([Validators.required])],
      // 'food_choice': ['', Validators.compose([Validators.required])],

    });
    this.EducationDetails = this._formBuilder.group({
      'HighestDegree': ['', Validators.compose([Validators.required])],
      'UgCollege': [''],
      'additional_qualification': [''],
      'Occupation': ['', Validators.compose([Validators.required])],
      'profession': ['', Validators.compose([Validators.required])],
      'AnnualIncome': ['', Validators.compose([Validators.required])],
      'Yourself': ['', Validators.compose([Validators.required])],
      'Company': ['', Validators.compose([Validators.required])],
    });
    this.FamilyDetails = this._formBuilder.group({
      'FamilyType': [''],
      'father_status': [''],
      'mother_status': [''],
      'FatherOccupation': [''],
      'MotherOccupation': [''],
      'brother': [''],
      'sister': [''],
      'umbrother': [''],
      'umsister': [''],
      'state': [''],
      'city': [''],
      'address': [''],
      'about': [''],
      'house_type': [''],
      'family_income': ['']
    });
    this.PreferencesDetails = this._formBuilder.group({
      'description': [''],
      'age_min': [''],
      'age_max': [''],
      'height_min': [''],
      'height_max': [''],
      'caste': [
        [], Validators.required
      ],
      'marital_status': [''],
      'manglik': [''],
      'working': [''],
      'food_choice': [''],
      'mother_tongue': [''],
    });

  }





  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({
          letter: group.letter,
          names: _filter(group.names, value)
        }))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }
  private _educGroup(value: string): hd[] {
    if (value) {
      return this.HigherEducation
        .map(group => ({
          group: group.group,
          names: _filter(group.names, value),
          mapping_id: group.mapping_id
        }))
        .filter(group => group.names.length > 0);
    }

    return this.HigherEducation;
  }
  private _Castefilter(value: string): hd[] {
    if (value) {
      return this.Castes
        .map(group => ({
          group: group.group,
          names: _filter(group.names, value),
          mapping_id: group.mapping_id
        }))
        .filter(group => group.names.length > 0);
    }
    return this.Castes;
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.Religions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _profilefilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.createProfile.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _genderfilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.Gender.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _ofilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.Occupation.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _Afilter(value: any): any[] {
    const filterValue = value.toLowerCase();

    return this.AnnualIncome.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _Maritalfilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.MaritalStaus.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _Mangalikfilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.Mangalika.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _HoroScopefilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.HoroScope.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private ft(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.FamilyType.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private fato(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.FatherOccupation.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private mato(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.MotherOccupation.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private brot(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.Brother.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private sist(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.Sister.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private stt(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.state.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  // Calucalting age
  calculateAge(event: any) {
    this.birthDate = convert(event);
    const timediffernce = Math.abs(Date.now() - event);
    this.currentAge = Math.floor((timediffernce / (1000 * 3600 * 24)) / 365);

    function convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("/");

    }
    this.addSlashes();

    if (this.currentAge < 18) {
      this.birthdayValid = false;
    } else {
      this.birthdayValid = true;
    }

    console.log('birth data', this.birthDate);
    console.log('event data', event);
    console.log(typeof event);

  }

  onDate(event): void {
    console.log(event);
  }

  // Calucalting age
  calculateTime(event: any) {
    //   this.birthDate = convert(event);
    //   const timediffernce = Math.abs(Date.now() - event);
    //   this.currentAge = Math.floor((timediffernce / (1000 * 3600 * 24)) / 365);

    //   function convert(str) {
    //     var date = new Date(str),
    //         mnth = ("0" + (date.getMonth()+1)).slice(-2),
    //         day  = ("0" + date.getDate()).slice(-2);
    //     return [ day, mnth,date.getFullYear()  ].join("/");

    // }
    // this.addSlashes();

    //   if (this.currentAge < 18) {
    //     this.birthdayValid = false;
    //   } else {
    //     this.birthdayValid = true;
    //   }

    //   console.log('birth data',this.birthDate);
    console.log('event data', event);
    console.log(typeof event);

  }

  addSlashes() {
    console.log('sv');
    var newInput = document.getElementById("birthDate");
    newInput.addEventListener('keydown', function (e) {
      if (e.which !== 8) {
        var numChars = ( < HTMLInputElement > e.target).value.length;
        if (numChars === 2 || numChars === 5) {
          var thisVal = ( < HTMLInputElement > e.target).value;
          thisVal += '-';
          ( < HTMLInputElement > e.target).value = thisVal;
        }
      }
    });
  }

  Religion(event) {
    console.log(event.currentTarget.value);
    if (event.currentTarget.value === 'Hindu') {
      this.Castes = [{
          group: 'A',
          mapping_id: 4,
          names: [
            'Ad Dharmi',
            'Adi Andhra',
            'Adi Dravida',
            'Adi Karnataka',
            'Agamudayar',
            'Aggarwal',
            'Agri',
            'Ahir',
            'Ahom',
            'Ambalavasi',
            'Arora',
            'Arunthathiyar',
            'Arya Vysya'
          ]
        }, {
          group: 'B',
          mapping_id: 2,
          names: ['Baghel/Gaderiya',
            'Baidya',
            'Baishnab',
            'Baishya',
            'Balija',
            'Balija Naidu',
            'Bania',
            'Banik',
            'Banjara',
            'Bari',
            'Barujibi',
            'Besta',
            'Bhandari',
            'Bhatia',
            'Bhatraju',
            'Bhavsar',
            'Bhovi/Bhoi',
            'Billava',
            'Bisa Agarwal',
            'Bishnoi/Vishnoi',
            'Boyer',
            'Brahmbatt',
            'Brahmin',
            'Brahmin 6000 Niyogi',
            'Brahmin Anavil',
            'Brahmin Audichya',
            'Brahmin Bajkhedwal',
            'Brahmin Bardai',
            'Brahmin Barendra',
            'Brahmin Bhargava',
            'Brahmin Bhatt',
            'Brahmin Bhumihar',
            'Brahmin Brahacharanam',
            'Brahmin BrahmBhatt',
            'Brahmin Brajastha Mathil',
            'Brahmin Dadhich',
            'Brahmin Daivadnya',
            'Brahmin Deshastha',
            'Brahmin Deshastha',
            'Brahmin Dhiman',
            'Brahmin Dravida',
            'Brahmin Dunua',
            'Brahmin Embrandiri',
            'Brahmin Garhwali',
            'Brahmin Gaud Saraswat (GSB)',
            'Brahmin Gaur',
            'Brahmin Goswami',
            'Brahmin Gujar Gaur',
            'Brahmin Gurukkal',
            'Brahmin Halua',
            'Brahmin Havyaka',
            'Brahmin Hoysala',
            'Brahmin Iyengar',
            'Brahmin Iyer',
            'Brahmin Jangid',
            'Brahmin Jangra',
            'Brahmin Jhadua',
            'Brahmin Jhijhotiya',
            'Brahmin Jogi',
            'Brahmin Jyotish',
            'Brahmin Kanyakubj',
            'Brahmin Karhade',
            'Brahmin Kashmiri Pandit',
            'Brahmin Khadayat',
            'Brahmin Khandelwal',
            'Brahmin Khedaval',
            'Brahmin Koknastha',
            'Brahmin Kota',
            'Brahmin Kulin',
            'Brahmin Kumaoni',
            'Brahmin Madhwa',
            'Brahmin Maithil',
            'Brahmin Malviya',
            'Brahmin Mevada',
            'Brahmin Modh',
            'Brahmin Mohyal',
            'Brahmin Nagar',
            'Brahmin Namboodiri',
            'Brahmin Narmadiya',
            'Brahmin Paliwal',
            'Brahmin Panda',
            'Brahmin Pandit',
            'Brahmin Panicker',
            'Brahmin Pareek',
            'Brahmin Pushkarna',
            'Brahmin Rajgor',
            'Brahmin Rarhi',
            'Brahmin Rigvedi',
            'Brahmin Rudraj',
            'Brahmin Sakaldwipi',
            'Brahmin Sanadya',
            'Brahmin Sanketi',
            'Brahmin Saraswat',
            'Brahmin Sarua',
            'Brahmin Saryuparin',
            'Brahmin Shivalli',
            'Brahmin Shrimali',
            'Brahmin Sikhwal',
            'Brahmin Smartha',
            'Brahmin Sri Vishnava',
            'Brahmin Stanika',
            'Brahmin Tapodhan',
            'Brahmin Tyagi',
            'Brahmin Vaidiki',
            'Brahmin Vaikhawas',
            'Brahmin Valam',
            'Brahmin Velanadu',
            'Brahmin Viswa',
            'Brahmin Vyas',
            'Brahmin Yajurvedi',
            'Brahmin Zalora',
            'Brahmo',
            'Bunt/Shetty'
          ]
        },
        {
          group: 'C',
          mapping_id: 4,
          names: [
            'Chamar', 'Chambhar', 'Chandravanshi Kahar', 'Chasa', 'Chattada Sri Vaishnava', 'Chaudary', 'Chaurasia', 'Chettiar', 'Chhetri', 'CKP', 'Coorgi'
          ]
        },
        {
          group: 'D',
          mapping_id: 4,
          names: ['Deshastha Maratha',
            'Devadigas',
            'Devang Koshthi',
            'Devanga',
            'Devendra Kula Vellalar',
            'Dhangar',
            'Dheevara',
            'Dhoba',
            'Dhobi',
            'Dusadh'
          ]
        },
        {
          group: 'E',
          mapping_id: 4,
          names: ['Edigas', 'Ezhava', 'Ezhuthachan']
        },
        {
          group: 'G',
          mapping_id: 3,
          names: ['Gabit',
            'Ganiga',
            'Garhwali',
            'Gavali',
            'Gavara',
            'Ghumar',
            'Goala',
            'Goan',
            'Gomantak Maratha',
            'Gondhali',
            'Goud',
            'Gounder',
            'Gowda',
            'Gramani',
            'Gudia',
            'Gujjar',
            'Gupta',
            'Gurav'
          ]
        },
        {
          group: 'H',
          mapping_id: 4,
          names: ['Hegde']
        },
        {
          group: 'J',
          mapping_id: 4,
          names: ['Jaiswal', 'Jangam', 'Jat', 'Jatav']
        },
        {
          group: 'K',
          mapping_id: 1,
          names: ['Kadava patel',
            'Kahar',
            'Kaibarta',
            'Kalal',
            'Kalar',
            'Kalinga Vysya',
            'Kalwar',
            'Kamboj',
            'Kamma',
            'Kansari',
            'Kapol',
            'Kapu',
            'Kapu Munnuru',
            'Karana',
            'Karmakar',
            'Karuneegar',
            'Kasar',
            'Kashyap',
            'Kayastha',
            'Khandayat',
            'Khandelwal',
            'Kharwar',
            'Khatik',
            'Khatri',
            'Kokanastha Maratha',
            'Koli',
            'Koli Mahadev',
            'Kongu Vellala Gounder',
            'Konkani',
            'Kori',
            'Koshti',
            'Kshatriya',
            'Kshatriya Agnikula',
            'Kudumbi',
            'Kulalar',
            'Kulita',
            'Kumawat',
            'Kumbhakar',
            'Kumhar/Kumbhar',
            'Kummari',
            'Kunbi',
            'Kurmi',
            'Kurmi kshatriya',
            'Kuruba',
            'Kuruhina shetty',
            'Kurumbar',
            'Kushwaha',
            'Kutchi',
            'Kutchi Gurjar'
          ]
        },
        {
          group: 'L',
          mapping_id: 4,
          names: [
            'Lambadi',
            'Leva Patidar',
            'Leva Patil',
            'Lingayat',
            'Lodhi Rajput',
            'Lohana',
            'Lohar',
            'Lubana'
          ]
        },

        // {
        //   group: 'Doctorate',

        //   names: ["Ph.D", "M.Phil"]
        // ,
        // {
        //   group: 'Doctorate',

        //   names: ["Ph.D", "M.Phil"]
        // ,

        // {
        //   group: 'Doctorate',

        //   names: ["Ph.D", "M.Phil"]
        // ,
        // {
        //   group: 'Doctorate',

        //   names: ["Ph.D", "M.Phil"]
        // ,
        // {
        //   group: 'Doctorate',

        //   names: ["Ph.D", "M.Phil"]
        // ,
        // {
        //   group: 'Doctorate',

        //   names: ["Ph.D", "M.Phil"]
        // },
        // {
        //   group: 'Doctorate',

        //   names: ["Ph.D", "M.Phil"]
        // },
        // {
        //   group: 'Doctorate',

        //   names: ["Ph.D", "M.Phil"]
        // },
        // {
        //   group: 'Doctorate',

        //   names: ["Ph.D", "M.Phil"]
        // },
        // {
        //   group: 'Doctorate',

        //   names: ["Ph.D", "M.Phil"]
        // },
        // {
        //   group: 'Doctorate',

        //   names: ["Ph.D", "M.Phil"]
        // },
        // {
        //   group: 'Doctorate',

        //   names: ["Ph.D", "M.Phil"]
        // }
      ];
      this.Mangalika = ['Manglik', 'Non-manglik', 'Anshik manglik'];
      this.HoroScope = ['Must', 'Not Necessary'];
      this.Caste = true;
      this.S = false;
      this.AllCastes = true;
      this.HoroScopes = true;
      this.Mangaliks = true;
    } else if (event.currentTarget.value === 'Muslim') {
      this.Castes = [{
        group: 'S',
        mapping_id: 4,
        names: ['Shia', 'Sunni']
      }];
      this.Caste = true;
      this.Sects = ['Shia', 'Sunni'];
      this.S = true;
      this.AllCastes = false;
      this.HoroScopes = false;
      this.Mangaliks = false;
    } else if (event.currentTarget.value === 'Sikh') {
      this.Castes = [{
          group: 'A',
          mapping_id: 4,
          names: ['Arora']
        },
        {
          group: 'B',
          mapping_id: 4,
          names: ['Bhatia']
        },
        {
          group: 'G',
          mapping_id: 4,
          names: ['Gurkish']
        },
        {
          group: 'j',
          mapping_id: 4,
          names: ['jat']
        },
        {
          group: 'l',
          mapping_id: 4,
          names: ['Labana']
        },
        {
          group: 'M',
          mapping_id: 4,
          names: ['Mazbhi']
        },
        {
          group: 'O',
          mapping_id: 4,
          names: ['Others']
        },
        {
          group: 'R',
          mapping_id: 4,
          names: ['Rajput', 'Rmadasia', 'Ramagharia']
        },
        {
          group: 'S',
          mapping_id: 4,
          names: ['Saini']
        },
      ];
      this.Caste = true;
      this.S = false;
      this.AllCastes = true;
      this.HoroScopes = true;
      this.Mangaliks = true;
    } else if (event.currentTarget.value === 'Christian') {
      this.Caste = false;
      this.Sects = ['AngloIndia', 'BornIndian'];
      this.S = true;
      this.AllCastes = false;
      this.HoroScopes = false;
      this.Mangaliks = false;
    } else if (event.currentTarget.value === 'Buddhist') {
      this.Caste = false;
      this.S = false;
      this.AllCastes = false;
      this.HoroScopes = true;
      this.Mangalika = ['Manglik', 'Non-manglik', 'Anshik manglik'];
      this.HoroScope = ['Must', 'Not Necessary'];
      this.Mangaliks = true;
    } else if (event.currentTarget.value === 'Jain') {
      this.Castes = [{
          group: 'D',
          mapping_id: 4,
          names: ['Digamber']
        },
        {
          group: 'O',
          mapping_id: 4,
          names: ['Others']
        },
        {
          group: 'S',
          mapping_id: 4,
          names: ['Shwetamber']
        },
      ];
      this.Mangalika = ['Manglik', 'Non-manglik', 'Anshik manglik'];
      this.HoroScope = ['Must', 'Not Necessary'];
      this.Caste = true;
      this.S = false;
      this.AllCastes = true;
      this.HoroScopes = true;
      this.Mangaliks = true;
    } else if (event.currentTarget.value === 'Parsi') {
      this.Caste = false;
      this.S = false;
      this.AllCastes = false;
      this.HoroScopes = false;
      this.Mangaliks = false;
    } else if (event.currentTarget.value === 'Jewish') {
      this.Caste = false;
      this.S = false;
      this.AllCastes = false;
      this.HoroScopes = false;
      this.Mangaliks = false;
    } else if (event.currentTarget.value === 'Bahai') {
      this.Caste = false;
      this.S = false;
      this.AllCastes = false;
      this.HoroScopes = false;
      this.Mangaliks = false;
    }
  }



  //OTP
  makeItTrue() {
    if (this.changeNumber == false)
      this.changeNumber = true;
    else
      this.changeNumber = false;

    console.log(this.changeNumber);
  }
  numberChange(event: any) {
    console.log('asd', event);
    this.PageOne.value.phone = event.target.value();

  }



  makeOtp() {
    this.otp1 = < HTMLInputElement > document.getElementById('enterOTP1');
    this.otp += this.otp1.value;

    this.otp2 = < HTMLInputElement > document.getElementById('enterOTP2');
    this.otp += this.otp2.value;

    this.otp3 = < HTMLInputElement > document.getElementById('enterOTP3');
    this.otp += this.otp3.value;

    this.otp4 = < HTMLInputElement > document.getElementById('enterOTP4');
    this.otp += this.otp4.value;
  }

  changePlaces(event) {
    let element = event.srcElement.nextElementSibling; // get the sibling element

    if (element == null) // check if its null
      return;
    else
      element.focus(); // focus if not null
    console.log("cngd");
  }

  openPhotoDialog(dialog): void {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(dialog, {
      height: '50%',
      width: '37%'
      // panelClass: 'custom-modalbox'
    });
  }


  openDialog(dialog): void {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(dialog, {

      // panelClass: 'custom-modalbox'
    });
    this.sendOtp();
  }

  Cross_click() {
    this.dialog.closeAll();
  }

  sendOtp() {
    console.log('changenumber', this.changeNumber)
    if (this.changeNumber == true) {
      let changeContact = < HTMLInputElement > document.getElementById('changeContact');
      console.log(changeContact);
      this.PageOne.value.phoneNumber = changeContact.value;
      console.log(changeContact);
    }
    let mobileNumber = {
      'mobile': this.PageOne.value.phone
    }
    this.Auth.sendOtp(mobileNumber).subscribe(res => {
      console.log(res);

    });
  }

  resendOtp() {
    let mobileNumber = {
      'mobile': this.PageOne.value.phone
    }
    this.Auth.resendOtp(mobileNumber).subscribe(res => {
      console.log(res);
    });
  }

  verifyOtp() {
    this.makeOtp();
    console.log('otp', this.otp);
    let otp = {
      'otp': this.otp,
      'mobile': this.PageOne.value.phone
    }
    this.Auth.verifyOtp(otp).subscribe(res => {
      console.log('verify res', res);
      this.otp = '';
      this.ngxNotificationService.sendMessage(res.message, 'success', 'top-right');
      if (res.type == "success") {
        this.Cross_click();
        this.otpVerified = true;
        if (this.otpVerified == true) {
          console.log('vrfed', this.otpVerified);
          this.ngxNotificationService.sendMessage('Account Details Submitted Succesfully!', 'success', 'top-right');

          this.firstStep();
          this.otpVerified = false;
        }
      }
    });
  }


  checkExist() {
    let data = {
      email: this.PageOne.value.email,
      mobile: this.PageOne.value.phone
    }
    this.Auth.checkExist(data).subscribe(res => {
      console.log(res);
      this.ngxNotificationService.sendMessage(res.error_message, 'success', 'top-right');
      if (res.isUnique != "N") {
        this.openDialog(this.otpModal);
        console.log('vrfied', this.otpVerified);
      }
      else{
        alert('number already exists !!');
      }
    })
  }

  firstStep() {
    const firststepdata = new URLSearchParams();
    firststepdata.set('email', this.PageOne.value.email);
    firststepdata.set('password', this.PageOne.value.password);
    firststepdata.set('relation', this.PageOne.value.create);
    firststepdata.set('gender', this.PageOne.value.gender);
    firststepdata.set('name', this.PageOne.value.fullname);
    // firststepdata.set('birth_time', this.PageOne.value.birth_time);
    // firststepdata.set('birth_place', this.PageOne.value.birth_place);
    // firststepdata.append('food_choice', this.PageOne.value.food_choice);
    // firststepdata.set('birth_date', this.birthDate);
    firststepdata.set('whatsapp', this.PageOne.value.whatsapp);
    firststepdata.set('mobile', this.PageOne.value.phone);
    this.isCompleted1 = true;
    this.gender = this.PageOne.value.gender;
    console.log(this.gender);

    if (this.gender == "Male") {
      this.minAge = this.currentAge - 5;
      this.maxAge = this.currentAge;
    } else {
      this.maxAge = this.currentAge + 5;
      this.minAge = this.currentAge;
    }
    console.log(this.minAge);
    this.Auth.firstPage(firststepdata).subscribe((res: any) => {

      console.log('first', res);
      this.ngxNotificationService.sendMessage(res.error_message, 'success', 'top-right');
      localStorage.setItem('identity_number', res.identity_number);
      if(res.zeroth_page_status === 'Y')
       this.router.navigate(['/register-one']);
      else
       alert('Email already exists!!'); 

    }, err => {
      this.ngxNotificationService.sendMessage('SomeThing Went Wrong,Please try again AfterSome time!', 'danger', 'top-right');
      console.log(err);
    });
  }

  // autocomplete() {
  //   this._loader.load().then(() => {
  //       let autocomplete = new google.maps.places.Autocomplete(<HTMLInputElement>document.getElementById("cityAutoComplete"), {});
  //       google.maps.event.addListener(autocomplete, 'place_changed', () => {
  //           let place = autocomplete.getPlace();
  //           console.log(place);
  //       });
  //   });
  // }
  secondStep() {
    const secondstepdata = new FormData();
    secondstepdata.append('identity_number', localStorage.getItem('identityNumber'));
    secondstepdata.append('mother_tongue', this.stateForm.value.stateGroup);
    secondstepdata.append('religion', this.stateForm.value.Religion);
    secondstepdata.append('caste_no_bar', this.stateForm.value.Open);
    secondstepdata.append('caste', this.stateForm.value.Castes);
    secondstepdata.append('manglik', this.stateForm.value.Mangalik);
    secondstepdata.append('gotra', this.stateForm.value.gotra);
    secondstepdata.append('horoscope', this.stateForm.value.HoroScope);
    secondstepdata.append('marital_status', this.stateForm.value.MaritalStatus);
    secondstepdata.append('height', this.Heights[this.stateForm.value.Height]);
    secondstepdata.append('weight', this.stateForm.value.Weight);
    secondstepdata.append('country', this.stateForm.value.phoneNumber);
    secondstepdata.append('state', this.stateForm.value.phoneNumber);
    secondstepdata.append('city', this.stateForm.value.Currentcity);

    this.isCompleted2 = true;
    this.currentCity = this.stateForm.value.Currentcity;
    this.caste = this.stateForm.value.Castes;
    this.maritalStatus = this.stateForm.value.MaritalStatus;
    this.motherTongue = this.stateForm.value.stateGroup;
    this.manglikValue = this.stateForm.value.Mangalik;
    console.log(this.manglikValue);


    if (this.manglikValue == 'Manglik') {
      console.log('svs1');
      this.prefManglik = this.manglikPreference;
    } else if (this.manglikValue == 'Non-manglik') {
      console.log('svs2');
      this.prefManglik = this.nonManglikPreference;
    } else {
      this.prefManglik = [];
      this.prefManglik.push("Doesn't matter");
    }
    console.log(this.prefManglik);

    localStorage.setItem('prefManglik', JSON.stringify(this.prefManglik));

    console.log('manglik_id', this.manglikValue);
    console.log('caste_id', JSON.parse(localStorage.getItem('mapping_id')));
    secondstepdata.append('manglik_id', this.manglikValue);
    secondstepdata.append('caste_id', JSON.parse(localStorage.getItem('mapping_id')));

    if (this.gender == "Male") {
      if (this.stateForm.value.Height < 10)
        this.minHeight = this.Heights[0];
      else
        this.maxHeight = this.Heights[this.stateForm.value.Height - 1];

      if (this.stateForm.value.Height > 10)
        this.minHeight = this.Heights[this.stateForm.value.Height - 9];
      else
        this.maxHeight = this.Heights[this.stateForm.value.Height - 1];
    } else {
      if (this.stateForm.value.Height < 21)
        this.minHeight = this.Heights[this.stateForm.value.Height + 1];
      else
        this.maxHeight = this.Heights[this.stateForm.value.Height + 9];

      if (this.stateForm.value.Height > 21)
        this.minHeight = this.Heights[this.stateForm.value.Height + 1];
      else
        this.maxHeight = this.Heights[this.Heights.length - 1];
    }
    console.log(this.minHeight, " ", this.maxHeight);

    this.Auth.secondPage(secondstepdata).subscribe(suc => {
      console.log('suc', suc);
      this.ngxNotificationService.sendMessage('Profile Details Submitted Succesfully!', 'success', 'top-right');
      this.PreferencesDetails.patchValue({
        age_min: this.minAge,
        age_max: this.maxAge,
        height_min: this.minHeight,
        height_max: this.maxHeight,
        marital_status: this.maritalStatus,
        working: "Doesn't matter",
        food_choice: this.foodpreferences[0],
        mother_tongue: this.motherTongue,
      });
    
    }, err => {
      this.ngxNotificationService.sendMessage('SomeThing Went Wrong,Please try again AfterSome time!', 'danger', 'top-right');
      // console.log(err);
    });
  }
  thirdStep() {
    const thirdstepdata = new FormData();
    thirdstepdata.append('identity_number', localStorage.getItem('identityNumber'));
    thirdstepdata.append('degree', this.EducationDetails.value.HighestDegree);
    thirdstepdata.append('college', this.EducationDetails.value.UgCollege);
    thirdstepdata.append('additional_qualification', this.EducationDetails.value.additional_qualification);
    thirdstepdata.append('occupation', this.EducationDetails.value.Occupation);
    thirdstepdata.append('profession', this.EducationDetails.value.profession);
    thirdstepdata.append('company', this.EducationDetails.value.Company);
    thirdstepdata.append('annual_income', this.EducationDetails.value.AnnualIncome);
    thirdstepdata.append('about', this.EducationDetails.value.Yourself);
    this.isCompleted3 = true;

    this.Auth.thirdPage(thirdstepdata).subscribe(suc => {
      this.ngxNotificationService.sendMessage('Education Details Submitted Succesfully!', 'success', 'top-right');
      this.castePref = this.castePref.filter(elem => {
        return elem.mapping_id == this.mapping_id
      });
      if (this.castePref[0].castes.length > 0)
        this.castePref = this.castePref[0].castes.split(',');
     
    }, err => {
      this.ngxNotificationService.sendMessage('SomeThing Went Wrong,Please try again AfterSome time!', 'danger', 'top-right');
      // console.log(err);
    });
  }
  fourthStep() {
    const fourthstepdata = new FormData();
    fourthstepdata.append('identity_number', localStorage.getItem('identityNumber'));
    fourthstepdata.append('family_type', this.FamilyDetails.value.FamilyType);
    fourthstepdata.append('father_status', this.FamilyDetails.value.father_status);
    fourthstepdata.append('mother_status', this.FamilyDetails.value.mother_status);
    fourthstepdata.append('occupation_father', this.FamilyDetails.value.FatherOccupation);
    fourthstepdata.append('occupation_mother', this.FamilyDetails.value.MotherOccupation);
    fourthstepdata.append('family_income', this.FamilyDetails.value.family_income);
    fourthstepdata.append('house_type', this.FamilyDetails.value.house_type);
    fourthstepdata.append('married_sons', this.FamilyDetails.value.brother);
    fourthstepdata.append('unmarried_sons', this.FamilyDetails.value.umbrother);
    fourthstepdata.append('married_daughters', this.FamilyDetails.value.sister);
    fourthstepdata.append('unmarried_daughters', this.FamilyDetails.value.umsister);
    fourthstepdata.append('locality', this.FamilyDetails.value.state);
    fourthstepdata.append('city', this.FamilyDetails.value.city);
    fourthstepdata.append('address', this.FamilyDetails.value.address);
    fourthstepdata.append('about', this.FamilyDetails.value.about);
    this.isCompleted4 = true;

    this.Auth.FourthPage(fourthstepdata).subscribe(suc => {
      console.log(suc);
      this.ngxNotificationService.sendMessage('Family Details Submitted Succesfully!', 'success', 'top-right');
     
    }, err => {
      this.ngxNotificationService.sendMessage('SomeThing Went Wrong,Please try again AfterSome time!', 'danger', 'top-right');
      // console.log(err);
      console.log(err);
    });
  }



  preview(files, index) {
    if (files.length === 0) {
      return;
    } else {
      const mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }

      const reader = new FileReader();
      this.imagePath = files[0];
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
        this.uploadPhoto(this.imagePath, index);

      };
    }
  }

  previewFull(files, index) {
    if (files.length === 0) {
      return;
    } else {
      const mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }

      const reader = new FileReader();
      this.fullimagePath = files[0];
      console.log(this.fullimagePath)
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.fullimgURL = reader.result;
        this.uploadPhoto(this.fullimagePath, index);
        console.log(this.fullimgURL);
      };
    }
  }

  previewfront(files, index) {

    if (files.length === 0) {
      return;
    } else {
      const mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }

      const reader = new FileReader();
      this.frontimagePath = files[0];
      console.log(this.frontimagePath);
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.frontfile = reader.result;
        this.uploadPhoto(this.frontimagePath, index);

      };
    }
  }

  previewBack(files, index) {

    if (files.length === 0) {
      return;
    } else {
      const mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }
      const reader = new FileReader();
      this.backimagePath = files[0];
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.BackimgURL = reader.result;
        this.uploadPhoto(this.backimagePath, index);

      };
    }
  }


  checkForPhoto() {
    if (!this.fullimagePath) {
      console.log("modal");
      this.openPhotoDialog(this.photoModal);
    } else {
      console.log("not modal");
      
    }
  }

  uploadPhoto(data, index) {
    let photoBtn = document.getElementById('photoBtn') as HTMLButtonElement;
    photoBtn.disabled = true;
    const fifthstepdata = new FormData();
    fifthstepdata.append('identity_number', localStorage.getItem('identityNumber'));
    fifthstepdata.append('url', data);
    fifthstepdata.append('index', index);

    this.Auth.FifthPage(fifthstepdata).subscribe(suc => {
      console.log('photos', suc);
      this.ngxNotificationService.sendMessage('Photo Uploaded Succesfully!', 'success', 'top-right');
      photoBtn.disabled = false;
    }, err => {
      this.ngxNotificationService.sendMessage('Photo could not be Uploaded!', 'success', 'top-right');
      // console.log(err);
      console.log(err);
    });
  }

  fifthStep() {

    this.isCompleted5 = true;
    for (let i = 0; i < this.castePref.length; i++) {
      this.dropdownList.push({
        id: i + 1,
        itemName: this.castePref[i]
      })
    }
    console.log(this.dropdownList);
    this.Cross_click();
    
  }

  sixthStep() {
    const sixthstepdata = new FormData();

    for (let items of this.PreferencesDetails.value.caste) {
      this.selectedItems1.push(items.itemName);
    }

    sixthstepdata.append('age_min', this.PreferencesDetails.value.age_min);
    sixthstepdata.append('age_max', this.PreferencesDetails.value.age_max);
    sixthstepdata.append('height_min', this.PreferencesDetails.value.height_min);
    sixthstepdata.append('height_max', this.PreferencesDetails.value.height_max);
    sixthstepdata.append('caste', this.selectedItems1);
    sixthstepdata.append('marital_status', this.PreferencesDetails.value.marital_status);
    sixthstepdata.append('manglik', this.PreferencesDetails.value.manglik);
    sixthstepdata.append('working', this.PreferencesDetails.value.working);
    sixthstepdata.append('food_choice', this.PreferencesDetails.value.food_choice);
    sixthstepdata.append('mother_tongue', this.PreferencesDetails.value.mother_tongue);
    sixthstepdata.append('description', this.PreferencesDetails.value.description);

    console.log(this.PreferencesDetails.value.caste);
    console.log("preferences", this.PreferencesDetails);
    console.log('preferences caste', this.selectedItems1);

    sixthstepdata.append('identity_number', localStorage.getItem('identityNumber'));
    this.Auth.SixthPage(sixthstepdata).subscribe(suc => {
      this.ngxNotificationService.sendMessage('Preferences Submitted Succesfully!', 'success', 'top-right');
     

      if (localStorage.getItem('loggedIn') != 'true') {
        let loader = document.getElementById('loader');
        loader.style.display = '';
      } else {
        let loader = document.getElementById('loader');
        loader.style.display = '';
      }

      this.router.navigateByUrl('dashboard');
      localStorage.setItem('loggedIn', 'true');
    }, err => {
      this.ngxNotificationService.sendMessage('SomeThing Went Wrong,Please try again AfterSome time!', 'danger', 'top-right');
      // console.log(err);
      console.log(err);
    });

  }

  ngOnInit() {

    this.getCastes();

    // this.autocomplete();
    this.Auth.getAlldegree().subscribe((res: any) => {
      this.HigherEducation.push(res);
      console.log(this.HigherEducation);
    }, err => {
      // console.log(err);
    });
    this.Auth.getcastes().subscribe(res => {
      console.log('cluster', res);
    }, err => {
      // console.log(err);
    })
    if (window.screen.width > 768) {
      this.Advertise = true;
    } else {
      this.Advertise = false;
    }
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    // tslint:disable-next-line:no-non-null-assertion
    this.stateGroupOptions = this.stateForm.get('stateGroup').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
    this.HigherEducationOptions = this.EducationDetails.get('HighestDegree').valueChanges
      .pipe(
        startWith(''),
        map(value => this._educGroup(value))
      );
    console.log(this.HigherEducationOptions);
    // tslint:disable-next-line:no-non-null-assertion
    this.ReligionOptions = this.stateForm.get('Religion').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    // tslint:disable-next-line:no-non-null-assertion
    this.MartalStatusOtions = this.stateForm.get('MaritalStatus').valueChanges.pipe(
      startWith(''),
      map(value => this._Maritalfilter(value))
    );
    // tslint:disable-next-line:no-non-null-assertion
    this.CasteOptions = this.stateForm.get('Castes').valueChanges.pipe(
      startWith(''),
      map(value => this._Castefilter(value))
    );
    this.ProfileOptions = this.PageOne.get('create').valueChanges.pipe(
      startWith(''),
      map(value => this._profilefilter(value))
    );
    this.GenderOptions = this.PageOne.get('gender').valueChanges.pipe(
      startWith(''),
      map(value => this._genderfilter(value))
    );
    this.MangalikOptions = this.stateForm.get('Mangalik').valueChanges.pipe(
      startWith(''),
      map(value => this._Mangalikfilter(value))
    );
    this.HoroScopeOptions = this.stateForm.get('Castes').valueChanges.pipe(
      startWith(''),
      map(value => this._HoroScopefilter(value))
    );
    this.OccupatiinOptions = this.EducationDetails.get('Occupation').valueChanges.pipe(
      startWith(''),
      map(value => this._ofilter(value))
    );
    this.AOptions = this.EducationDetails.get('AnnualIncome').valueChanges.pipe(
      startWith(''),
      map(value => this._Afilter(value))
    );
    this.FamilyOptions = this.FamilyDetails.get('FamilyType').valueChanges.pipe(
      startWith(''),
      map(value => this.ft(value))
    );
    this.fo = this.FamilyDetails.get('FatherOccupation').valueChanges.pipe(
      startWith(''),
      map(value => this.fato(value))
    );
    // tslint:disable-next-line:no-non-null-assertion
    this.mo = this.FamilyDetails.get('MotherOccupation').valueChanges.pipe(
      startWith(''),
      map(value => this.mato(value))
    );
    this.bro = this.FamilyDetails.get('brother').valueChanges.pipe(
      startWith(''),
      map(value => this.brot(value))
    );
    this.sis = this.FamilyDetails.get('sister').valueChanges.pipe(
      startWith(''),
      map(value => this.sist(value))
    );
    this.stateo = this.FamilyDetails.get('state').valueChanges.pipe(
      startWith(''),
      map(value => this.stt(value))
    );

    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'id',
    //   textField: 'itemName',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: true
    // };
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Castes",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
  }

  getCastes() {
    this.Auth.getCastes().subscribe((res) => {
      this.castePref = res;
      console.log(this.castePref);

    })
  }
  changeCaste(e) {
    console.log(e);
    this.mapping_id = e;
    localStorage.setItem('mapping_id', JSON.stringify(this.mapping_id));
    // this.castePref = this.castePref.filter( elem=>{ return elem.mapping_id==2});
    // console.log(this.castePref);


  }



  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
}


