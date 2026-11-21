# Questions-réponses logiques : (id, topic, q_fr, q_ar, a_fr, a_ar, [étapes FR], [(réf, mot-clé)])
QA = []
def Q(i, topic, qfr, qar, afr, aar, steps, refs):
    QA.append(dict(id=i, topic=topic, qfr=qfr, qar=qar, afr=afr, aar=aar, steps=steps, refs=refs))

Q('iblis-ange', 'inv-iblis', "Iblīs est-il un ange ?", "هل إبليس من الملائكة؟",
  "Non. Le texte dit explicitement qu'il « était des jinns ».", "لا. النص يقول صراحة إنه «كان من الجن».",
  ["L'ordre de se prosterner est adressé aux anges, et Iblīs est cité comme exception (2:34).",
   "Mais 18:50 précise : « il était des jinns » (kāna min al-jinn).",
   "Les anges « ne désobéissent pas » (66:6) ; Iblīs a désobéi : il ne peut donc pas être un ange.",
   "Sa matière est le feu (7:12), comme celle des jinns (55:15)."],
  [('18:50', 'كان من الجن'), ('66:6', 'لا يعصون'), ('7:12', 'خلقتني من نار'), ('55:15', 'مارج')])

Q('ange-jinn-humain', 'invisible', "Quelle différence entre anges, jinns et humains ?", "ما الفرق بين الملائكة والجن والإنس؟",
  "Trois créatures : les anges obéissent sans choix apparent ; jinns et humains ont le choix et seront jugés.", "ثلاثة خلائق: الملائكة مطيعون، والجن والإنس مخيَّرون ومحاسَبون.",
  ["Anges : messagers ailés, ils font ce qu'on leur ordonne (35:1, 66:6).",
   "Jinns : créés de feu, avant l'humain (15:27) ; certains sont vertueux, d'autres non (72:11).",
   "Humains : créés d'argile (15:26).",
   "Jinns et humains ont le même but (51:56) et seront interrogés ensemble (6:130)."],
  [('35:1', 'اولي اجنحه'), ('15:27', 'السموم'), ('72:11', 'طرايق قددا'), ('51:56', 'ليعبدون'), ('6:130', 'يمعشر الجن والانس')])

Q('terre-forme', 'cosmos-terre', "Que dit le texte sur la forme de la terre ?", "ماذا يقول النص عن هيئة الأرض؟",
  "Le mot le plus précis est « yukawwiru » : enrouler la nuit sur le jour comme un turban, image qui suppose une surface courbe. Les mots « étendre » et « lit » décrivent la terre vue par l'humain qui y marche.",
  "أدقّ لفظ هو «يكوّر»: لفّ الليل على النهار كالعمامة، وهي صورة تفترض سطحًا منحنيًا. أما «دحاها» و«مهادًا» فتصف الأرض كما يراها الإنسان الماشي عليها.",
  ["Kawwara (racine k-w-r) = enrouler autour d'une forme ronde : 39:5.",
   "Daḥā (79:30) et mihād (78:6) décrivent un sol étendu et habitable, à l'échelle de l'humain.",
   "« Deux levants et deux couchants » (55:17) puis « des levants » au pluriel (70:40) : les points de lever changent, ce qui correspond à une terre inclinée qui tourne.",
   "Conclusion logique : aucun verset n'affirme une terre plate ; le verbe le plus technique va dans le sens d'une rotondité."],
  [('39:5', 'يكور اليل'), ('79:30', 'دحيها'), ('55:17', 'المشرقين'), ('70:40', 'المشرق')])

