-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: next-step-events.c5g8dlg2wv5t.us-east-2.rds.amazonaws.com    Database: destroys_nextstepevents
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_events_users_idx` (`user_id`),
  CONSTRAINT `fk_events_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (13,'aoeueoua','2018-06-07 00:00:00','2018-06-22 00:00:00','aoeuoaeu','2018-06-19 23:04:34','2018-06-19 23:04:34',3),(14,'chees','2018-06-30 00:00:00','2018-07-28 00:00:00','aoeuaoeu','2018-06-20 15:35:27','2018-06-20 15:35:27',3),(15,'new movement','2018-06-22 00:00:00','2018-06-30 00:00:00','aoeuaoeu','2018-06-20 17:50:17','2018-06-20 17:50:17',3),(16,'oaueaoe','2018-06-29 00:00:00','2018-06-30 00:00:00','aoeuaoe','2018-06-25 23:48:26','2018-06-25 23:48:26',3),(17,'oauoaeu','2018-06-30 00:00:00','2018-06-30 00:00:00','aouoaeueou','2018-06-25 19:58:59','2018-06-25 19:58:59',52),(18,'MyEvent','2018-06-29 00:00:00','2018-06-29 00:00:00','aoueaoeu','2018-06-25 19:59:38','2018-06-25 19:59:38',52),(19,'xmen xetreme','2018-06-30 00:00:00','2018-06-30 00:00:00','aoeuoeu','2018-06-25 20:00:20','2018-06-25 20:00:20',53);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events_has_users`
--

DROP TABLE IF EXISTS `events_has_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events_has_users` (
  `events_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`events_id`,`users_id`),
  KEY `fk_events_has_users_users1_idx` (`users_id`),
  KEY `fk_events_has_users_events1_idx` (`events_id`),
  CONSTRAINT `fk_events_has_users_events1` FOREIGN KEY (`events_id`) REFERENCES `events` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_events_has_users_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_has_users`
--

LOCK TABLES `events_has_users` WRITE;
/*!40000 ALTER TABLE `events_has_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `events_has_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `thread_id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'stuff about bears','2018-06-21 18:23:28','2018-06-21 18:23:28',14,1,NULL),(2,'stuff about chairs','2018-06-21 18:23:56','2018-06-21 18:23:56',14,2,NULL),(3,'stuff about the last one','2018-06-21 18:24:06','2018-06-21 18:24:06',14,3,NULL),(4,'message last one','2018-06-21 18:24:19','2018-06-21 18:24:19',15,3,NULL),(5,'message second one','2018-06-21 18:24:27','2018-06-21 18:24:27',15,2,NULL),(6,'message first one','2018-06-21 18:24:33','2018-06-21 18:24:33',15,1,NULL),(7,'aoeuoaeu','2018-06-27 12:22:54','2018-06-27 12:22:54',52,1,0),(8,'aoeuaoueoe','2018-06-27 13:27:09','2018-06-27 13:27:09',52,1,0),(9,'aeuaoeuoaeu','2018-06-27 13:29:02','2018-06-27 13:29:02',52,1,0),(10,'aoeuaoeu','2018-06-27 13:30:51','2018-06-27 13:30:51',52,1,0),(11,'aoeuoaeu','2018-06-27 13:31:48','2018-06-27 13:31:48',52,1,0),(12,'aoeuaoue','2018-06-27 13:32:28','2018-06-27 13:32:28',52,1,0),(13,'aouoaeu','2018-06-27 13:34:25','2018-06-27 13:34:25',52,1,0),(14,'aoeuaoeu','2018-06-27 13:35:36','2018-06-27 13:35:36',52,1,0),(15,'MY NEW STUFF','2018-06-27 13:35:44','2018-06-27 13:35:44',52,1,0),(16,'AREN\'T YOU CLEVER!!','2018-06-27 13:35:55','2018-06-27 13:35:55',52,1,0),(17,'NEW NEW','2018-06-27 13:45:49','2018-06-27 13:45:49',52,1,0),(18,'oauoaeuaoeu','2018-06-27 13:49:22','2018-06-27 13:49:22',52,1,0),(19,'aoeuoaeu','2018-06-27 13:52:34','2018-06-27 13:52:34',52,1,0),(20,'aoeuoaeu','2018-06-27 13:54:29','2018-06-27 13:54:29',52,2,0),(21,'aoeuoeuoaeu','2018-06-27 13:54:32','2018-06-27 13:54:32',52,2,0),(22,'aoeuoaeu','2018-06-27 13:54:36','2018-06-27 13:54:36',52,2,0),(23,'aoeuoaeuo','2018-06-27 13:54:40','2018-06-27 13:54:40',52,3,0),(24,'More cheese!','2018-06-27 13:54:46','2018-06-27 13:54:46',52,3,0),(25,'More bears!','2018-06-27 13:54:56','2018-06-27 13:54:56',52,1,0),(26,'More bears!','2018-06-27 13:55:05','2018-06-27 13:55:05',52,1,0),(27,'WHOS THERE','2018-06-27 15:49:29','2018-06-27 15:49:29',52,18,0),(28,'ME','2018-06-27 15:49:35','2018-06-27 15:49:35',52,18,0),(29,'MEME WHO','2018-06-27 15:49:40','2018-06-27 15:49:40',52,18,0),(30,'I like Florida','2018-06-27 20:38:20','2018-06-27 20:38:20',52,20,0),(31,'Miami is nice','2018-06-27 20:38:30','2018-06-27 20:38:30',52,20,0),(32,'But I don\'t like that','2018-06-27 20:39:47','2018-06-27 20:39:47',52,21,0),(33,'It\'s okay if you don\'t like that','2018-06-27 20:39:55','2018-06-27 20:39:55',52,21,0),(34,'aouaoeuouo','2018-06-27 21:55:54','2018-06-27 21:55:54',52,22,0),(35,'oeuoeueou','2018-06-28 11:49:41','2018-06-28 11:49:41',52,23,0),(36,'oeuoeueoueuou','2018-06-28 11:49:43','2018-06-28 11:49:43',52,23,0),(37,'eeeee','2018-06-28 11:49:45','2018-06-28 11:49:45',52,23,0),(38,'oeuoeu','2018-06-30 20:01:15','2018-06-30 20:01:15',52,24,0),(39,'oeuoeuoeuoeu','2018-06-30 20:01:18','2018-06-30 20:01:18',52,24,0),(40,'oauaoeu','2018-07-01 18:43:39','2018-07-01 18:43:39',52,25,0),(41,'yes','2018-07-06 15:05:28','2018-07-06 15:05:28',52,28,0),(42,'here we go','2018-07-06 15:05:32','2018-07-06 15:05:32',52,28,0),(43,'time to get it','2018-07-06 15:05:36','2018-07-06 15:05:36',52,28,0),(44,'ain\'t no sunshine','2018-07-06 15:05:40','2018-07-06 15:05:40',52,28,0),(45,'when we\'re gone','2018-07-06 15:05:46','2018-07-06 15:05:46',52,28,0),(46,'it\'s the end','2018-07-06 15:05:49','2018-07-06 15:05:49',52,28,0),(47,'oauae','2018-07-07 15:00:58','2018-07-07 15:00:58',52,28,0),(48,'oauaeoeuoeua','2018-07-07 15:01:04','2018-07-07 15:01:04',52,28,0),(49,'aoeuoeu','2018-07-07 15:01:15','2018-07-07 15:01:15',52,28,0),(50,'MonkeyBoneMessage','2018-07-07 15:01:29','2018-07-07 15:01:29',52,28,0),(51,'MOREThreadsMessage','2018-07-07 15:01:39','2018-07-07 15:01:39',52,28,0),(52,'Thread 27','2018-07-07 15:02:12','2018-07-07 15:02:12',52,28,0),(53,'thread 26 message','2018-07-07 15:04:35','2018-07-07 15:04:35',52,0,0),(54,'thread26','2018-07-07 15:05:45','2018-07-07 15:05:45',52,26,0),(55,'thread26-2','2018-07-07 15:05:49','2018-07-07 15:05:49',52,26,0),(56,'thread26-24','2018-07-07 15:05:51','2018-07-07 15:05:51',52,26,0),(57,'new message','2018-07-07 15:07:52','2018-07-07 15:07:52',52,27,0),(58,'welcome home','2018-07-07 15:07:56','2018-07-07 15:07:56',52,27,0),(59,'here we god, thread 27','2018-07-07 15:08:02','2018-07-07 15:08:02',52,27,0),(60,'ouaouoeauoaeu','2018-07-07 15:24:30','2018-07-07 15:24:30',52,26,0),(61,'more stuff for jedi','2018-07-07 15:47:13','2018-07-07 15:47:13',55,0,0),(62,'x message\n','2018-07-07 15:47:52','2018-07-07 15:47:52',55,26,0),(63,'need to fix submit!\n','2018-07-07 15:48:01','2018-07-07 15:48:01',55,26,0),(64,'I like turtles!','2018-07-08 15:51:50','2018-07-08 15:51:50',55,26,0),(65,'new message\n','2018-07-08 17:38:11','2018-07-08 17:38:11',52,26,0),(66,'Hi there','2018-07-08 17:39:55','2018-07-08 17:39:55',52,26,0),(67,'oauaoeuo','2018-07-08 18:36:29','2018-07-08 18:36:29',56,26,0),(68,'Anyone know what time the first day starts?','2018-07-10 21:46:58','2018-07-10 21:46:58',57,37,0),(69,'I heard there are some good pizza places around! What\'s good?','2018-07-10 21:47:18','2018-07-10 21:47:18',57,36,0),(70,'Hi Everyone, can\'t wait to get started on the project!','2018-07-11 13:47:25','2018-07-11 13:47:25',57,38,0),(81,'<p>So here is the agenda for the start</p><p><br></p><p>9:30 am Registration Arrive at the venue and get checked in</p><p><br></p><p>10:00 am Networking, share ideas, practice pitches, get to know fellow participants</p><p><br></p><p>11:30 am Lunch and Welcome &amp; Speakers Review agenda for the weekend and introduce speakers, coaches, and community leaders</p><p><br></p><p>1:00 pm Pitches Start Optionally line up to give your pitch</p><p><br></p><p>2:00 pm Voting Attendees vote for the top pitches</p><p><br></p><p>3:15 pm Form Teams Teams start forming and discussing ideas</p><p><br></p><p>4:00 pm Begin Work Start to formalize teams and take an inventory of skills. Be honest, and direct about what resources and skills are needed for the weekend. You may stay and work as late as the venue will allow</p>','2018-07-13 16:48:00','2018-07-13 16:48:00',58,40,0),(82,'<p>Some of my favorite nonprofits involve youth services. I\'d really like to do something in that area.</p>','2018-07-13 18:00:12','2018-07-13 18:00:12',58,39,0),(83,'<p>I\'m looking for a group!</p>','2018-07-13 18:02:35','2018-07-13 18:02:35',58,44,0),(84,'<p>We\'re now located at</p><p>Electropositive</p><p>639 Classon Avenue</p><p>Brooklyn, NY 11238</p>','2018-07-13 18:08:15','2018-07-13 18:08:15',59,45,0),(85,'<p>This is  fantastic. Thank you. Can you please let us know which conference room we should head to?</p>','2018-07-13 18:09:28','2018-07-13 18:09:28',59,40,0),(86,'<p>Hi EmmaX, we\'re looking for a content manager.</p>','2018-07-13 18:13:19','2018-07-13 18:13:19',59,44,0),(87,'<p>I really like Lombardi\'s</p>','2018-07-13 18:22:58','2018-07-13 18:22:58',59,36,0),(88,'<p>I believe you have to get registered on the 21, but it starts on the 22nd. Late registration is accepted too.</p>','2018-07-13 18:24:29','2018-07-13 18:24:29',59,37,0);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `event_id` bigint(20) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'bears','2018-06-19 22:52:10','2018-06-19 22:52:10',13,NULL),(2,'chairs','2018-06-19 22:52:25','2018-06-19 22:52:25',14,NULL),(3,'spears','2018-06-19 22:52:32','2018-06-19 22:52:32',15,NULL),(4,'aouaoeua',NULL,NULL,13,NULL),(5,'oaeuaoeuaoeu',NULL,NULL,13,NULL),(6,'Where can we go from here?',NULL,NULL,13,NULL),(7,'New Room, new day!',NULL,NULL,17,NULL),(8,'oeaouaoeu',NULL,NULL,14,NULL),(9,'aoeuoaeuaoeu',NULL,NULL,15,NULL),(10,'oaeuoauoaeue',NULL,NULL,14,NULL),(11,'aouaoeu',NULL,NULL,13,NULL),(12,'aoeuoeauaoeu',NULL,NULL,13,NULL),(13,'aouaoeuoeau',NULL,NULL,13,NULL),(14,'auoauaeuouoeu',NULL,NULL,14,NULL),(15,'aoeuoaeue',NULL,NULL,13,NULL),(16,'aoeuaoeuaoeu',NULL,NULL,13,NULL),(17,'aoeuoaeua',NULL,NULL,13,NULL),(18,'aouaoeuaoeu',NULL,NULL,13,NULL),(19,'aoueaoeu',NULL,NULL,13,NULL),(20,'NEW ROOM',NULL,NULL,13,NULL),(21,'NICE',NULL,NULL,13,NULL),(22,'oeuoaeu',NULL,NULL,13,NULL),(23,'NEW ROOM ME',NULL,NULL,13,NULL),(24,'ROOM IT AGAIN',NULL,NULL,13,52),(25,'aoeuaoeu','2018-07-01 00:03:59','2018-07-01 00:03:59',13,52),(26,'NYC - Freedom and stuff','2018-07-01 22:04:32','2018-07-01 22:04:32',2147483647,52),(27,'NEW ROOM','2018-07-01 22:15:46','2018-07-01 22:15:46',2147483647,52),(28,'NEW ROOM','2018-07-01 22:19:13','2018-07-01 22:19:13',4361188432,52),(29,'ANOTHER NEW ROOM!','2018-07-01 22:19:21','2018-07-01 22:19:21',4361188432,52),(30,'aoeuoaeu','2018-07-01 22:39:46','2018-07-01 22:39:46',4361188432,52),(31,'oeuaoeu','2018-07-01 22:43:53','2018-07-01 22:43:53',25753439230,52),(32,'new room','2018-07-02 19:30:15','2018-07-02 19:30:15',44303297355,52),(33,'NEW ROOM ','2018-07-08 20:34:33','2018-07-08 20:34:33',4361188432,55),(34,'MORE ROOM','2018-07-08 16:38:28','2018-07-08 16:38:28',4361188432,55),(35,'General','2018-07-10 21:29:57','2018-07-10 21:29:57',46325229007,57),(36,'Group PurpleRain','2018-07-10 21:30:09','2018-07-10 21:30:09',46325229007,57),(38,'Day 1 Expectations and Recap','2018-07-10 21:48:44','2018-07-10 21:48:44',46325229007,57),(39,'Day 2 Expectations and Recap','2018-07-10 21:49:47','2018-07-10 21:49:47',46325229007,57),(40,'Content Managers, Let\'s Discuss!','2018-07-10 21:50:27','2018-07-10 21:50:27',46325229007,57),(41,'Welcome','2018-07-13 18:02:55','2018-07-13 18:02:55',44730911360,58),(42,'Location Update','2018-07-13 18:03:11','2018-07-13 18:03:11',46644023530,58),(43,'Important Updates','2018-07-13 18:03:27','2018-07-13 18:03:27',44730911360,58),(44,'Venue info and designated areas','2018-07-13 18:04:22','2018-07-13 18:04:22',46644023530,58),(45,'Breakthroughs!','2018-07-13 18:04:46','2018-07-13 18:04:46',44730911360,58),(46,'Lesson discussion','2018-07-13 18:25:41','2018-07-13 18:25:41',46644023530,59);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms_has_users`
--

DROP TABLE IF EXISTS `rooms_has_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rooms_has_users` (
  `room_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms_has_users`
--

LOCK TABLES `rooms_has_users` WRITE;
/*!40000 ALTER TABLE `rooms_has_users` DISABLE KEYS */;
INSERT INTO `rooms_has_users` VALUES (1,2),(1,1),(2,2),(2,3);
/*!40000 ALTER TABLE `rooms_has_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('6ZQcXyDWtZk4-0DIqpBHOIhXkkvTCzzg',1532097040,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('K_FxwU-pWhygi5g-f-h7WU9szyQYYsJS',1532091748,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('Vuz1RcAXjolqEgMlhlBUUEy_qnAhq50w',1532091515,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('bgmfN9EVHmAlrQ0LbUx7VhJk7qTaBaZ3',1532038131,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('hWn985HUadnXa04AXHjvAa9lONmF0Yi1',1532091516,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `threads`
--

DROP TABLE IF EXISTS `threads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `threads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_threads_rooms1_idx` (`room_id`),
  CONSTRAINT `fk_threads_rooms1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `threads`
--

LOCK TABLES `threads` WRITE;
/*!40000 ALTER TABLE `threads` DISABLE KEYS */;
INSERT INTO `threads` VALUES (1,'Bears and beers',NULL,NULL,1,NULL,NULL),(2,'Bears and beers','2018-06-21 17:49:05','2018-06-21 17:49:05',1,NULL,NULL),(3,'Bears and cheese','2018-06-21 17:49:25','2018-06-21 17:49:25',1,NULL,NULL),(4,'chairs and arts','2018-06-21 17:50:04','2018-06-21 17:50:04',2,NULL,NULL),(5,'chairs and hearts','2018-06-21 17:50:09','2018-06-21 17:50:09',2,NULL,NULL),(6,'auoeuoeu',NULL,NULL,2,'52',NULL),(7,'aoeuoeau',NULL,NULL,1,'52',NULL),(8,'aoeuaoeu',NULL,NULL,1,'52',NULL),(9,'type2',NULL,NULL,1,'52',NULL),(10,'aoeuaoeu',NULL,NULL,1,'52',NULL),(11,'aoeuaoeu',NULL,NULL,1,'52',NULL),(12,'aoeuoaeu',NULL,NULL,1,'52',NULL),(13,'type3',NULL,NULL,1,'52',NULL),(14,'not',NULL,NULL,1,'52',NULL),(15,'aoeueoa',NULL,NULL,2,'52',NULL),(16,'type4',NULL,NULL,1,'52',NULL),(17,'type0',NULL,NULL,1,'52',NULL),(18,'KNOCK',NULL,NULL,1,'52',NULL),(19,'Welcome!',NULL,NULL,6,'52',NULL),(20,'We can go anywhere!',NULL,NULL,6,'52',NULL),(21,'I like everything',NULL,NULL,7,'52',NULL),(22,'aouoaeuoaeu',NULL,NULL,18,'52',NULL),(23,'oeuoeuoeu',NULL,NULL,6,'52',NULL),(24,'oeuoe',NULL,NULL,4,'52',NULL),(25,'ueuaouoeu','0000-00-00 00:00:00',NULL,29,'52','0000-00-00 00:00:00'),(26,'aoeuaoeu','0000-00-00 00:00:00',NULL,28,'52','0000-00-00 00:00:00'),(27,'oeuaoeu','0000-00-00 00:00:00',NULL,28,'52','0000-00-00 00:00:00'),(28,'More Threads','0000-00-00 00:00:00',NULL,28,'52','0000-00-00 00:00:00'),(29,'new','0000-00-00 00:00:00',NULL,32,'52','0000-00-00 00:00:00'),(30,'This is my thread about stuff','0000-00-00 00:00:00',NULL,32,'52','0000-00-00 00:00:00'),(31,'monkey bone','0000-00-00 00:00:00',NULL,28,'52','0000-00-00 00:00:00'),(32,'I like threads','0000-00-00 00:00:00',NULL,28,'52','0000-00-00 00:00:00'),(33,'another thread for 28','0000-00-00 00:00:00',NULL,28,'55','0000-00-00 00:00:00'),(34,'another thread for 28','0000-00-00 00:00:00',NULL,28,'55','0000-00-00 00:00:00'),(35,'Threads for threads','0000-00-00 00:00:00',NULL,28,'55','0000-00-00 00:00:00'),(36,'Places to eat!','0000-00-00 00:00:00',NULL,35,'57','0000-00-00 00:00:00'),(37,'What\'s on the agenda?','0000-00-00 00:00:00',NULL,35,'57','0000-00-00 00:00:00'),(38,'Welcome!','0000-00-00 00:00:00',NULL,36,'57','0000-00-00 00:00:00'),(39,'Brainstorming ideas...','0000-00-00 00:00:00',NULL,36,'57','0000-00-00 00:00:00'),(40,'Agenda','0000-00-00 00:00:00',NULL,38,'57','0000-00-00 00:00:00'),(41,'Speaker Notes','0000-00-00 00:00:00',NULL,38,'58','0000-00-00 00:00:00'),(42,'Registration Details','0000-00-00 00:00:00',NULL,35,'58','0000-00-00 00:00:00'),(43,'Tips and tricks','0000-00-00 00:00:00',NULL,40,'58','0000-00-00 00:00:00'),(44,'Anyone looking for a group?','0000-00-00 00:00:00',NULL,40,'58','0000-00-00 00:00:00'),(45,'General','0000-00-00 00:00:00',NULL,42,'59','0000-00-00 00:00:00'),(46,'Agenda','0000-00-00 00:00:00',NULL,39,'59','0000-00-00 00:00:00'),(47,'Registration and contact info','0000-00-00 00:00:00',NULL,41,'59','0000-00-00 00:00:00'),(48,'2nd Floor instead of 3rd','0000-00-00 00:00:00',NULL,43,'59','0000-00-00 00:00:00'),(49,'What was your day 1 breakthrough?','0000-00-00 00:00:00',NULL,45,'59','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `threads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'mikey@mikey.com','2018-06-19 22:50:02','2018-06-19 22:50:02','',NULL,NULL,NULL),(2,'bobby@bobby.com','2018-06-19 22:51:26','2018-06-19 22:51:26','',NULL,NULL,NULL),(3,'chris@chris.com','2018-06-19 22:51:27','2018-06-19 22:51:27','',NULL,NULL,NULL),(4,'help@home.com','2018-06-25 12:45:14','2018-06-25 12:45:14','cheese','donkey','kong',NULL),(5,'ho@ho.com','2018-06-25 12:47:40','2018-06-25 12:47:40','cheesy','Mark','Steel',NULL),(6,'hoto@hoto.com','2018-06-25 12:48:04','2018-06-25 12:48:04','cheesyoaeueoauo','bland','monkey',NULL),(7,'arts@home.com','2018-06-25 12:56:27','2018-06-25 12:56:27','oaeuoeuaou','monkey','man',NULL),(8,'hell@home.com','2018-06-25 12:57:16','2018-06-25 12:57:16','oaeuoaeu','marty','mcfly',NULL),(9,'231help@home.com','2018-06-25 12:58:14','2018-06-25 12:58:14','oaoeuoaue','monkey','man',NULL),(10,'go@home.ocm','2018-06-25 12:59:45','2018-06-25 12:59:45','ouaeu','smart','man',NULL),(11,'nthsnt@tthsnt.com','2018-06-25 13:05:27','2018-06-25 13:05:27','oeuaoeu','oaeua','thnsh',NULL),(12,'aoeu@eoua.com','2018-06-25 13:06:18','2018-06-25 13:06:18','oaeuaoeu','aoeu','aoeu',NULL),(13,'aoeu@oueaou.com','2018-06-25 13:06:58','2018-06-25 13:06:58','aoeuoaeu','aoeu','aoeu',NULL),(14,'oeauaou@aoeuaoe.com','2018-06-25 13:08:28','2018-06-25 13:08:28','oeuaoeu','aoeu','aoeu',NULL),(15,'thnth@hntoh.com','2018-06-25 13:22:14','2018-06-25 13:22:14','aoeuaoeu','rick','aoeuaoeu',NULL),(16,'aoeuoau@oaeuoaeu.com','2018-06-25 13:23:50','2018-06-25 13:23:50','onethusnaoeu','aoeu','aoeu',NULL),(17,'aoeu@oeuaoeuaoeu.com','2018-06-25 13:25:05','2018-06-25 13:25:05','aoeu','aoeu','aoeu',NULL),(18,'aoeuoaeu@aouoaeu.com','2018-06-25 13:25:41','2018-06-25 13:25:41','thaonseuaoeu','aoeuae','aoeuoaeu',NULL),(19,'aoeuoeu@ouaoe.co','2018-06-25 13:35:26','2018-06-25 13:35:26','oaeu','aoeu','aoeu',NULL),(20,'aoeuao@aoeu.com','2018-06-25 13:36:52','2018-06-25 13:36:52','oeuaoeu','aou','aoeu',NULL),(21,'aoeu@oeaue.oueoau','2018-06-25 13:38:36','2018-06-25 13:38:36','aoeu','eoui','oaeu',NULL),(22,'aoeu@oauao.oue','2018-06-25 13:39:43','2018-06-25 13:39:43','aoeuoaeu','aoeu','aoeu',NULL),(23,'oaeuoea@aouao.com','2018-06-25 13:40:28','2018-06-25 13:40:28','aoeuaoeu','aouaoe','oauoaeu',NULL),(24,'aoeu@aeuaoeu','2018-06-25 13:40:55','2018-06-25 13:40:55','oaeuaoeoe','aoeu','aoeu',NULL),(25,'aoeuoue@aoeuoae.oeuoaeu','2018-06-25 13:41:43','2018-06-25 13:41:43','aoeua','aoeu','aoeu',NULL),(26,'aoeuaoeu@eoauao.ocm','2018-06-25 13:42:13','2018-06-25 13:42:13','oaeuaoeu','oaue','aoeu',NULL),(27,'aouoeau@oaeeu.aoeu','2018-06-25 13:42:54','2018-06-25 13:42:54','aoeua','oeau','aouoaeu',NULL),(28,'aoeuo@aoeuaoeu.oue','2018-06-25 13:44:16','2018-06-25 13:44:16','aoeuaoe','aoeu','aoeu',NULL),(29,'aoeuaoeu@aoeuaoeu.oueou','2018-06-25 13:45:01','2018-06-25 13:45:01','oaeuaoeu','aoeuoaeu','aoeu',NULL),(30,'aoeu@aoeu.oeu','2018-06-25 15:01:03','2018-06-25 15:01:03','aoeu','aoeu','aoeu',NULL),(31,'aoeuaoeu@aouoaeu.oua','2018-06-25 15:03:22','2018-06-25 15:03:22','aoeu','aoeu','aoeu',NULL),(32,'aoeu@EOuaou.com','2018-06-25 15:04:41','2018-06-25 15:04:41','oeuoaeu','aoeu','aoeu',NULL),(33,'aoeu@oaeuao.oeuoau','2018-06-25 15:05:09','2018-06-25 15:05:09','aoeuaoeu','oaeu','aoeu',NULL),(34,'aeoueoaoeuoeu@oaeuao.oeuoau','2018-06-25 15:06:33','2018-06-25 15:06:33','aoeuaoeu','oaeu','aoeu',NULL),(35,'aoeu@oeauaoeuaoeu.aoeuao','2018-06-25 15:07:15','2018-06-25 15:07:15','aoeuao','aoeu','aoeu',NULL),(36,'aoeuaoeu@euaoueeo.oeuaoeuoeau','2018-06-25 15:08:07','2018-06-25 15:08:07','aoeu','aoeu','aoeu',NULL),(37,'aoeuoaeu@oauaoeu.com','2018-06-25 15:11:39','2018-06-25 15:11:39','aoeuoaeueou','aoeu','aoeu',NULL),(38,'aoeu@eooau.oeueou','2018-06-25 15:17:20','2018-06-25 15:17:20','oaeuoaeu','aoeu','aoeu',NULL),(39,'aoeuoeau@oeuoae.com','2018-06-25 15:19:09','2018-06-25 15:19:09','oaeuaoeu','oaeu','aoeu',NULL),(40,'aoeu@aoeuaou.oeuoeau','2018-06-25 15:20:40','2018-06-25 15:20:40','aoeuaoe','aoeu','aoeu',NULL),(41,'euaoeuoae@eoauoeu.oeuoaeuoeau','2018-06-25 15:21:35','2018-06-25 15:21:35','oaeuoaeu','aoueoea','uaouoaeuo',NULL),(42,'aouoeu@oeauao.oeuaoeu','2018-06-25 15:23:14','2018-06-25 15:23:14','aoeuoaeu','aoeuoae','aoeuoeau',NULL),(43,'aoueoeu@aoeuaoe.oeuaoe','2018-06-25 15:26:37','2018-06-25 15:26:37','aoeu','aoeu','aoeu',NULL),(44,'aoeu@eoau.oeuaoue','2018-06-25 15:28:10','2018-06-25 15:28:10','aoeu','aoeu','aoeu',NULL),(45,'aoeuoeu@oaeuaoeu.oeuoeau','2018-06-25 15:32:14','2018-06-25 15:32:14','aoeuoaeu','aoeu','aoeu',NULL),(46,'aoeuoe@aoeuoaeu.oeuoeu','2018-06-25 15:34:33','2018-06-25 15:34:33','aoeueou','oaeu','aoeu',NULL),(47,'aoeuoae@oueae.oeuoaeu','2018-06-25 17:22:20','2018-06-25 17:22:20','aoeuoau','oaeuaoeu','aoeuaoeu',NULL),(48,'aoeuaoeuoaeu@eoauaeou.oeuoeau','2018-06-25 17:23:02','2018-06-25 17:23:02','oaeu','aoeu','aoeu',NULL),(49,'aoeuoaeu@oaeuaou.ouoaeu','2018-06-25 17:37:32','2018-06-25 17:37:32','aoeuaoeu','oaueaou','aouoaeu',NULL),(50,'aoeuoe@oeauoau.oeuaoeu','2018-06-25 18:05:00','2018-06-25 18:05:00','oaeuaoeu','aoeuoeu','aoeuoaeu',NULL),(51,'oauoeu@oauaou.oueoau','2018-06-25 18:20:28','2018-06-25 18:20:28','oeueou','oaeuao','aoeuoau',NULL),(52,'star@wars.com','2018-06-25 18:21:51','2018-06-25 18:21:51','starwars','mark','hamill','jedi'),(53,'x@men.com','2018-06-25 20:00:06','2018-06-25 20:00:06','xmen','x','men',NULL),(54,'money@ho.com','2018-07-07 15:45:05','2018-07-07 15:45:05','hohohoh','checkn','butt','money'),(55,'x@x.com','2018-07-07 15:45:49','2018-07-07 15:45:49','x','mr','x','x'),(56,'home@xett.com','2018-07-08 18:30:54','2018-07-08 18:30:54','$2a$06$W/W7kXdkSjJAOW.O/tEvpuE1QuomlekASJiGbLCp3kzdNeOz5ASEW','Art','Ful','dodger'),(57,'deanhin.net@gmail.com','2018-07-10 15:14:51','2018-07-10 15:14:51','$2a$06$FZ4pHb67ZJlaI/1UaXb44O67x.XDCf3wq6CGUD6milg.gtFSDfadO','Dean','Hin','DeanX'),(58,'emma@roberts.com','2018-07-10 15:15:48','2018-07-10 15:15:48','$2a$06$RXiJRGXk6klLpVQ0PJaYvuuBkpnCE8J0NA/zo/988SadphxSgkimq','Emma','Roberts','EmmaX'),(59,'arjun@cage.com','2018-07-10 15:16:14','2018-07-10 15:16:14','$2a$06$r48jJD3QpsmiyM6jnjENX.tfLIuYsLQ53Ql89l6N0CTrtACK/mvDq','Arjun','Cage','ArjunX'),(60,'justin@time.com','2018-07-10 15:16:39','2018-07-10 15:16:39','$2a$06$tpODxWlzgZN8Q.P4gxweReOXN1O3JRdPbjyspoAYXBnxQ8/57HAty','Justin','Time','JustinX'),(61,'airbnb74ge@gmail.com','2018-07-10 19:17:52','2018-07-10 19:17:52','$2a$06$/ZF0QxE/sW30FgxrXkIqKeaxOWK/p/MlJxliHClDfXeYj7RIq8UGS','Alon','Bibring','abibring'),(62,'chris@evans.com','2018-07-10 15:18:45','2018-07-10 15:18:45','$2a$06$US32ASd.mendw02.krKo5.A1moGCAiki8rkM9BrcfDub8DuqCEmWu','Chris','Evans','kajri'),(63,'nancy@smith.com','2018-07-10 21:06:18','2018-07-10 21:06:18','$2a$06$OYI1AkASNhzrDtNk3z1k7.OhtMOnTvJKIRmFfkh3kxwkO.iN9yKUW','Nancy','Smith','shinjirarehen'),(64,'house@mouse.com','2018-07-10 21:06:57','2018-07-10 21:06:57','$2a$06$kuaXKWKy4e6A7F0rMWmp6unOzzGvpgK7FFLySSurDZ.RGi31aMVKe','house','mouse','mickey'),(65,'chees@smith.com','2018-07-10 21:08:54','2018-07-10 21:08:54','$2a$06$benQAsNGTOenDEDmR2H/qehJab67LGVwmEkLXVaHRom6ZXB5OFShS','Chees','smith','not'),(66,'buddy@cop.com','2018-07-10 21:11:25','2018-07-10 21:11:25','$2a$06$Dg4mlcbjW0ltJfB3GzBHcOoa/zuBRByfo5t.q2UMlcbSX7SqPtnrS','buddy','cop','movie');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-20 14:20:27
