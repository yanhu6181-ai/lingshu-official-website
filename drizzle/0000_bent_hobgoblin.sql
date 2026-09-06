CREATE TABLE "demo_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(80) NOT NULL,
	"company" varchar(120) NOT NULL,
	"email" varchar(160) NOT NULL,
	"phone" varchar(80) NOT NULL,
	"platforms" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"primary_need" varchar(120) NOT NULL,
	"locale" varchar(10) DEFAULT 'zh-CN' NOT NULL,
	"consent_version" varchar(20) NOT NULL,
	"marketing_consent" boolean DEFAULT false NOT NULL,
	"source_url" text DEFAULT '' NOT NULL,
	"status" varchar(24) DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_demo_requests_status_created_at" ON "demo_requests" USING btree ("status","created_at");