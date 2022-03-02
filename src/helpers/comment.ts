import Pool from '../utils/pool';
import { queriesComment, queriesTag} from '../utils/queries';
import { comment, detailComment } from '../interfaces/Comment';
import { tag } from '../interfaces/Tag';

const pool = Pool.getInstance();

export const getComment= async(page:number):Promise<detailComment[]>=>{
  const client = await pool.connect();
  try {
      const response = (await client.query(queriesComment.GET_COMMENT,[5, page*5 - 5])).rows; 
      const comments:detailComment[]=response.map((row)=>{
        return{
          id_comment:row.id_comment,
          comment_text:row.comment_text,
          id_story:row.id_story,
          author:row.author,
          publication_date:row.publication_date,
        }
      })
      return comments;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}

export const getCommentByAuthor= async({author, page}:{author:string, page:number}):Promise<detailComment[]>=>{
  const client = await pool.connect();
  try {
      const response = (await client.query(queriesComment.GET_COMMENT_BY_AUTHOR,[author,5, page*5 - 5])).rows; 
      const comments:detailComment[]=response.map((row)=>{
        return{
          id_comment:row.id_comment,
          comment_text:row.comment_text,
          id_story:row.id_story,
          author:row.author,
          publication_date:row.publication_date
        }
      })
      return comments;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}

export const getCommentByTag = async({tag, page}:{tag:string, page:number}):Promise<detailComment[]>=>{
  const client = await pool.connect();
  try {
      const response = (await client.query(queriesComment.GET_COMMENT_BY_TAG,[tag,5, page*5 - 5])).rows; 
      const comments:detailComment[]=response.map((row)=>{
        return{
          id_comment:row.id_comment,
          comment_text:row.comment_text,
          id_story:row.id_story,
          author:row.author,
          publication_date:row.publication_date,
        }
      })
      return comments;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}

export const getCommentByDate= async({date, page}:{date:string, page:number}):Promise<detailComment[]>=>{
  const client = await pool.connect();
  try {
      const response = (await client.query(queriesComment.GET_COMMENT_BY_DATE,[date, 5, page*5 - 5])).rows; 
      const comments:detailComment[]=response.map((row)=>{
        return{
          id_comment:row.id_comment,
          comment_text:row.comment_text,
          id_story:row.id_story,
          author:row.author,
          publication_date:row.publication_date,
        }
      })
      return comments;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}

export const getFilterComment = async({ author, tags, page}:{ author:string, tags:string[], page:number}):Promise<detailComment[]>=>{
  const client = await pool.connect();
   try {
    const params:string[]=[];
    console.log(author?params.push(author):null);
    console.log(tags? params.push(...tags):null);
    let queryTag:string='';
    if(tags){
      for(let i=params.indexOf(tags[0]);i<params.length;i++)
        queryTag+=i===(params.length-1)?`UPPER($${i+3}) `:`UPPER($${i+3}), `;
    }
    const response = (await client.query(queriesComment.FILTER_COMMENT.BEGINNING 
    + (author?` AND UPPER(author) LIKE '%' || UPPER($${params.indexOf(author)+3}) || '%' `:` `)+ (tags? ` AND UPPER(tag.name) IN (${queryTag}) `: ` `) + queriesComment.FILTER_COMMENT.END, [5, page*5 - 5, ...params])).rows;
    
    const comments:detailComment[]=response.map((row)=>{
      return{
        id_comment:row.id_comment,
        comment_text:row.comment_text,
        id_story:row.id_story,
        author:row.author,
        publication_date:row.publication_date,
      }
    })
    return comments;
  } catch (e) {
    console.log(e)
    throw e;
  } finally {
    client.release();
  }
}  

export const deleteComment = async(id:number):Promise<boolean>=>{
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = (await client.query(queriesComment.DELETE_COMMENT,[id])).rowCount>0; 
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

export const insertComment =async ({comment, tags}:{comment:detailComment, tags:tag[]}) => {
    const client = await pool.connect();
    const {id_comment, author, comment_text, publication_date, id_story} = comment;
    try {
      await client.query('BEGIN');
      const response = (await client.query(queriesComment.INSERT_COMMENT,[id_comment, author, comment_text, publication_date, id_story])).rows[0]; 
      console.log(response)
      tags.map(async (rows)=>{
        const num:number=(await client.query(queriesTag.INSERT_COMMENT_TAG,[id_comment, rows.id_tag])).rowCount;
        return num;
      })
      const story:detailComment={
          id_comment:response.id_comment,
          id_story: response.id_story,
          author: response.author,
          comment_text: response.comment_text,
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

export const checkComment = async (id:number): Promise<boolean> => {
  const client = await pool.connect();
  try {
      const response = (await client.query(queriesComment.GET_COMMENT_BY_ID,[id])).rowCount>0; 
      console.log(response)
      return response;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}