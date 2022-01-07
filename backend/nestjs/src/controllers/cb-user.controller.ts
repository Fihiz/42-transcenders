import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { UserService } from 'src/services/sb-user.service';

import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { Response } from '@nestjs/common';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

const editFileName = (req, file, callback) => {
    const name = req.body.filename;
    // const extension = mime.extension(file.mimetype); // if we want handle several extention
    const extension = "jpg";
    callback(null, `${name}.${extension}`);
};

const checkFileExtension = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg)$/))
        return callback(new Error('Extension not allowed !'), false);
    callback(null, true);
};

@Controller('cb-user')
export class UserController {
    
    constructor(private userService: UserService) {}

    // will be used later to update our user

    // @Post('avatar/:login')
    @Post('avatar/:file')
    @UseInterceptors(
    FileInterceptor('avatar', {
        storage:
        diskStorage({
            destination: 'src/assets/avatar',
            filename: editFileName,
        }),
        fileFilter: checkFileExtension,
    }),
    )
    // uploadAvatar(@Param('login') login: string, @UploadedFile() file, @Response() res)
    uploadAvatar(@UploadedFile() file, @Response() res) {
        // TODO = If user exist alors on appel updateAvatar
        const url = `http://localhost:3000/cb-user/avatar/${file.filename}`;
        res.send(url);
        return url;
    }

    @Get('avatar/:filename')
    getUploadedAvatar(@Param('filename') filename, @Response() res) {
        res.sendFile(filename, { root: './src/assets/avatar' });
    }

}