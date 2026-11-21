# Règles de lecture (tajwīd) — lecture de Ḥafṣ ʿan ʿĀṣim, telle que notée par les signes du muṣḥaf de Médine.
# Chaque règle porte un détecteur (expression régulière) appliqué au texte : il donne le nombre d'occurrences,
# les exemples et la coloration dans le lecteur. Le texte utilise l'encodage du muṣḥaf :
#   ۡ (U+06E1) sukūn · ْ (U+0652) lettre muette · ٗ ٞ ٖ tanwīn « ouvert » (fusion ou dissimulation)
#   ً ٌ ٍ tanwīn « superposé » (prononciation claire) · ۢ ۭ petit mīm (iqlāb) · ٓ madd allongé
M = r'[ً-ٰٟۡۤۥۦ۪ۧۨ-ۭ]'   # signes collés à une lettre
WQ = r'[ۖ-ۜ]?'                                                             # signe de pause éventuel
TANW_OPEN = r'[ٖٗٞ]'
IKHFA = 'تثجدذزسشصضطظفقك'
THROAT = 'ءأإؤئهعحغخ'

# (id, groupe, couleur, FR, AR, définition FR, définition AR, durée/comment FR, durée AR, regex, colorer)
RULES = [
 # ── Nūn sākina et tanwīn
 ('izhar', 'nun', 'izhar', "Iẓhār (prononciation claire)", "الإظهار الحلقي",
  "Le nūn sākin ou le tanwīn devant une lettre de la gorge (ء ه ع ح غ خ) se prononce clairement, sans nasalisation prolongée.",
  "النون الساكنة أو التنوين قبل أحد حروف الحلق (ء ه ع ح غ خ) تُظهر دون غنّة.",
  "Pas de ghunna. Le muṣḥaf l'indique par le sukūn sur le nūn ou par un tanwīn aux deux traits superposés.",
  "بلا غنّة؛ يدلّ عليه السكون على النون أو التنوين المتراكب.",
  r'ن\u06E1(?= ?[' + THROAT + r'])|\S[\u064B-\u064D](?=' + WQ + r' [' + THROAT + r'])', False),
 ('idgham-g', 'nun', 'ghunna', "Idghām avec ghunna", "الإدغام بغنّة",
  "Le nūn sākin ou le tanwīn se fond dans la lettre suivante parmi ي ن م و (moyen mnémotechnique : yanmū), avec nasalisation.",
  "تُدغم النون الساكنة أو التنوين في أحد حروف «ينمو» مع الغنّة.",
  "Ghunna de 2 temps. Le muṣḥaf l'indique : nūn sans signe, tanwīn « ouvert », et shadda sur la lettre suivante.",
  "غنّة بمقدار حركتين؛ علامته: نون معرّاة أو تنوين متتابع وشدّة على الحرف التالي.",
  r'ن(?= [ينمو]ّ)|\Sّ?' + TANW_OPEN + r'(?=[اى]?' + WQ + r' [ينمو]ّ)', True),
 ('idgham-ng', 'nun', 'silent', "Idghām sans ghunna", "الإدغام بغير غنّة",
  "Le nūn sākin ou le tanwīn disparaît entièrement dans ل ou ر qui suit.",
  "تُدغم النون الساكنة أو التنوين في اللام أو الراء إدغامًا كاملًا بلا غنّة.",
  "Le nūn n'est pas prononcé ; la lettre suivante est doublée (shadda).",
  "لا تُنطق النون، ويُشدَّد الحرف التالي.",
  r'ن(?= [لر]ّ)|\Sّ?' + TANW_OPEN + r'(?=[اى]?' + WQ + r' [لر]ّ)', True),
 ('iqlab', 'nun', 'iqlab', "Iqlāb (conversion)", "الإقلاب",
  "Devant ب, le nūn sākin ou le tanwīn se change en mīm, prononcé avec ghunna.",
  "إذا جاء بعد النون الساكنة أو التنوين حرف الباء قُلبا ميمًا مع الغنّة.",
  "Ghunna de 2 temps. Signe : un petit mīm (ۢ ou ۭ) au-dessus ou au-dessous.",
  "غنّة بمقدار حركتين؛ علامته ميم صغيرة.",
  r'\S[ً-ِٖٗٞ]?[ۭۢ]', True),
 ('ikhfa', 'nun', 'ikhfa', "Ikhfāʾ (dissimulation)", "الإخفاء الحقيقي",
  "Devant l'une des 15 lettres restantes (ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك), le nūn sākin ou le tanwīn est à demi caché : entre clarté et fusion.",
  "النون الساكنة أو التنوين قبل أحد الحروف الخمسة عشر تُخفى بين الإظهار والإدغام.",
  "Ghunna de 2 temps, la bouche préparant déjà la lettre suivante.",
  "غنّة بمقدار حركتين مع تهيئة المخرج للحرف التالي.",
  r'ن(?= ?[' + IKHFA + r'])|\Sّ?' + TANW_OPEN + r'(?=[اى]?' + WQ + r' [' + IKHFA + '])', True),
 # ── Mīm sākina
 ('ikhfa-shafawi', 'mim', 'ikhfa', "Ikhfāʾ shafawī (des lèvres)", "الإخفاء الشفوي",
  "Le mīm sākin devant ب est dissimulé par les lèvres.",
  "الميم الساكنة قبل الباء تُخفى مع الغنّة.",
  "Ghunna de 2 temps ; le mīm ne porte pas de sukūn.", "غنّة بمقدار حركتين؛ الميم معرّاة من السكون.",
  r'م(?= ب)', True),
 ('idgham-mithlayn', 'mim', 'ghunna', "Idghām de deux mīm", "إدغام المثلين الصغير",
  "Le mīm sākin devant un autre mīm se fond en un mīm doublé.",
  "الميم الساكنة قبل ميم مثلها تُدغم فيها.",
  "Ghunna de 2 temps.", "غنّة بمقدار حركتين.",
  r'م(?= مّ)', True),
 ('izhar-shafawi', 'mim', 'izhar', "Iẓhār shafawī", "الإظهار الشفوي",
  "Le mīm sākin devant toute autre lettre se prononce clairement, surtout devant و et ف.",
  "الميم الساكنة قبل سائر الحروف تُظهر، ويُتأكد الإظهار عند الواو والفاء.",
  "Pas de ghunna prolongée ; sukūn visible sur le mīm.", "بلا غنّة؛ السكون ظاهر على الميم.",
  r'مۡ', False),
 # ── Ghunna et qalqala
 ('ghunna', 'son', 'ghunna', "Ghunna (nūn et mīm doublés)", "الغنّة في النون والميم المشدّدتين",
  "Tout nūn ou mīm portant la shadda est prononcé avec une nasalisation complète.",
  "كل نون أو ميم مشدّدة تُنطق بغنّة كاملة.",
  "2 temps.", "حركتان.",
  r'[نم]ّ[َ-ِ]?', True),
 ('qalqala', 'son', 'qalqala', "Qalqala (rebond)", "القلقلة",
  "Les lettres ق ط ب ج د (qutb jad) au repos produisent un léger rebond sonore.",
  "حروف «قطب جد» إذا سكنت اضطرب صوتها بنبرة قوية.",
  "Petite (au milieu du mot), grande (à l'arrêt en fin de verset).",
  "صغرى في وسط الكلمة، وكبرى عند الوقف.",
  r'[قطبجد]ۡ|[قطبجد]ّ?[ً-ِ]?(?=' + WQ + r'$)', True),
 # ── L'article
 ('lam-qamari', 'lam', 'izhar', "Lām lunaire (prononcé)", "اللام القمرية",
  "Le lām de l'article se prononce devant les 14 lettres « lunaires » (ابغ حجك وخف عقيمه).",
  "تُظهر لام التعريف قبل حروف «ابغ حجك وخف عقيمه».",
  "Sukūn visible sur le lām.", "السكون ظاهر على اللام.",
  r'ٱلۡ', False),
 ('lam-shamsi', 'lam', 'silent', "Lām solaire (muet)", "اللام الشمسية",
  "Devant les 14 autres lettres « solaires », le lām de l'article n'est pas prononcé ; la lettre suivante est doublée.",
  "تُدغم لام التعريف في الحروف الشمسية فلا تُنطق، ويُشدَّد ما بعدها.",
  "Lām sans signe, shadda sur la lettre suivante.", "لام معرّاة، وشدّة على ما بعدها.",
  r'(?<=ٱ)ل(?=[تثدذرزسشصضطظنل]ّ)', True),
 # ── Madd
 ('madd-tabii', 'madd', None, "Madd naturel", "المدّ الطبيعي",
  "Une voyelle longue (ا après fatḥa, و après ḍamma, ي après kasra, ou petit alif ٰ) se prolonge naturellement.",
  "حرف المدّ بعد حركة تناسبه، أو الألف الخنجرية، يُمدّ مدًّا طبيعيًّا.",
  "2 temps (ḥaraka).", "حركتان.",
  r'[\u0621-\u064A][\u064B-\u0652]*\u0670', False),
 ('madd-muttasil', 'madd', 'madd4', "Madd obligatoire lié (muttaṣil)", "المدّ الواجب المتّصل",
  "La voyelle longue est suivie d'une hamza dans le même mot.",
  "يأتي بعد حرف المدّ همزٌ في الكلمة نفسها.",
  "4 ou 5 temps. Signe : ٓ au-dessus de la lettre de prolongation.", "أربع أو خمس حركات؛ علامته المدّة ٓ.",
  r'\S[َ-ِٰ]?ٓ(?=[ء-ئ])', True),
 ('madd-munfasil', 'madd', 'madd2', "Madd permis séparé (munfaṣil)", "المدّ الجائز المنفصل",
  "La voyelle longue termine un mot, et le mot suivant commence par une hamza.",
  "حرف المدّ في آخر الكلمة والهمز في أول الكلمة التالية.",
  "2, 4 ou 5 temps selon la voie de lecture (4 ou 5 dans la voie la plus répandue de Ḥafṣ).", "حركتان أو أربع أو خمس.",
  r'\S[َ-ِٰۥۦ]?ٓ(?=[ْ]?' + WQ + r' [أإءؤ])', True),
 ('madd-lazim', 'madd', 'madd6', "Madd nécessaire (lāzim)", "المدّ اللازم",
  "La voyelle longue est suivie d'une lettre doublée ou au repos permanent, ou dans les lettres isolées en tête de sourate (الٓمٓ).",
  "يأتي بعد حرف المدّ سكون أصلي أو حرف مشدّد، ومنه فواتح السور.",
  "6 temps, toujours.", "ست حركات لزومًا.",
  r'\S[َ-ِٰ]?ٓ(?=\Sّ|\Sۡ)|\Sٓ(?=\Sٓ)|\Sٓ$', True),
 ('madd-sila', 'madd', None, "Madd du pronom (ṣila)", "مدّ الصلة",
  "Le hāʾ du pronom (« lui ») entre deux voyelles se prolonge ; le muṣḥaf l'écrit avec un petit و ou ي.",
  "هاء الضمير بين متحركين توصل بواو أو ياء صغيرة.",
  "2 temps ; 4 ou 5 si une hamza suit (marqué ٓ).", "حركتان، وأربع أو خمس إن تلاها همز.",
  r'ه[ُِ][ۥۦ]', False),
 # ── Lettres non prononcées
 ('wasl', 'muet', 'silent', "Hamza de liaison (ٱ)", "همزة الوصل",
  "L'alif ٱ se prononce seulement en début de lecture ; en continuité, il est muet.",
  "تُنطق ٱ في الابتداء وتسقط في الوصل.",
  "Muet au milieu d'une phrase.", "تسقط في درج الكلام.",
  r' ٱ', True),
 ('muet', 'muet', 'silent', "Lettres écrites, non prononcées", "الحروف الزائدة رسمًا",
  "Une lettre surmontée d'un petit cercle (ْ) s'écrit mais ne se prononce jamais (أُوْلَٰٓئِكَ، كَفَرُواْ). Avec ۠ (أَنَا۠), elle se prononce seulement à l'arrêt.",
  "الحرف الذي فوقه صفر مستدير لا يُنطق مطلقًا، وما فوقه صفر مستطيل يُنطق وقفًا لا وصلًا.",
  "Ne pas prononcer.", "لا يُنطق.",
  r'\S[ْ۠]', True),
]
# Cas particuliers signalés par le muṣḥaf
SPECIAL = [
 ('saktah', "Saktah (pause sans souffle)", "السكتة", "Petite pause de 2 temps sans reprendre son souffle. Signe : petit س (ۜ) en fin de mot.", "وقفة لطيفة بقدر حركتين دون تنفّس؛ علامتها سين صغيرة.", r'[\u0621-\u064A\u0671](?<!ص)[\u064B-\u065F\u0670\u06E1]*\u06DC'),
 ('sin', "ص lu comme س", "قراءة الصاد سينًا", "Un petit س au-dessus d'un ص indique qu'on le lit س.", "سين صغيرة فوق الصاد تدل على قراءتها سينًا.", r'ص[َ-ِۡ]?ۜ|صۜ'),
 ('imala', "Imāla (inclinaison du son a vers é)", "الإمالة", "Un seul mot dans la lecture de Ḥafṣ : مَجۡر۪ىٰهَا.", "كلمة واحدة في رواية حفص: مجريها.", r'ٜ'),
 ('ishmam', "Ishmām et tas'hīl", "الإشمام والتسهيل", "Le point ۬ signale une prononciation particulière : ishmām (lèvres arrondies) dans تَأۡمَ۬نَّا, tas'hīl (hamza adoucie) dans ءَا۬عۡجَمِيّ.", "النقطة تدل على الإشمام في تأمنّا والتسهيل في ءاعجمي.", r'۬'),
 ('sajda', "Prosternation de récitation", "سجود التلاوة", "Le signe ۩ marque un passage où le lecteur se prosterne.", "علامة ۩ تدل على موضع سجدة التلاوة.", r'۩'),
 ('hizb', "Quart de ḥizb", "ربع الحزب", "Le signe ۞ marque un quart de ḥizb (le Coran est divisé en 60 aḥzāb).", "علامة ۞ تدل على ربع الحزب.", r'۞'),
]
# Signes de pause (waqf)
WAQF = [
 ('ۘ', 'مـ', "Arrêt obligatoire (lāzim)", "وقف لازم", "S'arrêter : continuer pourrait changer le sens."),
 ('ۗ', 'قلى', "Arrêt préférable", "الوقف أولى", "On peut continuer, mais s'arrêter est meilleur."),
 ('ۚ', 'ج', "Arrêt permis", "وقف جائز", "S'arrêter ou continuer, au choix."),
 ('ۖ', 'صلى', "Continuer est préférable", "الوصل أولى", "On peut s'arrêter, mais continuer est meilleur."),
 ('ۛ', '∴', "Arrêt sur l'un des deux (muʿānaqa)", "تعانق الوقف", "Deux signes se suivent : s'arrêter sur l'un, pas sur les deux."),
]
# Points d'articulation (makhārij)
MAKHARIJ = [
 ("La cavité (jawf)", "الجوف", "Les voyelles longues : ا و ي de prolongation.", "حروف المدّ الثلاثة.", "ا و ي"),
 ("La gorge (ḥalq)", "الحلق", "Fond : ء ه · milieu : ع ح · haut : غ خ.", "أقصاه: ء ه، وسطه: ع ح، أدناه: غ خ.", "ء ه ع ح غ خ"),
 ("La langue (lisān)", "اللسان", "18 lettres selon la partie de la langue qui touche le palais ou les dents.", "ثمانية عشر حرفًا بحسب موضع اللسان.", "ق ك ج ش ي ض ل ن ر ط د ت ص ز س ظ ذ ث"),
 ("Les lèvres (shafatān)", "الشفتان", "ف (lèvre inférieure et incisives) · ب م و (les deux lèvres).", "الفاء، والباء والميم والواو.", "ف ب م و"),
 ("Le nez (khayshūm)", "الخيشوم", "Siège de la ghunna du nūn et du mīm.", "مخرج الغنّة.", "ن م"),
]
# Lettres emphatiques
TAFKHIM = ("Lettres toujours emphatiques (lourdes) : خ ص ض غ ط ق ظ (khuṣṣa ḍaghṭin qiẓ). Le ر et le ل du nom « Allāh » sont lourds ou légers selon la voyelle qui précède.",
           "حروف الاستعلاء تُفخّم دائمًا: «خص ضغط قظ». والراء ولام لفظ الجلالة تُفخّمان أو تُرقّقان بحسب ما قبلهما.")
# Ce que le texte dit lui-même de la récitation (vérifié)
ADAB = [
 ('16:98', 'فاستعذ', "Avant de lire : demander refuge contre le Shayṭān.", "قبل القراءة: الاستعاذة."),
 ('73:4', 'ترتيلا', "Réciter posément, en articulant (tartīl).", "الترتيل."),
 ('17:106', 'علي مكث', "Lire lentement, par portions.", "القراءة على مكث."),
 ('7:204', 'وانصتوا', "Quand il est récité, écouter et se taire.", "الاستماع والإنصات."),
 ('2:121', 'حق تلاوته', "Le réciter « comme il se doit ».", "تلاوته حقّ تلاوته."),
 ('75:16-18', 'لا تحرك', "Ne pas se presser ; suivre la récitation.", "عدم العجلة واتّباع القراءة."),
]
