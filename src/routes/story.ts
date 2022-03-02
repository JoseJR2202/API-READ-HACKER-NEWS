import { Router } from 'express';
import { detailStory} from '../interfaces/Story';
import {getStoryByAuthor, getStoryByDate, getStoryByTag, getStoryByTitle, getStorys, deleteStory, getFilterStory} from '../helpers/story';
import {filterByAuthorFieldsValidation, filterByDateFieldsValidation, filterByTagFieldsValidation, filterByTitleFieldsValidation, filterStorysFiledsValidation, checkResult} from '../validations/fields'

const router = Router();

router.get('/:page', async(req, res)=>{
    try {
        const data:detailStory[]=await getStorys(+req.params.page);
        res.status(200).json({ status: 200, storys: data, message: 'Storys enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

router.get('/author/:page', filterByAuthorFieldsValidation, checkResult, async(req, res)=>{
    try {
        const data:detailStory[]=await getStoryByAuthor({author:req.body.author, page: +req.params.page});
        res.status(200).json({ status: 200, storys: data, message: 'Storys enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

router.get('/date/:page', filterByDateFieldsValidation, checkResult, async(req, res)=>{
    try {
        const data:detailStory[]=await getStoryByDate({date:req.body.date, page: +req.params.page});
        res.status(200).json({ status: 200, storys: data, message: 'Storys enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

router.get('/title/:page', filterByTitleFieldsValidation, checkResult, async(req, res)=>{
    try {
        const data:detailStory[]=await getStoryByTitle(({title:req.body.title, page: +req.params.page}));
        res.status(200).json({ status: 200, storys: data, message: 'Storys enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

router.get('/tag/:page', filterByTagFieldsValidation, checkResult, async(req, res)=>{
    try {
        const data:detailStory[]=await getStoryByTag({tag:req.body.tag, page: +req.params.page});
        res.status(200).json({ status: 200, storys: data, message: 'Storys enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

router.get('/filter/:page', filterStorysFiledsValidation, checkResult, async(req, res)=>{
    try {
        const {author, title}= req.body;
        console.log(req.body)
        const data:detailStory[]=await getFilterStory({title:title, author:author, page: +req.params.page});
        res.status(200).json({ status: 200, storys: data, message: 'Storys enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
})

router.delete('/:id', async(req, res)=>{
    try {
        const data:boolean=await deleteStory(+req.params.id);
        res.status(200).json({ status: 200, storys: data, message: 'Story eliminado' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

export default router;