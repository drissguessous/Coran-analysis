# Récitations audio (diffusées depuis leur source, aucun fichier audio n'est inclus dans l'application).
# Ḥafṣ : verset par verset (everyayah.com), synchronisé avec le texte affiché.
# Autres lectures : sourate entière (mp3quran.net), car leur numérotation des versets diffère de celle de Ḥafṣ.
EVERYAYAH = 'https://everyayah.com/data/{dir}/{s:03d}{a:03d}.mp3'
MP3QURAN = '{server}{s:03d}.mp3'

# (id, riwāya, récitant FR, récitant AR, style, dossier/serveur, conseillé pour apprendre, note FR)
RECITERS = [
 # Ḥafṣ ʿan ʿĀṣim — verset par verset
 ('husary-muallim', 'hafs', 'al-Ḥuṣarī (enseignement)', 'الحصري (المعلم)', 'muallim', 'Husary_Muallim_128kbps', True,
  "Version d'enseignement : lecture lente et très articulée, conçue pour être répétée."),
 ('husary', 'hafs', 'al-Ḥuṣarī', 'محمود خليل الحصري', 'murattal', 'Husary_128kbps', True,
  'Murattal de référence : rythme régulier, règles très nettes.'),
 ('ayman-suwaid', 'hafs', 'Ayman Suwayd', 'أيمن رشدي سويد', 'murattal', 'Ayman_Sowaid_64kbps', True,
  'Professeur de tajwīd reconnu : prononciation précise des lettres.'),
 ('minshawi', 'hafs', 'al-Minshāwī', 'محمد صديق المنشاوي', 'murattal', 'Minshawy_Murattal_128kbps', True,
  'Murattal clair et posé.'),
 ('husary-mujawwad', 'hafs', 'al-Ḥuṣarī (mujawwad)', 'الحصري (مجوّد)', 'mujawwad', 'Husary_128kbps_Mujawwad', False,
  'Mujawwad : récitation mélodique plus lente, prolongations amples.'),
 ('minshawi-mujawwad', 'hafs', 'al-Minshāwī (mujawwad)', 'المنشاوي (مجوّد)', 'mujawwad', 'Minshawy_Mujawwad_64kbps', False,
  'Mujawwad.'),
 ('abdul-basit', 'hafs', 'ʿAbd al-Bāsiṭ', 'عبد الباسط عبد الصمد', 'murattal', 'Abdul_Basit_Murattal_64kbps', False, 'Murattal.'),
 ('abdul-basit-mujawwad', 'hafs', 'ʿAbd al-Bāsiṭ (mujawwad)', 'عبد الباسط (مجوّد)', 'mujawwad', 'Abdul_Basit_Mujawwad_128kbps', False, 'Mujawwad.'),
 ('hudhaify', 'hafs', 'ʿAlī al-Ḥudhayfī', 'علي الحذيفي', 'murattal', 'Hudhaify_128kbps', False, 'Imam de la mosquée du Prophète à Médine.'),
 ('alafasy', 'hafs', 'Mishārī al-ʿAfāsī', 'مشاري العفاسي', 'murattal', 'Alafasy_128kbps', False, 'Murattal.'),
 # Warsh ʿan Nāfiʿ — sourate entière
 ('warsh-husary', 'warsh', 'al-Ḥuṣarī', 'الحصري', 'murattal', 'https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/', True, 'Warsh par le maître de référence en Ḥafṣ : utile pour comparer.'),
 ('warsh-qazabri', 'warsh', 'ʿUmar al-Qazabrī', 'عمر القزابري', 'murattal', 'https://server9.mp3quran.net/omar_warsh/', True, 'Récitant marocain.'),
 ('warsh-benkirane', 'warsh', 'ʿAbd al-Mujīb Benkirane', 'عبد المجيب بنكيران', 'murattal', 'https://server16.mp3quran.net/A-Benkirane/Rewayat-Warsh-A-n-Nafi/', False, 'Récitant marocain.'),
 ('warsh-koshi', 'warsh', 'al-ʿUyūn al-Kūshī', 'العيون الكوشي', 'murattal', 'https://server11.mp3quran.net/koshi/', False, 'Récitant marocain.'),
 ('warsh-abdulbasit', 'warsh', 'ʿAbd al-Bāsiṭ', 'عبد الباسط عبد الصمد', 'murattal', 'https://server7.mp3quran.net/basit/Rewayat-Warsh-A-n-Nafi/', False, ''),
 ('warsh-dosari', 'warsh', 'Ibrāhīm al-Dūsarī', 'إبراهيم الدوسري', 'murattal', 'https://server10.mp3quran.net/ibrahim_dosri/Rewayat-Warsh-A-n-Nafi/', False, ''),
 # Qālūn ʿan Nāfiʿ
 ('qalun-husary', 'qalun', 'al-Ḥuṣarī', 'الحصري', 'murattal', 'https://server13.mp3quran.net/husr/Rewayat-Qalon-A-n-Nafi/', True, ''),
 ('qalun-hudhaify', 'qalun', 'ʿAlī al-Ḥudhayfī', 'علي الحذيفي', 'murattal', 'https://server9.mp3quran.net/huthifi_qalon/', False, ''),
 # al-Dūrī ʿan Abī ʿAmr
 ('duri-husary', 'duri', 'al-Ḥuṣarī', 'الحصري', 'murattal', 'https://server13.mp3quran.net/husr/Rewayat-Aldori-A-n-Abi-Amr/', True, ''),
 ('duri-noreen', 'duri', 'Nūrīn Muḥammad Ṣiddīq', 'نورين محمد صديق', 'murattal', 'https://server16.mp3quran.net/nourin_siddig/Rewayat-Aldori-A-n-Abi-Amr/', False, 'Récitant soudanais.'),
 # Shuʿba ʿan ʿĀṣim
 ('shuba-hudhaify', 'shuba', 'ʿAlī al-Ḥudhayfī', 'علي الحذيفي', 'murattal', 'https://server9.mp3quran.net/hthfi/Rewayat-Sho-bah-A-n-Asim/', False, ''),
]

