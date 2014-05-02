# ************************************************************
# Sequel Pro SQL dump
# Version 4135
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: localhost (MySQL 5.5.34)
# Database: aeropuerto
# Generation Time: 2014-04-30 20:53:35 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table airline
# ------------------------------------------------------------

CREATE TABLE `airline` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `NAME` varchar(15) NOT NULL,
  `ACRONYM` varchar(3) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table airplane
# ------------------------------------------------------------

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
  CONSTRAINT `airplane_ibfk_2` FOREIGN KEY (`T_MODEL`) REFERENCES `airplane_type` (`MODEL`) ON UPDATE CASCADE,
  CONSTRAINT `airplane_ibfk_1` FOREIGN KEY (`AIRLINE_ID`) REFERENCES `airline` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table airplane_type
# ------------------------------------------------------------

CREATE TABLE `airplane_type` (
  `MODEL` varchar(10) NOT NULL,
  `MADE_BY` varchar(15) NOT NULL,
  `CAPACITY` int(11) NOT NULL,
  PRIMARY KEY (`MODEL`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table airport
# ------------------------------------------------------------

CREATE TABLE `airport` (
  `CODE` varchar(3) NOT NULL,
  `NAME` varchar(30) NOT NULL,
  `COORDINATES` int(11) NOT NULL,
  `CITY_ID` varchar(3) NOT NULL,
  PRIMARY KEY (`CODE`),
  KEY `CITY_ID` (`CITY_ID`),
  CONSTRAINT `airport_ibfk_1` FOREIGN KEY (`CITY_ID`) REFERENCES `city` (`CODE`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table boarding_pass
# ------------------------------------------------------------

CREATE TABLE `boarding_pass` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `FLIGHT_ID` int(10) unsigned NOT NULL,
  `TICKET_ID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FLIGHT_ID` (`FLIGHT_ID`),
  KEY `TICKET_ID` (`TICKET_ID`),
  CONSTRAINT `boarding_pass_ibfk_2` FOREIGN KEY (`TICKET_ID`) REFERENCES `ticket` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `boarding_pass_ibfk_1` FOREIGN KEY (`FLIGHT_ID`) REFERENCES `flight` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table city
# ------------------------------------------------------------

CREATE TABLE `city` (
  `CODE` varchar(3) NOT NULL,
  `NAME` varchar(255) NOT NULL,
  `C_CODE` varchar(3) NOT NULL,
  PRIMARY KEY (`CODE`),
  KEY `C_CODE` (`C_CODE`),
  CONSTRAINT `city_ibfk_1` FOREIGN KEY (`C_CODE`) REFERENCES `country` (`CODE`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table country
# ------------------------------------------------------------

CREATE TABLE `country` (
  `CODE` varchar(3) NOT NULL,
  `NAME` varchar(255) NOT NULL,
  `MAIN_LANG` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table flight
# ------------------------------------------------------------

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
  CONSTRAINT `flight_ibfk_3` FOREIGN KEY (`GATE_NAME`) REFERENCES `gate` (`NAME`) ON UPDATE CASCADE,
  CONSTRAINT `flight_ibfk_1` FOREIGN KEY (`PLANE_ID`) REFERENCES `airplane` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `flight_ibfk_2` FOREIGN KEY (`S_FLIGHT_ID`) REFERENCES `scheduled_flight` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table gate
# ------------------------------------------------------------

CREATE TABLE `gate` (
  `NAME` varchar(4) NOT NULL,
  `STATUS` tinyint(1) NOT NULL,
  PRIMARY KEY (`NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table luggage
# ------------------------------------------------------------

CREATE TABLE `luggage` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `B_PASS_ID` int(10) unsigned NOT NULL,
  `WEIGHT` int(11) NOT NULL,
  `TYPE` tinyint(4) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `B_PASS_ID` (`B_PASS_ID`),
  CONSTRAINT `luggage_ibfk_1` FOREIGN KEY (`B_PASS_ID`) REFERENCES `boarding_pass` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table ticket_group
# ------------------------------------------------------------

CREATE TABLE `ticket_group` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `S_FLIGHT_ID` int(10) unsigned NOT NULL,
  `TYPE` varchar(10) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `S_FLIGHT_ID` (`S_FLIGHT_ID`),
  CONSTRAINT `ticket_group_ibfk_1` FOREIGN KEY (`S_FLIGHT_ID`) REFERENCES `scheduled_flight` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table passenger
# ------------------------------------------------------------

CREATE TABLE `passenger` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `PIN` int(11) NOT NULL,
  `NAME` varchar(30) NOT NULL,
  `SEX` varchar(1) NOT NULL,
  `BIRTHDAY` date NOT NULL,
  `C_CODE` varchar(3) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `C_CODE` (`C_CODE`),
  CONSTRAINT `passenger_ibfk_1` FOREIGN KEY (`C_CODE`) REFERENCES `country` (`CODE`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table scheduled_flight
# ------------------------------------------------------------

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
  CONSTRAINT `scheduled_flight_ibfk_3` FOREIGN KEY (`AIRPLANE_T_MODEL`) REFERENCES `airplane_type` (`MODEL`) ON UPDATE CASCADE,
  CONSTRAINT `scheduled_flight_ibfk_1` FOREIGN KEY (`DESTINY_CODE`) REFERENCES `airport` (`CODE`) ON UPDATE CASCADE,
  CONSTRAINT `scheduled_flight_ibfk_2` FOREIGN KEY (`ORIGIN_CODE`) REFERENCES `airport` (`CODE`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table ticket
# ------------------------------------------------------------

CREATE TABLE `ticket` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `PASSENGER_ID` int(10) unsigned NOT NULL,
  `T_GROUP_ID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `PASSENGER_ID` (`PASSENGER_ID`),
  KEY `T_GROUP_ID` (`T_GROUP_ID`),
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`T_GROUP_ID`) REFERENCES `ticket_group` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`PASSENGER_ID`) REFERENCES `passenger` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
