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
(1, 'https://dummyimage.com/150x100/324448/aaa', 1, 'Classic', 1, 50),
(2, 'https://dummyimage.com/150x100/43B6B2/aaa', 10, 'School', 2, 75),
(3, 'https://dummyimage.com/150x100/F97D64/aaa', 15, 'Custom', 3, 75);