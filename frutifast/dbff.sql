-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-08-2020 a las 09:05:15
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbff`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `items`
--

CREATE TABLE `items` (
  `item_id` int(11) UNSIGNED NOT NULL,
  `type_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` double(8,2) NOT NULL,
  `picture` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `items`
--

INSERT INTO `items` (`item_id`, `type_id`, `name`, `price`, `picture`) VALUES
(16, 1, 'Naranja', 25.00, '1597034833630.jpg'),
(17, 2, 'Zanahoria', 45.00, '1597034889486.jpg'),
(18, 1, 'Manzana', 250.00, '1597034916351.jpg'),
(19, 1, 'Mandarina', 25.00, '1597034950554.jpg'),
(20, 5, 'Haba', 50.00, '1597035045767.jpg'),
(21, 1, 'Platano', 30.00, '1597035137956.jpg'),
(22, 1, 'Pera', 50.00, '1597035202417.jpg'),
(23, 1, 'Sandia', 25.00, '1597035255700.jpg'),
(24, 1, 'Piña', 50.00, '1597035304956.jpg'),
(25, 1, 'Uva', 300.00, '1597035343724.jpg'),
(26, 1, 'Frutilla', 150.00, '1597035386818.jpg'),
(27, 2, 'Nabo', 100.00, '1597035420446.jpg'),
(28, 1, 'Papaya', 80.00, '1597035483243.jpg'),
(29, 5, 'Arbeja', 90.00, '1597035512959.jpg'),
(30, 1, 'Pacay', 140.00, '1597035560413.jpg'),
(31, 1, 'Coco', 80.00, '1597035576880.jpg'),
(32, 1, 'Mango', 70.00, '1597035640020.jpg'),
(33, 1, 'Durazno', 84.00, '1597035664684.jpg'),
(34, 2, 'Tomate', 210.00, '1597035701831.jpg'),
(35, 1, 'Uva roja', 255.00, '1597035753542.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `item_id` int(11) UNSIGNED NOT NULL,
  `address` varchar(80) NOT NULL,
  `quantity` int(11) NOT NULL,
  `state` char(1) NOT NULL,
  `date_sent` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_delivered` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchases`
--

CREATE TABLE `purchases` (
  `purchase_id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `item_id` int(11) UNSIGNED NOT NULL,
  `quantity` int(6) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `purchases`
--

