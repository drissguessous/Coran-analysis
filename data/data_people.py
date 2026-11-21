# Personnages : id, FR, AR, catégorie, sujet lié, relation à Dieu (FR, AR, réf, mot-clé), relations [(cible, FR, AR, réf, mot-clé)]
P = []
def C(i, fr, ar, cat, topic, god, rel=()):
    P.append(dict(id=i, fr=fr, ar=ar, cat=cat, topic=topic, god=god, rel=list(rel)))

# catégories : dieu, ange, jinn, prophete, humain, femme, groupe, animal
C('allah', 'Dieu', 'الله', 'dieu', 'dieu', ("Centre de toutes les relations.", "محور كل العلاقات.", '112:1-4', 'احد'))

C('jibril', 'Jibrīl', 'جبريل', 'ange', 'inv-anges', ("Porteur de la révélation sur le cœur du Prophète ; appelé aussi « l'Esprit fidèle ».", "حامل الوحي إلى قلب النبي، الروح الأمين.", '26:193-194', 'الروح الامين'), [
  ('muhammad', "Fait descendre le texte sur son cœur", "نزّل النص على قلبه", '2:97', 'نزله علي قلبك'),
  ('maryam', "L'Esprit envoyé à Maryam (non nommé ici)", "الروح المرسل إلى مريم", '19:17', 'روحنا'),
  ('mikal', "Nommés ensemble", "ذُكرا معًا", '2:98', 'ميكىل')])
C('mikal', 'Mīkāl', 'ميكال', 'ange', 'inv-anges', ("Ange nommé une seule fois.", "ملك ذُكر مرة واحدة.", '2:98', 'ميكىل'))
C('harut-marut', 'Hārūt et Mārūt', 'هاروت وماروت', 'ange', 'inv-anges', ("Deux anges descendus à Babylone comme épreuve.", "ملكان أُنزلا ببابل فتنة.", '2:102', 'هروت'))
C('malik', 'Mālik', 'مالك', 'ange', 'ad-feu', ("Gardien du feu.", "خازن النار.", '43:77', 'يملك'))
C('malak-mawt', "L'ange de la mort", 'ملك الموت', 'ange', 'ad-mort', ("Chargé de recueillir les âmes.", "موكَّل بقبض الأرواح.", '32:11', 'ملك الموت'))

C('iblis', 'Iblīs (Shayṭān)', 'إبليس', 'jinn', 'inv-iblis', ("Refuse l'ordre de Dieu par orgueil ; obtient un délai jusqu'au Jour.", "عصى أمر الله تكبرًا، وأُنظر إلى يوم البعث.", '7:12-15', 'انا خير منه'), [
  ('adam', "Refuse de se prosterner devant lui, puis le fait glisser", "أبى السجود له ثم أزلّه", '2:34-36', 'فازلهما'),
  ('humains', "Ennemi déclaré, jure de les égarer", "عدو مبين، أقسم على إغوائهم", '17:62', 'لاحتنكن'),
  ('jinns', "Fait partie des jinns", "كان من الجن", '18:50', 'كان من الجن')])
C('jinns', 'Les jinns', 'الجن', 'jinn', 'inv-jinns', ("Créés pour L'adorer, comme les humains.", "خُلقوا لعبادته كالإنس.", '51:56', 'الجن والانس'), [
  ('sulayman', "Travaillent pour lui", "يعملون بين يديه", '34:12', 'من الجن من يعمل'),
  ('muhammad', "Un groupe écoute la récitation", "نفر منهم استمعوا", '72:1', 'استمع نفر')])

C('adam', 'Adam', 'آدم', 'prophete', 'r-adam', ("Créé de Ses mains, choisi, repentir accepté.", "خُلق بيدي الله، اصطُفي، وتيب عليه.", '20:122', 'اجتبه ربه'), [
  ('epouse-adam', "Son épouse (non nommée)", "زوجه (غير مسمّاة)", '2:35', 'انت وزوجك'),
  ('fils-adam', "Ses deux fils", "ابناه", '5:27', 'ابني ادم'),
  ('anges', "Les anges se prosternent devant lui", "سجدت له الملائكة", '2:34', 'اسجدوا لادم')])
