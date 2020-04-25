-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-04-2020 a las 00:54:44
-- Versión del servidor: 10.1.31-MariaDB
-- Versión de PHP: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `horizontal`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aptos`
--

CREATE TABLE `aptos` (
  `id` int(11) NOT NULL,
  `nomenclatura` varchar(45) NOT NULL,
  `id_unidad` int(10) UNSIGNED NOT NULL,
  `id_bloque` int(10) UNSIGNED NOT NULL,
  `id_tipo_apto` int(11) UNSIGNED NOT NULL,
  `id_propietario` bigint(20) UNSIGNED NOT NULL,
  `id_arrendatario` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `aptos`
--

INSERT INTO `aptos` (`id`, `nomenclatura`, `id_unidad`, `id_bloque`, `id_tipo_apto`, `id_propietario`, `id_arrendatario`) VALUES
(1, '502 Saman', 3, 5, 3, 7, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bloques`
--

CREATE TABLE `bloques` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `id_unidad` int(10) UNSIGNED NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `bloques`
--

INSERT INTO `bloques` (`id`, `nombre`, `id_unidad`, `updated_at`, `created_at`) VALUES
(2, 'A', 2, '2019-08-19 20:35:33', '2019-08-19 20:35:33'),
(3, 'B', 2, '2019-08-19 20:35:39', '2019-08-19 20:35:39'),
(4, 'C', 2, '2019-08-19 20:35:47', '2019-08-19 20:35:47'),
(5, 'Saman', 3, '2019-08-19 20:36:14', '2019-08-19 20:36:14'),
(6, 'Guayacan', 3, '2019-08-19 20:36:29', '2019-08-19 20:36:29'),
(7, 'Nogal', 3, '2019-08-19 20:36:37', '2019-08-19 20:36:37'),
(8, 'Interior 1', 4, '2019-08-20 01:39:34', '2019-08-20 01:39:34'),
(9, 'Interior 2', 4, '2019-08-20 01:40:04', '2019-08-20 01:40:04'),
(10, 'Interior 3', 4, '2019-08-20 01:40:15', '2019-08-20 01:40:15'),
(11, 'D', 2, '2019-08-21 01:30:02', '2019-08-21 01:30:02'),
(14, 'E1', 2, '2019-08-23 19:54:34', '2019-08-23 19:47:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_aptos`
--

CREATE TABLE `tipo_aptos` (
  `id` int(11) NOT NULL,
  `tipo_apto` varchar(45) NOT NULL,
  `cobro` int(11) NOT NULL,
  `vigencia` int(11) NOT NULL,
  `metros` int(4) NOT NULL,
  `id_unidad` int(11) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_aptos`
--

INSERT INTO `tipo_aptos` (`id`, `tipo_apto`, `cobro`, `vigencia`, `metros`, `id_unidad`, `created_at`, `updated_at`) VALUES
(1, '78m', 160000, 30, 78, 3, '2019-09-07 22:59:43', '2019-09-08 03:59:43'),
(2, '82M', 277000, 60, 82, 2, '2019-09-07 22:46:26', '2019-09-06 08:05:00'),
(3, '80m', 180000, 30, 80, 3, '2019-09-08 04:00:31', '2019-09-08 04:00:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuarios`
--

CREATE TABLE `tipo_usuarios` (
  `id` int(10) UNSIGNED NOT NULL,
  `tipo_usuarios` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_usuarios`
--

INSERT INTO `tipo_usuarios` (`id`, `tipo_usuarios`) VALUES
(1, 'admin'),
(2, 'superadmin'),
(3, 'propietario'),
(4, 'arrendatario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidades`
--

CREATE TABLE `unidades` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `id_admin` bigint(20) UNSIGNED NOT NULL,
  `active` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `unidades`
--

INSERT INTO `unidades` (`id`, `nombre`, `direccion`, `telefono`, `id_admin`, `active`, `created_at`, `updated_at`) VALUES
(2, 'Guadalupe Real', 'cra 52A #1A-22', '322222222', 3, 1, '2019-08-18 22:20:14', '2019-08-18 22:20:14'),
(3, 'Bosques de Cañaveralejo', 'Calle 1 #52-52', '333444555', 3, 1, '2019-08-18 22:20:57', '2019-08-18 22:20:57'),
(4, 'Guadalajara', 'cll13 #15-55', '333555777', 5, 1, '2019-08-19 20:38:53', '2019-08-20 01:38:53'),
(5, 'Unidad Santiago de Cali', 'cll 5 #45-20', '2223334445', 3, 1, '2019-08-23 19:04:50', '2019-08-23 19:04:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dni` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL,
  `tipo_usuario` int(10) UNSIGNED NOT NULL,
  `id_admin` bigint(20) UNSIGNED DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `last_name`, `email`, `dni`, `telefono`, `email_verified_at`, `password`, `active`, `tipo_usuario`, `id_admin`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Santiago', 'Lopera Montoya', 'santiagoloperam@gmail.com', '123456', '300300300', NULL, '$2y$10$e242xA5eSr6mXH0R6lRa0.8HEpTMBaANv9pVw4NiPXoELwyvYRHDa', 1, 2, NULL, 'jk4TdTFxc8DZAxMf8AJPM4Yqpk4sWhgHhliGJS9e5iUltnc31xUpwmZpWNQR', '2019-08-01 00:41:57', '2019-08-14 10:18:31'),
(3, 'Edward', 'Gordillo', 'edmadx25@gmail.com', '6666666', '312312312', NULL, '$2y$10$wrrpa56T6PhRvWZGcU3sAO6KwWp0pn/TBe2CTY5nMjqdkuxZSaCt2', 1, 1, NULL, NULL, '2019-08-07 06:05:15', '2019-08-12 22:35:48'),
(5, 'Walter', 'Paz', 'walter.paz.00@gmail.com', '444555666', '322322322', NULL, '$2y$10$d1hrUHQaR7BsBTAK6vlPGOOxzblV5jmualVl9TO1oVlS1j/VCa7C2', 1, 1, NULL, NULL, '2019-08-08 04:09:01', '2019-08-20 01:21:10'),
(6, 'Carlos', 'Lopez', 'carlos@gmail.com', '123456', '3456688', NULL, '$2y$10$w5QxOd0pAQVfrNTRlq3EseUwGtpvmWNca87L5QjiuMnYX6figPue2', 1, 3, 3, NULL, NULL, '2019-09-07 02:41:21'),
(7, 'Rulos', 'Paz', 'rulospaz@gmail.com', '4567899', '4567899', NULL, '$2y$10$0ndjGhOuJ.AmlxRaHA8viO8.JrtXFN35gYyUCB6n14.oIlww1e3fO', 1, 4, 3, NULL, '2019-09-07 02:10:23', '2019-09-08 05:27:53');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aptos`
--
ALTER TABLE `aptos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_unidad` (`id_unidad`),
  ADD KEY `id_bloque` (`id_bloque`),
  ADD KEY `id_tipo_apto` (`id_tipo_apto`),
  ADD KEY `id_propietario` (`id_propietario`),
  ADD KEY `id_arrendatario` (`id_arrendatario`);

--
-- Indices de la tabla `bloques`
--
ALTER TABLE `bloques`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_unidad` (`id_unidad`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_aptos`
--
ALTER TABLE `tipo_aptos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_unidad` (`id_unidad`);

--
-- Indices de la tabla `tipo_usuarios`
--
ALTER TABLE `tipo_usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `unidades`
--
ALTER TABLE `unidades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_admin` (`id_admin`),
  ADD KEY `id_admin_2` (`id_admin`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo_usuario` (`tipo_usuario`),
  ADD KEY `tipo_usuario_2` (`tipo_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aptos`
--
ALTER TABLE `aptos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `bloques`
--
ALTER TABLE `bloques`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_aptos`
--
ALTER TABLE `tipo_aptos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipo_usuarios`
--
ALTER TABLE `tipo_usuarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `unidades`
--
ALTER TABLE `unidades`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `aptos`
--
ALTER TABLE `aptos`
  ADD CONSTRAINT `aptos_ibfk_1` FOREIGN KEY (`id_unidad`) REFERENCES `unidades` (`id`),
  ADD CONSTRAINT `aptos_ibfk_2` FOREIGN KEY (`id_bloque`) REFERENCES `bloques` (`id`),
  ADD CONSTRAINT `aptos_ibfk_3` FOREIGN KEY (`id_propietario`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `aptos_ibfk_4` FOREIGN KEY (`id_arrendatario`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `bloques`
--
ALTER TABLE `bloques`
  ADD CONSTRAINT `bloques_ibfk_1` FOREIGN KEY (`id_unidad`) REFERENCES `unidades` (`id`);

--
-- Filtros para la tabla `tipo_aptos`
--
ALTER TABLE `tipo_aptos`
  ADD CONSTRAINT `tipo_aptos_ibfk_1` FOREIGN KEY (`id_unidad`) REFERENCES `unidades` (`id`);

--
-- Filtros para la tabla `unidades`
--
ALTER TABLE `unidades`
  ADD CONSTRAINT `unidades_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`tipo_usuario`) REFERENCES `tipo_usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
