-- phpMyAdmin SQL Dump
-- version 4.0.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 28, 2014 at 06:00 PM
-- Server version: 5.5.33
-- PHP Version: 5.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `aeropuerto`
--

-- --------------------------------------------------------

--
-- Table structure for table `airline`
--

CREATE TABLE `airline` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `NAME` varchar(15) NOT NULL,
  `ACRONYM` varchar(3) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `airplane`
--

CREATE TABLE `airplane` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Identificador de avion',
  `YEAR` int(11) NOT NULL COMMENT 'Año del avion',
  `GAS_LEVEL` int(11) NOT NULL COMMENT 'Nivel de combustible',
  `PILOT` varchar(15) NOT NULL COMMENT 'Nombre del piloto',
  `CO-PILOT` varchar(15) NOT NULL COMMENT 'Nombre del copiloto',
  `AIRLINE_ID` int(11) NOT NULL COMMENT 'Id de aerlinea dueña',
  `T_MODEL` varchar(10) NOT NULL COMMENT 'Modelo',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `airplane_type`
--

CREATE TABLE `airplane_type` (
  `MODEL` varchar(10) NOT NULL,
  `MADE_BY` varchar(15) NOT NULL,
  `CAPACITY` int(11) NOT NULL,
  PRIMARY KEY (`MODEL`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `airport`
--

CREATE TABLE `airport` (
  `CODE` varchar(3) NOT NULL,
  `NAME` varchar(30) NOT NULL,
  `COORDINATES` int(11) NOT NULL,
  `CITY_ID` varchar(3) NOT NULL,
  PRIMARY KEY (`CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `boarding_pass`
--

CREATE TABLE `boarding_pass` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `FLIGHT_ID` int(11) NOT NULL,
  `TICKET_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `CODE` varchar(3) NOT NULL,
  `NAME` varchar(255) NOT NULL,
  `C_CODE` varchar(3) NOT NULL,
  PRIMARY KEY (`CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `CODE` varchar(3) NOT NULL,
  `NAME` varchar(255) NOT NULL,
  `MAIN_LANG` varchar(10) NOT NULL,
  PRIMARY KEY (`CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `flight`
--

CREATE TABLE `flight` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `DEPARTURE_TIME` datetime NOT NULL,
  `ARRIVAL_TIME` datetime NOT NULL,
  `PLANE_ID` int(11) NOT NULL,
  `S_FLIGHT_ID` int(11) NOT NULL,
  `GATE_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `gate`
--

CREATE TABLE `gate` (
  `NAME` varchar(4) NOT NULL,
  `STATUS` tinyint(1) NOT NULL,
  PRIMARY KEY (`NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `luggage`
--

CREATE TABLE `luggage` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `TICKET_ID` int(11) NOT NULL,
  `WEIGHT` int(11) NOT NULL,
  `TYPE` tinyint(4) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `passage`
--

CREATE TABLE `passage` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `S_FLIGHT_ID` int(11) NOT NULL,
  `PASSENGER_ID` int(11) NOT NULL,
  `TYPE` varchar(10) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `passenger`
--

CREATE TABLE `passenger` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `PIN` int(11) NOT NULL,
  `NAME` varchar(30) NOT NULL,
  `SEX` varchar(1) NOT NULL,
  `BIRTHDAY` datetime NOT NULL,
  `C_CODE` varchar(3) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `scheduled_flight`
--

CREATE TABLE `scheduled_flight` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `WEEK_DAYS` tinyint(4) NOT NULL,
  `ESTIMATED_DEPARTURE` time NOT NULL,
  `ESTIMATED_DURATION` time NOT NULL,
  `DESTINY_CODE` varchar(3) NOT NULL,
  `ORIGIN_CODE` varchar(3) NOT NULL,
  `AIRPLANE_T_ID` varchar(10) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `PASSENGER_ID` int(11) NOT NULL,
  `PASSAGE_ID` int(11) NOT NULL,
  `LUGGAGE_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
