
type State = {
    gender?:'m'|'f'
    location?:'iraq'|'middle east'|'other' 
    iraqLocation?:'baghdad'|'south'|'north'|'west'
    religion?:'sunni'|'shia'|'christian'|'subbi'|'yazidi'|'shabaki'|'irreligious'
}

const state:State = {};

const genderReplacements =  [
    {
        in: 'حضرتك' ,
        out: 'حضرتج' 
    }
] ;

const normalizeForGender =(sentence:string) => state.gender == 'f' ? genderReplacements.reduce((sentence,it) => sentence.replace(it.in,it.out),sentence): sentence;

class DialogNode {
    public answerLabel?:string; 
    public question:string; 
    public options:DialogOption[]; 
} 

class DialogOption {
    public label:string;
    public action: () => void
    public next:DialogNode;  
}  

const gender:DialogNode  =  {
    question: 'ولد لو بنية؟',
    options: [
        { label: 'ذكر',   action: () => state.gender = 'm', next: userLocation }
       ,{ label: 'أنثى', action: () => state.gender = 'f', next: userLocation }
    ]
} 

var religion:DialogNode = {
    question: normalizeForGender('حضرتك من يا دين؟ '),
    options: [
        { label: 'سني', action: () => state.religion = 'sunni' , next: sunniZero },
        { label: 'شيعي', action: () => state.religion = 'shia', next: shiaZero},
        { label:  'مسيحي', action: () => state.religion = 'christian', next: christianZero},
        { label: 'صبي' , action: () => state.religion = 'subbi', next: subbiZero},
        { label: 'يزيدي' , action: () => state.religion = 'yazidi', next: yazidiZero},
        { label:  'غير شي' , action: () => state.religion = 'yazidi', next: otherReligion},
        { label: 'وإنت شعليك؟', action:null, next: religion2 },
        { label:  'سالمين؟؟؟؟', action:null, next: religion3 }
    ] 
} 

var userLocation:DialogNode = {
    question: 'حضرتك وين ساكن',
    options: [
        { label: 'بالعراق', action: null, next:religion},
        { label: 'بالبيت ههههه', action: null, next:userLocationPushy},
        { label: 'بدولة مجاورة', action: null, next:religion},
        { label: 'بره العراق', action: null, next: religion},
    ]
}

var userLocationPushy:DialogNode = {
    question: 'ههههه حشاش بس لا لا عدا الشقة انت وين حتى اعرف شون اسالك صح فدوة لفكاهتك'
    ,options: [
        { label: 'بالعراق', action: null, next:religion},
        { label: 'بدولة مجاورة', action: null, next:religion},
        { label: 'بره العراق', action: null, next: religion},
        { label: 'ما أكلك هههه', action: null, next: religion},
    ]
} 

var sunniZero:DialogNode = {
    question: 'أها هيجي سنيّ عدل وكبل بلا مسلم، الله يخليك ويحفظك. السؤال الثانيّ شنو رأيك بالوضع؟'
    ,options: [
        { label: 'ميهمني', action:null},
        { label: 'ألف رحمة على روحك ابو عدايّ', action: null},
        { label: 'بزمن صدام جان الوضع أحسن', action: null},
        { label: 'أحسن شي نسوي أقليم و نكلب', action:null},
        { label: 'تعبان حيل بس لازم نحاول نغيره بالطرق السلمية', action:null},
        { label: 'ماكو فائدة، احسن شي الواحد يطفر بأي طريقة وهله بالعراق اللي بيه تربينا', action: null},
        { label: 'الوضع كلش زين ومنا لخمس سنين يصير العراق من أحسن الدول', action: null}
    ]
}

var iraqOctober:DialogNode = {
    question: 'هل غيرت أحداث تشرين 2019 من رأيك بخصوص العراق؟ ' 
    , options: [
        { label: 'نعم للأحسن',  action:null },
        { label: 'نفس الشي', action:null},
        { label: 'جوكرية ', action:null}
    ]
}

var iraq:DialogNode = {
    question: 'شنو رأيك بفكرة العراق؟ ' 
    ,options: [
        { label: 'العراق كيان سوته بريطانيا بال 1921 و ماكو اي رابط حقيقي بين مكوناته ', action:null }
        ,{ label: 'العراق حضارة عريقة تمتد لآلاف السنين واني افتخر بكوني عراقي', action:null }
        , {label: 'من زاخو للبصرة شلع قلع ', action: null}
        ,{label: ''}
    ]
} 

var iraqDecayReason:DialogNode = {
    question: 'ليش العراق طايح حظه برأيك؟ '
    ,options: [
        {label:  'لإن الدين اللي هو أساس تقسيم الناس حالياً ميخليهم يطلعون بره ويفكرون كعراقيين', action:null },
        {label: 'لإن إيران والعمايم مسيطرين عليه بشكل كامل', action:null }
    ]

}

var apathetic:DialogNode = {
    question: 'شعجب؟ ',
    options: [
        { label: 'يعني تريدني ابيع وطنيات براسك هوه اني ششفت من العراق غير الضيم و القهر خليها سكتة', action: null},
        { label: 'طفرت بره العراق و داعيش لنفسي ومندمج بالمجتمع اللي آني بيه ومتونس', action: null},
    ]

}


const girlQuestions = [
    "شنو رايج بالجنس",
    "مكبلة ويه ولد ",
    "محجبة",
    "زواج"
]

const atheistQuestions = [
    "شنو رايك بالإسلام",
]

const muslimQuestions = [
    "تصلي؟",
    "تصوم؟",
    "زاير بيت الله؟ ",
]

const shiaTree = [
    "شنو رأيك بالخلفاء الثلاثة",
    "شنو رأيك بإيران",
    "شنو رايك بالسيد السستاني",
    "شنو رايك بمقتدى الصدر",
] 

const sunniTree = [
    "شنو رأيك بصدام حسين",
    "شنو رأيك بالشيعة",
    "شنو رأيك بالسعودية",
    "شنو رأيك بالأقليم السني"
]   

const vices = [
    "تدخن",
    "تشرب",
    "تكفر",
    "تفشر",
    "شنو رايك بالمخدرات",
    "شنو رأيك بالمثليين جنسياً",
]

const sex = [
    "ممارس الحب سابقاً؟ ",
    "مكبل",
]  