C('epouse-adam', "L'épouse d'Adam", 'زوج آدم', 'femme', 'r-adam', ("Partage la faute et le repentir ; jamais nommée.", "شاركت في الخطأ والتوبة؛ لم تُسمَّ.", '7:23', 'ظلمنا انفسنا'))
C('fils-adam', "Les deux fils d'Adam", 'ابنا آدم', 'humain', 'r-fils-adam', ("Offrande acceptée de l'un, refusée de l'autre.", "تُقبّل من أحدهما ولم يُتقبّل من الآخر.", '5:27', 'فتقبل من احدهما'))
C('anges', 'Les anges', 'الملائكة', 'ange', 'inv-anges', ("Obéissants, sans désobéissance.", "مطيعون لا يعصون.", '66:6', 'لا يعصون'))
C('humains', 'Les humains', 'الإنس', 'groupe', 'humain', ("Successeurs sur terre, éprouvés.", "خلفاء في الأرض، مبتلون.", '2:30', 'خليفه'))

C('nuh', 'Nūḥ', 'نوح', 'prophete', 'r-nuh', ("Serviteur très reconnaissant.", "عبد شكور.", '17:3', 'عبدا شكورا'), [
  ('fils-nuh', "Son fils refuse d'embarquer", "ابنه رفض الركوب", '11:42', 'ابنه'),
  ('epouse-nuh', "Son épouse le trahit dans la foi", "امرأته خانته", '66:10', 'امرات نوح')])
C('fils-nuh', 'Le fils de Nūḥ', 'ابن نوح', 'humain', 'r-nuh', ("« Il n'est pas de ta famille. »", "«إنه ليس من أهلك».", '11:46', 'ليس من اهلك'))
C('epouse-nuh', 'L’épouse de Nūḥ', 'امرأة نوح', 'femme', 'r-nuh', ("Exemple négatif.", "مثل سلبي.", '66:10', 'امرات نوح'))
C('hud', 'Hūd', 'هود', 'prophete', 'r-hud', ("Envoyé à ʿĀd, « leur frère ».", "أُرسل إلى عاد «أخاهم».", '7:65', 'اخاهم هودا'))
C('salih', 'Ṣāliḥ', 'صالح', 'prophete', 'r-salih', ("Envoyé à Thamūd avec la chamelle.", "أُرسل إلى ثمود بالناقة.", '7:73', 'اخاهم صلحا'), [
  ('chamelle', "Signe confié", "آية مرسلة", '7:73', 'ناقه الله')])
C('chamelle', 'La chamelle de Dieu', 'ناقة الله', 'animal', 'r-salih', ("Signe vivant, tuée.", "آية حية، عُقرت.", '91:13', 'ناقه الله'))

C('ibrahim', 'Ibrāhīm', 'إبراهيم', 'prophete', 'r-ibrahim', ("Ami intime (khalīl) de Dieu, éprouvé par des paroles qu'il accomplit.", "خليل الله، ابتُلي بكلمات فأتمّهن.", '2:124', 'فاتمهن'), [
  ('azar', "Son père, qu'il conteste", "أبوه الذي حاجّه", '6:74', 'لابيه ازر'),
  ('ismail', "Son fils, bâtisseur avec lui", "ابنه، شاركه في بناء البيت", '2:127', 'واسمعيل'),
  ('ishaq', "Fils annoncé par les anges", "ابن بشّرت به الملائكة", '11:71', 'باسحق'),
  ('lut', "Lūṭ croit en lui", "آمن له لوط", '29:26', 'فامن له لوط'),
  ('epouse-ibrahim', "Son épouse qui rit à l'annonce", "امرأته التي ضحكت", '11:71', 'فضحكت'),
  ('roi-ibrahim', "Débat avec le roi", "حاجّه الملك", '2:258', 'حاج ابرهم'),
  ('muhammad', "La voie d'Ibrāhīm à suivre", "اتباع ملة إبراهيم", '16:123', 'مله ابرهيم')])
C('azar', 'Āzar', 'آزر', 'humain', 'r-ibrahim', ("Père idolâtre d'Ibrāhīm.", "أبو إبراهيم، عابد أصنام.", '6:74', 'ازر'))
C('epouse-ibrahim', "L'épouse d'Ibrāhīm", 'امرأة إبراهيم', 'femme', 'r-ibrahim', ("Reçoit l'annonce d'Isḥāq et de Yaʿqūb.", "بُشّرت بإسحاق ويعقوب.", '11:71', 'ومن ورا اسحق يعقوب'))
C('roi-ibrahim', "Le roi qui débattit avec Ibrāhīm", 'الذي حاجّ إبراهيم', 'humain', 'r-ibrahim', ("Prétend donner la vie et la mort ; confondu.", "ادّعى الإحياء والإماتة فبُهت.", '2:258', 'فبهت'))
C('ismail', 'Ismāʿīl', 'إسماعيل', 'prophete', 'r-ibrahim', ("Véridique dans sa promesse.", "صادق الوعد.", '19:54', 'صادق الوعد'))
C('ishaq', 'Isḥāq', 'إسحاق', 'prophete', 'r-ibrahim', ("Prophète parmi les vertueux.", "نبيًّا من الصالحين.", '37:112', 'باسحق'), [
  ('yaqub', "Père de Yaʿqūb", "أبو يعقوب", '11:71', 'يعقوب')])