# Les lectures (riwāyāt) les plus pratiquées
RIWAYAT = [
 ('hafs', "Ḥafṣ ʿan ʿĀṣim", 'حفص عن عاصم', 'Kūfa',
  "La plus répandue dans le monde musulman (Moyen-Orient, Égypte, Asie, Europe, Amériques). C'est la lecture du texte affiché dans cette application.",
  'الرواية الأوسع انتشارًا في العالم الإسلامي، وهي رواية النص المعروض في هذا التطبيق.',
  ["Madd séparé et madd lié : 4 ou 5 temps.", "Fātiḥa : « Māliki yawmi d-dīn » (avec alif).", "Une seule imāla dans tout le texte (مَجۡر۪ىٰهَا, 11:41)."]),
 ('warsh', "Warsh ʿan Nāfiʿ", 'ورش عن نافع', 'Médine',
  "Lecture dominante au Maghreb (Maroc, Algérie, Mauritanie) et dans une grande partie de l'Afrique de l'Ouest.",
  'الرواية السائدة في المغرب والجزائر وموريتانيا وكثير من غرب إفريقيا.',
  ["Madd séparé et madd lié prolongés à 6 temps (voie d'al-Azraq).", "La hamza au repos est souvent allégée : يُؤۡمِنُونَ se lit « yūminūn ».",
   "La voyelle de la hamza passe sur la consonne précédente (naql) : قَدۡ أَفۡلَحَ se lit « qada-flaḥa ».", "Le rāʾ est souvent adouci après une kasra ou un yāʾ au repos.", "Fātiḥa : « Maliki yawmi d-dīn » (sans alif)."]),
 ('qalun', "Qālūn ʿan Nāfiʿ", 'قالون عن نافع', 'Médine',
  "Lecture dominante en Libye et dans une partie de la Tunisie.",
  'الرواية السائدة في ليبيا وأجزاء من تونس.',
  ["Madd séparé court (2 temps) ou moyen.", "Le mīm du pluriel peut être lié par un « ū » (ʿalayhimū).", "Fātiḥa : « Maliki » (sans alif), comme Warsh."]),
 ('duri', "ad-Dūrī ʿan Abī ʿAmr", 'الدوري عن أبي عمرو', 'Baṣra',
  "Lecture dominante au Soudan et dans une partie de l'Afrique de l'Est.",
  'الرواية السائدة في السودان وأجزاء من شرق إفريقيا.',
  ["Inclinaisons (imāla) dans certains mots, comme ٱلنَّاسِ au génitif.", "Fusion possible de deux consonnes identiques d'un mot au suivant (idghām kabīr).", "Fātiḥa : « Maliki » (sans alif)."]),
 ('shuba', "Shuʿba ʿan ʿĀṣim", 'شعبة عن عاصم', 'Kūfa',
  "L'autre transmission de ʿĀṣim, proche de Ḥafṣ ; elle s'en distingue dans un certain nombre de mots.",
  'الرواية الأخرى عن عاصم، قريبة من حفص مع فروق في كلمات معدودة.', []),
]
QIRAAT_INTRO = (
 "Le texte a été transmis selon dix lectures (qirāʾāt) reconnues, chacune rapportée par deux transmetteurs (riwāyāt). Les différences portent surtout sur les prolongations, la hamza, l'inclinaison des voyelles et quelques mots. Elles s'écoutent mieux qu'elles ne se lisent : comparez un même passage dans plusieurs lectures.",
 'نُقل القرآن بعشر قراءات متواترة، لكل قراءة راويان. والفروق في الغالب في المدود والهمز والإمالة وكلمات معدودة، وسماعها أوضح من قراءتها.',
)
