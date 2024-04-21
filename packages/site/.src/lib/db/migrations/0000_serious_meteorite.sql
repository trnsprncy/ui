CREATE TABLE `subscriber` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`email` text NOT NULL,
	`verified` integer,
	`created_at` integer DEFAULT now(),
	`updated_at` integer DEFAULT now(),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`username` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `subscriber_email_unique` ON `subscriber` (`email`);--> statement-breakpoint
CREATE INDEX `subscriber_user_id_idx` ON `subscriber` (`user_id`);