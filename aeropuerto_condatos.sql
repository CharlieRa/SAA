-- MySQL dump 10.13  Distrib 5.5.35, for Linux (x86_64)
--
-- Host: localhost    Database: aeropuerto
-- ------------------------------------------------------
-- Server version	5.5.35

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
-- Table structure for table `airline`
--

DROP TABLE IF EXISTS `airline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `airline` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `NAME` varchar(15) NOT NULL,
  `ACRONYM` varchar(3) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airline`
--

LOCK TABLES `airline` WRITE;
/*!40000 ALTER TABLE `airline` DISABLE KEYS */;
INSERT INTO `airline` VALUES (1,'LanAirlines','LAN'),(2,'ChanchoPlanes','CP'),(3,'AirFrance','AF');
/*!40000 ALTER TABLE `airline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `airplane`
--

DROP TABLE IF EXISTS `airplane`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `airplane` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Identificador de avion',
  `YEAR` int(11) NOT NULL COMMENT 'Año del avion',
  `GAS_LEVEL` int(11) NOT NULL COMMENT 'Nivel de combustible',
  `PILOT` varchar(15) NOT NULL COMMENT 'Nombre del piloto',
  `COPILOT` varchar(15) NOT NULL DEFAULT '' COMMENT 'Nombre del copiloto',
  `AIRLINE_ID` int(10) unsigned NOT NULL COMMENT 'Id de aerlinea dueña',
  `T_MODEL` varchar(10) NOT NULL COMMENT 'Modelo',
  PRIMARY KEY (`ID`),
  KEY `AIRLINE_ID` (`AIRLINE_ID`),
  KEY `T_MODEL` (`T_MODEL`),
  CONSTRAINT `airplane_ibfk_1` FOREIGN KEY (`AIRLINE_ID`) REFERENCES `airline` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `airplane_ibfk_2` FOREIGN KEY (`T_MODEL`) REFERENCES `airplane_type` (`MODEL`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airplane`
--

LOCK TABLES `airplane` WRITE;
/*!40000 ALTER TABLE `airplane` DISABLE KEYS */;
INSERT INTO `airplane` VALUES (4,2012,85,'Amelia Earhart','Oliver Wright',1,'Boeing 747'),(6,2013,66,'Gato Felix','Bugs Bunny',1,'JumboJet'),(8,2012,88,'Rocky','Bullwinkle',1,'Boeing 747');
/*!40000 ALTER TABLE `airplane` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `airplane_type`
--

DROP TABLE IF EXISTS `airplane_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `airplane_type` (
  `MODEL` varchar(10) NOT NULL,
  `MADE_BY` varchar(15) NOT NULL,
  `CAPACITY` int(11) NOT NULL,
  PRIMARY KEY (`MODEL`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airplane_type`
--

LOCK TABLES `airplane_type` WRITE;
/*!40000 ALTER TABLE `airplane_type` DISABLE KEYS */;
INSERT INTO `airplane_type` VALUES ('Boeing 747','PlaneFactory',350),('JumboJet','PlaneMakerz',450);
/*!40000 ALTER TABLE `airplane_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `airport`
--

DROP TABLE IF EXISTS `airport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `airport` (
  `CODE` varchar(3) NOT NULL,
  `NAME` varchar(30) NOT NULL,
  `COORDINATES` varchar(15) DEFAULT NULL,
  `CITY_ID` varchar(3) NOT NULL,
  PRIMARY KEY (`CODE`),
  KEY `CITY_ID` (`CITY_ID`),
  CONSTRAINT `airport_ibfk_1` FOREIGN KEY (`CITY_ID`) REFERENCES `city` (`CODE`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airport`
--

LOCK TABLES `airport` WRITE;
/*!40000 ALTER TABLE `airport` DISABLE KEYS */;
INSERT INTO `airport` VALUES ('AMB','Aeropuerto Arturo M. Benitez','-28.54,-25.65','STC'),('LX2','L.A. airport 2','-33.54,23.46','LA');
/*!40000 ALTER TABLE `airport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boarding_pass`
--

DROP TABLE IF EXISTS `boarding_pass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boarding_pass` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `FLIGHT_ID` int(10) unsigned NOT NULL,
  `TICKET_ID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FLIGHT_ID` (`FLIGHT_ID`),
  KEY `TICKET_ID` (`TICKET_ID`),
  CONSTRAINT `boarding_pass_ibfk_1` FOREIGN KEY (`FLIGHT_ID`) REFERENCES `flight` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `boarding_pass_ibfk_2` FOREIGN KEY (`TICKET_ID`) REFERENCES `ticket` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boarding_pass`
--

LOCK TABLES `boarding_pass` WRITE;
/*!40000 ALTER TABLE `boarding_pass` DISABLE KEYS */;
/*!40000 ALTER TABLE `boarding_pass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city` (
  `CODE` varchar(3) NOT NULL,
  `NAME` varchar(255) NOT NULL,
  `C_CODE` varchar(3) NOT NULL,
  PRIMARY KEY (`CODE`),
  KEY `C_CODE` (`C_CODE`),
  CONSTRAINT `city_ibfk_1` FOREIGN KEY (`C_CODE`) REFERENCES `country` (`CODE`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES ('LA','Los Angeles','US'),('PRS','Paris','FR'),('STC','Santiago','CL');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `CODE` varchar(3) NOT NULL,
  `NAME` varchar(255) NOT NULL,
  `MAIN_LANG` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES ('CL','Chile','Español'),('FR','France','French'),('US','United States','English');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flight`
--

DROP TABLE IF EXISTS `flight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flight` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `DEPARTURE_TIME` datetime NOT NULL,
  `ARRIVAL_TIME` datetime NOT NULL,
  `PLANE_ID` int(10) unsigned NOT NULL,
  `S_FLIGHT_ID` int(10) unsigned NOT NULL,
  `GATE_NAME` varchar(4) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `PLANE_ID` (`PLANE_ID`),
  KEY `S_FLIGHT_ID` (`S_FLIGHT_ID`),
  KEY `GATE_NAME` (`GATE_NAME`),
  CONSTRAINT `flight_ibfk_1` FOREIGN KEY (`PLANE_ID`) REFERENCES `airplane` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `flight_ibfk_2` FOREIGN KEY (`S_FLIGHT_ID`) REFERENCES `scheduled_flight` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `flight_ibfk_3` FOREIGN KEY (`GATE_NAME`) REFERENCES `gate` (`NAME`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flight`
--

LOCK TABLES `flight` WRITE;
/*!40000 ALTER TABLE `flight` DISABLE KEYS */;
/*!40000 ALTER TABLE `flight` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gate`
--

DROP TABLE IF EXISTS `gate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gate` (
  `NAME` varchar(4) NOT NULL,
  `STATUS` tinyint(1) NOT NULL,
  PRIMARY KEY (`NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gate`
--

LOCK TABLES `gate` WRITE;
/*!40000 ALTER TABLE `gate` DISABLE KEYS */;
INSERT INTO `gate` VALUES ('A23',1),('A25',0),('B34',0);
/*!40000 ALTER TABLE `gate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `luggage`
--

DROP TABLE IF EXISTS `luggage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `luggage` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `B_PASS_ID` int(10) unsigned NOT NULL,
  `WEIGHT` int(11) NOT NULL,
  `TYPE` tinyint(4) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `B_PASS_ID` (`B_PASS_ID`),
  CONSTRAINT `luggage_ibfk_1` FOREIGN KEY (`B_PASS_ID`) REFERENCES `boarding_pass` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `luggage`
--

LOCK TABLES `luggage` WRITE;
/*!40000 ALTER TABLE `luggage` DISABLE KEYS */;
/*!40000 ALTER TABLE `luggage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passenger`
--

DROP TABLE IF EXISTS `passenger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `passenger` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `PIN` varchar(14) DEFAULT NULL,
  `NAME` varchar(30) NOT NULL,
  `SEX` varchar(1) NOT NULL,
  `BIRTHDAY` date NOT NULL,
  `C_CODE` varchar(3) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `C_CODE` (`C_CODE`),
  CONSTRAINT `passenger_ibfk_1` FOREIGN KEY (`C_CODE`) REFERENCES `country` (`CODE`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passenger`
--

LOCK TABLES `passenger` WRITE;
/*!40000 ALTER TABLE `passenger` DISABLE KEYS */;
INSERT INTO `passenger` VALUES (3,'7.654.321-8','John Doe','M','1990-04-08','US');
/*!40000 ALTER TABLE `passenger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scheduled_flight`
--

DROP TABLE IF EXISTS `scheduled_flight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scheduled_flight` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `WEEK_DAYS` tinyint(4) NOT NULL,
  `ESTIMATED_DEPARTURE` time NOT NULL,
  `ESTIMATED_DURATION` time NOT NULL,
  `DESTINY_CODE` varchar(3) NOT NULL,
  `ORIGIN_CODE` varchar(3) NOT NULL,
  `AIRPLANE_T_MODEL` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `DESTINY_CODE` (`DESTINY_CODE`),
  KEY `ORIGIN_CODE` (`ORIGIN_CODE`),
  KEY `AIRPLANE_T_MODEL` (`AIRPLANE_T_MODEL`),
  CONSTRAINT `scheduled_flight_ibfk_1` FOREIGN KEY (`DESTINY_CODE`) REFERENCES `airport` (`CODE`) ON UPDATE CASCADE,
  CONSTRAINT `scheduled_flight_ibfk_2` FOREIGN KEY (`ORIGIN_CODE`) REFERENCES `airport` (`CODE`) ON UPDATE CASCADE,
  CONSTRAINT `scheduled_flight_ibfk_3` FOREIGN KEY (`AIRPLANE_T_MODEL`) REFERENCES `airplane_type` (`MODEL`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scheduled_flight`
--

LOCK TABLES `scheduled_flight` WRITE;
/*!40000 ALTER TABLE `scheduled_flight` DISABLE KEYS */;
/*!40000 ALTER TABLE `scheduled_flight` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `PASSENGER_ID` int(10) unsigned NOT NULL,
  `T_GROUP_ID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `PASSENGER_ID` (`PASSENGER_ID`),
  KEY `T_GROUP_ID` (`T_GROUP_ID`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`PASSENGER_ID`) REFERENCES `passenger` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`T_GROUP_ID`) REFERENCES `ticket_group` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_group`
--

DROP TABLE IF EXISTS `ticket_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket_group` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `S_FLIGHT_ID` int(10) unsigned NOT NULL,
  `TYPE` varchar(10) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `S_FLIGHT_ID` (`S_FLIGHT_ID`),
  CONSTRAINT `ticket_group_ibfk_1` FOREIGN KEY (`S_FLIGHT_ID`) REFERENCES `scheduled_flight` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_group`
--

LOCK TABLES `ticket_group` WRITE;
/*!40000 ALTER TABLE `ticket_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_group` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-05-15 18:35:53
