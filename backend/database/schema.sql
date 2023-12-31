DROP DATABASE IF EXISTS Arcade;

CREATE DATABASE Arcade;

USE Arcade;

CREATE TABLE
    utilisateur (
        id INT primary key auto_increment NOT NULL,
        pseudo VARCHAR(80) NOT NULL,
        email VARCHAR(80) NOT NULL,
        password VARCHAR(250) NOT NULL,
        image VARCHAR(250) NOT NULL DEFAULT '',
        admin BOOLEAN NOT NULL DEFAULT FALSE,
        points INT NOT NULL DEFAULT FALSE
    );

CREATE TABLE
    jeu (
        id INT primary key auto_increment NOT NULL,
        name varchar(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        regles TEXT NOT NULL,
        actif BOOLEAN NOT NULL,
        physique BOOLEAN NOT NULL,
        date DATE NOT NULL,
        nb_borne INT NOT NULL,
        description TEXT NOT NULL
    );

CREATE TABLE
    lot (
        id INT PRIMARY KEY auto_increment NOT NULL,
        name VARCHAR(80) NOT NULL,
        image VARCHAR(250) NOT NULL,
        description VARCHAR(400),
        utilisateur_id INT DEFAULT NULL,
        disponible BOOLEAN NOT NULL DEFAULT FALSE,
        CONSTRAINT fk_lot_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE ON UPDATE NO ACTION
    );

CREATE TABLE
    evenement (
        id int primary key auto_increment not null,
        image varchar(250) not null
    );

CREATE TABLE
    score (
        utilisateur_id INT NOT NULL,
        jeu_id INT NOT NULL,
        points INT NOT NULL,
        CONSTRAINT fk_score_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT fk_score_jeu FOREIGN KEY (jeu_id) REFERENCES jeu(id) ON DELETE CASCADE ON UPDATE NO ACTION
    );

INSERT INTO
    utilisateur (
        pseudo,
        email,
        password,
        image,
        admin,
        points
    )
VALUES (
        "Wild_Gamer",
        "wildgamer@gmail.com",
        "rondoudou",
        "/images/Avatar/CrashBandicoot.png",
        0,
        50000
    ), (
        "Pixel_Queen",
        "pixelqueen@gmail.com",
        "kirby",
        "/images/Avatar/Rondoudou.png",
        0,
        30000
    ), (
        "Admin_Realm",
        "adminrealm@gmail.com",
        "arcaderealm",
        "/images/Avatar/Ghost.png",
        1,
        0
    ), (
        "Arcade_Master",
        "arcademaster@example.com",
        "master",
        "/images/Avatar/DonkeyKong.png",
        0,
        80000
    ), (
        "Joystick_Master",
        "joystick@email.com",
        "gamer456",
        "/images/Avatar/Avatar3.png",
        0,
        3000
    ), (
        "LevelUp_Legend",
        "levelup@email.com",
        "legendary7",
        "/images/Avatar/Avatar4.png",
        0,
        10000
    ), (
        "Quest_Seeker",
        "quest@email.com",
        "seeker999",
        "/images/Avatar/Avatar5.png",
        0,
        4000
    ), (
        "GameOn_Guru",
        "gameon@email.com",
        "guru22",
        "/images/Avatar/Avatar6.png",
        0,
        9000
    ), (
        "Pixel_Pioneer",
        "pioneer@email.com",
        "pixel123",
        "/images/Avatar/Avatar7.png",
        0,
        6000
    ), (
        "HighScore_Hero",
        "highscore@email.com",
        "heroic55",
        "/images/Avatar/Avatar8.png",
        0,
        1000
    ), (
        "Arcade_Adventurer",
        "adventurer@email.com",
        "adventurer99",
        "/images/Avatar/Avatar9.png",
        0,
        2000
    ), (
        "Game_Champion",
        "champion@email.com",
        "champion10",
        "/images/Avatar/Avatar10.png",
        0,
        5000
    );

INSERT INTO
    lot (
        name,
        image,
        description,
        utilisateur_id,
        disponible
    )
VALUES (
        "5x Tickets Gratuits",
        "/images/Lots/ticketgratuit.png",
        "5 tickets gratuits pour jouer à n'importe quel jeu de votre choix dans notre salle d'arcade !",
        4,
        1
    ),

(
    "Mug Space Invaders",
    "/images/Lots/InvadersMug.png",
    "Égayez vos pauses café avec ce mug rétro arborant les emblématiques extraterrestres pixélisés du célèbre jeu vidéo",
    4,
    1
), (
    "Peluche Pac-Man",
    "/images/Lots/PeluchePacman.png",
    "Adoptez ce compagnon doux et nostalgique inspiré du jeu d'arcade classique, idéal pour les fans de rétro gaming!",
    1,
    1
), (
    "Mini Arcade",
    "/images/Lots/MiniArcade.png",
    "blabla2",
    2,
    1
), (
    "Monopoly Pacman",
    "/images/Lots/MonopolyPacman.png",
    "blabla",
    2,
    1
), (
    "Super Nes",
    "/images/Lots/SuperNes.png",
    "blabla3",
    2,
    1
), (
    "Tasse Mario",
    "/images/Lots/TasseMario.png",
    "blabla3",
    2,
    1
), (
    "Statue Zelda",
    "/images/Lots/TriforceZelda.png",
    "blabla3",
    2,
    1
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
        "blabla regles",
        0,
        1,
        "2018-07-12",
        1,
        "blabla description"
    ), (
        "Super Mario Classic",
        "/images/jeux/mario.png",
        "blabla regles",
        0,
        1,
        "2018-07-12",
        1,
        "blabla description"
    ), (
        "Defender",
        "/images/jeux/defender.jpg",
        "blabla regles",
        0,
        1,
        "2018-07-12",
        1,
        "blabla description"
    ), (
        "Guitar Hero",
        "/images/jeux/guitare_hero.jpg",
        "Contrairement aux jeux musicaux plus traditionnels, dans Guitar Hero, votre objectif est de jouer des morceaux de musique en appuyant sur les boutons correspondants à la guitare. Suivez le rythme de la musique et appuyez sur les bonnes touches pour marquer des points. Plus vous jouez avec précision, plus votre public applaudit et votre performance s'améliore !",
        1,
        1,
        "2005-08-12",
        4,
        "Guitar Hero est une série emblématique de jeux musicaux. Annoncé lors d'un événement spécial, il a été lancé mondialement à la date de sortie. Plongez dans le monde de la musique, défiez vos amis en mode multijoueur, et devenez une rockstar virtuelle !"
    ), (
        "Time Crisis",
        "/images/jeux/time-crisis-bg.jpg",
        "blabla regles",
        0,
        1,
        "2018-07-12",
        1,
        "blabla description"
    ), (
        "Sonic Racing",
        "/images/jeux/sonic.jpg",
        "blabla regles",
        0,
        1,
        "2018-07-12",
        1,
        "blabla description"
    ), (
        "Cars",
        "/images/jeux/Cars_(video_game).jpg",
        "blabla regles",
        0,
        1,
        "2018-07-12",
        1,
        "blabla description"
    ), (
        "Batman",
        "/images/jeux/batman_arcade.jpg",
        "blabla regles",
        0,
        1,
        "2018-07-12",
        1,
        "blabla description"
    ), (
        "Jurassic Parc",
        "/images/jeux/jurassic_shooter.jpg",
        "blabla regles",
        0,
        1,
        "2018-07-12",
        1,
        "blabla description"
    ), (
        "Racing Hero",
        "/images/jeux/racing_hero.png",
        "blabla regles",
        0,
        1,
        "2018-07-12",
        1,
        "blabla description"
    ), (
        "Space Invaders",
        "/images/jeux/space_invaders.jpg",
        "blabla regles",
        0,
        1,
        "2018-07-12",
        1,
        "blabla description"
    ), (
        "Mortal Kombat",
        "/images/jeux/mortal_kombat.jpg",
        "blabla regles",
        0,
        1,
        "2018-07-12",
        1,
        "blabla description"
    ), (
        "Final Fight",
        "/images/jeux/final_fight.webp",
        "blabla regles",
        0,
        1,
        "2018-07-12",
        1,
        "blabla description"
    ), (
        "Tetris",
        "/images/jeux/tetris.png",
        "blabla regles",
        0,
        1,
        "2018-07-12",
        1,
        "blabla description"
    ), (
        "Donkey Kong",
        "/images/jeux/donkey-kong.jpg",
        "blabla regles",
        0,
        1,
        "2018-07-12",
        1,
        "blabla description"
    ), (
        "Street Fighter II",
        "/images/jeux/street_2.jpg",
        "blabla regles",
        0,
        1,
        "2018-07-12",
        1,
        "blabla description"
    ), (
        "Super Smash Bross Ultimate",
        "/images/jeux/Super_Smash_Bros_Ultimate.webp",
        "Contrairement aux jeux de combat plus traditionnels, dans Super Smash Bros. Ultimate vous devez éjecter vos adversaires hors du stage et hors de l'écran. Utilisez toute une panoplie d'attaques pour faire augmenter les dégâts de vos rivaux avant de les envoyer valdinguer hors du stage : plus un combattant accumule de dégâts plus il sera éjecté loin !",
        1,
        1,
        "2018-07-12",
        4,
        "Il s'agit du cinquième épisode de la série Super Smash Bros.. Annoncé lors du Nintendo Direct du 8 mars 2018 , il est sorti mondialement le 7 décembre 2018 exclusivement sur Nintendo Switch."
    ), (
        "Pac Man",
        "/images/jeux/PAC-MAN.webp",
        "blabla regles",
        0,
        1,
        "2018-07-12",
        1,
        "blabla description"
    ), (
        "Just Dance 2024",
        "/images/jeux/just_dance.jpg",
        "blabla regles",
        0,
        1,
        "2018-07-12",
        1,
        "blabla description"
    ), (
        "Galaga",
        "/images/jeux/galaga.jpg",
        "blabla regles",
        0,
        1,
        "2018-07-12",
        1,
        "blabla description"
    );

INSERT INTO evenement (image)
VALUES (
        "/images/Evenements/affiche1.png"
    ), (
        "/images/Evenements/affiche2.png"
    ), (
        "/images/Evenements/affiche3.png"
    );

INSERT INTO
    score (utilisateur_id, jeu_id, points)
VALUES (1, 2, 3000), (2, 2, 2000), (3, 2, 2000), (1, 1, 5000), (2, 1, 10000);