C('lut', 'Lūṭ', 'لوط', 'prophete', 'r-lut', ("Reçoit sagesse et science, sauvé.", "آتاه الله حكمًا وعلمًا ونجّاه.", '21:74', 'ولوطا اتينه'), [
  ('epouse-lut', "Son épouse reste en arrière", "امرأته من الغابرين", '7:83', 'الا امراته')])
C('epouse-lut', 'L’épouse de Lūṭ', 'امرأة لوط', 'femme', 'r-lut', ("Exemple négatif, périt avec son peuple.", "مثل سلبي، هلكت مع قومها.", '66:10', 'وامرات لوط'))

C('yaqub', 'Yaʿqūb (Isrāʾīl)', 'يعقوب', 'prophete', 'r-yusuf', ("Patience, confiance ; recommande la soumission à ses fils.", "الصبر والتوكل؛ وصّى بنيه بالإسلام.", '2:132-133', 'ووصي بها'), [
  ('yusuf', "Père de Yūsuf", "أبو يوسف", '12:4', 'لابيه'),
  ('freres-yusuf', "Père des frères", "أبو الإخوة", '12:8', 'احب الي ابينا')])
C('yusuf', 'Yūsuf', 'يوسف', 'prophete', 'r-yusuf', ("Parmi Nos serviteurs sincères (mukhlaṣīn).", "من عبادنا المخلَصين.", '12:24', 'المخلصين'), [
  ('freres-yusuf', "Trahi par ses frères puis leur pardonne", "خانه إخوته ثم عفا عنهم", '12:92', 'لا تثريب'),
  ('aziz', "Acheté par le maître d'Égypte", "اشتراه عزيز مصر", '12:21', 'الذي اشتريه'),
  ('epouse-aziz', "Sollicité par elle, refuse", "راودته فأبى", '12:23', 'ورودته'),
  ('roi-egypte', "Nommé sur les entrepôts", "جُعل على خزائن الأرض", '12:54-55', 'خزاين')])
C('freres-yusuf', 'Les frères de Yūsuf', 'إخوة يوسف', 'groupe', 'r-yusuf', ("Demandent pardon à leur père.", "طلبوا الاستغفار من أبيهم.", '12:97', 'استغفر لنا'))
C('aziz', "Al-ʿAzīz (le maître d'Égypte)", 'العزيز', 'humain', 'r-yusuf', ("Accueille Yūsuf : « honore son séjour ».", "«أكرمي مثواه».", '12:21', 'اكرمي مثويه'), [
  ('epouse-aziz', "Époux", "زوجها", '12:25', 'سيدها')])
C('epouse-aziz', "L'épouse d'al-ʿAzīz", 'امرأة العزيز', 'femme', 'r-yusuf', ("Avoue sa faute.", "اعترفت بذنبها.", '12:51', 'انا رودته'))
C('roi-egypte', "Le roi d'Égypte (temps de Yūsuf)", 'الملك', 'humain', 'r-yusuf', ("Désigné par « le roi » (al-malik), jamais « Pharaon ».", "يُسمّى «الملك» لا «فرعون».", '12:43', 'وقال الملك'))

C('shuayb', 'Shuʿayb', 'شعيب', 'prophete', 'r-shuayb', ("Envoyé à Madyan, « leur frère ».", "أُرسل إلى مدين «أخاهم».", '7:85', 'اخاهم شعيبا'))
C('ayyub', 'Ayyūb', 'أيوب', 'prophete', 'r-ayyub-yunus', ("« Quel excellent serviteur ! »", "«نعم العبد».", '38:44', 'نعم العبد'))
C('yunus', 'Yūnus (Dhū al-Nūn)', 'يونس', 'prophete', 'r-ayyub-yunus', ("Part en colère, se repent dans le poisson.", "ذهب مغاضبًا وتاب في بطن الحوت.", '21:87', 'مغضبا'))

