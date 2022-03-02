import { Router } from 'express';
import { detailComment} from '../interfaces/Comment';
import {getComment, getCommentByAuthor, getCommentByDate, getCommentByTag, deleteComment, getFilterComment} from '../helpers/comment';
import {filterByAuthorFieldsValidation, filterByDateFieldsValidation, filterByTagFieldsValidation, filterCommentsFiledsValidation, checkResult} from '../validations/fields'
const router = Router();

router.get('/:page',async(req, res)=>{
    try {
        const data:detailComment[]=await getComment(+req.params.page);
        res.status(200).json({ status: 200, comment: data, message: 'Comments enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

router.get('/author/:page', filterByAuthorFieldsValidation, checkResult, async(req, res)=>{
    try {
        const data:detailComment[]=await getCommentByAuthor({author:req.body.author, page: +req.params.page});
        res.status(200).json({ status: 200, comment: data, message: 'Comments enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

router.get('/date/:page', filterByDateFieldsValidation, checkResult, async(req, res)=>{
    try {
        const data:detailComment[]=await getCommentByDate({date:req.body.date, page: +req.params.page});
        res.status(200).json({ status: 200, comment: data, message: 'Comments enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

router.get('/tag/:page',filterByTagFieldsValidation, checkResult,  async(req, res)=>{
    try {
        const data:detailComment[]=await getCommentByTag({tag:req.body.tag, page: +req.params.page});
        res.status(200).json({ status: 200, comment: data, message: 'Comments enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

router.get('/filter/:page', filterCommentsFiledsValidation, checkResult, async(req, res)=>{
    try {
        const {author, tags}= req.body;
        const data:detailComment[]=await getFilterComment({author:author, tags:tags, page: +req.params.page});
        res.status(200).json({ status: 200, comment: data, message: 'Comments enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
})

router.delete('/:id', async(req, res)=>{
    try {
        const data:boolean=await deleteComment(+req.params.id);
        res.status(200).json({ status: 200, comment: data, message: 'Comments enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
})

export default router;