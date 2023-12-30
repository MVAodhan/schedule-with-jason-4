ALTER TABLE "episodes" ADD COLUMN "sanityId" text;--> statement-breakpoint
ALTER TABLE "episodes" ADD COLUMN "guest" json;--> statement-breakpoint
ALTER TABLE "episodes" ADD COLUMN "host" json;--> statement-breakpoint
ALTER TABLE "episodes" ADD COLUMN "tags" json;--> statement-breakpoint
ALTER TABLE "episodes" ADD COLUMN "slug" text;--> statement-breakpoint
ALTER TABLE "episodes" ADD COLUMN "uri" text;--> statement-breakpoint
ALTER TABLE "episodes" ADD COLUMN "timezone" text;--> statement-breakpoint
ALTER TABLE "episodes" ADD COLUMN "chapters" text;--> statement-breakpoint
ALTER TABLE "episodes" ADD COLUMN "links" json;--> statement-breakpoint
ALTER TABLE "episodes" ADD COLUMN "tech" text;--> statement-breakpoint
ALTER TABLE "episodes" ADD COLUMN "demo" text;--> statement-breakpoint
ALTER TABLE "episodes" ADD COLUMN "repo" text;--> statement-breakpoint
ALTER TABLE "episodes" ADD COLUMN "twitter_description" text;--> statement-breakpoint
ALTER TABLE "episodes" ADD COLUMN "schedule_tweet" boolean;--> statement-breakpoint
ALTER TABLE "episodes" ADD COLUMN "ninety_minute_tweet" boolean;--> statement-breakpoint
ALTER TABLE "episodes" ADD COLUMN "live_tweet" boolean;