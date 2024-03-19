-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 19/03/2024 às 05:01
-- Versão do servidor: 8.2.0
-- Versão do PHP: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `infinitybrasil`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `cadastro`
--

DROP TABLE IF EXISTS `cadastro`;
CREATE TABLE IF NOT EXISTS `cadastro` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NomeCompleto` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `CPF` char(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `DataNascimento` date DEFAULT NULL,
  `NumeroCNH` varchar(20) DEFAULT NULL,
  `LocalExpedicaoCNH` varchar(20) DEFAULT NULL,
  `Endereco` varchar(150) DEFAULT NULL,
  `Complemento` varchar(50) DEFAULT NULL,
  `CEP` char(8) DEFAULT NULL,
  `Genero` enum('Masculino','Feminino','Outro') DEFAULT NULL,
  `TipoVeiculo` enum('Caminhao','Carreta','Furgao','') DEFAULT NULL,
  `PlacaVeiculo` varchar(10) DEFAULT NULL,
  `MarcaVeiculo` varchar(30) DEFAULT NULL,
  `ModeloVeiculo` varchar(30) DEFAULT NULL,
  `AnoVeiculo` int DEFAULT NULL,
  `Senha` varchar(255) NOT NULL,
  `SuperUser` tinyint(1) DEFAULT '0',
  `confSENHA` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `cargas`
--

DROP TABLE IF EXISTS `cargas`;
CREATE TABLE IF NOT EXISTS `cargas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `peso` int NOT NULL,
  `valor` int NOT NULL,
  `distancia_km` int NOT NULL,
  `descricao` text,
  `status` enum('aguardando','Entregue','Aceita') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `distancia` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NomeCompleto` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `CPF` varchar(11) NOT NULL,
  `DataNascimento` date NOT NULL,
  `NumeroCNH` varchar(20) DEFAULT NULL,
  `LocalExpedicaoCNH` varchar(255) DEFAULT NULL,
  `Endereco` varchar(255) NOT NULL,
  `Complemento` varchar(100) DEFAULT NULL,
  `CEP` varchar(9) DEFAULT NULL,
  `Genero` enum('Masculino','Feminino','Outro') NOT NULL,
  `Senha` varchar(255) NOT NULL,
  `SuperUser` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `veiculos`
--

DROP TABLE IF EXISTS `veiculos`;
CREATE TABLE IF NOT EXISTS `veiculos` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `TipoVeiculo` varchar(50) NOT NULL,
  `PlacaVeiculo` varchar(10) NOT NULL,
  `MarcaVeiculo` varchar(50) NOT NULL,
  `ModeloVeiculo` varchar(50) NOT NULL,
  `AnoVeiculo` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `UserID` (`UserID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
