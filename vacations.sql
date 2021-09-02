-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followed_vacations`
--

DROP TABLE IF EXISTS `followed_vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followed_vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vacation_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followed_vacations`
--

LOCK TABLES `followed_vacations` WRITE;
/*!40000 ALTER TABLE `followed_vacations` DISABLE KEYS */;
INSERT INTO `followed_vacations` VALUES (35,1,5),(36,1,5),(37,1,5),(38,4,5),(44,5,5),(49,3,3),(50,4,3),(51,5,4),(52,6,4),(53,4,36),(62,2,2),(63,3,2),(64,1,2);
/*!40000 ALTER TABLE `followed_vacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `user_type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','boaz','thaller','be926142d7af9d2b9e786f5be35194a9','ADMIN'),(2,'oded','oded','thaller','be926142d7af9d2b9e786f5be35194a9','USER'),(3,'naama','naama','thaller','be926142d7af9d2b9e786f5be35194a9','USER'),(4,'rahum','yair','','be926142d7af9d2b9e786f5be35194a9','USER'),(5,'yair','yair','','be926142d7af9d2b9e786f5be35194a9','USER'),(36,'naamaha','naama','thaller','be926142d7af9d2b9e786f5be35194a9','USER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacation_id` int NOT NULL AUTO_INCREMENT,
  `vacation_destination` varchar(45) NOT NULL,
  `vacation_price` varchar(45) NOT NULL,
  `vacation_start_date` varchar(45) NOT NULL,
  `vacation_end_date` varchar(45) NOT NULL,
  `vacation_description` varchar(100) NOT NULL,
  `vacation_image` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`vacation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Beijing','222','2021-08-16T21:00:00.000Z','2021-08-18T21:00:00.000Z','Come visit the great wall of China','https://im0-tub-com.yandex.net/i?id=870483301a7f0994a951119c91f73036&n=13'),(2,'Barcelona','444','2021-08-24T21:00:00.000Z','2021-08-26T21:00:00.000Z','Home of FC Barcelona','https://image.jimcdn.com/app/cms/image/transf/none/path/s0ac0fbed583753f5/image/i9339a9a0cae85d76/version/1519485569/image.jpg'),(3,'Madrid','333','2021-08-29T21:00:00.000Z','2021-08-30T21:00:00.000Z','Madrid','https://im0-tub-com.yandex.net/i?id=f8ae5714ad06a94215ff224e0a60ce17&n=13'),(4,'Paris','555','2021-08-10T21:00:00.000Z','2021-08-16T21:00:00.000Z','The city of lights','https://mocah.org/uploads/posts/524419-eiffel-tower.jpg'),(5,'Berlin','700','2021-08-11T21:00:00.000Z','2021-08-20T21:00:00.000Z','Berlin','https://im0-tub-com.yandex.net/i?id=f35ffae6174d51cd54acf6139309ff03&n=13'),(6,'London','400','2021-08-09T21:00:00.000Z','2021-08-11T21:00:00.000Z','City of Theaters','https://im0-tub-com.yandex.net/i?id=57543c8eed7abbe56ee489f84dc234aa&n=13');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-12 12:06:09