INSERT INTO `purchases` (`purchase_id`, `user_id`, `item_id`, `quantity`, `fecha`) VALUES
(4, 17, 16, 100, '2020-08-10 01:05:01'),
(5, 17, 17, 40, '2020-08-10 01:05:21'),
(6, 17, 18, 100, '2020-08-10 01:05:37'),
(7, 17, 20, 20, '2020-08-10 01:05:51'),
(8, 17, 19, 40, '2020-08-10 01:06:37'),
(9, 17, 21, 45, '2020-08-10 01:06:56'),
(10, 17, 22, 30, '2020-08-10 01:07:17'),
(11, 17, 23, 40, '2020-08-10 01:07:33'),
(12, 17, 24, 35, '2020-08-10 01:07:45'),
(13, 17, 25, 60, '2020-08-10 01:08:03'),
(14, 17, 26, 90, '2020-08-10 01:08:24'),
(15, 17, 27, 10, '2020-08-10 01:08:36'),
(16, 17, 28, 25, '2020-08-10 01:08:50'),
(17, 17, 29, 6, '2020-08-10 01:09:19'),
(18, 17, 30, 15, '2020-08-10 01:09:35'),
(19, 17, 31, 22, '2020-08-10 01:10:08'),
(20, 17, 32, 11, '2020-08-10 01:10:20'),
(21, 17, 33, 60, '2020-08-10 01:10:34'),
(22, 17, 34, 25, '2020-08-10 01:11:31'),
(23, 17, 35, 34, '2020-08-10 01:11:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `sale_id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `warehouse_id` int(11) UNSIGNED NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sales`
--

INSERT INTO `sales` (`sale_id`, `user_id`, `warehouse_id`, `fecha`) VALUES
(4, 17, 1, '2020-08-10 01:13:37'),
(5, 17, 1, '2020-08-10 01:14:53'),
(6, 17, 1, '2020-08-10 01:15:07'),
(7, 17, 1, '2020-08-10 01:15:20'),
(8, 17, 1, '2020-08-10 01:15:46'),
(9, 17, 1, '2020-08-10 01:15:57'),
(10, 17, 1, '2020-08-10 01:16:11'),
(11, 17, 1, '2020-08-10 01:16:19'),
(12, 17, 1, '2020-08-10 01:16:52'),
(13, 17, 1, '2020-08-10 01:17:29'),
(14, 17, 1, '2020-08-10 01:17:55'),
(15, 17, 1, '2020-08-10 01:18:02'),
(16, 17, 1, '2020-08-10 01:18:30'),
(17, 17, 1, '2020-08-10 01:18:39'),
(18, 17, 1, '2020-08-10 01:18:50'),
(19, 17, 1, '2020-08-10 01:19:29'),
(20, 17, 1, '2020-08-10 01:19:39'),
(21, 17, 1, '2020-08-10 01:20:38'),
(22, 17, 1, '2020-08-10 01:20:55'),
(23, 17, 1, '2020-08-10 01:21:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales_detail`
--

CREATE TABLE `sales_detail` (
  `sale_id` int(11) UNSIGNED NOT NULL,
  `item_id` int(11) UNSIGNED NOT NULL,
  `quantity` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sales_detail`
--

INSERT INTO `sales_detail` (`sale_id`, `item_id`, `quantity`) VALUES
(4, 16, 4),
(5, 17, 5),
(6, 18, 8),
(7, 19, 5),
(8, 20, 4),
(9, 21, 4),
(10, 22, 4),
(11, 23, 4),
(12, 23, 1),
(13, 24, 15),
(14, 25, 2),
(15, 26, 6),
(16, 27, 6),
(17, 28, 9),
(18, 29, 4),
(19, 29, 9),
(20, 30, 11),
(21, 31, 8),
(22, 34, 5),
(23, 35, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('z_4wsIkYsFOUCgsOrk-tPsUwsCzNXtFa', 1597129336, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":17}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stocks`
--

CREATE TABLE `stocks` (
  `warehouse_id` int(11) UNSIGNED NOT NULL,
  `item_id` int(11) UNSIGNED NOT NULL,
  `quantity` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `stocks`
--

INSERT INTO `stocks` (`warehouse_id`, `item_id`, `quantity`) VALUES
(1, 16, 96),
(1, 17, 35),
(1, 18, 92),
(1, 19, 35),
(1, 20, 16),
(1, 21, 41),
(1, 22, 26),
(1, 23, 35),
(1, 24, 20),
(1, 25, 58),
(1, 26, 84),
(1, 27, 4),
(1, 28, 16),
(1, 29, -7),
(1, 30, 4),
(1, 31, 14),
(1, 32, 11),
(1, 33, 60),
(1, 34, 20),
(1, 35, 31);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `types`
--

CREATE TABLE `types` (
  `type_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `unit` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `types`
--

INSERT INTO `types` (`type_id`, `name`, `unit`) VALUES
(1, 'Fruta', 'Caja'),
(2, 'Verdura', 'Caja'),
(3, 'Hortaliza', 'Quintal'),
(4, 'Frutas grandes', 'unidad'),
(5, 'Legumbres', 'Quintal'),
(6, 'Cerial', 'Quintal'),
(34, 'Galleta', 'Paquete'),
(35, 'Vino', 'Barril'),
(36, 'Jugos ', 'Sachete'),
(37, 'Bebida', 'Sachete'),
(38, 'Aceite', 'Litros'),
(39, 'Grasa', 'Kilogramos'),
(40, 'Entalados', 'Paquete'),
(41, 'Combustible', 'Litros'),
(42, 'Muebles', 'Unidad'),
(43, 'Movilidad', 'Unidad'),
(44, 'Material escritorio', 'Caja'),
(45, 'Carne', 'Kilogramos'),
(46, 'Electrodoméstico', 'Unidad'),
(47, 'Celulares', 'unidad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `rol` char(1) DEFAULT NULL,
  `pic` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `name`, `user_name`, `password`, `rol`, `pic`) VALUES
(17, 'Alex', 'admin', '$2b$10$h7D3vwuu5zLKwdycQwmbWeUVZLL.3vMK24DDHpKNo2nIaaOVkYBMe', '4', 'user.png'),
(18, 'Juan Mi', 'juan', '$2b$10$Yb.pkrydiS20dhEqow0PyOYEPw6kpKOGS7KSXGwCQawqGPgQNRc6O', '1', 'user.png'),
(19, 'Andresq', 'andres', '$2b$10$b1ouZUFEwEaMfXwTAQr.nuMiAysCpGW5.GmwIrtOX3oVGMRs8PTQW', '1', 'user.png'),
(20, 'Maria', 'maria', '$2b$10$zcOwGZjUlQWSSXEqEQQ3duc.yrELOwcwA1O7U.alYQ6edIQYsswk2', '1', 'user.png'),
(21, 'Raul', 'raul', '$2b$10$JFmZXyhAsBN2Qd36rXW9cuwjg2Re9CMwCiyq9tvc0lSBEag8Hm2Lm', '1', 'user.png'),
(22, 'MontaPuerco', 'monta', '$2b$10$fRU90AYjCXEtEfo7VkHBQO3kRNy4kNi6pAiN/jd6aAvC5NmMufRdu', '1', 'user.png'),
(23, 'Martin', 'martin', '$2b$10$98w8m9nbqOsL2K/ED27Ox.CIFaveQEPe2m8/VeOnAmkoetyvcZ6pK', '1', 'user.png'),
(24, 'Hugo', 'hugo', '$2b$10$lpN8K8jW5sOhDApKeY4Rc.zEqqkr6IULYjdmDqhba9U0HFD8WXPJO', '1', 'user.png'),
(25, 'Alicia', 'alicia', '$2b$10$2bWiBbHndb/ca8k11hzmleX2lWaqyVm6SKHW.LgVtHq2e4zzYODFS', '1', 'user.png'),
(26, 'Jessica', 'jesi', '$2b$10$/eF6Ipj17dzFI15sjczuJOHA/mxpmGUrjL47L9MKbTb3BWTRcDHdy', '1', 'user.png'),
(27, 'Moises', 'Moises', '$2b$10$pkvVvoFQudg73zKUJ86U1Ojj2ipmWNtvS7XVCwkS0RyYQm43YVHmK', '1', 'user.png'),
(28, 'Marta', 'marta', '$2b$10$V6A2TDXOM0xUJCV1GGD2G.LnsaS8AYNsy4jO/KsZgsrz505fFMagi', '1', 'user.png'),
(29, 'Joe', 'joel', '$2b$10$XsKXByLiLofK2tfliSzMC.E3Z4GSJxY.u2pb0lvJSYqpJHEzZXLey', '1', 'user.png'),
(30, 'Nelly', 'neli', '$2b$10$za.i3GLs.uZ.gdn5uZHlFOcmN6aIOK2kTz8H90lA3t94WdALcfnoS', '1', 'user.png'),
(31, 'Aleki', 'ales', '$2b$10$y7VXFOaPLoz.iZQUXRssV.7YpZoB3okhOaErCAugZNGvSi65UDTny', '1', 'user.png'),
(32, 'Alfredo', 'alfre', '$2b$10$oqGj5Y.7Mdg2y1NPFxeOHe9MN.tJa7It.jh.3LWeXh//bcKXTpaku', '1', 'user.png'),
(33, 'Tomy', 'tomi', '$2b$10$JyRLiF2qqfvZitls039vRuh2C0IqwukVyOwFAd9Oiirvk3GibPbly', '1', 'user.png'),
(34, 'Fidel', 'fiel', '$2b$10$ngJpIPXGCNQXD3JvtnHLduz9mM.9Oj4UUXKqwjZBfGKMT4oKE.Bja', '1', 'user.png'),
(35, 'Anabel', 'ana1', '$2b$10$CrF2HvcT7v2.9S09AJrxZuFaSYymhkWvjY/90orI1ku0c9c4bYJ5i', '1', 'user.png'),
(36, 'Jose', 'jose', '$2b$10$/JCT/tcCzegk5ruyUmkTX.8Dm5d8BbC1fUXvg1A7NRsAA77FUmosm', '1', 'user.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `warehouses`
--

CREATE TABLE `warehouses` (
  `warehouse_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `warehouses`
--

INSERT INTO `warehouses` (`warehouse_id`, `name`, `address`) VALUES
(1, 'Kulking', 'Calle Naranjo y Gardenia N23'),
(3, 'Don juan', 'Calle paz del chaco 2'),
(4, 'Las Amazonas', 'Calle paz Calle paz del chaco 2 Calle paz del chaco 2'),
(5, 'Luisito', 'el chaco 2Ca lle paz d'),
(6, 'Mecantil', 'Calle paz del chaco 2 Calle paz d'),
(7, 'Kulking2', 'Calle paz del chaco 2'),
(8, 'Moise', 'Calle paz del  Calle paz dchaco 223'),
(9, 'Almacen Porvenir', 'Calle paz del chaco 2'),
(10, 'Alma Alma', 'Calle paz del chaco 2'),
(11, 'La paz', 'Calle paz del chaco 2'),
(12, 'Manzanita', 'Calle paz del chaco 2'),
(13, 'Cuervo', 'Calle paz del chaco 2'),
(14, 'Mistter Co', 'Calle paz del chaco 2'),
(15, 'Mariposa', 'Mat Calle paz del chaco 2'),
(16, 'Libosae', 'Sueto Calle paz del chaco 2'),
(17, 'Mister Hipo', 'Calle paz del chaco 2  sdasd'),
(18, 'Darwin', ' asdfas fas ss Calle paz del chaco 2'),
(19, 'Malea', 'Calle paz del chaco 2'),
(20, 'Ayon', 'Calle paz del chaco 2');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `´fk_type´` (`type_id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `´fk_user_orders´` (`user_id`),
  ADD KEY `´fk_items_orders´` (`item_id`);

--
-- Indices de la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`purchase_id`),
  ADD KEY `´fk_user_purchases´` (`user_id`),
  ADD KEY `´fk_items_puchases´` (`item_id`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`sale_id`),
  ADD KEY `´fk_user_sales´` (`user_id`),
  ADD KEY `´fk_warehouse_sales´` (`warehouse_id`);

--
-- Indices de la tabla `sales_detail`
--
ALTER TABLE `sales_detail`
  ADD PRIMARY KEY (`sale_id`,`item_id`),
  ADD KEY `´fk_items_sales_detail´` (`item_id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`warehouse_id`,`item_id`),
  ADD KEY `´fk_items_sotocks´` (`item_id`);

--
-- Indices de la tabla `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`type_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- Indices de la tabla `warehouses`
--
ALTER TABLE `warehouses`
  ADD PRIMARY KEY (`warehouse_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `purchases`
--
ALTER TABLE `purchases`
  MODIFY `purchase_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `sale_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `types`
--
ALTER TABLE `types`
  MODIFY `type_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `warehouses`
--
ALTER TABLE `warehouses`
  MODIFY `warehouse_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `´fk_type´` FOREIGN KEY (`type_id`) REFERENCES `types` (`type_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `´fk_items_orders´` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `´fk_user_orders´` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `´fk_items_puchases´` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `´fk_user_purchases´` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `´fk_user_sales´` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `´fk_warehouse_sales´` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`warehouse_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sales_detail`
--
ALTER TABLE `sales_detail`
  ADD CONSTRAINT `´fk_items_sales_detail´` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `´fk_sales_sales_detail´` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`sale_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `stocks`
--
ALTER TABLE `stocks`
  ADD CONSTRAINT `´fk_items_sotocks´` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `´fk_warehouse_stocks´` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`warehouse_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