Q('univers-expansion', 'cosmos-cieux', "L'univers a-t-il un commencement ? S'étend-il ?", "هل للكون بداية؟ وهل يتّسع؟",
  "Oui aux deux selon les mots : une masse soudée séparée, et un ciel que Dieu « étend » (participe actif = action continue).",
  "نعم بحسب الألفاظ: رتق ثم فتق، وسماء «إنّا لموسعون» بصيغة اسم الفاعل الدالة على الاستمرار.",
  ["21:30 : cieux et terre étaient ratq (soudés) puis fatq (séparés).",
   "41:11 : le ciel était dukhān (fumée, gaz).",
   "51:47 : « wa innā la-mūsiʿūn » ; le participe actif exprime une action en cours.",
   "21:104 : une fin est annoncée, le ciel replié comme un rouleau."],
  [('21:30', 'رتقا ففتقنهما'), ('41:11', 'دخان'), ('51:47', 'لموسعون'), ('21:104', 'كطي السجل')])

Q('six-jours', 'cosmos-cieux', "La création en six jours : des jours de 24 heures ?", "هل أيام الخلق الستة أيام من ٢٤ ساعة؟",
  "Le texte lui-même montre que « yawm » est une durée variable : un jour peut valoir mille ans ou cinquante mille ans.",
  "النص نفسه يبيّن أن «اليوم» مدة متغيرة: قد يكون ألف سنة أو خمسين ألف سنة.",
  ["7:54 : six ayyām (jours).",
   "22:47 : un jour auprès de ton Seigneur est comme mille ans.",
   "70:4 : un jour dont la durée est de cinquante mille ans.",
   "Conclusion : « jour » désigne une étape, pas une rotation terrestre (le soleil n'est d'ailleurs pas encore en place)."],
  [('7:54', 'سته ايام'), ('22:47', 'كالف سنه'), ('70:4', 'خمسين الف سنه')])

Q('premier-humain', 'hum-creation', "Comment l'humain a-t-il été créé ?", "كيف خُلق الإنسان؟",
  "En deux temps : le premier humain d'argile, puis tous les autres d'une goutte, par étapes dans le ventre.",
  "على مرحلتين: الأول من طين، ثم سائر البشر من نطفة أطوارًا في الرحم.",
  ["32:7-8 : commencement par l'argile, puis descendance par « une eau vile ».",
   "23:12-14 : goutte → ʿalaqa (ce qui s'accroche) → muḍgha (morceau mâché) → os → chair.",
   "15:29 : l'insufflation de l'esprit vient après le façonnage.",
   "3:59 : la création d'Adam sert de modèle pour expliquer celle de ʿĪsā sans père."],
  [('32:7-8', 'سلله من ما'), ('23:12-14', 'مضغه'), ('15:29', 'ونفخت فيه'), ('3:59', 'كمثل ادم')])

Q('eve-faute', 'r-adam', "Le texte accuse-t-il la femme d'Adam de la faute ?", "هل يحمّل النص زوجة آدم الخطيئة؟",
  "Non. Le démon s'adresse aux deux, les deux mangent, les deux se repentent ; un passage nomme même Adam seul.",
  "لا. الشيطان وسوس لهما، وأكلا معًا، وتابا معًا، بل إن آية تذكر آدم وحده.",
  ["7:20 : « il leur chuchota » (lahumā, duel).",
   "7:23 : prière commune « nous nous sommes fait du tort ».",
   "20:121 : « Adam désobéit à son Seigneur » : seul Adam est nommé.",
   "Son nom (Ḥawwāʾ) n'apparaît nulle part dans le texte."],
  [('7:20', 'فوسوس لهما'), ('7:23', 'ظلمنا انفسنا'), ('20:121', 'وعصي ادم')])

Q('peche-heredite', 'hum-liberte', "Hérite-t-on de la faute de ses ancêtres ?", "هل يرث الإنسان ذنب أسلافه؟",
  "Non. Chacun ne porte que ses propres actes, et la faute d'Adam a été pardonnée.",
  "لا. كل نفس تحمل عملها، وذنب آدم قد غُفر.",
  ["2:37 : repentir d'Adam accepté.",
   "6:164 : nul ne portera le fardeau d'un autre.",
   "53:39 : l'humain n'obtient que le fruit de son effort.",
   "2:286 : chacun selon sa capacité."],
  [('2:37', 'فتلقي ادم'), ('6:164', 'وزر اخري'), ('53:39', 'ما سعي'), ('2:286', 'الا وسعها')])

