import {Request, Response} from 'express';
import {catchError} from '../utils/catchError';
import {inteService} from '../utils/utilIntefaces';
import Service from '../models/Service';
import mongoose from 'mongoose';


//Get all services -------- public endPoint

export const getAll = catchError(async (req:Request, res:Response): Promise<void> => {
    
    const {title} = req.query;

    let query = {};

    if(title) {
        query = {
            title:{
                $eq: title
            }
        }
    }
   
     const services = await Service.find(query)

     res.json(services) 

});

//Post one services ---------- public endPoint
export const create = catchError(async (req:Request, res:Response)=> {

    const body:inteService = req.body;

    const service = new Service(body);

    await service.save()

    if(!service){
        res.sendStatus(404)
    }else{
        res.sendStatus(201)
    }

});

//Get one --------/services/:id ------- public EndPoint
export const getOne = catchError(async (req:Request, res:Response) => {

    const {id} = req.params;

    if(!mongoose.isValidObjectId(id)){
        res.status(404).json({message:"ID invalid"});
    }else{
        const service = await Service.findById({_id:id});
        
        res.json(service)
    }

})

//Remove One --> /services ----------- public endPont
export const remove = catchError(async (req:Request, res:Response)=> {

    const {id} = req.params;

    if(!mongoose.isValidObjectId(id)){
        res.status(404).json({message:"ID invalid"});
    }else{

        const deleteService = await Service.deleteOne({_id:id});

        if(deleteService.deletedCount == 0){
            res.sendStatus(404);
        }else{
            res.sendStatus(204)
        }

    }

})

//Put One --> /services/:id ------- public EndPoint
export const update = catchError(async (req:Request, res:Response)=>{

    const {id} = req.params;
    const body:inteService = req.body;

    if(!mongoose.isValidObjectId(id)){
        res.status(404).json({message:"ID invalid"});
    }else{

        if(Object.keys(body).length == 0){
            res.status(404).json({message:"Empty body"})
        }else{
            const service = await Service.findByIdAndUpdate(
                {_id:id},
                body,
                {new:true}
            )
                
            if(!service){
                res.status(404).json({message:"Service not found"});
            }else{
                res.json(service)
            }
        }

    }

} )