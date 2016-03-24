'use strict';

/**
 * @ngdoc overview
 * @name orizzonteMareApp
 * @description
 * # orizzonteMareApp
 *
 * Main module of the application.
 */
angular
  .module('orizzonteMareApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'infinite-scroll'
  ])
  .run(function($translate, Config) {
    // Set the current saved language
    $translate.use(Config.get('language'));
  })
  .config(function($translateProvider) {
    $translateProvider.translations('it', {
      'BUTTON_LANG_IT': 'Italiano',
      'BUTTON_LANG_EN': 'Inglese',
      'LANGUAGE_TITLE': 'Passato Nel Futuro',
      'CHOOSE_LANGUAGE': 'Scegli la tua lingua',
      'DASHBOARD_TITLE': 'Passato Nel Futuro',
      'DASHBOARD_INTRO': 'Ultimi diari condivisi',
      'OPEN_DIARY': 'APRI IL TUO DIARIO',
      'NICKNAME': 'Nickname',
      'AGE': 'Età',
      'GENDER': 'Sesso',
      'MALE': 'Uomo',
      'FEMALE': 'Donna',
      'DIARY_TITLE': 'Diario del Titerno',
      'DIARY_OF': 'diario di',
      'BACK': 'Indietro',
      'GUEST': 'Guest',
      // Diary sentences

   
   'diary_survey1_question_1_answer1': 'Dopo qualche ricerca in rete che ha colto la mia curiosità, eccomi finalmente nell’Area Archeologica denominata Vecchia Cerreto. Avevo già letto qualcosa, ma vederla dal vivo è davvero bello. Ed è evidente il gran lavoro delle equipe ancora alla ricerca di tesori all’interno dell’area archeologica.',
    'diary_survey1_question_1_answer2': 'Mi avevano parlato della Vecchia Cerreto, stuzzicando la mia curiosità… e allora eccomi finalmente nell’Area Archeologica. Di racconti ne avevo sentiti, ma vederla dal vivo è davvero bello. Ed è evidente il gran lavoro delle equipe ancora alla ricerca di tesori all’interno dell’area archeologica.',
    'diary_survey1_question_1_answer3': 'Ho letto e studiato parecchio della Vecchia Cerreto, e non potevo esimermi dal visitare questa Area Archeologica. Cinta muraria, utensili e strumenti…  vedere tutto questo dal vivo è davvero bello. Ed è evidente il gran lavoro delle equipe ancora alla ricerca di tesori all’interno dell’area archeologica.',
    'diary_survey1_question_2_answer1': 'Ho gradito molto la visita e spero un giorno di tornare all’ombra del torrione per scoprire nuovi reperti venuti alla luce!',
    'diary_survey1_question_2_answer2': 'Ho gradito molto la visita e, anzi, mi è dispiaciuto molto che sia finita così presto!',
    'diary_survey1_question_2_answer3': 'Ho gradito molto la visita… spero che il sito venga pubblicizzato più di quanto lo è oggi!',
    'diary_survey2_question_1_answer1': 'Ho appena messo piede a Cerreto e la prima cosa che mi ha colpito è la quantità di architetture civili e religiose di gran pregio…',
    'diary_survey2_question_1_answer2': 'Ho appena messo piede a Cerreto e la prima cosa che mi ha colpito è la fortissima tradizione legata all’artigianato e alla ceramica.',
    'diary_survey2_question_1_answer3': 'Ho appena messo piede a Cerreto e devo dire che è veramente bella… natura, architettura e la grande cordialità dei residenti.',
    'diary_survey2_question_2_answer1': 'Sono davvero contento di essere giunto qua con tutta la mia famiglia. Ognuno di noi è tornato a casa arricchito da questo posto.',
    'diary_survey2_question_2_answer2': 'Sono davvero contento di aver condiviso questo posto magico con il mio amore. Siamo entrambi tornati a casa arricchiti da questo posto.',
    'diary_survey2_question_2_answer3': 'Come al solito ho viaggiato da solo… è il modo migliore che conosca per tornare a casa arricchito da un posto, e Cerreto mi è entrata nel cuore.',
    'diary_survey3_question_1_answer1': 'Sono appena salito fin su a Pietraroja… attratto da questa rocca ai piedi del Matese. Fra fossili giurassici e montagne, questa è una terra mitologica.',
    'diary_survey3_question_1_answer2': 'Sono appena salito fin su a Pietraroja… attratto da questa rocca ai piedi del Matese. Fra fossili giurassici e montagne verdi, mi colpisce la purezza di questo posto.',
    'diary_survey3_question_1_answer3': 'Sono appena salito fin su a Pietraroja… attratto da questa rocca ai piedi del Matese. Fra fossili giurassici e montagne, questa è una terra fra le più preziose.',
    'diary_survey3_question_2_answer1': 'Visitato il museo ed esplorato il borgo, mi sono infine inoltrato fra i verdi e incontaminati sentieri del Matese.',
    'diary_survey3_question_2_answer2': 'Visitato il museo ed esplorato il borgo, mi è rimasto un unico rimpianto: inoltrarmi fra i verdi e incontaminati sentieri del Matese.',
    'diary_survey3_question_2_answer3': 'Visitato il museo ed esplorato il borgo, rientrando a casa ho salutato il mio amato Matese da lontano.',
    'diary_survey4_question_1_answer1': 'Cusano Mutri è davvero una piccola gemma: natura, tradizioni enogastronomiche ma soprattutto la bellezza del suo borgo…',
    'diary_survey4_question_1_answer2': 'Cusano Mutri è davvero una piccola gemma: un borgo bellissimo, natura, ma soprattutto le sue tradizioni…',
    'diary_survey4_question_1_answer3': 'Cusano Mutri è davvero una piccola gemma: un borgo bellissimo, tradizioni, ma soprattutto la sua natura e i suoi splendidi ingredienti…',
    'diary_survey4_question_2_answer1': 'Cusano mi ha davvero sorpreso. Non mi aspettavo di trovare qui un tale concentrato di bellezza storica, naturalistica ed enogastronomica... ',
    'diary_survey4_question_2_answer2': 'In tanti mi avevano parlato di Cusano, ma certamente la saluto con la consapevolezza che questo posto è più bello di come lo possano raccontare.',
    'diary_survey4_question_2_answer3': 'Cusano, come sempre, mi ha lasciato dentro la voglia di ritornarci: quando ho voglia di tranquillità e bellezza, torno sempre qua.',
    'diary_survey5_question_1_answer1': 'Dino Park è il parco tematico di San Lorenzello dedicato ai dinosauri e costruito a misura di bambino ma appassionante anche per gli adulti. Lo visiterò molto presto…',
    'diary_survey5_question_1_answer2': 'Dino Park è il parco tematico di San Lorenzello dedicato ai dinosauri e costruito a misura di bambino ma appassionante anche per gli adulti. Un modo originale, interattivo e multimediale per raccontare il mondo di migliaia di anni fa!',
    'diary_survey5_question_1_answer3': 'Dino Park è il parco tematico di San Lorenzello dedicato ai dinosauri e costruito a misura di bambino ma appassionante anche per gli adulti. I miei bimbi sono stati letteralmente incantati!',
    'diary_survey5_question_2_answer1': 'In questa bellissima cittadina esiste qualcosa che mi ci farà certamente ritornare: la lavorazione della ceramica e i suoi maestri.',
    'diary_survey5_question_2_answer2': 'In questa bellissima cittadina esiste qualcosa che mi ci farà certamente ritornare: la tradizione enogastronomica e gli squisiti taralli!',
    'diary_survey5_question_2_answer3': 'In questa bellissima cittadina esiste qualcosa che mi ci farà certamente ritornare: il caratteristico Mercantico!',
    'diary_survey6_question_1_answer1': 'Guardia Sanframondi, con la sua storia, i suoi riti e le sue architetture, è un posto magico, un vero balsamo per l’anima. Lo consiglio per un periodo di assoluto relax…',
    'diary_survey6_question_1_answer2': 'Guardia Sanframondi, con la sua storia, i suoi riti e le sue architetture, è un posto magico, un vero balsamo per l’anima. Consiglio di vivere questo posto con tutta la famiglia.',
    'diary_survey6_question_1_answer3': 'Guardia Sanframondi, con la sua storia, i suoi riti e le sue architetture, è un posto magico, un vero balsamo per l’anima. Consiglio di vivere questo posto con la propria metà…',
    'diary_survey6_question_2_answer1': 'Il Castello e la sua terrazza sono posti speciali, che fanno vibrare le corde più intime dell’anima. In una parola: serenità assoluta.',
    'diary_survey6_question_2_answer2': 'Il Castello e la sua terrazza sono posti speciali, che fanno vibrare le corde più intime dell’anima, in fusione armonica con la natura.',
    'diary_survey6_question_2_answer3': 'Il Castello e la sua terrazza sono posti speciali, che fanno vibrare le corde più intime dell’anima: un momento di astrazione dallo stress di tutti i giorni.'




    });

    $translateProvider.translations('en', {
      'BUTTON_LANG_IT': 'Italian',
      'BUTTON_LANG_EN': 'English',
      'LANGUAGE_TITLE': 'Passato Nel Futuro',
      'CHOOSE_LANGUAGE': 'Choose your language',
      'DASHBOARD_TITLE': 'Passato Nel Futuro',
      'DASHBOARD_INTRO': 'Latest shared diaries',
      'OPEN_DIARY': 'OPEN YOUR DIARY',
      'NICKNAME': 'Nickname',
      'AGE': 'Age',
      'GENDER': 'Gender',
      'MALE': 'Man',
      'FEMALE': 'Woman',
      'DIARY_TITLE': 'Diary',
      'DIARY_OF': 'diary of',
      'BACK': 'Back',
      'GUEST': 'Guest',
      // Diary sentences
'diary_survey1_question_1_answer1': 'After some research on the Internet that has caught my curiosity, I am finally in the archaeological area called Old Cerreto. I had already read something, but when you see it live is really beautiful. You can appreciate the hard work of the team still searching for treasures inside the area.',
    'diary_survey1_question_1_answer2': 'I had talked about Vecchia Cerreto, now I am finally in the archaeological area. I had already read something, but when you see it live is really beautiful. You can appreciate the hard work of the team still searching for treasures inside the area.',
    'diary_survey1_question_1_answer3': 'I\'ve been reading and studied a lot about Vecchia Cerretonow I am finally in the archaeological area. I had already read something, but when you see it live is really beautiful. You can appreciate the hard work of the team still searching for treasures inside the area.',
    'diary_survey1_question_2_answer1': 'I really enjoyed the visit and I hope to return one day to discover new objects visible to the public!',
    'diary_survey1_question_2_answer2': 'I really enjoyed the visit but I was very sorry that it ended so soon!',
    'diary_survey1_question_2_answer3': 'I really enjoyed the visit... I hope that many people may know this place',
    'diary_survey2_question_1_answer1': 'I just arrived in Cerreto and its wonderful buildings surprised me a lot!',
    'diary_survey2_question_1_answer2': 'I just arrived in Cerreto... its ceramics handicraft and its local traditions surprised me a lot!',
    'diary_survey2_question_1_answer3': 'I just arrived in Cerreto... it is amazing! People are very friendly and nature here is wonderful...',
    'diary_survey2_question_2_answer1': 'I\'m really glad I came here with my whole family. Each of us came home enriched by this place.',
    'diary_survey2_question_2_answer2': 'I\'m really glad I came here with my love. Our couple came home enriched by this place.',
    'diary_survey2_question_2_answer3': 'As usual, I traveled alone... it is the best way I know to come back home amazed by a place... now Cerreto is in my heart!',
    'diary_survey3_question_1_answer1': 'I just reached Pietraroja. They are attracted to this village at the foot of the Matese. Among Jurassic fossils and mountains, this is a mythological land.',
    'diary_survey3_question_1_answer2': 'I just reached Pietraroja. They are attracted to this village at the foot of the Matese. Among Jurassic fossils and mountains, this is a mythological land.',
    'diary_survey3_question_1_answer3': 'I just reached Pietraroja. They are attracted to this village at the foot of the Matese. Among Jurassic fossils and mountains, this is a mythological land.',
    'diary_survey3_question_2_answer1': 'I visited the museum and explored the village and I finally went into the green and unspoiled trails of the Matese.',
    'diary_survey3_question_2_answer2': 'I visited the museum and explored the village and unfortunately did not have time to venture in the green and unspoiled trails of the Matese.',
    'diary_survey3_question_2_answer3': 'I visited the museum and explored the village and I said goodbye to my loved mountains as I walked away.',
    'diary_survey4_question_1_answer1': 'Cusano Mutri is a small wonder: nature, food and wine traditions and above all the beauty of his village...',
    'diary_survey4_question_1_answer2': 'Cusano Mutri is a small wonder: a beautiful village, nature, but above all its traditions...',
    'diary_survey4_question_1_answer3': 'Cusano Mutri is a small wonder: a beautiful village, traditions, but also its nature and its beautiful fruits...',
    'diary_survey4_question_2_answer1': 'Cusano really surprised me. I did not expect to find such a concentration here of historical beauty, nature, food and wine ... ',
    'diary_survey4_question_2_answer2': 'So many people had told me about Cusano but I can say that this place is more beautiful than all the stories about it.',
    'diary_survey4_question_2_answer3': 'Cusano, as always, left me in the desire to return. When I need peace and beauty, I always come back here.',
    'diary_survey5_question_1_answer1': 'Dino Park is a theme park of San Lorenzello dedicated to dinosaurs suitable for children and adults. I visit him very soon...',
    'diary_survey5_question_1_answer2': 'Dino Park is a theme park of San Lorenzello dedicated to dinosaurs suitable for children and adults. It is an original and interactive way to explain us Earth of millions of years ago!',
    'diary_survey5_question_1_answer3': 'Dino Park is a theme park of San Lorenzello dedicated to dinosaurs suitable for children and adults. My sons enjoyed it!',
    'diary_survey5_question_2_answer1': 'In this beautiful town there is something that I loved: the manufacture of ceramics and its Maestri.',
    'diary_survey5_question_2_answer2': 'In this beautiful town there is something that I loved: food, wine and... TARALLI!',
    'diary_survey5_question_2_answer3': 'In this beautiful town there is something that I loved: the amazing MERCANTICO!',
    'diary_survey6_question_1_answer1': 'Guardia Sanframondi, with its history, its rites and its architecture, is a magical place, a real cure for the soul. I recommend it for a relaxing time...',
    'diary_survey6_question_1_answer2': 'Guardia Sanframondi, with its history, its rites and its architecture, is a magical place, a real cure for the soul. I recommend it to spend time with your family',
    'diary_survey6_question_1_answer3': 'Guardia Sanframondi, with its history, its rites and its architecture, is a magical place, a real cure for the soul. I recommend it for a romantic holiday...',
    'diary_survey6_question_2_answer1': 'The castle and its terrace are special places. In two words: magical serenity.',
    'diary_survey6_question_2_answer2': 'The castle and its terrace are special places. In a few words: harmonious fusion with nature.',
    'diary_survey6_question_2_answer3': 'The castle and its terrace are special places. In a few words: a break with everyday life.'


      
    });

    $translateProvider.preferredLanguage('it');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/diary/:diaryId', {
        templateUrl: 'views/diary.html',
        controller: 'DiaryCtrl'
      })
      .otherwise({
        redirectTo: '/dashboard'
      });
  });
