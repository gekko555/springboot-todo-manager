-- todo_app.todos definition

CREATE TABLE `todos` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'タイトル',
  `description` text COLLATE utf8mb4_unicode_ci COMMENT '説明',
  `status` enum('PENDING','IN_PROGRESS','ON_HOLD','COMPLETED') COLLATE utf8mb4_unicode_ci DEFAULT 'PENDING',
  `priority` enum('HIGH','MEDIUM','LOW') COLLATE utf8mb4_unicode_ci DEFAULT 'MEDIUM',
  `due_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;