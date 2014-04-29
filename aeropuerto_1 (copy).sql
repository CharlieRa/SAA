-- phpMyAdmin SQL Dump
-- version 4.0.6deb1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 28-04-2014 a las 21:56:30
-- Versión del servidor: 5.5.37-0ubuntu0.13.10.1
-- Versión de PHP: 5.5.3-1ubuntu2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `aeropuerto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aerolinea`
--

CREATE TABLE IF NOT EXISTS `aerolinea` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Volcado de datos para la tabla `aerolinea`
--

INSERT INTO `aerolinea` (`id`, `nombre`) VALUES
(1, 'lanchile'),
(2, 'kolok'),
(3, 'tan'),
(4, 'america'),
(5, 'hola'),
(6, 'sdsds'),
(7, 'sdasdasd'),
(8, 'fefeewfewf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aeropuerto`
--

CREATE TABLE IF NOT EXISTS `aeropuerto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(3) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `id_ciudad` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_ciudad` (`id_ciudad`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `aeropuerto`
--

INSERT INTO `aeropuerto` (`id`, `codigo`, `nombre`, `id_ciudad`) VALUES
(1, 'scl', 'aeropuerto juanito p', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avion`
--

CREATE TABLE IF NOT EXISTS `avion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gasolina` int(11) NOT NULL,
  `piloto` varchar(15) NOT NULL,
  `año` int(11) NOT NULL,
  `id_aerolinea` int(11) NOT NULL,
  `id_tipo_avion` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_aerolinea` (`id_aerolinea`),
  KEY `id_tipo_avion` (`id_tipo_avion`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Volcado de datos para la tabla `avion`
--

INSERT INTO `avion` (`id`, `gasolina`, `piloto`, `año`, `id_aerolinea`, `id_tipo_avion`) VALUES
(2, 95, 'carlos perez', 2014, 1, 1),
(3, 95, '95', 2014, 1, 1),
(4, 95, '95', 2014, 1, 1),
(5, 95, '95', 2014, 1, 1),
(6, 95, 'juanito pepe', 2012, 1, 1),
(7, 95, 'pepito', 2005, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `boarding_pass`
--

CREATE TABLE IF NOT EXISTS `boarding_pass` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_vuelo` int(11) NOT NULL,
  `id_pasaje` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pasaje` (`id_pasaje`),
  KEY `id_vuelo` (`id_vuelo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `boarding_pass`
--

INSERT INTO `boarding_pass` (`id`, `id_vuelo`, `id_pasaje`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudad`
--

CREATE TABLE IF NOT EXISTS `ciudad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(3) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `id_pais` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `ciudad`
--

INSERT INTO `ciudad` (`id`, `codigo`, `nombre`, `id_pais`) VALUES
(1, 'stg', 'santiago', 1),
(2, 'cgt', 'chabdj', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gate`
--

CREATE TABLE IF NOT EXISTS `gate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `gate`
--

INSERT INTO `gate` (`id`, `estado`) VALUES
(1, 1),
(2, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pais`
--

CREATE TABLE IF NOT EXISTS `pais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(3) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `pais`
--

INSERT INTO `pais` (`id`, `codigo`, `nombre`) VALUES
(1, 'cl', 'chile');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasaje`
--

CREATE TABLE IF NOT EXISTS `pasaje` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_programa_vuelo` int(11) NOT NULL,
  `id_pasajero` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_programa_vuelo` (`id_programa_vuelo`),
  KEY `id_pasajero` (`id_pasajero`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `pasaje`
--

INSERT INTO `pasaje` (`id`, `id_programa_vuelo`, `id_pasajero`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasajero`
--

CREATE TABLE IF NOT EXISTS `pasajero` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `edad` int(11) NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `pin` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `pasajero`
--

INSERT INTO `pasajero` (`id`, `nombre`, `edad`, `sexo`, `pin`) VALUES
(1, 'ricardo lagos', 52, 'm', '1256');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programa_vuelos`
--

CREATE TABLE IF NOT EXISTS `programa_vuelos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` varchar(20) NOT NULL,
  `hora` varchar(20) NOT NULL,
  `id_destino` int(11) NOT NULL,
  `id_salida` int(11) NOT NULL,
  `id_tipo_avion` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_destino` (`id_destino`),
  KEY `id_salida` (`id_salida`),
  KEY `id_tipo_avion` (`id_tipo_avion`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `programa_vuelos`
--

INSERT INTO `programa_vuelos` (`id`, `fecha`, `hora`, `id_destino`, `id_salida`, `id_tipo_avion`) VALUES
(1, '4/09/2014', '12:00 am', 1, 1, 1),
(2, '3/09/2014', '12:00 pm', 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_avion`
--

CREATE TABLE IF NOT EXISTS `tipo_avion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `modelo` varchar(15) NOT NULL,
  `marca` varchar(255) NOT NULL,
  `max_pasajero` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `tipo_avion`
--

INSERT INTO `tipo_avion` (`id`, `modelo`, `marca`, `max_pasajero`) VALUES
(1, 'A340-600', 'Airbus', 250);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vuelo`
--

CREATE TABLE IF NOT EXISTS `vuelo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` varchar(20) NOT NULL,
  `hora` time NOT NULL,
  `id_avion` int(11) NOT NULL,
  `id_programa_vuelo` int(11) NOT NULL,
  `id_gate` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_avion` (`id_avion`),
  KEY `id_programa_vuelo` (`id_programa_vuelo`),
  KEY `id_gate` (`id_gate`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `vuelo`
--

INSERT INTO `vuelo` (`id`, `fecha`, `hora`, `id_avion`, `id_programa_vuelo`, `id_gate`) VALUES
(1, '04/09/2014', '12:00:00', 2, 1, 1);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `aeropuerto`
--
ALTER TABLE `aeropuerto`
  ADD CONSTRAINT `aeropuerto_ibfk_1` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad` (`id`);

--
-- Filtros para la tabla `avion`
--
ALTER TABLE `avion`
  ADD CONSTRAINT `avion_ibfk_1` FOREIGN KEY (`id_aerolinea`) REFERENCES `aerolinea` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `avion_ibfk_2` FOREIGN KEY (`id_tipo_avion`) REFERENCES `tipo_avion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `boarding_pass`
--
ALTER TABLE `boarding_pass`
  ADD CONSTRAINT `boarding_pass_ibfk_1` FOREIGN KEY (`id_vuelo`) REFERENCES `vuelo` (`id`),
  ADD CONSTRAINT `boarding_pass_ibfk_2` FOREIGN KEY (`id_pasaje`) REFERENCES `pasaje` (`id`);

--
-- Filtros para la tabla `pasaje`
--
ALTER TABLE `pasaje`
  ADD CONSTRAINT `pasaje_ibfk_1` FOREIGN KEY (`id_programa_vuelo`) REFERENCES `programa_vuelos` (`id`),
  ADD CONSTRAINT `pasaje_ibfk_2` FOREIGN KEY (`id_pasajero`) REFERENCES `pasajero` (`id`);

--
-- Filtros para la tabla `programa_vuelos`
--
ALTER TABLE `programa_vuelos`
  ADD CONSTRAINT `programa_vuelos_ibfk_1` FOREIGN KEY (`id_destino`) REFERENCES `aerolinea` (`id`),
  ADD CONSTRAINT `programa_vuelos_ibfk_2` FOREIGN KEY (`id_salida`) REFERENCES `aerolinea` (`id`),
  ADD CONSTRAINT `programa_vuelos_ibfk_3` FOREIGN KEY (`id_tipo_avion`) REFERENCES `tipo_avion` (`id`);

--
-- Filtros para la tabla `vuelo`
--
ALTER TABLE `vuelo`
  ADD CONSTRAINT `vuelo_ibfk_1` FOREIGN KEY (`id_avion`) REFERENCES `avion` (`id`),
  ADD CONSTRAINT `vuelo_ibfk_2` FOREIGN KEY (`id_programa_vuelo`) REFERENCES `programa_vuelos` (`id`),
  ADD CONSTRAINT `vuelo_ibfk_3` FOREIGN KEY (`id_gate`) REFERENCES `gate` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