Q('libre-arbitre', 'hum-liberte', "L'humain est-il libre ou tout est-il écrit ?", "هل الإنسان مخيّر أم كل شيء مكتوب؟",
  "Le texte affirme les deux : Dieu sait et mesure tout, et l'humain choisit et répond de son choix.",
  "النص يثبت الأمرين: الله يعلم ويقدّر كل شيء، والإنسان يختار ويُسأل عن اختياره.",
  ["54:49 : toute chose selon une mesure (qadar).",
   "18:29 : « qui veut croit, qui veut renie ».",
   "76:3 : le chemin est montré, l'humain est reconnaissant ou ingrat.",
   "13:11 : le changement collectif commence par ce que les gens changent en eux-mêmes."],
  [('54:49', 'بقدر'), ('18:29', 'فمن شا فليومن'), ('76:3', 'اما شاكرا'), ('13:11', 'لا يغير ما بقوم')])

Q('contrainte', 'hum-liberte', "Peut-on imposer la religion ?", "هل يجوز الإكراه في الدين؟",
  "Non : « pas de contrainte dans la religion ». Le rôle du messager est de transmettre.",
  "لا: «لا إكراه في الدين». ووظيفة الرسول البلاغ.",
  ["2:256 : pas de contrainte ; la voie juste est déjà distincte.",
   "10:99 : « contraindras-tu les gens à devenir croyants ? »",
   "88:21-22 : tu n'es qu'un rappel, tu n'es pas un dominateur sur eux."],
  [('2:256', 'لا اكراه'), ('10:99', 'تكره الناس'), ('88:21-22', 'بمصيطر')])

Q('isa-crucifie', 'r-isa', "ʿĪsā a-t-il été crucifié ?", "هل صُلب عيسى؟",
  "Non selon le texte : ni tué ni crucifié, « cela leur a semblé », et Dieu l'a élevé vers Lui.",
  "لا بحسب النص: ما قتلوه وما صلبوه ولكن شُبّه لهم، بل رفعه الله إليه.",
  ["4:157 : négation double (mā qatalūhu wa mā ṣalabūhu) et « shubbiha lahum ».",
   "4:158 : « Dieu l'a élevé vers Lui ».",
   "3:55 : « Je vais te recueillir et t'élever vers Moi »."],
  [('4:157', 'شبه لهم'), ('4:158', 'رفعه الله'), ('3:55', 'متوفيك')])

Q('isa-dieu', 'r-isa', "ʿĪsā est-il Dieu ou fils de Dieu ?", "هل عيسى إله أو ابن الله؟",
  "Non. Le texte le définit comme serviteur, messager et « parole » de Dieu, et argumente par sa condition humaine.",
  "لا. النص يعرّفه عبدًا ورسولًا و«كلمة» من الله، ويستدل ببشريته.",
  ["19:30 : ses premiers mots : « je suis serviteur de Dieu ».",
   "5:75 : lui et sa mère mangeaient de la nourriture (besoin = créature).",
   "3:59 : sa naissance sans père est comparée à Adam, créé sans père ni mère.",
   "5:116-117 : lui-même nie avoir demandé d'être adoré."],
  [('19:30', 'اني عبد الله'), ('5:75', 'ياكلان الطعام'), ('3:59', 'كمثل ادم'), ('5:116-117', 'اتخذوني وامي')])

Q('fils-sacrifice', 'r-ibrahim', "Quel fils Ibrāhīm devait-il sacrifier ?", "أيّ ابنيه أُمر إبراهيم بذبحه؟",
  "Le passage ne le nomme pas. L'ordre du récit suggère Ismāʿīl : Isḥāq est annoncé seulement après le sacrifice.",
  "النص لا يسمّيه. وترتيب السياق يرجّح إسماعيل: فالبشارة بإسحاق جاءت بعد قصة الذبح.",
  ["37:101 : annonce d'un garçon patient (ghulām ḥalīm).",
   "37:102-107 : le rêve, l'acceptation, le rachat.",
   "37:112 : « et Nous lui annonçâmes Isḥāq » : nouvelle annonce, donc autre fils.",
   "11:71 : la naissance d'Isḥāq est annoncée avec celle de Yaʿqūb après lui ; un ordre de le sacrifier enfant contredirait cette promesse."],
  [('37:101', 'غلم حليم'), ('37:107', 'بذبح عظيم'), ('37:112', 'وبشرنه باسحق'), ('11:71', 'يعقوب')])

