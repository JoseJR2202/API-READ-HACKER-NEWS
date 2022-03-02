import { Router } from 'express';
import {readHacerNews} from '../utils/request';
import { insertCommentBD, insertStoryBD } from '../utils/extras';

const router = Router();

router.get('/',async(req, res)=>{
    try {
        const data= await readHacerNews();
        console.log(data);
        let a=0, b=0;
        if(data.storys[0]!=null){
          a= await insertStoryBD(data.storys);
        }else{
          console.log('No hay historias nuevas')
        }
        if(data.comment[0]!=null){
         b= await insertCommentBD(data.comment);
        }else{
          console.log('No hay comentarios nuevos')
        }
        res.status(200).json({ status: 200, message: `Se han agregado ${a} historias/temas y ${b} comentarios` });
      } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
      }
});

export default router;