-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: soderia
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `barrio`
--

DROP TABLE IF EXISTS `barrio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barrio` (
  `id_barrio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `id_localidad` int NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_barrio`),
  KEY `fk_id_localidad` (`id_localidad`),
  CONSTRAINT `fk_id_localidad` FOREIGN KEY (`id_localidad`) REFERENCES `localidad` (`id_localidad`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barrio`
--

LOCK TABLES `barrio` WRITE;
/*!40000 ALTER TABLE `barrio` DISABLE KEYS */;
INSERT INTO `barrio` VALUES (14,'Lamadrid',1,NULL),(15,'Güemes',1,NULL),(16,'Mariano Moreno',1,NULL),(17,'Malvinas Argentinas',1,NULL),(18,'San Martín',1,NULL),(19,'Palermo',1,NULL),(20,'San Justo',1,NULL),(21,'Bello Hotizonte',1,NULL),(22,'San Juan Bautista',1,NULL),(23,'Las Playas',1,NULL),(24,'Parque Norte',1,NULL),(25,'Almirante Brown',1,NULL),(26,'Los Olmos',1,NULL);
/*!40000 ALTER TABLE `barrio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `apellido` varchar(60) NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `calle` varchar(60) NOT NULL,
  `id_barrio` int NOT NULL,
  `id_localidad` int NOT NULL,
  `correo_electronico` varchar(60) DEFAULT NULL,
  `id_tipo_cliente` int NOT NULL,
  `id_tipo_documento` int NOT NULL,
  `numero_documento` int NOT NULL,
  `estado` int NOT NULL,
  `numero_dir` int DEFAULT NULL,
  `piso` int DEFAULT NULL,
  `departamento` varchar(5) DEFAULT NULL,
  `id_condicion` int DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `numero_documento` (`numero_documento`),
  KEY `fk_id_barrio` (`id_barrio`),
  KEY `fk_id_localidad_c` (`id_localidad`),
  KEY `fk_id_tipo_cliente` (`id_tipo_cliente`),
  KEY `fk_id_tipo_documento` (`id_tipo_documento`),
  KEY `fk_id_condicion` (`id_condicion`),
  CONSTRAINT `fk_id_barrio` FOREIGN KEY (`id_barrio`) REFERENCES `barrio` (`id_barrio`) ON DELETE RESTRICT,
  CONSTRAINT `fk_id_condicion` FOREIGN KEY (`id_condicion`) REFERENCES `condicioniva` (`id_condicion`) ON DELETE CASCADE,
  CONSTRAINT `fk_id_localidad_c` FOREIGN KEY (`id_localidad`) REFERENCES `localidad` (`id_localidad`) ON DELETE RESTRICT,
  CONSTRAINT `fk_id_tipo_cliente` FOREIGN KEY (`id_tipo_cliente`) REFERENCES `tipocliente` (`id_tipo_cliente`) ON DELETE RESTRICT,
  CONSTRAINT `fk_id_tipo_documento` FOREIGN KEY (`id_tipo_documento`) REFERENCES `tipodocumento` (`id_tipo_documento`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (2,'Lucia','Pigliacampi','3534186520','Dario Ramonda',14,1,NULL,1,1,38021921,1,1860,NULL,NULL,NULL),(3,'Franco','Serra','3534206286','Corrientes',17,1,NULL,1,1,35638284,1,3076,NULL,NULL,NULL),(4,'Hugo','Pigliacampi','3534147796','Mendoza',17,1,NULL,1,1,41411191,1,644,1,'B',NULL),(5,'Rramon','Molina 2','68','Dario Ramonda',25,1,'',1,1,14665938,0,1860,NULL,'',1),(8,'Elias','Pigliacampi','3534614233','Mendoza',25,1,'',1,1,43604611,1,642,NULL,'',1),(10,'Hugo','Pigliacampi','3534114664','Dario Ramonda',14,1,'',1,1,13136121,1,1860,NULL,'',1),(11,'Paulina','Pigliacampi','35348756','Catamarca',15,1,'',1,1,39875909,1,385,NULL,'',1),(14,'mnb mn','bnvcbn','5454','sdfxdf',25,1,'',1,1,38021922,1,54,NULL,'',1),(18,'Lucía Antonella','Pigliacampi','03534186520','Mendoza',25,1,'lucia.pigliacampi90@gmail.com',1,1,43604610,1,642,NULL,'',1),(19,'Franco Gaston','Serra','03534186520','Dario Ramonda',25,1,'',1,1,35638287,1,1860,NULL,'',1),(20,'Adriana','Molina','123213','Dario Ramonda',25,1,'',1,1,14256256,0,1860,NULL,'',1);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientexrecorrido`
--

DROP TABLE IF EXISTS `clientexrecorrido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientexrecorrido` (
  `id_cliente` int NOT NULL,
  `id_recorrido` int NOT NULL,
  `orden` int NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`,`id_recorrido`),
  KEY `fk_id_recorrido` (`id_recorrido`),
  CONSTRAINT `fk_id_cliente_c` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE,
  CONSTRAINT `fk_id_recorrido` FOREIGN KEY (`id_recorrido`) REFERENCES `recorrido` (`id_recorrido`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientexrecorrido`
--

LOCK TABLES `clientexrecorrido` WRITE;
/*!40000 ALTER TABLE `clientexrecorrido` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientexrecorrido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cobro`
--

DROP TABLE IF EXISTS `cobro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cobro` (
  `id_cobro` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `id_cliente` int NOT NULL,
  `id_pedido` int DEFAULT NULL,
  `id_medio_pago` int NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  `monto` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id_cobro`),
  KEY `fk_id_cliente_co` (`id_cliente`),
  KEY `fk_id_pedido_co` (`id_pedido`),
  KEY `fk_id_medio_pago` (`id_medio_pago`),
  CONSTRAINT `fk_id_cliente_co` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE,
  CONSTRAINT `fk_id_medio_pago` FOREIGN KEY (`id_medio_pago`) REFERENCES `mediopago` (`id_medio_pago`) ON DELETE CASCADE,
  CONSTRAINT `fk_id_pedido_co` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cobro`
--

LOCK TABLES `cobro` WRITE;
/*!40000 ALTER TABLE `cobro` DISABLE KEYS */;
/*!40000 ALTER TABLE `cobro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `condicioniva`
--

DROP TABLE IF EXISTS `condicioniva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `condicioniva` (
  `id_condicion` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_condicion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `condicioniva`
--

LOCK TABLES `condicioniva` WRITE;
/*!40000 ALTER TABLE `condicioniva` DISABLE KEYS */;
INSERT INTO `condicioniva` VALUES (1,'Consumidor final',NULL),(2,'Exento',NULL),(3,'Responsable Inscripto',NULL),(4,'Monotributo',NULL),(5,'Otro',NULL);
/*!40000 ALTER TABLE `condicioniva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuentacorriente`
--

DROP TABLE IF EXISTS `cuentacorriente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuentacorriente` (
  `id_cuenta_corriente` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `numero_cuenta` int NOT NULL,
  `id_pedido` int DEFAULT NULL,
  `id_cobro` int DEFAULT NULL,
  `id_cliente` int NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_cuenta_corriente`),
  UNIQUE KEY `numero_cuenta` (`numero_cuenta`),
  KEY `fk_id_pedido_cu` (`id_pedido`),
  KEY `fk_id_cobro_cu` (`id_cobro`),
  KEY `fk_id_cliente_cu` (`id_cliente`),
  CONSTRAINT `fk_id_cliente_cu` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE RESTRICT,
  CONSTRAINT `fk_id_cobro_cu` FOREIGN KEY (`id_cobro`) REFERENCES `cobro` (`id_cobro`) ON DELETE RESTRICT,
  CONSTRAINT `fk_id_pedido_cu` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuentacorriente`
--

LOCK TABLES `cuentacorriente` WRITE;
/*!40000 ALTER TABLE `cuentacorriente` DISABLE KEYS */;
/*!40000 ALTER TABLE `cuentacorriente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `id_empleado` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `apellido` varchar(60) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `direccion` varchar(60) NOT NULL,
  `id_localidad` int NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `id_rol` int NOT NULL,
  `id_tipo_documento` int NOT NULL,
  `numero_documento` int NOT NULL,
  `fecha_alta` datetime NOT NULL,
  `fecha_baja` datetime DEFAULT NULL,
  `id_usuario` int NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_empleado`),
  KEY `fk_id_rol_e` (`id_rol`),
  KEY `fk_id_localidad_e` (`id_localidad`),
  KEY `fk_id_tipo_documento_e` (`id_tipo_documento`),
  KEY `fk_id_usuario_e` (`id_usuario`),
  CONSTRAINT `fk_id_localidad_e` FOREIGN KEY (`id_localidad`) REFERENCES `localidad` (`id_localidad`) ON DELETE RESTRICT,
  CONSTRAINT `fk_id_rol_e` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE RESTRICT,
  CONSTRAINT `fk_id_tipo_documento_e` FOREIGN KEY (`id_tipo_documento`) REFERENCES `tipodocumento` (`id_tipo_documento`) ON DELETE RESTRICT,
  CONSTRAINT `fk_id_usuario_e` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listaprecio`
--

DROP TABLE IF EXISTS `listaprecio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listaprecio` (
  `id_lista` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_lista`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listaprecio`
--

LOCK TABLES `listaprecio` WRITE;
/*!40000 ALTER TABLE `listaprecio` DISABLE KEYS */;
INSERT INTO `listaprecio` VALUES (1,'Mayorista','2024-09-06 18:45:00',NULL),(2,'Minorista','2024-09-06 18:45:00',NULL);
/*!40000 ALTER TABLE `listaprecio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localidad`
--

DROP TABLE IF EXISTS `localidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localidad` (
  `id_localidad` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `codigo_postal` int DEFAULT NULL,
  PRIMARY KEY (`id_localidad`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localidad`
--

LOCK TABLES `localidad` WRITE;
/*!40000 ALTER TABLE `localidad` DISABLE KEYS */;
INSERT INTO `localidad` VALUES (1,'Villa María',5900),(2,'Villa Nueva',5903),(3,'Tío Pujio',5936),(4,'Arroyo Cabral',5917);
/*!40000 ALTER TABLE `localidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mediopago`
--

DROP TABLE IF EXISTS `mediopago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mediopago` (
  `id_medio_pago` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_medio_pago`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mediopago`
--

LOCK TABLES `mediopago` WRITE;
/*!40000 ALTER TABLE `mediopago` DISABLE KEYS */;
INSERT INTO `mediopago` VALUES (1,'Efectivo',NULL),(2,'Transferencia',NULL),(3,'Mercado Pago',NULL),(4,'Cuenta Corriente',NULL);
/*!40000 ALTER TABLE `mediopago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `id_cliente` int NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  `fecha_estimada_entrega` date DEFAULT NULL,
  `fecha_real_entrega` date DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `dia_entrega` int DEFAULT NULL,
  `subtotal` decimal(15,2) DEFAULT NULL,
  `iva` decimal(15,2) DEFAULT NULL,
  `estado_pedido` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_pedido`),
  KEY `fk_id_cliente` (`id_cliente`),
  CONSTRAINT `fk_id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,'2024-10-01 00:00:00',2,'1','2024-10-02',NULL,1505.50,0,1244.22,261.28,5),(5,'2024-10-15 09:19:27',5,'1','2024-10-24',NULL,847.00,0,700.00,147.00,4),(6,'2024-10-15 09:24:49',8,'1','2024-10-18',NULL,1573.00,0,1300.00,273.00,3),(7,'2024-10-15 09:25:40',10,'1','2024-10-26',NULL,907.50,0,750.00,157.50,2),(8,'2024-10-15 09:27:40',3,'0','2024-10-30',NULL,3085.50,0,2550.00,535.50,2),(9,'2024-10-15 23:26:00',8,'1','2024-10-17',NULL,2722.50,0,2250.00,472.50,1),(10,'2024-11-13 16:31:06',11,'1','2024-11-16',NULL,2783.00,NULL,2300.00,483.00,1);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `volumen` varchar(20) DEFAULT NULL,
  `stock` int NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  `id_tipo_producto` int NOT NULL,
  `importe_unitario` decimal(12,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Soda','500ml',5,'1',1,350.00),(2,'Agua Mineral','500ml',20,'1',2,250.00),(3,'Agua','1000ml',10,'1',2,400.00);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productoxlistaprecio`
--

DROP TABLE IF EXISTS `productoxlistaprecio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productoxlistaprecio` (
  `id_producto` int NOT NULL,
  `id_lista_precio` int NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_producto`,`id_lista_precio`),
  KEY `fk_id_lista_precio_p` (`id_lista_precio`),
  CONSTRAINT `fk_id_lista_precio_p` FOREIGN KEY (`id_lista_precio`) REFERENCES `listaprecio` (`id_lista`) ON DELETE CASCADE,
  CONSTRAINT `fk_id_producto_p` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productoxlistaprecio`
--

LOCK TABLES `productoxlistaprecio` WRITE;
/*!40000 ALTER TABLE `productoxlistaprecio` DISABLE KEYS */;
/*!40000 ALTER TABLE `productoxlistaprecio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productoxpedido`
--

DROP TABLE IF EXISTS `productoxpedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productoxpedido` (
  `id_producto` int NOT NULL,
  `id_pedido` int NOT NULL,
  `cantidad` int NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `precio_total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_producto`,`id_pedido`),
  KEY `fk_id_pedido` (`id_pedido`),
  CONSTRAINT `fk_id_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE CASCADE,
  CONSTRAINT `fk_id_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productoxpedido`
--

LOCK TABLES `productoxpedido` WRITE;
/*!40000 ALTER TABLE `productoxpedido` DISABLE KEYS */;
INSERT INTO `productoxpedido` VALUES (1,6,3,'1',350.00,1050.00),(1,8,3,'1',350.00,1050.00),(1,9,5,'1',350.00,1750.00),(1,10,3,'1',350.00,1050.00),(2,6,1,'1',250.00,250.00),(2,7,3,'1',250.00,750.00),(2,8,6,'1',250.00,1500.00),(2,9,2,'1',250.00,500.00),(2,10,5,'1',250.00,1250.00);
/*!40000 ALTER TABLE `productoxpedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recorrido`
--

DROP TABLE IF EXISTS `recorrido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recorrido` (
  `id_recorrido` int NOT NULL AUTO_INCREMENT,
  `dia_semana` varchar(9) NOT NULL,
  `id_barrio` int NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_recorrido`),
  KEY `fk_id_barrio_r` (`id_barrio`),
  CONSTRAINT `fk_id_barrio_r` FOREIGN KEY (`id_barrio`) REFERENCES `barrio` (`id_barrio`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recorrido`
--

LOCK TABLES `recorrido` WRITE;
/*!40000 ALTER TABLE `recorrido` DISABLE KEYS */;
/*!40000 ALTER TABLE `recorrido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Repartidor',NULL),(2,'Operario',NULL);
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seguro`
--

DROP TABLE IF EXISTS `seguro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seguro` (
  `id_seguro` int NOT NULL AUTO_INCREMENT,
  `aseguradora` varchar(60) NOT NULL,
  `valor_poliza` decimal(10,0) NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_seguro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguro`
--

LOCK TABLES `seguro` WRITE;
/*!40000 ALTER TABLE `seguro` DISABLE KEYS */;
/*!40000 ALTER TABLE `seguro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipocliente`
--

DROP TABLE IF EXISTS `tipocliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipocliente` (
  `id_tipo_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipocliente`
--

LOCK TABLES `tipocliente` WRITE;
/*!40000 ALTER TABLE `tipocliente` DISABLE KEYS */;
INSERT INTO `tipocliente` VALUES (1,'Minorista',NULL),(2,'Mayorista',NULL);
/*!40000 ALTER TABLE `tipocliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipodocumento`
--

DROP TABLE IF EXISTS `tipodocumento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipodocumento` (
  `id_tipo_documento` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_documento`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipodocumento`
--

LOCK TABLES `tipodocumento` WRITE;
/*!40000 ALTER TABLE `tipodocumento` DISABLE KEYS */;
INSERT INTO `tipodocumento` VALUES (1,'DNI',NULL),(2,'CUIL',NULL),(3,'CUIT',NULL),(4,'Pasaporte',NULL),(5,'Otro',NULL);
/*!40000 ALTER TABLE `tipodocumento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoproducto`
--

DROP TABLE IF EXISTS `tipoproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoproducto` (
  `id_tipo_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoproducto`
--

LOCK TABLES `tipoproducto` WRITE;
/*!40000 ALTER TABLE `tipoproducto` DISABLE KEYS */;
INSERT INTO `tipoproducto` VALUES (1,'Soda',NULL),(2,'Agua Envasada',NULL),(3,'Dispenser',NULL);
/*!40000 ALTER TABLE `tipoproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipovehiculo`
--

DROP TABLE IF EXISTS `tipovehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipovehiculo` (
  `id_tipo_vehiculo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_vehiculo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipovehiculo`
--

LOCK TABLES `tipovehiculo` WRITE;
/*!40000 ALTER TABLE `tipovehiculo` DISABLE KEYS */;
INSERT INTO `tipovehiculo` VALUES (1,'Automovil',NULL),(2,'Camioneta',NULL);
/*!40000 ALTER TABLE `tipovehiculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(60) NOT NULL,
  `clave` varchar(8) DEFAULT NULL,
  `fecha_alta` datetime DEFAULT NULL,
  `fecha_baja` datetime DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculo`
--

DROP TABLE IF EXISTS `vehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehiculo` (
  `id_vehiculo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `matricula` varchar(60) NOT NULL,
  `id_tipo_vehiculo` int NOT NULL,
  `id_seguro` int NOT NULL,
  `estado` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_vehiculo`),
  KEY `fk_id_tipo_vehiculo_v` (`id_tipo_vehiculo`),
  KEY `fk_id_seguro_v` (`id_seguro`),
  CONSTRAINT `fk_id_seguro_v` FOREIGN KEY (`id_seguro`) REFERENCES `seguro` (`id_seguro`) ON DELETE CASCADE,
  CONSTRAINT `fk_id_tipo_vehiculo_v` FOREIGN KEY (`id_tipo_vehiculo`) REFERENCES `tipovehiculo` (`id_tipo_vehiculo`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculo`
--

LOCK TABLES `vehiculo` WRITE;
/*!40000 ALTER TABLE `vehiculo` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehiculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculoxrecorrido`
--

DROP TABLE IF EXISTS `vehiculoxrecorrido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehiculoxrecorrido` (
  `id_recorrido` int NOT NULL,
  `id_vehiculo` int NOT NULL,
  `id_empleado` int NOT NULL,
  `fecha` datetime NOT NULL,
  `km_totales_estimados` decimal(10,0) DEFAULT NULL,
  `km_totales_reales` decimal(10,0) DEFAULT NULL,
  `estado` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_recorrido`,`id_vehiculo`,`id_empleado`),
  KEY `fk_id_vehiculo_ve` (`id_vehiculo`),
  KEY `fk_id_empleado_ve` (`id_empleado`),
  CONSTRAINT `fk_id_empleado_ve` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`) ON DELETE CASCADE,
  CONSTRAINT `fk_id_recorrido_ve` FOREIGN KEY (`id_recorrido`) REFERENCES `recorrido` (`id_recorrido`) ON DELETE CASCADE,
  CONSTRAINT `fk_id_vehiculo_ve` FOREIGN KEY (`id_vehiculo`) REFERENCES `vehiculo` (`id_vehiculo`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculoxrecorrido`
--

LOCK TABLES `vehiculoxrecorrido` WRITE;
/*!40000 ALTER TABLE `vehiculoxrecorrido` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehiculoxrecorrido` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-13 17:22:35