Q('khidr', 'r-musa', "Pourquoi le serviteur savant fait-il des actes choquants ?", "لماذا فعل العبد الصالح أفعالًا مستغربة؟",
  "Pour montrer qu'un jugement sur l'apparence peut être faux : chaque acte cachait une raison que Mūsā ignorait.",
  "ليبيّن أن الحكم على الظاهر قد يخطئ: لكل فعل حكمة خفية جهلها موسى.",
  ["18:71-77 : bateau troué, garçon tué, mur redressé sans salaire.",
   "18:79 : le bateau abîmé échappe à un roi qui saisissait les bons bateaux.",
   "18:82 : le mur protégeait le trésor de deux orphelins ; « je ne l'ai pas fait de moi-même ».",
   "18:68 : la leçon : « comment patienter sur ce dont tu n'as pas la connaissance ? »"],
  [('18:71', 'خرقها'), ('18:79', 'غصبا'), ('18:82', 'عن امري'), ('18:68', 'لم تحط به خبرا')])

Q('pharaon-yusuf', 'r-yusuf', "Le souverain d'Égypte s'appelle-t-il toujours « Pharaon » ?", "هل يُسمّى حاكم مصر دائمًا «فرعون»؟",
  "Non. À l'époque de Yūsuf, le texte dit « le roi » (al-malik) ; à l'époque de Mūsā, « Pharaon ». La distinction est constante.",
  "لا. في زمن يوسف يقول النص «الملك»، وفي زمن موسى «فرعون»، والتمييز مطّرد.",
  ["12:43, 12:50, 12:54 : « wa qāla al-malik ».",
   "Sourate Yūsuf (111 versets) : le mot Firʿawn n'y apparaît jamais.",
   "Récit de Mūsā : Firʿawn partout (ex. 20:24)."],
  [('12:43', 'وقال الملك'), ('12:54', 'وقال الملك'), ('20:24', 'فرعون')])

Q('femmes-nommees', 'r-maryam', "Quelles femmes sont nommées dans le texte ?", "من النساء المسمّيات في النص؟",
  "Une seule : Maryam. Toutes les autres sont désignées par leur lien (épouse de…, mère de…, sœur de…).",
  "واحدة فقط: مريم. وسائر النساء يُذكرن بصلتهن (امرأة فلان، أم موسى، أخته…).",
  ["19:16 : « rappelle dans le Livre Maryam ».",
   "66:11-12 : deux modèles positifs : l'épouse de Pharaon et Maryam.",
   "66:10 : deux modèles négatifs : les épouses de Nūḥ et de Lūṭ.",
   "Le modèle ne dépend donc pas du mari : épouse croyante d'un tyran, épouses infidèles de prophètes."],
  [('19:16', 'مريم'), ('66:11', 'امرات فرعون'), ('66:10', 'امرات نوح')])

Q('jinn-futur', 'inv-jinns', "Les jinns connaissent-ils l'avenir ?", "هل يعلم الجن الغيب؟",
  "Non. Preuve narrative : ils ont continué à travailler sans savoir que Sulaymān était mort.",
  "لا. والدليل القصصي: ظلّوا يعملون ولم يعلموا بموت سليمان.",
  ["34:14 : seul le ver qui ronge le bâton révèle la mort ; « s'ils connaissaient l'invisible… ».",
   "72:8-9 : leur accès au ciel est désormais bloqué.",
   "6:59 : les clés de l'invisible ne sont qu'auprès de Dieu."],
  [('34:14', 'منساته'), ('72:9', 'رصدا'), ('6:59', 'مفاتح الغيب')])

