import Pool from '../utils/pool';
import { queriesTag} from '../utils/queries';
import { tag } from '../interfaces/Tag';

const pool = Pool.getInstance();

export const getTag= async(page:number):Promise<tag[]>=>{
    const client = await pool.connect();
    try {
        const response = (await client.query(queriesTag.GET_TAG,[5, 5*page - 5])).rows; 
        const tags:tag[]=response.map((row)=>{
          return{
            id_tag:row.id_tag,
            name:row.name
          }
        })
        return tags;
    } catch (e) {
        console.log(e)
        throw e;
    } finally {
        client.release();
    }
  }

export const insertTag = async(name:string):Promise<tag>=>{
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const response = (await client.query(queriesTag.INSERT_TAG,[name])).rows[0]; 
      console.log(response)
      const tag:tag= {
          id_tag: response.id_tag,
          name: response.name
      }
      await client.query('COMMIT');
      return tag;
    } catch (e) {
      await client.query('ROLLBACK');
      console.log(e)
      throw e;
    } finally {
      client.release();
    }
};

export const checkTag = async(name:string):Promise<tag>=>{
    const client = await pool.connect();
    try {
        const response = (await client.query(queriesTag.CHECK_TAG,[name])).rows[0]; 
        console.log(response)
        const tag:tag= {
            id_tag: response.id_tag,
            name: response.name
        }
        return tag;
    } catch (e) {
        console.log(e)
        throw e;
    } finally {
        client.release();
    }
}