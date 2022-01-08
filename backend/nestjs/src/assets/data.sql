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

INSERT INTO "t_game_type" ("game_type_id", "game_aspect", "ball_size", "map_type", "initial_speed", "racket_size") VALUES
(1, 'https://localhost:3000/pong/', 1, 'classic', 1, 50),
(2, 'https://localhost:3000/pong/', 10, 'medium', 2, 75),
(3, 'https://localhost:3000/pong/', 15, 'hard', 3, 75);

INSERT INTO "t_stat" ("login", "match_number", "victory", "loss", "points_for_ladder", "highest_score", "worst_score", "scored_points", "adversary_points", "longest_match", "shortest_match", "created", "updated") VALUES
('Moldu_05', '8', '7', '1', '62', '10', '2', '50', '38', '600', '159', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_01', '2', '1', '1', '10', '10', '8', '18', '12', '430', '360', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_02', '4', '2', '2', '18', '10', '6', '32', '20', '840', '125', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_03', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1980-01-01 12:42:00', '1980-01-01 12:42:00'),
('Moldu_04', '7', '2', '5', '32', '10', '0', '44', '61', '1048', '27', '1980-01-01 12:42:00', '1980-01-01 12:42:00');