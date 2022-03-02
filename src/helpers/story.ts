import Pool from '../utils/pool';
import { queriesStory, queriesTag} from '../utils/queries';
import { story, detailStory } from '../interfaces/Story';
import { tag } from '../interfaces/Tag';

const pool = Pool.getInstance();

export const getStorys= async(page:number):Promise<detailStory[]>=>{
  const client = await pool.connect();
  try {
      const response = (await client.query(queriesStory.GET_STORY,[5, page*5 - 5])).rows; 
      const storys:detailStory[]=response.map((row)=>{
        return{
          id_story:row.id_story,
          story_text:row.story_text,
          url:row.url,
          author:row.author,
          title:row.title,
          publication_date:row.publication_date,
          cant_comment:row.cant_comment
        }
      })
      return storys;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}

export const getStoryByAuthor= async({author, page}:{author:string, page:number}):Promise<detailStory[]>=>{
  const client = await pool.connect();
  try {
      const response = (await client.query(queriesStory.GET_STORY_BY_AUTHOR,[author, 5, page*5 - 5])).rows; 
      const storys:detailStory[]=response.map((row)=>{
        return{
          id_story:row.id_story,
          story_text:row.story_text,
          url:row.url,
          author:row.author,
          title:row.title,
          publication_date:row.publication_date,
          cant_comment:row.cant_comment
        }
      })
      return storys;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}

export const getStoryByTitle = async({title, page}:{title:string, page:number}):Promise<detailStory[]>=>{
  const client = await pool.connect();
  try {
      const response = (await client.query(queriesStory.GET_STORY_BY_TITLE,[title, 5, page*5 - 5])).rows; 
      const storys:detailStory[]=response.map((row)=>{
        return{
          id_story:row.id_story,
          story_text:row.story_text,
          url:row.url,
          author:row.author,
          title:row.title,
          publication_date:row.publication_date,
          cant_comment:row.cant_comment
        }
      })
      return storys;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}

export const getStoryByTag = async({tag, page}:{tag:string, page:number}):Promise<detailStory[]>=>{
  const client = await pool.connect();
  try {
      const response = (await client.query(queriesStory.GET_STORY_BY_TAG,[tag, 5, page*5 - 5])).rows; 
      const storys:detailStory[]=response.map((row)=>{
        return{
          id_story:row.id_story,
          story_text:row.story_text,
          url:row.url,
          author:row.author,
          title:row.title,
          publication_date:row.publication_date,
          cant_comment:row.cant_comment
        }
      })
      return storys;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}

export const getStoryByDate= async({date, page}:{date:string, page:number}):Promise<detailStory[]>=>{
  const client = await pool.connect();
  try {
      const response = (await client.query(queriesStory.GET_STORY_BY_DATE,[date, 5, page*5 - 5])).rows; 
      const storys:detailStory[]=response.map((row)=>{
        return{
          id_story:row.id_story,
          story_text:row.story_text,
          url:row.url,
          author:row.author,
          title:row.title,
          publication_date:row.publication_date,
          cant_comment:row.cant_comment
        }
      })
      return storys;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}

export const getFilterStory = async({title, author, page}:{title:string, author:string,  page:number}):Promise<detailStory[]>=>{
  const client = await pool.connect();
   try {
    const params:string[]=[];
    console.log(title?params.push(title):null);
    console.log(author?params.push(author):null);
    console.log(queriesStory.FILTER_STORY.BEGINNING + (title?` WHERE UPPER(title) LIKE '%' || UPPER($${params.indexOf(title)+3}) || '%' `:` `)
    + (author?` ${title?'AND':' WHERE '} UPPER(author) LIKE '%' || UPPER($${params.indexOf(author)+3}) || '%' `:` `)+ queriesStory.FILTER_STORY.END)
    const response = (await client.query(queriesStory.FILTER_STORY.BEGINNING + (title?` WHERE UPPER(title) LIKE '%' || UPPER($${params.indexOf(title)+3}) || '%' `:` `)
    + (author?` ${title?'AND':' WHERE '} UPPER(author) LIKE '%' || UPPER($${params.indexOf(author)+3}) || '%' `:` `)+ queriesStory.FILTER_STORY.END, [5, page*5 - 5, ...params])).rows;
    
    const storys:detailStory[]=response.map((row)=>{
      return{
        id_story:row.id_story,
        story_text:row.story_text,
        url:row.url,
        author:row.author,
        title:row.title,
        publication_date:row.publication_date,
        cant_comment:row.cant_comment
      }
    })
    return storys;
  } catch (e) {
    console.log(e)
    throw e;
  } finally {
    client.release();
  }
}  

export const deleteStory = async(id:number):Promise<boolean>=>{
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = (await client.query(queriesStory.DELETE_STORY,[id])).rowCount>0; 
    console.log(response)
    await client.query('COMMIT');
    return response;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

export const insertStory = async({story, tags}:{story:detailStory, tags:tag[]}): Promise<detailStory>=>{
    const client = await pool.connect();
    const {id_story, title, author, story_text, url, publication_date} = story;
    try {
      await client.query('BEGIN');
      const response = (await client.query(queriesStory.INSERT_STORY,[id_story, title, author, story_text, url, publication_date])).rows[0]; 
      console.log(response)
      tags.map(async (rows)=>{
        const num:number=(await client.query(queriesTag.INSERT_STORY_TAG,[id_story, rows.id_tag])).rowCount;
        return num;
      })
      const story:detailStory={
          id_story: response.id_story,
          title: response.title,
          author: response.author,
          story_text: response.story_text,
          url: response.url,
          publication_date: response.publication_date,
      }
      await client.query('COMMIT');
      return story;
    } catch (e) {
      await client.query('ROLLBACK');
      console.log(e)
      throw e;
    } finally {
      client.release();
    }
}

export const insertStory2 =async (story:story): Promise<story> => {
  const client = await pool.connect();
  const {id_story, title, url} = story;
  try {
    await client.query('BEGIN');
    const response = (await client.query(queriesStory.INSERT_STORY_INCOMPLETE,[id_story, title, url])).rows[0]; 
    console.log(response)
    const story:story={
        id_story: response.id_story,
        title: response.title,
        url: response.url,
    }
    await client.query('COMMIT');
    return story;
  } catch (e) {
    await client.query('ROLLBACK');
    console.log(e)
    throw e;
  } finally {
    client.release();
  }
}

export const checkStory = async (id:number): Promise<boolean> => {
  const client = await pool.connect();
  try {
      const response = (await client.query(queriesStory.GET_STORY_BY_ID,[id])).rowCount>0; 
      console.log(response)
      return response;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}