Q('chatiment-peuples', 'pe-detruits', "Pourquoi des peuples ont-ils été anéantis ?", "لماذا أُهلكت أقوام؟",
  "Selon un schéma constant : un messager de leur peuple, un avertissement, un refus collectif, puis la conséquence. Jamais sans avertissement.",
  "وفق نمط ثابت: رسول منهم، إنذار، تكذيب جماعي، ثم العاقبة. ولا عذاب بلا إنذار.",
  ["17:15 : « Nous ne châtions pas avant d'avoir envoyé un messager ».",
   "11:117 : ton Seigneur ne détruit pas injustement des cités dont les habitants sont réformateurs.",
   "10:98 : contre-exemple : le peuple de Yūnus crut et fut épargné.",
   "29:40 : chacun saisi pour sa propre faute."],
  [('17:15', 'نبعث رسولا'), ('11:117', 'مصلحون'), ('10:98', 'قوم يونس'), ('29:40', 'حاصبا')])

Q('preuve-dieu', 'pr-createur', "Comment le texte prouve-t-il l'existence d'un créateur ?", "كيف يستدل النص على وجود الخالق؟",
  "Par élimination : l'humain vient soit de rien, soit de lui-même, soit d'un créateur ; les deux premières hypothèses sont absurdes.",
  "بالسبر والتقسيم: إمّا من لا شيء، أو خلقوا أنفسهم، أو لهم خالق؛ والأوّلان باطلان.",
  ["52:35 : « ont-ils été créés de rien, ou sont-ils les créateurs ? »",
   "52:36 : « ont-ils créé les cieux et la terre ? »",
   "6:76-79 : Ibrāhīm écarte ce qui disparaît : ce qui change ne peut être l'origine.",
   "20:50 : le créateur est celui qui donne à chaque chose sa forme et la guide."],
  [('52:35', 'من غير شي'), ('52:36', 'خلقوا السموت'), ('6:76', 'الافلين'), ('20:50', 'اعطي كل شي خلقه')])

Q('preuve-unicite', 'pr-unicite', "Pourquoi un seul Dieu et pas plusieurs ?", "لماذا إله واحد لا آلهة متعددة؟",
  "Raisonnement par l'absurde : plusieurs volontés souveraines produiraient le désordre ; or l'univers est ordonné.",
  "برهان التمانع: تعدد الإرادات المطلقة يفضي إلى الفساد، والكون منتظم.",
  ["21:22 : s'il y avait plusieurs dieux, cieux et terre seraient corrompus.",
   "23:91 : chaque dieu emporterait sa création, l'un dominerait l'autre.",
   "67:3 : aucune faille dans la création.",
   "Donc : un ordre unique implique une volonté unique."],
  [('21:22', 'لفسدتا'), ('23:91', 'لذهب كل اله'), ('67:3', 'تفوت')])

Q('preuve-resurrection', 'pr-resurrection', "Comment le texte prouve-t-il la résurrection ?", "كيف يستدل النص على البعث؟",
  "Par trois arguments : qui a créé une fois peut recréer ; qui a créé le plus grand peut le plus petit ; la terre morte revit chaque année.",
  "بثلاث حجج: من خلق أول مرة قادر على الإعادة؛ من خلق الأكبر قادر على الأصغر؛ والأرض الميتة تحيا كل عام.",
  ["36:78-79 : « celui qui les a créés une première fois ».",
   "36:81 : les cieux et la terre sont plus grands que l'humain.",
   "41:39 : la pluie ranime la terre inerte.",
   "30:27 : refaire est « plus facile » que faire."],
  [('36:79', 'اول مره'), ('36:81', 'بقدر علي ان يخلق مثلهم'), ('41:39', 'اهتزت وربت'), ('30:27', 'اهون عليه')])

