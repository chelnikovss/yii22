-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Июл 08 2016 г., 08:45
-- Версия сервера: 10.1.10-MariaDB
-- Версия PHP: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `routecalculation`
--

-- --------------------------------------------------------

--
-- Структура таблицы `centerspost`
--

CREATE TABLE `centerspost` (
  `idcenterspost` int(255) NOT NULL,
  `namepochta` text NOT NULL,
  `adress` text NOT NULL,
  `namecenter` text NOT NULL,
  `id_center` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `centerspost`
--

INSERT INTO `centerspost` (`idcenterspost`, `namepochta`, `adress`, `namecenter`, `id_center`) VALUES
(1, 'Луганск ЦОПП', 'ул. Виктора Пятеркина, 8', 'Первомайск (Луганск)', 2),
(2, 'Калиново', 'ул.Ленина,18а', 'Первомайск', 2),
(3, 'Первомайск-5', 'ул.Советская ,2', 'Первомайск', 2),
(4, 'Первомайск', 'ул.Киевская,14', 'Первомайск', 2),
(5, 'Золотое-5', 'ул.Чайкина,19', 'Первомайск', 2),
(6, 'Березовское', 'ул.Первомайская,7', 'Первомайск', 2),
(7, 'Голубовское', 'ул.Кооперативная,1', 'Первомайск', 2),
(8, 'Донецкий', 'ул.30 лет Победы,3', 'Первомайск', 2),
(9, 'Кировск-1', 'ул.23 Съезда,11', 'Первомайск', 2),
(10, 'Кировск-6', 'кв. 30лет Победы,3', 'Первомайск', 2),
(11, 'Кировск-7', 'кв.50лет Пионерии,3', 'Первомайск', 2),
(12, 'Кировск-3', 'ул.Кольцевая,15', 'Первомайск', 2),
(13, 'Червоногвардейское', 'ул.Бабушкина,21', 'Первомайск', 2),
(14, 'Первомайск-ЦПС 1', 'ул.Киевская,14', 'Первомайск', 2),
(15, 'Луганск Центральная касса', 'ул. Виктора Пятеркина, 8', 'Первомайск (Луганск)', 2),
(16, 'Главная касса', 'ххх', 'Первомайск (Луганск)\r\n', 2),
(17, 'Банк', 'xxx', 'Первомайск (Луганск)\r\n', 2),
(18, 'Тест', 'ул. Проверочная 12/22', 'Первомайск', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `distancesmatrix`
--

CREATE TABLE `distancesmatrix` (
  `idistancesmatrix` int(11) NOT NULL,
  `distance` int(11) NOT NULL,
  `start` varchar(255) NOT NULL,
  `finish` varchar(255) NOT NULL,
  `id_center` int(11) NOT NULL,
  `id_centerspost_start` int(11) NOT NULL,
  `id_centerspost_finish` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `distancesmatrix`
--

INSERT INTO `distancesmatrix` (`idistancesmatrix`, `distance`, `start`, `finish`, `id_center`, `id_centerspost_start`, `id_centerspost_finish`) VALUES
(1, 74, 'Луганск ЦОПП', 'Калиново', 2, 1, 2),
(2, 78, 'Луганск ЦОПП', 'Первомайск-5', 2, 1, 3),
(3, 78, 'Луганск ЦОПП', 'Первомайск', 2, 1, 4),
(4, 88, 'Луганск ЦОПП', 'Золотое-5', 2, 1, 5),
(5, 85, 'Луганск ЦОПП', 'Березовское', 2, 1, 6),
(6, 85, 'Луганск ЦОПП', 'Голубовское', 2, 1, 7),
(7, 88, 'Луганск ЦОПП', 'Донецкий', 2, 1, 8),
(8, 78, 'Луганск ЦОПП', 'Кировск-1', 2, 1, 9),
(9, 76, 'Луганск ЦОПП', 'Кировск-6', 2, 1, 10),
(11, 77, 'Луганск ЦОПП', 'Кировск-7', 2, 1, 11),
(12, 75, 'Луганск ЦОПП', 'Кировск-3', 2, 1, 12),
(13, 89, 'Луганск ЦОПП', 'Червоногвардейское', 2, 1, 13),
(15, 15, 'Калиново', 'Первомайск-5', 2, 2, 3),
(16, 15, 'Калиново', 'Первомайск', 2, 2, 4),
(17, 22, 'Калиново', 'Золотое-5', 2, 2, 5),
(18, 21, 'Калиново', 'Березовское', 2, 2, 6),
(19, 21, 'Калиново', 'Голубовское', 2, 2, 7),
(20, 32, 'Калиново', 'Донецкий', 2, 2, 8),
(21, 24, 'Калиново', 'Кировск-1', 2, 2, 9),
(22, 22, 'Калиново', 'Кировск-6', 2, 2, 10),
(23, 23, 'Калиново', 'Кировск-7', 2, 2, 11),
(24, 21, 'Калиново', 'Кировск-3', 2, 2, 12),
(25, 27, 'Калиново', 'Червоногвардейское', 2, 2, 13),
(28, 9, 'Первомайск-5', 'Первомайск', 2, 3, 4),
(29, 12, 'Первомайск-5', 'Золотое-5', 2, 3, 5),
(30, 12, 'Первомайск-5', 'Березовское', 2, 3, 6),
(31, 15, 'Первомайск-5', 'Голубовское', 2, 3, 7),
(32, 20, 'Первомайск-5', 'Донецкий', 2, 3, 8),
(33, 14, 'Первомайск-5', 'Кировск-1', 2, 3, 9),
(34, 13, 'Первомайск-5', 'Кировск-6', 2, 3, 10),
(35, 14, 'Первомайск-5', 'Кировск-7', 2, 3, 11),
(36, 12, 'Первомайск-5', 'Кировск-3', 2, 3, 12),
(37, 20, 'Первомайск-5', 'Червоногвардейское', 2, 3, 13),
(42, 14, 'Золотое-5', 'Березовское', 2, 5, 6),
(43, 14, 'Золотое-5', 'Голубовское', 2, 5, 7),
(44, 26, 'Золотое-5', 'Донецкий', 2, 5, 8),
(45, 19, 'Золотое-5', 'Кировск-1', 2, 5, 9),
(46, 22, 'Золотое-5', 'Кировск-6', 2, 5, 10),
(47, 22, 'Золотое-5', 'Кировск-7', 2, 5, 11),
(48, 22, 'Золотое-5', 'Кировск-3', 2, 5, 12),
(49, 29, 'Золотое-5', 'Червоногвардейское', 2, 5, 13),
(53, 14, 'Первомайск', 'Золотое-5', 2, 4, 5),
(54, 11, 'Первомайск', 'Березовское', 2, 4, 6),
(55, 20, 'Первомайск', 'Голубовское', 2, 4, 7),
(56, 22, 'Первомайск', 'Донецкий', 2, 4, 8),
(57, 16, 'Первомайск', 'Кировск-1', 2, 4, 9),
(58, 15, 'Первомайск', 'Кировск-6', 2, 4, 10),
(59, 16, 'Первомайск', 'Кировск-7 ', 2, 4, 11),
(60, 14, 'Первомайск', 'Кировск-3', 2, 4, 12),
(61, 22, 'Первомайск', 'Червоногвардейское', 2, 4, 13),
(67, 6, 'Березовское', 'Голубовское', 2, 6, 7),
(68, 10, 'Березовское', 'Донецкий', 2, 6, 8),
(69, 10, 'Березовское', 'Кировск-1', 2, 6, 9),
(70, 12, 'Березовское', 'Кировск-6', 2, 6, 10),
(71, 13, 'Березовское', 'Кировск-7 ', 2, 6, 11),
(72, 11, 'Березовское', 'Кировск-3', 2, 6, 12),
(73, 20, 'Березовское', 'Червоногвардейское', 2, 6, 13),
(80, 6, 'Голубовское', 'Донецкий', 2, 7, 8),
(81, 7, 'Голубовское', 'Кировск-1', 2, 7, 9),
(82, 12, 'Голубовское', 'Кировск-6', 2, 7, 10),
(83, 11, 'Голубовское', 'Кировск-7 ', 2, 7, 11),
(84, 12, 'Голубовское', 'Кировск-3', 2, 7, 12),
(85, 20, 'Голубовское', 'Червоногвардейское', 2, 7, 13),
(93, 9, 'Донецкий', 'Кировск-1', 2, 8, 9),
(94, 11, 'Донецкий', 'Кировск-6', 2, 8, 10),
(95, 13, 'Донецкий', 'Кировск-7 ', 2, 8, 11),
(96, 12, 'Донецкий', 'Кировск-3', 2, 8, 12),
(97, 20, 'Донецкий', 'Червоногвардейское', 2, 8, 13),
(106, 5, 'Кировск-1', 'Кировск-6', 2, 9, 10),
(107, 4, 'Кировск-1', 'Кировск-7 ', 2, 9, 11),
(108, 5, 'Кировск-1', 'Кировск-3', 2, 9, 12),
(109, 12, 'Кировск-1', 'Червоногвардейское', 2, 9, 13),
(119, 4, 'Кировск-6', 'Кировск-7 ', 2, 10, 11),
(120, 2, 'Кировск-6', 'Кировск-3', 2, 10, 12),
(121, 10, 'Кировск-6', 'Червоногвардейское', 2, 10, 13),
(132, 3, 'Кировск-7', 'Кировск-3', 2, 11, 12),
(133, 11, 'Кировск-7', 'Червоногвардейское', 2, 11, 13),
(145, 9, 'Кировск-3', 'Червоногвардейское', 2, 12, 13),
(158, 78, 'Первомайск-ЦПС 1', 'Луганск ЦОПП', 2, 14, 1),
(159, 15, 'Первомайск-ЦПС 1', 'Калиново', 2, 14, 2),
(160, 9, 'Первомайск-ЦПС 1', 'Первомайск-5', 14, 4, 3),
(161, 14, 'Первомайск-ЦПС 1', 'Золотое-5', 2, 14, 5),
(162, 11, 'Первомайск-ЦПС 1', 'Березовское', 2, 14, 6),
(163, 20, 'Первомайск-ЦПС 1', 'Голубовское', 2, 14, 7),
(164, 22, 'Первомайск-ЦПС 1', 'Донецкий', 2, 14, 8),
(165, 16, 'Первомайск-ЦПС 1', 'Кировск-1', 2, 14, 9),
(166, 15, 'Первомайск-ЦПС 1', 'Кировск-6', 2, 14, 10),
(167, 16, 'Первомайск-ЦПС 1', 'Кировск-7 ', 2, 14, 11),
(168, 14, 'Первомайск-ЦПС 1', 'Кировск-3', 2, 14, 12),
(169, 22, 'Первомайск-ЦПС 1', 'Червоногвардейское', 2, 14, 13),
(170, 2, 'Главная касса', 'Банк', 2, 16, 17),
(171, 2, 'Банк', 'Главная касса', 2, 17, 16),
(172, 2, 'Луганск Центральная касса', 'Банк', 2, 1, 17),
(173, 2, 'Банк', 'Луганск Центральная касса', 2, 17, 1),
(174, 0, 'Луганск Центральная касса', 'Главная касса', 2, 1, 16),
(175, 0, 'Главная касса', 'Луганск Центральная касса', 2, 16, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `lugansk`
--

CREATE TABLE `lugansk` (
  `id` int(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `indexmail` int(100) NOT NULL,
  `address2` text NOT NULL,
  `addressDesc` text NOT NULL,
  `tel` varchar(255) NOT NULL,
  `latlocation` double NOT NULL,
  `lnglocation` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `lugansk`
--

INSERT INTO `lugansk` (`id`, `address`, `name`, `indexmail`, `address2`, `addressDesc`, `tel`, `latlocation`, `lnglocation`) VALUES
(2, 'Луганск', 'Луганск 2', 91002, 'г. Луганск, ул.Артема, 183', 'г. Луганск, ул.Артема, 183', '42-48-68', 48.590532, 39.306782),
(3, 'Луганск', 'Луганск 4', 91004, 'г. Луганск Остаря могила, 151', 'г. Луганск Остаря могила, 151', '42-75-53', 48.526261, 39.364185),
(4, 'Луганск', 'Луганск 5', 91005, 'г. Луганск, ул. Годуванцева, 6', 'г. Луганск, ул. Годуванцева, 6', '49-34-77', 48.572829, 39.338619),
(5, 'Луганск', 'Луганск 6', 91006, 'г. Луганск, ул. Героев Сталинграда, 9а', 'г. Луганск, ул. Героев Сталинграда, 9а', '31-68-07', 48.541367, 39.261759),
(6, 'Луганск', 'Луганск 7', 91007, 'г. Луганск, ул. Достаевского, 43', 'г. Луганск, ул. Достаевского, 43', '64-04-40', 48.546885, 39.288017),
(7, 'Луганск', 'Луганск 8', 91008, 'г. Луганск, ул. ЛГАУ (Аграрный университет)', 'г. Луганск, ул. ЛГАУ (Аграрный университет)', '96-73-58', 48.559045, 39.253674),
(8, 'Луганск', 'Луганск 11', 91011, 'г. Луганск, ул. Оборонная, 5', 'г. Луганск, ул. Оборонная, 5', '55-31-67', 48.562604, 39.315505),
(9, 'Луганск', 'Луганск 12', 91012, 'г. Луганск, ул. Металистов, 29', 'г. Луганск, ул. Металистов, 29', '42-33-11', 48.587099, 39.321991),
(10, 'Луганск', 'Луганск 14', 91014, 'г. Луганск, ул. Смирнова, 38', 'г. Луганск, ул. Смирнова, 38', '42-25-40', 48.602032, 39.303782),
(11, 'Луганск', 'Луганск 15', 91015, 'г. Луганск, кв. Заречный, 12', 'г. Луганск, кв. Заречный, 12', '32-10-31', 48.528857, 39.269107),
(12, 'Луганск', 'Луганск 16', 91016, 'г. Луганск, ул. 15-я линия, 21', 'г. Луганск, ул. 15-я линия, 21', '58-03-68', 48.570075, 39.311184),
(13, 'Луганск', 'Луганск 19', 91019, 'г. Луганск, ул. Артема, 449', 'г. Луганск, ул. Артема, 449', '92-43-75', 48.580751, 39.276563),
(14, 'Луганск', 'Луганск 20', 91020, 'г. Луганск пер. Крымский, 1', 'г. Луганск пер. Крымский, 1', '55-59-16', 48.52471, 39.311463),
(15, 'Луганск', 'Луганск 21', 91021, 'г. Луганск, кв. Гаевого, 35', 'г. Луганск, кв. Гаевого, 35', '65-49-68', 48.560088, 39.262711),
(16, 'Луганск', 'Луганск 24', 91024, 'г. Луганск, ул. Ленинградская, 11', 'г. Луганск, ул. Ленинградская, 11', '64-58-76', 48.586723, 39.375881),
(17, 'Луганск', 'Луганск 25', 91025, 'г. Луганск, ул. Ульянова, 38а', 'г. Луганск, ул. Ульянова, 38а', '93-82-06', 48.610336, 39.38269),
(18, 'Луганск', 'Луганск 26', 91026, 'г. Луганск, ул. Амурская, 2а', 'г. Луганск, ул. Амурская, 2а', '93-83-98', 48.661433, 39.403324),
(19, 'Луганск', 'Луганск 28', 91028, 'г. Луганск, ул. Успенского, 66а', 'г. Луганск, ул. Успенского, 66а', '55-54-75', 48.505419, 39.296053),
(20, 'Луганск', 'Луганск 29', 91029, 'г. Луганск, кв. Луганский, 13а', 'г. Луганск, кв. Луганский, 13а', '65-94-61', 48.539858, 39.274254),
(21, 'Луганск', 'Луганск 31', 91031, 'г. Луганск, кв. Героев Брестской Крепости, 9', 'г. Луганск, кв. Героев Брестской Крепости, 9', '61-52-79', 48.556427, 39.328144),
(22, 'Луганск', 'Луганск 33', 91033, 'г. Луганск, кв. Шевченко, 12', 'г. Луганск, кв. Шевченко, 12', '63-83-50', 48.552837, 39.331944),
(23, 'Луганск', 'Луганск 34', 91034, 'г. Луганск, кв. Молодежный, 6', 'г. Луганск, кв. Молодежный, 6', '63-34-64', 48.570945, 39.37483),
(24, 'Луганск', 'Луганск 38', 91038, 'г. Луганск, ул. Строительная, 19', 'г. Луганск, ул. Строительная, 19', '93-41-71', 48.53879, 39.30822),
(25, 'Луганск', 'Луганск 42', 91042, 'г. Луганск, кв. 50 лет Октября, 27', 'г. Луганск, кв. 50 лет Октября, 27', '62-87-27', 48.57305, 39.397377),
(26, 'Луганск', 'Луганск 43', 91043, 'г. Луганск, ул. Северная, 31', 'г. Луганск, ул. Северная, 31', '42-12-10', 48.598385, 39.337217),
(27, 'Луганск', 'Луганск 45', 91045, 'г. Луганск, кв. 50 лет Обороны Луганска, 1', 'г. Луганск, кв. 50 лет Обороны Луганска, 1', '63-97-14', 48.513198, 39.358795),
(28, 'Луганск', 'Луганск 47', 91047, 'г. Луганск, ул. Ладыгина, 4а', 'г. Луганск, ул. Строительная, 19', '42-79-67', 48.530778, 39.349551),
(29, 'Луганск', 'Луганск 48', 91048, 'г. Луганск, ул. Волгоградская, 60б', 'г. Луганск, ул. Волгоградская, 60б', '61-25-88', 48.551745, 39.353396),
(30, 'Луганск', 'Луганск 49', 91049, 'г. Луганск, ул. Северодонецкая, 1', 'г. Луганс, ул. Северодонецкая, 1', '93-84-78', 48.638856, 39.406415),
(31, 'Луганск', 'Луганск 50', 91050, 'г. Луганск, кв. Комарова, 11', 'г. Луганск, кв. Комарова, 11', '47-60-19', 48.561072, 39.388511),
(32, 'Луганск', 'Луганск 54', 91054, 'г. Луганск, ул. Суходольская, 6', 'г. Луганск, ул. Суходольская, 6', '64-40-60', 48.586157, 39.397306),
(33, 'Луганск', 'Луганск 55', 91055, 'г. Луганск, ул. Титова, 9', 'г. Луганск, ул. Титова, 9', '53-00-93', 48.574165, 39.306603),
(34, 'Луганск', 'Луганск 56', 91056, 'г. Луганс, ул. В. Пятеркина, 8', 'г. Луганс, ул. В. Пятеркина, 8', '93-70-76', 48.56998, 39.28428),
(35, 'Луганск', 'Луганск 57', 91057, 'г.Луганс, кв. Волкова, 2а', 'г.Луганс, кв. Волкова, 2а', '47-60-35', 48.567094, 39.396623),
(36, 'Луганск', 'Александровск', 91484, 'Луганская область, г. Александровск, ул. Красная Площадь, 10', 'г. Александровск, ул. Красная Площадь, 10', '91-13-82', 48.586777, 39.187657),
(37, 'Луганск', 'Юбилейный', 91493, 'Луганская область, Юбилейный, ул. Артема, 3', 'Луганская область, Юбилейный, ул. Артема, 3', '93-60-52', 48.55793, 39.187145);

-- --------------------------------------------------------

--
-- Структура таблицы `postcenters`
--

CREATE TABLE `postcenters` (
  `idcenter` int(255) NOT NULL,
  `nameoffices` varchar(1000) NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `postcenters`
--

INSERT INTO `postcenters` (`idcenter`, `nameoffices`, `notes`) VALUES
(0, 'Луганск', ''),
(1, 'Алчевск', ''),
(2, 'Первомайск', ''),
(3, 'Антрацит', ''),
(4, 'Краснодон', '');

-- --------------------------------------------------------

--
-- Структура таблицы `route`
--

CREATE TABLE `route` (
  `id` int(254) NOT NULL,
  `numberoute` int(255) NOT NULL,
  `routepost` mediumtext NOT NULL,
  `exitime` varchar(255) NOT NULL,
  `track` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `parametersroute` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `route`
--

INSERT INTO `route` (`id`, `numberoute`, `routepost`, `exitime`, `track`, `time`, `parametersroute`) VALUES
(86, 27, '[{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"}]', '08:10', '216.464', '6:31:30', '[{"distance":10653,"parkingTime":"0:05"},{"distance":10677,"parkingTime":"0:05"},{"distance":7975,"parkingTime":"0:05"},{"distance":5161,"parkingTime":"0:05"},{"distance":5458,"parkingTime":"0:05"},{"distance":10133,"parkingTime":"0:05"},{"distance":3240,"parkingTime":"0:05"},{"distance":7051,"parkingTime":"0:05"},{"distance":10677,"parkingTime":"0:05"},{"distance":7975,"parkingTime":"0:05"},{"distance":10133,"parkingTime":"0:05"},{"distance":7943,"parkingTime":"0:05"},{"distance":6483,"parkingTime":"0:05"},{"distance":6356,"parkingTime":"0:05"},{"distance":5161,"parkingTime":"0:05"},{"distance":10677,"parkingTime":"0:05"},{"distance":7975,"parkingTime":"0:05"},{"distance":6442,"parkingTime":"0:05"},{"distance":7051,"parkingTime":"0:05"},{"distance":10677,"parkingTime":"0:05"},{"distance":7975,"parkingTime":"0:05"},{"distance":10133,"parkingTime":"0:05"},{"distance":3240,"parkingTime":"0:05"},{"distance":7051,"parkingTime":"0:05"},{"distance":10677,"parkingTime":"0:05"},{"distance":9894,"parkingTime":"0:05"},{"distance":3240,"parkingTime":"0:05"},{"distance":6356,"parkingTime":"0:05"}]'),
(128, 10, '[{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"}]', '06:25', '290.749', '8:25:16', '[{"i":0,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","parkingTime":"00:01","start":"06:25","coming":"6:45","departure":"6:46","key_i":0},{"i":1,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","parkingTime":"00:02","start":"6:46","coming":"6:60","departure":"7:2","key_i":1},{"i":2,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:04","start":"7:2","coming":"7:19","departure":"7:23","key_i":2},{"i":3,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","parkingTime":"00:06","start":"7:23","coming":"7:28","departure":"7:34","key_i":3},{"i":4,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","parkingTime":"00:07","start":"7:34","coming":"7:47","departure":"7:54","key_i":4},{"i":5,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","parkingTime":"00:01","start":"7:54","coming":"8:14","departure":"8:15","key_i":5},{"i":6,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","parkingTime":"00:02","start":"8:15","coming":"8:29","departure":"8:31","key_i":6},{"i":7,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:04","start":"8:31","coming":"8:48","departure":"8:52","key_i":7},{"i":8,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","parkingTime":"00:06","start":"8:52","coming":"8:57","departure":"9:03","key_i":8},{"i":9,"distance":7993,"distancetime":801,"distancetimetext":"13 мин.","parkingTime":"00:07","start":"9:03","coming":"9:16","departure":"9:23","key_i":9},{"i":10,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","parkingTime":"00:02","start":"9:23","coming":"9:37","departure":"9:39","key_i":10},{"i":11,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:04","start":"9:39","coming":"9:56","departure":"10:00","key_i":11},{"i":12,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","parkingTime":"00:06","start":"10:00","coming":"10:05","departure":"10:11","key_i":12},{"i":13,"distance":7993,"distancetime":801,"distancetimetext":"13 мин.","parkingTime":"00:07","start":"10:11","coming":"10:24","departure":"10:31","key_i":13},{"i":14,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","parkingTime":"00:02","start":"10:31","coming":"10:45","departure":"10:47","key_i":14},{"i":15,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:04","start":"10:47","coming":"11:04","departure":"11:08","key_i":15},{"i":16,"distance":7943,"distancetime":788,"distancetimetext":"13 мин.","parkingTime":"00:06","start":"11:08","coming":"11:21","departure":"11:27","key_i":16},{"i":17,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","parkingTime":"00:01","start":"11:27","coming":"11:47","departure":"11:48","key_i":17},{"i":18,"distance":9894,"distancetime":928,"distancetimetext":"15 мин.","parkingTime":"00:02","start":"11:48","coming":"12:03","departure":"12:05","key_i":18},{"i":19,"distance":7943,"distancetime":788,"distancetimetext":"13 мин.","parkingTime":"00:06","start":"12:05","coming":"12:18","departure":"12:24","key_i":19},{"i":20,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","parkingTime":"00:01","start":"12:24","coming":"12:44","departure":"12:45","key_i":20},{"i":21,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","parkingTime":"00:02","start":"12:45","coming":"12:59","departure":"13:1","key_i":21},{"i":22,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:04","start":"13:1","coming":"13:18","departure":"13:22","key_i":22},{"i":23,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","parkingTime":"00:06","start":"13:22","coming":"13:27","departure":"13:33","key_i":23},{"i":24,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","parkingTime":"00:07","start":"13:33","coming":"13:46","departure":"13:53","key_i":24},{"i":25,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","parkingTime":"00:01","start":"13:53","coming":"14:13","departure":"14:14","key_i":25},{"i":26,"distance":9894,"distancetime":928,"distancetimetext":"15 мин.","parkingTime":"00:02","start":"14:14","coming":"14:29","departure":"14:31","key_i":26},{"i":27,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","parkingTime":"00:06","start":"14:31","coming":"14:36","departure":"14:42","key_i":27},{"i":28,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","parkingTime":"00:07","start":"14:42","coming":"14:55","departure":"15:02","key_i":28},{"i":29,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","parkingTime":"00:01","start":"15:02","coming":"15:22","departure":"15:23","key_i":29},{"i":30,"distance":9894,"distancetime":928,"distancetimetext":"15 мин.","parkingTime":"00:02","start":"15:23","coming":"15:38","departure":"15:40","key_i":30},{"i":31,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","parkingTime":"00:06","start":"15:40","coming":"15:45","departure":"15:51","key_i":31},{"i":32,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","parkingTime":"00:07","start":"15:51","coming":"16:04","departure":"16:11","key_i":32},{"i":33,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","parkingTime":"00:01","start":"16:11","coming":"16:31","departure":"16:32","key_i":33},{"i":34,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","parkingTime":"00:02","start":"16:32","coming":"16:46","departure":"16:48","key_i":34},{"i":35,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:04","start":"16:48","coming":"17:05","departure":"17:09","key_i":35}]'),
(129, 6, '[{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"}]', '08:10', '11.9', '0:24:02', '[{"i":0,"distance":5458,"distancetime":700,"distancetimetext":"12 мин.","start":"08:10","coming":"8:22","departure":"8:27","key_i":0},{"i":1,"distance":6442,"distancetime":742,"distancetimetext":"12 мин.","start":"8:27","coming":"8:39","departure":"8:43","key_i":1}]'),
(130, 7, '[{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"}]', '05:20', '229.485', '6:42:05', '[{"i":0,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","start":"05:20","coming":"5:40","departure":"5:45","key_i":0},{"i":1,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","start":"5:45","coming":"5:59","departure":"6:5","key_i":1},{"i":2,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","start":"6:5","coming":"6:22","departure":"6:29","key_i":2},{"i":3,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","start":"6:29","coming":"6:34","departure":"6:42","key_i":3},{"i":4,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","start":"6:42","coming":"6:55","departure":"7:04","key_i":4},{"i":5,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","start":"7:04","coming":"7:24","departure":"7:34","key_i":5},{"i":6,"distance":9894,"distancetime":928,"distancetimetext":"15 мин.","start":"7:34","coming":"7:49","departure":"8:00","key_i":6},{"i":7,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","start":"8:00","coming":"8:05","departure":"8:17","key_i":7},{"i":8,"distance":7993,"distancetime":801,"distancetimetext":"13 мин.","start":"8:17","coming":"8:30","departure":"8:43","key_i":8},{"i":9,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","start":"8:43","coming":"8:57","departure":"9:11","key_i":9},{"i":10,"distance":6442,"distancetime":742,"distancetimetext":"12 мин.","start":"9:11","coming":"9:23","departure":"9:38","key_i":10},{"i":11,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","start":"9:38","coming":"9:51","departure":"10:07","key_i":11},{"i":12,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","start":"10:07","coming":"10:27","departure":"10:44","key_i":12},{"i":13,"distance":9894,"distancetime":928,"distancetimetext":"15 мин.","start":"10:44","coming":"10:59","departure":"11:17","key_i":13},{"i":14,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","start":"11:17","coming":"11:22","departure":"11:41","key_i":14},{"i":15,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","start":"11:41","coming":"11:54","departure":"12:14","key_i":15},{"i":16,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","start":"12:14","coming":"12:34","departure":"12:55","key_i":16},{"i":17,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","start":"12:55","coming":"13:9","departure":"13:31","key_i":17},{"i":18,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","start":"13:31","coming":"13:48","departure":"14:11","key_i":18},{"i":19,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","start":"14:11","coming":"14:16","departure":"14:40","key_i":19},{"i":20,"distance":7993,"distancetime":801,"distancetimetext":"13 мин.","start":"14:40","coming":"14:53","departure":"15:18","key_i":20},{"i":21,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","start":"15:18","coming":"15:32","departure":"15:58","key_i":21},{"i":22,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","start":"15:58","coming":"16:15","departure":"16:42","key_i":22},{"i":23,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","start":"16:42","coming":"16:47","departure":"17:15","key_i":23},{"i":24,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","start":"17:15","coming":"17:28","departure":"17:57","key_i":24},{"i":25,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","start":"17:57","coming":"18:17","departure":"18:47","key_i":25},{"i":26,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","start":"18:47","coming":"19:1","departure":"19:32","key_i":26},{"i":27,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","start":"19:32","coming":"19:49","departure":"20:21","key_i":27},{"i":28,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","start":"20:21","coming":"20:26","departure":"20:59","key_i":28},{"i":29,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","start":"20:59","coming":"21:12","departure":"21:46","key_i":29}]'),
(131, 11, '[{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"}]', '07:10', '23.814', '0:40:06', '[{"i":0,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","start":"07:10","coming":"7:30","departure":"7:35","key_i":0},{"i":1,"distance":9894,"distancetime":928,"distancetimetext":"15 мин.","start":"7:35","coming":"7:50","departure":"7:56","key_i":1},{"i":2,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","start":"7:56","coming":"8:01","departure":"8:08","key_i":2}]'),
(132, 14, '[{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"}]', '06:12', '18.951', '0:37:15', '[{"i":0,"distance":5458,"distancetime":700,"distancetimetext":"12 мин.","parkingTime":"00:05","start":"06:12","coming":"6:24","departure":"6:29","key_i":0},{"i":1,"distance":6442,"distancetime":742,"distancetimetext":"12 мин.","parkingTime":"00:06","start":"6:29","coming":"6:41","departure":"6:47","key_i":1},{"i":2,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","parkingTime":"00:07","start":"6:47","coming":"7:00","departure":"7:07","key_i":2}]'),
(133, 15, '[{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"}]', '07:10', '233.562', '6:52:56', '[{"i":0,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","parkingTime":"00:01","start":"07:10","coming":"7:30","departure":"7:31","key_i":0},{"i":1,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","parkingTime":"00:02","start":"7:31","coming":"7:45","departure":"7:47","key_i":1},{"i":2,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:03","start":"7:47","coming":"8:04","departure":"8:07","key_i":2},{"i":3,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","parkingTime":"00:04","start":"8:07","coming":"8:12","departure":"8:16","key_i":3},{"i":4,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","parkingTime":"00:05","start":"8:16","coming":"8:29","departure":"8:34","key_i":4},{"i":5,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","parkingTime":"00:06","start":"8:34","coming":"8:54","departure":"8:60","key_i":5},{"i":6,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","parkingTime":"00:07","start":"8:60","coming":"9:14","departure":"9:21","key_i":6},{"i":7,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:08","start":"9:21","coming":"9:38","departure":"9:46","key_i":7},{"i":8,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","parkingTime":"00:09","start":"9:46","coming":"9:51","departure":"10:00","key_i":8},{"i":9,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","parkingTime":"00:10","start":"10:00","coming":"10:13","departure":"10:23","key_i":9},{"i":10,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","parkingTime":"00:11","start":"10:23","coming":"10:43","departure":"10:54","key_i":10},{"i":11,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","parkingTime":"00:12","start":"10:54","coming":"11:8","departure":"11:20","key_i":11},{"i":12,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:13","start":"11:20","coming":"11:37","departure":"11:50","key_i":12},{"i":13,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","parkingTime":"00:14","start":"11:50","coming":"11:55","departure":"12:09","key_i":13},{"i":14,"distance":7993,"distancetime":801,"distancetimetext":"13 мин.","parkingTime":"00:15","start":"12:09","coming":"12:22","departure":"12:37","key_i":14},{"i":15,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","parkingTime":"00:16","start":"12:37","coming":"12:51","departure":"13:7","key_i":15},{"i":16,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:17","start":"13:7","coming":"13:24","departure":"13:41","key_i":16},{"i":17,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","parkingTime":"00:18","start":"13:41","coming":"13:46","departure":"14:04","key_i":17},{"i":18,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","parkingTime":"00:19","start":"14:04","coming":"14:17","departure":"14:36","key_i":18},{"i":19,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","parkingTime":"00:20","start":"14:36","coming":"14:56","departure":"15:16","key_i":19},{"i":20,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","parkingTime":"00:21","start":"15:16","coming":"15:30","departure":"15:51","key_i":20},{"i":21,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:22","start":"15:51","coming":"16:08","departure":"16:30","key_i":21},{"i":22,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","parkingTime":"00:23","start":"16:30","coming":"16:35","departure":"16:58","key_i":22},{"i":23,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","parkingTime":"00:24","start":"16:58","coming":"17:11","departure":"17:35","key_i":23},{"i":24,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","parkingTime":"00:25","start":"17:35","coming":"17:55","departure":"18:20","key_i":24},{"i":25,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","parkingTime":"00:26","start":"18:20","coming":"18:34","departure":"18:60","key_i":25},{"i":26,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:27","start":"18:60","coming":"19:17","departure":"19:44","key_i":26},{"i":27,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","parkingTime":"00:28","start":"19:44","coming":"19:49","departure":"20:17","key_i":27},{"i":28,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","parkingTime":"00:29","start":"20:17","coming":"20:30","departure":"20:59","key_i":28},{"i":29,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","parkingTime":"00:30","start":"20:59","coming":"21:19","departure":"21:49","key_i":29}]'),
(134, 16, '[{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"}]', '07:10', '139.535', '4:08:13', '[{"i":0,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","parkingTime":"00:01","start":"07:10","coming":"7:30","departure":"7:31","key_i":0},{"i":1,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","parkingTime":"00:02","start":"7:31","coming":"7:45","departure":"7:47","key_i":1},{"i":2,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:03","start":"7:47","coming":"8:04","departure":"8:07","key_i":2},{"i":3,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","parkingTime":"00:04","start":"8:07","coming":"8:12","departure":"8:16","key_i":3},{"i":4,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","parkingTime":"00:05","start":"8:16","coming":"8:29","departure":"8:34","key_i":4},{"i":5,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","parkingTime":"00:06","start":"8:34","coming":"8:54","departure":"8:60","key_i":5},{"i":6,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","parkingTime":"00:07","start":"8:60","coming":"9:14","departure":"9:21","key_i":6},{"i":7,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:08","start":"9:21","coming":"9:38","departure":"9:46","key_i":7},{"i":8,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","parkingTime":"00:09","start":"9:46","coming":"9:51","departure":"10:00","key_i":8},{"i":9,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","parkingTime":"00:10","start":"10:00","coming":"10:13","departure":"10:23","key_i":9},{"i":10,"distance":5458,"distancetime":700,"distancetimetext":"12 мин.","parkingTime":"00:11","start":"10:23","coming":"10:35","departure":"10:46","key_i":10},{"i":11,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:12","start":"10:46","coming":"11:03","departure":"11:15","key_i":11},{"i":12,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","parkingTime":"00:13","start":"11:15","coming":"11:20","departure":"11:33","key_i":12},{"i":13,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","parkingTime":"00:14","start":"11:33","coming":"11:46","departure":"12:00","key_i":13},{"i":14,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","parkingTime":"00:15","start":"12:00","coming":"12:20","departure":"12:35","key_i":14},{"i":15,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","parkingTime":"00:16","start":"12:35","coming":"12:49","departure":"13:5","key_i":15},{"i":16,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:17","start":"13:5","coming":"13:22","departure":"13:39","key_i":16},{"i":17,"distance":7943,"distancetime":788,"distancetimetext":"13 мин.","parkingTime":"00:18","start":"13:39","coming":"13:52","departure":"14:10","key_i":17}]'),
(135, 17, '[{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91004","addressDesc":"г. Луганск Остаря могила, 151"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"},{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"}]', '07:10', '139.535', '4:08:13', '[{"i":0,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","parkingTime":"00:01","start":"07:10","coming":"7:30","departure":"7:31","key_i":0},{"i":1,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","parkingTime":"00:02","start":"7:31","coming":"7:45","departure":"7:47","key_i":1},{"i":2,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:03","start":"7:47","coming":"8:04","departure":"8:07","key_i":2},{"i":3,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","parkingTime":"00:04","start":"8:07","coming":"8:12","departure":"8:16","key_i":3},{"i":4,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","parkingTime":"00:05","start":"8:16","coming":"8:29","departure":"8:34","key_i":4},{"i":5,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","parkingTime":"00:06","start":"8:34","coming":"8:54","departure":"8:60","key_i":5},{"i":6,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","parkingTime":"00:07","start":"8:60","coming":"9:14","departure":"9:21","key_i":6},{"i":7,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:08","start":"9:21","coming":"9:38","departure":"9:46","key_i":7},{"i":8,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","parkingTime":"00:09","start":"9:46","coming":"9:51","departure":"10:00","key_i":8},{"i":9,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","parkingTime":"00:10","start":"10:00","coming":"10:13","departure":"10:23","key_i":9},{"i":10,"distance":5458,"distancetime":700,"distancetimetext":"12 мин.","parkingTime":"00:11","start":"10:23","coming":"10:35","departure":"10:46","key_i":10},{"i":11,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:12","start":"10:46","coming":"11:03","departure":"11:15","key_i":11},{"i":12,"distance":3243,"distancetime":306,"distancetimetext":"5 мин.","parkingTime":"00:13","start":"11:15","coming":"11:20","departure":"11:33","key_i":12},{"i":13,"distance":7051,"distancetime":793,"distancetimetext":"13 мин.","parkingTime":"00:14","start":"11:33","coming":"11:46","departure":"12:00","key_i":13},{"i":14,"distance":10677,"distancetime":1172,"distancetimetext":"20 мин.","parkingTime":"00:15","start":"12:00","coming":"12:20","departure":"12:35","key_i":14},{"i":15,"distance":7975,"distancetime":836,"distancetimetext":"14 мин.","parkingTime":"00:16","start":"12:35","coming":"12:49","departure":"13:5","key_i":15},{"i":16,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:17","start":"13:5","coming":"13:22","departure":"13:39","key_i":16},{"i":17,"distance":7943,"distancetime":788,"distancetimetext":"13 мин.","parkingTime":"00:18","start":"13:39","coming":"13:52","departure":"14:10","key_i":17}]'),
(136, 12, '[{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"},{"indexmail":"91006","addressDesc":"г. Луганск, ул. Героев Сталинграда, 9а"}]', '07:10', '15.282', '0:28:41', '[{"i":0,"distance":5458,"distancetime":700,"distancetimetext":"12 мин.","parkingTime":"00:12","start":"07:10","coming":"7:22","departure":"7:34","key_i":0},{"i":1,"distance":9824,"distancetime":1021,"distancetimetext":"17 мин.","parkingTime":"00:34","start":"7:34","coming":"7:51","departure":"8:25","key_i":1}]');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `centerspost`
--
ALTER TABLE `centerspost`
  ADD PRIMARY KEY (`idcenterspost`);

--
-- Индексы таблицы `distancesmatrix`
--
ALTER TABLE `distancesmatrix`
  ADD PRIMARY KEY (`idistancesmatrix`);

--
-- Индексы таблицы `lugansk`
--
ALTER TABLE `lugansk`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `postcenters`
--
ALTER TABLE `postcenters`
  ADD PRIMARY KEY (`idcenter`);

--
-- Индексы таблицы `route`
--
ALTER TABLE `route`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numberoute` (`numberoute`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `centerspost`
--
ALTER TABLE `centerspost`
  MODIFY `idcenterspost` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT для таблицы `distancesmatrix`
--
ALTER TABLE `distancesmatrix`
  MODIFY `idistancesmatrix` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=176;
--
-- AUTO_INCREMENT для таблицы `lugansk`
--
ALTER TABLE `lugansk`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT для таблицы `postcenters`
--
ALTER TABLE `postcenters`
  MODIFY `idcenter` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `route`
--
ALTER TABLE `route`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