C('musa', 'Mūsā', 'موسى', 'prophete', 'r-musa', ("Dieu lui a parlé directement ; « Je t'ai choisi pour Moi ».", "كلّمه الله تكليمًا؛ «واصطنعتك لنفسي».", '20:41', 'واصطنعتك'), [
  ('harun', "Son frère, assistant demandé", "أخوه ووزيره", '20:29-30', 'هرون اخي'),
  ('mere-musa', "Sa mère, inspirée", "أمه الموحى إليها", '28:7', 'ام موسي'),
  ('soeur-musa', "Sa sœur le suit", "أخته تتبعه", '28:11', 'لاخته'),
  ('firawn', "Adversaire principal", "الخصم الأكبر", '20:24', 'اذهب الي فرعون'),
  ('epouse-firawn', "L'adopte", "تبنّته", '28:9', 'قرت عين'),
  ('samiri', "Égare le peuple avec le veau", "أضلّ القوم بالعجل", '20:85', 'السامري'),
  ('qarun', "Qārūn était de son peuple", "كان من قومه", '28:76', 'من قوم موسي'),
  ('serviteur-savant', "Le suit pour apprendre", "اتّبعه ليتعلم", '18:66', 'هل اتبعك'),
  ('beau-pere-musa', "Le beau-père de Madyan", "صهره في مدين", '28:27', 'انكحك'),
  ('israel', "Les fait sortir d'Égypte", "أخرجهم من مصر", '20:77', 'اسر بعبادي')])
C('harun', 'Hārūn', 'هارون', 'prophete', 'r-musa', ("Accordé comme prophète à son frère.", "وهبه الله نبيًّا لأخيه.", '19:53', 'اخاه هرون'))
C('mere-musa', 'La mère de Mūsā', 'أم موسى', 'femme', 'r-musa', ("Reçoit une inspiration (waḥy) ; son cœur devient vide.", "أُوحي إليها؛ أصبح فؤادها فارغًا.", '28:10', 'فرغا'))
C('soeur-musa', 'La sœur de Mūsā', 'أخت موسى', 'femme', 'r-musa', ("« Vous indiquerai-je une famille qui s'en chargera ? »", "«هل أدلكم على أهل بيت».", '28:12', 'اهل بيت'))
C('firawn', 'Pharaon (Firʿawn)', 'فرعون', 'humain', 'r-musa', ("Se proclame « votre seigneur le plus haut » ; noyé.", "ادّعى «أنا ربكم الأعلى»؛ أُغرق.", '79:24', 'ربكم الاعلي'), [
  ('haman', "Ordre de bâtir une tour pour monter vers le dieu de Mūsā", "أمره ببناء صرح", '28:38', 'يهمن'),
  ('epouse-firawn', "Son épouse croyante", "امرأته المؤمنة", '66:11', 'امرات فرعون'),
  ('magiciens', "Les menace de crucifixion", "توعّدهم بالصلب", '20:71', 'لاصلبنكم'),
  ('croyant-firawn', "Un homme de sa famille cache sa foi", "رجل من آله يكتم إيمانه", '40:28', 'من ال فرعون')])
C('haman', 'Hāmān', 'هامان', 'humain', 'r-musa', ("Associé à Pharaon dans l'erreur.", "شريك فرعون في الخطأ.", '28:8', 'وهمن'))
C('epouse-firawn', "L'épouse de Pharaon", 'امرأة فرعون', 'femme', 'r-musa', ("« Seigneur, bâtis-moi une maison auprès de Toi au Jardin. » Exemple positif.", "«ربّ ابنِ لي عندك بيتًا في الجنة». مثل إيجابي.", '66:11', 'ابن لي عندك'))
C('magiciens', 'Les magiciens de Pharaon', 'سحرة فرعون', 'groupe', 'r-musa', ("Croient devant l'évidence malgré la menace.", "آمنوا أمام البرهان رغم الوعيد.", '20:70', 'امنا برب هرون'))
C('croyant-firawn', "L'homme croyant de la famille de Pharaon", 'مؤمن آل فرعون', 'humain', 'r-musa', ("Défend Mūsā par la logique.", "دافع عن موسى بالحجة.", '40:28', 'يكتم ايمنه'))
C('samiri', 'Al-Sāmirī', 'السامري', 'humain', 'r-musa', ("Fabrique un veau ; puni.", "صنع العجل فعوقب.", '20:95-97', 'لا مساس'))
C('qarun', 'Qārūn', 'قارون', 'humain', 'r-musa', ("Attribue sa richesse à son savoir ; englouti.", "نسب ثروته لعلمه فخُسف به.", '28:78', 'علي علم عندي'))
C('serviteur-savant', "Le serviteur savant (souvent appelé al-Khiḍr hors du texte)", 'العبد الصالح', 'humain', 'r-musa', ("Reçoit une miséricorde et une science « de chez Nous » ; non nommé.", "آتاه الله رحمة وعلّمه من لدنه علمًا؛ غير مسمّى.", '18:65', 'من لدنا علما'))
C('beau-pere-musa', 'Le vieillard de Madyan', 'شيخ مدين', 'humain', 'r-musa', ("Père des deux femmes ; non nommé dans ce récit.", "أبو المرأتين؛ غير مسمّى في القصة.", '28:23', 'شيخ كبير'))
C('israel', "Les fils d'Isrāʾīl", 'بنو إسرائيل', 'groupe', 'pe-israel', ("Préférés en leur temps, alliance, puis manquements.", "فُضّلوا في زمانهم، ثم نقضوا الميثاق.", '2:47', 'فضلتكم'))

