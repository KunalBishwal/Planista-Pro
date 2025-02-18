-- CreateTable
CREATE TABLE `Venue` (
    `venue_id` VARCHAR(191) NOT NULL,
    `venue_name` VARCHAR(191) NOT NULL,
    `address_line1` VARCHAR(191) NOT NULL,
    `address_line2` VARCHAR(191) NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `zip_code` VARCHAR(191) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `availability` BOOLEAN NOT NULL DEFAULT true,
    `price_per_day` DECIMAL(10, 2) NOT NULL,
    `image` VARCHAR(191) NULL,

    PRIMARY KEY (`venue_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