Q('coran-defi', 'pr-coran', "Comment le texte se met-il lui-même à l'épreuve ?", "كيف يتحدّى النص نفسه؟",
  "Par un défi décroissant (tout le texte, puis dix sourates, puis une seule) et un critère vérifiable : l'absence de contradiction.",
  "بتحدٍّ متدرّج (مثله، ثم عشر سور، ثم سورة) ومعيار قابل للفحص: انتفاء الاختلاف.",
  ["17:88 : produire l'équivalent du texte entier.",
   "11:13 : dix sourates.",
   "2:23 : une seule sourate.",
   "4:82 : s'il venait d'un autre que Dieu, on y trouverait beaucoup de contradictions."],
  [('17:88', 'بمثل هذا القران'), ('11:13', 'بعشر سور'), ('2:23', 'بسوره من مثله'), ('4:82', 'اختلفا كثيرا')])

Q('alcool', 'soc-alimentation', "Le vin est-il interdit d'un coup ?", "هل حُرّم الخمر دفعة واحدة؟",
  "Non : le texte montre une progression, de la mise en garde à l'interdiction.",
  "لا: النص يبيّن تدرّجًا من التحذير إلى التحريم.",
  ["2:219 : il y a un péché et des utilités, mais le péché est plus grand.",
   "4:43 : ne pas approcher la prière en état d'ivresse.",
   "5:90-91 : souillure, œuvre du démon : évitez-le."],
  [('2:219', 'واثمهما اكبر'), ('4:43', 'سكري'), ('5:90', 'فاجتنبوه')])

Q('guerre', 'soc-guerre', "Le combat est-il permis sans limite ?", "هل القتال مباح بلا حدود؟",
  "Non : il est permis contre ceux qui combattent, sans transgression, et doit s'arrêter si l'autre propose la paix.",
  "لا: هو مأذون به ضد من يقاتل، بلا اعتداء، ويتوقف إن جنح العدو للسلم.",
  ["22:39 : permission parce qu'ils ont été lésés.",
   "2:190 : combattez ceux qui vous combattent, ne transgressez pas.",
   "8:61 : s'ils inclinent à la paix, incline-toi.",
   "60:8 : bonté et justice envers ceux qui ne combattent pas."],
  [('22:39', 'اذن للذين يقتلون'), ('2:190', 'ولا تعتدوا'), ('8:61', 'للسلم'), ('60:8', 'ان تبروهم')])

Q('homme-femme', 'hum-diversite', "Hommes et femmes sont-ils égaux devant Dieu ?", "هل الرجل والمرأة سواء عند الله؟",
  "Devant Dieu, oui : même origine, mêmes qualités, même récompense. Le texte fixe ensuite des rôles différents dans certaines règles sociales (héritage, charge du foyer).",
  "عند الله نعم: أصل واحد، صفات واحدة، جزاء واحد. ثم يحدد النص أدوارًا مختلفة في بعض الأحكام (الميراث، القوامة).",
  ["4:1 : une seule âme d'origine.",
   "33:35 : dix qualités énumérées au masculin et au féminin, même récompense.",
   "3:195 : « Je ne laisse perdre l'œuvre d'aucun d'entre vous, homme ou femme ».",
   "4:11 et 4:34 : règles différenciées, justifiées dans le texte par les charges financières."],
  [('4:1', 'نفس وحده'), ('33:35', 'المسلمين والمسلمت'), ('3:195', 'من ذكر او انثي'), ('4:34', 'قومون')])

