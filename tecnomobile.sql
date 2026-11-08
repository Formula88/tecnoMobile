-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: tecnomobile
-- ------------------------------------------------------
-- Server version	8.0.46-0ubuntu0.24.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` enum('mobile','hardware','accessory') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'اپل','mobile'),(2,'سامسونگ','mobile'),(3,'شیائومی','mobile'),(4,'هواوی','mobile'),(5,'آنر','mobile'),(6,'ایسوس','hardware'),(7,'ام‌اس‌آی','hardware'),(8,'گیگابایت','hardware'),(9,'اینتل','hardware'),(10,'انویدیا','hardware'),(11,'انکر','accessory'),(12,'باسئوس','accessory');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitems`
--

DROP TABLE IF EXISTS `orderitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `ItemGroup` varchar(100) NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `price` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitems`
--

LOCK TABLES `orderitems` WRITE;
/*!40000 ALTER TABLE `orderitems` DISABLE KEYS */;
INSERT INTO `orderitems` VALUES (1,1,'product',10,4,65280000);
/*!40000 ALTER TABLE `orderitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `totalPrice` bigint NOT NULL,
  `address` text NOT NULL,
  `codePost` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,10,261270000,'یه جایی اون دور دورا','1111111111','09129072416','Ali','sent','2026-11-09 00:59:49');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` bigint unsigned NOT NULL,
  `discount` bigint unsigned NOT NULL DEFAULT '0',
  `brandId` int NOT NULL,
  `productType` enum('mobile','hardware','accessories','accessoriesmodel') NOT NULL,
  `imgs` json NOT NULL,
  `details` text NOT NULL,
  `extra` json DEFAULT NULL,
  `dateAdded` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `showInHome` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_brand` (`brandId`),
  KEY `idx_type` (`productType`),
  KEY `idx_home` (`showInHome`),
  KEY `idx_date` (`dateAdded`),
  CONSTRAINT `Product_ibfk_1` FOREIGN KEY (`brandId`) REFERENCES `brands` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'گوشی موبایل اپل iPhone 15 Pro Max ظرفیت 256 گیگابایت','پرچمدار بی‌نظیر اپل با بدنه تیتانیومی مقاوم، پردازنده قدرتمند A17 Pro و دوربین 48 مگاپیکسلی با زوم 5 برابری اپتیکال.',86500000,5,1,'mobile','[{\"small\": \"upload/small/prod_1_iphone_15_pro_max.webp\", \"medium\": \"upload/medium/prod_1_iphone_15_pro_max.webp\", \"original\": \"upload/original/prod_1_iphone_15_pro_max.webp\"}]','گوشی آیفون 15 پرو مکس با درگاه مدرن USB-C 3.0، نرخ نوسازی 120 هرتز ProMotion و صفحه‌نمایش Super Retina XDR OLED نهایت سرعت و کیفیت را ارائه می‌دهد.','{\"status\": \"موجود\", \"warranty\": 18, \"phoneType\": \"پرچمدار\", \"phoneInformation\": {\"cpu\": \"Apple A17 Pro (3nm)\", \"camera\": \"48 + 12 + 12 MP (5x Optical)\", \"memory\": \"256\", \"battery\": \"4422\"}}','2026-11-09 00:53:50',1),(2,'گوشی موبایل اپل iPhone 15 ظرفیت 128 گیگابایت','آیفون نسل جدید با طراحی جزیره پویا (Dynamic Island)، دوربین پیشرفته 48 مگاپیکسلی و بدنه شیشه‌ای مات خوش‌دست.',54000000,0,1,'mobile','[{\"small\": \"upload/small/prod_2_iphone_15.webp\", \"medium\": \"upload/medium/prod_2_iphone_15.webp\", \"original\": \"upload/original/prod_2_iphone_15.webp\"}]','مجهز به پورت شارژ تایپ‌سی، پردازنده A16 Bionic و نمایشگر با روشنایی فوق‌العاده 2000 نیت زیر نور مستقیم خورشید.','{\"status\": \"موجود\", \"warranty\": 18, \"phoneType\": \"پرچمدار\", \"phoneInformation\": {\"cpu\": \"Apple A16 Bionic\", \"camera\": \"48 + 12 MP\", \"memory\": \"128\", \"battery\": \"3349\"}}','2026-11-09 00:53:51',1),(3,'گوشی موبایل اپل iPhone 13 Pro ظرفیت 256 گیگابایت','یکی از محبوب‌ترین پرچمداران اپل با نمایشگر 120 هرتز، پردازنده A15 Bionic و بدنه استیل براق ضدخش.',62000000,8,1,'mobile','[{\"small\": \"upload/small/prod_3_iphone_13_pro.webp\", \"medium\": \"upload/medium/prod_3_iphone_13_pro.webp\", \"original\": \"upload/original/prod_3_iphone_13_pro.webp\"}]','دارای سیستم دوربین سه‌گانه حرفه‌ای با سنسور لیدار (LiDAR)، باتری با دوام عالی و ضبط ویدیوی ProRes.','{\"status\": \"موجود\", \"warranty\": 12, \"phoneType\": \"پرچمدار\", \"phoneInformation\": {\"cpu\": \"Apple A15 Bionic\", \"camera\": \"12 + 12 + 12 MP\", \"memory\": \"256\", \"battery\": \"3095\"}}','2026-11-09 00:53:52',0),(4,'گوشی موبایل سامسونگ Galaxy S24 Ultra ظرفیت 256 گیگابایت','شاهکار هوش مصنوعی سامسونگ (Galaxy AI) همراه با قلم هوشمند S-Pen، بدنه تیتانیومی و دوربین شگفت‌انگیز 200 مگاپیکسلی.',72500000,4,2,'mobile','[{\"small\": \"upload/small/prod_4_samsung_s24_ultra.webp\", \"medium\": \"upload/medium/prod_4_samsung_s24_ultra.webp\", \"original\": \"upload/original/prod_4_samsung_s24_ultra.webp\"}]','نمایشگر بدون انعکاس Dynamic AMOLED 2X، چیپست Snapdragon 8 Gen 3 for Galaxy و پشتیبانی از 7 سال آپدیت نرم‌افزاری.','{\"status\": \"موجود\", \"warranty\": 18, \"phoneType\": \"پرچمدار\", \"phoneInformation\": {\"cpu\": \"Snapdragon 8 Gen 3 (4nm)\", \"camera\": \"200 + 50 + 12 + 10 MP\", \"memory\": \"256\", \"battery\": \"5000\"}}','2026-11-09 00:53:54',1),(5,'گوشی موبایل سامسونگ Galaxy S23 FE 5G ظرفیت 256 گیگابایت','قاتل پرچمدار محبوب سامسونگ با طراحی مدرن، دوربین باکیفیت و عملکرد روان در بازی‌های سنگین.',27800000,6,2,'mobile','[{\"small\": \"upload/small/prod_5_samsung_s23_fe.webp\", \"medium\": \"upload/medium/prod_5_samsung_s23_fe.webp\", \"original\": \"upload/original/prod_5_samsung_s23_fe.webp\"}]','مجهز به فریم آلومینیومی، گواهی ضدآب IP68، نمایشگر 120 هرتز Dynamic AMOLED و شارژ سریع 25 وات.','{\"status\": \"موجود\", \"warranty\": 18, \"phoneType\": \"میان‌رده ویژه\", \"phoneInformation\": {\"cpu\": \"Exynos 2200 (4nm)\", \"camera\": \"50 + 12 + 8 MP\", \"memory\": \"256\", \"battery\": \"4500\"}}','2026-11-09 00:53:56',0),(6,'گوشی موبایل سامسونگ Galaxy A55 5G ظرفیت 256 گیگابایت','پرفروش‌ترین میان‌رده بازار با فریم فلزی جذاب، نمایشگر باکیفیت و محافظ شیشه‌ای Gorilla Glass Victus+.',21500000,3,2,'mobile','[{\"small\": \"upload/small/prod_6_samsung_a55.webp\", \"medium\": \"upload/medium/prod_6_samsung_a55.webp\", \"original\": \"upload/original/prod_6_samsung_a55.webp\"}]','چیپست بهینه Exynos 1480 با پردازش گرافیکی AMD Xclipse 530، اسپیکرهای استریو و پشتیبانی از رم مجازی.','{\"status\": \"موجود\", \"warranty\": 18, \"phoneType\": \"میان‌رده\", \"phoneInformation\": {\"cpu\": \"Exynos 1480\", \"camera\": \"50 + 12 + 5 MP\", \"memory\": \"256\", \"battery\": \"5000\"}}','2026-11-09 00:53:57',0),(7,'گوشی موبایل شیائومی 14 Ultra ظرفیت 512 گیگابایت','غول عکاسی جهان با لنزهای اپتیکال لایکا (Leica)، سنسور 1 اینچی و پردازنده فوق‌العاده Snapdragon 8 Gen 3.',79000000,5,3,'mobile','[{\"small\": \"upload/small/prod_7_xiaomi_14_ultra.webp\", \"medium\": \"upload/medium/prod_7_xiaomi_14_ultra.webp\", \"original\": \"upload/original/prod_7_xiaomi_14_ultra.webp\"}]','طراحی چرمی لوکس، نمایشگر WQHD+ با روشنایی 3000 نیت و شارژ توربو شارژ 90 وات به همراه شارژ وایرلس 80 وات.','{\"status\": \"موجود\", \"warranty\": 18, \"phoneType\": \"پرچمدار\", \"phoneInformation\": {\"cpu\": \"Snapdragon 8 Gen 3\", \"camera\": \"50 + 50 + 50 + 50 MP (Leica)\", \"memory\": \"512\", \"battery\": \"5000\"}}','2026-11-09 00:53:59',1),(8,'گوشی موبایل شیائومی Redmi Note 13 Pro Plus 5G ظرفیت 512 گیگابایت','میان‌رده بی‌رقیب با دوربین 200 مگاپیکسلی، نمایشگر منحنی CrystalRes AMOLED و شارژ خارق‌العاده 120 وات هایپرشارژ.',24800000,7,3,'mobile','[{\"small\": \"upload/small/prod_8_redmi_note_13_pro_plus.webp\", \"medium\": \"upload/medium/prod_8_redmi_note_13_pro_plus.webp\", \"original\": \"upload/original/prod_8_redmi_note_13_pro_plus.webp\"}]','ضدآب کامل با گواهی IP68، پردازنده قدرتمند دایمنسیتی 7200 اولترا و حافظه رم 12 گیگابایت برای مالتی‌تسکینگ بی‌نقص.','{\"status\": \"موجود\", \"warranty\": 18, \"phoneType\": \"میان‌رده پیشرفته\", \"phoneInformation\": {\"cpu\": \"MediaTek Dimensity 7200 Ultra\", \"camera\": \"200 + 8 + 2 MP\", \"memory\": \"512\", \"battery\": \"5000\"}}','2026-11-09 00:54:00',0),(9,'گوشی موبایل شیائومی POCO X6 Pro 5G ظرفیت 512 گیگابایت','پادشاه بلامنازع گیمینگ اقتصادی با چیپست پرچمدار دایمنسیتی 8300 اولترا و نمایشگر 120 هرتز Flow AMOLED.',19900000,5,3,'mobile','[{\"small\": \"upload/small/prod_9_poco_x6_pro.webp\", \"medium\": \"upload/medium/prod_9_poco_x6_pro.webp\", \"original\": \"upload/original/prod_9_poco_x6_pro.webp\"}]','سیستم عامل شیائومی HyperOS، رم 12 گیگابایتی LPDDR5X، حافظه بسیار سریع UFS 4.0 و شارژ سریع 67 وات توربو.','{\"status\": \"موجود\", \"warranty\": 18, \"phoneType\": \"گیمینگ\", \"phoneInformation\": {\"cpu\": \"Dimensity 8300 Ultra\", \"camera\": \"64 + 8 + 2 MP\", \"memory\": \"512\", \"battery\": \"5000\"}}','2026-11-09 00:54:02',0),(10,'گوشی موبایل آنر Magic 6 Pro 5G ظرفیت 512 گیگابایت','برترین گوشی هوشمند از نظر دگزومارک در رده باتری و نمایشگر با دوربین تلسکوپی پریسکوپ 180 مگاپیکسلی.',68000000,4,5,'mobile','[{\"small\": \"upload/small/prod_10_honor_magic_6_pro.webp\", \"medium\": \"upload/medium/prod_10_honor_magic_6_pro.webp\", \"original\": \"upload/original/prod_10_honor_magic_6_pro.webp\"}]','باتری سیلیکون-کربن نسل دوم با دوام خیره‌کننده، قابلیت تماس ماهواره‌ای و نمایشگر ضدضربه NanoCrystal Shield.','{\"status\": \"موجود\", \"warranty\": 18, \"phoneType\": \"پرچمدار\", \"phoneInformation\": {\"cpu\": \"Snapdragon 8 Gen 3\", \"camera\": \"50 + 180 + 50 MP\", \"memory\": \"512\", \"battery\": \"5600\"}}','2026-11-09 00:54:05',0),(11,'کارت گرافیک ایسوس ROG Strix GeForce RTX 4090 OC 24GB','قوی‌ترین کارت گرافیک جهان برای گیمینگ 4K با بالاترین نرخ فریم، هوش مصنوعی DLSS 3.5 و سیستم خنک‌کننده 3.5 اسلاتی.',145000000,3,6,'hardware','[{\"small\": \"upload/small/prod_11_asus_rtx_4090.webp\", \"medium\": \"upload/medium/prod_11_asus_rtx_4090.webp\", \"original\": \"upload/original/prod_11_asus_rtx_4090.webp\"}]','دارای 16384 هسته کودا، حافظه 24 گیگابایتی GDDR6X با باس 384 بیت و هدرهای فن اختصاصی FanConnect II.','{\"status\": \"موجود\", \"warranty\": 36, \"hardwareInformation\": {\"core\": \"16384 CUDA Cores\", \"cache\": \"72MB L2 Cache\", \"clock\": \"2640 MHz (OC Mode)\", \"thread\": \"DLSS 3.5 Ray Tracing\"}}','2026-11-09 00:54:07',1),(12,'کارت گرافیک ام‌اس‌آی GeForce RTX 4070 Ti SUPER 16GB Gaming X Slim','کارت گرافیک قدرتمند گیمینگ 1440p و 4K با طراحی باریک، 16 گیگابایت رم و سیستم خنک‌کننده کم‌صدا Tri Frozr 3.',64500000,5,7,'hardware','[{\"small\": \"upload/small/prod_12_msi_rtx_4070ti.webp\", \"medium\": \"upload/medium/prod_12_msi_rtx_4070ti.webp\", \"original\": \"upload/original/prod_12_msi_rtx_4070ti.webp\"}]','پشتیبانی از فناوری نورپردازی Mystic Light RGB، بلبرینگ دوگانه فن‌های TORX FAN 5.0 و بک‌پلیت فلزی مستحکم.','{\"status\": \"موجود\", \"warranty\": 24, \"hardwareInformation\": {\"core\": \"8448 CUDA Cores\", \"cache\": \"48MB L2 Cache\", \"clock\": \"2670 MHz Boost\", \"thread\": \"16GB GDDR6X 256-bit\"}}','2026-11-09 00:54:08',1),(13,'پردازنده اینتل Core i9-14900K Raptor Lake Refresh','سریع‌ترین پردازنده دسکتاپ اینتل با 24 هسته، فرکانس بوست خارق‌العاده 6.0 گیگاهرتز و فناوری Thermal Velocity Boost.',38900000,4,9,'hardware','[{\"small\": \"upload/small/prod_13_intel_i9_14900k.webp\", \"medium\": \"upload/medium/prod_13_intel_i9_14900k.webp\", \"original\": \"upload/original/prod_13_intel_i9_14900k.webp\"}]','ترکیب 8 هسته پرقدرت (P-core) و 16 هسته کم‌مصرف (E-core)، سوکت LGA1700 با پشتیبانی همزمان از رم‌های DDR4 و DDR5.','{\"status\": \"موجود\", \"warranty\": 12, \"hardwareInformation\": {\"core\": \"24 (8P + 16E)\", \"cache\": \"36MB Intel Smart Cache\", \"clock\": \"6.0 GHz Turbo\", \"thread\": \"32 Threads\"}}','2026-11-09 00:54:09',1),(14,'پردازنده اینتل Core i7-14700K باکس','بهترین پردازنده گیمینگ و رندرینگ برای کاربران حرفه‌ای با 20 هسته فیزیکی و فرکانس بوست 5.6 گیگاهرتز.',28500000,0,9,'hardware','[{\"small\": \"upload/small/prod_14_intel_i7_14700k.webp\", \"medium\": \"upload/medium/prod_14_intel_i7_14700k.webp\", \"original\": \"upload/original/prod_14_intel_i7_14700k.webp\"}]','ارتقای چشمگیر نسبت به نسل قبل با افزایش تعداد هسته‌های کم‌مصرف، کش هوشمند 33 مگابایتی و گرافیک داخلی UHD 770.','{\"status\": \"موجود\", \"warranty\": 12, \"hardwareInformation\": {\"core\": \"20 (8P + 12E)\", \"cache\": \"33MB Intel Smart Cache\", \"clock\": \"5.6 GHz Turbo\", \"thread\": \"28 Threads\"}}','2026-11-09 00:54:11',0),(15,'مادربرد ایسوس ROG Maximus Z790 Dark Hero','پرچمدار مادربردهای گیمینگ با مدار تغذیه 20+1 فاز، اسلات PCIe 5.0 M.2، وای‌فای 7 (WiFi 7) و پورت‌های دوگانه تاندربولت 4.',49000000,6,6,'hardware','[{\"small\": \"upload/small/prod_15_asus_z790_dark_hero.webp\", \"medium\": \"upload/medium/prod_15_asus_z790_dark_hero.webp\", \"original\": \"upload/original/prod_15_asus_z790_dark_hero.webp\"}]','سیستم هوش مصنوعی اورکلاک AI Overclocking، نورپردازی آر‌جی‌بی Polymo Lighting و هیت‌سینک‌های حجیم یکپارچه.','{\"status\": \"موجود\", \"warranty\": 36, \"hardwareInformation\": {\"core\": \"LGA 1700 Socket\", \"cache\": \"PCIe 5.0 M.2 Slot\", \"clock\": \"WiFi 7 + 2.5G LAN\", \"thread\": \"DDR5 8000+ MT/s\"}}','2026-11-09 00:54:13',0),(16,'مادربرد ام‌اس‌آی MAG B760 TOMAHAWK WIFI DDR5','محبوب‌ترین مادربرد رده متوسط برای پردازنده‌های نسل 13 و 14 اینتل با پایداری استثنایی و خنک‌کننده M.2 Shield Frozr.',14200000,0,7,'hardware','[{\"small\": \"upload/small/prod_16_msi_b760_tomahawk.webp\", \"medium\": \"upload/medium/prod_16_msi_b760_tomahawk.webp\", \"original\": \"upload/original/prod_16_msi_b760_tomahawk.webp\"}]','مدار تغذیه 12+1+1 فاز دیجیتال، کارت شبکه 2.5G به همراه وای‌فای 6E و کدک صوتی باکیفیت Realtek ALC897.','{\"status\": \"موجود\", \"warranty\": 36, \"hardwareInformation\": {\"core\": \"LGA 1700 Socket\", \"cache\": \"3x M.2 Gen4 Slots\", \"clock\": \"Lightning Gen 5 PCIe\", \"thread\": \"4x DDR5 Slots 7000+ MHz\"}}','2026-11-09 00:54:15',0),(17,'رم گیگابایت AORUS RGB 32GB (2x16GB) DDR5 6000MHz CL30','کیت حافظه رم دوکاناله پرسرعت DDR5 با هیت‌سینک مسی-آلومینیومی مشکی و نورپردازی ARGB کاملاً قابل برنامه‌ریزی.',8900000,5,8,'hardware','[{\"small\": \"upload/small/prod_17_aorus_ddr5_ram.webp\", \"medium\": \"upload/medium/prod_17_aorus_ddr5_ram.webp\", \"original\": \"upload/original/prod_17_aorus_ddr5_ram.webp\"}]','پشتیبانی کامل از پروفایل‌های Intel XMP 3.0 و AMD EXPO با تایمینگ فوق‌العاده سریع CL30 برای کمترین میزان تاخیر در گیمینگ.','{\"status\": \"موجود\", \"warranty\": 60, \"hardwareInformation\": {\"core\": \"32GB (2x16GB)\", \"cache\": \"Latency CL30-36-36-76\", \"clock\": \"6000 MHz XMP/EXPO\", \"thread\": \"Dual Channel Kit\"}}','2026-11-09 00:54:16',0),(18,'کارت گرافیک گیگابایت GeForce RTX 4060 EAGLE OC 8GB','کارت گرافیک خنک و اقتصادی برای گیمینگ 1080p با 3 فن WINDFORCE، مصرف برق پایین و پشتیبانی از DLSS 3.',23500000,6,8,'hardware','[{\"small\": \"upload/small/prod_18_gigabyte_rtx_4060.webp\", \"medium\": \"upload/medium/prod_18_gigabyte_rtx_4060.webp\", \"original\": \"upload/original/prod_18_gigabyte_rtx_4060.webp\"}]','سیستم چرخش معکوس فن مرکزی جهت کاهش تلاطم هوا، محافظ پشت فلزی محکم و سوئیچ دوگانه بایوس Dual BIOS.','{\"status\": \"موجود\", \"warranty\": 36, \"hardwareInformation\": {\"core\": \"3072 CUDA Cores\", \"cache\": \"24MB L2 Cache\", \"clock\": \"2505 MHz OC\", \"thread\": \"8GB GDDR6 128-bit\"}}','2026-11-09 00:54:18',0),(19,'اس‌اس‌دی اینترنال سامسونگ 990 PRO NVMe M.2 2TB','سریع‌ترین حافظه اس‌اس‌دی PCIe 4.0 جهان با سرعت خواندن سرسام‌آور 7450 مگابایت بر ثانیه و طول عمر بالا.',12800000,8,2,'hardware','[{\"small\": \"upload/small/prod_19_samsung_990_pro.webp\", \"medium\": \"upload/medium/prod_19_samsung_990_pro.webp\", \"original\": \"upload/original/prod_19_samsung_990_pro.webp\"}]','سازگاری کامل با پلی‌استیشن 5 (PS5) و سیستم‌های گیمینگ، کنترلر اختصاصی پاسکال سامسونگ با روکش نیکل خنک‌کننده.','{\"status\": \"موجود\", \"warranty\": 24, \"hardwareInformation\": {\"core\": \"2000GB (2TB)\", \"cache\": \"2GB LPDDR4 DRAM\", \"clock\": \"7450 MB/s Read, 6900 MB/s Write\", \"thread\": \"PCIe Gen 4.0 x4\"}}','2026-11-09 00:54:20',0),(20,'خنک‌کننده مایع پردازنده ایسوس ROG Ryujin III 360 ARGB','خنک‌کننده پرچمدار مایع 360 میلی‌متری با نمایشگر 3.5 اینچی LCD تمام‌رنگی، پمپ نسل هشتم Asetek و فن‌های مگنتی ARGB.',26900000,5,6,'hardware','[{\"small\": \"upload/small/prod_20_asus_ryujin_3.webp\", \"medium\": \"upload/medium/prod_20_asus_ryujin_3.webp\", \"original\": \"upload/original/prod_20_asus_ryujin_3.webp\"}]','قابلیت نمایش انیمیشن‌های سفارشی GIF و پایش دمای سخت‌افزار روی نمایشگر، فن توکار درون واترپمپ برای خنک‌سازی VRM مادربرد.','{\"status\": \"موجود\", \"warranty\": 60, \"hardwareInformation\": {\"core\": \"360mm Radiator\", \"cache\": \"3.5\\\" Full Color LCD (60Hz)\", \"clock\": \"8th Gen Asetek Pump (3600 RPM)\", \"thread\": \"3x 120mm Magnetic Daisy-Chain Fans\"}}','2026-11-09 00:54:21',0),(21,'پاوربانک 140 وات انکر مدل 737 PowerCore 24K ظرفیت 24000 میلی‌آمپر','غول پاوربانک‌های هوشمند جهان با توان خروجی 140 وات Power Delivery 3.1، صفحه نمایش رنگی دیجیتال و شارژ همزمان مک‌بوک و گوشی.',7800000,7,11,'accessories','[{\"small\": \"upload/small/prod_21_anker_737_powerbank.webp\", \"medium\": \"upload/medium/prod_21_anker_737_powerbank.webp\", \"original\": \"upload/original/prod_21_anker_737_powerbank.webp\"}]','دارای تکنولوژی GaNPrime جهت ایمنی بالا در حرارت، پایش زنده سلامت باتری و زمان باقی‌مانده شارژ روی صفحه OLED.','{\"color\": \"مشکی خاکستری\", \"status\": \"موجود\", \"warranty\": 18}','2026-11-09 00:54:23',1),(22,'شارژر دیواری 65 وات باسئوس مدل GaN5 Pro سه پورت','آداپتور فوق‌سریع و جمع‌وجور بر پایه فناوری نیترید گالیوم نسل 5 با 2 درگاه تایپ‌سی و 1 درگاه USB-A استاندارد.',1950000,10,12,'accessories','[{\"small\": \"upload/small/prod_22_baseus_gan5_charger.webp\", \"medium\": \"upload/medium/prod_22_baseus_gan5_charger.webp\", \"original\": \"upload/original/prod_22_baseus_gan5_charger.webp\"}]','پشتیبانی از فناوری‌های شارژ سریع QC 4.0، PD 3.0 و PPS، همراه با کابل 100 وات باکیفیت 1 متری تایپ‌سی درون بسته‌بندی.','{\"color\": \"سفید مات\", \"status\": \"موجود\", \"warranty\": 12}','2026-11-09 00:54:24',1),(23,'هندزفری بلوتوثی انکر Soundcore Liberty 4 NC','پادشاه نویزکنسلینگ اقتصادی با سیستم نویزکنسلینگ فعال پیشرفته 98.5%، درایورهای 11 میلی‌متری و کدک صوتی باکیفیت LDAC.',4350000,6,11,'accessories','[{\"small\": \"upload/small/prod_23_anker_liberty_4_nc.webp\", \"medium\": \"upload/medium/prod_23_anker_liberty_4_nc.webp\", \"original\": \"upload/original/prod_23_anker_liberty_4_nc.webp\"}]','شارژدهی ترکیبی تا 50 ساعت با کیس، گواهی ضدآب IPX4، بلوتوث 5.3 با اتصال سریع همزمان به دو دستگاه Multipoint.','{\"color\": \"سرمه‌ای تیره\", \"status\": \"موجود\", \"warranty\": 18}','2026-11-09 00:54:26',0),(24,'کابل تبدیل USB-C به Lightning انکر مدل PowerLine III Plus','کابل مقاوم با روکش کنفی ضدپارگی نایلونی، تاییدیه رسمی اپل MFi و تحمل بیش از 35,000 بار خمیدگی بدون قطعی.',890000,0,11,'accessories','[{\"small\": \"upload/small/prod_24_anker_powerline_cable.webp\", \"medium\": \"upload/medium/prod_24_anker_powerline_cable.webp\", \"original\": \"upload/original/prod_24_anker_powerline_cable.webp\"}]','انتقال شارژ سریع تا 60 وات، سازگاری کامل با تمامی مدل‌های آیفون و آیپد بدون اخطار ناسازگاری در iOS.','{\"color\": \"مشکی\", \"status\": \"موجود\", \"warranty\": 12}','2026-11-09 00:54:29',0),(25,'پایه نگهدارنده و هولدر رومیزی آلومینیومی موبایل و تبلت باسئوس','استند تمام فلزی تاشو با قابلیت چرخش 360 درجه، شیار ضدلغزش سیلیکونی و تحمل وزن سنگین‌ترین تبلت‌ها.',690000,15,12,'accessories','[{\"small\": \"upload/small/prod_25_baseus_phone_stand.webp\", \"medium\": \"upload/medium/prod_25_baseus_phone_stand.webp\", \"original\": \"upload/original/prod_25_baseus_phone_stand.webp\"}]','طراحی زاویه‌پذیر ارگونومیک، کاهش خستگی گردن هنگام تماشای فیلم و مطالعه، با شیار عبور کابل شارژ از زیر پایه.','{\"color\": \"خاکستری تیره (Space Gray)\", \"status\": \"موجود\", \"warranty\": 6}','2026-11-09 00:54:31',0),(26,'هاب 8 پورت USB-C باسئوس مدل Metal Gleam Series','مبدل چندکاره با بدنه آلومینیومی باکیفیت شامل پورت HDMI 4K@60Hz، پورت شبکه گیگابیت، شارژ 100 وات PD و رم‌ریدر.',2850000,5,12,'accessories','[{\"small\": \"upload/small/prod_26_baseus_metal_gleam_hub.webp\", \"medium\": \"upload/medium/prod_26_baseus_metal_gleam_hub.webp\", \"original\": \"upload/original/prod_26_baseus_metal_gleam_hub.webp\"}]','سازگار با انواع مک‌بوک، سرفیس، لپ‌تاپ‌های ویندوزی و تبلت‌های iPad Pro بدون نیاز به نصب درایور Plug & Play.','{\"color\": \"خاکستری متالیک\", \"status\": \"موجود\", \"warranty\": 12}','2026-11-09 00:54:33',0),(27,'پاوربانک وایرلس مگ‌سیف 10000 میلی‌آمپر باسئوس با استند تاشو','پاوربانک شارژ مغناطیسی مجهز به آهنرباهای قوی تراز دقیق برای آیفون‌های سری 12 تا 15 با توان وایرلس 15 وات.',2350000,8,12,'accessories','[{\"small\": \"upload/small/prod_27_baseus_magsafe_powerbank.webp\", \"medium\": \"upload/medium/prod_27_baseus_magsafe_powerbank.webp\", \"original\": \"upload/original/prod_27_baseus_magsafe_powerbank.webp\"}]','مجهز به پایه استند مخفی تاشو برای تماشای عمودی و افقی گوشی، خروجی سیمی 20 وات تایپ‌سی PD و نمایشگر دیجیتالی درصد شارژ.','{\"color\": \"سفید کریستالی\", \"status\": \"موجود\", \"warranty\": 12}','2026-11-09 00:54:35',0),(28,'هدفون بی‌سیم اپل مدل AirPods Pro (نسل دوم با پورت USB-C)','بهترین هندزفری بی‌سیم جهان با چیپ پیشرفته H2، نویزکنسلینگ دوبرابر قوی‌تر، حالت شفافیت تطبیقی و صدای فراگیر سه‌بعدی.',14200000,4,1,'accessories','[{\"small\": \"upload/small/prod_28_apple_airpods_pro_2.webp\", \"medium\": \"upload/medium/prod_28_apple_airpods_pro_2.webp\", \"original\": \"upload/original/prod_28_apple_airpods_pro_2.webp\"}]','کیس ضدآب مجهز به اسپیکر برای پیدا کردن با Find My، سری‌های سیلیکونی در 4 سایز و عمر باتری تا 30 ساعت با کیس شارژ.','{\"color\": \"سفید براق\", \"status\": \"موجود\", \"warranty\": 12}','2026-11-09 00:54:36',1),(29,'هندزفری بلوتوثی سامسونگ مدل Galaxy Buds 2 Pro','هدفون پرچمدار سامسونگ با صدای باکیفیت 24 بیتی Hi-Fi، طراحی ارگونومیک 15% کوچک‌تر و حذف نویز فعال هوشمند هوشمند.',6900000,10,2,'accessories','[{\"small\": \"upload/small/prod_29_galaxy_buds_2_pro.webp\", \"medium\": \"upload/medium/prod_29_galaxy_buds_2_pro.webp\", \"original\": \"upload/original/prod_29_galaxy_buds_2_pro.webp\"}]','صدای 360 درجه با ردیابی حرکت سر، استاندارد ضدآب غوطه‌وری کامل IPX7 و قابلیت جابجایی خودکار بین دستگاه‌های گلکسی Auto Switch.','{\"color\": \"خاکستری گرافیتی\", \"status\": \"موجود\", \"warranty\": 18}','2026-11-09 00:54:37',0),(30,'شارژر فندکی 100 وات باسئوس مدل Dual Fast Charge با صفحه دیجیتال','شارژر فندکی فلزی فوق‌سریع مناسب خودرو با توان خروجی واقعی 100 وات جهت شارژ همزمان انواع لپ‌تاپ و گوشی‌های هوشمند.',1250000,12,12,'accessories','[{\"small\": \"upload/small/prod_30_baseus_car_charger_100w.webp\", \"medium\": \"upload/medium/prod_30_baseus_car_charger_100w.webp\", \"original\": \"upload/original/prod_30_baseus_car_charger_100w.webp\"}]','صفحه نمایش ولتاژ دینامیک باتری خودرو و جریان خروجی، مدار محافظت 6 لایه در برابر نوسانات برق خودرو و هماهنگی با سوکت‌های 12V/24V.','{\"color\": \"مشکی زغالی\", \"status\": \"موجود\", \"warranty\": 12}','2026-11-09 00:54:39',0),(31,'قاب محافظ سیلیکونی مگ‌سیف آیفون 15 پرو مکس','کاور اورجینال با لایه داخلی میکروفیبر نرم ضدخش، پوشش ضدجذب چربی دست و حلقه مگنتی قوی مگ‌سیف.',680000,10,1,'accessoriesmodel','[{\"small\": \"upload/small/prod_31_iphone_15_promax_silicone_case.webp\", \"medium\": \"upload/medium/prod_31_iphone_15_promax_silicone_case.webp\", \"original\": \"upload/original/prod_31_iphone_15_promax_silicone_case.webp\"}]','سازگاری کامل با شارژرهای بی‌سیم مگ‌سیف، لبه‌های برآمده 1.2 میلی‌متری محافظ لنز دوربین و نمایشگر.','{\"color\": \"آبی نفتی\", \"model\": \"iPhone 15 Pro Max\", \"status\": \"موجود\", \"warranty\": 6}','2026-11-09 00:54:40',1),(32,'قاب محافظ چرم طبیعی سامسونگ گلکسی S24 Ultra','کاور لوکس با روکش چرم طبیعی گاوی، برش‌های لیزری بسیار دقیق برای محفظه قلم S-Pen و لنزهای دوربین.',1250000,5,2,'accessoriesmodel','[{\"small\": \"upload/small/prod_32_s24_ultra_leather_case.webp\", \"medium\": \"upload/medium/prod_32_s24_ultra_leather_case.webp\", \"original\": \"upload/original/prod_32_s24_ultra_leather_case.webp\"}]','دکمه‌های آلومینیومی ماشین‌کاری شده با بازخورد لمسی عالی و حفاظت کامل 360 درجه از فریم تیتانیومی گوشی.','{\"color\": \"قهوه‌ای عسلی\", \"model\": \"Galaxy S24 Ultra\", \"status\": \"موجود\", \"warranty\": 6}','2026-11-09 00:54:42',0),(33,'گلس محافظ صفحه نمایش مات نیلکین شیائومی 14 Ultra','محافظ صفحه ضدبازتاب و ضدچربی با روکش مات گیمینگ، شیشه حرارت‌دیده با سختی 9H و پوشش تمام لبه‌های منحنی.',450000,0,3,'accessoriesmodel','[{\"small\": \"upload/small/prod_33_xiaomi_14_ultra_matte_glass.webp\", \"medium\": \"upload/medium/prod_33_xiaomi_14_ultra_matte_glass.webp\", \"original\": \"upload/original/prod_33_xiaomi_14_ultra_matte_glass.webp\"}]','حساسیت لمسی فوق‌العاده بالا، بدون افت کیفیت و نور صفحه، عدم باقی‌ماندن جای اثرانگشت هنگام کار با گوشی.','{\"color\": \"مات بی‌رنگ\", \"model\": \"Xiaomi 14 Ultra\", \"status\": \"موجود\", \"warranty\": 3}','2026-11-09 00:54:43',0),(34,'کاور ضدضربه نیلکین CamShield Pro آیفون 15 پرو مکس','گارد زرهی آرمور با درپوش کشویی محافظ دوربین، فریم منعطف TPU ضدشوک و پشتی ضدخش پلی‌کربنات سخت.',790000,12,1,'accessoriesmodel','[{\"small\": \"upload/small/prod_34_nillkin_camshield_iphone_15.webp\", \"medium\": \"upload/medium/prod_34_nillkin_camshield_iphone_15.webp\", \"original\": \"upload/original/prod_34_nillkin_camshield_iphone_15.webp\"}]','دارای سیستم محافظ کیسه هوای ضربه‌گیر در 4 گوشه قاب جهت جلوگیری از شکستن شیشه گوشی در سقوط از ارتفاع 2 متری.','{\"color\": \"مشکی مات\", \"model\": \"iPhone 15 Pro Max\", \"status\": \"موجود\", \"warranty\": 6}','2026-11-09 00:54:45',0),(35,'قاب شفاف کریستالی ضد زردی سامسونگ گلکسی A55 5G','کاور شفاف فوق‌العاده شفاف ساخته‌شده از مواد پلیمری بایر آلمان با مقاومت دائم در برابر اکسیداسیون و زرد شدن.',380000,0,2,'accessoriesmodel','[{\"small\": \"upload/small/prod_35_galaxy_a55_clear_case.webp\", \"medium\": \"upload/medium/prod_35_galaxy_a55_clear_case.webp\", \"original\": \"upload/original/prod_35_galaxy_a55_clear_case.webp\"}]','نمایش زیبایی فابریک رنگ گوشی، ضخامت ظریف با وزن سبک، لبه‌های تقویت‌شده جهت جذب ضربات وارده.','{\"color\": \"شفاف شیشه‌ای\", \"model\": \"Galaxy A55\", \"status\": \"موجود\", \"warranty\": 6}','2026-11-09 00:54:46',0),(36,'محافظ رینگی لنز دوربین یاقوت کبود آیفون 15 پرو و پرومکس','رینگ‌های فلزی با رینگ تیتانیومی رنگ فابریک گوشی و شیشه کریستال یاقوت ضدخش بدون تغییر در کیفیت عکس و فلش شب.',320000,15,1,'accessoriesmodel','[{\"small\": \"upload/small/prod_36_iphone_15_lens_protector.webp\", \"medium\": \"upload/medium/prod_36_iphone_15_lens_protector.webp\", \"original\": \"upload/original/prod_36_iphone_15_lens_protector.webp\"}]','نصب بسیار ساده با قالب اتوماتیک همراه، چسبندگی فوق‌العاده و مقاومت در برابر ضربه‌های مستقیم و برخورد کلید.','{\"color\": \"تیتانیوم طبیعی\", \"model\": \"iPhone 15 Pro / Pro Max\", \"status\": \"موجود\", \"warranty\": 6}','2026-11-09 00:54:49',0),(37,'کاور فیبر کربن نیلکین سینتیک شیائومی POCO X6 Pro','قاب بسیار باریک و فوق‌العاده مقاوم با بافت کربنی سه‌بعدی و الیاف آرامید ضدگلوله با خنک‌کنندگی عالی برای گیمینگ.',640000,5,3,'accessoriesmodel','[{\"small\": \"upload/small/prod_37_poco_x6_pro_carbon_case.webp\", \"medium\": \"upload/medium/prod_37_poco_x6_pro_carbon_case.webp\", \"original\": \"upload/original/prod_37_poco_x6_pro_carbon_case.webp\"}]','عدم اختلال در سیگنال‌های آنتن، وای‌فای و بلوتوث، احساس لطیف در دست و ضدلیزخوردن حتی با دست عرق‌کرده.','{\"color\": \"مشکی فیبر کربن\", \"model\": \"Poco X6 Pro\", \"status\": \"موجود\", \"warranty\": 6}','2026-11-09 00:54:50',0),(38,'قاب مگنتی تیتانیوم آیفون 13 پرو با هولدر بازشونده','کاور مدرن متالیک با رینگ مغناطیسی تاشو چندمنظوره که هم پایه استند رومیزی و هم هولدر انگشتی است.',750000,10,1,'accessoriesmodel','[{\"small\": \"upload/small/prod_38_iphone_13_pro_magnetic_case.webp\", \"medium\": \"upload/medium/prod_38_iphone_13_pro_magnetic_case.webp\", \"original\": \"upload/original/prod_38_iphone_13_pro_magnetic_case.webp\"}]','حلقه فلزی با چرخش 360 درجه، سازگار با پایه‌های مغناطیسی داخل خودرو و انواع شارژرهای وایرلس مگ‌سیف.','{\"color\": \"نوک‌مدادی متالیک\", \"model\": \"iPhone 13 Pro\", \"status\": \"موجود\", \"warranty\": 6}','2026-11-09 00:54:51',0),(39,'گلس سرامیکی تمام صفحه نشکن سامسونگ گلکسی S23 FE','محافظ صفحه نشکن با خاصیت انعطاف‌پذیری نانو سرامیک و چسبندگی فول‌چسب بدون افت کیفیت تاچ.',280000,0,2,'accessoriesmodel','[{\"small\": \"upload/small/prod_39_galaxy_s23_fe_ceramic_glass.webp\", \"medium\": \"upload/medium/prod_39_galaxy_s23_fe_ceramic_glass.webp\", \"original\": \"upload/original/prod_39_galaxy_s23_fe_ceramic_glass.webp\"}]','پوشش سرتاسری لبه‌های مشکی فریم، مقاومت کامل در برابر لب‌پریدگی و ضربات تصادفی با قابلیت نصب بدون حباب.','{\"color\": \"شفاف دور مشکی\", \"model\": \"Galaxy S23 FE\", \"status\": \"موجود\", \"warranty\": 3}','2026-11-09 00:54:53',0),(40,'کاور محافظ سیلیکونی محافظ لنزدار ردمی نوت 13 پرو پلاس','قاب نرم سیلیکونی خوش‌رنگ با پوشش یکپارچه محافظت از جزیره دوربین و دکمه‌های بسیار نرم و ارگونومیک.',420000,8,3,'accessoriesmodel','[{\"small\": \"upload/small/prod_40_redmi_note_13_pro_plus_silicone.webp\", \"medium\": \"upload/medium/prod_40_redmi_note_13_pro_plus_silicone.webp\", \"original\": \"upload/original/prod_40_redmi_note_13_pro_plus_silicone.webp\"}]','پوشش مخملی داخلی برای محافظت از قاب پشتی براق گوشی، قابلیت شستشو با آب و صابون و ثبات رنگ در گذر زمان.','{\"color\": \"بنفش یاسی\", \"model\": \"Redmi Note 13 Pro+\", \"status\": \"موجود\", \"warranty\": 6}','2026-11-09 00:54:54',0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repairorders`
--

DROP TABLE IF EXISTS `repairorders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repairorders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repairorders`
--

LOCK TABLES `repairorders` WRITE;
/*!40000 ALTER TABLE `repairorders` DISABLE KEYS */;
/*!40000 ALTER TABLE `repairorders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `priceIn` bigint NOT NULL,
  `priceOut` bigint NOT NULL,
  `warranty` int NOT NULL,
  `dateAdded` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,'تعویض ال‌سی‌دی و تاچ فابریک آیفون (سری 11 تا 15)','استفاده از نمایشگرهای اورجینال روکاری با قابلیت انتقال تروتون (TrueTone) و بدون ارور در تنظیمات',3500000,12500000,0,'2026-11-09 00:53:49'),(2,'تعویض ال‌سی‌دی سوپر امولد سامسونگ (سری S و Note)','تعویض صفحه نمایش ارجینال شرکتی با فریم اصلی و فعال‌سازی مجدد سنسور اثرانگشت اولتراسونیک',4000000,16000000,6,'2026-11-09 00:53:49'),(3,'تعویض ال‌سی‌دی گوشی‌های شیائومی و پوکو','تعویض تاچ و ال‌سی‌دی اورجینال با نرخ نوسازی 120 هرتز فابریک',1800000,5500000,3,'2026-11-09 00:53:49'),(4,'تعویض باتری اورجینال آیفون با هلث ۱۰۰٪','تعویض سلول باتری تقویت‌شده بدون نمایش پیام اخطار Unknown Part با پروگرامر JCID',850000,2800000,12,'2026-11-09 00:53:49'),(5,'تعویض باتری اصلی گوشی‌های سامسونگ و شیائومی','باتری‌های تقویت‌شده شرکتی با ضمانت شارژدهی طولانی و عدم بادکردگی',450000,1500000,6,'2026-11-09 00:53:49'),(6,'تعویض گلس شکسته ال‌سی‌دی با دستگاه لمینت OCA','ترمیم شیشه بیرونی صفحه نمایش بدون نیاز به تعویض تاچ و ال‌سی‌دی اصلی با یک‌سوم هزینه',600000,2200000,3,'2026-11-09 00:53:49'),(7,'تعمیر و تعویض آی‌سی شارژ (Tristar / Hydra / PMIC)','رفع مشکل شارژ نشدن، خالی شدن سریع باتری و عدم شناسایی کابل در رایانه',1200000,3800000,3,'2026-11-09 00:53:49'),(8,'تعمیر و تعویض سوکت شارژ Type-C و Lightning','تعویض سوکت شارژ فابریک با مقاومت بالا و پشتیبانی از فست‌شارژ',250000,850000,6,'2026-11-09 00:53:49'),(9,'سرویس و شستشوی گوشی‌های آب‌خورده با التراسونیک','باز کردن فوری، شستشوی مدار با حلال مخصوص ضدسولفاته و جریان‌کشی دقیق با منبع تغذیه',500000,1800000,1,'2026-11-09 00:53:49'),(10,'تعمیر تخصصی مدار آنتن و بیس‌باند (No Service / Searching)','ریبال و تعویض آی‌سی بیس‌باند و تغذیه بیس‌باند، رفع پرش آنتن و ارور IMEI',1500000,4500000,3,'2026-11-09 00:53:49'),(11,'تعمیر و کالیبراسیون فیس‌آیدی (Face ID)','ترمیم فلت پروژکتور نقطه‌ای و سنسور مادون قرمز با پروگرام تخصصی',1100000,3200000,3,'2026-11-09 00:53:49'),(12,'تعویض و تعمیر ماژول دوربین پشت و سلفی','رفع لرزش لنز، تاری دوربین و عدم فوکوس با ماژول اورجینال',900000,4200000,6,'2026-11-09 00:53:49'),(13,'تعویض شیشه محافظ لنز دوربین','تراش لیزری شیشه آسیب‌دیده و نصب گلس یاقوت کبود ضدخش بدون نفوذ گردوغبار',150000,450000,12,'2026-11-09 00:53:49'),(14,'ریبال و تعویض سی‌پی‌یو دوطبقه (CPU Reballing)','رفع مشکل خاموشی کامل، ریستارت مداوم روی لوگو و ارورهای حافظه رم',2800000,6500000,3,'2026-11-09 00:53:49'),(15,'ارتقای حافظه داخلی آیفون و آیپد (NAND Flash Upgrade)','افزایش ظرفیت حافظه از 64 یا 128 به 256 یا 512 گیگابایت با چیپ اصلی',2200000,5800000,6,'2026-11-09 00:53:49'),(16,'تعویض درب پشت شیشه‌ای آیفون با دستگاه لیزر','جداسازی رنگ و چسب کارخانه‌ای با لیزر اتوماتیک بدون باز شدن گوشی و آسیب به شارژ مگ‌سیف',500000,1900000,6,'2026-11-09 00:53:49'),(17,'تعویض فلت دکمه پاور، ولوم و سایلنت','تعویض فلت‌های کلیدی و رفع قطعی کلیدها با نمونه اورجینال روکاری',300000,950000,6,'2026-11-09 00:53:49'),(18,'تعویض اسپیکر بلندگو و کپسول صدای مکالمه','رفع خش‌خش صدا، کم شدن حجم صدای مکالمه و جرم‌گیری توری محافظ',200000,750000,6,'2026-11-09 00:53:49'),(19,'فلش، آنبریک و رفع مشکلات نرم‌افزاری و بوت‌لوپ','نصب آخرین نسخه رسمی رام، دانگرید، حذف ارورهای نرم‌افزاری و رفع قفل‌های سیستمی',150000,450000,1,'2026-11-09 00:53:49'),(20,'حذف قفل جیمیل (FRP Bypass) و Mi Account رسمی','بازگشایی امن اکانت‌های قفل‌شده گوگل و شیائومی بدون آسیب به IMEI',250000,850000,1,'2026-11-09 00:53:49'),(21,'بازیابی اطلاعات پاک‌شده از حافظه داخلی و رم','استخراج اطلاعات از گوشی‌های خاموش، ضربه‌دیده و آب‌خورده با تجهیزات چیپ‌آف',1500000,4900000,0,'2026-11-09 00:53:49'),(22,'سرویس دوره‌ای لپ‌تاپ و تعویض خمیر سیلیکون مرغوب','باز کردن فن‌ها، پاکسازی هیت‌سینک و استفاده از خمیر سیلیکون گریزلی یا آرکتیک MX-6',200000,650000,6,'2026-11-09 00:53:49'),(23,'ارتقای رم و تعویض حافظه SSD لپ‌تاپ و کامپیوتر','نصب سریع اس‌اس‌دی M.2 NVMe و انتقال ویندوز بدون حذف اطلاعات قبلی',350000,1200000,12,'2026-11-09 00:53:49'),(24,'تعمیر مدار تغذیه و سوکت شارژ لپ‌تاپ','عیب‌یابی اتصالی مدار VRM، تعویض ماسفت‌های سوخته و سوکت شارژ فابریک',800000,2600000,3,'2026-11-09 00:53:49'),(25,'تعمیر و ریبال کارت گرافیک و پردازنده لپ‌تاپ‌های گیمینگ','رفع پرش تصویر، خطوط عمودی (آرتیفکت) و حرارت بیش از حد چیپ گرافیک',2500000,7500000,3,'2026-11-09 00:53:49');
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (7,'09390719229','b9638f317867bba7e6d388153f5553edf337cb187d05d1f8ca8e8497cebb1046',0,'2026-08-16 17:23:22'),(10,'09129072416','866718665bc59a002b0daf46e96f1ee6ccf81a7ca91370e5fd1bca51efdf98f1',1,'2026-08-18 16:24:39'),(12,'09152745858','246a04477679d27617c098067819bc9cad4a61d806f982e3953f22ae2ac6cd56',1,'2026-08-18 17:12:55'),(13,'09129072412','8c47ecda5626fd6631cb066016e1d77be83a2963c18b4ec31f747d39aea6e76d',1,'2026-08-22 17:47:41');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vpn_clients`
--

DROP TABLE IF EXISTS `vpn_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vpn_clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `protocol` varchar(30) NOT NULL,
  `downloadUrl` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vpn_clients`
--

LOCK TABLES `vpn_clients` WRITE;
/*!40000 ALTER TABLE `vpn_clients` DISABLE KEYS */;
INSERT INTO `vpn_clients` VALUES (1,'v2rayNG','VLESS / VMess','https://github.com/2dust/v2rayNG/releases','2026-11-08 21:23:49'),(2,'Streisand','VLESS / Reality','https://apps.apple.com/app/streisand','2026-11-08 21:23:49'),(3,'Sing-box','Shadowsocks / Trojan','https://github.com/SagerNet/sing-box/releases','2026-11-08 21:23:49'),(4,'Nekoray','VLESS / Shadowsocks','https://github.com/MatsuriDayo/nekoray/releases','2026-11-08 21:23:49'),(5,'Hiddify Next','Multi-Protocol / WireGuard','https://github.com/hiddify/hiddify-next/releases','2026-11-08 21:23:49');
/*!40000 ALTER TABLE `vpn_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vpn_plans`
--

DROP TABLE IF EXISTS `vpn_plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vpn_plans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `price` bigint NOT NULL,
  `discount` bigint NOT NULL,
  `duration` varchar(255) NOT NULL,
  `traffic` varchar(255) NOT NULL,
  `userCount` varchar(255) NOT NULL,
  `clientId` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `clientId` (`clientId`),
  CONSTRAINT `vpn_plans_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `vpn_clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vpn_plans`
--

LOCK TABLES `vpn_plans` WRITE;
/*!40000 ALTER TABLE `vpn_plans` DISABLE KEYS */;
INSERT INTO `vpn_plans` VALUES (1,'پلن نقره‌ای ۱ ماهه ۳۰ گیگ (V2Ray)',79000,0,'1','30','1',1,'2026-11-08 21:23:49'),(2,'پلن طلایی ۱ ماهه ۵۰ گیگ (پرسرعت)',110000,10,'1','50','2',1,'2026-11-08 21:23:49'),(3,'پلن الماس ۱ ماهه ۱۰۰ گیگ (VIP)',180000,15,'1','100','3',1,'2026-11-08 21:23:49'),(4,'پلن اختصاصی ۱ ماهه نامحدود (تک‌کاربره)',240000,0,'1','0','1',1,'2026-11-08 21:23:49'),(5,'پلن دونفره ۱ ماهه ۷۰ گیگ',145000,5,'1','70','2',2,'2026-11-08 21:23:49'),(6,'پلن استریم و یوتیوب ۱ ماهه ۱۲۰ گیگ',195000,10,'1','120','2',2,'2026-11-08 21:23:49'),(7,'پلن گیمینگ ۱ ماهه ۴۰ گیگ (پینگ زیر ۶۰ms)',130000,0,'1','40','1',3,'2026-11-08 21:23:49'),(8,'پلن اقتصادی ۱ ماهه ۲۰ گیگ',55000,0,'1','20','1',3,'2026-11-08 21:23:49'),(9,'پلن ترید با آی‌پی ثابت ۱ ماهه (فنلاند)',220000,10,'1','50','1',3,'2026-11-08 21:23:49'),(10,'پلن ترید با آی‌پی ثابت ۱ ماهه (آلمان)',220000,10,'1','50','1',4,'2026-11-08 21:23:49'),(11,'پلن سه‌ماهه نقره‌ای ۹۰ گیگ',210000,15,'3','90','2',4,'2026-11-08 21:23:49'),(12,'پلن سه‌ماهه طلایی ۱۵۰ گیگ',290000,20,'3','150','3',4,'2026-11-08 21:23:49'),(13,'پلن سه‌ماهه اختصاصی ۳۰۰ گیگ VIP',480000,20,'3','300','4',5,'2026-11-08 21:23:49'),(14,'پلن سه‌ماهه نامحدود دوکاربره',550000,10,'3','0','2',5,'2026-11-08 21:23:49'),(15,'پلن شش‌ماهه اقتصادی ۲۰۰ گیگ',420000,25,'6','200','2',5,'2026-11-08 21:23:49'),(16,'پلن شش‌ماهه حرفه‌ای ۴۰۰ گیگ',720000,20,'6','400','4',1,'2026-11-08 21:23:49'),(17,'پلن سالانه برنزی ۵۰۰ گیگ',890000,30,'12','500','3',2,'2026-11-08 21:23:49'),(18,'پلن سالانه طلایی ۱ ترابایت (سوپر توربو)',1450000,35,'12','1000','5',3,'2026-11-08 21:23:49'),(19,'پلن سالانه نامحدود شرکتی',2100000,25,'12','0','10',4,'2026-11-08 21:23:49'),(20,'پلن تستی ۷ روزه ۱۰ گیگ',25000,0,'1','10','1',5,'2026-11-08 21:23:49');
/*!40000 ALTER TABLE `vpn_plans` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-09  1:03:17
