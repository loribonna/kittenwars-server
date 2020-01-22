import { Controller, Get, Put, Res, Post, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IKitten, CreateKittenDto } from 'src/dto/create-kitten.dto';
import { CreateImageDto } from 'src/dto/create-image.dto';
import { diskStorage } from  'multer';

interface Survey {}

@Controller('kittens')
export class KittensController {

    constructor(@InjectModel('Kitten') private readonly kittenModel: Model<IKitten>){}

    @Get(':name')
    async getKittenInfo(@Param('name') kittenName): Promise<IKitten> {
        return this.kittenModel.find({savedName: kittenName});
    }

    @Get(':name/data')
	async getKitten(@Param('name') kittenName, @Res() res) {
        const kittenInfo = await this.getKittenInfo(kittenName);
        console.log(kittenInfo[0], kittenInfo[0].savedName);
        res.sendFile(kittenInfo[0].savedName, {root: './files'});
    }

	@Put()
	voteKittens(): Survey {
		return {};
    }
    
    @Post()
    @UseInterceptors(
        FileInterceptor('image',{
            storage: diskStorage({
                destination: './files',
                filename: (req, file, cb) => {
                    console.log(file)
                    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
                }
            })
        }),
    )
    async insertKitten(@UploadedFile() uplKitten: CreateImageDto) {
        const obj: IKitten = {
            originalName: uplKitten.originalName,
            savedName: uplKitten.filename,
            size: uplKitten.size
        }
        const kitten = new this.kittenModel(obj);
        const savedKitten = await kitten.save();
        console.log(savedKitten);
        return savedKitten;
    }
}
