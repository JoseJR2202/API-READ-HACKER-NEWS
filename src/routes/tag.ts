import { Router } from 'express';
import {tag} from '../interfaces/Tag';
import {getTag} from '../helpers/tag';

const router = Router();

router.get('/:page',async (req, res) => {
    try {
        const data:tag[]= await getTag(+req.params.page);
        res.status(200).json({ status: 200, tags: data, message: 'Tags enviados' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
})

export default router;