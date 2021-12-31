INSERT INTO "t_webapp_user_data" ("login", "pseudo", "avatar", "status", "bio", "pending_queue", "banned", "admonishement", "app_role", "created", "updated") VALUES
('Moldu_01', 'MolduPseudo_01', 'https://image.freepik.com/icones-gratuites/super-simple-avatar_318-1018.jpg', 'offline', 'Blooooo', '0', '0', 0, 'User', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_02', 'MolduPseudo_02', 'https://image.freepik.com/icones-gratuites/super-simple-avatar_318-1018.jpg', 'offline', 'Bruuuuk', '0', '0', 3, 'User', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_03', 'MolduPseudo_03', 'https://image.freepik.com/icones-gratuites/super-simple-avatar_318-1018.jpg', 'online', 'Crouush', '0', '0', 0, 'User', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_04', 'MolduPseudo_04', 'https://image.freepik.com/icones-gratuites/super-simple-avatar_318-1018.jpg', 'offline', 'Plaaaaz', '0', '0', 1, 'User', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_05', 'MolduPseudo_05', 'https://image.freepik.com/icones-gratuites/super-simple-avatar_318-1018.jpg', 'online', 'Coinnng', '0', '0', 0, 'User', '1980-01-01 12:42:00', '1980-01-01 12:42:00');

INSERT INTO "t_api_user_data" ("last_name", "first_name", "mail", "created", "updated", "login") VALUES
('Moldu', 'First', 'firstmoldu@moldu.fr', '1980-01-01 12:42:00', '1980-01-01 12:42:00', 'Moldu_01'),
('Moldu', 'Second', 'secondmoldu@moldu.fr', '1980-01-01 12:42:00', '1980-01-01 12:42:00', 'Moldu_02'),
('Moldu', 'Third', 'thirdmoldu@moldu.fr', '1980-01-01 12:42:00', '1980-01-01 12:42:00', 'Moldu_03'),
('Moldu', 'Fourth', 'fourthmoldu@moldu.fr', '1980-01-01 12:42:00', '1980-01-01 12:42:00', 'Moldu_04'),
('Moldu', 'Fifth', 'fifthmoldu@moldu.fr', '1980-01-01 12:42:00', '1980-01-01 12:42:00', 'Moldu_05');

INSERT INTO "t_stat" ("login", "match_number", "victory", "loss", "points_for_ladder", "highest_score", "worst_score", "scored_points", "adversary_points", "longest_match", "shortest_match", "created", "updated") VALUES
('Moldu_05', '8', '7', '1', '62', '10', '2', '50', '38', '600', '159', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_01', '2', '1', '1', '10', '10', '8', '18', '12', '430', '360', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_02', '4', '2', '2', '18', '10', '6', '32', '20', '840', '125', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_03', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_04', '7', '2', '5', '32', '10', '0', '44', '61', '1048', '27', '1980-01-01 12:42:00', '1980-01-01 12:42:00');

INSERT INTO "t_achievement" ("detail", "icon") VALUES
('Avoir un(e) ami(e)', NULL),
('Marquer un point', NULL),
('Gagner un match', NULL),
('Perdre un point', NULL),
('Lire les règles', NULL);

INSERT INTO "t_award" ("achievement_id", "login", "date") VALUES
('1', 'Moldu_01', '1980-01-01 12:42:00'),
('1', 'Moldu_02', '1980-01-01 12:42:00'),
('5', 'Moldu_03', '1980-01-01 12:42:00'),
('4', 'Moldu_04', '1980-01-01 12:42:00'),
('2', 'Moldu_05', '1980-01-01 12:42:00'),
('3', 'Moldu_05', '1980-01-01 12:42:00');

INSERT INTO "t_relation" ("user1", "user2", "friendship", "friendship_birthday", "blocked_by_2", "blocked_by_1", "created", "updated") VALUES
('Moldu_01', 'Moldu_02', '1', '1980-01-01 12:42:00', '0', '0', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_01', 'Moldu_03', '1', '1980-01-01 12:42:00', '0', '0', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_01', 'Moldu_04', '1', '1980-01-01 12:42:00', '0', '0', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_01', 'Moldu_05', '1', '1980-01-01 12:42:00', '0', '0', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_02', 'Moldu_03', '1', '1980-01-01 12:42:00', '0', '0', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_02', 'Moldu_05', '0', '1980-01-01 12:42:00', '0', '0', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_03', 'Moldu_04', '1', '1980-01-01 12:42:00', '0', '0', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_03', 'Moldu_05', '1', '1980-01-01 12:42:00', '0', '0', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_04', 'Moldu_05', '0', '1980-01-01 12:42:00', '0', '1', '1980-01-01 12:42:00', '1980-01-01 12:42:00');

INSERT INTO "t_invitation" ("emitter", "receiver", "invitation_type", "room", "created") VALUES
('Moldu_05', 'Moldu_04', 'party', NULL, '1980-01-01 12:42:00'),
('Moldu_04', 'Moldu_01', 'room', NULL, '1980-01-01 12:42:00'),
('Moldu_04', 'Moldu_02', 'friendship', NULL, '1980-01-01 12:42:00'),
('Moldu_04', 'Moldu_03', 'party', NULL, '1980-01-01 12:42:00');

INSERT INTO "t_game_type" ("game_type_id", "game_aspect", "ball_size", "map_type", "initial_speed", "racket_size") VALUES
(1, 'default', 10, 'default', 1, 50),
(2, 'winter', 15, 'snowball', 3, 75),
(3, 'winter', 15, 'snowball', 3, 75),
(4, 'winter', 15, 'snowball', 3, 75),
(5, 'winter', 15, 'snowball', 3, 75),
(6, 'winter', 15, 'snowball', 3, 75),
(7, 'winter', 15, 'snowball', 3, 75),
(8, 'winter', 15, 'snowball', 3, 75),
(9, 'winter', 15, 'snowball', 3, 75),
(10, 'winter', 15, 'snowball', 3, 75),
(11, 'winter', 15, 'snowball', 3, 75),
(12, 'winter', 15, 'snowball', 3, 75),
(13, 'winter', 15, 'snowball', 3, 75),
(14, 'winter', 15, 'snowball', 3, 75),
(15, 'winter', 15, 'snowball', 3, 75);

INSERT INTO "t_conversation" ("conv_id", "room_type", "room_name", "password", "created", "updated") VALUES
(1, 'private', 'TranscendersParty', NULL, '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(2, 'public', 'Moldu_05 VS Moldu_01', '1234', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(3, 'public', 'Moldu_05 VS Moldu_01', '1234', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(4, 'public', 'Moldu_05 VS Moldu_01', '1234', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(5, 'public', 'Moldu_05 VS Moldu_01', '1234', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(6, 'public', 'Moldu_05 VS Moldu_01', '1234', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(7, 'public', 'Moldu_05 VS Moldu_01', '1234', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(8, 'public', 'Moldu_05 VS Moldu_01', '1234', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(9, 'public', 'Moldu_05 VS Moldu_01', '1234', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(10, 'public', 'Moldu_05 VS Moldu_01', '1234', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(11, 'public', 'Moldu_05 VS Moldu_01', '1234', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(12, 'public', 'Moldu_05 VS Moldu_01', '1234', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(13, 'public', 'Moldu_05 VS Moldu_01', '1234', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(14, 'public', 'Moldu_05 VS Moldu_01', '1234', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(15, 'public', 'Moldu_05 VS Moldu_01', '1234', '1980-01-01 12:42:00', '1980-01-01 12:42:00');

INSERT INTO "t_pong_game" ("game_id", "player1", "player2", "player1_score", "player2_score", "game_status", "winner", "looser", "game_type_id", "room_id", "created", "updated") VALUES
(1, 'Moldu_01', 'Moldu_02', 1, 3, 'playing', NULL, NULL, 1, 1, '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(2, 'Moldu_04', 'Moldu_05', 10, 6, 'finish', 'Moldu_04', 'Moldu_05', 2, 2, '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(3, 'Moldu_04', 'Moldu_05', 10, 6, 'finish', 'Moldu_04', 'Moldu_05', 3, 3, '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(4, 'Moldu_04', 'Moldu_05', 10, 6, 'playing', 'Moldu_04', 'Moldu_05', 4, 4, '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(5, 'Moldu_04', 'Moldu_05', 10, 6, 'playing', 'Moldu_04', 'Moldu_05', 5, 5, '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(6, 'Moldu_04', 'Moldu_05', 10, 6, 'playing', 'Moldu_04', 'Moldu_05', 6, 6, '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(7, 'Moldu_04', 'Moldu_05', 10, 6, 'playing', 'Moldu_04', 'Moldu_05', 7, 7, '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(8, 'Moldu_04', 'Moldu_05', 10, 6, 'playing', 'Moldu_04', 'Moldu_05', 8, 8, '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(9, 'Moldu_04', 'Moldu_05', 10, 6, 'playing', 'Moldu_04', 'Moldu_05', 9, 9, '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(10, 'Moldu_04', 'Moldu_05', 10, 6, 'playing', 'Moldu_04', 'Moldu_05', 10, 10, '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(11, 'Moldu_04', 'Moldu_05', 10, 6, 'finish', 'Moldu_04', 'Moldu_05', 11, 11, '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(12, 'Moldu_04', 'Moldu_05', 10, 6, 'finish', 'Moldu_04', 'Moldu_05', 12, 12, '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(13, 'Moldu_04', 'Moldu_05', 10, 6, 'finish', 'Moldu_04', 'Moldu_05', 13, 13, '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(14, 'Moldu_04', 'Moldu_05', 10, 6, 'finish', 'Moldu_04', 'Moldu_05', 14, 14, '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(15, 'Moldu_04', 'Moldu_05', 10, 6, 'finish', 'Moldu_04', 'Moldu_05', 15, 15, '1980-01-01 12:42:00', '1980-01-01 12:42:00');

INSERT INTO "t_participant" ("game_id", "login", "involvement", "result", "created", "updated") VALUES
(1, 'Moldu_01', 'player', NULL, '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(1, 'Moldu_02', 'player', NULL, '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(1, 'Moldu_03', 'spectator', NULL, '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(2, 'Moldu_04', 'player', NULL, '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(1, 'Moldu_05', 'player', NULL, '1980-01-01 12:42:00', '1980-01-01 12:42:00');

INSERT INTO "t_chatter" ("conv_id", "login", "chat_role", "is_present", "muted_until", "created", "updated") VALUES
(1, 'Moldu_01', 'Owner', '1', '1980-01-01 12:42:00', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(1, 'Moldu_03', 'Admin', '1', '1980-01-01 12:42:00', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(1, 'Moldu_02', 'Admin', '1', '1980-01-01 12:42:00', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(1, 'Moldu_05', 'User', '1', '1980-01-01 22:42:00', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(1, 'Moldu_04', 'User', '0', '1980-01-01 12:42:00', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(2, 'Moldu_01', 'Owner', '1', '1980-01-01 12:42:00', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(2, 'Moldu_05', 'Owner', '1', '1980-01-01 12:42:00', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
(2, 'Moldu_02', 'User', '1', '1980-01-01 12:42:00', '1980-01-01 12:42:00', '1980-01-01 12:42:00');

-- /!\ date: valeur par default
INSERT INTO "t_message" ("conv_id", "login", "date", "content") VALUES
(1, 'Moldu_04', '1980-01-01 11:02:00', 'Hello ! Y a réunion ce matin ?'),
(1, 'Moldu_01', '1980-01-01 11:03:00', 'yoooo'),
(1, 'Moldu_01', '1980-01-01 11:03:10', 'moi je suis sur discord'),
(1, 'Moldu_02', '1980-01-01 11:03:20', 'hello'),
(1, 'Moldu_02', '1980-01-01 11:03:30', 'oupsi j’ai le son coupé j’avais pas vu'),
(1, 'Moldu_04', '1980-01-01 11:04:00', 'Wesh nan je pense pas réunion'),
(1, 'Moldu_04', '1980-01-01 11:04:10', 'Enfin comme vous voulez mais moi j'' ai pas Grand chose a dire'),
(1, 'Moldu_02', '1980-01-01 11:05:00', '@Moldu_04 si tu veux voir des trucs avec le groupe on peut'),
(1, 'Moldu_03', '1980-01-01 11:06:00', 'A 42, pas vraiment de chose à dire.'),
(1, 'Moldu_04', '1980-01-01 11:06:10', 'Nop c''est bon'),
(1, 'Moldu_02', '1980-01-01 11:07:00', 'Ça marche'),
(2, 'Moldu_01', '1980-01-02 04:05:00', 'Bonne chance !'),
(2, 'Moldu_04', '1980-01-02 04:05:10', 'Haha t''as aucune chance !'),
(2, 'Moldu_02', '1980-01-02 04:05:20', 'Vas-y First !!');
