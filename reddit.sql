
DROP TABLE IF EXISTS posts;

CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(300) DEFAULT NULL,
  `url` varchar(600) NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `score` int(11) DEFAULT '0',
  `username` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `posts` VALUES (1,"Anthony Bourdain: Vegetarians Make 'Bad Travelers and Bad Guests'",'http://www.ecorazzi.com/2011/10/17/anthony-bourdain-vegetarians-make-bad-travelers-and-bad-guests/','2018-10-01 12:25:33',0,'anthony'),(2,'Joe Rogan: God damn it smells like weed in here','https://www.youtube.com/watch?v=wJv0BgBa0xs','2018-09-27 12:46:22',0,'joe'),(3,'Louis CK: Live at the Beacon Theater','https://www.youtube.com/watch?v=tSafPJJlYdE','2018-09-20 15:19:23',1,'louie'),(4,'Ali Wong: I just want to wear little boys underwear','https://www.youtube.com/watch?v=oItPQRZ3xpI','2018-09-20 15:19:26',0,'ali'),(5,'Trevor Noah: Thats Racist','https://www.dailymotion.com/video/x2uovey','2018-09-20 15:19:34',2,'trevor'),(7,'Chris Rock: Bring the Pain','https://www.youtube.com/watch?v=coC4t7nCGPs','2018-09-21 09:10:12',4,'kamilla');