C('talut', 'Ṭālūt', 'طالوت', 'humain', 'r-dawud-sulayman', ("Choisi roi pour savoir et force.", "اصطُفي ملكًا للعلم والجسم.", '2:247', 'بسطه في العلم'), [
  ('jalut', "Combat Jālūt", "قاتل جالوت", '2:249', 'بجالوت')])
C('jalut', 'Jālūt (Goliath)', 'جالوت', 'humain', 'r-dawud-sulayman', ("Tué par Dāwūd.", "قتله داود.", '2:251', 'وقتل داود جالوت'))
C('dawud', 'Dāwūd', 'داود', 'prophete', 'r-dawud-sulayman', ("Successeur (khalīfa) sur terre ; reçoit le Zabūr.", "خليفة في الأرض؛ أوتي الزبور.", '38:26', 'خليفه في الارض'), [
  ('sulayman', "Père de Sulaymān", "أبو سليمان", '38:30', 'لداود سليمن'),
  ('jalut', "Le tue", "قتله", '2:251', 'وقتل داود جالوت')])
C('sulayman', 'Sulaymān', 'سليمان', 'prophete', 'r-dawud-sulayman', ("« Quel excellent serviteur, il revenait sans cesse. »", "«نعم العبد إنه أوّاب».", '38:30', 'اواب'), [
  ('reine-saba', "La reine se soumet avec lui", "أسلمت معه", '27:44', 'مع سليمن'),
  ('huppe', "La huppe lui rapporte la nouvelle", "الهدهد جاءه بالخبر", '27:22', 'بنبا يقين'),
  ('jinns', "Les jinns travaillent pour lui", "الجن يعملون له", '34:12', 'من الجن')])
C('reine-saba', 'La reine de Sabaʾ', 'ملكة سبأ', 'femme', 'r-dawud-sulayman', ("Consulte ses notables, puis se soumet « à Dieu, Seigneur des mondes ».", "شاورت ملأها ثم أسلمت لله رب العالمين.", '27:44', 'لله رب العلمين'))
C('huppe', 'La huppe', 'الهدهد', 'animal', 'r-dawud-sulayman', ("Oiseau qui raisonne sur la foi d'un peuple.", "طائر يستدلّ على عقيدة قوم.", '27:24-25', 'يسجدون للشمس'))

C('zakariyya', 'Zakariyyā', 'زكريا', 'prophete', 'r-zakariya', ("Appelle son Seigneur d'un appel secret.", "نادى ربه نداء خفيًّا.", '19:3', 'ندا خفيا'), [
  ('yahya', "Père de Yaḥyā", "أبو يحيى", '19:7', 'اسمه يحيي'),
  ('maryam', "Prend Maryam en charge", "كفل مريم", '3:37', 'وكفلها زكريا')])
C('yahya', 'Yaḥyā', 'يحيى', 'prophete', 'r-zakariya', ("Paix sur lui le jour de sa naissance et de sa mort.", "سلام عليه يوم وُلد ويوم يموت.", '19:15', 'وسلم عليه'))
C('epouse-imran', "L'épouse de ʿImrān", 'امرأة عمران', 'femme', 'r-maryam', ("Voue l'enfant à Dieu.", "نذرت ما في بطنها لله.", '3:35', 'نذرت لك'), [
  ('maryam', "Mère de Maryam", "أم مريم", '3:36', 'سميتها مريم')])
