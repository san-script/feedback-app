CREATE TABLE "feedback" (
	"id" serial PRIMARY KEY NOT NULL,
	"message" text NOT NULL,
	"rating" integer NOT NULL,
	"author" text,
	"created_at" timestamp DEFAULT now()
);