Q('autres-religions', 'pe-livre', "Les fidèles d'autres religions peuvent-ils être sauvés ?", "هل يمكن أن ينجو أتباع الأديان الأخرى؟",
  "Le texte contient les deux affirmations : 2:62 et 5:69 ouvrent la récompense à quiconque croit en Dieu et au Dernier Jour et agit bien ; 3:85 dit qu'une religion autre que l'islām ne sera pas acceptée. Le sens de « islām » (soumission à Dieu) est la clé de lecture.",
  "النص يتضمن الأمرين: 2:62 و5:69 يفتحان الأجر لكل من آمن بالله واليوم الآخر وعمل صالحًا؛ و3:85 يقول إن غير الإسلام لن يُقبل. ومعنى «الإسلام» (الاستسلام لله) هو مفتاح القراءة.",
  ["2:62 et 5:69 : croyants, juifs, chrétiens, sabéens : trois conditions.",
   "3:85 : quiconque recherche une religion autre que l'islām.",
   "3:67 : Ibrāhīm « n'était ni juif ni chrétien, mais ḥanīf muslim » : le mot désigne ici une attitude antérieure aux appellations.",
   "Le texte laisse donc deux lectures possibles ; l'arbre ne tranche pas."],
  [('2:62', 'والصبين'), ('5:69', 'والصبون'), ('3:85', 'غير الاسلم'), ('3:67', 'حنيفا مسلما')])

Q('dieu-visible', 'dieu-unicite', "Peut-on voir Dieu ?", "هل يُرى الله؟",
  "Pas dans ce monde : même la montagne s'effondre quand Dieu s'y manifeste. Un verset évoque des visages « regardant vers leur Seigneur » au Jour dernier.",
  "ليس في الدنيا: حتى الجبل اندكّ حين تجلّى له. وآية تذكر وجوهًا «إلى ربها ناظرة» يوم القيامة.",
  ["6:103 : les regards ne L'atteignent pas.",
   "7:143 : « tu ne Me verras pas » ; la montagne s'effondre.",
   "75:22-23 : des visages ce jour-là, regardant vers leur Seigneur."],
  [('6:103', 'لا تدركه الابصر'), ('7:143', 'لن تريني'), ('75:23', 'ناظره')])

Q('heure-date', 'ad-heure', "Peut-on connaître la date de la fin du monde ?", "هل يمكن معرفة موعد الساعة؟",
  "Non. Même le messager ne la connaît pas ; elle viendra soudainement.",
  "لا. حتى الرسول لا يعلمها، وتأتي بغتة.",
  ["7:187 : son savoir n'est qu'auprès de mon Seigneur ; elle viendra soudainement.",
   "31:34 : la connaissance de l'Heure est auprès de Dieu.",
   "79:42-44 : « que sais-tu de sa date ? ». Le terme appartient à ton Seigneur."],
  [('7:187', 'بغته'), ('31:34', 'علم الساعه'), ('79:44', 'منتهيها')])

Q('intercession', 'ad-jugement', "Quelqu'un peut-il sauver un autre au jugement ?", "هل يشفع أحد لأحد يوم القيامة؟",
  "Personne par son propre pouvoir ; l'intercession n'existe que par la permission de Dieu.",
  "لا أحد بقدرته الذاتية؛ والشفاعة لا تكون إلا بإذن الله.",
  ["2:48 : nulle âme ne suffira à une autre.",
   "2:255 : qui peut intercéder sans Sa permission ?",
   "20:109 : seulement pour celui à qui le Tout-Miséricordieux le permet."],
  [('2:48', 'لا تجزي نفس'), ('2:255', 'من ذا الذي يشفع'), ('20:109', 'الشفعه')])

Q('muhammad-humain', 'r-muhammad', "Muḥammad est-il présenté comme surhumain ?", "هل يُقدَّم محمد بصفة فوق بشرية؟",
  "Non. Le texte insiste sur son humanité, lui fait dire qu'il ne connaît pas l'invisible, et le reprend parfois.",
  "لا. النص يؤكد بشريته، ويأمره أن يقول إنه لا يعلم الغيب، ويعاتبه أحيانًا.",
  ["18:110 : « je ne suis qu'un humain comme vous ».",
   "6:50 : ni trésors, ni invisible, ni ange.",
   "80:1-10 : reproche pour s'être détourné d'un aveugle.",
   "3:144 : il peut mourir comme les messagers avant lui."],
  [('18:110', 'بشر مثلكم'), ('6:50', 'ولا اقول لكم اني ملك'), ('80:2', 'الاعمي'), ('3:144', 'وما محمد')])