C('maryam', 'Maryam', 'مريم', 'femme', 'r-maryam', ("Choisie et purifiée ; obéissante.", "اصطُفيت وطُهّرت؛ من القانتين.", '66:12', 'القنتين'), [
  ('isa', "Mère de ʿĪsā", "أم عيسى", '19:22', 'فحملته')])
C('isa', 'ʿĪsā (le Messie)', 'عيسى المسيح', 'prophete', 'r-isa', ("Serviteur et messager ; parole de Dieu ; élevé vers Lui.", "عبد ورسول، كلمة الله، رُفع إليه.", '4:171', 'وكلمته'), [
  ('apotres', "Ses apôtres (ḥawāriyyūn)", "الحواريون", '3:52', 'الحواريون'),
  ('muhammad', "Annonce un messager nommé Aḥmad", "بشّر برسول اسمه أحمد", '61:6', 'احمد')])
C('apotres', 'Les apôtres', 'الحواريون', 'groupe', 'r-isa', ("« Nous sommes les auxiliaires de Dieu. »", "«نحن أنصار الله».", '3:52', 'انصار الله'))

C('dhulqarnayn', 'Dhū al-Qarnayn', 'ذو القرنين', 'humain', 'r-dhulqarnayn', ("« Ceci est une miséricorde de mon Seigneur. »", "«هذا رحمة من ربي».", '18:98', 'رحمه من ربي'), [
  ('yajuj', "Les enferme derrière un barrage", "حجزهم بالسد", '18:94-95', 'ياجوج')])
C('yajuj', 'Yaʾjūj et Maʾjūj', 'يأجوج ومأجوج', 'groupe', 'r-dhulqarnayn', ("Semeurs de désordre, relâchés à la fin.", "مفسدون، يُفتح عليهم آخر الزمان.", '21:96', 'ياجوج'))
C('caverne', 'Les jeunes de la caverne', 'أصحاب الكهف', 'groupe', 'r-caverne', ("« Nous leur avons accru la guidance. »", "«وزدناهم هدى».", '18:13', 'وزدنهم هدي'))
C('luqman', 'Luqmān', 'لقمان', 'humain', 'r-luqman', ("Reçoit la sagesse : « sois reconnaissant envers Dieu ».", "أوتي الحكمة: «أن اشكر لله».", '31:12', 'ان اشكر لله'))
C('uzayr', 'ʿUzayr', 'عزير', 'humain', 'pe-livre', ("Seule mention : attribution de filiation divine rejetée.", "الذكر الوحيد: نسبة البنوّة إلى الله مرفوضة.", '9:30', 'عزير'))
C('idris', 'Idrīs', 'إدريس', 'prophete', 'r-autres', ("Élevé à un haut rang.", "رُفع مكانًا عليًّا.", '19:57', 'مكانا عليا'))

C('muhammad', 'Muḥammad', 'محمد', 'prophete', 'r-muhammad', ("Messager et sceau des prophètes ; Dieu et Ses anges prient sur lui.", "رسول وخاتم النبيين؛ الله وملائكته يصلون عليه.", '33:56', 'يصلون علي النبي'), [
  ('zayd', "Zayd, seul compagnon nommé", "زيد، الصحابي الوحيد المسمّى", '33:37', 'زيد'),
  ('abu-lahab', "Son adversaire nommé", "خصمه المسمّى", '111:1', 'ابي لهب'),
  ('epouses-prophete', "Ses épouses, « mères des croyants »", "أزواجه أمهات المؤمنين", '33:6', 'امهتهم'),
  ('compagnon-grotte', "« Le second de deux » dans la grotte (non nommé)", "ثاني اثنين في الغار", '9:40', 'لصحبه')])
C('zayd', 'Zayd', 'زيد', 'humain', 'r-muhammad', ("Nommé une fois.", "ذُكر مرة واحدة.", '33:37', 'زيد'))
C('abu-lahab', 'Abū Lahab', 'أبو لهب', 'humain', 'pe-quraysh', ("Sa richesse ne lui sert à rien.", "ما أغنى عنه ماله.", '111:2', 'ما اغني عنه'))
C('epouses-prophete', 'Les épouses du Prophète', 'أزواج النبي', 'groupe', 'r-muhammad', ("« Vous n'êtes pas comme les autres femmes. »", "«لستنّ كأحد من النساء».", '33:32', 'لستن كاحد'))
C('compagnon-grotte', 'Le compagnon de la grotte', 'صاحب الغار', 'humain', 'r-muhammad', ("Non nommé dans le texte.", "غير مسمّى في النص.", '9:40', 'لصحبه'))
