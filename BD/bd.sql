CREATE TABLE "story" (
  "id_story" integer PRIMARY KEY,
  "title" varchar NOT NULL,
  "author" varchar,
  "story_text" text,
  "url" varchar,
  "publication_date" timestamp,
  "cant_comment" integer DEFAULT 0
);

CREATE TABLE "comment" (
  "id_comment" integer PRIMARY KEY,
  "author" varchar NOT NULL,
  "comment_text" text,
  "publication_date" timestamp NOT NULL,
  "id_story" integer
);

CREATE TABLE "tag" (
  "id_tag" SERIAL PRIMARY KEY,
  "name" varchar UNIQUE
);

CREATE TABLE "story_tag" (
  "id_story" integer,
  "id_tag" integer,
  PRIMARY KEY ("id_story", "id_tag")
);

CREATE TABLE "comment_tag" (
  "id_comment" integer,
  "id_tag" integer,
  PRIMARY KEY ("id_comment", "id_tag")
);

ALTER TABLE "comment" ADD FOREIGN KEY ("id_story") REFERENCES "story" ("id_story") on update cascade on delete cascade;

ALTER TABLE "story_tag" ADD FOREIGN KEY ("id_story") REFERENCES "story" ("id_story") on update cascade on delete cascade;

ALTER TABLE "story_tag" ADD FOREIGN KEY ("id_tag") REFERENCES "tag" ("id_tag") on update cascade on delete cascade;

ALTER TABLE "comment_tag" ADD FOREIGN KEY ("id_comment") REFERENCES "comment" ("id_comment")  on update cascade on delete cascade;

ALTER TABLE "comment_tag" ADD FOREIGN KEY ("id_tag") REFERENCES "tag" ("id_tag")  on update cascade on delete cascade;

--Functions and Triggers

CREATE OR REPLACE FUNCTION update_cant_comment() RETURNS TRIGGER AS $updateCantComment$
   BEGIN
      UPDATE story SET cant_comment = (SELECT cant_comment + 1 FROM story WHERE id_story = new.id_story) WHERE id_story=new.id_story;
	RETURN NEW;
   END;
$updateCantComment$ LANGUAGE plpgsql;

CREATE TRIGGER updateCantComment AFTER INSERT ON comment
FOR EACH ROW EXECUTE PROCEDURE update_cant_comment();