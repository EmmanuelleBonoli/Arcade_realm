-- SQLBook: Code
DROP DATABASE IF EXISTS Arcade;

CREATE DATABASE Arcade;

USE Arcade;

CREATE TABLE utilisateur (
    id INT primary key auto_increment NOT NULL, pseudo VARCHAR(80) NOT NULL, email VARCHAR(80) NOT NULL, hashed_password VARCHAR(250) NOT NULL, image VARCHAR(250) NOT NULL DEFAULT '', admin BOOLEAN NOT NULL DEFAULT FALSE, points INT NOT NULL DEFAULT FALSE, podium BOOLEAN NOT NULL DEFAULT FALSE, tickets INT NOT NULL DEFAULT FALSE
);

CREATE TABLE jeu (
    id INT primary key auto_increment NOT NULL, name varchar(255) NOT NULL, image VARCHAR(255) NOT NULL, regles TEXT NOT NULL, actif BOOLEAN NOT NULL, physique BOOLEAN NOT NULL, date DATE NOT NULL, nb_borne INT NOT NULL, description TEXT NOT NULL
);

CREATE TABLE lot (
    id INT PRIMARY KEY auto_increment NOT NULL, name VARCHAR(80) NOT NULL, image VARCHAR(250) NOT NULL, description VARCHAR(400), utilisateur_id INT DEFAULT NULL, win BOOLEAN NOT NULL DEFAULT FALSE, exchange BOOLEAN NOT NULL DEFAULT FALSE, podium INT NOT NULL DEFAULT FALSE, CONSTRAINT fk_lot_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur (id) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE evenement (
    id int primary key auto_increment not null, image varchar(250) not null
);

CREATE TABLE score (
    id INT PRIMARY KEY auto_increment NOT NULL, utilisateur_id INT NOT NULL, jeu_id INT NOT NULL, points INT NOT NULL, CONSTRAINT fk_score_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur (id) ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT fk_score_jeu FOREIGN KEY (jeu_id) REFERENCES jeu (id) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE favoris (
    utilisateur_id INT NOT NULL, jeu_id INT NOT NULL, favori BOOLEAN NOT NULL DEFAULT FALSE, CONSTRAINT fk_favoris_jeu FOREIGN KEY (jeu_id) REFERENCES jeu (id) ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT fk_favoris_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur (id) ON DELETE CASCADE ON UPDATE NO ACTION
);

INSERT INTO
    utilisateur (
        pseudo, email, hashed_password, image, admin, points, podium, tickets
    )
VALUES (
        "Wild_Gamer", "wildgamer@gmail.com", "$argon2id$v=19$m=19456,t=2,p=1$NCeUqNGKyATb2N9exMVT0Q$JGUoiwb2VY2T08gka2mwdLa8vBV/B3AKgDLGxDIPt3U", "/images/Avatar/CrashBandicoot.png", 0, 50000, 1, 10
    ),
    (
        "Pixel_Queen", "pixelqueen@gmail.com", "$argon2id$v=19$m=19456,t=2,p=1$NCeUqNGKyATb2N9exMVT0Q$JGUoiwb2VY2T08gka2mwdLa8vBV/B3AKgDLGxDIPt3U", "/images/Avatar/Rondoudou.png", 0, 30000, 2, 5
    ),
    (
        "Admin_Realm", "adminrealm@gmail.com", "$argon2id$v=19$m=19456,t=2,p=1$NCeUqNGKyATb2N9exMVT0Q$JGUoiwb2VY2T08gka2mwdLa8vBV/B3AKgDLGxDIPt3U", "/images/Avatar/Ghost.png", 1, 0, 0, 0
    ),
    (
        "Arcade_Master", "arcademaster@example.com", "$argon2id$v=19$m=19456,t=2,p=1$NCeUqNGKyATb2N9exMVT0Q$JGUoiwb2VY2T08gka2mwdLa8vBV/B3AKgDLGxDIPt3U", "/images/Avatar/DonkeyKong.png", 0, 80000, 3, 0
    ),
    (
        "Joystick_Master", "joystick@email.com", "$argon2id$v=19$m=19456,t=2,p=1$NCeUqNGKyATb2N9exMVT0Q$JGUoiwb2VY2T08gka2mwdLa8vBV/B3AKgDLGxDIPt3U", "/images/Avatar/Avatar.png", 0, 3000, 0, 10
    ),
    (
        "LevelUp_Legend", "levelup@email.com", "$argon2id$v=19$m=19456,t=2,p=1$NCeUqNGKyATb2N9exMVT0Q$JGUoiwb2VY2T08gka2mwdLa8vBV/B3AKgDLGxDIPt3U", "/images/Avatar/Mario.png", 0, 10000, 4, 5
    ),
    (
        "Quest_Seeker", "quest@email.com", "$argon2id$v=19$m=19456,t=2,p=1$NCeUqNGKyATb2N9exMVT0Q$JGUoiwb2VY2T08gka2mwdLa8vBV/B3AKgDLGxDIPt3U", "/images/Avatar/Avatar.png", 0, 4000, 5, 5
    ),
    (
        "GameOn_Guru", "gameon@email.com", "$argon2id$v=19$m=19456,t=2,p=1$NCeUqNGKyATb2N9exMVT0Q$JGUoiwb2VY2T08gka2mwdLa8vBV/B3AKgDLGxDIPt3U", "/images/Avatar/Avatar.png", 0, 9000, 6, 5
    ),
    (
        "Pixel_Pioneer", "pioneer@email.com", "$argon2id$v=19$m=19456,t=2,p=1$NCeUqNGKyATb2N9exMVT0Q$JGUoiwb2VY2T08gka2mwdLa8vBV/B3AKgDLGxDIPt3U", "/images/Avatar/Avatar.png", 0, 6000, 0, 0
    ),
    (
        "HighScore_Hero", "highscore@email.com", "$argon2id$v=19$m=19456,t=2,p=1$NCeUqNGKyATb2N9exMVT0Q$JGUoiwb2VY2T08gka2mwdLa8vBV/B3AKgDLGxDIPt3U", "/images/Avatar/Avatar.png", 0, 1000, 0, 0
    ),
    (
        "Arcade_Adventurer", "adventurer@email.com", "$argon2id$v=19$m=19456,t=2,p=1$NCeUqNGKyATb2N9exMVT0Q$JGUoiwb2VY2T08gka2mwdLa8vBV/B3AKgDLGxDIPt3U", "/images/Avatar/Avatar.png", 0, 2000, 0, 0
    ),
    (
        "Game_Champion", "champion@email.com", "$argon2id$v=19$m=19456,t=2,p=1$NCeUqNGKyATb2N9exMVT0Q$JGUoiwb2VY2T08gka2mwdLa8vBV/B3AKgDLGxDIPt3U", "/images/Avatar/Avatar.png", 0, 5000, 0, 0
    );

INSERT INTO
    lot (
        name, image, description, utilisateur_id, win, exchange, podium
    )
VALUES

(
    "Mug Space Invaders", "/images/Lots/InvadersMug.png", "Égayez vos pauses café avec ce mug rétro arborant les emblématiques extraterrestres pixélisés du célèbre jeu vidéo", 4, 1, 0, 0
),
(
    "Peluche Pac-Man", "/images/Lots/PeluchePacman.png", "Adoptez ce compagnon doux et nostalgique inspiré du jeu d'arcade classique, idéal pour les fans de rétro gaming!", 1, 1, 0, 0
),
(
    "Mini Arcade", "/images/Lots/MiniArcade.png", "blabla2", 2, 1, 0, 2
),
(
    "Monopoly Pacman", "/images/Lots/MonopolyPacman.png", "blabla", 2, 1, 0, 0
),
(
    "Super Nes", "/images/Lots/SuperNes.png", "blabla3", 1, 1, 0, 1
),
(
    "Tasse Mario", "/images/Lots/TasseMario.png", "blabla3", 2, 1, 1, 0
),
(
    "Statue Zelda", "/images/Lots/TriforceZelda.png", "blabla3", 4, 1, 0, 3
),
(
    "Mug Lego", "/images/Lots/mugLego.webp", "blabla3", 1, 1, 1, 0
),
(
    "Switch", "/images/Lots/Switch.png", "blabla3", null, 0, 0, 0
),
(
    "Déco Mario", "/images/Lots/decoMario.jpg", "blabla3", null, 0, 0, 0
),
(
    "Lampe Batman", "/images/Lots/LampeBatman.jpg", "blabla3", null, 0, 0, 0
);

INSERT INTO
    jeu (
        name,
        image,
        regles,
        actif,
        physique,
        date,
        nb_borne,
        description
    )
VALUES (
        "Metal Slug",
        "/images/jeux/mslug.jpg",
        "Tu avances, tires sur les ennemis, évites les attaques, ramasses des bonus et sauves des otages pour avancer dans des niveaux pleins d'action.",
        0,
        1,
        "1996-04-19",
        1,
        "Metal Slug est un jeu de tir à défilement latéral bourré d'action, où les joueurs contrôlent des soldats armés jusqu'aux dents pour affronter des hordes d'ennemis dans des niveaux frénétiques. Avec son style rétro, ses graphismes détaillés et son gameplay rapide, c'est un classique intemporel des jeux d'arcade"
    ), (
        "Super Mario Classic",
        "/images/jeux/mario.png",
        "blabla regles",
        0,
        1,
        "1985-09-13",
        1,
        "Super Mario Classic est un jeu emblématique de plateforme où les joueurs incarnent Mario, sautant et courant à travers des mondes colorés pour sauver la princesse Peach des griffes de Bowser. Avec ses niveaux ingénieux, ses power-ups emblématiques et son gameplay captivant, c'est un pilier de l'histoire des jeux vidéo."
    ), (
        "Defender",
        "/images/jeux/defender.jpg",
        "blabla regles",
        0,
        1,
        "1980-02-01",
        1,
        "Defender est un jeu de tir spatial classique où les joueurs pilotent un vaisseau spatial, défendant des humains contre des vagues d'extraterrestres dans un environnement à défilement horizontal. Sorti dans les années 80, il est réputé pour sa difficulté élevée, son action rapide et ses mécaniques novatrices pour l'époque."
    ), (
        "Guitar Hero",
        "/images/jeux/guitare_hero.jpg",
        "Contrairement aux jeux musicaux plus traditionnels, dans Guitar Hero, votre objectif est de jouer des morceaux de musique en appuyant sur les boutons correspondants à la guitare. Suivez le rythme de la musique et appuyez sur les bonnes touches pour marquer des points. Plus vous jouez avec précision, plus votre public applaudit et votre performance s'améliore !",
        1,
        1,
        "2005-11-01",
        4,
        "Guitar Hero est une série emblématique de jeux musicaux. Annoncé lors d'un événement spécial, il a été lancé mondialement à la date de sortie. Plongez dans le monde de la musique, défiez vos amis en mode multijoueur, et devenez une rockstar virtuelle !"
    ), (
        "Time Crisis",
        "/images/jeux/time-crisis-bg.jpg",
        "blabla regles",
        0,
        1,
        "1995-12-20",
        1,
        "Time Crisis est une série de jeux de tir sur rail en arcade où les joueurs utilisent un pistolet pour éliminer les ennemis tout en prenant des couvertures pour éviter les tirs adverses. Son concept distinctif de gameplay à couverture dynamique, son action intense et ses phases de temps limité en font un jeu de tir apprécié des amateurs d'arcade."
    ), (
        "Sonic Racing",
        "/images/jeux/sonic.jpg",
        "blabla regles",
        0,
        1,
        "1997-10-18",
        1,
        "Sonic Racing est une série de jeux de course mettant en vedette les personnages emblématiques de l'univers Sonic. Les joueurs participent à des courses effrénées, utilisant des power-ups et des compétences uniques pour atteindre la ligne d'arrivée en tête. Avec ses circuits variés, ses modes de jeu divertissants et son hommage à l'univers Sonic, c'est une expérience de course dynamique pour les fans de la franchise."


), (
    "Cars",
    "/images/jeux/Cars_(video_game).jpg",
    "blabla regles",
    0,
    1,
    "2006-06-06",
    1,
    "Cars est une série de jeux vidéo basée sur les films de Pixar du même nom, offrant des courses palpitantes et des aventures dans des mondes inspirés par les personnages du film. Les joueurs peuvent personnaliser leurs voitures préférées de manière ludique et participer à des courses passionnantes, tout en explorant des environnements familiers issus de l'univers cinématographique de Cars."
), (
    "Batman",
    "/images/jeux/batman_arcade.jpg",
    "blabla regles",
    0,
    1,
    "1996-10-30",
    1,
    "Le jeu Batman offre une expérience immersive où les joueurs endossent le rôle emblématique de Batman, explorant Gotham City, combattant le crime et affrontant des ennemis emblématiques tels que le Joker ou l'Épouvantail. Ces jeux offrent un mélange captivant d'action, d'exploration, de résolution d'énigmes et de combat, plongeant les joueurs dans l'univers sombre et fascinant du Chevalier Noir."
), (
    "Jurassic Parc",
    "/images/jeux/jurassic_shooter.jpg",
    "blabla regles",
    1,
    1,
    "1999-09-09",
    1,
    "Jurassic Park transportent les joueurs dans un monde où les dinosaures ont été ramenés à la vie. Ils offrent souvent une aventure immersive et parfois survoltée, mêlant exploration, survie et rencontres avec des créatures préhistoriques. Ces jeux capturent l'essence de l'univers Jurassic Park, offrant souvent des éléments de gestion, d'action et d'aventure pour les amateurs de dinosaures et de suspense."
), (
    "Racing Hero",
    "/images/jeux/racing_hero.png",
    "blabla regles",
    0,
    1,
    "1990-1-05",
    1,
    "Racing Hero est un jeu d'arcade classique de course de motos produit par Sega. Il offre des courses intenses sur différentes pistes, avec des motos à piloter et des adversaires à battre pour atteindre la victoire. Ce jeu se distingue par son action rapide, ses graphismes colorés et son gameplay captivant, offrant une expérience de course rétro mémorable."
), (
    "Space Invaders",
    "/images/jeux/space_invaders.jpg",
    "blabla regles",
    0,
    1,
    "1978-06-17",
    1,
    "Space Invaders est un jeu vidéo classique de tir fixe où les joueurs contrôlent un vaisseau spatial se déplaçant horizontalement pour abattre des vagues d'aliens descendantes. Sorti dans les années 1970, il a marqué l'industrie du jeu vidéo par son gameplay simple mais addictif, devenant un symbole emblématique des débuts de l'ère vidéoludique."
), (
    "Mortal Kombat",
    "/images/jeux/mortal_kombat.jpg",
    "blabla regles",
    0,
    1,
    "1992-10-08",
    1,
    "Mortal Kombat est une série de jeux de combat célèbre pour ses combats brutaux, son gameplay fluide et ses finitions spectaculaires appelées Fatalities. Les joueurs peuvent choisir parmi une gamme de personnages aux capacités uniques et s'affronter dans des combats intenses en utilisant des mouvements spéciaux, des combos et des techniques sanglantes, créant ainsi l'une des franchises les plus emblématiques du genre des jeux de combat."
), (
    "Final Fight",
    "/images/jeux/final_fight.webp",
    "blabla regles",
    0,
    1,
    "1989-12-17",
    1,
    "Final Fight est un jeu de combat urbain en défilement horizontal où les joueurs contrôlent des personnages tels que Haggar, Cody et Guy, combattant des gangs dans des environnements urbains pour sauver la ville de Metro City. Sorti dans les années 1980, il est connu pour son action frénétique, ses combats dynamiques et son style emblématique des jeux d'arcade classiques."
), (
    "Tetris",
    "/images/jeux/tetris.png",
    "blabla regles",
    0,
    1,
    "1984-06-06",
    1,
    "Tetris est un jeu de puzzle emblématique où des pièces géométriques, appelées tétriminos, descendent progressivement dans une grille. Les joueurs doivent les manipuler pour créer des lignes complètes, les faisant disparaître pour éviter que la grille ne se remplisse. Avec son concept simple mais addictif, ses niveaux de difficulté croissants et son impact majeur sur la culture des jeux vidéo, Tetris est devenu un classique intemporel."
), (
    "Donkey Kong",
    "/images/jeux/donkey-kong.jpg",
    "blabla regles",
    1,
    1,
    "1981-07-09",
    1,
    "Donkey Kong est un jeu vidéo classique où les joueurs incarnent Mario, tentant de sauver la princesse Peach des griffes de Donkey Kong. Le jeu se déroule sur plusieurs niveaux où Mario doit éviter les obstacles, sauter par-dessus des obstacles et escalader des plates-formes pour atteindre le sommet où la princesse est retenue. Sorti en 1981, c'est l'un des premiers jeux à avoir mis en scène Mario, devenant ainsi un pilier de l'histoire des jeux vidéo."
), (
    "Street Fighter II",
    "/images/jeux/street_2.jpg",
    "blabla regles",
    0,
    1,
    "1991-02-06",
    1,
    "Street Fighter II est un jeu de combat légendaire où les joueurs choisissent parmi une variété de combattants internationaux, chacun avec ses propres styles de combat et mouvements spéciaux. Ils s'affrontent dans des duels en un contre un, utilisant des techniques spéciales, des combos et des stratégies pour vaincre leurs adversaires. Sorti en 1991, ce jeu a établi les fondements du genre des jeux de combat et reste l'un des titres les plus influents et appréciés de l'histoire des jeux vidéo."
), (
    "Super Smash Bross Ultimate",
    "/images/jeux/Super_Smash_Bros_Ultimate.webp",
    "Contrairement aux jeux de combat plus traditionnels, dans Super Smash Bros. Ultimate vous devez éjecter vos adversaires hors du stage et hors de l'écran. Utilisez toute une panoplie d'attaques pour faire augmenter les dégâts de vos rivaux avant de les envoyer valdinguer hors du stage : plus un combattant accumule de dégâts plus il sera éjecté loin !",
    1,
    1,
    "2018-12-07",
    4,
    "Il s'agit du cinquième épisode de la série Super Smash Bros.. Annoncé lors du Nintendo Direct du 8 mars 2018 , il est sorti mondialement le 7 décembre 2018 exclusivement sur Nintendo Switch."
), (
    "Pac Man",
    "/images/jeux/PAC-MAN.webp",
    "blabla regles",
    0,
    1,
    "1980-05-22",
    1,
    "Pac-Man est un jeu classique où les joueurs contrôlent un personnage rond jaune appelé Pac-Man, naviguant à travers un labyrinthe pour manger des pac-gommes tout en évitant des fantômes. Le but est de nettoyer le labyrinthe tout en collectant des points, en évitant les ennemis et en utilisant des bonus spéciaux pour inverser la situation. Sorti en 1980, c'est l'un des jeux les plus emblématiques et influents de l'histoire du jeu vidéo."
), (
    "Just Dance 2024",
    "/images/jeux/just_dance.jpg",
    "blabla regles",
    0,
    1,
    "2024-10-23",
    1,
    "En 2024, Just Dance continue d'être une série de jeux de danse populaires où les joueurs suivent des chorégraphies à l'écran en mimant les mouvements des danseurs. Avec des hits musicaux actuels et passés, ce jeu encourage la convivialité et la compétition entre amis ou en famille, offrant une expérience ludique centrée sur la danse et le divertissement."
), (
    "Galaga",
    "/images/jeux/galaga.jpg",
    "blabla regles",
    0,
    1,
    "1981-10-01",
    1,
    "Galaga est un jeu de tir spatial classique où les joueurs contrôlent un vaisseau spatial pour affronter des vagues d'aliens en mouvement dans l'espace. Sorti dans les années 80, il propose un gameplay addictif où les joueurs doivent esquiver les tirs ennemis tout en éliminant les envahisseurs extraterrestres pour obtenir le meilleur score possible. Galaga est connu pour sa difficulté progressive et son style emblématique des jeux d'arcade de cette époque."
);

INSERT INTO
    evenement (image)
VALUES (
        "/images/Evenements/affiche1.png"
    ),
    (
        "/images/Evenements/affiche2.png"
    ),
    (
        "/images/Evenements/affiche3.png"
    );

-- INSERT INTO
--     favoris (utilisateur_id, jeu_id, favori)

INSERT INTO
    score (
        utilisateur_id, jeu_id, points
    )
VALUES (1, 2, 3000),
    (2, 2, 2000),
    (3, 2, 2000),
    (1, 1, 5000),
    (2, 1, 10000),
    (1, 4, 50),
    (3, 4, 4000),
    (8, 4, 5500),
    (10, 4, 9500),
    (5, 9, 2000),
    (3, 9, 899),
    (8, 9, 400),
    (4, 15, 450),
    (1, 15, 3000),
    (9, 15, 2700),
    (2, 17, 3240),
    (6, 17, 5700),
    (4, 17, 1200);