export const queriesComment = {
  GET_COMMENT:`SELECT id_comment, author, comment_text, CONCAT(publication_date::date,' ',publication_date::time) as publication_date, id_story FROM comment ORDER BY publication_date LIMIT $1 OFFSET $2`,
  GET_COMMENT_BY_ID:`SELECT id_comment, author, comment_text, CONCAT(publication_date::date,' ',publication_date::time) as publication_date, id_story FROM comment WHERE id_comment = $1`,
  GET_COMMENT_BY_AUTHOR: `SELECT id_comment, author, comment_text, CONCAT(publication_date::date,' ',publication_date::time) as publication_date, id_story FROM comment WHERE UPPER(author) LIKE '%' || UPPER($1) || '%' ORDER BY publication_date LIMIT $2 OFFSET $3`,
  GET_COMMENT_BY_DATE:`SELECT id_comment, author, comment_text, CONCAT(publication_date::date,' ',publication_date::time) as publication_date, id_story FROM comment WHERE publication_date::date = $1 ORDER BY publication_date LIMIT $2 OFFSET $3`,
  GET_COMMENT_BY_TAG:`SELECT comment.id_comment, author, comment_text, publication_date::date, id_story FROM comment, comment_tag, tag WHERE 
                        comment.id_comment = comment_tag.id_comment AND comment_tag.id_tag = tag.id_tag AND UPPER(tag.name) LIKE '%' || UPPER($1) || '%' ORDER BY publication_date LIMIT $2 OFFSET $3`,
  FILTER_COMMENT:{
    BEGINNING:`SELECT comment.id_comment, author, comment_text, publication_date::date, id_story FROM comment, comment_tag, tag WHERE comment.id_comment = comment_tag.id_comment AND comment_tag.id_tag = tag.id_tag `,
    END:`ORDER BY publication_date LIMIT $1 OFFSET $2`
  },
  INSERT_COMMENT:`INSERT INTO comment VALUES ($1, $2, $3, $4, $5) RETURNING *`,
  DELETE_COMMENT:`DELETE FROM comment WHERE id_comment = $1`
};

//Agregar query para filtrado multiple
export const queriesStory = {
  GET_STORY:`SELECT * FROM story ORDER BY title LIMIT $1 OFFSET $2`,
  GET_STORY_BY_ID:`SELECT * FROM story WHERE id_story = $1`,
  GET_STORY_BY_TITLE:`SELECT * FROM story WHERE UPPER(title) LIKE '%' || UPPER($1) || '%' ORDER BY title LIMIT $2 OFFSET $3`,
  GET_STORY_BY_AUTHOR:`SELECT * FROM story WHERE UPPER(author) LIKE '%' || UPPER($1) || '%' ORDER BY title LIMIT $2 OFFSET $3`,
  GET_STORY_BY_TAG:`SELECT story.id_story, title, author, story_text, url, CONCAT(publication_date::date,' ',publication_date::time) as publication_date, cant_comment FROM story, story_tag, tag WHERE  
                      story.id_story = story_tag.id_story AND story_tag.id_tag = tag.id_tag AND UPPER(tag.name) LIKE '%' || UPPER($1) || '%' ORDER BY title LIMIT $2 OFFSET $3`,
  GET_STORY_BY_DATE:`SELECT * FROM story WHERE publication_date::date = $1 ORDER BY publication_date LIMIT $2 OFFSET $3`,
  FILTER_STORY:{
    BEGINNING:`SELECT story.id_story, title, author, story_text, url, CONCAT(publication_date::date,' ',publication_date::time) as publication_date, cant_comment FROM story `,
    END:`ORDER BY title LIMIT $1 OFFSET $2`
  },
  INSERT_STORY:`INSERT INTO story (id_story, title, author, story_text, url, publication_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
  INSERT_STORY_INCOMPLETE:`INSERT INTO story (id_story, title, url) VALUES ($1, $2, $3) RETURNING *`,
  DELETE_STORY:`DELETE FROM story WHERE id_story = $1`
};

export const queriesTag = {
  GET_TAG:`SELECT * FROM tag  ORDER BY name LIMIT $1 OFFSET $2`,
  CHECK_TAG:`SELECT * FROM tag WHERE name LIKE $1`,
  INSERT_TAG:`INSERT INTO tag (name) VALUES ($1) RETURNING *`,
  INSERT_STORY_TAG:`INSERT INTO story_tag VALUES ($1, $2) RETURNING *`,
  INSERT_COMMENT_TAG:`INSERT INTO comment_tag VALUES ($1, $2) RETURNING *`
}